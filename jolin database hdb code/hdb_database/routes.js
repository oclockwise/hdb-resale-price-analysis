const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Q1 - Top 10 Towns by Avg Resale Price
  router.get('/top-towns', (req, res) => {
    const sql = `
      SELECT t.town_name, FORMAT(ROUND(AVG(tr.resale_price), 2), 2) AS avg_resale_price
      FROM Transaction tr
      JOIN Flat f ON tr.flat_id = f.flat_id
      JOIN Block b ON f.block = b.block AND f.street_name = b.street_name
      JOIN Town t ON b.town_name = t.town_name
      WHERE f.flat_type = '4 ROOM'
      GROUP BY t.town_name
      ORDER BY AVG(tr.resale_price) DESC
      LIMIT 10;
    `;
    pool.query(sql, (err, results) => {
      if (err) return res.status(500).send('Database query error');
      res.render('qn1', { title: 'Top 10 Towns by Avg Resale Price', data: results });
    });
  });

  // Q2 - Average Price by Flat Type and Year
  router.get('/avg-price-by-year', (req, res) => {
    const sql = `
      SELECT f.flat_type, CAST(LEFT(tr.month, 4) AS UNSIGNED) AS year,
             FORMAT(ROUND(AVG(tr.resale_price), 2), 2) AS avg_resale_price
      FROM Transaction tr
      JOIN Flat f ON tr.flat_id = f.flat_id
      GROUP BY f.flat_type, year
      ORDER BY year ASC, f.flat_type ASC;
    `;
    pool.query(sql, (err, results) => {
      if (err) return res.status(500).send('Database query error');
      res.render('qn2', { title: 'Average Resale Price by Flat Type & Year', data: results });
    });
  });

  // Q3 - Average Price by Lease Year
  router.get('/lease-year-avg-price', (req, res) => {
    const sql = `
      SELECT f.lease_commence_year, FORMAT(AVG(tr.resale_price), 2) AS avg_resale_price
      FROM Flat f JOIN Transaction tr ON f.flat_id = tr.flat_id
      GROUP BY f.lease_commence_year
      ORDER BY f.lease_commence_year;
    `;
    pool.query(sql, (err, results) => {
      if (err) return res.status(500).send('Database query error');
      res.render('qn3', { title: 'Average Resale Price by Lease Commence Year', data: results });
    });
  });

  // Q4 - Average Price by Storey Range
  router.get('/avg-price-by-storey', (req, res) => {
    const sql = `
      SELECT f.storey_range, FORMAT(AVG(tr.resale_price), 2) AS avg_resale_price
      FROM Flat f JOIN Transaction tr ON f.flat_id = tr.flat_id
      GROUP BY f.storey_range
      ORDER BY f.storey_range;
    `;
    pool.query(sql, (err, results) => {
      if (err) return res.status(500).send('Database query error');
      res.render('qn4', { title: 'Average Resale Price by Storey Range', data: results });
    });
  });

  // Q5 - Transaction Counts by Town and Flat Type
  router.get('/transactions-by-town', (req, res) => {
    const sql = `
      SELECT t.town_name, f.flat_type, COUNT(*) AS transaction_count
      FROM Town t
      JOIN Block b ON t.town_name = b.town_name
      JOIN Flat f ON b.block = f.block AND b.street_name = f.street_name
      JOIN Transaction tr ON f.flat_id = tr.flat_id
      GROUP BY t.town_name, f.flat_type
      ORDER BY t.town_name, transaction_count DESC;
    `;
    pool.query(sql, (err, results) => {
      if (err) return res.status(500).send('Database query error');
      res.render('qn5', { title: 'Transaction Counts by Town and Flat Type', data: results });
    });
  });

  return router;
};
