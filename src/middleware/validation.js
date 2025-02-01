exports.businessDetailValidation = async (req, res, next) => {
    try {
        const data = req.body;
        let errorMsg = "";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6789]\d{9}$/;

        switch (true) {
            case Object.keys(data).length === 0:
                errorMsg = "You Have Not Entered Any Data";
                break;
            case !data.name:
                errorMsg = "Name is required";
                break;
            case !data.type:
                errorMsg = "Type is required";
                break;
            case !["Owner", "Business"].includes(data.type):
                errorMsg = "Type must be either 'Owner' or 'Business'";
                break;
            case !data.country:
                errorMsg = "Country is required";
                break;
            case !data.state:
                errorMsg = "State is required";
                break;
            case !data.city:
                errorMsg = "City is required";
                break;
            case !data.address:
                errorMsg = "Address is required";
                break;
            case data.type === "Business" && !data.openingTime:
                errorMsg = "Opening time is required for Business type";
                break;
            case data.type === "Business" && !data.closingTime:
                errorMsg = "Closing time is required for Business type";
                break;
            case !data.email:
                errorMsg = "Email is required";
                break;
            case !emailRegex.test(data.email):
                errorMsg = "Invalid email format";
                break;
            case !data.mobile:
                errorMsg = "Mobile number is required";
                break;
            case !mobileRegex.test(data.mobile):
                errorMsg = "Invalid mobile number. It should be 10 digits long and start with 6, 7, 8, or 9";
                break;
        }

        if (errorMsg === "") {
            next();
        } else {
            return res.status(400).send({ status: false, msg: errorMsg });
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
