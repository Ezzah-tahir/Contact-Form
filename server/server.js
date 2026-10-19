const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/contact_demo')
 .then(() => console.log('MongoDB Connected to:', mongoose.connection.name))
  .catch(err => console.error(err));
app.use('/auth', require('./routes/auth'));
app.use('/messages', require('./routes/messages'));
app.listen(5000, () => console.log('Server running on port 5000'));