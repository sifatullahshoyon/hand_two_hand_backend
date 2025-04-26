# HandToHand 🛒 – Backend

A full-featured backend server for the **HandToHand Marketplace**, built with **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and follows the **MVC design pattern**. It includes secure user authentication, product listing management, messaging, image uploading, and SurjoPay payment integration.

🔗 [Live Client Site](https://hand-to-hand-frontend.vercel.app/)
🔗 [Live Client Site](https://hand-two-hand-backend.vercel.app/)

---

## 🏗️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web application framework
- **MongoDB + Mongoose** – Database & ODM
- **TypeScript** – Static typing
- **Zod** – Schema validation
- **JWT** – Authentication
- **bcrypt** – Password encryption
- **Cloudinary** – Image storage
- **SurjoPay** – Payment integration
- **dotenv, helmet, cors** – Environment & security

---

## 📁 Project Structure (MVC Pattern)

src/ ├── config/ # DB, Cloudinary, SurjoPay, env setup ├── controllers/ # Business logic ├── routes/ # API endpoints ├── models/ # Mongoose schemas ├── middlewares/ # Auth, error handler ├── services/ # Utility logic (email, cloudinary, payment) ├── validations/ # Zod schemas ├── utils/ # Custom helpers ├── app.ts # App entry └── server.ts # Server runner

---

## ⚙️ Environment Variables

```env
PORT=
DATABASE_URL=

NODE_ENV=
JWT_SECRET=
BCRYPT_SALT_ROUNDS=

SEND_MAIL_AUTH_USER=
SEND_MAIL_AUTH_PASS=

CLOUDINARY_API_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SP_ENDPOINT=
SP_USERNAME=
SP_PASSWORD=
SP_PREFIX=
SP_RETURN_URL=
```

🔐 Authentication

- Secure login with JWT

- Hashed passwords using bcrypt

- Login with email or phone number

- Role-based access (user, admin)

🔑 Core Features

🧾 Listings

- Add, update, delete used item listings

- Filter/search by category, location, condition

- Upload multiple images (Cloudinary)

- Status: Available / Sold

👤 Users

- Register/Login

- Update profile

- Track purchases & sales

- Wishlist feature

💬 Messages (Optional)

- Chat with sellers before purchase

💳 Transactions

- SurjoPay payment integration
- Track sales/purchases
- Order history

🧠 Mongoose Models

User

name, email, phone, password, role

Listing

title, description, price, condition, images, userId, status

Transaction

buyerId, sellerId, itemId, status

Message (optional)

senderId, receiverId, message, timestamp

🔗 API Endpoints

🔐 Auth

POST /auth/register

POST /auth/login

POST /auth/logout

📦 Listings

GET /listings

GET /listings/:id

POST /listings

PUT /listings/:id

DELETE /listings/:id

👤 User

GET /users/:id

PUT /users/:id

DELETE /users/:id

💰 Transactions

POST /transactions

GET /purchases/:userId

GET /sales/:userId

PUT /transactions/:id

🛡️ Admin (Optional)

PUT /users/:id/ban

DELETE /listings/:id

☁️ Image Upload

Uses Cloudinary API

Uploads from client or server

Secure delivery with public_id tracking

💸 Payment Integration – SurjoPay

Integrated via secure server-to-server communication

Order created and confirmed via transaction update

Redirect URL after success/failure

Environment-based configuration

🔐 Security & Validation

JWT for route protection

Helmet, cors for security headers

Passwords hashed with bcrypt

Input validation using Zod

🚀 Deployment

Backend: Vercel Serverless Functions

Frontend: Vercel

👨‍💻 Developer

Developed with 💙 by Sifat Ullah Shoyon
