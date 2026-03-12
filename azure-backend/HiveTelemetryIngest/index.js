/**
 * HiveTelemetryIngest — HTTP Trigger Azure Function
 *
 * Accepts a JSON payload from the ESP32 Smart Hive Scale,
 * writes it to Azure Table Storage (HiveDataTable table),
 * and returns 200 OK.
 *
 * Uses @azure/data-tables SDK with DefaultAzureCredential
 * (managed identity — no connection strings or shared keys).
 *
 * PartitionKey: "Hive1" (can be parameterised later for multi-hive)
 * RowKey: ISO 8601 timestamp for chronological ordering
 */
const { TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");

const storageAccountName = process.env.AzureWebJobsStorage__accountName || "stgrpersonalhivescale";
const tableUrl = `https://${storageAccountName}.table.core.windows.net`;
const credential = new DefaultAzureCredential();
const tableClient = new TableClient(tableUrl, "HiveDataTable", credential);

module.exports = async function (context, req) {
    context.log("HiveTelemetryIngest triggered.");

    const body = req.body;

    if (!body || body.Weight === undefined) {
        context.res = {
            status: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Invalid payload. Expected JSON with Weight, InternalTemp, BatteryVoltage, HiveHum, LegTemp." })
        };
        return;
    }

    const now = new Date().toISOString();

    const entity = {
        partitionKey: "Hive1",
        rowKey: now,
        Weight: body.Weight,
        InternalTemp: body.InternalTemp,
        BatteryVoltage: body.BatteryVoltage,
        HiveHum: body.HiveHum,
        LegTemp: body.LegTemp,
        ReceivedAt: now
    };

    try {
        await tableClient.createEntity(entity);
    } catch (err) {
        context.log.error("Table insert failed:", err.message);
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Failed to store telemetry.", detail: err.message })
        };
        return;
    }

    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "OK", timestamp: now })
    };

    context.log(`Telemetry stored: RowKey=${now}, Weight=${body.Weight}`);
};
