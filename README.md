# Abbir Ali - Shopify Developer Portfolio

A modern, responsive portfolio website built with Next.js, featuring a professional contact form with email integration.

## 🚀 Quick Setup

### 1. Install Dependencies
\`\`\`bash
npm install
npm install resend  # For email functionality
\`\`\`

### 2. Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here
\`\`\`

### 3. Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/month free)
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

### 4. Domain Setup (Optional)
- For production, verify your domain in Resend dashboard
- Update the `from` field in `app/lib/email.ts` with your domain
- For testing, you can use Resend's default domain

### 5. Run the Project
\`\`\`bash
npm run dev
\`\`\`

## 📧 Email Features

- ✅ Professional HTML email templates
- ✅ Automatic email notifications to abbirali113@gmail.com
- ✅ Client reply-to functionality
- ✅ Email tracking and tagging
- ✅ Mobile-responsive email design
- ✅ Error handling and validation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS + shadcn/ui
- **Email:** Resend API
- **Forms:** Server Actions with useActionState
- **Icons:** Lucide React

## 📱 Features

- Responsive design for all devices
- Professional contact form
- Project showcase
- Skills and certifications display
- Email notifications for new inquiries
- Modern dark theme with green/blue accents

## 🔧 Customization

1. **Update personal info** in `app/page.tsx`
2. **Modify email template** in `app/lib/email.ts`
3. **Change colors** in `tailwind.config.ts`
4. **Add projects** in the projects section

## 📞 Support

For any issues with setup, contact: abbirali113@gmail.com
