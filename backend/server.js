
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "*"
    }
));
const PORT = 5000;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vikramsuriya83@gmail.com",
        pass: "cinj ukzu aoah kmaz"
    }
});


app.post("/api/send-email", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const sendEmail = await transport.sendMail({
            from: "vikramsuriya83@gmail.com",
            to: "sayyedhakkim2004@gmail.com",
            subject:"New Message from Portfolio",
            html: `
  <div style="
      font-family: Arial, sans-serif;
      max-width: 650px;
      margin: auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
  ">

      <div style="
          background:#111827;
          color:white;
          padding:20px;
          text-align:center;
      ">
          <h2 style="margin:0;">
              📩 New Message From Portfolio
          </h2>
      </div>

      <div style="padding:30px;">

          <p>
              You received a new contact request from your portfolio website.
          </p>

          <table style="
              width:100%;
              border-collapse:collapse;
          ">

              <tr>
                  <td style="padding:10px;"><strong>Name</strong></td>
                  <td>${name}</td>
              </tr>

              <tr>
                  <td style="padding:10px;"><strong>Email</strong></td>
                  <td>${email}</td>
              </tr>

          </table>

          <div style="
              margin-top:20px;
              padding:20px;
              background:#f9fafb;
              border-radius:8px;
          ">
              <strong>Message</strong>

              <p style="
                  margin-top:10px;
                  line-height:1.7;
                  white-space:pre-wrap;
              ">
                  ${message}
              </p>
          </div>

          <div style="
              margin-top:25px;
              text-align:center;
          ">
              <a
                href="mailto:${email}"
                style="
                    background:#2563eb;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:8px;
                    display:inline-block;
                ">
                Reply to HR
              </a>
          </div>

      </div>

      <div style="
          padding:15px;
          text-align:center;
          color:#6b7280;
          font-size:13px;
          background:#f3f4f6;
      ">
          Sent automatically from your Portfolio Website
      </div>

  </div>
  `
        });
        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(PORT,()=>{
    console.log("App is listening")
})

