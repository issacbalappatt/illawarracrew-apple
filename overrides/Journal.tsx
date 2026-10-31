import Layout from '@/components/layout/Layout';
import {Link} from '@/lib/rr-shim';
import {appleMedia as media} from '@/lib/appleMedia.generated';
import journal from '@/data/journal.generated';

export type Article = {
  slug: string; title: string; dek: string; category: string; minutes: number; image: string; imageAlt: string;
  finding: {figure: string; label: string};
  body: ({type: 'p' | 'h2' | 'quote'; text: string} | {type: 'list'; items: string[]})[];
  sources: {label: string; url: string}[];
  cta: string;
};

export const articles = journal as Article[];
const img = (k: string) => media[k as keyof typeof media];

export default function Journal() {
  const [lead, ...rest] = articles;
  return (
    <Layout>
      <div className="apple-home jr">
        <header className="apple-wrap jr-head">
          <h1>The Journal.</h1>
          <p>What the research says about a clean home: calm, focus, sleep, health and time. Every article links to its sources.</p>
        </header>
        <div className="apple-wrap">
          <Link to={`/journal/${lead.slug}`} className="jr-lead">
            <img src={img(lead.image)} alt={lead.imageAlt} decoding="async"/>
            <span className="jr-lead-copy">
              <span className="icc-jcard-cat">{lead.category}, {lead.minutes} min read</span>
              <strong>{lead.title}</strong>
              <span>{lead.dek}</span>
            </span>
          </Link>
          <div className="icc-jcards jr-grid">
            {rest.map(a => (
              <Link key={a.slug} to={`/journal/${a.slug}`} className="icc-jcard">
                <img src={img(a.image)} alt={a.imageAlt} loading="lazy" decoding="async"/>
                <span className="icc-jcard-cat">{a.category}, {a.minutes} min read</span>
                <strong>{a.title}</strong>
                <span>{a.dek}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function JournalArticle({article}: {article: Article}) {
  const others = articles.filter(a => a.slug !== article.slug).slice(0, 3);
  return (
    <Layout>
      <article className="apple-home jr jr-article">
        <header className="jr-a-head">
          <p className="icc-jcard-cat"><Link to="/journal">Journal</Link>, {article.category}, {article.minutes} min read</p>
          <h1>{article.title}</h1>
          <p className="jr-dek">{article.dek}</p>
        </header>
        <figure className="jr-a-media"><img src={img(article.image)} alt={article.imageAlt} decoding="async"/></figure>
        <div className="jr-a-body">
          <aside className="jr-finding"><strong>{article.finding.figure}</strong><span>{article.finding.label}</span></aside>
          {article.body.map((b, i) => {
            if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>;
            if (b.type === 'quote') return <blockquote key={i}>{b.text}</blockquote>;
            if (b.type === 'list') return <ul key={i}>{b.items.map(t => <li key={t}>{t}</li>)}</ul>;
            return <p key={i}>{b.text}</p>;
          })}
          <div className="jr-cta">
            <p>{article.cta}.</p>
            <Link to="/book" className="apple-pill">See your price</Link>
          </div>
          <section className="jr-sources" aria-label="Sources">
            <h2>Sources</h2>
            <ol>{article.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ol>
          </section>
        </div>
        <section className="apple-wrap jr-more">
          <h2>Keep reading.</h2>
          <div className="icc-jcards">
            {others.map(a => (
              <Link key={a.slug} to={`/journal/${a.slug}`} className="icc-jcard">
                <img src={img(a.image)} alt={a.imageAlt} loading="lazy" decoding="async"/>
                <span className="icc-jcard-cat">{a.category}</span>
                <strong>{a.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  );
}
