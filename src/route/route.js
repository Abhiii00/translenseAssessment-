let express = require('express')
let router = express.Router()


let usreController = require('../controller/userController/user')
let {businessDetailValidation, ownerDetailValidation} = require('../middleware/validation')


//-------------------------------------|| BUSINESS INFO ROUTE ||--------------------------------------------------

router.post('/insertUserDetail', businessDetailValidation, usreController.insertUserDetail)
router.patch('/updateUserDetail/:id', usreController.updateUserDetail)
router.get('/getUserDetailById/:id', usreController.getUserDetailById)
router.get('/getUserList', usreController.getUserList)
router.post('/sendVerificationOtp', usreController.sendVerificationOtp)
router.post('/otpVerification', usreController.otpVerification)






module.exports = router