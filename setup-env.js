// Setup script to create .env file
// Run: node setup-env.js

const fs = require('fs')
const path = require('path')

const envContent = `EMAIL_USER=ayushmantripathi224@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3001
`

const envPath = path.join(__dirname, '.env')

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!')
  console.log('If you want to recreate it, delete the existing .env file first.')
  process.exit(0)
}

// Create .env file
try {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env file created successfully!')
  console.log('📝 Please update EMAIL_PASS with your Gmail App Password')
  console.log('   Get it from: https://myaccount.google.com/apppasswords')
} catch (error) {
  console.error('❌ Error creating .env file:', error.message)
  process.exit(1)
}

