const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/";

if (!mongoURI) {
  console.error('MONGO_URI environment variable is not set');
  process.exit(1); // Exit the process with an error code
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with an error code
  });
