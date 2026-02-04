# PrepWisely - AWS Certification Exam Prep Platform

A modern, enterprise-grade SaaS platform for AWS certification preparation with daily practice exams, comprehensive analytics, and structured 30-day learning paths.

## 🚀 Current Status: Phase 3 Complete ✅

### ✅ Phase 1: Foundation & Setup (COMPLETE)
- [x] Modern project structure with Vite + React + TypeScript
- [x] Tailwind CSS v4 with design system
- [x] Professional file organization
- [x] Core UI components (Button, Card, Badge)
- [x] Stunning Landing Page with hero, features, pricing preview
- [x] Navigation system with routing
- [x] Dark mode support
- [x] Responsive design

### ✅ Phase 2: Marketing Pages (COMPLETE)
- [x] Comprehensive Certifications catalog page
- [x] Detailed 5-tier Pricing page with upgrade system
- [x] Help Center with search and categories
- [x] Legal pages (Terms of Service, Privacy Policy)
- [x] System Status page with service monitoring
- [x] Professional navigation and routing
- [x] Consistent design across all pages

### ✅ Phase 3: Authentication System (COMPLETE)
- [x] AWS Cognito User Pool & Identity Pool
- [x] Login/Register pages with validation
- [x] Password reset flow with email verification
- [x] Email verification system
- [x] Secure authentication context
- [x] Dashboard with user stats
- [x] Error handling & form validation
- [x] CloudFormation infrastructure deployment

### 🔄 Next: Phase 4 - Core Application Features
- [ ] Daily exam system (20 questions)
- [ ] Question database & management
- [ ] Results tracking & analytics
- [ ] Study utilities (bookmarks, flagged questions)
- [ ] Progress tracking system

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
# One-command setup (creates S3 + CloudFront)
./aws-manager.sh setup

# Deploy to AWS
./aws-manager.sh deploy

# Check status
./aws-manager.sh status
```

See [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

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