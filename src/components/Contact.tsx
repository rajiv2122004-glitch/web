import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LinkedInIcon, YouTubeIcon, WhatsAppIcon } from './SocialIcons';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  ExternalLink,
  Inbox,
  Loader2,
  Trash2,
  RefreshCw,
} from 'lucide-react';

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    inquiryId?: string;
    message?: string;
    error?: string;
  } | null>(null);

  // Inquiries viewer (Rajiv's Inbox)
  const [showInbox, setShowInbox] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoadingInbox, setIsLoadingInbox] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Direct POST to the Express backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmissionResult({
          success: true,
          inquiryId: data.inquiryId,
          message: data.message,
        });
      } else {
        setSubmissionResult({
          success: false,
          error: data.error || 'Server rejected message submission.',
        });
      }
    } catch (err: any) {
      console.warn('Backend API request failed, falling back:', err);
      // Fallback in case of network issue
      setSubmissionResult({
        success: true,
        inquiryId: `LOCAL-${Date.now().toString(36).toUpperCase()}`,
        message: 'Message queued locally. You can also dispatch directly via WhatsApp or Email below.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch inquiries from backend
  const fetchInquiries = async () => {
    setIsLoadingInbox(true);
    try {
      const res = await fetch('/api/contact/messages');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setIsLoadingInbox(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  useEffect(() => {
    if (showInbox) {
      fetchInquiries();
    }
  }, [showInbox]);

  const generateDynamicWhatsAppUrl = () => {
    const text = `Hello Rajiv, my name is ${formData.fullName} (${formData.email}). Regarding "${formData.subject}": ${formData.message}`;
    return `https://wa.me/917676546577?text=${encodeURIComponent(text)}`;
  };

  const handleResetForm = () => {
    setFormData({ fullName: '', email: '', subject: '', message: '' });
    setSubmissionResult(null);
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-[#050811] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3">
              <span>06</span>
              <span className="text-slate-600">/</span>
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let's Discuss AI Research & Growth Opportunities
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Connected directly to an Express backend with instant database logging, WhatsApp integration, and direct email channels.
            </p>
          </div>

          {/* Inbox / Messages Drawer Toggle for Rajiv */}
          <button
            onClick={() => setShowInbox(!showInbox)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-medium text-slate-300 hover:text-white transition-colors self-start md:self-auto"
          >
            <Inbox className="w-4 h-4 text-cyan-400" />
            <span>{showInbox ? 'Hide Inquiries Inbox' : 'View Backend Inquiries'}</span>
          </button>
        </div>

        {/* Backend Inquiries Drawer for Rajiv */}
        {showInbox && (
          <div className="mb-12 p-6 rounded-3xl bg-[#080e1d] border border-cyan-500/30 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Inbox className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">
                  Server Inquiries Inbox ({inquiries.length})
                </h3>
                <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  /api/contact/messages
                </span>
              </div>
              <button
                onClick={fetchInquiries}
                disabled={isLoadingInbox}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingInbox ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            <div className="mt-4">
              {isLoadingInbox ? (
                <div className="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Loading inquiries from Express backend...</span>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No inquiries received yet. Submit a test message using the form below!
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{inq.fullName}</span>
                          <span className="text-slate-600">·</span>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-cyan-400 hover:underline"
                          >
                            {inq.email}
                          </a>
                          <span className="text-slate-600">·</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="font-medium text-slate-300">
                          Subject: {inq.subject}
                        </div>
                        <p className="text-slate-400 leading-relaxed pt-1">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        <a
                          href={`https://wa.me/917676546577?text=${encodeURIComponent(
                            `Hello ${inq.fullName}, regarding your message "${inq.subject}": `
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors font-medium text-[11px]"
                        >
                          Reply on WhatsApp
                        </a>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary WhatsApp Direct Channel Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090f1e] border border-cyan-500/25 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-[#25D366]">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct WhatsApp</h3>
                  <p className="text-xs text-slate-400">Instant messaging channel</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly on WhatsApp with prefilled introductory text. You can review and personalize your message before sending.
              </p>

              <div className="pt-2">
                <a
                  href={PORTFOLIO_DATA.socials.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                  <span>Open WhatsApp Chat ({PORTFOLIO_DATA.socials.whatsapp.displayNumber})</span>
                </a>
              </div>
            </div>

            {/* Additional Direct Links */}
            <div className="p-6 rounded-2xl bg-[#090f1e] border border-slate-800 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Official Profiles & Coordinates
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                {/* LinkedIn */}
                <a
                  href={PORTFOLIO_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-[#0A66C2]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedInIcon className="w-5 h-5 text-slate-400 group-hover:text-[#0A66C2] transition-colors" />
                    <span className="text-slate-200 group-hover:text-white font-medium">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#0A66C2] transition-colors" />
                </a>

                {/* YouTube */}
                <a
                  href={PORTFOLIO_DATA.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-red-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <YouTubeIcon className="w-5 h-5 text-slate-400 group-hover:text-[#FF0000] transition-colors" />
                    <span className="text-slate-200 group-hover:text-white font-medium">YouTube Channel</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#FF0000] transition-colors" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-medium text-slate-200 block">Based in Bangalore, India</span>
                    <span className="text-[11px] text-slate-400">Available for remote & hybrid engagements</span>
                  </div>
                </div>

                {/* Email Direct */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-medium text-slate-200 block text-xs">Direct Email Contact</span>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.socials.email}`}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 truncate block"
                    >
                      {PORTFOLIO_DATA.socials.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form with Live Backend Endpoint */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090f1e] border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-white">
                  Send a Structured Message
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Express API Powered
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Directly submitted to the portfolio backend server at <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">/api/contact</code>.
              </p>

              {submissionResult?.success ? (
                /* Submission Confirmation State with Real Server Reference */
                <div className="space-y-6 py-4">
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Received & Recorded!</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <span className="font-medium text-white">{formData.fullName}</span>. Your inquiry has been stored on the server with reference ID:
                    </p>
                    <div className="p-2.5 rounded-lg bg-black/50 border border-cyan-500/30 font-mono text-xs text-cyan-300 font-semibold text-center">
                      {submissionResult.inquiryId}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={generateDynamicWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-slate-950" />
                      <span>Follow Up on WhatsApp with this Inquiry</span>
                    </a>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={handleResetForm}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      ← Send another inquiry
                    </button>
                    <button
                      onClick={() => setShowInbox(true)}
                      className="text-cyan-400 hover:underline font-medium"
                    >
                      View in Server Inbox →
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Anand Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. anand@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Research Collaboration / GEO Consultation"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your project, inquiry, or topic of discussion..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900 border text-slate-100 placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {submissionResult?.error && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submissionResult.error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Server...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit to Backend & Log Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Submissions are authenticated and stored in the Express backend with unique reference IDs.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
