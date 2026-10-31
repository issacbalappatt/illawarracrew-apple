import {useRef, useState, type FormEvent} from 'react';
import {ArrowUpRight, CheckCircle2} from 'lucide-react';
import {Link} from '@/lib/rr-shim';
import {invokeFunction} from '@/integrations/supabase/lazy';
import {getAttribution} from '@/lib/attribution';
import {newClientRequestId, recordLeadSuccess} from '@/lib/conversion';

export default function QuickEnquiry() {
  const [state, setState] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const request = useRef<string | null>(null);
  const lock = useRef(false);
  const notice = useRef<HTMLDivElement>(null);
  const preview = import.meta.env.VITE_SUPABASE_URL === 'https://trial-disabled.invalid';
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || preview) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get('website')) return;
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const suburb = String(values.get('suburb') || '').trim();
    const service = String(values.get('service') || 'House cleaning');
    if (name.length < 2 || suburb.length < 2) { setState('error'); return; }
    lock.current = true;
    setState('sending');
    request.current ??= newClientRequestId();
    try {
      const {data, error} = await invokeFunction('create-enquiry', {body: {
        name, email, phone: String(values.get('phone') || '').trim(),
        service_type: service,
        message: `Homepage enquiry. Service: ${service}. Suburb: ${suburb}. ${String(values.get('message') || '').trim()}`,
        client_request_id: request.current, attribution: getAttribution(),
      }});
      if (error || !data?.success || !data?.enquiryId) throw new Error('Enquiry not acknowledged');
      request.current = null;
      setState('success');
      form.reset();
      try { recordLeadSuccess({leadId: data.enquiryId, leadType: 'enquiry', service, name, email}); } catch { /* A saved enquiry remains successful if analytics is unavailable. */ }
      requestAnimationFrame(() => notice.current?.focus());
    } catch { setState('error'); }
    finally { lock.current = false; }
  }
  return <section id="enquire" className="premium-enquiry" aria-labelledby="enquiry-title">
    <div className="premium-enquiry-intro">
      <span className="premium-eyebrow">A little less on your list</span>
      <h2 id="enquiry-title">Let’s take care<br/>of your home.</h2>
      <p>Tell us what you need. We’ll get back to you with the next step.</p>
      <a href="tel:+61416592879">Prefer a chat? 0416 592 879</a>
    </div>
    {state === 'success' ? <div className="premium-success" ref={notice} tabIndex={-1} role="status"><CheckCircle2 size={32}/><h3>Thank you. We have your enquiry.</h3><p>Our team will be in touch using the details you provided.</p><button type="button" className="apple-link" onClick={() => setState('idle')}>Send another enquiry</button></div> :
    <form className="premium-form" onSubmit={submit} aria-busy={state === 'sending'}>
      <div className="premium-form-grid">
        <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name"/></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com"/></label>
        <label>Suburb<input name="suburb" autoComplete="address-level2" required minLength={2} maxLength={100} placeholder="e.g. Balgownie"/></label>
        <label>How can we help?<select name="service" defaultValue="House cleaning">{['House cleaning','Deep cleaning','End of lease','Office cleaning','Airbnb cleaning','Carpet cleaning','Something else'].map(x=><option key={x}>{x}</option>)}</select></label>
      </div>
      <div className="premium-honey" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <details className="premium-form-more"><summary>Add a phone number or a few details <span>(optional)</span></summary><label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={50}/></label><label>Anything you’d like us to know?<textarea name="message" maxLength={1500} rows={3} placeholder="Your priorities, preferred days or questions"/></label></details>
      {state === 'error' && <p role="alert" className="premium-form-error">Your enquiry could not be sent. Check your details and try again, or call <a href="tel:+61416592879">0416 592 879</a>. Your details are still here.</p>}
      {preview && <p className="premium-preview-note">You’re viewing our design preview. Online enquiries aren’t sent from this version. Please call us to enquire.</p>}
      <div className="premium-form-bottom"><button type="submit" className="apple-pill" disabled={state === 'sending' || preview}>{state === 'sending' ? 'Sending enquiry…' : preview ? 'Enquiries available on live site' : 'Send my enquiry'}<ArrowUpRight size={18}/></button><p>No payment required.<br/>Your details are used to respond to your enquiry. <Link to="/privacy-policy">Privacy policy</Link>.</p></div>
    </form>}
  </section>;
}
