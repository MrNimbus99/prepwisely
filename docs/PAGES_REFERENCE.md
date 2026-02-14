# PrepWisely - Complete Pages Reference

## Public Pages (No Authentication Required)

### Marketing & Information
- **Landing Page** (`/`) - Homepage with features, pricing preview, and CTA
- **Pricing Page** (`/pricing`) - Subscription plans and individual cert pricing
- **Help Center** (`/help`) - FAQ and support information
- **FAQ Page** (`/faq`) - Frequently asked questions
- **Certifications Page** (`/certifications`) - Browse all 13 certifications
- **Articles Hub** (`/articles`) - All help articles and guides
- **Contact Support** (`/contact-support`) - Contact form for support
- **Accessibility** (`/accessibility`) - Accessibility statement and features

### Legal & Policies
- **Terms of Service** (`/terms`) - Terms and conditions
- **Privacy Policy** (`/privacy`) - Privacy policy and data handling
- **Cancellation Policy** (`/cancellation-policy`) - Subscription cancellation terms
- **Refund Policy** (`/refund-policy`) - Refund terms and conditions

### Authentication
- **Login Page** (`/login`) - User login
- **Sign Up Page** (`/signup` or `/register`) - New user registration
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Email Verification** (`/verify-email`) - Email verification page

### Error Pages
- **404 Not Found** (`/404` or any invalid route) - Page not found

### Help Articles (Public)
- **How to Cancel Subscription** (`/articles/cancel-subscription`) - Step-by-step cancellation guide
- **30-Day Study Path** (`/articles/30-day-path`) - Structured learning path guide
- **Understanding Exam Results** (`/articles/exam-results`) - How to interpret results
- **Using Flagged Questions** (`/articles/flagged-questions`) - Bookmark feature guide
- **Question Updates** (`/articles/question-updates`) - How questions are updated
- **Upgrade & Pricing** (`/articles/upgrade-pricing`) - Pricing and upgrade info

### Certification Articles (Public)
- **Cloud Practitioner** (`/articles/cloud-practitioner`) - CLF-C02 guide
- **AI Practitioner** (`/articles/ai-practitioner`) - AIF-C01 guide
- **Solutions Architect Associate** (`/articles/solutions-architect-associate`) - SAA-C03 guide
- **Developer Associate** (`/articles/developer-associate`) - DVA-C02 guide
- **CloudOps Engineer Associate** (`/articles/cloudops-engineer-associate`) - SOA-C02 guide
- **Data Engineer Associate** (`/articles/data-engineer-associate`) - DEA-C01 guide
- **ML Engineer Associate** (`/articles/machine-learning-engineer-associate`) - MLA-C01 guide
- **Solutions Architect Professional** (`/articles/solutions-architect-professional`) - SAP-C02 guide
- **DevOps Engineer Professional** (`/articles/devops-engineer-professional`) - DOP-C02 guide
- **GenAI Developer Professional** (`/articles/generative-ai-developer-professional`) - AIP-C01 guide
- **Advanced Networking Specialty** (`/articles/advanced-networking-specialty`) - ANS-C01 guide
- **Security Specialty** (`/articles/security-specialty`) - SCS-C02 guide
- **ML Specialty** (`/articles/machine-learning-specialty`) - MLS-C01 guide

---

## Authenticated Pages (Login Required)

### Main Application
- **Dashboard** (`/dashboard`) - Main hub showing all 13 certifications and progress
- **Subscription Management** (`/subscription`) - View/manage active subscription
- **Account Settings** (`/account-settings`) - Update profile and preferences
- **Purchase History** (`/purchase-history`) - View all past purchases
- **Refer a Friend** (`/refer-friend`) - Referral program page
- **Exam/Quiz Page** (`/exam`) - Take quizzes and exams (20 or 65 questions)
- **Results Page** (`/results`) - View quiz/exam results with score breakdown
- **Flagged Questions** (`/flagged`) - Review bookmarked questions

### Certification Detail Pages
Each certification has a dedicated page showing 30 quizzes + 2 exams:
- **Cloud Practitioner** (`/certification/cloud-practitioner`) - CLF-C02
- **AI Practitioner** (`/certification/ai-practitioner`) - AIF-C01
- **Solutions Architect Associate** (`/certification/solutions-architect-associate`) - SAA-C03
- **Developer Associate** (`/certification/developer-associate`) - DVA-C02
- **CloudOps Engineer Associate** (`/certification/cloudops-engineer-associate`) - SOA-C02
- **Data Engineer Associate** (`/certification/data-engineer-associate`) - DEA-C01
- **ML Engineer Associate** (`/certification/machine-learning-engineer-associate`) - MLA-C01
- **Solutions Architect Professional** (`/certification/solutions-architect-professional`) - SAP-C02
- **DevOps Engineer Professional** (`/certification/devops-engineer-professional`) - DOP-C02
- **GenAI Developer Professional** (`/certification/generative-ai-developer-professional`) - AIP-C01
- **Advanced Networking Specialty** (`/certification/advanced-networking-specialty`) - ANS-C01
- **Security Specialty** (`/certification/security-specialty`) - SCS-C02
- **ML Specialty** (`/certification/machine-learning-specialty`) - MLS-C01

---

## Admin Pages (Admin Role Required)

### Admin Dashboard & Management
- **Admin Dashboard** (`/admin`) - Overview with stats and metrics
- **Admin Overview** (`/admin/overview`) - Detailed analytics dashboard
- **Users Management** (`/admin/users`) - View and manage all users
- **Subscriptions** (`/admin/subscriptions`) - View all subscriptions and filter incomplete
- **Payments** (`/admin/payments`) - View all payment transactions
- **Customers** (`/admin/customers`) - View Stripe customer records
- **Billing Management** (`/admin/billing`) - Manage billing settings

### Questions Management
- **Questions Dashboard** (`/admin/questions`) - Question management hub
- **Bulk Import** (`/admin/questions/import`) - Bulk import questions via CSV/JSON
- **View Questions** (`/admin/questions/view`) - Browse and search all questions
- **Question Editor** (`/admin/questions/editor`) - Create/edit individual questions

---

## Page Count Summary

- **Public Pages**: 33
  - Marketing & Info: 8
  - Legal: 4
  - Authentication: 4
  - Error Pages: 1
  - Help Articles: 6
  - Certification Articles: 13
- **Authenticated Pages**: 21
  - Main App: 8
  - Certification Details: 13
- **Admin Pages**: 11
  - Dashboard & Management: 7
  - Questions Management: 4
- **Total Pages**: 65

---

## Deprecated/Old Pages (Not in Use)
- **CertificationsPageOld.tsx** - Old version of certifications page (replaced)

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
