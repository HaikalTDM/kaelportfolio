import { useEffect, useRef, useState } from 'react';
import { whatsappUrl } from '../data/site';
import { ArrowRight, Close } from './Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  name: '',
  company: '',
  email: '',
  service: 'Web Development',
  budget: '$3,000 - $5,000',
  details: '',
};

const SERVICES = ['Web Development', 'Business System', 'Mobile App', 'AI Integration'];
const BUDGETS = ['$3,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000+'];

export default function EnquiryDialog({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // native Escape: intercept so we own the state; modal also focuses first field
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  const submit = () => {
    const msg = [
      'New project enquiry from kael portfolio',
      '',
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget}`,
      form.details ? `Details: ${form.details}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
    onClose();
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else submit();
  };

  const resetAndClose = () => {
    setStep(1);
    setForm(initialForm);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="fixed inset-0 z-50 m-auto bg-transparent p-4 max-w-xl w-full border-none outline-none"
    >
      <div className="relative bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-paper max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
        >
          <Close className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono tracking-widest uppercase text-coral">
              Step {step} of 3
            </span>
            <span className="text-[11px] font-mono text-white/40">
              {step === 1 ? 'Personal Contact' : step === 2 ? 'Project Scope' : 'Budget & Launch'}
            </span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-coral transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={next} className="space-y-4">
          {step === 1 && (
            <>
              <h3 className="text-xl font-semibold tracking-tight text-white">So, who do I have the pleasure of invoicing?</h3>
              <div>
                <label htmlFor="f-name" className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                  Your Name
                </label>
                <input
                  id="f-name"
                  type="text"
                  required
                  autoFocus
                  placeholder="Alex Mercer"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-coral"
                />
              </div>
              <div>
                <label htmlFor="f-company" className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                  Company / Project Name
                </label>
                <input
                  id="f-company"
                  type="text"
                  placeholder="Acme Studio"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-coral"
                />
              </div>
              <div>
                <label htmlFor="f-email" className="block text-xs uppercase tracking-wider text-white/60 mb-1.5">
                  Work Email
                </label>
                <input
                  id="f-email"
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-coral"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl font-semibold tracking-tight text-white">What are we building? Give me the juicy part.</h3>
              <div className="grid grid-cols-2 gap-3">
                {SERVICES.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setForm({ ...form, service: item })}
                    className={`p-3 text-left text-xs rounded-lg border transition ${
                      form.service === item
                        ? 'border-coral bg-coral/10 text-white font-medium'
                        : 'border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div>
                <label htmlFor="f-details" className="block text-xs uppercase tracking-wider text-white/60 mt-3 mb-1.5">
                  Brief details
                </label>
                <textarea
                  id="f-details"
                  rows={3}
                  placeholder="Tell me about the goals, timelines, or tech preferences..."
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-coral"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-xl font-semibold tracking-tight text-white">What are we working with, budget-wise?</h3>
              <div className="space-y-2">
                {BUDGETS.map((tier) => (
                  <label
                    key={tier}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition text-xs ${
                      form.budget === tier
                        ? 'border-coral bg-coral/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={form.budget === tier}
                      onChange={() => setForm({ ...form, budget: tier })}
                      className="accent-coral"
                    />
                    {tier}
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs uppercase tracking-wider text-white/60 hover:text-white px-2 py-1"
              >
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="bg-coral text-black font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-1.5 hover:opacity-95 transition"
            >
              {step === 3 ? 'Send via WhatsApp' : 'Continue'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <p className="text-[10px] font-mono text-white/40 mt-3 text-center">
          Opens WhatsApp with your answers pre-filled. Nothing is stored, I promise.
        </p>
      </div>
    </dialog>
  );
}
