import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: searchParams.get('service') || searchParams.get('blind') ? 'blinds' : searchParams.get('pleat') ? 'curtains' : 'curtains',
    consultationType: 'onsite', // 'onsite' or 'showroom'
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
    } else if (service === 'sofa-refurbishing') {
      defaultMsg = `I would like to schedule an on-site frame inspection and fabric selection for my sofa refurbishing.`;
    } else if (project) {
      defaultMsg = `I was inspired by your "${project}" installation in your gallery and would like a custom proposal.`;
    }

    if (defaultMsg) {
      setFormData((prev) => ({ ...prev, message: defaultMsg }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Format WhatsApp message
    const consultationLabel = formData.consultationType === 'onsite' ? 'On-Site Home Visit' : 'Nandanam Showroom Visit';
    const text = `*New Interior Inquiry - A-Decor Chennai*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Consultation:* ${encodeURIComponent(consultationLabel)}%0A*Location:* ${encodeURIComponent(formData.addressOrCity)}%0A*Details:* ${encodeURIComponent(formData.message)}`;

    // Open WhatsApp in new tab after 800ms
    setTimeout(() => {
      window.open(`https://wa.me/919841134665?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Nandanam Atelier • Chennai</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight">
          Visit Showroom or Book On-Site
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Experience hundreds of fabric rolls at our Nandanam studio, or invite our master draper for on-site measuring anywhere in Tamil Nadu.
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
              <div className="p-8 rounded-2xl bg-[#EAE7E1] text-center space-y-4 animate-fade-in border border-[#C5A880]">
                <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
                <h3 className="font-editorial text-3xl text-[#1E1D1B]">Thank You, {formData.name}</h3>
                <p className="text-xs text-[#5E5C57] max-w-md mx-auto leading-relaxed">
                  Your inquiry has been logged. We are also connecting you to our WhatsApp concierge for instant confirmation.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-[#1E1D1B] underline tracking-wider uppercase font-semibold"
                  >
                    Send another inquiry
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
                      placeholder="e.g. Nandanam / ECR / Coimbatore"
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
                      <option value="curtains">Bespoke Curtains (13 Pleat Styles)</option>
                      <option value="blinds">Roman Blinds (12 Folding Styles)</option>
                      <option value="sofa-refurbishing">Sofa Refurbishing & Re-Upholstery</option>
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
                      <option value="showroom">Showroom Visit (Nandanam, Chennai)</option>
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

          {/* Right Column: Showroom Info, Map, QR & Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Showroom Address Card */}
            <div className="p-8 rounded-3xl bg-[#1E1D1B] text-[#FAF8F5] shadow-elevated space-y-6">
              <div>
                <span className="label-caps text-[#C5A880] text-[10px]">Showroom Location</span>
                <h3 className="font-editorial text-3xl text-white font-light mt-1">
                  Nandanam Atelier
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#D3D0C9]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">A-Decor Perfect Home</strong>
                    <p>{SITE_CONTENT.brand.address.street}, {SITE_CONTENT.brand.address.area}</p>
                    <p>Chennai - {SITE_CONTENT.brand.address.pincode}, Tamil Nadu</p>
                    <p className="text-[11px] text-[#8A8782] mt-0.5">{SITE_CONTENT.brand.address.landmark}</p>
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
                    <p>Monday – Saturday: 9:30 AM – 8:00 PM</p>
                    <p className="text-[11px] text-[#8A8782]">Sunday: Private Showroom Appointments Only</p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-4">
                <img
                  src={SITE_CONTENT.brand.qrCodeImage}
                  alt="A-Decor QR Code"
                  className="w-16 h-16 rounded-lg bg-white p-1"
                />
                <div className="text-xs">
                  <p className="text-white font-medium">Official Digital Card</p>
                  <p className="text-[11px] text-[#D3D0C9]">Scan with your smartphone to save contact & directions.</p>
                </div>
              </div>
            </div>

            {/* Google Map of Nandanam, Chennai */}
            <div className="rounded-3xl overflow-hidden border border-[#D3D0C9] bg-white shadow-soft-luxury">
              <div className="p-4 border-b border-[#D3D0C9] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1E1D1B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Google Maps • Nandanam Prime Corridor</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Nandanam+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A880] hover:underline"
                >
                  Open in App ↗
                </a>
              </div>

              <div className="aspect-[16/10] w-full">
                <iframe
                  title="A-Decor Nandanam Chennai Map"
                  src={SITE_CONTENT.brand.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
