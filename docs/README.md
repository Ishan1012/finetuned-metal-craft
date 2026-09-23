# ASDE Laser Cutting

ASDE Laser Cutting (Agrawal & Son Daughter Enterprises) is an e-commerce and business portfolio hybrid platform built for a precision CNC laser cutting and architectural metal fabrication business based in Satna, Madhya Pradesh. The platform bridges the gap between digital e-commerce and custom industrial fabrication—enabling customers to buy ready-made precision products (such as designer nameplates and decorative metal panels) online, while providing a specialized custom quote request engine for large architectural projects like metal railings, building facades, gates, and room dividers.

## 📦 Technologies

- `React 18` (Vite)
- `Node.js` & `Express 5`
- `TypeScript`
- `Tailwind CSS` & `shadcn/ui`
- `MongoDB` & `Mongoose`
- `Razorpay Payment Gateway`
- `Cloudinary API`
- `NodeMailer` (Automated SMTP Notifications)
- `Docker` & `Docker Compose`
- `AWS EC2 (t3.micro)`
- `GitHub Actions (CI/CD Pipeline)`

## 🎯 Features

Here's what you can do with ASDE Laser Cutting:

- **E-Commerce Shop & Smart Catalog** - Browse ready-to-ship metal products with real-time category filtering, material filters (Brass, SS, MS, Aluminium, Copper), price sorting, and responsive pagination.
- **Dynamic Shopping Cart & Coupon Engine** - Dedicated cart management with quantity adjustments, real-time totals, and discount coupon code calculation.
- **Multi-Method Checkout** - Flexible payments including online Razorpay (UPI, Cards, NetBanking with testing simulation), Cash on Delivery (COD), and Direct Bank Transfer / UPI.
- **Architectural Custom Quote System** - Role-based client onboarding (Homeowner, Architect/Designer, Contractor, Wholesaler/Fabricator) with custom dimension inputs, material specifications, and Cloudinary drawing file uploads.
- **Real-Time Order Tracking (`/track-order`)** - Public lookup by Order ID and email displaying a visual milestone timeline (*Order Placed → In Production → Dispatched → Delivered*) and 1-click WhatsApp customer support.
- **Admin Management Portal** - Comprehensive dashboard to manage catalog items, update order workflows, review quote requests, and trigger 1-click WhatsApp quote responses to clients.
- **Automated Notification System** - Responsive branded HTML email notifications dispatched via NodeMailer for new orders, status transitions, quote submissions, and contact inquiries.
- **Automated CI/CD Deployment** - Automated GitHub Actions pipeline that builds Docker images on commit, pushes to Docker Hub, and pulls & runs on an AWS EC2 t3.micro instance with memory management and healthchecks.

## 👨🎓 The Process

This project started with a clear industrial challenge: "How can traditional, heavy metal fabrication and custom CNC cutting feel as seamless and accessible as buying from a modern consumer brand?"

Visiting fabrication workshops and consulting with architects revealed two distinct customer journeys. Standard consumer products like designer brass nameplates and decorative panels needed a fast, friction-free e-commerce checkout. In contrast, architectural installations—such as stair railings and facade claddings—required detailed measurements, technical drawing attachments, and consultation.

The primary engineering challenges involved harmonizing these two disparate workflows into a single unified platform: designing an intuitive UI for custom dimensions, handling secure file uploads for technical drawings, configuring resilient multi-method payments for the Indian market, and establishing a lightweight, zero-maintenance CI/CD pipeline capable of operating smoothly on resource-constrained cloud hardware.

## 🏗️ How I Built It

Building ASDE Laser Cutting was structured into five distinct phases:

### Phase 1: Database Architecture & Foundation (MongoDB & Mongoose)
I structured MongoDB schemas to handle both standardized e-commerce orders and highly customized quote inquiries. Using Mongoose, I implemented snapshot schemas for items, dynamic payment statuses, and flexible product referencing to safely accommodate both database ObjectIds and catalog string identifiers without validation conflicts.

### Phase 2: User Experience & Design (React, Tailwind CSS & shadcn/ui)
Using React with Vite and Tailwind CSS, I crafted an industrial-luxe aesthetic dominated by deep slate and warm metallic gold accents. Custom components built on Radix UI primitives ensured complete accessibility, smooth animations via Framer Motion, responsive mobile drawers, and dedicated pages for catalog browsing, custom project requests, and order tracking.

### Phase 3: The Engine Room (Express & NodeMailer Service)
The backend was developed using Express 5 and TypeScript. It orchestrates order placement, Razorpay cryptographic signature verification, and automated email alerts. Using NodeMailer with fallback public DNS resolvers (`8.8.8.8`, `1.1.1.1`), the server reliably connects to cloud database clusters and dispatches branded HTML invoices to customers and instant alerts to the workshop admin.

### Phase 4: Custom Quote & Order Tracking Workflow
To streamline client inquiries, I built an interactive 4-role selection engine (*Homeowner, Architect, Contractor, Wholesaler*) that automatically configures quote parameters. Drawing files are uploaded directly to Cloudinary and cataloged in the database. For post-purchase peace of mind, a public tracking portal reflects live fabrication milestones directly from the admin status updates.

### Phase 5: Containerization & CI/CD Pipeline (Docker & AWS EC2)
To achieve zero-downtime deployment on an AWS EC2 `t3.micro` (1GB RAM), I separated the heavy build workloads from the server. A GitHub Actions pipeline compiles TypeScript, builds lightweight multi-stage Alpine Docker images, and pushes them to Docker Hub. It then SSHs into the EC2 instance, runs `docker compose` with memory caps (650M) and swap space protection, cleans up dangling layers, and performs an automated health check against `/api/health`.

## 🏫 What I Learned Along the Way

This project provided invaluable full-stack and DevOps engineering insights:

- **E-Commerce & B2B Hybridization**: Designing separate user flows for off-the-shelf purchases versus bespoke manufacturing inquiries within the same application.
- **Resilient DNS & Micro-Service Networking**: Overcoming SRV DNS resolution hurdles (`querySrv ENOTFOUND`) when connecting Node.js services to MongoDB Atlas across Docker and cloud networks.
- **Resource-Constrained DevOps**: Architecting Docker Compose files with memory reservations, limits, and Linux swap space to ensure high stability on 1GB RAM cloud instances (`t3.micro`).
- **Payment Verification Security**: Verifying cryptographic HMAC SHA-256 webhooks and signatures to prevent payment tampering.

### Overall Growth:
Developing this platform reinforced the importance of end-to-end thinking—from designing intuitive UX components to ensuring database reliability, payment security, and continuous cloud deployment.

## 🔧 How It Could Be Improved

ASDE Laser Cutting continues to evolve with exciting future capabilities planned:

- **Interactive 3D Metal Customizer**: Real-time 3D canvas previewing custom laser cutting patterns and material finishes before requesting a quote.
- **WhatsApp Business API Webhooks**: Automated two-way WhatsApp message triggers updating customers on fabrication progress.
- **AI Material & Cost Estimator**: Instant estimation engine calculating cut time, sheet weight, and rough pricing directly from uploaded DXF/DWG vector CAD files.
- **Multi-Language Regional Support**: Hindi and regional language localization for local contractors and fabricators.

## 🪧 Running the Project

To run the project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Ishan1012/finetuned-metal-craft.git
cd finetuned-metal-craft
```

### 2. Configure Environment Variables
Create a `.env` file inside the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/asdelaser?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=your_email@gmail.com
```

### 3. Install Dependencies & Start Services

#### Backend API:
```bash
cd backend
npm install
npm run dev
```
*(Runs on [http://localhost:5000](http://localhost:5000))*

#### Customer Frontend:
```bash
cd frontend
npm install
npm run dev
```
*(Runs on [http://localhost:5173](http://localhost:5173) or [http://localhost:8080](http://localhost:8080))*

#### Admin Portal:
```bash
cd admin
npm install
npm run dev
```

## 📍 Preview

- **Live Website**: [https://asdelaser.vercel.app/](https://asdelaser.vercel.app/)
- **Backend API Health Check**: `http://<ec2-public-ip>:5000/api/health`
