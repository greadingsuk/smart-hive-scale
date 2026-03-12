/**
 * GetTelemetry — HTTP Trigger Azure Function (GET, anonymous)
 *
 * Reads telemetry data from Azure Table Storage (HiveDataTable)
 * and returns it as JSON for the web dashboard.
 *
 * Query parameters:
 *   ?hours=24   — how many hours of data to return (default 24, max 720)
 *   ?hive=Hive1 — which hive to query (default "Hive1")
 */
const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");

const storageAccountName = process.env.AzureWebJobsStorage__accountName || "stgrpersonalhivescale";
const tableUrl = `https://${storageAccountName}.table.core.windows.net`;
const credential = new DefaultAzureCredential();
const tableClient = new TableClient(tableUrl, "HiveDataTable", credential);

module.exports = async function (context, req) {
    context.log("GetTelemetry triggered.");

    const hours = Math.min(Math.max(1, parseInt(req.query.hours) || 24), 720);
    const hive = /^[A-Za-z0-9_-]{1,50}$/.test(req.query.hive || "") ? req.query.hive : "Hive1";
    const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

    try {
        const entities = [];
        const query = tableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${hive}' and RowKey ge '${since}'`
            }
        });

        for await (const entity of query) {
            entities.push({
                timestamp: entity.rowKey,
                weight: entity.Weight,
                internalTemp: entity.InternalTemp,
                batteryVoltage: entity.BatteryVoltage,
                hiveHum: entity.HiveHum,
                legTemp: entity.LegTemp
            });
        }

        entities.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hive: hive,
                hours: hours,
                count: entities.length,
                data: entities
            })
        };
    } catch (err) {
        context.log.error("Table query failed:", err.message);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Failed to read telemetry.", detail: err.message })
        };
    }
};
