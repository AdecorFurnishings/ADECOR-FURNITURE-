import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Sparkles, ExternalLink, MessageCircle } from 'lucide-react';
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

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service:
      searchParams.get('service') === 'sofa-refurbishing'
        ? 'upholstery-rework'
        : searchParams.get('service') || (searchParams.get('blind') ? 'blinds' : 'curtains'),
    consultationType: 'onsite', // 'onsite' or 'location'
    addressOrCity: 'Chennai',
    message: '',
  });

  // Pre-fill message based on query params from interactive tools
  useEffect(() => {
    const pleat = searchParams.get('pleat');
    const fabric = searchParams.get('fabric');
    const blind = searchParams.get('blind');
    const project = searchParams.get('project');
    const service = searchParams.get('service');

    let defaultMsg = '';
    if (pleat && fabric) {
      defaultMsg = `I configured curtains in ${pleat} pleat with ${fabric} fabric. Please bring physical fabric swatches for an on-site window measurement.`;
    } else if (blind) {
      defaultMsg = `I am interested in getting a quote for ${blind} Roman blinds for my home/office.`;
    } else if (service === 'upholstery-rework' || service === 'sofa-refurbishing') {
      defaultMsg = `I would like to schedule an on-site chassis assessment and textile selection for my upholstery rework project.`;
    } else if (project) {
      defaultMsg = `I was inspired by your "${project}" installation in your gallery and would like a custom proposal.`;
    }

    if (defaultMsg) {
      setFormData((prev) => ({ ...prev, message: defaultMsg }));
    }
  }, [searchParams]);

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

  return (
    <div className="pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] min-h-screen">
      {/* Page Hero with generous clearance under sticky header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Anna Nagar • Chennai</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.05]">
          Visit Location or Book On-Site
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Experience hundreds of fabric rolls at our Anna Nagar location, or invite our master draper for on-site measuring anywhere in Tamil Nadu.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#D3D0C9] shadow-soft-luxury">
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
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#1E1D1B] underline tracking-wider uppercase font-semibold"
                  >
                    Edit or send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senthil Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98411 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Your Area / City in TN</label>
                    <input
                      type="text"
                      placeholder="e.g. Anna Nagar / ECR / Coimbatore"
                      value={formData.addressOrCity}
                      onChange={(e) => setFormData({ ...formData, addressOrCity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Service Dropdown & Consultation Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Primary Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="curtains">Bespoke Curtains (Pleat Styles)</option>
                      <option value="blinds">Roman Blinds (Folding Styles)</option>
                      <option value="upholstery-rework">Upholstery Rework & Frame Restoration</option>
                      <option value="wall-panels">Acoustic & Fabric Wall Panels</option>
                      <option value="designer-headboards">Designer Headboards</option>
                      <option value="wallpaper">Designer Wallpaper</option>
                      <option value="flooring">Hardwood & Luxury Flooring</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-caps text-[11px] text-[#5E5C57]">Consultation Mode</label>
                    <select
                      value={formData.consultationType}
                      onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="onsite">On-Site Measuring Visit (Anywhere in TN)</option>
                      <option value="location">Visit Location (Anna Nagar, Chennai)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="label-caps text-[11px] text-[#5E5C57]">Project Details / Window Count</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your room, number of windows, preferred colors, or dimensions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D3D0C9] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] font-semibold text-xs tracking-luxury uppercase flex items-center justify-center gap-2.5 transition-all shadow-md group"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Send Inquiry & Open WhatsApp Confirmation</span>
                </button>

                <p className="text-[11px] text-center text-[#8A8782]">
                  We respect your privacy. No spam. You will speak directly with an A-Decor interior design specialist.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Location Info, Map, QR & Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Location Address Card */}
            <div className="p-8 rounded-3xl bg-[#1E1D1B] text-[#FAF8F5] shadow-elevated space-y-6 border-t-2 border-[#D90B0B]/70">
              {/* Crisp Full-Crimson Signature Plaque on White Card */}
              <div className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm border border-[#EAE7E1]">
                <ADecorLogo variant="crimson" className="h-11 sm:h-12 w-auto" />
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-[0.22em] text-[#5E5C57]">
                  Est. 2004
                </span>
              </div>

              <div>
                <span className="label-caps text-[#C5A880] text-[10px]">Location</span>
                <h3 className="font-editorial text-3xl text-white font-light mt-1">
                  Anna Nagar, Chennai
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#D3D0C9]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">A-Decor Perfect Home</strong>
                    <p>{SITE_CONTENT.brand.address.street}</p>
                    <p>
                      {SITE_CONTENT.brand.address.area}, {SITE_CONTENT.brand.address.city}, {SITE_CONTENT.brand.address.state} {SITE_CONTENT.brand.address.pincode}
                    </p>
                    <p className="text-[11px] text-[#8A8782] mt-0.5">{SITE_CONTENT.brand.address.landmark}</p>
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
                    <a href={`tel:${SITE_CONTENT.brand.phones[1]}`} className="text-white hover:text-[#C5A880] font-mono transition-colors block">
                      +91 95009 33322
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

              {/* QR Code */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-4">
                <img
                  src={SITE_CONTENT.brand.qrCodeImage}
                  alt="A-Decor QR Code"
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-lg bg-white p-1"
                />
                <div className="text-xs">
                  <p className="text-white font-medium">Official Digital Card</p>
                  <p className="text-[11px] text-[#D3D0C9]">Scan with your smartphone to save contact & directions.</p>
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
    </div>
  );
};
