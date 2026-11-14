import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Building2,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import { ADecorLogo } from '../components/common/ADecorLogo';

const SERVICE_LABELS: Record<string, string> = {
  curtains: 'Bespoke Curtains (Pleat Styles)',
  blinds: 'Roman Blinds (Folding Styles)',
  'upholstery-rework': 'Upholstery Rework & Frame Restoration',
  'wall-panels': 'Acoustic & Fabric Wall Panels',
  'designer-headboards': 'Designer Headboards',
  wallpaper: 'Designer Wallpaper',
  flooring: 'Hardwood & Luxury Flooring',
};

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWaUrl, setSubmittedWaUrl] = useState('');

  // Initial Form State with searchParams pre-filling
  const [formData, setFormData] = useState(() => {
    const pleat = searchParams.get('pleat');
    const fabric = searchParams.get('fabric');
    const blind = searchParams.get('blind');
    const project = searchParams.get('project');
    const service = searchParams.get('service');
    const inquiry = searchParams.get('inquiry');

    let initialMsg = '';
    if (inquiry === 'enterprise' || inquiry === 'commercial') {
      initialMsg = 'I would like to inquire about commercial tender pricing and bulk specifications for an upcoming project.';
    } else if (pleat && fabric) {
      initialMsg = `I configured curtains in ${pleat} pleat with ${fabric} fabric. Please bring physical fabric swatches for an on-site window measurement.`;
    } else if (blind) {
      initialMsg = `I am interested in getting a quote for ${blind} Roman blinds for my home/office.`;
    } else if (service === 'upholstery-rework' || service === 'sofa-refurbishing') {
      initialMsg = `I would like to schedule an on-site chassis assessment and textile selection for my upholstery rework project.`;
    } else if (project) {
      initialMsg = `I was inspired by your "${project}" installation in your gallery and would like a custom proposal.`;
    }

    return {
      name: '',
      phone: '',
      email: '',
      service:
        service === 'sofa-refurbishing'
          ? 'upholstery-rework'
          : service || (blind ? 'blinds' : 'curtains'),
      consultationType: 'onsite', // 'onsite' or 'location'
      addressOrCity: 'Chennai',
      message: initialMsg,
    };
  });

  // Handle hash scrolling on direct visit (e.g. /contact#clients)
  useEffect(() => {
    if (window.location.hash === '#clients') {
      const el = document.getElementById('clients');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 250);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const consultationLabel =
      formData.consultationType === 'onsite'
        ? 'On-Site Measuring Visit (Anywhere in TN)'
        : 'Visit Location (Anna Nagar, Chennai)';
    const serviceLabel = SERVICE_LABELS[formData.service] || formData.service;
    const whatsappDigits = SITE_CONTENT.brand.whatsapp.replace(/\D/g, '');

    const summaryLines = [
      '*New Consultation Inquiry — A Decor Furnishings (Chennai)*',
      '',
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
      `*Email:* ${formData.email.trim() || 'Not provided'}`,
      `*Area / City:* ${formData.addressOrCity.trim() || 'Chennai'}`,
      `*Primary Service:* ${serviceLabel}`,
      `*Consultation Mode:* ${consultationLabel}`,
      `*Project Details:* ${formData.message.trim() || 'Please contact me regarding this consultation.'}`,
    ];

    const waUrl = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(summaryLines.join('\n'))}`;
    setSubmittedWaUrl(waUrl);
    setIsSubmitted(true);

    // Open synchronously inside the form submit gesture so browsers never block WhatsApp launch
    const waWindow = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!waWindow) {
      window.location.assign(waUrl);
    }
  };

  const handleCommercialInquiryClick = () => {
    setFormData((prev) => ({
      ...prev,
      service: 'curtains',
      message: 'I would like to inquire about commercial tender pricing and bulk specifications for an upcoming project.',
    }));
    const formElement = document.getElementById('consultation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] min-h-screen">
      {/* 1. Page Hero: Combined Contact & Clients Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Anna Nagar • Chennai • Est. 2004</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.05]">
          Contact & Clients
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Book an on-site consultation & window measurement anywhere in Tamil Nadu, or explore our portfolio of landmark hotel, healthcare, and corporate clients.
        </p>

        {/* Quick Section Anchors */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#consultation-form"
            className="px-5 py-2.5 rounded-full bg-[#1E1D1B] text-white hover:bg-[#C5A880] hover:text-[#1E1D1B] text-xs font-semibold uppercase tracking-luxury transition-all shadow-sm flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#clients"
            className="px-5 py-2.5 rounded-full bg-white border border-[#D3D0C9] text-[#1E1D1B] hover:border-[#C5A880] hover:text-[#C5A880] text-xs font-semibold uppercase tracking-luxury transition-all shadow-sm flex items-center gap-2"
          >
            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Corporate Clients ({SITE_CONTENT.clients.length})</span>
          </a>
        </div>
      </div>

      {/* 2. Main Consultation & Location Grid */}
      <div id="consultation-form" className="max-w-7xl mx-auto px-4 sm:px-6 mb-28 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-10 lg:p-12 rounded-3xl border border-[#D3D0C9] shadow-soft-luxury">
            <div className="mb-8">
              <span className="label-caps text-[#C5A880] text-xs">Direct Atelier Booking</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1D1B] font-light mt-1">
                Schedule a Consultation
              </h2>
              <p className="text-xs text-[#8A8782] mt-1">
                Fill this form to receive a digital estimate and direct WhatsApp confirmation within 1 business hour.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#EAE7E1] text-center space-y-5 animate-fade-in border border-[#C5A880]">
                <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
                <h3 className="font-editorial text-3xl text-[#1E1D1B]">Thank You, {formData.name}</h3>
                <p className="text-xs text-[#5E5C57] max-w-md mx-auto leading-relaxed">
                  All your consultation details have been prepared for our WhatsApp desk (<strong>+91 98411 34665</strong>). If WhatsApp did not open automatically, click below to send directly.
                </p>
                {submittedWaUrl && (
                  <div className="pt-1">
                    <a
                      href={submittedWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold tracking-wider uppercase shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp with Full Details</span>
                    </a>
                  </div>
                )}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs underline text-[#8A8782] hover:text-[#1E1D1B] block mx-auto pt-2"
                >
                  Edit Inquiry or Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Consultation Mode Toggle */}
                <div>
                  <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2.5">
                    How would you like to meet?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, consultationType: 'onsite' }))}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        formData.consultationType === 'onsite'
                          ? 'border-[#1E1D1B] bg-[#1E1D1B] text-white shadow-md'
                          : 'border-[#D3D0C9] bg-white text-[#1E1D1B] hover:border-[#8A8782]'
                      }`}
                    >
                      <span className="font-medium text-xs block">On-Site Measuring Visit</span>
                      <span className="text-[11px] opacity-75 mt-0.5 block">
                        Our master draper visits your residence across TN
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, consultationType: 'location' }))}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        formData.consultationType === 'location'
                          ? 'border-[#1E1D1B] bg-[#1E1D1B] text-white shadow-md'
                          : 'border-[#D3D0C9] bg-white text-[#1E1D1B] hover:border-[#8A8782]'
                      }`}
                    >
                      <span className="font-medium text-xs block">Visit Location</span>
                      <span className="text-[11px] opacity-75 mt-0.5 block">
                        NR Dave Complex, Anna Nagar, Chennai
                      </span>
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98411 XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                      Your Area / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.addressOrCity}
                      onChange={(e) => setFormData((prev) => ({ ...prev, addressOrCity: e.target.value }))}
                      placeholder="e.g. Anna Nagar, ECR, Coimbatore"
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors"
                  >
                    <option value="curtains">Bespoke Curtains (Pleats, Wave & Sheers)</option>
                    <option value="blinds">Roman Blinds (Motorized & Manual)</option>
                    <option value="upholstery-rework">Upholstery Rework & Frame Restoration</option>
                    <option value="wall-panels">Acoustic & Fabric Wall Panels</option>
                    <option value="designer-headboards">Custom Designer Headboards</option>
                    <option value="wallpaper">Designer Wallpaper</option>
                    <option value="flooring">Hardwood & Luxury Vinyl Flooring</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block label-caps text-[#1E1D1B] text-[10px] mb-2">
                    Project Details / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your space: window counts, fabric preferences, room types, or schedule preferences..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3.5 sm:py-4 px-4 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] font-semibold text-[11px] sm:text-xs tracking-luxury uppercase flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                  <span className="text-center">Send Inquiry & Open WhatsApp Confirmation</span>
                </button>

                <p className="text-[11px] text-center text-[#8A8782]">
                  We respect your privacy. No spam. You will speak directly with an A-Decor interior design specialist.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Location Info, Map, QR & Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Atelier Address Card */}
            <div className="p-5 sm:p-8 rounded-3xl bg-[#141312] text-[#FAF8F5] shadow-elevated border border-white/10 space-y-6">
              
              {/* White Signature Plaque */}
              <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between border border-white/80 shadow-inner">
                <ADecorLogo variant="crimson" className="h-11 sm:h-12 w-auto" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A8782]">
                  Atelier
                </span>
              </div>

              <div>
                <span className="label-caps text-[#C5A880] text-[10px] block">Location</span>
                <h3 className="font-editorial text-2xl text-white font-medium mt-1">
                  Anna Nagar, Chennai
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#D3D0C9] font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-white block font-medium">A-Decor Furnishings</strong>
                    <p className="text-[#D3D0C9] font-light mt-1 leading-relaxed">
                      B-1, 201/C-34, NR dave Complex, 2nd Avenue, 11th Main Rd, Corner, Anna Nagar, Chennai, Tamil Nadu 600040
                    </p>
                    <a
                      href={SITE_CONTENT.brand.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#C5A880] hover:text-white transition-colors"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <div>
                    <a href={`tel:${SITE_CONTENT.brand.phones[0]}`} className="text-white hover:text-[#C5A880] font-mono transition-colors block">
                      +91 98411 34665
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a href={`mailto:${SITE_CONTENT.brand.email}`} className="text-white hover:text-[#C5A880] transition-colors">
                    {SITE_CONTENT.brand.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operating Hours</strong>
                    <p>{SITE_CONTENT.brand.hours.weekdays}</p>
                    <p className="text-[11px] text-[#8A8782]">{SITE_CONTENT.brand.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* QR Code for Business Card */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-4">
                <a
                  href="https://q.me-qr.com/uzdp79sj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 hover:scale-105 transition-transform"
                  title="Scan to view A-Decor Furnishings Business Card"
                >
                  <img
                    src={SITE_CONTENT.brand.qrCodeImage}
                    alt="A-Decor Furnishings Business Card QR Code"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-lg bg-white p-1"
                  />
                </a>
                <div className="text-xs space-y-1">
                  <p className="text-white font-medium">A-Decor Furnishings Business Card</p>
                  <p className="text-[11px] text-[#D3D0C9]">
                    Scan QR code to visit A-Decor Furnishings digital card.
                  </p>
                  <a
                    href="/images/contact/qr_code.png"
                    download="adecorfurnishings-business-card-qr.png"
                    className="inline-block text-[10px] uppercase tracking-wider text-[#C5A880] hover:underline"
                  >
                    Download QR →
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map of Anna Nagar, Chennai */}
            <div className="rounded-3xl overflow-hidden border border-[#D3D0C9] bg-white shadow-soft-luxury">
              <div className="p-4 border-b border-[#D3D0C9] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1E1D1B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Google Maps • Anna Nagar, Chennai</span>
                </span>
                <a
                  href={SITE_CONTENT.brand.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A880] hover:underline"
                >
                  Open in App ↗
                </a>
              </div>

              <div className="aspect-[16/10] w-full">
                <iframe
                  title="A-Decor Anna Nagar Chennai Map"
                  src={SITE_CONTENT.brand.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Combined Enterprise & Corporate Clients Section */}
      <section id="clients" className="max-w-7xl mx-auto px-6 pt-16 border-t border-[#D3D0C9]/80 scroll-mt-28">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="label-caps text-[10px] tracking-luxury">Corporate & Institutional Portfolio</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-bold uppercase tracking-tight">
            Enterprise Clients
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-[#5E5C57] font-light leading-relaxed">
            For over 20 years, A-Decor has been the contract furnishing partner for India’s landmark hotels, healthcare facilities, and corporate headquarters.
          </p>
        </div>

        {/* 9 Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONTENT.clients.map((client, idx) => (
            <div
              key={client.id}
              className="p-8 rounded-3xl bg-white border border-[#D3D0C9] shadow-soft-luxury hover:shadow-elevated hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Logo Frame */}
                <div className="w-full h-32 rounded-2xl bg-[#ECE9E2]/50 border border-[#D3D0C9]/60 flex items-center justify-center p-6 mb-6 group-hover:bg-[#FAF8F5] transition-colors">
                  <img
                    src={client.logoTransparent || client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-108 transition-all duration-300"
                  />
                </div>

                <span className="label-caps text-[#C5A880] text-[10px]">
                  {client.industry}
                </span>
                <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors mt-1 font-medium">
                  {client.name}
                </h3>

                <p className="text-xs text-[#5E5C57] leading-relaxed mt-3 font-light">
                  {client.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#D3D0C9]/60 mt-6 flex items-center justify-between text-[11px] text-[#8A8782]">
                <span className="flex items-center gap-1.5 text-[#1E1D1B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Contract Verified</span>
                </span>
                <span className="font-mono text-[#8A8782]">Ref: AD-0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Standards & Contract Advisory Callout */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1E1D1B] text-[#FAF8F5] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
                <span className="label-caps text-xs">Commercial Furnishing Division</span>
              </div>
              <h3 className="font-editorial text-3xl text-white font-light">
                Architectural & Bulk Tender Requirements
              </h3>
              <p className="text-xs sm:text-sm text-[#D3D0C9] max-w-lg leading-relaxed font-light">
                We cater to architects, interior design studios, real-estate builders, and turnkey hotel contractors across Tamil Nadu with specialized commercial pricing and flame-retardant certifications.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCommercialInquiryClick}
              className="px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase hover:bg-white transition-all shadow-glow-gold shrink-0 flex items-center gap-2"
            >
              <span>Inquire for Commercial Tender</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
