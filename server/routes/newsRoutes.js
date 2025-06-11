const express = require('express');
const router = express.Router();
const News = require('../models/News');

// POST a new news item
router.post('/', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add news' });
  }
});

// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// ✅ GET a single news item by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error('Error fetching news by ID:', err);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
});

// PUT update news by ID
// PUT update news by ID
router.put('/:id', async (req, res) => {
  const { title, category, author, description } = req.body;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, category, author, description },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a news item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: 'News item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

module.exports = router;
