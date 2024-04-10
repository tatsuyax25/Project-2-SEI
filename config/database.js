import { connect, connection } from 'mongoose';

// replace your database connection string here
connect(process.env.DATABASE_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = connection;

// database connection event
db.on('connected', function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});

db.on('error', function(err){
  console.log(err)
})