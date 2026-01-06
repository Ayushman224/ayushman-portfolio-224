# Quick Setup Instructions

## Step 1: Create .env File

Create a file named `.env` in the root directory with the following content:

```
EMAIL_USER=ayushmantripathi224@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3001
```

**OR** run the setup script:
```bash
node setup-env.js
```

## Step 2: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other (Custom name)" → Enter "Portfolio"
5. Click "Generate"
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 3: Update .env File

Replace `your-16-character-app-password` in the `.env` file with the password you just copied (remove spaces).

Example:
```
EMAIL_PASS=abcdefghijklmnop
```

## Step 4: Start the Backend Server

```bash
node server.js
```

You should see:
```
Server running on port 3001
```

## Step 5: Start the Frontend (in a new terminal)

```bash
npm run dev
```

## Testing

1. Go to the Contact page
2. Fill out the form
3. Submit
4. Check your email at ayushmantripathi224@gmail.com

## Troubleshooting

- **"Invalid login"**: Make sure you're using the App Password, not your regular Gmail password
- **"Connection timeout"**: Check your internet connection
- **"Port already in use"**: Change PORT in .env to a different number (e.g., 3002)

