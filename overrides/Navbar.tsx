import {useEffect, useState, useRef} from 'react';
import {Link, useLocation} from '@/lib/rr-shim';
import {ChevronDown, Menu, Phone, X} from 'lucide-react';
import {useAuth} from '@/contexts/AuthContext';

const services = [
  ['House cleaning', '/residential'], ['End of lease', '/end-of-lease'], ['Deep cleaning', '/deep-clean'], ['Office cleaning', '/office'],
  ['Strata cleaning', '/strata-cleaning-wollongong'], ['NDIS cleaning', '/ndis'], ['Builders cleaning', '/builders'],
  ['Airbnb cleaning', '/services/airbnb-cleaning'], ['Window cleaning', '/window-cleaning'], ['Carpet cleaning', '/carpet-cleaning'],
];
const more = [['Pricing', '/pricing'], ['Service areas', '/locations'], ['Reviews', '/reviews'], ['Journal', '/journal'], ['About', '/about']];

/** Two-part logo (crew mark + wordmark) drawn as masks so it takes the theme colours in light and dark mode. */
export function IccLogo() {
  return (
    <span className="icc-logo" role="img" aria-label="Illawarra Cleaning Crew">
      <span className="icc-logo-mark"/>
      <span className="icc-logo-word"/>
    </span>
  );
}

export default function Navbar({showMobileCall = true}: {showMobileCall?: boolean}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const {user} = useAuth();
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, {passive: true});
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawer.current?.querySelector<HTMLElement>('button,a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab') return;
      const all = [...(drawer.current?.querySelectorAll<HTMLElement>('a,button') || [])];
      if (e.shiftKey && document.activeElement === all[0]) { e.preventDefault(); all[all.length - 1]?.focus(); }
      else if (!e.shiftKey && document.activeElement === all[all.length - 1]) { e.preventDefault(); all[0]?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className={'site-header apple-header fixed top-0 left-0 right-0 z-50' + (scrolled ? ' is-scrolled' : '')}>
      <nav className="apple-nav" aria-label="Main navigation">
        <Link to="/" className="apple-logo"><IccLogo/></Link>
        <div className="apple-links">
          <div className="apple-drop">
            <Link to="/services">Services <ChevronDown size={14} aria-hidden="true"/></Link>
            <div className="apple-drop-content">{services.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}</div>
          </div>
          {more.map(([name, path]) => <Link key={path} to={path} aria-current={loc.pathname === path ? 'page' : undefined}>{name}</Link>)}
          {user && <Link to="/account">Account</Link>}
        </div>
        <div className="apple-nav-actions">
          <a className="apple-call" href="tel:+61416592879" aria-label="Call 0416 592 879"><Phone size={16}/></a>
          <Link to="/book" className="apple-pill apple-pill-small apple-book">See your price</Link>
          <button className="apple-menu-btn" aria-expanded={open} aria-controls="apple-mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(v => !v)}>{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
      </nav>
      {open && (
        <div className="apple-mobile" id="apple-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={drawer}>
          <button onClick={() => setOpen(false)} className="apple-menu-close" aria-label="Close menu"><X size={20}/></button>
          <p>Cleaning services</p>
          {services.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}
          <p>Explore</p>
          {[...more, ['Contact', '/contact']].map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}
          <Link to={user ? '/account' : '/login'}>{user ? 'Account' : 'Log in'}</Link>
          <Link to="/book" className="apple-pill">See your price</Link>
          {showMobileCall && <a className="apple-mobile-call" href="tel:+61416592879">Call 0416 592 879</a>}
        </div>
      )}
    </header>
  );
}
