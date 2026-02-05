import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = {
  '/': {
    title: 'NestedCerts - AWS Certification Exam Prep | Practice Tests & Study Platform',
    description: 'Ace your AWS certification exams with NestedCerts. Get daily practice tests, detailed analytics, 30-day study plans, and expert-crafted questions for Solutions Architect, Developer, SysOps Administrator, and all AWS certifications.',
    canonical: 'https://nestedcerts.com/'
  },
  '/certifications': {
    title: 'AWS Certifications - All Exam Prep Courses | NestedCerts',
    description: 'Browse all AWS certification exam prep courses. Practice tests for Solutions Architect, Developer, SysOps Administrator, Security, Database, Machine Learning, and more.',
    canonical: 'https://nestedcerts.com/certifications'
  },
  '/pricing': {
    title: 'Pricing Plans - Choose Your AWS Exam Prep Plan | NestedCerts',
    description: 'Flexible pricing plans for AWS certification exam preparation. Free tier available. Choose from Starter, Professional, Expert, or Enterprise plans with features that fit your study needs.',
    canonical: 'https://nestedcerts.com/pricing'
  },
  '/help': {
    title: 'Help Center - Support & Documentation | NestedCerts',
    description: 'Get help with NestedCerts AWS exam prep platform. Browse FAQs, guides, tutorials, and contact support for assistance with your certification journey.',
    canonical: 'https://nestedcerts.com/help'
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) | NestedCerts',
    description: 'Common questions about NestedCerts AWS certification exam prep. Learn about features, pricing, study plans, practice tests, and how to maximize your exam success.',
    canonical: 'https://nestedcerts.com/faq'
  },
  '/contact-support': {
    title: 'Contact Support - Get Help | NestedCerts',
    description: 'Need help? Contact NestedCerts support team. Get assistance with your AWS certification exam prep, account issues, technical problems, or general inquiries.',
    canonical: 'https://nestedcerts.com/contact-support'
  },
  '/article-30day': {
    title: '30-Day AWS Certification Study Path - Structured Learning Plan | NestedCerts',
    description: 'Follow our proven 30-day study path to pass your AWS certification exam. Get a structured daily schedule with practice tests, study materials, and progress tracking.',
    canonical: 'https://nestedcerts.com/article-30day'
  },
  '/article-upgrade': {
    title: 'How to Upgrade Your Plan - Pricing & Subscription Guide | NestedCerts',
    description: 'Learn how to upgrade your NestedCerts subscription plan. Compare features, pricing tiers, and get step-by-step instructions for upgrading your AWS exam prep account.',
    canonical: 'https://nestedcerts.com/article-upgrade'
  },
  '/article-results': {
    title: 'Understanding Your Exam Results - Performance Analytics Guide | NestedCerts',
    description: 'Learn how to interpret your AWS practice exam results. Understand scoring, performance metrics, domain breakdowns, and how to improve your weak areas for exam success.',
    canonical: 'https://nestedcerts.com/article-results'
  },
  '/article-cancel': {
    title: 'How to Cancel Your Subscription - Account Management Guide | NestedCerts',
    description: 'Step-by-step guide to cancel your NestedCerts subscription. Learn about cancellation policies, refunds, data retention, and how to pause or downgrade your account instead.',
    canonical: 'https://nestedcerts.com/article-cancel'
  },
  '/article-updates': {
    title: 'Question Updates & Content Refresh Schedule | NestedCerts',
    description: 'Learn how often we update AWS certification practice questions. Discover our content refresh schedule, quality assurance process, and how we keep questions aligned with current exams.',
    canonical: 'https://nestedcerts.com/article-updates'
  },
  '/terms': {
    title: 'Terms of Service - Legal Agreement | NestedCerts',
    description: 'Read our Terms of Service for using NestedCerts AWS certification exam prep platform. Learn about user rights, responsibilities, account usage, and service terms.',
    canonical: 'https://nestedcerts.com/terms'
  },
  '/privacy': {
    title: 'Privacy Policy - Data Protection & Security | NestedCerts',
    description: 'Learn how NestedCerts protects your privacy and personal data. Read our privacy policy covering data collection, usage, storage, security measures, and your privacy rights.',
    canonical: 'https://nestedcerts.com/privacy'
  },
  '/accessibility': {
    title: 'Accessibility Statement - Inclusive Design Commitment | NestedCerts',
    description: 'Our commitment to accessibility for all users. Learn about NestedCerts accessibility features, WCAG compliance, assistive technology support, and how to request accommodations.',
    canonical: 'https://nestedcerts.com/accessibility'
  },
  '/refund-policy': {
    title: 'Refund Policy - Money-Back Guarantee Terms | NestedCerts',
    description: 'Understand our refund policy for NestedCerts subscriptions. Learn about eligibility, refund timelines, money-back guarantee, and how to request a refund for your purchase.',
    canonical: 'https://nestedcerts.com/refund-policy'
  },
  '/cancellation-policy': {
    title: 'Cancellation Policy - Subscription Terms | NestedCerts',
    description: 'Review our cancellation policy for NestedCerts subscriptions. Learn about cancellation procedures, notice periods, billing cycles, and what happens to your data after cancellation.',
    canonical: 'https://nestedcerts.com/cancellation-policy'
  }
};

const distDir = path.join(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

console.log('🔨 Generating prerendered HTML for public routes...\n');

Object.entries(routes).forEach(([route, meta]) => {
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`)
    .replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${meta.canonical}"`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${meta.description}"`)
    .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${meta.canonical}"`)
    .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${meta.title}"`)
    .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${meta.description}"`);

  if (route === '/') {
    fs.writeFileSync(templatePath, html);
    console.log(`✓ / (index.html)`);
  } else {
    const routeDir = path.join(distDir, route);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    console.log(`✓ ${route}`);
  }
});

console.log('\n✅ Prerendering complete!');
