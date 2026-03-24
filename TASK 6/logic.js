async function refreshAuditData() {
    // 1. Fetch from the View
    const reportRes = await fetch('/api/daily-report');
    const reports = await reportRes.json();
    
    const reportHtml = reports.map(r => `
        <div class="card">
            <h4>${r.ActivityDate}</h4>
            <p>Orders: ${r.TotalOrders} | Updates: ${r.TotalUpdates}</p>
        </div>
    `).join('');
    document.getElementById('report-container').innerHTML = reportHtml;

    // 2. Fetch from the Audit Table (Triggered Data)
    const logRes = await fetch('/api/audit-logs');
    const logs = await logRes.json();

    const logHtml = logs.map(l => `
        <li class="log-item ${l.ActionType.toLowerCase()}">
            <strong>${l.ActionType}</strong>: Order #${l.OrderID} recorded at ${new Date(l.LogTime).toLocaleTimeString()}
        </li>
    `).join('');
    document.getElementById('log-list').innerHTML = logHtml;
}

// Auto-refresh every 5 seconds to simulate "Real-Time"
setInterval(refreshAuditData, 5000);
refreshAuditData();
