# 🌲 The Great Outdoor Journal

> A full-stack web application for outdoor enthusiasts to document and share their adventures.

**Live Demo:** [https://the-great-journal.onrender.com](https://the-great-journal.onrender.com)

---

## 📖 About

The Great Outdoor Journal is a CRUD (Create, Read, Update, Delete) web application that allows users to create, edit, and manage their outdoor adventure journals. Users can authenticate via Google OAuth, share their experiences, and explore adventures shared by other outdoor enthusiasts.

## ✨ Features

- **Google OAuth Authentication** - Secure login with Google accounts
- **Create Adventures** - Document outdoor experiences with titles and descriptions
- **Edit & Update** - Modify existing journal entries
- **Delete Entries** - Remove unwanted journal posts
- **Responsive Design** - Modern, nature-inspired UI that works on all devices
- **User-Specific Content** - Each user can only edit their own journal entries

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - User authentication

### Frontend
- **EJS** - Templating engine
- **Materialize CSS** - UI framework
- **Custom CSS** - Additional styling and theming
- **JavaScript** - Client-side functionality

### Development & Deployment
- **Render** - Cloud hosting platform
- **Git/GitHub** - Version control
- **Trello** - Project management

---

## 🎨 Design & Planning

### Database Schema
![Database ER Diagram](https://user-images.githubusercontent.com/44272798/136493743-cee55ad9-2ff8-472c-ab82-b0d0551d0d5b.jpeg)

### Wireframe
<img width="662" alt="Initial Wireframe" src="https://user-images.githubusercontent.com/44272798/136590467-ba1b7a02-3d1e-48a1-a4f8-01e3164eb869.png">

---

## 📱 Application Screenshots

### User Authentication
**Before Login:**
<img width="1389" alt="Login Page" src="https://imgur.com/3KCMeGx.png">

**After Login:**
<img width="1389" alt="Dashboard" src="https://i.imgur.com/LZCKbVr.png">

### Adventure Management
**Create New Adventure:**
<img width="1395" alt="Create Form" src="https://imgur.com/gJjcuTC.png">

**Adventure Created:**
<img width="1395" alt="Adventure Posted" src="https://imgur.com/7jn1Wkh.png">

### Edit Functionality
**Edit Adventure:**
<img width="1390" alt="Edit Form" src="https://imgur.com/RvQDTLB.png">

**Editing in Progress:**
<img width="1390" alt="Edit Interface" src="https://imgur.com/azssXrY.png">

### Delete Functionality
**Before Deletion:**
<img width="1385" alt="Before Delete" src="https://imgur.com/7jn1Wkh.png">

**After Deletion:**
<img width="1385" alt="After Delete" src="https://imgur.com/i2mxKvD.png">

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Cloud Console project with OAuth 2.0 credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/the-great-outdoor-journal.git
   cd the-great-outdoor-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with your Google OAuth credentials, MongoDB connection string, and session secret.

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🔮 Future Enhancements

- [ ] **Alternative Authentication** - Add email/password signup for users without Google accounts
- [ ] **Image Upload** - Allow users to attach photos to their adventure journals
- [ ] **Enhanced Styling** - Additional UI/UX improvements and animations
- [ ] **Comment System** - Enable users to comment on each other's adventures
- [ ] **Search & Filter** - Add search functionality and filtering options
- [ ] **Adventure Categories** - Organize adventures by activity type (hiking, camping, etc.)
- [ ] **User Profiles** - Dedicated user profile pages with adventure statistics

---

## 👨💻 Developer

**Miguel Urena**
- GitHub: [@tatsuyax25](https://github.com/tatsuyax25)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/urena-miguel82/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).