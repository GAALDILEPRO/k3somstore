const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/k3somstore');
    console.log(`🍃 [K3SOMSTORE Backend] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ [K3SOMSTORE Backend] MongoDB Connection Error: ${error.message}`);
    // Do not crash server in dev mode if local mongo isn't up yet
  }
};

module.exports = connectDB;
