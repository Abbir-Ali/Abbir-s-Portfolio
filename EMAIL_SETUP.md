# Email Integration Setup Guide

## 🚀 Setting Up Resend Email Service

Your portfolio contact form is currently running in demo mode. Follow these steps to enable real email sending:

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key
1. Go to the [API Keys section](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name like "Portfolio Contact Form"
4. Copy the generated API key

### Step 3: Configure Environment Variables
1. Create a `.env.local` file in your project root (same level as `package.json`)
2. Add your API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### Step 4: Test Email Sending
1. Restart your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check the console for email sending logs
4. Check your email (abbirali113@gmail.com) for the test message

### Step 5: Domain Verification (Optional but Recommended)
For production use, verify your domain in Resend:
1. Go to [Domains section](https://resend.com/domains)
2. Add your domain (e.g., yourdomain.com)
3. Follow the DNS configuration instructions
4. Add to your `.env.local`:
   ```
   RESEND_DOMAIN=yourdomain.com
   ```

## 🔧 Troubleshooting

### "Invalid API Key" Error
- Double-check your API key in `.env.local`
- Make sure there are no extra spaces or quotes
- Restart your development server after adding the key

### "Domain Not Verified" Error
- Use the default Resend domain for testing: `onboarding@resend.dev`
- Or verify your domain in the Resend dashboard
- Check DNS records are properly configured

### "Rate Limit Exceeded" Error
- Resend has rate limits on free accounts
- Wait a few minutes and try again
- Consider upgrading for higher limits

### Emails Not Received
- Check your spam folder
- Verify the "to" email address in `email.ts`
- Check Resend dashboard for delivery status

## 📧 Email Template Customization

The email template is located in `app/lib/email.ts`. You can customize:
- Email subject line
- HTML template styling
- Reply-to address
- Email tags for tracking

## 🚀 Production Deployment

When deploying to production:
1. Set environment variables in your hosting platform
2. Verify your domain in Resend
3. Test email functionality thoroughly
4. Monitor email delivery rates

## 📞 Support

If you need help:
- Check Resend documentation: https://resend.com/docs
- Review error messages in browser console
- Test with the demo mode first 