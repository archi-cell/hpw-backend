const express = require('express');
const router = express.Router();
const { submitInquiry, getAllInquiries } = require('../controllers/inquiryController');

router.post('/', submitInquiry);
router.get('/', getAllInquiries); // ← GET all inquiries for admin

module.exports = router;
