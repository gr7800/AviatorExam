const express = require('express');
const { createPaymentRequest, getSinglePaymentDetails, storeOrUpdatePayment, getPaymentByEmail } = require('./PaymentController');
const router = express.Router();

router.post("/payreq", createPaymentRequest)
router.post("/paydetails", getSinglePaymentDetails)
router.post("/storepayment",storeOrUpdatePayment)
router.get('/payments/:email',getPaymentByEmail)

module.exports = router;