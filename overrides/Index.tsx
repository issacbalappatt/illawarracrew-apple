import {useState} from 'react';
import {ArrowUpRight, ArrowDown, Check} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {Link} from '@/lib/rr-shim';
import GoogleReviews from '@/components/ui-custom/GoogleReviews';
import HomepageFAQ from '@/components/sections/HomepageFAQ';
import ServiceAreas from '@/components/sections/ServiceAreas';
import {getBusinessInfo} from '@/lib/businessInfo';
import {appleMedia as media} from '@/lib/appleMedia.generated';
import QuickEnquiry from '@/components/forms/QuickEnquiry';
import journal from '@/data/journal.generated';

const services = [
  {name: 'Regular home cleaning', path: '/residential', image: 'service-house', body: 'A fresh start, every week or fortnight.', tag: 'For everyday living'},
  {name: 'Deep cleaning', path: '/deep-clean', image: 'service-deep', body: 'A little more attention. A complete reset.', tag: 'For a fresh start'},
  {name: 'End of lease cleaning', path: '/end-of-lease', image: 'service-lease', body: 'Leave the cleaning to us. Focus on the move.', tag: 'For your next chapter'},
  {name: 'Office cleaning', path: '/office', image: 'service-office', body: 'A considered clean for your working day.', tag: 'For better workdays'},
  {name: 'Airbnb cleaning', path: '/services/airbnb-cleaning', image: 'service-airbnb', body: 'A welcoming space for the next arrival.', tag: 'For your guests'},
  {name: 'Carpet cleaning', path: '/carpet-cleaning', image: 'service-carpet', body: 'Freshen the spaces you live in most.', tag: 'For underfoot comfort'},
] as const;

const spaces = [
  {image:'courtyard',label:'Living rooms',title:'Room to slow down.',body:'Floors, surfaces and the spaces where life happens. Tell us what you would love taken off your list.',service:'House cleaning',priority:'Living room floors and surfaces'},
  {image:'dining',label:'Gathering spaces',title:'Ready for everyone.',body:'From weeknight dinners to a table full of friends. Plan a regular reset around your household.',service:'House cleaning',priority:'Kitchen and dining spaces'},
  {image:'apartment',label:'Apartments',title:'A fresh city retreat.',body:'A clean that fits your apartment. Let us know about parking, lift access and the rooms you need.',service:'House cleaning',priority:'Apartment cleaning'},
  {image:'cottage',label:'Bedrooms',title:'End the day with calm.',body:'Discuss dusting, floors and your bedroom priorities, with care around the things that make the room yours.',service:'House cleaning',priority:'Bedrooms and dusting'},
  {image:'bathroom',label:'Bathrooms',title:'A little more attention.',body:'Tell us about showers, vanities and the areas that need a deeper clean. We will confirm the scope with you.',service:'Deep cleaning',priority:'Bathroom and shower deep cleaning'},
  {image:'laundry',label:'Laundries',title:'Care for hardworking rooms.',body:'Bring the laundry and other utility spaces into your cleaning plan. Choose the priorities that suit your home.',service:'House cleaning',priority:'Laundry surfaces and floors'},
  {image:'office',label:'Workplaces',title:'A better place to begin.',body:'Discuss your workplace, preferred cleaning times and the shared spaces that matter to your team.',service:'Office cleaning',priority:'Office and meeting room cleaning'},
  {image:'entry',label:'Entrances',title:'A welcome home.',body:'Start with the first impression. Add your entryway, hallway and hard floors to your cleaning priorities.',service:'House cleaning',priority:'Entryway, hallways and hard floors'},
];

function Spaces() {
  const [selected,setSelected]=useState(0);
  const space=spaces[selected];
  return <section className="premium-section apple-wrap premium-spaces" aria-labelledby="spaces-title">
    <div className="premium-heading" data-reveal><div><p className="premium-eyebrow">Care that fits your space</p><h2 id="spaces-title">Every room.<br/>A little more calm.</h2></div><p>Explore the spaces we can help with. Choose a priority to start your enquiry.</p></div>
    <div className="premium-space-options" aria-label="Explore cleaning priorities">{spaces.map((item,i)=><button key={item.image} type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)}>{item.label}</button>)}</div>
    <div className="premium-space-feature"><img key={space.image} src={media[`spaces-${space.image}` as keyof typeof media]} alt={`${space.label}: an illustrative Illawarra-style interior`} loading="lazy" decoding="async" width={1536} height={1024}/><div className="premium-space-copy" aria-live="polite"><p className="premium-eyebrow">{space.label}</p><h3>{space.title}</h3><p>{space.body}</p><a href="#enquire" className="apple-pill" onClick={()=>window.dispatchEvent(new CustomEvent('icc:enquiry-context',{detail:{service:space.service,message:`I'd like help with ${space.priority.toLowerCase()}.`}}))}>Enquire about this space <ArrowUpRight size={18}/></a></div></div>
    <p className="premium-image-caption">Illustrative interiors inspired by Illawarra homes.</p>
  </section>;
}

export default function Index() {
  const info = getBusinessInfo();
  const articles = (journal as {slug:string;title:string;dek:string;category:string;image:string}[]).slice(0,3);
  return <Layout><div className="apple-home premium-home">
    <section className="premium-hero" aria-labelledby="home-title">
      <picture><source media="(max-width: 640px)" srcSet={media['hero-mobile']}/><img src={media.hero} alt="Warm timber living room and garden views, with a cleaner in our black and grey uniform caring for the kitchen" width={1536} height={1024} fetchPriority="high" decoding="async"/></picture>
      <div className="premium-hero-overlay"/>
      <div className="apple-wrap premium-hero-copy">
        <p className="premium-eyebrow">Illawarra Cleaning Crew</p>
        <h1 id="home-title">A beautiful home.<br/>Time to enjoy it.</h1>
        <p className="premium-hero-description">Thoughtful home cleaning in Wollongong and the Illawarra. For busy lives, fresh starts and the feeling of coming home.</p>
        <div className="apple-actions"><a href="#enquire" className="apple-pill apple-pill-light">Enquire about your clean <ArrowUpRight size={18}/></a><Link to="/book" className="premium-hero-secondary">Explore pricing</Link></div>
        <a href="#reviews" className="premium-hero-proof"><span aria-hidden="true">★★★★★</span><span>{info.reviews.ratingValue} / 5 · {info.reviews.reviewCount} Google reviews</span></a>
      </div>
      <a className="premium-explore" href="#enquire" aria-label="Scroll to the quick enquiry form"><ArrowDown size={18}/><span>Make room for living</span></a>
    </section>
    <div className="premium-proofbar"><span>Locally owned in the Illawarra</span><span>Homes & workplaces</span><span>Regular & one-off cleans</span></div>
    <div className="apple-wrap premium-enquiry-wrap"><QuickEnquiry/></div>

    <section className="premium-section apple-wrap" id="services">
      <div className="premium-heading" data-reveal><div><p className="premium-eyebrow">Your home. Your kind of clean.</p><h2>A little care.<br/>A lovely difference.</h2></div><p>From the weekly reset to the once-in-a-while deep clean. Find the right service for your space.</p></div>
      <div className="premium-service-grid">{services.map(s=><Link to={s.path} key={s.path} className="premium-service" data-reveal><div className="premium-service-photo"><img src={media[s.image]} alt="" loading="lazy" decoding="async" width={768} height={640}/><span className="premium-service-arrow" aria-hidden="true"><ArrowUpRight size={22}/></span></div><span className="premium-eyebrow">{s.tag}</span><h3>{s.name}</h3><p>{s.body}</p></Link>)}</div>
      <div className="premium-more-services"><Link to="/services" className="apple-link">Explore all services <ArrowUpRight size={16}/></Link><p>Also here for windows, strata, builders cleans and more.</p></div>
    </section>

    <Spaces/>

    <section className="premium-editorial">
      <div className="premium-editorial-photo"><img src={media['band-living']} alt="Sunlit family living room with timber floors and a leafy escarpment outlook" loading="lazy" width={1536} height={1024}/></div>
      <div className="premium-editorial-copy" data-reveal><p className="premium-eyebrow">The best part isn’t the clean.</p><h2>It’s what you<br/>get back.</h2><p>A slow Saturday morning. Friends around the table. A quiet moment in a space that feels good.</p><p>Tell us which rooms matter most, how often you need a hand and what makes your home yours. We’ll help you plan the clean.</p><a href="#enquire" className="apple-link">Let’s talk about your home <ArrowUpRight size={18}/></a></div>
    </section>

    <section className="premium-section apple-wrap premium-details">
      <div data-reveal><p className="premium-eyebrow">Considered, down to the details</p><h2>Your space.<br/>Handled with care.</h2><p className="premium-body">The kitchen you gather in. The bathroom you start your day in. The small things that make the whole home feel different.</p><ul>{['Choose the rooms and priorities that matter to you.','Tell us about pets, access and product preferences.','Discuss the scope and price before your clean.'].map(t=><li key={t}><Check size={18}/>{t}</li>)}</ul><Link to="/about" className="apple-link">Meet Illawarra Cleaning Crew <ArrowUpRight size={18}/></Link></div>
      <div className="premium-detail-pair" data-reveal><img src={media['room-kitchen']} alt="Cleaner in black uniform wiping a stone kitchen island" loading="lazy" width={768} height={960}/><img src={media['detail-faucet']} alt="Clean limestone vanity and brushed metal tap" loading="lazy" width={768} height={960}/></div>
    </section>

    <section className="apple-reviews premium-reviews" id="reviews"><div className="apple-wrap"><div className="premium-heading" data-reveal><div><p className="premium-eyebrow">From homes around the Illawarra</p><h2>Good words.<br/>From our neighbours.</h2></div><p>Rated {info.reviews.ratingValue} out of 5 from {info.reviews.reviewCount} Google reviews.</p></div><GoogleReviews tone="light"/></div></section>

    <section className="premium-section apple-wrap premium-local"><img src={media['step-2']} alt="Uniformed cleaners arriving at a leafy brick family home" loading="lazy" width={1536} height={1024}/><div data-reveal><p className="premium-eyebrow">At home in the Illawarra</p><h2>From the foothills<br/>to the coast.</h2><p>Family homes in Figtree. Leafy streets in Balgownie. Cottages in Thirroul. Apartments in Wollongong. Care that fits the place you call home.</p><Link to="/locations" className="apple-link">Explore our service areas <ArrowUpRight size={18}/></Link></div></section>
    <ServiceAreas/>
    <HomepageFAQ/>
    <section className="premium-section apple-wrap premium-journal"><div className="premium-heading" data-reveal><div><p className="premium-eyebrow">Notes for a calmer home</p><h2>A little inspiration.</h2></div><Link to="/journal" className="apple-link">The Journal <ArrowUpRight size={18}/></Link></div><div className="icc-jcards">{articles.map(a=><Link key={a.slug} to={`/journal/${a.slug}`} className="icc-jcard"><img src={media[a.image as keyof typeof media]} alt="" loading="lazy" decoding="async"/><span className="icc-jcard-cat">{a.category}</span><strong>{a.title}</strong></Link>)}</div></section>
    <section className="premium-finale"><img src={media.finale} alt="" loading="lazy" width={1536} height={1024}/><div data-reveal><p className="premium-eyebrow">Come home to a little more calm</p><h2>We’ll take it<br/>from here.</h2><a href="#enquire" className="apple-pill apple-pill-light">Enquire about your clean <ArrowUpRight size={18}/></a><p>Or call <a href="tel:+61416592879">0416 592 879</a></p></div></section>
  </div></Layout>;
}
