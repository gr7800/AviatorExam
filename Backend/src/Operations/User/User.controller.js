// Import the User model and required libraries
const UserModel = require('./User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// Login controller
exports.LoginController = async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;
    try {
        // Find a user with the provided email in the database
        const userpersent = await UserModel.findOne({ email: email });
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect username' });
        }
        // Check if the password provided matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, userpersent.password);
        if (!isPasswordCorrect) {
            // If the password does not match, send a 401 Unauthorized status code
            return res.status(401).send({ message: 'Incorrect password' });
        }
        const token = jwt.sign(
            {
                email: userpersent.email,
                fullName: userpersent.fullName,
                _id: userpersent._id
            },
            process.env.JWT_SECRET,
            { expiresIn: '7 days' }
        );
        // Send a success response with the tokens and user data
        return res.status(200).send({ token, userpersent, message: 'Login successful' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

//Get All User
exports.GetAllUser = async (req, res) => {
    // Extract email and password from request body
    let { token } = req.headers;
    console.log(token);
    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        if (decode.email != "cto.aviatorcloud@gmail.com") {
            return res.status(401).send({ message: 'You are unable access this feature' });
        }
        const AllUser = await UserModel.find();

        return res.status(200).send({ user: AllUser });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

exports.GetSingalUser = async (req, res) => {
    // Extract email and password from request body
    let { token } = req.headers;
    let decode = jwt.decode(token, process.env.JWT_SECRET);
    try {
        const AllUser = await UserModel.findOne({ email: decode.email });
        if (!AllUser) {
            return res.status(401).send({ message: "Please Login again" });
        }
        return res.status(200).send({ token: token, userpersent: AllUser, message: 'Login successful' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// Signup controller
exports.RegisterController = async (req, res) => {
    // Extract name, email, and password from request body
    const { fullName, email, password, otp } = req.body;
    try {
        // Check if a user with the provided email already exists in the database
        const exsistinguser = await UserModel.findOne({ email });
        if (exsistinguser) {
            // If a user already exists, send a 409 Conflict status code
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        // Hash the password and create a new user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            otp: otp
        });
        // Send a success response with the newly created user data
        return res.status(201).send({
            user: newUser,
            message: 'User has register Successfully !',
        });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// Generate a 6-digit OTP
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    return otp.toString(); // Convert the number to a string
};

exports.GetOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const userpersent = await UserModel.findOne({ email: email });
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect UserEmail' });
        }
        // Generate OTP
        const otp = generateOTP();

        userpersent.otp = otp;
        await userpersent.save();

        // Send OTP to the provided email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        const mailsendinfo = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP send to email successfully it is valid for 5 minute', mailsendinfo, otp: otp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}


// Update password controller
exports.UpdatePasswordController = async (req, res) => {
    // Extract the user ID and password from the request body
    const { email, otp, newPassword } = req.body;

    try {
        // Find the user in the database by their ID
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            // If no user is found, send a 404 Not Found status code
            return res.status(404).send({ message: 'User with this email does not exist' });
        }
        
        if (user.otp != otp) {
            return res.status(404).send({ message: "OTP Verfication failed" })
        }

        // Send a success response
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};


// Profile Update controller
exports.ProfileUpdateController = async (req, res) => {
    // Extract user ID, full name, and avatar URL from request body
    const { email, avatar } = req.body;
    let { id } = req.params;
    try {
        // Find the user in the database by their ID
        let updateUser = await UserModel.findByIdAndUpdate({ _id: id }, req.body);
        let newUser = await UserModel.findOne({ _id: id });
        return res.status(200).send({ status: true, message: "user updated successfully", user: newUser });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

exports.deleteAuser = async (req, res) => {
    // Extract user ID, full name, and avatar URL from request body
    let { id } = req.params;
    console.log(id)
    try {
        let user = await UserModel.findByIdAndDelete({ _id: id });
        let alluser = await UserModel.find();
        return res.status(200).send({ status: true, message: "user deleted successfully", user: alluser });
    } catch (error) {
        console.log(error);
        return res.status(401).send({ status: false, message: "something went wrong" });
    }
};