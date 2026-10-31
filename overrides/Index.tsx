import {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {Link} from '@/lib/rr-shim';
import GoogleReviews from '@/components/ui-custom/GoogleReviews';
import HomepageFAQ from '@/components/sections/HomepageFAQ';
import ServiceAreas from '@/components/sections/ServiceAreas';
import {getBusinessInfo} from '@/lib/businessInfo';
import {appleMedia as media} from '@/lib/appleMedia.generated';
import journal from '@/data/journal.generated';

// What Australians most often complain about in cleaning services, paired with our answer.
const promises = [
  {pain: 'A different cleaner every visit.', title: 'The same familiar cleaner.', body: 'We match you with one cleaner or a small team and keep them on your home. If they are ever away, you hear from us before the visit, not on the doorstep.'},
  {pain: 'Explaining your home all over again.', title: 'Your home plan, remembered.', body: 'Priorities room by room, products you prefer, pets, access and what not to touch. Written down once, followed every visit.'},
  {pain: 'An invoice higher than the quote.', title: 'The price you approve. Nothing added.', body: 'You see your price before you book. Anything extra is agreed with you first, never added after.'},
  {pain: 'Chasing a company to fix a missed spot.', title: 'Not right? We come back.', body: 'Tell us what was missed and we return to make it right. No forms, no argument.'},
  {pain: 'Not knowing who is in your home.', title: 'Local people. Paid properly.', body: 'Locally owned in the Illawarra. Insured, police-checked and paid fairly for skilled work, so good people stay.'},
];

const lives = [
  {key: 'families', label: 'Busy families', image: media['service-house'], title: 'More evenings, fewer chores.', body: 'A fixed weekly slot that works around school runs, with the kitchen and bathrooms done first.', points: ['Same day and time every week', 'Kitchen reset and bathrooms first', 'Beds changed with linen you leave out'], to: '/book'},
  {key: 'pets', label: 'Pets and sensitivities', image: media['room-living'], title: 'Cleaning that respects every resident.', body: 'Tell us about your pets, allergies and scents you prefer. We plan the clean around them.', points: ['Pet access and routines in your home plan', 'Fragrance-free, or your own products', 'Extra care with hair on floors and furniture'], to: '/book'},
  {key: 'reset', label: 'A judgement-free reset', image: media['service-deep'], title: 'Life got busy. That is all.', body: 'A new baby, illness, long hours or simply a hard month. You never need to tidy before we arrive.', points: ['You choose the priorities', 'Clear scope and price before we start', 'Then a lighter regular plan, if you want one'], to: '/book'},
  {key: 'older', label: 'Older residents', image: media['step-2'], title: 'A familiar face, on a regular day.', body: 'The same person each visit, help with the heavier jobs, and an optional update for a family member after each clean.', points: ['Same cleaner, same day', 'Floors, bathrooms and high dusting', 'Optional updates to a family contact'], to: '/book'},
  {key: 'coastal', label: 'Coastal homes', image: media['band-living'], title: 'Sand, salt and humidity, handled.', body: 'Homes near the water need a little more. We plan for it every visit.', points: ['Tracked-in sand from floors and door tracks', 'Salt film on glass doors within reach', 'Bathrooms and humid corners kept fresh'], to: '/book'},
  {key: 'moving', label: 'Moving out', image: media['service-lease'], title: 'Hand back the keys with confidence.', body: 'A detailed end of lease clean, priced before we start, ready for your final inspection.', points: ['Fixed-price estimate in a minute', 'Oven, windows and add-ons as you need', 'Bond-focused checklist'], to: '/book'},
];

const services = [
  {name: 'House cleaning', path: '/residential', image: media['service-house'], body: 'Weekly, fortnightly or one-off.'},
  {name: 'Deep cleaning', path: '/deep-clean', image: media['service-deep'], body: 'A full reset, top to bottom.'},
  {name: 'End of lease', path: '/end-of-lease', image: media['service-lease'], body: 'Ready for your final inspection.'},
  {name: 'Office cleaning', path: '/office', image: media['service-office'], body: 'Workplaces across the Illawarra.'},
  {name: 'Carpet cleaning', path: '/carpet-cleaning', image: media['service-carpet'], body: 'Priced per room.'},
  {name: 'Airbnb cleaning', path: '/services/airbnb-cleaning', image: media['service-airbnb'], body: 'Turnovers between guests.'},
];

function Shelf() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({start: true, end: false});
  const update = () => {
    const el = track.current;
    if (el) setEdge({start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8});
  };
  useEffect(update, []);
  const go = (dir: number) => {
    const el = track.current;
    const card = el?.querySelector('li');
    el?.scrollBy({left: dir * ((card?.clientWidth || 320) + 20), behavior: 'smooth'});
  };
  return (
    <>
      <ul className="apple-shelf" ref={track} onScroll={update}>
        {services.map(s => (
          <li key={s.path}>
            <Link to={s.path} className="apple-tile">
              <img src={s.image} alt="" loading="lazy" decoding="async"/>
              <span className="apple-tile-copy"><strong>{s.name}</strong><span>{s.body}</span></span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="apple-shelf-controls">
        <button type="button" aria-label="Previous services" onClick={() => go(-1)} disabled={edge.start}><ChevronLeft size={20}/></button>
        <button type="button" aria-label="Next services" onClick={() => go(1)} disabled={edge.end}><ChevronRight size={20}/></button>
      </div>
    </>
  );
}

function LifeSelector() {
  const [active, setActive] = useState(lives[0].key);
  const life = lives.find(l => l.key === active)!;
  return (
    <div className="icc-life">
      <div className="icc-life-tabs" role="tablist" aria-label="Choose what fits your home">
        {lives.map(l => (
          <button key={l.key} type="button" role="tab" id={`tab-${l.key}`} aria-controls="life-panel" aria-selected={l.key === active} className={l.key === active ? 'is-on' : undefined} onClick={() => setActive(l.key)}>
            {l.label}
          </button>
        ))}
      </div>
      <div className="icc-life-panel" id="life-panel" role="tabpanel" aria-labelledby={`tab-${life.key}`} key={life.key}>
        <figure className="icc-life-media"><img src={life.image} alt="" decoding="async"/></figure>
        <div className="icc-life-copy">
          <h3>{life.title}</h3>
          <p>{life.body}</p>
          <ul>{life.points.map(p => <li key={p}>{p}</li>)}</ul>
          <Link to={life.to} className="apple-pill">See your price</Link>
        </div>
      </div>
    </div>
  );
}

function TimeBack() {
  const [hours, setHours] = useState(3);
  const year = hours * 52;
  const days = Math.round(year / 8);
  return (
    <div className="icc-calc">
      <label htmlFor="hours-range">Hours you spend cleaning each week</label>
      <div className="icc-calc-row">
        <input id="hours-range" type="range" min={1} max={10} step={0.5} value={hours} onChange={e => setHours(Number(e.target.value))}/>
        <output htmlFor="hours-range">{hours} hrs</output>
      </div>
      <p className="icc-calc-big"><strong>{year}</strong> hours a year</p>
      <p className="icc-calc-small">That is about {days} full days. Imagine them back.</p>
    </div>
  );
}

export default function Index() {
  const info = getBusinessInfo();
  const articles = (journal as {slug: string; title: string; dek: string; category: string; image: string}[]).slice(0, 3);
  return (
    <Layout>
      <div className="apple-home icc-home">
        <section className="icc-hero">
          <img className="icc-hero-img" src={media.hero} alt="Cleaner in uniform wiping a marble kitchen island in a coastal home" fetchPriority="high" decoding="async"/>
          <div className="icc-hero-shade" aria-hidden="true"/>
          <div className="apple-wrap icc-hero-copy">
            <h1>Home cleaning in Wollongong, by people you know.</h1>
            <p>The same familiar cleaner every visit. A price you approve first. A local team that answers the phone.</p>
            <div className="apple-actions">
              <Link to="/book" className="apple-pill apple-pill-light">See your price</Link>
              <a href="#different" className="apple-link apple-link-light">How we are different</a>
            </div>
            <p className="icc-hero-proof"><span aria-hidden="true">★★★★★</span> {info.reviews.ratingValue} from {info.reviews.reviewCount} Google reviews</p>
          </div>
        </section>

        <section className="icc-different" id="different">
          <div className="apple-wrap">
            <h2>Most cleaners are good once.<br/>We are built for every time after.</h2>
            <p className="icc-intro">We read what Australians say about cleaning services. The same five problems come up again and again. So we designed around them.</p>
            <ol className="icc-promises">
              {promises.map(p => (
                <li key={p.title}>
                  <p className="icc-pain">{p.pain}</p>
                  <div><h3>{p.title}</h3><p>{p.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="icc-lives">
          <div className="apple-wrap">
            <h2>Cleaning that fits your life.</h2>
            <p className="icc-intro">Every home is different. Choose what sounds like yours.</p>
            <LifeSelector/>
          </div>
        </section>

        <section className="icc-time">
          <div className="apple-wrap icc-time-grid">
            <div>
              <h2>Get your Saturdays back.</h2>
              <p className="icc-intro">Australian women spend an average of 4 hours 53 minutes a day on unpaid work, and men 3 hours 52 minutes. More than a third of women say they often feel rushed.</p>
              <p className="icc-cite">Australian Bureau of Statistics, How Australians Use Their Time, 2024.</p>
              <Link to="/journal/buying-time-not-things" className="apple-link">Why buying time makes people happier</Link>
            </div>
            <TimeBack/>
          </div>
        </section>

        <section className="apple-services" id="services">
          <div className="apple-wrap">
            <div className="apple-section-head">
              <h2>Choose your clean.</h2>
              <Link to="/services" className="apple-link">All cleaning services</Link>
            </div>
            <Shelf/>
            <nav className="apple-also" aria-label="More cleaning services">
              <span>Also available:</span>
              {[['Strata', '/strata-cleaning-wollongong'], ['NDIS', '/ndis'], ['Builders', '/builders'], ['Windows', '/window-cleaning'], ['Pressure washing', '/pressure-washing'], ['Solar panels', '/solar-panel-cleaning'], ['Gutters', '/gutter-cleaning']].map(([n, p]) => <Link key={p} to={p}>{n}</Link>)}
            </nav>
          </div>
        </section>

        <section className="icc-local">
          <div className="apple-wrap icc-local-grid">
            <div>
              <h2>A cleaner home.<br/>A stronger Illawarra.</h2>
              <p>We are locally owned, and our team lives here too. When you book with us, the money stays in the Illawarra and supports local jobs.</p>
            </div>
            <figure className="icc-stat">
              <strong>55%</strong>
              <figcaption>of Australians are willing to pay more to support small businesses they value. <cite>CommBank research, April 2026.</cite></figcaption>
            </figure>
          </div>
        </section>

        <section className="apple-reviews" id="reviews">
          <div className="apple-wrap">
            <h2>Loved by locals.</h2>
            <p className="apple-reviews-sub">Rated {info.reviews.ratingValue} out of 5 from {info.reviews.reviewCount} Google reviews.</p>
            <GoogleReviews tone="light"/>
          </div>
        </section>

        <section className="icc-journal-teaser">
          <div className="apple-wrap">
            <div className="apple-section-head">
              <h2>The Journal.</h2>
              <Link to="/journal" className="apple-link">All articles</Link>
            </div>
            <p className="icc-intro">What the research says about a clean home, sleep, focus and time.</p>
            <div className="icc-jcards">
              {articles.map(a => (
                <Link key={a.slug} to={`/journal/${a.slug}`} className="icc-jcard">
                  <img src={media[a.image as keyof typeof media]} alt="" loading="lazy" decoding="async"/>
                  <span className="icc-jcard-cat">{a.category}</span>
                  <strong>{a.title}</strong>
                  <span>{a.dek}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ServiceAreas/>
        <HomepageFAQ/>

        <section className="icc-finale">
          <div className="apple-wrap">
            <h2>Your home, cared for.</h2>
            <p>See your price in under a minute. Then pick a day that suits you.</p>
            <div className="apple-actions">
              <Link to="/book" className="apple-pill">See your price</Link>
              <Link to="/contact" className="apple-link">Talk to our team</Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
