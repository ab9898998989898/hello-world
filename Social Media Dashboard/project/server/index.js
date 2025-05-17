import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample mock data
const mockData = {
  metrics: {
    followers: 45241,
    engagement: 12850,
    posts: 319,
    conversionRate: 3.8,
  },
  platforms: [
    { name: 'Twitter', followers: 8540, engagement: 5.2, posts: 125 },
    { name: 'Instagram', followers: 12400, engagement: 6.8, posts: 87 },
    { name: 'Facebook', followers: 18200, engagement: 3.1, posts: 65 },
    { name: 'LinkedIn', followers: 5300, engagement: 4.5, posts: 42 },
  ],
  recentPosts: [
    {
      id: 1,
      platform: 'twitter',
      content: "Just launched our new product line! Check it out at our website. #NewLaunch #Excited",
      stats: { likes: 542, comments: 128, shares: 87 },
      date: '2 days ago',
    },
    {
      id: 2,
      platform: 'instagram',
      content: "Behind the scenes at our monthly team meeting. Always inspiring to connect with the amazing people that make our company great!",
      stats: { likes: 873, comments: 56, shares: 23 },
      date: '4 days ago',
    },
    {
      id: 3,
      platform: 'facebook',
      content: "We're thrilled to announce we've been nominated for 'Best Innovation' award this year! Thank you to our amazing customers and team.",
      stats: { likes: 1254, comments: 234, shares: 187 },
      date: '1 week ago',
    },
  ],
  audience: {
    demographics: {
      gender: [
        { name: 'Female', value: 58 },
        { name: 'Male', value: 40 },
        { name: 'Other', value: 2 }
      ],
      age: [
        { name: '18-24', value: 15 },
        { name: '25-34', value: 35 },
        { name: '35-44', value: 30 },
        { name: '45-54', value: 12 },
        { name: '55+', value: 8 }
      ],
      locations: [
        { country: 'United States', count: 24563, percentage: 54.3 },
        { country: 'United Kingdom', count: 6821, percentage: 15.1 },
        { country: 'Canada', count: 4532, percentage: 10.0 },
        { country: 'Australia', count: 3271, percentage: 7.2 },
        { country: 'Germany', count: 2854, percentage: 6.3 },
        { country: 'Others', count: 3200, percentage: 7.1 },
      ]
    }
  }
};

// Routes
app.get('/api/metrics', (req, res) => {
  res.json(mockData.metrics);
});

app.get('/api/platforms', (req, res) => {
  res.json(mockData.platforms);
});

app.get('/api/recent-posts', (req, res) => {
  res.json(mockData.recentPosts);
});

app.get('/api/audience', (req, res) => {
  res.json(mockData.audience);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});