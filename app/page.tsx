"use client"
import Link from "next/link"
import { Menu, Linkedin, Github, Mail, Code, Zap, Users, TrendingUp, Award, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContactForm from "./components/contact-form"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
              AA
            </div>
            <div>
              <h1 className="text-2xl font-mono">ABBIR ALI</h1>
              <p className="text-green-400">SHOPIFY DEVELOPER</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              With 3 years of experience as a Shopify Developer, I build high-performing, customer-centric e-commerce
              stores that empower businesses to thrive. My expertise lies in Shopify Plus, Checkout Extensions, and
              Remix.
            </p>
            <p className="text-gray-400 text-sm">
              Specializing in custom themes, checkout optimization, and modern server-side rendered Shopify apps.
              Passionate about creating fast, user-friendly e-commerce experiences.
            </p>
            <Button
              variant="outline"
              className="rounded-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
            >
              View My Work
            </Button>
          </div>

          {/* Key Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-mono text-green-400">Core Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {["Shopify Plus", "Checkout Extensions", "Remix", "Liquid", "JavaScript", "GraphQL", "CRO", "SEO"].map(
                (skill) => (
                  <Badge key={skill} variant="secondary" className="bg-gray-800 text-gray-300">
                    {skill}
                  </Badge>
                ),
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Github className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="text-gray-400 text-sm">
              <p>© 2024 Abbir Ali</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-green-400">
                  Contact
                </Link>
                <Link href="#" className="hover:text-green-400">
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          {/* Menu Button - Only show on mobile */}
          <div className="flex justify-end lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono">Featured Projects</h2>
              <Button variant="ghost" size="icon" className="text-green-400">
                <span className="sr-only">View all projects</span>→
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative aspect-square bg-gradient-to-br from-green-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Custom Checkout Extension</h3>
                  <p className="text-sm text-gray-400">Enhanced checkout flow with 25% conversion boost</p>
                </div>
                <Badge className="self-start bg-green-600">Shopify Plus</Badge>
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-blue-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">B2B Store Migration</h3>
                  <p className="text-sm text-gray-400">Complete platform migration with custom features</p>
                </div>
                <Badge className="self-start bg-blue-600">Remix</Badge>
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Theme Customization</h3>
                  <p className="text-sm text-gray-400">Pixel-perfect Figma to Shopify conversion</p>
                </div>
                <Badge className="self-start bg-purple-600">Custom Theme</Badge>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-mono text-yellow-400">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-400">Shopify Partner Certified</h3>
                    <p className="text-xs text-gray-400">Advanced Development</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    S+
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400">Shopify Plus Certified</h3>
                    <p className="text-xs text-gray-400">Enterprise Solutions</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                    R
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-400">Remix Certified Developer</h3>
                    <p className="text-xs text-gray-400">Full-Stack Web Framework</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-400">Google Analytics Certified</h3>
                    <p className="text-xs text-gray-400">E-commerce Tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-mono">Tech Stack</h2>
              <Button variant="ghost" size="icon" className="text-white">
                <span className="sr-only">View all technologies</span>→
              </Button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {[
                { name: "Shopify", icon: "🛍️" },
                { name: "Remix", icon: "⚡" },
                { name: "JavaScript", icon: "📜" },
                { name: "Liquid", icon: "💧" },
                { name: "GraphQL", icon: "🔗" },
                { name: "Git", icon: "🌿" },
              ].map((tech) => (
                <div key={tech.name} className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <p className="text-xs font-medium">{tech.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What I Do Best */}
            <section className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-mono mb-4 text-green-400">What I Do Best</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Code className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Custom Development</h3>
                    <p className="text-xs text-gray-400">Figma to pixel-perfect Shopify themes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Checkout Optimization</h3>
                    <p className="text-xs text-gray-400">Custom extensions & Cart Transform API</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">Performance & CRO</h3>
                    <p className="text-xs text-gray-400">Speed optimization & conversion rates</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience Stats */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-mono text-green-400">Experience</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-green-400">3+</h3>
                  <p className="text-gray-400 text-sm">Years of Shopify Development</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">50+</h3>
                  <p className="text-gray-400 text-sm">E-commerce Projects Delivered</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">B2B & DTC</h3>
                  <p className="text-gray-400 text-sm">Specialized Experience</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Form Section */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-mono text-green-400">Let&apos;s Work Together</h2>
            </div>
            <ContactForm />
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-mono mb-4">Ready to Elevate Your Shopify Store?</h2>
            <p className="text-white/80 mb-6">Let&apos;s discuss your project and build something extraordinary together!</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                Schedule a Call
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                View Resume
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
