exports.ussdController = (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  console.log("###########", req.body);
  // myLogger.info(req.body);

  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON 1. Login`;
  } else if (text == "1") {
    // This is the first request. Note how we start the response with CON
    response = `CON Enter license id to login`;
  } else if (/^1\*/.test(text) && !text.substring(2).includes("*")) {
    //REMINDER: validate pwd entered doesn't contain */ that is is alphanumeric
    // This is the first request. Note how we start the response with CON
            response = `CON Welcome to Traffic Management system
            2. get payment link
            3. set password
            4. get information`;
  } else if (text) {
    response = `END invalid input, please refer the menu`;
  }

  res.set("Content-Type: text/plain");
  res.send(response);
}

//NOTE no login required because phone_num is already the validator, login would be redundant
//TODO
//--get link to payment --- by rec of evaluators
//reset password(new pwd nd confirm)
//news (put the option and decide at admin if we're doing it or not)

//NOTE: ussd auth: enter license, if license and phone num match cont.