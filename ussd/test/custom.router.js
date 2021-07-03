const router = require('express').Router();

router.post("/", (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    console.log(req.body)
    let response = "";
    switch (text) {
        case "": response = `CON What would you like to check
        1. My Account
        2. My phone number
        3. Service code
        4. Session ID`
            res.send(response);
            break;
        case "1": response = `CON My Account
    1. Account number
    2. Account balance`
            res.send(response);
            break;
        case "1*1":
            let accountNumber = 'ACC492K45'
            response = `END Account number is ${accountNumber}`;
            res.send(response);
            break;
        case "1*2":
            let accountBalance = 'KES.4000'
            response = `END Account balance is ${accountBalance}`;
            res.send(response)
            break;
        case "2": response = `END your phone number is ${phoneNumber}`
            res.send(response)
            break;
        case "3": response = `END your service code is ${serviceCode}`
            res.send(response)
            break;
        case "4": response = `END your session Id is ${sessionId}`
            res.send(response)
            break;
        default:
            text = "No value found";
    }
});

module.exports = router;
