const { connect, connection } = require('mongoose');

// Load environment variables
require('dotenv').config();

// Validate DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Connect to MongoDB
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = connection;

// database connection event
db.on('connected', function () {
  console.log(`✅ Mongoose connected to: ${db.host}:${db.port}`);
});

db.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.warn("⚠️ Mongoose disconnected");
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.close();
  console.log('🔌 Mongoose connection closed due to app termination');
  process.exit(0);
});