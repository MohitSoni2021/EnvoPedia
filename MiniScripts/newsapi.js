import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;
const NEWS_API = process.env.NEWS_API;

app.use(cors());

// Mongoose Schema
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: { type: String, unique: true },
  publishedAt: Date,
  imageUrl: String,
  source: {
    id: String,
    name: String,
  }
});
const Article = mongoose.model('Article', articleSchema);

// Fetch & update news
const updateNews = async () => {
  try {
    const response = await axios.get(NEWS_API);
    const articles = response.data.articles;

    const oldCount = await Article.countDocuments({});
    await Article.deleteMany({});
    console.log(`🧹 Cleared ${oldCount} old articles`);

    for (const article of articles) {
      await Article.findOneAndUpdate(
        { url: article.url },
        {
          title: article.title,
          description: article.description,
          publishedAt: article.publishedAt,
          imageUrl: article.urlToImage || null,
          source: article.source,
        },
        { upsert: true, new: true }
      );
    }

    console.log(`✅ Updated ${articles.length} articles at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('❌ Error updating news:', err.message);
  }
};

// Scheduler
const startScheduler = async () => {
  await updateNews(); // Initial run
  setInterval(updateNews, 50 * 60 * 1000); // Every 50 mins
};

// GET Route to fetch all articles
app.get('/news', async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishedAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Init app
const init = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "esproject"
    });
    console.log('✅ Connected to MongoDB');

    await startScheduler();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Initialization error:', err.message);
  }
};

init();
