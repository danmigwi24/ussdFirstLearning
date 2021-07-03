const router = require('express').Router();
const{ussd}=require("./ussd.controller")
router.post('/',ussd) 
module.exports = router;
