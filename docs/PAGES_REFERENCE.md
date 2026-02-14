# PrepWisely - Complete Pages Reference

## Public Pages (No Authentication Required)

### Marketing & Information
- **Landing Page** (`/`) - Homepage with features, pricing preview, and CTA
- **Pricing Page** (`/pricing`) - Subscription plans and individual cert pricing
- **Help Center** (`/help`) - FAQ and support information
- **About Page** (`/about`) - Company information and mission

### Legal & Policies
- **Terms of Service** (`/terms`) - Terms and conditions
- **Privacy Policy** (`/privacy`) - Privacy policy and data handling
- **Cancellation Policy** (`/cancellation-policy`) - Subscription cancellation terms
- **Refund Policy** (`/refund-policy`) - Refund terms and conditions

### Authentication
- **Login Page** (`/login`) - User login
- **Sign Up Page** (`/signup`) - New user registration
- **Forgot Password** (`/forgot-password`) - Password reset request

### Help Articles (Public)
- **How to Cancel Subscription** (`/articles/cancel-subscription`) - Step-by-step cancellation guide
- **Certification Articles** - Individual cert preparation guides:
  - Cloud Practitioner (`/articles/cloud-practitioner`)
  - AI Practitioner (`/articles/ai-practitioner`)
  - Solutions Architect Associate (`/articles/solutions-architect-associate`)
  - Developer Associate (`/articles/developer-associate`)
  - CloudOps Engineer Associate (`/articles/cloudops-engineer-associate`)
  - Data Engineer Associate (`/articles/data-engineer-associate`)
  - ML Engineer Associate (`/articles/machine-learning-engineer-associate`)
  - Solutions Architect Professional (`/articles/solutions-architect-professional`)
  - DevOps Engineer Professional (`/articles/devops-engineer-professional`)
  - GenAI Developer Professional (`/articles/generative-ai-developer-professional`)
  - Advanced Networking Specialty (`/articles/advanced-networking-specialty`)
  - Security Specialty (`/articles/security-specialty`)
  - ML Specialty (`/articles/machine-learning-specialty`)

---

## Authenticated Pages (Login Required)

### Main Application
- **Dashboard** (`/dashboard`) - Main hub showing all 13 certifications and progress
- **Subscription Management** (`/subscription`) - View/manage active subscription
- **Exam/Quiz Page** (`/exam`) - Take quizzes and exams (20 or 65 questions)
- **Results Page** (`/results`) - View quiz/exam results with score breakdown
- **Flagged Questions** (`/flagged`) - Review bookmarked questions

### Certification Detail Pages
Each certification has a dedicated page showing 30 quizzes + 2 exams:
- **Cloud Practitioner** (`/certification/cloud-practitioner`)
- **AI Practitioner** (`/certification/ai-practitioner`)
- **Solutions Architect Associate** (`/certification/solutions-architect-associate`)
- **Developer Associate** (`/certification/developer-associate`)
- **CloudOps Engineer Associate** (`/certification/cloudops-engineer-associate`)
- **Data Engineer Associate** (`/certification/data-engineer-associate`)
- **ML Engineer Associate** (`/certification/machine-learning-engineer-associate`)
- **Solutions Architect Professional** (`/certification/solutions-architect-professional`)
- **DevOps Engineer Professional** (`/certification/devops-engineer-professional`)
- **GenAI Developer Professional** (`/certification/generative-ai-developer-professional`)
- **Advanced Networking Specialty** (`/certification/advanced-networking-specialty`)
- **Security Specialty** (`/certification/security-specialty`)
- **ML Specialty** (`/certification/machine-learning-specialty`)

---

## Admin Pages (Admin Role Required)

- **Admin Dashboard** (`/admin`) - Overview with stats and metrics
- **Users Management** (`/admin/users`) - View and manage all users
- **Subscriptions** (`/admin/subscriptions`) - View all subscriptions and filter incomplete
- **Payments** (`/admin/payments`) - View all payment transactions
- **Customers** (`/admin/customers`) - View Stripe customer records
- **Questions Management** (`/admin/questions`) - Bulk import/export questions

---

## Page Count Summary

- **Public Pages**: 18 (including 13 cert articles)
- **Authenticated Pages**: 17 (including 13 cert detail pages)
- **Admin Pages**: 6
- **Total Pages**: 41

---

## Navigation Flow

### Public User Journey
1. Landing Page → Pricing → Sign Up
2. Login → Dashboard
3. Select Certification → View Quizzes/Exams
4. Take Quiz/Exam → View Results
5. Manage Subscription (if subscribed)

### Admin Journey
1. Login (admin account) → Admin Dashboard
2. Manage Users/Subscriptions/Payments
3. Import/Export Questions
4. Monitor System Stats

---

## Key Features by Page Type

### Public Pages
- SEO optimized
- Mobile responsive
- Dark mode support
- No authentication required

### Authenticated Pages
- Protected routes
- User-specific data
- Progress tracking
- Certificate generation (when completed)

### Admin Pages
- Role-based access
- Analytics and reporting
- Bulk operations
- System management

---

**Last Updated**: February 11, 2026  
**Version**: 1.0.0
