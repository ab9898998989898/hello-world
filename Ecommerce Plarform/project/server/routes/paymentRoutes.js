import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Transaction from '../models/transactionModel.js';
import geoip from 'geoip-lite';
import Stripe from 'stripe';

const router = express.Router();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get user's country from IP
router.get('/country', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  res.json({ country: geo ? geo.country : null });
});

// Initialize Stripe payment
router.post('/stripe/init', protect, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId,
        userId: req.user._id.toString()
      }
    });
    
    // Create transaction record
    const transaction = new Transaction({
      orderId,
      userId: req.user._id,
      amount,
      currency: 'USD',
      paymentMethod: 'stripe',
      status: 'pending',
      transactionId: paymentIntent.id,
      paymentDetails: paymentIntent
    });
    
    await transaction.save();
    
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      transactionId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize Easypaisa payment
router.post('/easypaisa/init', protect, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    // TODO: Implement Easypaisa API integration
    const mockTransactionId = `EP${Date.now()}`;
    
    const transaction = new Transaction({
      orderId,
      userId: req.user._id,
      amount,
      currency: 'PKR',
      paymentMethod: 'easypaisa',
      status: 'pending',
      transactionId: mockTransactionId,
      paymentDetails: {
        phoneNumber: req.body.phoneNumber
      }
    });
    
    await transaction.save();
    
    res.json({
      success: true,
      transactionId: mockTransactionId,
      paymentUrl: `https://easypaisa.sandbox/pay/${mockTransactionId}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize JazzCash payment
router.post('/jazzcash/init', protect, async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    
    // TODO: Implement JazzCash API integration
    const mockTransactionId = `JC${Date.now()}`;
    
    const transaction = new Transaction({
      orderId,
      userId: req.user._id,
      amount,
      currency: 'PKR',
      paymentMethod: 'jazzcash',
      status: 'pending',
      transactionId: mockTransactionId,
      paymentDetails: {
        phoneNumber: req.body.phoneNumber
      }
    });
    
    await transaction.save();
    
    res.json({
      success: true,
      transactionId: mockTransactionId,
      paymentUrl: `https://jazzcash.sandbox/pay/${mockTransactionId}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Stripe webhook endpoint
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const transaction = await Transaction.findOne({ transactionId: paymentIntent.id });
      if (transaction) {
        transaction.status = 'completed';
        await transaction.save();
      }
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Payment status webhook endpoints for other payment methods
router.post('/easypaisa/webhook', async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    
    const transaction = await Transaction.findOne({ transactionId });
    if (transaction) {
      transaction.status = status;
      await transaction.save();
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/jazzcash/webhook', async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    
    const transaction = await Transaction.findOne({ transactionId });
    if (transaction) {
      transaction.status = status;
      await transaction.save();
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;