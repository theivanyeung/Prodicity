const sgMail = require("@sendgrid/mail");

const { SG_API_KEY, CONTACT_TEMPLATE_ID } = process.env;

sgMail.setApiKey(SG_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;
    await sgMail.send({
      to: "theivanyeung@gmail.com",
      from: "futuretechnologiesmain@gmail.com",
      subject: `//CONTACT// ${subject}`,
      templateId: CONTACT_TEMPLATE_ID,
      dynamicTemplateData: {
        email: email,
        subject: subject,
        message: message,
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
