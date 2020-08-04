const express = require('express');
const cors = require('cors');
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();
app.use(cors());
//cors is a middleware that allows communication between the react client and server without restriction

var number;
//using this as a global variable so both functions have access to the phone number

app.get("/", (req,res) =>{
  const {phoneNumber} = req.query;
  number = `+${phoneNumber}`;
  res.send({phoneNumber});
    client.verify.services(process.env.TWILIO_SERVICE_ID)
      .verifications
      .create({to:number, channel: 'sms'})
      .then(verification => res.send(verification));
});

app.get('/confirm', (req,res) => {
  const {confirm} = req.query
    client.verify.services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks
      .create({to:number, code: confirm})
      .then(verification_check => res.send(verification_check.status));

})

app.listen(9000, () => {
  console.log("Running on port 9000");
})