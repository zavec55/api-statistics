const express = require('express');
const Statistics = require('../models/statistics');
const router = express.Router();

/**
 * @swagger
 * /api/statistics/last-called:
 *   get:
 *     summary: Retrieve the last called endpoint
 *     responses:
 *       200:
 *         description: The last called endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 endpoint:
 *                   type: string
 *                 lastCalled:
 *                   type: string
 */
router.get('/last-called', async (req, res) => {
  try {
    const lastCalled = await Statistics.findOne().sort({ lastCalled: -1 });
    res.json(lastCalled);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/statistics/most-called:
 *   get:
 *     summary: Retrieve the most frequently called endpoint
 *     responses:
 *       200:
 *         description: The most frequently called endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 endpoint:
 *                   type: string
 *                 calls:
 *                   type: number
 */
router.get('/most-called', async (req, res) => {
  try {
    const mostCalled = await Statistics.findOne().sort({ calls: -1 });
    res.json(mostCalled);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/statistics/calls:
 *   get:
 *     summary: Retrieve the number of calls for each endpoint
 *     responses:
 *       200:
 *         description: The number of calls for each endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   endpoint:
 *                     type: string
 *                   calls:
 *                     type: number
 */
router.get('/calls', async (req, res) => {
  try {
    const calls = await Statistics.find();
    res.json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/statistics/update:
 *   post:
 *     summary: Update the call count for an endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               endpoint:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/update', async (req, res) => {
  const { endpoint } = req.body;
  try {
    let stat = await Statistics.findOne({ endpoint });
    if (stat) {
      stat.calls += 1;
      stat.lastCalled = Date.now();
    } else {
      stat = new Statistics({ endpoint });
    }
    await stat.save();
    res.json(stat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
