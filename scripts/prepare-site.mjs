import {cpSync,existsSync,readFileSync,rmSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
const root=process.cwd();const source=resolve(root,'upstream-site');const target=resolve(root,'.generated-site');
if(!existsSync(join(source,'package.json')))throw Error('Initialise private source: git submodule update --init --recursive');
rmSync(target,{recursive:true,force:true});
cpSync(source,target,{recursive:true,filter:p=>{const rel=p.slice(source.length).replaceAll('\\','/');return !(/^\/\.env$|^\/\.git|^\/node_modules|^\/\.output|^\/dist/.test(rel));}});
for(const [from,to] of [['Index.tsx','src/pages/Index.tsx'],['Navbar.tsx','src/components/layout/Navbar.tsx']]){const out=join(target,to);mkdirSync(dirname(out),{recursive:true});cpSync(join(root,'overrides',from),out);}
const l=join(target,'src/components/layout/Layout.tsx');let s=readFileSync(l,'utf8');if(!s.includes('apple-site')){if(!s.includes('min-h-screen flex flex-col bg-background'))throw Error('Layout shell changed, inspect before patching');s=s.replace('min-h-screen flex flex-col bg-background','apple-site min-h-screen flex flex-col bg-background');writeFileSync(l,s);}
const styles=join(target,'src/styles.css');writeFileSync(styles,readFileSync(styles,'utf8')+'\n'+readFileSync(join(root,'overrides/apple-theme.css'),'utf8'));
console.log('Prepared full site with preserved routes, media, SEO and booking code.');
