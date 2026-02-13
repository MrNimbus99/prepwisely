# NestedCerts - AWS Certification Exam Prep Platform

A modern, enterprise-grade SaaS platform for AWS certification preparation with daily practice exams, comprehensive analytics, and structured 30-day learning paths.

## 🚀 Current Status: Production Ready ✅

### ✅ Phase 1-3: Foundation (COMPLETE)
- [x] Modern React 18 + TypeScript + Vite stack
- [x] Tailwind CSS with dark mode
- [x] AWS Cognito authentication
- [x] Marketing pages (Landing, Pricing, Help Center)
- [x] Legal pages (Terms, Privacy)

### ✅ Phase 4: Core Features (COMPLETE)
- [x] Backend infrastructure (API Gateway, Lambda, DynamoDB)
- [x] Exam/quiz system with 13 certifications
- [x] Question database (20 questions per quiz, 65 per exam)
- [x] Timer and navigation
- [x] Flag/bookmark functionality
- [x] Results tracking
- [x] Progress persistence

### ✅ Phase 5: Payments & Subscriptions (COMPLETE)
- [x] Stripe integration (live mode)
- [x] 3 subscription tiers ($20/mo, $70/yr, $100 lifetime)
- [x] Individual cert purchases ($10 each)
- [x] Bundle purchases ($45, $25, $25)
- [x] Webhook processing
- [x] Automatic cert unlocking

### ✅ Phase 6: Admin Panel (COMPLETE)
- [x] User management
- [x] Subscription analytics
- [x] Payment tracking
- [x] Question management (bulk import/export)

### 🎯 Production Features
- ✅ 13 AWS certifications with 30 quizzes + 2 exams each
- ✅ Certificate generation system
- ✅ SEO optimized (95/100 score)
- ✅ Mobile responsive
- ✅ CloudFront CDN
- ✅ Zero security vulnerabilities

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom shadcn/ui components
- **Icons**: Lucide React
- **Charts**: Recharts (ready)

## 🏃‍♂️ Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### AWS Deployment
```bash
# Deploy to production
npm run build
aws s3 sync dist/ s3://prepwisely-app-prod-947977408385 --delete --region ap-southeast-2
aws cloudfront create-invalidation --distribution-id E14K0R0EJ6FBGY --paths "/*" --region ap-southeast-2
```

## 📚 Documentation

- **[Backend Setup](./docs/BACKEND_SETUP.md)** - AWS infrastructure guide
- **[Quiz Loading](./docs/QUIZ_LOADING_GUIDE.md)** - Question management
- **[SEO Guide](./docs/SEO_GUIDE.md)** - SEO best practices
- **[Library Updates](./LIBRARY_UPDATE_PLAN.md)** - Maintenance plan

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Layout components
│   │   └── features/     # Feature-specific components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript definitions
├── styles/               # Global styles
└── assets/               # Static assets
```

## 🎨 Design System

- **Colors**: Modern blue/indigo gradient theme with dark mode
- **Typography**: Inter font family
- **Components**: Consistent design tokens via CSS variables
- **Responsive**: Mobile-first approach

---

**Version**: 1.0.0  
**Last Updated**: February 14, 2026  
**Status**: Production Ready ✅

- **Colors**: Modern blue/indigo gradient theme with dark mode
- **Typography**: Inter font family
- **Components**: Consistent design tokens via CSS variables
- **Responsive**: Mobile-first approach

## 📋 Build Plan

1. ✅ **Phase 1**: Foundation & Setup
2. 🔄 **Phase 2**: Marketing Pages  
3. **Phase 3**: Authentication System
4. **Phase 4**: Core Application
5. **Phase 5**: Billing & Payments
6. **Phase 6**: Admin Panel
7. **Phase 7**: AWS Deployment

---

**Version**: 1.0.0  
**Last Updated**: February 4, 2026