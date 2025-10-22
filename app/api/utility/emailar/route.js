import nodemailer from 'nodemailer';

export async function POST(req) {
  try {

    const body = await req.json();
    const { type } = body;

    const transporter = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

if (type === 'contact') {
    const { name, conemail, number, message } = body;
    await transporter.sendMail({
      from: `"${name}" <${conemail}>`,
      to: process.env.EMAIL_USER,
      subject: `Enquery Submission by - ${name}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8f9fa">
            <tbody>
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="margin-top: 30px;">
                        <tbody><tr>
                            <td bgcolor="#ffffff" style="color: #23824e;padding: 35px 15px;text-align: center;">
                            <h1 style="margin: 0;">Trioford Technosys Enquery</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0px 15px;">
                            <table cellpadding="10" cellspacing="0" border="0" width="100%" style="font-size: 15px;border-collapse: collapse;">
                                <tbody><tr style="background-color: #f8fffb;">
                                <td width="30%"><strong>Name:</strong></td>
                                <td>${name}</td>
                                </tr>
                                <tr>
                                <td><strong>Email:</strong></td>
                                <td>${conemail}</td>
                                </tr>
                                <tr style="background-color: #f8fffb;">
                                <td><strong>Phone Number:</strong></td>
                                <td>${number}</td>
                                </tr>
                                <tr>
                                <td><strong>Message:</strong></td>
                                <td>${message}</td>
                                </tr>
                            </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="text-align: center;padding: 37px 15px;font-size: 14px;color: #23824e;">
                            © 2025 Designed and Developed by Trioford Technosys
                            </td>
                        </tr>
                        </tbody></table>
                        <br>
                    </td>
                </tr>
            </tbody>
        </table>
      `,
    });
   }
else if (type === 'newsletter') {
  const { email } = body;
      await transporter.sendMail({
        from: `"Newsletter Signup" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `Subscriber - ${email}`,
        html: `
        <table style="max-width:600px;margin:auto;font-family:sans-serif;">
          <tr>
            <td style="background:#f5f5f5;padding:30px;text-align:center;">
              <h2>Email: ${email}</h2>
              <h1 style="color:#333;">Get 20% Off Today!</h1>
              <p style="color:#666;font-size:16px;">Your favorite products now at a special price.</p>
              <a href="" style="display:inline-block;background:#ff6600;color:#fff;padding:15px 30px;border-radius:5px;text-decoration:none;margin-top:20px;">
                Visit Website
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;text-align:center;color:#aaa;font-size:12px;">
              © 2025 Trioford Technosys | Privacy Policy
            </td>
          </tr>
        </table>
        `,
      });
    }
    else {
      return Response.json({ success: false, error: 'Invalid email type' }, { status: 400 });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ success: false, error: "Email send failed" }, { status: 500 });
  }
}
