import {useEffect, useMemo, useRef, useState} from 'react';
import {Check, Minus, Plus} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import {getBusinessInfo} from '@/lib/businessInfo';
import {appleMedia as media} from '@/lib/appleMedia.generated';
import {
  CARPET, DAY_RATES, FREQUENCY_DISCOUNTS, MINIMUM_HOURS, estimateEndOfLease, formatPrice, getDayType, getHourlyRate, toLocalDateString,
  type EOLBedrooms, type EOLCondition, type FurnishedLevel, type Frequency,
} from '@/lib/pricing';

type ServiceKey = 'house' | 'deep' | 'lease' | 'carpet' | 'office' | 'windows';

const incl = (exGst: number) => Math.round(exGst * 1.1 * 100) / 100;

const SERVICES: {key: ServiceKey; name: string; line: string; image: string; param: string}[] = [
  {key: 'house', name: 'House clean', line: `From ${formatPrice(incl(DAY_RATES.weekday - FREQUENCY_DISCOUNTS.weekly))}/hr`, image: media['service-house'], param: 'general-cleaning'},
  {key: 'deep', name: 'Deep clean', line: `From ${formatPrice(incl(DAY_RATES.weekday))}/hr`, image: media['service-deep'], param: 'deep-cleaning'},
  {key: 'lease', name: 'End of lease', line: 'Fixed-price estimate', image: media['service-lease'], param: 'end-of-lease'},
  {key: 'carpet', name: 'Carpet', line: `${formatPrice(incl(CARPET.perRoom))} per room`, image: media['service-carpet'], param: 'carpet-cleaning'},
  {key: 'office', name: 'Office', line: 'Priced after a quick look', image: media['service-office'], param: 'office-cleaning'},
  {key: 'windows', name: 'Windows', line: 'Priced after a quick look', image: media['detail-faucet'], param: 'window-cleaning'},
];

const FREQUENCIES: {key: Frequency; label: string; note: string}[] = [
  {key: 'weekly', label: 'Weekly', note: `Save ${formatPrice(incl(FREQUENCY_DISCOUNTS.weekly))}/hr`},
  {key: 'fortnightly', label: 'Fortnightly', note: `Save ${formatPrice(incl(FREQUENCY_DISCOUNTS.fortnightly))}/hr`},
  {key: 'monthly', label: 'Monthly', note: 'Standard rate'},
  {key: 'one-time', label: 'One-off', note: 'Standard rate'},
];

const ADDONS: {key: string; label: string; price: number}[] = [
  {key: 'carpetSteam', label: 'Carpet steam clean', price: 150},
  {key: 'insideOven', label: 'Inside the oven', price: 60},
  {key: 'insideWindows', label: 'Inside windows', price: 90},
  {key: 'balcony', label: 'Balcony', price: 60},
  {key: 'garage', label: 'Garage', price: 80},
  {key: 'pets', label: 'Pets lived here', price: 50},
];

// Plain links (full page load) keep the query string intact; prefix the deploy base path when hosted under a sub-folder.
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const TIMES = ['Morning', 'Afternoon', 'Evening'];
const roundHalf = (n: number) => Math.round(n * 2) / 2;
const dayFmt = new Intl.DateTimeFormat('en-AU', {weekday: 'short', timeZone: 'Australia/Sydney'});
const dateFmt = new Intl.DateTimeFormat('en-AU', {day: 'numeric', timeZone: 'Australia/Sydney'});
const monthFmt = new Intl.DateTimeFormat('en-AU', {month: 'short', timeZone: 'Australia/Sydney'});
const longFmt = new Intl.DateTimeFormat('en-AU', {weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Australia/Sydney'});

function Segmented<T extends string | number>({label, options, value, onChange}: {label: string; options: {value: T; label: string; note?: string}[]; value: T; onChange: (v: T) => void}) {
  return (
    <div className="bk-seg" role="radiogroup" aria-label={label}>
      {options.map(o => (
        <button key={String(o.value)} type="button" role="radio" aria-checked={value === o.value} className={value === o.value ? 'is-on' : undefined} onClick={() => onChange(o.value)}>
          <span>{o.label}</span>{o.note && <small>{o.note}</small>}
        </button>
      ))}
    </div>
  );
}

function Stepper({label, value, min, max, step = 1, unit, onChange}: {label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void}) {
  return (
    <div className="bk-stepper">
      <span className="bk-stepper-label">{label}</span>
      <div className="bk-stepper-ctrl">
        <button type="button" aria-label={`Fewer ${unit}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))}><Minus size={16}/></button>
        <output aria-live="polite">{value} {unit}</output>
        <button type="button" aria-label={`More ${unit}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))}><Plus size={16}/></button>
      </div>
    </div>
  );
}

export default function Book() {
  const info = getBusinessInfo();
  const [service, setService] = useState<ServiceKey | null>(null);
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2);
  const [hoursOverride, setHoursOverride] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<Frequency>('fortnightly');
  const [eolBeds, setEolBeds] = useState<EOLBedrooms>(2);
  const [furnished, setFurnished] = useState<FurnishedLevel>('empty');
  const [condition, setCondition] = useState<EOLCondition>('average');
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [carpetRooms, setCarpetRooms] = useState(3);
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState('Morning');
  const detailsRef = useRef<HTMLElement>(null);

  // Dates are built in the browser so the server render never disagrees with the visitor's clock.
  useEffect(() => {
    const list: Date[] = [];
    const start = new Date();
    start.setHours(12, 0, 0, 0);
    for (let i = 1; i <= 21; i++) { const d = new Date(start); d.setDate(start.getDate() + i); list.push(d); }
    setDays(list);
  }, []);

  const svc = SERVICES.find(s => s.key === service) || null;
  const hourly = service === 'house' || service === 'deep';
  const quoteOnly = service === 'office' || service === 'windows';
  const minHours = service === 'deep' ? MINIMUM_HOURS.deepClean : MINIMUM_HOURS.houseCleaning;
  const suggested = service === 'deep'
    ? Math.max(minHours, roundHalf(4 + (beds - 1) + 0.5 * (baths - 1)))
    : Math.max(minHours, roundHalf(2 + 0.5 * (beds - 1) + 0.5 * (baths - 1)));
  const hours = hoursOverride ?? suggested;
  const freq: Frequency = service === 'house' ? frequency : 'one-time';
  const rate = getHourlyRate(day, freq);

  const price = useMemo(() => {
    if (hourly) return {kind: 'fixed' as const, ex: rate * hours};
    if (service === 'lease') {
      const r = estimateEndOfLease({bedrooms: eolBeds, bathrooms: baths, furnished, condition, addons});
      return {kind: 'range' as const, low: r.low, high: r.high};
    }
    if (service === 'carpet') return {kind: 'fixed' as const, ex: Math.max(CARPET.minCharge, carpetRooms * CARPET.perRoom)};
    return null;
  }, [hourly, rate, hours, service, eolBeds, baths, furnished, condition, addons, carpetRooms]);

  const choose = (k: ServiceKey) => {
    setService(k);
    setHoursOverride(null);
    requestAnimationFrame(() => detailsRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}));
  };

  const handoff = (() => {
    if (!svc) return '/booking';
    const p = new URLSearchParams({serviceType: svc.param});
    if (service === 'house') p.set('frequency', frequency);
    if (hourly) p.set('hours', String(hours));
    if (hourly || service === 'lease') { p.set('beds', String(service === 'lease' ? (eolBeds === 'studio' ? 1 : eolBeds) : beds)); p.set('toilets', String(baths)); }
    if (service === 'carpet') p.set('rooms', String(carpetRooms));
    if (day) p.set('date', toLocalDateString(day));
    p.set('time', time);
    return `/booking?${p.toString()}`;
  })();

  const priceBig = !price ? 'Free quote' : price.kind === 'range'
    ? `${formatPrice(incl(price.low))} to ${formatPrice(incl(price.high))}`
    : formatPrice(incl(price.ex));
  const priceSmall = !price ? 'We look at the job, then send a fixed price.' : price.kind === 'range'
    ? `Estimate incl. GST. ${formatPrice(price.low)} to ${formatPrice(price.high)} ex GST.`
    : `Incl. GST. ${formatPrice(price.ex)} ex GST.${hourly ? ` ${hours} hrs at ${formatPrice(incl(rate))}/hr.` : ''}`;

  const summaryLines: string[] = [];
  if (hourly) summaryLines.push(`${beds} bed, ${baths} bath`, `${hours} hours`, service === 'house' ? FREQUENCIES.find(f => f.key === frequency)!.label : 'One-off');
  if (service === 'lease') summaryLines.push(`${eolBeds === 'studio' ? 'Studio' : `${eolBeds} bed`}, ${baths} bath`, `${furnished === 'empty' ? 'Empty' : furnished === 'partly' ? 'Partly furnished' : 'Fully furnished'}`, ...ADDONS.filter(a => addons[a.key]).map(a => a.label));
  if (service === 'carpet') summaryLines.push(`${carpetRooms} rooms`);
  if (day) summaryLines.push(`${longFmt.format(day)}, ${time.toLowerCase()}`);

  return (
    <Layout>
      <div className="bk">
        <header className="bk-hero apple-wrap">
          <h1>Book a clean.</h1>
          <p>Choose your clean and see your price as you go. It takes about a minute.</p>
        </header>

        <div className="bk-grid apple-wrap">
          <div className="bk-steps">
            <section className="bk-q" aria-labelledby="q-service">
              <h2 id="q-service"><span>1</span> Which clean do you need?</h2>
              <div className="bk-services" role="radiogroup" aria-labelledby="q-service">
                {SERVICES.map(s => (
                  <button key={s.key} type="button" role="radio" aria-checked={service === s.key} className={'bk-service' + (service === s.key ? ' is-on' : '')} onClick={() => choose(s.key)}>
                    <img src={s.image} alt="" loading="lazy" decoding="async"/>
                    <span className="bk-service-copy"><strong>{s.name}</strong><small>{s.line}</small></span>
                    <span className="bk-check" aria-hidden="true"><Check size={14}/></span>
                  </button>
                ))}
              </div>
            </section>

            <section ref={detailsRef} className={'bk-q' + (service ? '' : ' is-locked')} aria-labelledby="q-home" aria-disabled={!service}>
              <h2 id="q-home"><span>2</span> {quoteOnly ? 'How should we price it?' : 'Tell us about the place.'}</h2>
              {!service && <p className="bk-hint">Choose a clean first.</p>}
              {hourly && (
                <div className="bk-fields" key={service}>
                  <Stepper label="Bedrooms" value={beds} min={1} max={6} unit={beds === 1 ? 'bedroom' : 'bedrooms'} onChange={v => { setBeds(v); setHoursOverride(null); }}/>
                  <Stepper label="Bathrooms" value={baths} min={1} max={5} unit={baths === 1 ? 'bathroom' : 'bathrooms'} onChange={v => { setBaths(v); setHoursOverride(null); }}/>
                  <Stepper label={`Hours (suggested ${suggested})`} value={hours} min={minHours} max={12} step={0.5} unit="hours" onChange={v => setHoursOverride(v)}/>
                  {service === 'house' && (
                    <div className="bk-field"><span className="bk-field-label">How often?</span>
                      <Segmented label="How often" value={frequency} onChange={setFrequency} options={FREQUENCIES.map(f => ({value: f.key, label: f.label, note: f.note}))}/>
                    </div>
                  )}
                </div>
              )}
              {service === 'lease' && (
                <div className="bk-fields" key="lease">
                  <div className="bk-field"><span className="bk-field-label">Bedrooms</span>
                    <Segmented label="Bedrooms" value={eolBeds} onChange={setEolBeds} options={(['studio', 1, 2, 3, 4, 5] as EOLBedrooms[]).map(b => ({value: b, label: b === 'studio' ? 'Studio' : String(b)}))}/>
                  </div>
                  <Stepper label="Bathrooms" value={baths} min={1} max={5} unit={baths === 1 ? 'bathroom' : 'bathrooms'} onChange={setBaths}/>
                  <div className="bk-field"><span className="bk-field-label">Furniture</span>
                    <Segmented label="Furniture" value={furnished} onChange={setFurnished} options={[{value: 'empty', label: 'Empty'}, {value: 'partly', label: 'Partly'}, {value: 'fully', label: 'Fully'}]}/>
                  </div>
                  <div className="bk-field"><span className="bk-field-label">Condition</span>
                    <Segmented label="Condition" value={condition} onChange={setCondition} options={[{value: 'good', label: 'Good'}, {value: 'average', label: 'Average'}, {value: 'heavy', label: 'Needs work'}]}/>
                  </div>
                  <div className="bk-field"><span className="bk-field-label">Add-ons</span>
                    <div className="bk-chips">
                      {ADDONS.map(a => (
                        <button key={a.key} type="button" aria-pressed={!!addons[a.key]} className={addons[a.key] ? 'is-on' : undefined} onClick={() => setAddons(x => ({...x, [a.key]: !x[a.key]}))}>
                          {a.label} <small>+{formatPrice(incl(a.price))}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {service === 'carpet' && (
                <div className="bk-fields" key="carpet">
                  <Stepper label="Rooms" value={carpetRooms} min={1} max={12} unit={carpetRooms === 1 ? 'room' : 'rooms'} onChange={setCarpetRooms}/>
                  <p className="bk-hint">Minimum charge {formatPrice(incl(CARPET.minCharge))} incl. GST.</p>
                </div>
              )}
              {quoteOnly && (
                <p className="bk-note" key="quote">Every {service === 'office' ? 'office' : 'window job'} is different, so we price it after a quick look. Send photos or book a free visit on the next step, and we reply with a fixed price.</p>
              )}
            </section>

            <section className={'bk-q' + (service ? '' : ' is-locked')} aria-labelledby="q-day" aria-disabled={!service}>
              <h2 id="q-day"><span>3</span> When suits you?</h2>
              <div className="bk-days" role="radiogroup" aria-labelledby="q-day">
                {days.length === 0 && Array.from({length: 7}).map((_, i) => <span key={i} className="bk-day is-skeleton"/>)}
                {days.map(d => {
                  const t = getDayType(d);
                  const on = day && toLocalDateString(day) === toLocalDateString(d);
                  return (
                    <button key={d.toISOString()} type="button" role="radio" aria-checked={!!on} className={'bk-day' + (on ? ' is-on' : '')} onClick={() => setDay(d)}>
                      <small>{dayFmt.format(d)}</small>
                      <strong>{dateFmt.format(d)}</strong>
                      <small>{monthFmt.format(d)}</small>
                      {hourly && <em>{formatPrice(incl(getHourlyRate(d, freq)))}</em>}
                      {t !== 'weekday' && <i className="bk-day-tag">{t === 'public-holiday' ? 'Holiday' : 'Weekend'}</i>}
                    </button>
                  );
                })}
              </div>
              <div className="bk-field"><span className="bk-field-label">Time of day</span>
                <Segmented label="Time of day" value={time} onChange={setTime} options={TIMES.map(t => ({value: t, label: t}))}/>
              </div>
              <p className="bk-hint">We confirm the exact start time by call or text.</p>
            </section>
          </div>

          <aside className="bk-summary" aria-label="Your booking">
            <div className="bk-card">
              <div className="bk-card-media">{svc ? <img key={svc.key} src={svc.image} alt=""/> : <img src={media['booking-hero']} alt=""/>}</div>
              <div className="bk-card-body">
                <p className="bk-card-kicker">Your clean</p>
                <h2>{svc ? svc.name : 'Choose a clean to start'}</h2>
                {summaryLines.length > 0 && <ul>{summaryLines.map(l => <li key={l}>{l}</li>)}</ul>}
                {svc && (
                  <div className="bk-price" aria-live="polite">
                    <strong>{priceBig}</strong>
                    <small>{priceSmall}</small>
                  </div>
                )}
                {svc ? (
                  <a href={BASE + (quoteOnly ? '/quote' : handoff)} className="apple-pill bk-cta">{quoteOnly ? 'Get a free quote' : 'Continue'}</a>
                ) : (
                  <span className="apple-pill bk-cta is-disabled" aria-disabled="true">Continue</span>
                )}
                <ul className="bk-assure">
                  <li><Check size={15}/> Price confirmed before we start</li>
                  <li><Check size={15}/> Insured and police-checked</li>
                  <li><Check size={15}/> Rated {info.reviews.ratingValue} from {info.reviews.reviewCount} Google reviews</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className={'bk-bar' + (svc ? ' is-on' : '')} aria-hidden={!svc}>
          <div>
            <strong>{svc ? priceBig : ''}</strong>
            <small>{svc ? (price ? 'Incl. GST' : 'Fixed price after a look') : ''}</small>
          </div>
          <a href={BASE + (quoteOnly ? '/quote' : handoff)} className="apple-pill" tabIndex={svc ? 0 : -1}>{quoteOnly ? 'Get a quote' : 'Continue'}</a>
        </div>
      </div>
    </Layout>
  );
}
