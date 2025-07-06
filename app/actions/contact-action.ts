"use server"

import { sendContactEmail } from "../lib/email"

interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      projectType: formData.get("projectType") as string,
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
    }

    // Validate required fields
    if (!data.name || !data.email || !data.projectType || !data.message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // Send email
    const result = await sendContactEmail(data)

    if (result.demo) {
      return {
        success: true,
        message:
          "✅ Demo Mode: Your message has been processed! Check the console to see the email template. Set up Resend to send real emails.",
      }
    }

    return {
      success: true,
      message: "🚀 Thank you for your message! I'll get back to you within 24 hours.",
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Contact form error:", err)
    return {
      success: false,
      message:
        "❌ Sorry, there was an error sending your message. Please try again or email me directly at abbirali113@gmail.com.",
    }
  }
}
