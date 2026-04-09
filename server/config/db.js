import mongoose from 'mongoose'

// connectDB: Call this once at server startup to connect to MongoDB
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`)
    // Exit the process — server is useless without the database
    process.exit(1)
  }
}

export default connectDB