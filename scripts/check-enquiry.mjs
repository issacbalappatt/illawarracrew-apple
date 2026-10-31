// Exercise the actual component's submit handler with isolated dependencies.
// Never contacts a backend or sends email.
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const require = createRequire(new URL('../.generated-site/package.json', import.meta.url));
const {build} = require('esbuild');
async function component(preview = false) {
  const result = await build({stdin: {contents:readFileSync('overrides/QuickEnquiry.tsx','utf8'),loader:'tsx',resolveDir:process.cwd()},bundle:true,write:false,format:'esm',jsx:'automatic',define:{'import.meta.env.VITE_SUPABASE_URL':JSON.stringify(preview?'https://trial-disabled.invalid':'https://test.invalid')},plugins:[{name:'test-dependencies',setup(b){
    b.onResolve({filter:/.*/}, a=>({path:a.path,namespace:'mock'}));
    b.onLoad({filter:/.*/,namespace:'mock'},a=>{
      let contents;
      if(a.path==='react') contents='export const useRef=v=>({current:v});export const useState=v=>[v,x=>globalThis.qa.states.push(x)];';
      else if(a.path==='react/jsx-runtime') contents='export const jsx=(type,props)=>({type,props});export const jsxs=jsx;';
      else if(a.path==='lucide-react') contents='export const ArrowUpRight="icon", CheckCircle2="icon";';
      else if(a.path.includes('rr-shim')) contents='export const Link="a";';
      else if(a.path.includes('supabase')) contents='export const invokeFunction=(...a)=>globalThis.qa.invoke(...a);';
      else if(a.path.includes('attribution')) contents='export const getAttribution=()=>({test:true});';
      else contents='export const newClientRequestId=()=>"test-request-id";export const recordLeadSuccess=x=>globalThis.qa.track(x);';
      return {contents,loader:'js'};
    });
  }}]});
  const mod=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
  return mod.default;
}
function find(node,type) { if(!node || typeof node!=='object') return; if(node.type===type)return node; for(const child of [node.props?.children].flat(Infinity)){const found=find(child,type);if(found)return found;} }
const OriginalFormData=globalThis.FormData;
globalThis.FormData=class{constructor(f){this.values=f.values;}get(k){return this.values[k]||'';}};
globalThis.requestAnimationFrame=f=>f();
const Component=await component();
const form={values:{name:'Test Visitor',email:'qa@example.invalid',suburb:'Figtree',service:'Deep cleaning'},reset(){this.resetCount=(this.resetCount||0)+1;}};
const event={preventDefault(){},currentTarget:form};
let calls=[];
const reset=(invoke)=>{form.resetCount=0;calls=[];globalThis.qa={states:[],invoke:async(...a)=>{calls.push(a);return invoke(...a);},track(){}};};
reset(()=>({data:{success:true,enquiryId:'saved-id'},error:null}));
await find(Component(),'form').props.onSubmit(event);
assert.deepEqual(qa.states,['sending','success']);assert.equal(form.resetCount,1);assert.equal(calls[0][0],'create-enquiry');assert.match(calls[0][1].body.message,/Figtree/);assert.equal(calls[0][1].body.service_type,'Deep cleaning');
reset(()=>({data:{success:true},error:null}));
const retry=find(Component(),'form').props.onSubmit;
await retry(event);await retry(event);
assert.equal(form.resetCount,0);assert.equal(qa.states.at(-1),'error');assert.equal(calls[0][1].body.client_request_id,calls[1][1].body.client_request_id);
reset(()=>{throw Error('offline')});await find(Component(),'form').props.onSubmit(event);assert.equal(form.resetCount,0);assert.equal(qa.states.at(-1),'error');
let release;reset(()=>new Promise(r=>release=r));const submit=find(Component(),'form').props.onSubmit;const first=submit(event);await submit(event);assert.equal(calls.length,1);release({data:{success:true,enquiryId:'id'}});await first;
reset(()=>({data:{success:true,enquiryId:'id'}}));qa.track=()=>{throw Error('analytics unavailable')};await find(Component(),'form').props.onSubmit(event);assert.equal(qa.states.at(-1),'success');
reset(()=>{throw Error('must not send')});const Preview=await component(true);await find(Preview(),'form').props.onSubmit(event);assert.equal(calls.length,0);
reset(()=>{throw Error('must not send')});form.values.website='spam';await find(Component(),'form').props.onSubmit(event);assert.equal(calls.length,0);
globalThis.FormData=OriginalFormData;
console.log('PASS: acknowledged success, payload, missing acknowledgement, offline failure, retry idempotency, duplicate-submit lock, analytics isolation, preview guard, honeypot. No live leads created.');
