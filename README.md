# JourneyFire
JourneyFire is a full-stack accommodation marketplace (Airbnb clone) built with Node.js, Express, MongoDB &amp; EJS. Features Mapbox geocoding &amp; maps, Cloudinary media uploads, Passport.js authentication, and interactive reviews.
# 🏕️ JourneyFire — Vacation Rentals & Accommodations Platform

![Node.js](https://img.shields.io/badge/Node.js-25.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Mapbox](https://img.shields.io/badge/Mapbox-GL%20JS-blue?logo=mapbox)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20CDN-blue?logo=cloudinary)
![License](https://img.shields.io/badge/License-ISC-blue.svg)

**JourneyFire** is a production-ready, full-stack accommodation marketplace inspired by Airbnb. It empowers travelers to discover unique stays across the globe and enables property owners to list, manage, and showcase their venues with high-resolution imagery and interactive location mapping.

---

## ✨ Features

- 🏡 **Listing Management (Full CRUD):** Create, browse, update, and remove property listings with pricing, descriptions, and geolocations.
- 🗺️ **Mapbox Geocoding & Interactive Maps:** 
  - Converts human-readable addresses to GeoJSON coordinates via the **Mapbox Geocoding API**.
  - Interactive map render on the details page with custom draggable pins and popups.
- 📸 **Cloud Media Management:** Seamless image upload, hosting, and automatic transformation powered by **Multer** and **Cloudinary**.
- 🔐 **Authentication & Authorization:**
  - Secure registration and login workflows using **Passport.js** and **Passport-Local-Mongoose**.
  - Role-based route protection (`isLoggedIn`, `isOwner`, `isReviewAuthor`) ensuring users can only edit or delete their own content.
- ⭐ **Reviews & Rating System:** Real-time user feedback with textual comments and a responsive 5-star rating interface powered by **Starability**.
- 🧮 **Interactive Pricing & Taxes:** Real-time client-side switch to toggle 18% GST display across listings.
- 🔍 **Filtering & Categories:** Category navigation (Trending, Mountains, Iconic Cities, Castles, Camping, Farms, Arctic, and more).
- 🛡️ **Robust Validation & Error Handling:** Schema validation using **Joi** paired with custom async error wrappers (`wrapAsync`) and flash alert banners (`connect-flash`).

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js (v25+)
- **Framework:** Express.js 5
- **Database & ODM:** MongoDB Atlas with Mongoose
- **Session & Security:** `express-session`, `connect-mongo`, `passport`, `passport-local`
- **Validation:** `joi`

### Frontend & Templating
- **View Engine:** EJS with `ejs-mate` layouts
- **Styling:** Bootstrap 5, Custom CSS, FontAwesome
- **Mapping:** Mapbox GL JS & Mapbox SDK

### Cloud Services
- **Image Storage:** Cloudinary (via `multer-storage-cloudinary`)
- **Geocoding:** Mapbox Geocoding API
- **Database Hosting:** MongoDB Atlas

---

## 🏗️ Architecture & Project Structure

The project follows the standard **Model-View-Controller (MVC)** architectural design:
JourneyFire/ ├── controllers/ # Business logic handlers (listings, reviews, users) ├── models/ # Mongoose schemas (Listing, Review, User) ├── routers/ # Express routes with middleware pipelines ├── views/ # EJS templates, partials, and boilerplate layouts │ ├── includes/ # Navbar, footer, flash alerts │ ├── layouts/ # Boilerplate HTML shell │ ├── listings/ # Index, Show, New, Edit pages │ └── users/ # Login, Signup pages ├── public/ # Client-side static assets (CSS, Mapbox JS scripts) ├── utils/ # Custom error classes (ExpressError) & async wrappers ├── middleware.js # Authentication, ownership, and Joi validation guards ├── cloudConfig.js # Cloudinary SDK and storage engine configuration ├── schema.js # Joi validation schemas └── app.js # Application entry point & server setup



---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account credentials
- [Mapbox](https://www.mapbox.com/) public access token

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Roshanikhar/JourneyFire.git
   cd JourneyFire

2.Install dependencies:

bash
npm install
3. Configure Environment Variables: Create a .env file in the root directory:
env
NODE_ENV=development
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_super_secret_session_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_public_token

4. Initialize / Seed Sample Data (Optional):

bash
node init/index.js

5. Start the application:
bash
npm start

7. Open your browser and navigate to:
http://localhost:8080/listings

👤 Author
Roshan Rupendra Ikhar
GitHub: @Roshanikhar
