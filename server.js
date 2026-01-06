// Simple Node.js backend server for sending emails
// Install required packages: npm install express nodemailer cors dotenv
// Run: node server.js

const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Create transporter (using Gmail as example)
// You need to set up environment variables:
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'ayushmantripathi224@gmail.com',
    pass: process.env.EMAIL_PASS, // Use App Password from Google Account
  },
})

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message, to } = req.body

    const mailOptions = {
      from: process.env.EMAIL_USER || 'ayushmantripathi224@gmail.com',
      to: to || 'ayushmantripathi224@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    res.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ success: false, error: 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

