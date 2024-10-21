const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");

router.get("/", async function (req, res, next) {
  res.send("App is running");
});

router.post("/", async function (req, res, next) {
  const {
    name: companyName,
    email: companyEmail,
    message: companyMessage,
  } = req.body;

  const currentDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const htmlString = `<!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          * {
              box-sizing: border-box;
          }

          body {
              margin: 0;
              padding: 0;
          }

          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }

          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }

          p {
              line-height: inherit;
          }

          .desktop_hide,
          .desktop_hide table {
              display: none;
              max-height: 0;
              overflow: hidden;
          }

          @media (max-width:670px) {
              .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
              }
          }
      </style>
  </head>

  <body style="background-color: #FFFFFF; margin: 0; padding: 0;">
      <table width="100%" style="background-color: #FFFFFF;">
          <tbody>
              <tr>
                  <td>
                      <table align="center" width="100%" style="background-color: #0f2c1b;">
                          <tbody>
                              <tr>
                                  <td>
                                      <table align="center" style="background-color: #eefff5; color: #000000; width: 650px;">
                                          <tbody>
                                              <tr>
                                                  <td style="text-align: center;">
                                                      <div style="padding-top: 15px; padding-bottom: 50px;">
                                                          <img src="https://2fab6ee9f7.imgdist.com/pub/bfra/mb14psiu/hmo/uop/tuy/RNR%20APP%20%281%29.png" alt="RNRRapidLogisticsInc" title="RNRRapidLogisticsInc" style="width: 100%; max-width: 500px; height: auto; border: 0;">
                                                      </div>
                                                      <h1 style="font-family: Georgia, Times, 'Times New Roman', serif; font-size: 61px; color: #0a0a0a;">${companyName} has sent you a message!</h1>
                                                      <p>${`${companyName} has sent you an email!
          Company email: ${companyEmail}
          Message: ${companyMessage}
          Date: ${currentDate()}`}</p>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>
  </body>
  </html>`;

  const msg = {
    to: "jjdate23@gmail.com", // Change to your recipient
    from: "jjdate@live.com", // Change to your verified sender
    subject: `New Quote from ${companyEmail} ${currentDate()}`,
    text: `
          ${companyName} has sent you an email!
          Company Email: ${companyEmail}
          Message: ${companyMessage}
          Date: ${currentDate()}
        `,
    html: htmlString,
  };

  try {
    sgMail
      .send(msg)
      .then(() => {
        res.send("Email sent");
      })
      .catch((error) => {
        res
          .send({ error: error, errorMsg: "Sorry something went wrong!" })
          .sendStatus(400);
      });
  } catch (error) {
    res
      .send({ error: error, errorMsg: "Sorry something went wrong!" })
      .sendStatus(400);
  }
});

module.exports = router;
