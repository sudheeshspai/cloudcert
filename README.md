# CLOUDCERTS

A modern, secure, and beautiful certificate management platform built with React and Supabase. Upload, store, and manage your certificates privately in the cloud.

## Features

- User authentication (sign up, login, logout)
- Each user gets a private, secure storage space (100MB quota)
- Upload, view, rename, and delete certificates (PDF, JPG, PNG)
- Responsive, professional UI with glassmorphism and animated background
- Dashboard with real-time storage usage
- Built with React, Supabase, and modern CSS


## Getting Started

### 1. Clone the repository

```bash
# Using HTTPS
git clone https://github.com/your-username/cloudcerts.git
cd cloudcerts
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Supabase

- Go to [Supabase](https://supabase.com/) and create a free account.
- Create a new project.
- Go to Project Settings > API and copy your **Project URL** and **anon public API key**.
- Go to Storage and create a new bucket named `certificate` (public access).
- Enable authentication (email/password) in the Auth settings.

### 4. Configure environment variables

Create a `.env` file in the root of your project:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_public_key
```

**Do NOT share your keys publicly.**

### 5. Start the development server

```bash
npm start
# or
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
cloudcerts/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Footer.js
│   │   ├── login.js
│   │   ├── Navbar.js
│   │   ├── signup.js
│   │   └── ...
│   ├── App.js
│   ├── App.css
│   ├── supabaseclient.js
│   └── ...
├── .env
├── package.json
└── README.md
```

## Customization

- Update the logo and branding in `Navbar.js` and `public/favicon.ico`.
- Tweak the color palette in `App.css` to match your brand.

## License

MIT

---

**Developed by sudheeshspai (hashpai) with 💻laptop and coffe☕**
