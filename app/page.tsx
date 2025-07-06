"use client"
import Link from "next/link"
import { Menu, Linkedin, Github, Mail, Code, Zap, Users, TrendingUp, Award, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContactForm from "./components/contact-form"
import { useState, useRef, useEffect } from "react"
import type { FC } from 'react'
import dynamic from 'next/dynamic'

// --- Modal Gallery with Zoom/Pan ---
function ModalGallery({ images, current, setCurrent, modalOpen, setModalOpen, title }: {
  images: string[];
  current: number;
  setCurrent: (idx: number) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, setModalOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) setModalOpen(false);
  };

  // Reset zoom when image changes or modal closes
  useEffect(() => { setZoomed(false); }, [current, modalOpen]);

  return modalOpen ? (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
      tabIndex={-1}
    >
      <div className="relative bg-gray-900 rounded-lg p-4 max-w-lg w-full flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={() => setModalOpen(false)}
          aria-label="Close gallery"
        >
          ×
        </button>
        <div
          className={`relative w-full flex items-center justify-center ${zoomed ? 'overflow-auto cursor-grab' : ''}`}
          style={{ height: '24rem' }}
        >
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-1 z-10"
            onClick={e => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <img
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            className={`rounded transition-transform duration-300 select-none mx-auto object-contain ${zoomed ? 'scale-90 cursor-zoom-out z-20' : 'cursor-zoom-in'}`}
            style={{
              maxHeight: zoomed ? 'none' : '24rem',
              maxWidth: zoomed ? 'none' : '100%',
              display: 'block',
              margin: 'auto'
            }}
            onClick={e => { e.stopPropagation(); setZoomed(z => !z); }}
            draggable={zoomed}
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 rounded-full p-1 z-10"
            onClick={e => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          {images.map((img, idx) => (
            <button
              key={img}
              className={`w-8 h-8 rounded border-2 ${current === idx ? 'border-green-400' : 'border-gray-700'} overflow-hidden`}
              onClick={e => { e.stopPropagation(); setCurrent(idx); }}
              aria-label={`Show image ${idx + 1}`}
            >
              <img src={img} alt="thumb" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}

// Move all card components above Portfolio
function ProjectShowcaseCard() {
  const images = [
    "/shop-the-room-1.png",
    "/shop-the-room-2.png",
    "/shop-the-room-3.png"
  ];
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const description = "A visually immersive e-commerce experience where users can shop entire rooms. Implemented advanced UI and seamless integration for a real-world buying journey.";
  const shortDesc = description.length > 80 ? description.slice(0, 80) + "..." : description;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 md:p-6 p-3 border border-gray-700 flex flex-col items-center justify-center aspect-[4/3] relative shadow-lg">
      <div
        className="w-full h-64 md:h-64 h-36 rounded-xl mb-6 md:mb-6 mb-3 flex items-center justify-center overflow-hidden relative group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={images[0]}
          alt={`Shop the Room screenshot 1`}
          className="w-full h-full object-contain rounded-xl transition-all duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 mb-2 animate-bounce text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553 2.276A2 2 0 0121 14.03V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.97a2 2 0 01.447-1.254L8 10m7 0V6a3 3 0 00-6 0v4m6 0H9" /></svg>
            <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Click to view gallery</span>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-center font-semibold text-lg md:text-lg text-base">Shop the Room</p>
      <p className="text-gray-400 text-center text-sm md:text-sm text-xs mb-2">
        {showFull ? description : shortDesc}
      </p>
      {description.length > 80 && (
        <button
          className="text-green-400 text-xs underline mb-2"
          onClick={() => setShowFull((v) => !v)}
        >
          {showFull ? "View Less" : "View More"}
        </button>
      )}
      <ModalGallery
        images={images}
        current={current}
        setCurrent={setCurrent}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="Shop the Room"
      />
    </div>
  );
}

function B2BDashboardCard() {
  const images = [
    "/b2b-dashboard-1.png",
    "/b2b-dashboard-2.png",
    "/b2b-dashboard-3.png"
  ];
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const description = "Implemented a robust B2B dashboard that extracts and visualizes real-time data, empowering businesses to make informed decisions instantly.";
  const shortDesc = description.length > 80 ? description.slice(0, 80) + "..." : description;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 md:p-6 p-3 border border-gray-700 flex flex-col items-center justify-center aspect-[4/3] relative shadow-lg">
      <div
        className="w-full h-64 md:h-64 h-36 rounded-xl mb-6 md:mb-6 mb-3 flex items-center justify-center overflow-hidden relative group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={images[0]}
          alt={`B2B Dashboard screenshot 1`}
          className="w-full h-full object-contain rounded-xl transition-all duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 mb-2 animate-bounce text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553 2.276A2 2 0 0121 14.03V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.97a2 2 0 01.447-1.254L8 10m7 0V6a3 3 0 00-6 0v4m6 0H9" /></svg>
            <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Click to view gallery</span>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-center font-semibold text-lg md:text-lg text-base mb-1">B2B Dashboard</p>
      <p className="text-gray-400 text-center text-sm md:text-sm text-xs mb-2">
        {showFull ? description : shortDesc}
      </p>
      {description.length > 80 && (
        <button
          className="text-green-400 text-xs underline mb-2"
          onClick={() => setShowFull((v) => !v)}
        >
          {showFull ? "View Less" : "View More"}
        </button>
      )}
      <ModalGallery
        images={images}
        current={current}
        setCurrent={setCurrent}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="B2B Dashboard"
      />
    </div>
  );
}

function DummyProjectCard({ title, images, description }: { title: string; images: string[]; description: string }) {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const descriptionShort = description.length > 80 ? description.slice(0, 80) + "..." : description;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 md:p-6 p-3 border border-gray-700 flex flex-col items-center justify-center aspect-[4/3] relative shadow-lg">
      <div
        className="w-full h-64 md:h-64 h-36 rounded-xl mb-6 md:mb-6 mb-3 flex items-center justify-center overflow-hidden relative group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={images[0]}
          alt={`${title} screenshot 1`}
          className="w-full h-full object-contain rounded-xl transition-all duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 mb-2 animate-bounce text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553 2.276A2 2 0 0121 14.03V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.97a2 2 0 01.447-1.254L8 10m7 0V6a3 3 0 00-6 0v4m6 0H9" /></svg>
            <span className="text-white text-xs bg-black/60 px-2 py-1 rounded">Click to view gallery</span>
          </div>
        </div>
      </div>
      <p className="text-gray-300 text-center font-semibold text-lg md:text-lg text-base">{title}</p>
      <p className="text-gray-400 text-center text-sm md:text-sm text-xs mb-2">
        {showFull ? description : descriptionShort}
      </p>
      {description.length > 80 && (
        <button
          className="text-green-400 text-xs underline mb-2"
          onClick={() => setShowFull((v) => !v)}
        >
          {showFull ? "View Less" : "View More"}
        </button>
      )}
      <ModalGallery
        images={images}
        current={current}
        setCurrent={setCurrent}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={title}
      />
    </div>
  );
}

// Project type definitions
type CustomProject = { key: number; type: 'custom'; Card: FC };
type DummyProject = { key: number; type: 'dummy'; title: string; images: string[]; description: string };
type Project = CustomProject | DummyProject;

// CalendlyModal component
function CalendlyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      return () => { document.body.removeChild(script); };
    }
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 max-w-2xl w-full flex flex-col items-center max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Close Calendly"
        >
          ×
        </button>
        <div
          className="calendly-inline-widget w-full"
          data-url="https://calendly.com/abbirali113/30min"
          style={{ minWidth: 320, height: '60vh', minHeight: 320 }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const allProjects: Project[] = [
    { key: 1, type: 'custom', Card: ProjectShowcaseCard },
    { key: 2, type: 'custom', Card: B2BDashboardCard },
    { key: 3, type: 'dummy', title: 'PDP Redesign', images: ['/pdp-redesign-1.png', '/pdp-redesign-2.png', '/pdp-redesign-3.png'], description: 'Redesigned the Product Detail Page (PDP) while preserving all existing functionalities, ensuring thorough quality assurance, and implementing modern UX/UI approaches for an enhanced, user-friendly experience.' },
    { key: 4, type: 'dummy', title: 'Sticky Add to Cart Bar', images: ['/sticky-cart-1.png', '/sticky-cart-2.png'], description: 'Created a sticky add to cart bar for seamless shopping and improved mobile conversions.' },
  ];

  // Responsive initial visible count
  function getInitialVisible() {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 2 : 3;
    }
    return 3;
  }
  const [visibleProjects, setVisibleProjects] = useState(getInitialVisible);

  // Update visibleProjects on resize
  useEffect(() => {
    function handleResize() {
      setVisibleProjects((prev) => {
        const target = window.innerWidth < 768 ? 2 : 3;
        // Only shrink if needed, don't hide already loaded projects
        return Math.max(prev, target);
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <img
              src="/dp.jpeg"
              alt="Abbir Ali profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-green-400 shadow"
            />
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
              onClick={() => {
                const el = document.getElementById('projects-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
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
                <a href="https://github.com/Abbir-Ali/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/abbir-ali/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://mail.google.com/mail/?view=cm&to=abbirali113@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
            <div className="text-gray-400 text-sm">
              <p>© 2024 Abbir Ali</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-green-400">
                  Contact
                </Link>
                <a
                  href="/Abbir_Ali__Resume%20(2).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                  download
                >
                  Resume
                </a>
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
              <h2 className="text-xl font-mono">Premium Services</h2>
              <Button variant="ghost" size="icon" className="text-green-400">
                <span className="sr-only">View all services</span>→
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative min-h-[120px] md:min-h-[140px] lg:min-h-[160px] h-auto bg-gradient-to-br from-green-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Custom Checkout Extension</h3>
                  <p className="text-sm text-gray-400">Enhanced checkout flow with 25% conversion boost</p>
                </div>
                <Badge className="self-start bg-green-600">Shopify Plus</Badge>
              </div>
              <div className="relative min-h-[120px] md:min-h-[140px] lg:min-h-[160px] h-auto bg-gradient-to-br from-blue-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">B2B Store Migration</h3>
                  <p className="text-sm text-gray-400">Complete platform migration with custom features</p>
                </div>
                <Badge className="self-start bg-blue-600">Remix</Badge>
              </div>
              <div className="relative min-h-[120px] md:min-h-[140px] lg:min-h-[160px] h-auto bg-gradient-to-br from-purple-900 to-gray-900 rounded-lg overflow-hidden p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Theme Customization</h3>
                  <p className="text-sm text-gray-400">Pixel-perfect Figma to Shopify conversion</p>
                </div>
                <Badge className="self-start bg-purple-600">Custom Theme</Badge>
              </div>
            </div>
          </section>

          {/* Projects Showcase */}
          <section id="projects-showcase" className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-10 mt-8">
            <div className="flex items-center gap-3 mb-8">
              <Code className="w-7 h-7 text-green-400" />
              <h2 className="text-3xl font-mono text-green-400">Projects Showcase</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.slice(0, visibleProjects).map((proj) => {
                if (proj.type === 'custom') {
                  const CardComponent = proj.Card;
                  return <CardComponent key={proj.key} />;
                } else {
                  return <DummyProjectCard key={proj.key} title={proj.title} images={proj.images} description={proj.description} />;
                }
              })}
            </div>
            {visibleProjects < allProjects.length && (
              <div className="flex justify-center mt-6">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow"
                  onClick={() => setVisibleProjects(allProjects.length)}
                >
                  Load More Projects
                </button>
              </div>
            )}
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
                  <h3 className="text-2xl font-bold text-blue-400">10+</h3>
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
              <Button variant="secondary" className="bg-white text-black hover:bg-gray-200" onClick={() => setCalendlyOpen(true)}>
                Schedule a Call
              </Button>
              <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
              <a
                href="/Abbir_Ali__Resume%20(2).pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  View Resume
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
