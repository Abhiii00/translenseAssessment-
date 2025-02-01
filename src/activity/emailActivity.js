const nodemailer = require('nodemailer');
let config = require('../config/config')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
   }
});

exports.emailActivity = async (email, otp) => {
    try {
        const mailOptions = {
            from: config.EMAIL, 
            to: email,
            subject: 'Your OTP Code',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: auto;">
                    <h2 style="color: #333; text-align: center;">Your OTP Code</h2>
                    <p style="font-size: 16px;">Dear User,${email}</p>
                    <p style="font-size: 16px;">Your One Time Password (OTP) is:</p>
                    <div style="font-size: 22px; font-weight: bold; color: #2c3e50; text-align: center; padding: 10px; border: 2px dashed #2c3e50; display: inline-block;">${otp}</div>
                    <p style="font-size: 16px;">Please use this OTP to complete your action.</p>
                    <p style="font-size: 16px;">Thank you,</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return 'OTP sent successfully';
    } catch (error) {
        throw error;
    }
};
