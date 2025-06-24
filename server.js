const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const inquiryRoutes = require('./routes/inquiryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const verifyToken = require('./middleware/auth');
const Inquiry = require('./models/Inquiry');







dotenv.config();

const app = express();
app.use(express.json());



console.log("Mongo URL:", process.env.MONGO_URL);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Sample route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });
app.use(cors());
app.use('/api/inquiries', inquiryRoutes); // ✅ Correct spelling
app.use('/api/admin', adminRoutes);
app.get('/api/inquires', verifyToken, async (req, res) => {
  const Inquiry = require('./models/Inquiry');
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});
// POST: Submit inquiry
app.post('/api/inquires', async (req, res) => {
  try {
      const newInquiry = new Inquiry(req.body);
      await newInquiry.save();
      res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
      console.error('Error saving inquiry:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.get('/', (req, res)=> res.send('API Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
