import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {Link} from '@/lib/rr-shim';
import GoogleReviews from '@/components/ui-custom/GoogleReviews';
import HomepageFAQ from '@/components/sections/HomepageFAQ';
import ServiceAreas from '@/components/sections/ServiceAreas';
import {getBusinessInfo} from '@/lib/businessInfo';
import {appleMedia as media} from '@/lib/appleMedia.generated';

const services = [
  {name: 'House cleaning', path: '/residential', image: media['service-house'], alt: 'Cleaner smoothing fresh bed linen', body: 'Weekly, fortnightly or one-off.'},
  {name: 'Deep cleaning', path: '/deep-clean', image: media['service-deep'], alt: 'Gloved hand using a squeegee on shower glass', body: 'A full reset, top to bottom.'},
  {name: 'End of lease', path: '/end-of-lease', image: media['service-lease'], alt: 'Cleaner detailing a sliding door track', body: 'Ready for your final inspection.'},
  {name: 'Office cleaning', path: '/office', image: media['service-office'], alt: 'Cleaner wiping down an office desk', body: 'Workplaces across the Illawarra.'},
  {name: 'Carpet cleaning', path: '/carpet-cleaning', image: media['service-carpet'], alt: 'Vacuum head on a wool carpet', body: 'Priced per room.'},
  {name: 'Airbnb cleaning', path: '/services/airbnb-cleaning', image: media['service-airbnb'], alt: 'Freshly made guest bed with linen throw', body: 'Turnovers between guests.'},
];

const moreServices: [string, string][] = [
  ['Strata', '/strata-cleaning-wollongong'], ['NDIS', '/ndis'], ['Builders', '/builders'], ['Windows', '/window-cleaning'],
  ['Pressure washing', '/pressure-washing'], ['Solar panels', '/solar-panel-cleaning'], ['Gutters', '/gutter-cleaning'],
];

const rooms = [
  {name: 'Kitchen', image: media['room-kitchen'], alt: 'Gloved hands wiping a stone benchtop', title: 'The kitchen, reset.', body: 'Benchtops, splashbacks, sink, cabinet fronts and appliance doors. Inside the oven and fridge on request.'},
  {name: 'Bathroom', image: media['room-bathroom'], alt: 'Walk-in shower with clear glass', title: 'Bathrooms that feel new.', body: 'Showers, glass, tiles and grout lines, vanities, mirrors and floors, finished properly.'},
  {name: 'Living', image: media['room-living'], alt: 'Cleaner vacuuming a wool rug in a living room', title: 'Living areas, calm again.', body: 'Floors and rugs, skirting boards, door frames, switches and every surface you touch.'},
  {name: 'Laundry', image: media['room-laundry'], alt: 'Gloved hand wiping a laundry benchtop', title: 'Even the laundry.', body: 'Benches, sinks, machine fronts and floors. The small rooms get the same care.'},
];

const details = [
  {image: media['detail-faucet'], alt: 'Gloved hand polishing a kitchen tap', title: 'Tapware polished, not just wiped.'},
  {image: media['detail-rangehood'], alt: 'Cleaner wiping under a rangehood', title: 'Under the rangehood, where grease hides.'},
  {image: media['detail-linen'], alt: 'Folded fresh linen', title: 'Beds made with fresh linen you leave out.'},
];

const statement = 'Your home should feel calm the moment you walk in. We take care of the rest: the grout, the oven door, the skirting boards, and the corners you keep meaning to get to.';

function InkWords({text}: {text: string}) {
  return <>{text.split(' ').map((word, i) => <span className="apple-word" key={i}>{word}{' '}</span>)}</>;
}

function Shelf() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({start: true, end: false});
  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8});
  };
  useEffect(() => { update(); }, []);
  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    el.scrollBy({left: dir * ((card?.clientWidth || 320) + 20), behavior: 'smooth'});
  };
  return (
    <>
      <ul className="apple-shelf" ref={track} onScroll={update}>
        {services.map(s => (
          <li key={s.path}>
            <Link to={s.path} className="apple-tile">
              <img src={s.image} alt={s.alt} loading="lazy" decoding="async" width="800" height="1200"/>
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

function RoomStory() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index)); });
    }, {rootMargin: '-45% 0px -45% 0px'});
    steps.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="apple-story">
      <div className="apple-story-media" aria-hidden="true">
        {rooms.map((r, i) => <img key={r.name} src={r.image} alt="" loading="lazy" decoding="async" className={i === active ? 'is-active' : undefined}/>)}
        <div className="apple-story-dots">{rooms.map((r, i) => <span key={r.name} className={i === active ? 'is-active' : undefined}/>)}</div>
      </div>
      <div className="apple-story-steps">
        {rooms.map((r, i) => (
          <div key={r.name} className={'apple-story-step' + (i === active ? ' is-active' : '')} data-index={i} ref={el => { steps.current[i] = el; }}>
            <img className="apple-story-inline" src={r.image} alt={r.alt} loading="lazy" decoding="async"/>
            <p className="apple-story-kicker">{r.name}</p>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const info = getBusinessInfo();
  const finale = {'--apple-finale': `url(${media.finale})`} as CSSProperties;
  return (
    <Layout>
      <div className="apple-home">
        <section className="apple-hero">
          <div className="apple-wrap apple-hero-copy">
            <h1>Cleaners in Wollongong,{' '}<br/>done properly.</h1>
            <p className="apple-lead">House, end of lease and office cleaning across Wollongong and the Illawarra, by a local, insured and police&#8209;checked team.</p>
            <div className="apple-actions">
              <Link to="/book" className="apple-pill">Book a clean</Link>
              <Link to="/pricing" className="apple-link">See pricing</Link>
            </div>
            <p className="apple-proof"><span aria-hidden="true">★</span> Rated {info.reviews.ratingValue} from {info.reviews.reviewCount} Google reviews</p>
          </div>
          <figure className="apple-hero-media">
            <img src={media.hero} alt="Cleaner in uniform wiping a marble kitchen island in a coastal home" width="1536" height="1024" fetchPriority="high" decoding="async"/>
          </figure>
        </section>

        <section className="apple-statement" aria-label="Our approach">
          <div className="apple-wrap">
            <p><InkWords text={statement}/></p>
            <Link to="/about" className="apple-link">Meet the crew</Link>
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
              {moreServices.map(([name, path]) => <Link key={path} to={path}>{name}</Link>)}
            </nav>
          </div>
        </section>

        <section className="apple-rooms">
          <div className="apple-wrap">
            <h2 className="apple-rooms-title">Room by room.<br/>Nothing skipped.</h2>
            <RoomStory/>
          </div>
        </section>

        <section className="apple-band">
          <img src={media['band-living']} alt="Sunlit coastal living room with an ocean view" loading="lazy" decoding="async"/>
          <div className="apple-band-copy">
            <h2>More time for this.</h2>
            <p>Come home to a clean house and spend the weekend on what you actually enjoy.</p>
          </div>
        </section>

        <section className="apple-details">
          <div className="apple-wrap">
            <h2>Take a closer look.</h2>
            <div className="apple-details-grid">
              {details.map(d => (
                <figure key={d.title}>
                  <img src={d.image} alt={d.alt} loading="lazy" decoding="async" width="1536" height="1024"/>
                  <figcaption>{d.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="apple-trust">
          <div className="apple-wrap">
            <h2>Peace of mind, built in.</h2>
            <div className="apple-trust-grid">
              <div><h3>Fully insured</h3><p>Our team is covered on every job, at home or at work.</p></div>
              <div><h3>Police-checked</h3><p>Every cleaner who comes to your place has a current police check.</p></div>
              <div><h3>Price confirmed first</h3><p>We confirm the scope, timing and price before any work begins.</p></div>
            </div>
          </div>
        </section>

        <section className="apple-steps">
          <div className="apple-wrap">
            <h2>Booked in three steps.</h2>
            <ol>
              <li><img src={media['step-1']} alt="Hands typing on a laptop at a kitchen table" loading="lazy" decoding="async"/><h3>Tell us about your space</h3><p>Pick a service, your home size and a day. You see the price as you go.</p></li>
              <li><img src={media['step-2']} alt="Cleaner arriving at a front door with a cleaning caddy" loading="lazy" decoding="async"/><h3>We confirm the details</h3><p>We call or text to confirm the scope, price and time.</p></li>
              <li><img src={media['step-3']} alt="Keys placed in a bowl in a clean entry hall" loading="lazy" decoding="async"/><h3>Come home to it</h3><p>Walk in to a clean, calm place.</p></li>
            </ol>
            <Link to="/book" className="apple-pill">Book a clean</Link>
          </div>
        </section>

        <section className="apple-reviews" id="reviews">
          <div className="apple-wrap">
            <h2>Loved by locals.</h2>
            <p className="apple-reviews-sub">Rated {info.reviews.ratingValue} out of 5 from {info.reviews.reviewCount} Google reviews.</p>
            <GoogleReviews tone="light"/>
          </div>
        </section>

        <ServiceAreas/>
        <HomepageFAQ/>

        <section className="apple-finale" style={finale}>
          <div className="apple-wrap">
            <h2>Ready when you are.</h2>
            <p>See your price in under a minute, then pick a day that suits you.</p>
            <div className="apple-actions">
              <Link to="/book" className="apple-pill apple-pill-light">Book a clean</Link>
              <Link to="/contact" className="apple-link apple-link-light">Talk to our team</Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
