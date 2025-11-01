const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail', // or use custom SMTP like host, port, etc.
    auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your app password (not your Gmail password)
    },
});

exports.sendSubscriptionEmail = async (toEmail) => {
    const mailOptions = {
        from: `"Path India LTD (Crash Barriers)" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Path India Ltd – Crash Barriers & Infrastructure Products',
        text: `Hello!

Thank you for subscribing to our newsletter.
Please find the attached brochure PDF for more details.

Best regards,
Quest Digiflex Team.`,
        html: `
        <p>Dear Valued Partner,</p>
        <p>Thank you for connecting with <strong>Path India Ltd</strong>.</p>

        <p>We are one of India’s leading <strong>manufacturers of high-quality Crash Barriers</strong>, 
        dedicated to ensuring road safety through ISO-certified production and precision engineering.</p>

        <ul>
          <li>W-Beam & Thrie-Beam Crash Barriers</li>
          <li>Metal Beam Guard Rails</li>
          <li>End Terminals & Accessories</li>
          <li>Custom Safety Barrier Solutions</li>
        </ul>

        <p><strong>Also from Path India Ltd:</strong><br/>
        We manufacture <strong>GFRP Rebars</strong> – corrosion-resistant alternatives to steel, and 
        <strong>Thermoplastic Road Marking Paint</strong> for high visibility and long-lasting performance.</p>

        <p>Kindly find our product brochures attached for your reference.</p>

        <p>Warm regards,<br>
        <strong>Team Path India Ltd</strong><br>
        📞 +91-7324-350100<br>
        🌐 www.pathindia.com<br>
      
      `

        ,
        attachments: [
            {
                filename: 'Path_India_crash_barriers.pdf',
                path: path.join(__dirname, '../Path_India_crash_barriers.pdf'),
                contentType: 'application/pdf',
            },
            {
                filename: 'Path GFRP REBAR (2).pdf',
                path: path.join(__dirname, '../Path GFRP REBAR (2).pdf'),
                contentType: 'application/pdf',
            },
        ],
    };

    await transporter.sendMail(mailOptions);
};



// ✅ Send newsletter to all subscribers
exports.sendNewsletterToSubscribers = async (emails) => {
  const mailOptions = {
    from: `"Path India Ltd" <${process.env.SMTP_USER}>`,
    bcc: emails, // ✅ Hide recipients
    subject: 'Path India Ltd – Crash Barriers, GFRP Rebars & Road Paint Solutions',
    html: `
     
        <p>Dear Valued Partner,</p>
        <p>Thank you for connecting with <strong>Path India Ltd</strong>.</p>

        <p>We are one of India’s leading <strong>manufacturers of high-quality Crash Barriers</strong>, 
        dedicated to ensuring road safety through ISO-certified production and precision engineering.</p>

        <ul>
          <li>W-Beam & Thrie-Beam Crash Barriers</li>
          <li>Metal Beam Guard Rails</li>
          <li>End Terminals & Accessories</li>
          <li>Custom Safety Barrier Solutions</li>
        </ul>

        <p><strong>Also from Path India Ltd:</strong><br/>
        We manufacture <strong>GFRP Rebars</strong> – corrosion-resistant alternatives to steel, and 
        <strong>Thermoplastic Road Marking Paint</strong> for high visibility and long-lasting performance.</p>

        <p>Kindly find our product brochures attached for your reference.</p>

        <p>Warm regards,<br>
        <strong>Team Path India Ltd</strong><br>
        📞 +91-7324-350100<br>
        🌐 www.pathindia.com<br>
    `,
    attachments: [
      {
        filename: 'Path_India_crash_barriers.pdf',
        path: path.join(__dirname, '../Path_India_crash_barriers.pdf'),
        contentType: 'application/pdf',
      },
      {
        filename: 'Path GFRP REBAR (2).pdf',
        path: path.join(__dirname, '../Path GFRP REBAR (2).pdf'),
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};