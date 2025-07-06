"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitContactForm } from "../actions/contact-action"
import { useActionState } from "react"
import { Loader2, CheckCircle, AlertCircle, Info } from "lucide-react"

interface ContactFormState {
  success: boolean;
  message: string;
}

export default function ContactForm() {
  const initialState: ContactFormState = { success: false, message: "" };
  const action = async (state: ContactFormState, formData: FormData): Promise<ContactFormState> => {
    return await submitContactForm(state, formData);
  };
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <div className="space-y-6">
      {/* Email Setup Status */}
      <div className="bg-blue-900/20 border border-blue-500/20 text-blue-400 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold">Email Integration Status</span>
        </div>
        <p className="text-sm">
          The contact form is working. Email delivery status will be shown after you submit the form.<br />
          See <code className="bg-blue-800/50 px-1 rounded">EMAIL_SETUP.md</code> for setup instructions.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-300">
              Company Name
            </Label>
            <Input
              id="company"
              name="company"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              placeholder="Your company"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectType" className="text-gray-300">
              Project Type *
            </Label>
            <Select name="projectType" required>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="custom-theme">Custom Theme Development</SelectItem>
                <SelectItem value="checkout-optimization">Checkout Optimization</SelectItem>
                <SelectItem value="shopify-plus">Shopify Plus Migration</SelectItem>
                <SelectItem value="app-development">App Development</SelectItem>
                <SelectItem value="store-migration">Store Migration</SelectItem>
                <SelectItem value="performance-optimization">Performance Optimization</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="text-gray-300">
            Project Budget
          </Label>
          <Select name="budget">
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="over-50k">Over $50,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-300">
            Project Details *
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full bg-green-600 hover:bg-green-700 text-white">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </Button>

        {state && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg ${
              state.success
                ? "bg-green-900/20 border border-green-500/20 text-green-400"
                : "bg-red-900/20 border border-red-500/20 text-red-400"
            }`}
          >
            {state.success ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{state.message}</p>
          </div>
        )}
      </form>
    </div>
  )
}
