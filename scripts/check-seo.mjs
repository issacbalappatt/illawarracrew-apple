import{existsSync,readFileSync,readdirSync}from'node:fs';
const base='.generated-site/';const files=['src/routes/index.tsx','src/routes/__root.tsx','src/lib/seo.ts','src/pages/Index.tsx','public/sitemap.xml','public/robots.txt'];
for(const f of files){if(!existsSync(base+f))throw Error('Missing SEO asset: '+f)}
const idx=readFileSync(base+'src/routes/index.tsx','utf8'),head=readFileSync(base+'src/routes/__root.tsx','utf8'),home=readFileSync(base+'src/pages/Index.tsx','utf8');
const checks={'SSR metadata':idx.includes('seoHead('),'FAQ structured data':idx.includes('FAQPage'),'visible FAQ content':home.includes('HomepageFAQ'),'visible reviews':home.includes('GoogleReviews'),'business schema':head.includes('LocalBusiness'),'self-canonicals':readFileSync(base+'src/lib/seo.ts','utf8').includes('canonical'),'sitemap':readFileSync(base+'public/sitemap.xml','utf8').includes('illawarracrew.com.au'),'local pages':readdirSync(base+'src/routes').filter(p=>p.startsWith('house-cleaning-')).length>=5};
for(const [name,pass] of Object.entries(checks))console.log((pass?'PASS ':'FAIL ')+name);
if(Object.values(checks).some(x=>!x))process.exit(1);
console.log('Static SEO regression checks passed. Verify rendered SEO and Core Web Vitals before production cutover.');
