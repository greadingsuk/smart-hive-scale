/* Smart Hive Scale Dashboard — Application Logic */

const API_BASE = "https://hivescale.azurewebsites.net/api/GetTelemetry";
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

let weightChart, tempChart, envChart;
let refreshTimer;

const chartDefaults = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: {
            labels: { color: "#9ca3af", usePointStyle: true, padding: 16 }
        },
        tooltip: {
            backgroundColor: "#1a1d27",
            borderColor: "#2a2e3e",
            borderWidth: 1,
            titleColor: "#e4e4e7",
            bodyColor: "#e4e4e7",
            padding: 12,
            callbacks: {
                title: function (items) {
                    return new Date(items[0].parsed.x).toLocaleString();
                }
            }
        }
    },
    scales: {
        x: {
            type: "time",
            time: { tooltipFormat: "dd MMM HH:mm" },
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#9ca3af", maxTicksLimit: 10 }
        },
        y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#9ca3af" }
        }
    }
};

function initCharts() {
    weightChart = new Chart(document.getElementById("weightChart"), {
        type: "line",
        data: {
            datasets: [{
                label: "Weight (kg)",
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.1)",
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                pointHitRadius: 8,
                borderWidth: 2,
                data: []
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                ...chartDefaults.scales,
                y: { ...chartDefaults.scales.y, title: { display: true, text: "kg", color: "#9ca3af" } }
            }
        }
    });

    tempChart = new Chart(document.getElementById("tempChart"), {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Internal (°C)",
                    borderColor: "#ef4444",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    fill: false,
                    tension: 0.3,
                    pointRadius: 0,
                    borderWidth: 2,
                    data: []
                },
                {
                    label: "Leg (°C)",
                    borderColor: "#a78bfa",
                    backgroundColor: "rgba(167,139,250,0.1)",
                    fill: false,
                    tension: 0.3,
                    pointRadius: 0,
                    borderWidth: 2,
                    data: []
                }
            ]
        },
        options: {
            ...chartDefaults,
            aspectRatio: 2,
            scales: {
                ...chartDefaults.scales,
                y: { ...chartDefaults.scales.y, title: { display: true, text: "°C", color: "#9ca3af" } }
            }
        }
    });

    envChart = new Chart(document.getElementById("envChart"), {
        type: "line",
        data: {
            datasets: [
                {
                    label: "Humidity (%)",
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59,130,246,0.1)",
                    fill: false,
                    tension: 0.3,
                    pointRadius: 0,
                    borderWidth: 2,
                    data: [],
                    yAxisID: "yHum"
                },
                {
                    label: "Battery (V)",
                    borderColor: "#22c55e",
                    backgroundColor: "rgba(34,197,94,0.1)",
                    fill: false,
                    tension: 0.3,
                    pointRadius: 0,
                    borderWidth: 2,
                    data: [],
                    yAxisID: "yBat"
                }
            ]
        },
        options: {
            ...chartDefaults,
            aspectRatio: 2,
            scales: {
                x: chartDefaults.scales.x,
                yHum: {
                    type: "linear",
                    position: "left",
                    grid: { color: "rgba(255,255,255,0.05)" },
                    ticks: { color: "#3b82f6" },
                    title: { display: true, text: "%", color: "#3b82f6" }
                },
                yBat: {
                    type: "linear",
                    position: "right",
                    grid: { drawOnChartArea: false },
                    ticks: { color: "#22c55e" },
                    title: { display: true, text: "V", color: "#22c55e" }
                }
            }
        }
    });
}

async function fetchData() {
    const hours = document.getElementById("timeRange").value;
    const url = `${API_BASE}?hours=${encodeURIComponent(hours)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        hideError();
        return json;
    } catch (err) {
        showError(`Failed to load data: ${err.message}`);
        return null;
    }
}

function updateSummary(data) {
    if (!data || !data.data.length) {
        document.getElementById("lastReading").textContent = "No data";
        document.getElementById("dataPoints").textContent = "0 points";
        return;
    }

    const latest = data.data[data.data.length - 1];
    setCardValue("latestWeight", latest.weight, 1);
    setCardValue("latestInternalTemp", latest.internalTemp, 1);
    setCardValue("latestHiveHum", latest.hiveHum, 1);
    setCardValue("latestBattery", latest.batteryVoltage, 2);
    setCardValue("latestLegTemp", latest.legTemp, 1);

    const ago = timeSince(new Date(latest.timestamp));
    document.getElementById("lastReading").textContent = ago;
    document.getElementById("dataPoints").textContent = `${data.count} points`;
}

function setCardValue(id, val, decimals) {
    const el = document.getElementById(id);
    el.textContent = val != null ? Number(val).toFixed(decimals) : "—";
}

function timeSince(date) {
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return `${secs}s ago`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return `${Math.floor(secs / 86400)}d ago`;
}

function updateCharts(data) {
    if (!data || !data.data.length) return;

    const rows = data.data;
    const toPoint = (row, field) => ({ x: new Date(row.timestamp), y: row[field] });

    weightChart.data.datasets[0].data = rows.map(r => toPoint(r, "weight"));
    tempChart.data.datasets[0].data = rows.map(r => toPoint(r, "internalTemp"));
    tempChart.data.datasets[1].data = rows.map(r => toPoint(r, "legTemp"));
    envChart.data.datasets[0].data = rows.map(r => toPoint(r, "hiveHum"));
    envChart.data.datasets[1].data = rows.map(r => toPoint(r, "batteryVoltage"));

    weightChart.update("none");
    tempChart.update("none");
    envChart.update("none");
}

function showError(msg) {
    const el = document.getElementById("errorBanner");
    el.textContent = msg;
    el.classList.remove("hidden");
}

function hideError() {
    document.getElementById("errorBanner").classList.add("hidden");
}

async function refresh() {
    const data = await fetchData();
    updateSummary(data);
    updateCharts(data);
}

function startAutoRefresh() {
    clearInterval(refreshTimer);
    refreshTimer = setInterval(refresh, REFRESH_INTERVAL_MS);
}

document.addEventListener("DOMContentLoaded", () => {
    initCharts();
    refresh();
    startAutoRefresh();

    document.getElementById("timeRange").addEventListener("change", () => {
        refresh();
        startAutoRefresh();
    });

    document.getElementById("refreshBtn").addEventListener("click", () => {
        refresh();
        startAutoRefresh();
    });
});
