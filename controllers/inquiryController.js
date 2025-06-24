const Inquiry = require('../models/Inquiry');

const submitInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newInquiry = new Inquiry({ name, email, message });
    await newInquiry.save();

    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries
};


