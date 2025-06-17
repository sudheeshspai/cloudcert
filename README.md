# CERTHEX

CERTHEX is a web application that allows users to easily upload, manage, and download image certificates in a secure and user-friendly dashboard. The app features authentication, drag-and-drop file upload, and a visually engaging splash cursor effect.

## Features

- **User Authentication**: Sign up and log in to access your dashboard.
- **Dashboard**: Manage your uploaded image certificates.
- **Drag and Drop Upload**: Easily upload files by dragging and dropping them onto the page.
- **Download Option**: Download files directly from the dashboard.
- **Splash Cursor Effect**: Interactive fluid effect cursor overlay.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/certhex.git
   cd certhex
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm start
   # or
   yarn start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
cedhex/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   └── components/
│       ├── login.js
│       ├── signup.js
│       ├── dashboard.js
│       ├── Navbar.js
│       └── spalshcursor.js
└── README.md
```

## Key Files

- **public/index.html**: Main HTML file with meta tags and manifest.
- **src/App.js**: Main React component handling authentication, drag-and-drop, and routing.
- **src/components/spalshcursor.js**: Implements the splash/fluid cursor effect.
- **src/components/login.js, signup.js, dashboard.js, Navbar.js**: UI components for authentication and navigation.

## Usage

- **Sign Up / Log In**: Create an account or log in to access your dashboard.
- **Upload Files**: Drag and drop image certificates onto the page or use the upload button.
- **Download Files**: Use the download option to save certificates to your device.

## Customization

- Update the app name, description, and author in `public/index.html`.
- Modify splash cursor settings in `src/components/spalshcursor.js` via props.

## License

This project is licensed under the MIT License.

---

**Made with ❤️ for secure certificate management.**
