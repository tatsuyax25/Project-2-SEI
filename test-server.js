// Simple test to check if server.js can be required without errors
try {
  console.log('Testing server.js...');
  const app = require('./server.js');
  console.log('✅ Server loaded successfully');
  console.log('App type:', typeof app);
} catch (error) {
  console.error('❌ Error loading server:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}