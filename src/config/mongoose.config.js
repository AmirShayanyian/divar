const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function mongooseConnection() {
  await mongoose
    .connect(process.env.MONGO_URL, { autoIndex: true })
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      console.log('error :', err);
    });
}

module.exports = mongooseConnection;
