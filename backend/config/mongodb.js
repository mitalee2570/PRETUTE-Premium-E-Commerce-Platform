const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

let isConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pretute_ecommerce';

  try {
    // Set connection options
    mongoose.set('strictQuery', false);

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000 // 3 seconds timeout so server won't hang
    });

    isConnected = true;
    console.log(`=================================================`);
    console.log(`  🍃 MongoDB Connected Successfully!`);
    console.log(`  📦 Database: ${mongoose.connection.name}`);
    console.log(`  🌐 Host: ${mongoose.connection.host}`);
    console.log(`=================================================`);

    // Migrate any existing users from customers.json into MongoDB
    await autoSeedCustomers();

  } catch (error) {
    isConnected = false;
    console.warn(`=================================================`);
    console.warn(`  ⚠️ MongoDB Connection Notice:`);
    console.warn(`  Could not connect to: ${mongoUri}`);
    console.warn(`  Reason: ${error.message}`);
    console.warn(`  ℹ️ The API will use local JSON store as a fallback.`);
    console.warn(`  👉 To use MongoDB Atlas, set MONGODB_URI in backend/.env`);
    console.warn(`=================================================`);
  }
};

// Monitor connection events
mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

mongoose.connection.on('connected', () => {
  isConnected = true;
});

// Auto seed customers from JSON store into MongoDB
async function autoSeedCustomers() {
  try {
    const User = require('../models/User');
    const jsonPath = path.join(__dirname, '../data/customers.json');

    if (!fs.existsSync(jsonPath)) return;

    const fileData = fs.readFileSync(jsonPath, 'utf-8');
    const customers = JSON.parse(fileData || '[]');

    for (const cust of customers) {
      const existing = await User.findOne({ email: cust.email.toLowerCase() });
      if (!existing) {
        await User.create({
          customId: cust.id,
          name: cust.name,
          email: cust.email.toLowerCase(),
          phone: cust.phone || '',
          password: cust.password || 'password123',
          address: cust.address || {},
          role: cust.role || 'customer',
          createdAt: cust.createdAt ? new Date(cust.createdAt) : new Date()
        });
        console.log(`  🌱 Auto-migrated user to MongoDB: ${cust.email}`);
      }
    }
  } catch (err) {
    console.warn('  ⚠️ Note during auto-seeding customers to MongoDB:', err.message);
  }
}

// Activity Logging helper
async function recordUserLog({ userId, email, action, status = 'SUCCESS', ip = 'Unknown', userAgent = 'Unknown', details = '' }) {
  try {
    if (isConnected) {
      const UserLog = require('../models/UserLog');
      const logEntry = await UserLog.create({
        userId: userId ? String(userId) : null,
        email: email ? email.toLowerCase() : 'unknown',
        action,
        status,
        ip,
        userAgent,
        details: typeof details === 'object' ? JSON.stringify(details) : String(details),
        timestamp: new Date()
      });
      return logEntry;
    } else {
      // Fallback in-memory/console log
      console.log(`[USER LOG - ${action}]: ${email} | ${status} | IP: ${ip} | Details: ${details}`);
      return null;
    }
  } catch (err) {
    console.error('Error writing UserLog:', err.message);
    return null;
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected,
  recordUserLog
};
