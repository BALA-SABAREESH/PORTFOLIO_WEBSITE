import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { playUiSound } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<ContactFormData> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 1. Check for configured Formspree endpoint in environment
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (
      typeof formspreeEndpoint === 'string' &&
      formspreeEndpoint.trim().length > 0 &&
      !formspreeEndpoint.includes('your_formspree_id')
    ) {
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email
          })
        });

        if (response.ok) {
          setSubmitStatus('success');
          setStatusMessage('Thank you! Your message has been routed to balasabareeshp@gmail.com.');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.warn('Formspree dispatch failed, falling back to mailto link', err);
      }
    }

    // 2. Direct client-side mailto pre-fill fallback
    try {
      const subjectEncoded = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
      const bodyEncoded = encodeURIComponent(
        `Hi Bala,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your portfolio website.`
      );
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

      window.location.href = mailtoUrl;

      setSubmitStatus('success');
      setStatusMessage(
        'Your email client has been launched with your message pre-filled to balasabareeshp@gmail.com.'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Unable to launch email client automatically. Please copy the email address directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    playUiSound('success');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">Connect & Inquire</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get In{' '}
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ff5e7e] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Interested in discussing full-time software engineering roles, mobile application development, or technical collaborations? Feel free to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0e121a] to-[#090b10] border border-slate-800/90 p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white tracking-tight relative z-10">
                Direct Contact Information
              </h3>

              <div className="space-y-4 relative z-10">
                {/* Email with copy button */}
                <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm shadow-cyan-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-400">Email Address</p>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copy email to clipboard"
                    data-cursor="Copy"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 shadow-sm shadow-sky-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Phone</p>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-sky-300 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm shadow-emerald-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {PERSONAL_INFO.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3 relative z-10">
                <p className="text-xs font-mono uppercase text-slate-300 font-semibold tracking-wider">
                  Professional Profiles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-400/40 flex items-center justify-between text-xs font-mono transition-all"
                    data-cursor="GitHub"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      GitHub
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-400/40 flex items-center justify-between text-xs font-mono transition-all"
                    data-cursor="LinkedIn"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                      LinkedIn
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-400/40 flex items-center justify-between text-xs font-mono transition-all"
                    data-cursor="LeetCode"
                  >
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      LeetCode
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0e121a] to-[#090b10] border border-slate-800/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
              
              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white tracking-tight">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submissions are routed directly to <span className="text-cyan-400 font-mono">balasabareeshp@gmail.com</span>.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                    {statusMessage}
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
                    {statusMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10" noValidate>
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-slate-300 font-medium">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${
                        errors.name ? 'border-rose-500' : 'border-slate-800'
                      } text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all disabled:opacity-50`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-rose-400">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-slate-300 font-medium">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                      placeholder="e.g. sarah@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${
                        errors.email ? 'border-rose-500' : 'border-slate-800'
                      } text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all disabled:opacity-50`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-rose-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300 font-medium">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                    placeholder="e.g. Software Engineer Opportunity / Project Inquiry"
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${
                      errors.subject ? 'border-rose-500' : 'border-slate-800'
                    } text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all disabled:opacity-50`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-rose-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-slate-300 font-medium">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                    placeholder="Describe your project, role opportunity, or question..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${
                      errors.message ? 'border-rose-500' : 'border-slate-800'
                    } text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/70 focus:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all disabled:opacity-50 resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-rose-400">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm tracking-tight transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                    data-cursor="Send"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
