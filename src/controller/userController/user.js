let userDetailModel = require('../../model/userDetailModel/userDetail')
let {emailActivity} = require('../../activity/emailActivity')

exports.insertUserDetail = async (req, res) => {
    try {
        
        let checkEmail = await userDetailModel.findOne({email: req.body.email, isDeleted: false})
        if(checkEmail)  return res.status(400).send({ status: true, msg: 'Email already registered' });
        
        let checkMobile = await userDetailModel.findOne({email: req.body.mobile, isDeleted: false})
        if(checkMobile)  return res.status(400).send({ status: true, msg: 'Mobile number already registered' });

        let UserDetail = await userDetailModel.create(req.body)
        if (UserDetail) {
            return res.status(200).send({ status: true, msg: 'User detail added successfully' });
        } else {
            return res.status(400).send({ status: false, msg: 'Something went wrong! Please try again later.' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error', error: error.message });
    }
};

exports.sendVerificationOtp = async (req, res) => {
    try {
        let { email } = req.body;       

        let checkEmail = await userDetailModel.findOne({ email: email, isDeleted: false });
        if (!checkEmail) return res.status(400).send({ status: false, msg: 'No email found' });

        let otp = Math.floor(100000 + Math.random() * 900000)

        console.log(otp)

        let emailResponse = await emailActivity(email, otp);
        if(emailResponse){
        let ress = await userDetailModel.findOneAndUpdate(
            { email: email },
            { $set: { emailOtp: otp } },
            { new: true }
        );
        return res.status(200).send({ status: true, msg: 'OTP sent successfully' });
    }

    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
};

exports.otpVerification = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let checkOtp = await userDetailModel.findOne({ email: email, isDeleted: false });

        if (!checkOtp) {
            return res.status(400).send({ status: false, msg: 'No email found' });
        }

        if (checkOtp.emailOtp != otp) {
            return res.status(400).send({ status: false, msg: 'Invalid OTP' });
        }

        await userDetailModel.findOneAndUpdate(
            { email: email },
            { $set: { emailOtp: null } },
            { new: true }
        );
        return res.status(200).send({ status: true, msg: 'Email verified successfully' });

    } catch (error) {
        return res.status(500).send({ status: false, msg: "Internal Server Error" });
    }
};

exports.updateUserDetail = async (req, res) => {
    try {
        const { id } = req.params; 

        let UserDetail = await userDetailModel.findByIdAndUpdate(id, req.body);

        if (UserDetail) {
            return res.status(200).send({ status: true, msg: 'User detail updated successfully'});
        } else {
            return res.status(400).send({ status: false, msg: 'User detail not found!' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error', error: error.message });
    }
};

exports.getUserDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        let UserDetail = await userDetailModel.findById({_id: id, isDeleted: false});

        if (UserDetail) {
            return res.status(200).send({ status: true, msg: 'User detail fetched successfully', data: UserDetail });
        } else {
            return res.status(404).send({ status: false, msg: 'User detail not found!' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error', error: error.message });
    }
};

exports.getUserList = async (req, res) => {
    try {
        let UserList = await userDetailModel.find({isDeleted: false, type: req.query.type});
        if (UserList) {
            return res.status(200).send({ status: true, msg: 'User list fetched successfully', data: UserList });
        } else {
            return res.status(404).send({ status: false, msg: 'Something went wrong! Please try again later.' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error', error: error.message });
    }
};