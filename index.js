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
    response = `CON 1. ጊዜያዊ የይለፍ ቃል ፍጠር (በ2 ደቂቃ ውስጥ ጊዜው ያበቃል)
    2. ይግቡ (የመነጨውን ጊዜያዊ የይለፍ ቃል ያስገቡ)`;
  } else if (text == "1") {
    response = `CON ለመግባት የፋይዳ/ብሔራዊ መታወቂያ ቁጥሮን ያስገቡ`;
  } else if (/^1\*/.test(text) && !text.substring(2).includes("*")) {
    try {
      const result = await africasTalking.SMS.send({
        to: phoneNumber,
        //message is random 6 digit number to simulate ጊዜያዊ የይለፍ ቃል
        message: Math.floor(100000 + Math.random() * 900000).toString(),
        from: "national_ID_OTP",
      });
      console.log(result);
      response = `END ጊዜያዊ የይለፍ ቃል ወደ ቁጥርዎ ተልኳል። ለመግባት ይህንን ይጠቀሙ (በ2 ደቂቃ ውስጥ ጊዜው ያበቃል)`;
    } catch (ex) {
      console.error(ex.response);
    }
  } else if (text == "2") {
    response = `CON ቁጥርዎ ላይ የተላከውን ጊዜያዊ የይለፍ ቃል ያስገቡ`;
  }
  else if (/^2\*/.test(text) && !text.substring(2).includes("*")) {
    // This is the first request. Note how we start the response with CON
    response = `CON ወደ አእምሮ ጉዳዮች እንኳን በደህና መጡ። አገልግሎት ይምረጡ

    3. የምክክር (ቴራፒ) መርሃ ግብር
    4. ጠቃሚ ምክሮችን ያንብቡ`
            ;
  } else if (text.match(/3$/)) {
    console.log('body', req.body)
    // This is the first request. Note how we start the response with CON
    response = `CON በምን ላይ ምክክር ይፈልጋሉ?

    5. ብቸኝነት
    6. ምልክቶችን ተወያዩ
    7. ከአእምሮ ጤና ጋር የተያያዙ ጥያቄዎችን ይጠይቁ
    `
            ;
  }
  else if (text.match(/[567]$/)) {
    console.log('body', req.body)

    // This is the first request. Note how we start the response with CON
    response = `CON ለእርስዎ የሚመቾትን ቀን እና ደረጃ ይምረጡ

    8. የካቲት 21 2024 8 am - 9 am | ዶ/ር ብዙነህ አባተ (ወንድ) | የሰዓት ዋጋ: 500 ETB
    9. የካቲት 26 2024 3 pm - 4 ከሰዓት | ዶ/ር ማርታ ሰሎሞን (ሴት)| የሰዓት ዋጋ: 700 ETB
    10. የካቲት 18 2024 10 am - 11 am | ዶ/ር ሜሮን ግርማ (ሴት)| የሰዓት ዋጋ: 350 ETB
    `
            ;
  }
  else if (text.match(/[89][0-9]?$|10$/)) {
    const result = await africasTalking.SMS.send({
        to: phoneNumber,
        //message is random 6 digit number to simulate ጊዜያዊ የይለፍ ቃል
        message: "የተቀማጭ ገንዘብ በተመረጠው ክፍለ ጊዜ @ CBE በሒሳብ፡ 1000272819665 ወይም @ telebirr በስልክ ቁጥር +251 930 586 155. ማሳሰቢያ፡ ይህንን የማጣቀሻ ቁጥር በአስተያየቶች/በማስቀመጫ ክፍል (ማጣቀሻ፡ 1039047284) ያካትቱ። ያንን ካደረግን በኋላ የክፍያ ማረጋገጫችንን ይጠብቁ።    እናመሰግናለን!",
        from: "MindMatters",
      });

    // This is the first request. Note how we start the response with CON
    response = `END 
    የክፍለ-ጊዜ ቦታ ማስያዝን ለማጠናቀቅ እነዚህን ደረጃዎች ይከተሉ፡-
        
        ደረጃ 1፡ በኤስኤምኤስ በኩል በተላከልህ መመሪያ መሰረት ሙሉ ክፍያ ፈጽም።
        ደረጃ 2፡ የክፍያ ማረጋገጫን ይጠብቁ
        ደረጃ 3፡ በተመረጠው ቀን ለስልክ ክፍለ ጊዜ ጥሪ ለመቀበል ዝግጁ ይሁኑ
    `
            ;
  }
   else if (text) {
    console.log('body at default', req.body)

    response = `END ልክ ያልሆነ ግቤት፣ እባክዎን ማውጫውን ይመልከቱ`;
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
