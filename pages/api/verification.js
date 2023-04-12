const sgMail = require("@sendgrid/mail");

const { SG_API_KEY, CHANGE_EMAIL_TEMPLATE_ID } = process.env;

sgMail.setApiKey(SG_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, code } = req.body;

    await sgMail.send({
      to: email,
      from: "futuretechnologiesmain@gmail.com",
      subject: `Your Prodicity email verification code is ${code}`,
      templateId: CHANGE_EMAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        code: code,
      },
    });
    return res.status(200).json({ success: true });
  }

  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't exist",
    },
  });
}
