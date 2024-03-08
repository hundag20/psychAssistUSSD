const AfricasTalking = require("africastalking");
const AT_credentials = {
  apiKey: "597be6e24a0299e57914ad24d84577d52893127101dcc5a72f0f9355fa131e0c",
  username: "sandbox",
};
// Instantiate the SMS service
const africasTalking = AfricasTalking(AT_credentials);

exports.ussdController = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  console.log("###########", req.query, req.params, req.body);
  // myLogger.info(req.body);

  let response = "";

  if (text == "") {
    response = `CON 1. Generate OTP (expires in 2 minutes)
    2. Login (enter generated OTP)`;
  } else if (text == "1") {
    response = `CON Enter Fayda/National ID to login`;
  } else if (/^1\*/.test(text) && !text.substring(2).includes("*")) {
    try {
      const result = await africasTalking.SMS.send({
        to: phoneNumber,
        //message is random 6 digit number to simulate OTP
        message: Math.floor(100000 + Math.random() * 900000).toString(),
        from: "national_ID_OTP",
      });
      console.log(result);
      response = `END One Time Password (OTP) has been sent to your number. Use this for logging in (expires in 2 minutes)`;
    } catch (ex) {
      console.error(ex.response);
    }
  } else if (text == "2") {
    response = `CON Enter OTP that was sent your number`;
  }
  else if (/^2\*/.test(text) && !text.substring(2).includes("*")) {
    // This is the first request. Note how we start the response with CON
    response = `CON Welcome to Mind Matters. Choose the service you want to get
            3. schedule for consultaion`;
  } else if (text) {
    response = `END invalid input, please refer the menu`;
  }

  res.set("Content-Type: text/plain");
  res.send(response);
};

//NOTE no login required because phone_num is already the validator, login would be redundant
//TODO
//--get link to payment --- by rec of evaluators
//reset password(new pwd nd confirm)
//news (put the option and decide at admin if we're doing it or not)

//NOTE: ussd auth: enter license, if license and phone num match cont.
