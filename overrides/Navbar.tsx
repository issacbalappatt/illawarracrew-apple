import {useEffect,useState,useRef} from 'react';
import {Link,useLocation} from '@/lib/rr-shim';
import {ArrowUpRight,ChevronDown,Menu,Phone,X} from 'lucide-react';
import {useAuth} from '@/contexts/AuthContext';
const services=[['House cleaning','/residential'],['End of lease','/end-of-lease'],['Deep cleaning','/deep-clean'],['Office cleaning','/office'],['Strata cleaning','/strata-cleaning-wollongong'],['NDIS cleaning','/ndis'],['Builders cleaning','/builders'],['Window cleaning','/window-cleaning'],['Carpet cleaning','/carpet-cleaning']];
const more=[['Pricing','/pricing'],['Service areas','/locations'],['Reviews','/reviews'],['About','/about'],['Contact','/contact']];
export default function Navbar({showMobileCall=true}:{showMobileCall?:boolean}){
 const [open,setOpen]=useState(false);const loc=useLocation();const {user}=useAuth();const drawer=useRef<HTMLDivElement>(null);
 useEffect(()=>setOpen(false),[loc.pathname]);
 useEffect(()=>{if(!open)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';drawer.current?.querySelector<HTMLElement>('button,a')?.focus();
 const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key!=='Tab')return;const all=[...(drawer.current?.querySelectorAll<HTMLElement>('a,button')||[])];if(e.shiftKey&&document.activeElement===all[0]){e.preventDefault();all[all.length-1]?.focus()}else if(!e.shiftKey&&document.activeElement===all[all.length-1]){e.preventDefault();all[0]?.focus()}};
 document.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',onKey)}},[open]);
 return <header className="site-header apple-header fixed top-0 left-0 right-0 z-50"><nav className="apple-nav" aria-label="Main navigation">
 <Link to="/" className="apple-logo"><img src="/lovable-uploads/logo-204x96.webp" alt="Illawarra Cleaning Crew" width="108" height="51"/></Link>
 <div className="apple-links"><div className="apple-drop"><Link to="/services">Services <ChevronDown size={15}/></Link><div className="apple-drop-content">{services.map(([name,path])=><Link key={path} to={path}>{name}<ArrowUpRight size={14}/></Link>)}</div></div>{more.map(([name,path])=><Link key={path} to={path} aria-current={loc.pathname===path?'page':undefined}>{name}</Link>)}{user&&<Link to="/account">My account</Link>}</div>
 <div className="apple-nav-actions"><a className="apple-call" href="tel:+61416592879" aria-label="Call 0416 592 879"><Phone size={18}/></a><Link to="/booking" className="apple-pill apple-pill-dark apple-book">Book a clean <ArrowUpRight size={16}/></Link><button className="apple-menu-btn" aria-expanded={open} aria-controls="apple-mobile-menu" aria-label="Toggle menu" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div></nav>
 {open&&<div className="apple-mobile" id="apple-mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" ref={drawer}><button onClick={()=>setOpen(false)} className="apple-menu-close" aria-label="Close menu"><X/></button><p>Cleaning services</p>{services.map(([name,path])=><Link key={path} to={path}>{name}<ArrowUpRight size={17}/></Link>)}<p>Explore</p>{more.map(([name,path])=><Link key={path} to={path}>{name}<ArrowUpRight size={17}/></Link>)}<Link to={user?'/account':'/login'}>{user?'My account':'Log in'}<ArrowUpRight size={17}/></Link><Link to="/booking" className="apple-pill apple-pill-dark">Book a clean <ArrowUpRight size={17}/></Link>{showMobileCall&&<a href="tel:+61416592879">Call 0416 592 879</a>}</div>}
 </header>
}