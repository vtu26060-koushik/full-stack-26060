const express = require('express');
const mysql = require('mysql2/promise'); // Using promise-based for cleaner transactions
const app = express();
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'shop_db'
});

// --- ROUTE 1: GET ORDER HISTORY (The JOIN) ---
app.get('/api/history', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT O.OrderID, C.CustomerName, P.ProductName, O.Quantity, (O.Quantity * P.Price) AS Total
            FROM Orders O
            JOIN Customers C ON O.CustomerID = C.CustomerID
            JOIN Products P ON O.ProductID = P.ProductID
            ORDER BY O.OrderDate DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- ROUTE 2: PROCESS PAYMENT (The TRANSACTION) ---
app.post('/api/pay', async (req, res) => {
    const { userId, merchantId, amount } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction(); // START TRANSACTION

        // 1. Deduct from User
        await connection.query(
            'UPDATE Accounts SET Balance = Balance - ? WHERE AccountID = ?', 
            [amount, userId]
        );

        // 2. Add to Merchant
        await connection.query(
            'UPDATE Accounts SET Balance = Balance + ? WHERE AccountID = ?', 
            [amount, merchantId]
        );

        await connection.commit(); // SUCCESS!
        res.send({ success: true, message: "Payment processed successfully" });

    } catch (err) {
        await connection.rollback(); // FAILURE - Undo everything
        res.status(400).send({ success: false, message: "Transaction Failed: " + err.message });
    } finally {
        connection.release();
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
