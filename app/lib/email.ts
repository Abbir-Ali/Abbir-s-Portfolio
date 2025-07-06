import { Resend } from "resend"

interface ContactFormData {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
}

// Initialize Resend with better error handling
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactEmail(data: ContactFormData) {
  try {
    if (!resend) {
      // Demo mode - detailed logging for testing
      console.log("🔧 EMAIL SETUP REQUIRED:")
      console.log("1. Create a .env.local file in your project root")
      console.log("2. Add: RESEND_API_KEY=your_api_key_here")
      console.log("3. Get your API key from: https://resend.com/api-keys")
      console.log("4. Verify your domain in Resend dashboard")
      console.log("")
      console.log("📧 Email would be sent to: abbirali113@gmail.com")
      console.log("📋 Contact Data:", {
        name: data.name,
        email: data.email,
        company: data.company || "Not provided",
        projectType: data.projectType,
        budget: data.budget || "Not specified",
        messageLength: data.message.length + " characters",
      })

      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true, demo: true }
    }

    // 🚀 PRODUCTION MODE - Send real email
    console.log("📤 Sending email via Resend...")

    // Use a verified domain or your Resend domain
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `noreply@${process.env.RESEND_DOMAIN}`
      : "onboarding@resend.dev" // Default Resend domain for testing

    const emailResult = await resend.emails.send({
      from: `Abbir Ali Portfolio <${fromEmail}>`,
      to: ["abbirali113@gmail.com"],
      subject: `🚀 New ${data.projectType.replace("-", " ").toUpperCase()} Inquiry from ${data.name}`,
      html: generateEmailTemplate(data),
      replyTo: data.email,
      tags: [
        { name: "source", value: "portfolio" },
        { name: "project_type", value: data.projectType },
        { name: "budget", value: data.budget || "unspecified" },
      ],
    })

    console.log("✅ Email sent successfully!")
    console.log("📧 Email ID:", emailResult.data?.id)

    return {
      success: true,
      demo: false,
      emailId: emailResult.data?.id,
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Email sending failed:", err);

    // Provide helpful error messages
    if (err.message?.includes("API key")) {
      throw new Error("Invalid Resend API key. Please check your RESEND_API_KEY environment variable.")
    }
    if (err.message?.includes("domain") || err.message?.includes("from")) {
      throw new Error("Email domain not verified. Please verify your domain in Resend dashboard or use the default Resend domain.")
    }
    if (err.message?.includes("rate limit")) {
      throw new Error("Rate limit exceeded. Please try again in a few minutes.")
    }

    throw new Error("Failed to send email. Please try again or contact directly.")
  }
}

export function generateEmailTemplate(data: ContactFormData): string {
  const projectTypeFormatted = data.projectType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const budgetFormatted = data.budget
    ? data.budget
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" - ")
    : "Budget not specified"

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Inquiry from ${data.name}</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background-color: #f8fafc; 
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #10b981, #3b82f6); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .header h1 { 
                font-size: 28px; 
                font-weight: 700; 
                margin-bottom: 8px; 
            }
            .header p { 
                font-size: 16px; 
                opacity: 0.9; 
            }
            .content { 
                padding: 40px 30px; 
            }
            .field { 
                margin-bottom: 24px; 
            }
            .field-label { 
                font-weight: 600; 
                color: #374151; 
                margin-bottom: 8px; 
                display: flex; 
                align-items: center; 
                font-size: 14px; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            .field-value { 
                background: #f9fafb; 
                padding: 16px; 
                border-radius: 8px; 
                border-left: 4px solid #10b981; 
                font-size: 16px; 
            }
            .field-value strong { 
                color: #111827; 
            }
            .field-value a { 
                color: #10b981; 
                text-decoration: none; 
                font-weight: 500; 
            }
            .message-box { 
                background: linear-gradient(135deg, #f0f9ff, #e0f2fe); 
                border: 2px solid #0ea5e9; 
                border-radius: 12px; 
                padding: 24px; 
                margin: 24px 0; 
            }
            .message-content { 
                white-space: pre-wrap; 
                line-height: 1.7; 
                color: #0f172a; 
                font-size: 15px; 
            }
            .badge { 
                display: inline-block; 
                background: linear-gradient(135deg, #10b981, #059669); 
                color: white; 
                padding: 8px 16px; 
                border-radius: 20px; 
                font-size: 13px; 
                font-weight: 600; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            .cta-button { 
                display: inline-block; 
                background: linear-gradient(135deg, #10b981, #059669); 
                color: white; 
                padding: 16px 32px; 
                text-decoration: none; 
                border-radius: 8px; 
                font-weight: 600; 
                font-size: 16px; 
                transition: transform 0.2s; 
            }
            .footer { 
                background: #f9fafb; 
                padding: 30px; 
                text-align: center; 
                color: #6b7280; 
                border-top: 1px solid #e5e7eb; 
            }
            .footer strong { 
                color: #374151; 
            }
            .priority-banner {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 12px 20px;
                text-align: center;
                font-weight: 600;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="priority-banner">
                🔥 HIGH PRIORITY LEAD - RESPOND WITHIN 24 HOURS
            </div>
            
            <div class="header">
                <h1>🚀 New Project Inquiry</h1>
                <p>A potential client wants to work with you!</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">👤 Client Name</div>
                    <div class="field-value"><strong>${data.name}</strong></div>
                </div>
                
                <div class="field">
                    <div class="field-label">📧 Email Address</div>
                    <div class="field-value">
                        <a href="mailto:${data.email}?subject=Re: Your Shopify Project Inquiry">${data.email}</a>
                    </div>
                </div>
                
                ${
                  data.company
                    ? `
                <div class="field">
                    <div class="field-label">🏢 Company</div>
                    <div class="field-value">${data.company}</div>
                </div>
                `
                    : ""
                }
                
                <div class="field">
                    <div class="field-label">🛍️ Project Type</div>
                    <div class="field-value">
                        <span class="badge">${projectTypeFormatted}</span>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">💰 Budget Range</div>
                    <div class="field-value"><strong>${budgetFormatted}</strong></div>
                </div>
                
                <div class="message-box">
                    <div class="field-label" style="margin-bottom: 12px;">💬 Project Details</div>
                    <div class="message-content">${data.message}</div>
                </div>
                
                <div style="text-align: center; margin-top: 32px;">
                    <a href="mailto:${data.email}?subject=Re: Your ${projectTypeFormatted} Project - Let's Discuss!&body=Hi ${data.name},%0D%0A%0D%0AThank you for reaching out about your ${projectTypeFormatted.toLowerCase()} project! I'm excited to help you build something amazing.%0D%0A%0D%0ABased on your requirements, I can definitely help with:%0D%0A✅ ${projectTypeFormatted}%0D%0A✅ Performance optimization%0D%0A✅ Mobile-responsive design%0D%0A✅ Conversion optimization%0D%0A%0D%0AWould you be available for a quick 15-minute call this week to discuss your project in detail?%0D%0A%0D%0AYou can also check out my recent work at [your-portfolio-link]%0D%0A%0D%0ALooking forward to working together!%0D%0A%0D%0ABest regards,%0D%0AAbbir Ali%0D%0AShopify Developer%0D%0A📧 abbirali113@gmail.com" 
                       class="cta-button">
                        📞 Reply to ${data.name}
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>New lead from your portfolio website!</strong></p>
                <p><strong>Abbir Ali</strong> - Shopify Developer & E-commerce Specialist</p>
                <p style="margin-top: 8px; font-size: 12px;">
                    📧 abbirali113@gmail.com | 🌐 Portfolio Website
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}
