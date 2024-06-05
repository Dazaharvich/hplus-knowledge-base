import mysql from 'mysql2';
import { authenticateToken } from '../../middleware/auth';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'knowledge_base'
});

const handler = (req, res) => {
  if (req.method === 'GET') {
    db.query('SELECT * FROM cases', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database query error' });
        return;
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const { title, description, solution } = req.body;
    const query = 'INSERT INTO cases (title, description, solution) VALUES (?, ?, ?)';
    db.query(query, [title, description, solution], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database insert error' });
        return;
      }
      res.status(201).json({ id: results.insertId, title, description, solution });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default (req, res) => authenticateToken(req, res, () => handler(req, res));