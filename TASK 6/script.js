// Get the live audit stream
app.get('/api/audit-logs', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM AuditLogs ORDER BY LogTime DESC LIMIT 10');
    res.json(rows);
});

// Get the daily report from the VIEW
app.get('/api/daily-report', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM DailyActivityReport');
    res.json(rows);
});
