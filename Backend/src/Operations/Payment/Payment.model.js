const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  allow_repeated_payments: Boolean,
  amount: String,
  buyer_name: String,
  created_at: String,
  email: String,
  email_status: String,
  expires_at: String,
  id: String,
  longurl: String,
  modified_at: String,
  phone: String,
  purpose: String,
  redirect_url: String,
  send_email: Boolean,
  send_sms: Boolean,
  shorturl: String,
  sms_status: String,
  status: String,
  webhook: String,
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
