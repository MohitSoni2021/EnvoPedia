import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const NEWS_API = process.env.NEWS_API;

// Mongoose Schema with imageUrl
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

// Fetch & update news from API
const updateNews = async () => {
  try {
    const response = await axios.get(NEWS_API);
    const articles = response.data.articles;

    Article.deleteMany(); // Clear old articles
    console.log(`Cleared ${await Article.countDocuments({})} old articles`);

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

// Scheduler every 50 minutes
const startScheduler = async () => {
  await updateNews(); // Initial fetch
  const interval = 50 * 60 * 1000;
  setInterval(updateNews, interval);
};

// App entry point
const init = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "esproject"
    });
    console.log('✅ Connected to MongoDB');

    await startScheduler();
  } catch (err) {
    console.error('❌ Initialization error:', err.message);
  }
};

init();
