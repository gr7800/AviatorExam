const Insta = require('instamojo-nodejs');
const PaymentModel = require('./Payment.model');
const UserModel = require("../User/User.model")

const API_KEY = process.env.INSTAMOJO_API_KEY;
const AUTH_KEY = process.env.INSTAMOJO_API_AUTH;

Insta.isSandboxMode(true);

Insta.setKeys(API_KEY, AUTH_KEY);

exports.createPaymentRequest = async (req, res) => {
    console.log(API_KEY, AUTH_KEY);
    try {
        var data = new Insta.PaymentData();
        data.purpose = req.body.purpose;            // REQUIRED
        data.amount = req.body.amount;
        data.currency = 'INR';
        data.buyer_name = req.body.buyer_name;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.send_sms = false;
        data.send_email = true;
        data.allow_repeated_payments = false;          // REQUIRED
        data.setRedirectUrl(req.body.redirect_url);

        const createPaymentPromise = () => {
            return new Promise((resolve, reject) => {
                Insta.createPayment(data, function (error, response) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        const parsedResponse = JSON.parse(response);
                        resolve(parsedResponse.payment_request);
                    }
                });
            });
        };

        const paymentResponse = await createPaymentPromise();
        return res.status(200).json({ success: true, data: paymentResponse });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error });
    }
};


// Assuming you have required the necessary modules and configured 'Insta' properly

exports.getSinglePaymentDetails = (req, res) => {
    const PAYMENT_REQUEST_ID = req.body.payment_requestId;
    const PAYMENT_ID = req.body.paymentId;

    // Wrap the callback-based function in a Promise
    const getPaymentDetailsPromise = (PAYMENT_REQUEST_ID, PAYMENT_ID) => {
        return new Promise((resolve, reject) => {
            Insta.getPaymentRequestStatus(PAYMENT_REQUEST_ID, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    getPaymentDetailsPromise(PAYMENT_REQUEST_ID, PAYMENT_ID)
        .then((paymentDetails) => {
            if (!paymentDetails) {
                return res.status(404).json({ error: "Payment details not found" });
            }

            console.log(paymentDetails);

            // Return the payment details as a response
            return res.status(200).json({ paymentDetails });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: "Error fetching payment details" });
        });
};


// Store payment information or update if email exists
exports.storeOrUpdatePayment = async (req, res) => {
    try {
        const email = req.body.email;
        const existingPayment = await PaymentModel.findOne({ email });
        if (existingPayment) {
            // If payment with the email already exists, update it
            await PaymentModel.updateOne({ email }, req.body);
            return res.status(200).json({ success: true, message: 'Payment information updated successfully' });
        } else {
            // If payment with the email does not exist, create a new payment
            const payment = new PaymentModel(req.body);
            await payment.save();
            return res.status(201).json({ success: true, message: 'Payment information stored successfully' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Failed to store or update payment information' });
    }
};

// Get payment information by email
exports.getPaymentByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const payment = await PaymentModel.findOne({ email });
        if (!payment) {
            return res.status(404).json({ message: 'Payment information not found' });
        } else {
            return res.status(200).json(payment);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get payment information' });
    }
};


