# 3D Portfolio Website

A stunning 3D animated portfolio website built with React, Three.js, and Framer Motion.

## Features

- **Interactive Navbar**: Appears on hover with smooth animations
- **3D Header**: Rotates when sidebar is opened
- **Animated Flowers**: Shake on hover with wind effect
- **Skills Section**: Auto-moving skill boxes with logos
- **Liquid Experience**: Water-like animation effect
- **Flower Tree Pages**: Beautiful tree structure for Contact, Schooling, and Projects pages
- **Responsive Design**: Works seamlessly on all devices

## Technologies Used

- React 18
- Vite
- React Router
- React Three Fiber
- Framer Motion
- Tailwind CSS
- Lucide React (Icons)

## Installation

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Backend Setup (For Email Functionality)

1. Install backend dependencies:
```bash
npm install express nodemailer cors dotenv
# OR copy package-server.json to package.json in a separate backend folder
```

2. Set up Gmail App Password (see EMAIL_SETUP.md)

3. Create `.env` file:
```
EMAIL_USER=ayushmantripathi224@gmail.com
EMAIL_PASS=your-app-password
PORT=3001
```

4. Start backend server:
```bash
node server.js
```

For detailed email setup instructions, see [EMAIL_SETUP.md](./EMAIL_SETUP.md)

## Project Structure

```
portfolio/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── data/           # Resume data
│   └── App.jsx         # Main app component
├── public/             # Static assets
└── package.json        # Dependencies
```

## Pages

- **Home**: Main landing page with all sections
- **Contact**: Contact information with flower tree
- **Schooling**: Education details with animated flowers
- **Projects**: Project showcase with tree structure

## License

© 2024 Ayushman Tripathi. All rights reserved.

