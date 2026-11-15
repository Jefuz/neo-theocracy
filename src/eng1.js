/* ===================== ENGINE: state, helpers, effects, simulation ===================== */
const E={};let S=null;
const clamp=(x,a=0,b=100)=>x<a?a:x>b?b:x;
const sum=(a,f)=>{let s=0;for(const x of a)s+=f(x);return s;};
const fmt=(s,...a)=>s.replace(/\{(\d)\}/g,(m,i)=>a[i]);
const sg=n=>(n>0?'+':'')+(Math.round(n*10)/10);
E.rng=()=>{S.rs=(S.rs+0x6D2B79F5)|0;let t=S.rs;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
E.ri=(a,b)=>a+Math.floor(E.rng()*(b-a+1));
E.pick=a=>a[Math.floor(E.rng()*a.length)];
E.wpick=(a,f)=>{let t=0;const w=a.map(x=>{const v=Math.max(0,f(x));t+=v;return v;});if(t<=0)return null;let r=E.rng()*t;for(let i=0;i<a.length;i++){r-=w[i];if(r<0)return a[i];}return a[a.length-1];};
E.aff=(dim,a,b)=>a===b?1:(D[dim][a].fam===D[dim][b].fam?0.6:0.15);
E.evIdx=null;
E.evById=id=>{if(!E.evIdx){E.evIdx={};for(const e of D.ev)E.evIdx[e.id]=e;for(const e of D.tpl)E.evIdx[e.id]=e;}return E.evIdx[id];};
E.isTpl=id=>id[0]==='t'&&id[1]==='_';

E.newGame=function(seed){
 S={v:1,seed:seed,rs:seed|0,year:1,turn:0,life:1,era:1,res:{tre:25,food:45,ord:55,kno:0},leg:{cha:70,tra:30,leg:5},
  pops:[],reg:{},org:{},riv:{},law:{},lawSrc:{},tech:{},diff:0,flags:{},mem:[],causes:{},chron:[],cid:0,queue:[],used:{},cool:{},facts:[],lives:[],advs:[],pastAdvs:[],
  hist:{tre:[],food:[],ord:[],leg:[],kno:[],cleav:[]},snaps:[],log:[],rep:[],rcNow:{},rcRep:{},rcAcc:{},prevRes:null,forced:[],sing:0,falseCount:0,renown:10,peak:2,cleav:0,coh:{},
  tst:{regent:null,sign:null,proph:null,cache:0},nudge:{},claim:0,recogB:0,listen:-9,warn:-99,coupWarn:-99,lowOrd:0,junta:0,regency:0,hazard:0,childEarly:0,war:0,crownClaim:0,puppet:null,cacheHeld:0,
  regent:'priest',body:null,stage:'',cur:null,evq:[],over:null,flash:'',pendingDeath:null,
  st:{ev:{},pk:{},deaths:{},rec:[0,0],births:{},inter:[],thr:{}}};
 for(const id in D.reg){const R=D.reg[id];S.reg[id]={own:R.own,integ:R.home?100:(R.own==='p'?55:0),unrest:20,fed:0};
  for(const s of R.pops){const a=s.split(' ');S.pops.push({eth:a[0],lang:a[1],rel:a[2],cls:a[3],reg:id,size:+a[4],w:+a[5],loy:a[0]==='kr'?58:45,bel:a[2]==='ret_s'?80:(a[0]==='kr'?35:a[0]==='kh'?15:5),grv:22,fear:0});}}
 for(const id in D.org){const o=D.org[id];S.org[id]={pow:o.pow,loy:o.loy,dev:o.dev,aut:o.aut,comp:Object.assign({},o.comp),on:o.on,closed:0};}
 for(const id in D.riv){const r=D.riv[id];S.riv[id]={str:r.str,att:r.att,mem:0,dead:0};}
 for(const l in D.laws)S.law[l]=Object.keys(D.laws[l].opts)[0];
 const p=S.pops[1];S.body={eth:p.eth,lang:p.lang,rel:p.rel,cls:p.cls,reg:p.reg,age:20,born:-19,start:1,rec:1,foreign:null};
 S.cleav=E.cleavage();E.newAdvs();E.snap();
 E.chron(D.L.c_start,null);
 S.cur={kind:'cont',t:D.title,who:'',x:D.L.intro+'\n\n'+D.L.goal,q:'',ch:[{l:D.ui.start}],next:'turn'};
 return S;
};
/* ---------- queries ---------- */
E.own=()=>S.pops.filter(p=>S.reg[p.reg].own==='p');
E.nreg=()=>{let n=0;for(const id in S.reg)if(S.reg[id].own==='p')n++;return n;};
E.ntech=()=>Object.keys(S.tech).length;
E.legit=()=>{const l=S.leg,m=Math.max(l.cha,l.tra,l.leg);return clamp(0.5*m+0.25*(l.cha+l.tra+l.leg-m));};
E.match=function(p,sel){if(sel==='all')return true;for(const part of sel.split('+')){if(part==='core'){if(p.eth!==D.core)return false;}else if(part==='birth'){if(p.eth!==S.body.eth)return false;}else{const i=part.indexOf(':');if(p[part.slice(0,i)]!==part.slice(i+1))return false;}}return true;};
E.sel=sel=>sel?E.own().filter(p=>E.match(p,sel)):[];
E.grp=function(sel,own){own=own||E.own();const tot=sum(own,p=>p.size)||1;let s=0,w=0,l=0,b=0,g=0,f=0;for(const p of own)if(E.match(p,sel)){s+=p.size;w+=p.w*p.size;l+=p.loy*p.size;b+=p.bel*p.size;g+=p.grv*p.size;f+=p.fear*p.size;}
 if(s<=0)return{size:0,share:0,w:0,loy:50,bel:0,grv:0,fear:0,vis:0};return{size:s,share:s/tot,w:w/s,loy:l/s,bel:b/s,grv:g/s,fear:f/s,vis:g/s*(1-f/s/125)};};
E.partName=function(part){if(part==='all')return D.dx.all;if(part==='core')return D.eth[D.core].n;if(part==='birth')return D.eth[S.body.eth].n;const i=part.indexOf(':'),d=part.slice(0,i),v=part.slice(i+1);if(d==='reg')return D.reg[v].n;return D[d]&&D[d][v]?D[d][v].n:part;};
E.gname=sel=>sel?sel.split('+').map(E.partName).join(' '):'';
E.oname=id=>D.org[id]?D.org[id].n[S.era-1]:id;
E.dom=function(o){let e=null,m=0;for(const k in o.comp)if(o.comp[k]>m){m=o.comp[k];e=k;}return{e:e||D.core,s:m};};
E.major=function(reg,dim){const c={};let b=null,m=0;for(const p of S.pops)if(p.reg===reg){c[p[dim]]=(c[p[dim]]||0)+p.size;if(c[p[dim]]>m){m=c[p[dim]];b=p[dim];}}return b;};
E.shares=function(dim,own){own=own||E.own();const c={};let t=0;for(const p of own){c[p[dim]]=(c[p[dim]]||0)+p.size;t+=p.size;}for(const k in c)c[k]/=t||1;return c;};
E.ctrl=()=>S.junta?'army':(S.law.recog==='priest'?'priest':S.law.recog==='urn'?'council':null);
E.strongest=function(not){let b=null,m=-1;for(const id in S.org){const o=S.org[id];if(!o.on||id===not||id==='school')continue;const v=o.pow*(50+o.aut);if(v>m){m=v;b=id;}}return b;};
E.strength=()=>S.org.army.pow*(0.4+S.org.army.loy/160)+S.res.ord*0.2;
E.when=()=>fmt(D.dx.when,D.ord[S.life],S.year);
E.memSum=function(p){let v=0;for(const m of S.mem)if(E.match(p,m.sel))v+=m.v;return v;};
E.cramer=function(a,b,own){const ra={},cb={},cell={};let n=0;for(const p of own){const x=p[a],y=p[b];ra[x]=(ra[x]||0)+p.size;cb[y]=(cb[y]||0)+p.size;cell[x+'|'+y]=(cell[x+'|'+y]||0)+p.size;n+=p.size;}
 const r=Object.keys(ra).length,c=Object.keys(cb).length,k=Math.min(r,c)-1;if(k<1||n<=0)return 0;let chi=0;for(const x in ra)for(const y in cb){const e=ra[x]*cb[y]/n,o=cell[x+'|'+y]||0;chi+=(o-e)*(o-e)/e;}return Math.sqrt(chi/(n*k));};
E.cleavage=function(){const own=E.own();if(!own.length)return 0;return(E.cramer('eth','rel',own)+E.cramer('eth','cls',own)+E.cramer('eth','reg',own)+E.cramer('rel','cls',own))/4;};
E.powers=function(own){own=own||E.own();const es={};for(const p of own)es[p.eth]=(es[p.eth]||0)+p.size;const pw=new Map();let tot=0;
 for(const p of own){let v=p.size*(0.4+p.w/40)*D.cls[p.cls].pw;for(const id in S.org){const o=S.org[id];if(o.on&&o.comp[p.eth])v+=o.pow*0.25*o.comp[p.eth]*p.size/es[p.eth];}pw.set(p,v);tot+=v;}return{pw,tot:tot||1};};
E.table=function(dim){const own=E.own(),P=E.powers(own),tot=sum(own,p=>p.size)||1,rows={},truth=S.listen===S.turn;
 for(const p of own){const k=p[dim];const r=rows[k]||(rows[k]={key:dim+':'+k,name:E.partName(dim+':'+k),size:0,pow:0,w:0,loy:0,bel:0,grv:0,tg:0,fr:0,sub:{}});
  r.size+=p.size;r.pow+=P.pw.get(p);r.w+=p.w*p.size;r.loy+=clamp(p.loy+p.fear*0.3)*p.size;r.bel+=p.bel*p.size;r.grv+=p.grv*(1-p.fear/125)*p.size;r.tg+=p.grv*p.size;r.fr+=p.fear*p.size;
  for(const d2 in D.dims)if(d2!==dim){const s=r.sub[d2]||(r.sub[d2]={});s[p[d2]]=(s[p[d2]]||0)+p.size;}}
 const old=S.snaps.length?S.snaps[0]:{};const out=[];
 for(const k in rows){const r=rows[k];let hh=0,nd=0;for(const d2 in r.sub){let h=0;for(const v in r.sub[d2]){const f=r.sub[d2][v]/r.size;h+=f*f;}hh+=h;nd++;}
  r.share=r.size/tot*100;r.pow=r.pow/P.tot*100;r.w/=r.size;r.loy/=r.size;r.bel/=r.size;r.grv/=r.size;r.tg/=r.size;r.fr/=r.size;if(truth)r.grv=r.tg;
  r.coh=clamp(hh/nd*70+(dim==='eth'?(S.coh[k]||0):0)+15);r.mob=clamp((r.tg*0.6+r.coh*0.4)*(r.share>3?1:0.5));r.trend=r.pow-(old[r.key]!==undefined?old[r.key]:r.pow);out.push(r);}
 return out;};
E.snap=function(){const m={};for(const d in D.dims)for(const r of E.table(d))m[r.key]=r.pow;S.snaps.push(m);if(S.snaps.length>4)S.snaps.shift();};
/* ---------- records ---------- */
E.say=t=>{if(t)S.log.push(t);};
E.chron=function(t,parent,kind){const id=++S.cid;S.chron.push({id,y:S.year,l:S.life,t,p:parent||0,k:kind||''});return id;};
E.cause=function(key,txt,type,delta){const a=S.causes[key]||(S.causes[key]=[]);if(type){const e=a.find(x=>x.ty===type);if(e){e.y=S.year;e.l=S.life;e.d=(e.d||0)+(delta||0);e.t=txt;return;}}a.push({y:S.year,l:S.life,t:txt,ty:type||'',d:delta||0});if(a.length>8)a.shift();};
E.rc=function(res,n,why){if(!n)return;S.rcAcc[res]=(S.rcAcc[res]||0)+n;const a=S.rcNow[res]||(S.rcNow[res]=[]);const e=a.find(x=>x[0]===why);if(e)e[1]+=n;else a.push([why,n]);};
E.lawWhy=function(l){const s=S.lawSrc[l];return s?fmt(D.dx.lawWhy,D.laws[l].opts[S.law[l]].n,D.ord[s.l],s.y):fmt(D.dx.lawOld,D.laws[l].opts[S.law[l]].n);};
/* ---------- text ---------- */
E.dyn={
 kin:src=>{const d=S.year-(src?src.y:S.year);return D.dx.kin[d<20?0:d<45?1:d<75?2:3];},
 srcOrd:src=>D.ord[src?src.l:S.life],srcRootYear:src=>src?(src.ry||src.y):S.year,
 be:()=>D.eth[S.body.eth].n,bl:()=>D.lang[S.body.lang].n,bc:()=>D.cls[S.body.cls].n.toLowerCase(),brn:()=>D.reg[S.body.reg].n,age:()=>S.body.age,
 ctrl:()=>E.ctrl()?E.oname(E.ctrl()):D.dx.people,regn:()=>E.oname(S.regent),lawWhen:()=>{const s=S.lawSrc.lang;return s?fmt(D.dx.lifeYear,D.ord[s.l],s.y):D.dx.longAgo;}};
E.fill=function(t,ctx,src){if(!t)return'';ctx=ctx||{};
 t=t.replace(/\{(\w+)\}/g,(m,k)=>{if(k in ctx)return ctx[k];const f=E.dyn[k];return f?f(src,ctx):m;});
 return t.replace(/\{\?(\w+):([^|}]*)\|([^}]*)\}/g,(m,f,a,b)=>S.flags[f]?a:b);};
/* ---------- effects ---------- */
E.fx=function(s,ctx,why){if(!s)return;ctx=ctx||{};for(let st of s.split(';')){st=st.trim();if(!st)continue;if(st[0]==='?')st=st.slice(1).trim();
 st=st.replace(/\$(\w+)/g,(m,k)=>ctx[k]!==undefined?ctx[k]:m);if(st.indexOf('$')>=0)continue;E.op(st.split(/\s+/),st,ctx,why);}};
E.op=function(a,st,ctx,why){const k=a[0];
 if(k==='r'){const n=+a[2],r=a[1];if(r in S.leg)S.leg[r]=clamp(S.leg[r]+n);else S.res[r]=clamp(S.res[r]+n,r==='tre'?-40:0,r==='kno'?999:100);if(why)E.rc(r,n,why);}
 else if(k==='g'){const sel=a[1],at=a[2],n=+a[3];const ps=E.sel(sel);if(at==='size'){for(const p of ps)p.size*=1+n/100;}else for(const p of ps)p[at]=clamp(p[at]+n);if(why&&ps.length&&sel!=='all')E.cause(sel,why+': '+D.attr[at]+' '+sg(n));}
 else if(k==='o'){const o=S.org[a[1]];if(!o||!o.on)return;o[a[2]]=clamp(o[a[2]]+(+a[3]));if(why)E.cause('o:'+a[1],why+': '+D.attr[a[2]]+' '+sg(+a[3]));}
 else if(k==='c'){const o=S.org[a[1]];if(!o||!D.eth[a[2]])return;o.comp[a[2]]=(o.comp[a[2]]||0)+(+a[3])/100;E.norm(o);if(why)E.cause('o:'+a[1],why+': '+fmt(D.dx.cmore,D.eth[a[2]].n));}
 else if(k==='m'){const sel=a[1],n=+a[2],perm=a[3]==='p',txt=a.slice(4).join(' ');if(!E.sel(sel).length)return;S.mem.push({sel,v:n,v0:n,p:perm?1:0,t:txt,l:S.life,y:S.year,cid:ctx._cid||0});for(const p of E.sel(sel)){p.loy=clamp(p.loy+n*0.4);p.grv=clamp(p.grv-n*0.5);}E.cause(sel,(why||'')+': '+txt);}
 else if(k==='v'){const v=S.riv[a[1]];if(!v)return;if(a[2]==='att'){v.att=clamp(v.att+(+a[3]));v.mem=clamp(v.mem+(+a[3])*0.35,-30,30);}else v.str=clamp(v.str+(+a[3]),5,95);}
 else if(k==='law'){E.setLaw(a[1],a[2],false,ctx._cid,why,true);}
 else if(k==='reg'){const R=S.reg[a[1]];if(!R||R.own!=='p')return;R[a[2]]=clamp(R[a[2]]+(+a[3]));if(why)E.cause('reg:'+a[1],why+': '+D.attr[a[2]]+' '+sg(+a[3]));}
 else if(k==='fed'){const R=S.reg[a[1]];if(R&&R.own==='p'){R.fed=+a[2];if(why)E.cause('reg:'+a[1],why+': '+(R.fed?D.dx.fed1:D.dx.fed0));}}
 else if(k==='x')E.special(a,ctx,why);
};
E.norm=function(o){let t=0;for(const e in o.comp){if(o.comp[e]<0.004)delete o.comp[e];else t+=o.comp[e];}for(const e in o.comp)o.comp[e]/=t||1;};
E.special=function(a,ctx,why){const k=a[1],v=a[2];
 if(k==='recog')S.recogB+=+v;else if(k==='claim')S.claim+=+v;else if(k==='renown')S.renown=clamp(S.renown+(+v));
 else if(k==='regent'){S.tst.regent=v;S.facts=S.facts.filter(f=>f.k!=='regent');S.facts.push({k:'regent',l:S.life,q:D.test.regent,a:E.oname(v),w:['army','priest','council','noble','merch'].filter(x=>x!==v).map(E.oname)});}
 else if(k==='cohere'){const e=ctx.e||(ctx.g&&ctx.g.indexOf('eth:')===0?ctx.g.slice(4):null);if(e)S.coh[e]=(S.coh[e]||0)+10;else for(const x in D.eth)if(x!==D.core)S.coh[x]=(S.coh[x]||0)+5;}
 else if(k==='open'){const o=S.org[v];if(!o||!o.on)return;const sh=E.shares('eth');for(const e in o.comp)o.comp[e]*=0.65;for(const e in sh)o.comp[e]=(o.comp[e]||0)+0.35*sh[e];E.norm(o);o.closed=0;E.cause('o:'+v,(why||'')+': '+D.dx.opened);}
 else if(k==='close'){const o=S.org[v];if(o&&o.on){o.closed=1;E.cause('o:'+v,(why||'')+': '+D.dx.closed);}}
 else if(k==='sing')S.sing=Math.max(0,S.sing+(+v));
 else if(k==='heal'){const m=ctx.mem!==undefined?S.mem[ctx.mem]:null;if(m){m.v*=(1-(+v)*0.7);m.v0*=(1-(+v)*0.5);}}
 else if(k==='assim'){for(const p of E.own().filter(p=>p.eth===v&&p.lang==='kal'))E.move(p,{eth:D.core},p.size*0.5);E.merge();}
 else if(k==='nudge'){S.nudge[v]=(S.nudge[v]||0)+1;}
 else if(k==='mix'||k==='settle'){const R=S.reg[v];if(!R)return;if(k==='settle'){const src=E.own().find(p=>p.reg===D.home&&p.cls==='warrior');if(src)E.move(src,{reg:v,cls:'farmer'},Math.min(3,src.size*0.3));}}
 else if(k==='keep'){const l=v.split(':')[1];S.keep=S.keep||{};S.keep[l]=S.turn+8;}
 else if(k==='secede')E.secede(v);
 else if(k==='hazard')S.hazard+=+v;
 else if(k==='count')S.flags.counted=1;
 else if(k==='addpop'){const q={eth:a[3],lang:a[4],rel:a[5],cls:a[6],reg:v,size:0.01,w:25,loy:55,bel:10,grv:20,fear:0};S.pops.push(q);q.size=+a[7];}
 else if(k==='child'){if(v==='early'){S.recogB+=8;S.childEarly=2;S.regency=1;}else if(v==='hidden')S.hiddenExtra=1;else if(v==='patron'&&ctx.pat){const o=S.org[ctx.pat];S.recogB+=(o.loy-45)*0.3;o.aut=clamp(o.aut+5);o.pow=clamp(o.pow+3);}}
 else if(k==='learnkal'){S.body.lang='kal';}
 else if(k==='iexpand'){const t=E.targets().filter(r=>S.reg[r].own==='free');if(t.length&&E.rng()<0.5){E.annex(t[0],false,false);}}
};
E.lawOk=(l,o)=>{const r=D.laws[l].opts[o].req;return !r||S.tech[r];};
E.setLaw=function(l,o,byPlayer,parent,why,fromEvent){if(!D.laws[l]||!D.laws[l].opts[o]||S.law[l]===o)return;if(!E.lawOk(l,o)&&!fromEvent)return;
 const old=S.law[l];S.law[l]=o;const tx=fmt(D.L.c_law,D.laws[l].n,D.laws[l].opts[o].n);const cid=parent||E.chron(tx,null,'law');
 S.lawSrc[l]={cid,l:S.life,y:S.year};E.fx(D.laws[l].opts[o].fx,{_cid:cid},tx);
 if(byPlayer||fromEvent){S.facts.push({k:'law',l:S.life,q:fmt(D.test.law,D.ord[S.life],D.laws[l].n.toLowerCase()),a:D.laws[l].opts[o].n,w:Object.keys(D.laws[l].opts).filter(x=>x!==o).map(x=>D.laws[l].opts[x].n).concat(E.pick(Object.values(D.laws[l==='lang'?'rel':'lang'].opts)).n)});}
 if(byPlayer)E.fx('r tra -3',{},tx);
};
E.getTech=function(t,byPlayer,diffused){S.tech[t]=1;const T=D.tech[t];if(byPlayer)S.res.kno-=T.k;E.fx(T.fx,{},T.n);if(t==='schools'){S.org.school.on=1;S.org.school.comp=Object.assign({},S.org.council.comp);}
 const tx=fmt(diffused?D.L.techDiff:D.L.techGot,T.n);E.say(tx);E.chron(tx,null,'tech');};
E.nextTechs=()=>Object.keys(D.tech).filter(t=>!S.tech[t]&&D.tech[t].era<=S.era);
/* ---------- pops ---------- */
E.move=function(p,chg,amt){amt=Math.min(amt,p.size*0.9);if(!(amt>0.01))return;const t=Object.assign({},p,chg);
 let q=S.pops.find(x=>x.eth===t.eth&&x.lang===t.lang&&x.rel===t.rel&&x.cls===t.cls&&x.reg===t.reg);
 if(!q){q=Object.assign({},t,{size:0});S.pops.push(q);}const f=amt/(q.size+amt);for(const k of['w','loy','bel','grv','fear'])q[k]=q[k]*(1-f)+p[k]*f;q.size+=amt;p.size-=amt;};
E.merge=function(){for(let i=S.pops.length-1;i>=0;i--){const p=S.pops[i];if(p.size<0.3){let q=null,m=0;for(const x of S.pops)if(x!==p&&x.reg===p.reg&&x.size>m&&(x.eth===p.eth)){m=x.size;q=x;}
  if(!q)for(const x of S.pops)if(x!==p&&x.reg===p.reg&&x.size>m){m=x.size;q=x;}if(q)q.size+=p.size;S.pops.splice(i,1);}}};
E.elig=function(id,p){const L=S.law,ae=E.aff('eth',p.eth,D.core),c=p.cls;
 if(id==='army'){let w={warrior:3,herder:1.2,farmer:.8,noble:1,artisan:.5,bonded:.2,merchant:.1}[c];if(L.rec==='core')w*=ae*ae;else if(L.rec==='merc')w*=(c==='warrior'?2:.5)*(p.eth==='sv'||p.eth==='kh'||p.eth==='is'?2.5:.6);return w;}
 if(id==='council'||id==='school'){let w=(id==='council'?{noble:4,merchant:2,artisan:.6,warrior:.5,farmer:.15,herder:.1,bonded:0}:{noble:2,merchant:2.5,artisan:1.2,warrior:.3,farmer:.2,herder:.1,bonded:0})[c];
  if(L.lang==='kaldic')w*=p.lang==='kal'?1:p.lang==='hkal'?.35:.03;else if(L.lang==='custom')w*=(L.cit==='kin'?ae*.7+.3:1);return w;}
 if(id==='priest'){const f=D.rel[p.rel].fam==='ret';return f?(p.rel==='ret_k'?1.5:1)*(c==='bonded'?.3:1):(p.rel==='anc'?.08:.01);}
 if(id==='merch')return({merchant:4,artisan:1}[c]||0)*p.w/30;
 if(id==='noble')return c==='noble'?p.w/50:0;return 0;};
/* ---------- one season (five years) ---------- */
E.sim=function(mode){
 const r0=Object.assign({},S.res,S.leg),acc0=Object.assign({},S.rcAcc);
 S.year+=5;S.turn++;if(S.body&&mode!=='inter')S.body.age+=5;
 let own=E.own();const tot=sum(own,p=>p.size)||1,L=S.law,core=D.core;
 const cle=S.cleav=E.cleavage(),es=E.shares('eth',own),famine=S.res.food<=5,legit=E.legit();
 if(famine){E.say(D.L.famine);S.st.thr.famine=1;}
 for(const p of own){const R=S.reg[p.reg],home=D.reg[p.reg].home,ae=E.aff('eth',p.eth,core),al=E.aff('lang',p.lang,'kal'),ret=D.rel[p.rel].fam==='ret',ms=E.memSum(p);
  let g=20;
  if(L.cit==='kin')g+=10*(1-ae);
  if(L.lang==='kaldic')g+=al===1?0:al>0.5?4:9;
  if(L.rel==='cult'){if(!ret)g+=11;else if(p.rel==='ret_s')g+=5;}else if(L.rel==='sync'&&!ret)g+=3;
  if(L.land==='estates'){if(p.cls==='farmer'||p.cls==='bonded')g+=10;if(p.cls==='noble')g-=10;}else if(L.land==='free'){if(p.cls==='farmer')g-=6;if(p.cls==='noble')g+=10;}
  if(L.tax==='head'&&p.w<25)g+=8;if(L.tax==='tariff'&&p.cls==='merchant')g+=8;if(L.tax==='kind'&&(p.cls==='farmer'||p.cls==='herder'))g+=4;
  if(!home){const d=(55-R.integ)*0.3;if(d>0)g+=(R.fed||L.gov==='federal')?d*0.4:d;}
  if(L.gov==='federal'&&home&&p.cls==='noble')g+=4;
  if(famine)g+=18;else if(S.res.food<20)g+=6;
  if(S.res.ord<30)g+=5;
  if(S.era===4&&p.cls==='artisan')g+=6;
  g-=p.w*0.1;g-=ms*0.35;g+=(S.coh[p.eth]||0)*0.25;
  const rep=((S.org.council.comp[p.eth]||0)+(S.org.army.comp[p.eth]||0))/2/(es[p.eth]||.01);
  if(rep<0.5&&es[p.eth]>0.05)g+=8*(1-rep*2);
  g=20+(g-20)*(0.75+0.6*cle);
  p.grv+=(clamp(g)-p.grv)*0.25;
  const lt=54-p.grv*0.45+ms*0.3+(legit-50)*0.2+(rep>1?4:0)+(mode==='rule'&&p.eth===S.body.eth?4:0);
  p.loy+=(clamp(lt)-p.loy)*0.2;
  let bt=ret?62+S.leg.cha*0.3:8+S.leg.cha*0.15+ae*12+(L.rel==='sync'?8:0);if(D.rel[p.rel].fam==='lamp')bt=Math.min(bt,22);if(S.flags.universal)bt+=5;
  p.bel+=(clamp(bt)-p.bel)*0.12;p.fear*=0.7;
  let wt=D.cls[p.cls].tw;if(p.cls==='noble'&&L.land==='estates')wt+=15;if(p.cls==='farmer')wt+=L.land==='free'?8:L.land==='estates'?-6:0;if(p.cls==='merchant')wt+=(S.tech.coinage?10:0)-(L.tax==='tariff'?10:0);if(p.cls==='artisan'&&S.tech.steam)wt+=6;if(!home&&R.integ<40)wt-=3;
  p.w+=(wt-p.w)*0.1;
  let gr=D.cls[p.cls].gr*(famine?-1.5:S.res.food<20?0.3:1);if(S.tech.irrigation&&p.cls==='farmer')gr+=0.01;p.size*=1+gr;
 }
 /* slow shifts: tongue, faith, people, class, place */
 for(const p of own.slice()){if(p.size<0.5)continue;const R=S.reg[p.reg],ae=E.aff('eth',p.eth,core),nat=1-(S.coh[p.eth]||0)/100;
  const maj=E.major(p.reg,'lang'),tl=L.lang==='kaldic'?'kal':maj;
  if(p.lang!==tl&&!(S.keep&&S.keep[p.lang]>S.turn)){let rt=0.012*(S.tech.schools?2:1)*(S.tech.press?1.3:1)*(1-p.grv/100)*(E.aff('lang',p.lang,tl)>0.5?1.6:1)*nat;
   if(L.lang==='kaldic')rt*=(L.cit==='oath'||ae>=0.6)?3.4:0.3;else if(L.lang==='multi')rt*=0.4;else rt*=0.6;if(R.fed||L.gov==='federal')rt*=0.6;
   if(rt>0.002){const amt=p.size*rt;E.move(p,{lang:tl},amt);E.cause('lang:'+p.lang,fmt(D.dx.shift,D.lang[tl].n)+' ('+E.lawWhy('lang')+')','ls',-amt);E.cause('lang:'+tl,fmt(D.dx.gain,D.lang[p.lang].n)+' ('+E.lawWhy('lang')+')','lg',amt);}}
  const ret=D.rel[p.rel].fam==='ret';
  if(!ret){let tr,rr;if(L.rel==='cult'){tr='ret_k';rr=0.035*(1-p.grv/120);}else if(L.rel==='sync'){tr='ret_s';rr=0.012*(1-p.grv/100);}else{tr=E.major(p.reg,'rel');rr=0.004+(D.rel[tr].fam==='ret'?p.bel/100*0.012:0);}
   rr*=nat;if(D.rel[p.rel].fam==='lamp')rr*=0.6;if(tr!==p.rel&&rr>0.001){const amt=p.size*rr;E.move(p,{rel:tr},amt);E.cause('rel:'+p.rel,fmt(D.dx.conv,D.rel[tr].n)+' ('+E.lawWhy('rel')+')','cv',-amt);}}
  else{if(p.rel==='ret_s'&&(S.org.priest.pow>40||L.rel==='cult'))E.move(p,{rel:'ret_k'},p.size*0.015);else if(p.rel==='ret_k'&&S.leg.cha>65&&S.org.priest.aut>40)E.move(p,{rel:'ret_s'},p.size*0.012);}
  if(p.eth!==core&&p.lang==='kal'&&ret){let rt=(ae>=0.6?0.012:0.008)*(L.cit==='oath'?1.8:1)*(1-p.grv/100)*nat;const amt=p.size*rt;E.move(p,{eth:core},amt);E.cause('eth:'+p.eth,D.dx.assim+' ('+E.lawWhy('cit')+')','as',-amt);}
  if(S.era>=3&&(p.cls==='farmer'||p.cls==='bonded'||p.cls==='herder'))E.move(p,{cls:'artisan'},p.size*(S.era===4?0.03:0.008)*(S.tech.steam?1.5:1));
  if(S.tech.roads&&!D.reg[p.reg].home&&p.w<20&&R.integ>40)E.move(p,{reg:D.home},p.size*0.006);
 }
 E.merge();own=E.own();
 /* organizations */
 for(const id in S.org){const o=S.org[id];if(!o.on)continue;const tg={};let ts=0;
  for(const p of own){const w=p.size*E.elig(id,p);if(w>0){tg[p.eth]=(tg[p.eth]||0)+w;ts+=w;}}
  if(id==='army'&&L.rec==='merc'){tg.sv=(tg.sv||0)+ts*0.3;ts*=1.3;}
  if(ts>0){const k=o.closed?0.04:0.14;for(const e in o.comp)o.comp[e]*=1-k;for(const e in tg)o.comp[e]=(o.comp[e]||0)+k*tg[e]/ts;E.norm(o);}
  const de=E.dom(o),gl=E.grp('eth:'+de.e,own);
  const lt=(gl.size?gl.loy:45)*0.45+28+(S.leg.cha-50)*(id==='priest'?0.25:0.06)-o.aut*0.18+(mode==='rule'?4:0)+(id==='priest'?(L.rel==='cult'?7:L.rel==='tol'?0:-3)+(E.grp('rel:ret_k',own).share+E.grp('rel:ret_s',own).share)*10:0);
  o.loy+=(clamp(lt)-o.loy)*0.1;
  const dt=id==='priest'?85-o.aut*0.7:38+sum(own,p=>p.bel*p.size)/tot*0.35-o.aut*0.3;o.dev+=(clamp(dt)-o.dev)*0.08;
  if(mode==='rule')o.aut=clamp(o.aut-0.6);
  let base=D.org[id].base+(S.era-1)*4;if(id==='priest')base+=L.rel==='cult'?12:L.rel==='sync'?-3:0;if(id==='noble')base+=L.land==='estates'?10:L.land==='free'?-10:0;if(id==='merch')base+=(S.tech.coinage?8:0)+(S.tech.steam?12:0);if(id==='council')base+=(S.tech.writing?6:0)+(L.gov==='direct'?4:-4);if(id==='army')base+=(S.tech.iron?6:0)+(L.rec==='all'?6:L.rec==='merc'?10:0);
  o.pow+=(clamp(base)-o.pow)*0.06;
  const d2=E.dom(o);if(d2.s>=0.7&&(es[d2.e]||0)<d2.s-0.2&&!S.st['om_'+id+d2.e]){S.st['om_'+id+d2.e]=1;E.say(E.know()>=3?fmt(D.L.orgMile,E.oname(id),Math.round(d2.s*100),D.eth[d2.e].n):fmt(D.kw.orgMile,E.oname(id),D.eth[d2.e].n));}
 }
 /* regions */
 let avgU=0,nr=0;
 for(const id in S.reg){const R=S.reg[id];if(R.own!=='p')continue;const ps=own.filter(p=>p.reg===id),sz=sum(ps,p=>p.size)||1,ag=sum(ps,p=>p.grv*p.size)/sz;
  R.unrest+=(ag-R.unrest)*0.5;avgU+=sum(ps,p=>p.grv*(1-p.fear/125)*p.size)/sz;nr++;
  if(!D.reg[id].home){const me=E.major(id,'eth'),kal=sum(ps,p=>p.lang==='kal'?p.size:0)/sz;let di=0.5+E.aff('eth',me,core)*1.2+(S.tech.roads?0.8:0)+(L.cit==='oath'?0.8:0)+(L.lang==='multi'?0.5:0)+kal*2+((R.fed||L.gov==='federal')?-0.3:0.3);if(ag>50)di-=(ag-50)*0.08;R.integ=clamp(R.integ+di);}}
 avgU/=nr||1;
 /* economy */
 let fedN=0;for(const id in S.reg)if(S.reg[id].own==='p'&&(S.reg[id].fed||L.gov==='federal')&&!D.reg[id].home)fedN++;
 const inc=1.5+nr*1.3+(L.tax==='head'?2.5:0)+(L.tax==='tariff'?(S.tech.coinage?4:2):0)+(S.tech.coinage?1.5:0)+S.org.council.pow*0.04-S.org.army.pow*0.085-(S.org.priest.aut+S.org.council.aut+S.org.noble.aut)*0.012-fedN*0.6-(L.lang==='multi'?0.8:0)-(L.rec==='merc'?1.5:0);
 S.res.tre=clamp(S.res.tre+inc,-40,100);
 S.res.food=clamp(S.res.food+2+(S.tech.irrigation?3:0)+(L.land==='free'?1:L.land==='estates'?2:0)+E.ri(-9,7)-(E.rng()<0.07?12:0)-S.era*0.7-nr*0.3+(46-S.res.food)*0.06);
 const ot=60-avgU*0.5+S.org.army.pow*S.org.army.loy/100*0.22+(legit-50)*0.2-Math.max(0,nr-3)*1.5+(S.tech.roads?3:0);
 S.res.ord=clamp(S.res.ord+(clamp(ot)-S.res.ord)*0.3);
 if(mode==='rule')S.leg.cha+=(clamp(35+S.renown*0.3)-S.leg.cha)*0.08;else S.leg.cha=clamp(S.leg.cha-5);
 S.leg.tra=clamp(S.leg.tra+(S.leg.tra<75?0.8:0));
 S.leg.leg+=(clamp(S.org.council.pow*0.5+(S.tech.writing?10:0)+(S.tech.schools?8:0)+(S.tech.press?5:0)+(L.gov==='federal'?5:0))-S.leg.leg)*0.1;
 S.res.kno+=1+E.ntech()*0.4+(S.tech.schools?2:0)+(S.tech.press?2:0)+S.org.merch.pow*0.02;
 /* memory */
 for(const m of S.mem){if(m.p){const fl=Math.abs(m.v0)*0.5;m.v=Math.sign(m.v0)*Math.max(fl,Math.abs(m.v)*0.96);}else m.v*=0.85;}
 S.mem=S.mem.filter(m=>Math.abs(m.v)>=1.5||m.p);
 for(const e in S.coh)S.coh[e]*=0.97;
 /* crafts, ages, the Waking */
 S.diff+=1+S.era*0.3;if(S.diff>=20){const ts=E.nextTechs();if(ts.length){E.getTech(ts[0],false,true);}S.diff=0;}
 const nt=E.ntech(),ne=nt>=8?4:(nt>=5&&(nr>=3||nt>=6))?3:nt>=2?2:1;
 if(ne>S.era){S.era=ne;const tx=fmt(D.L.era,D.eras[ne]);E.say(tx);E.chron(tx,null,'era');}
 if(S.era===4)S.sing+=5+Math.min(4,S.res.kno*0.02);
 E.rivals(mode);
 /* thresholds */
 for(const id in S.reg){const R=S.reg[id];if(R.own!=='p'||D.reg[id].home)continue;
  if(R.integ<40&&R.unrest>48){const kin=D.riv[Object.keys(D.riv).find(v=>D.riv[v].kin===E.major(id,'eth'))||''];
   const fr=sum(own.filter(p=>p.reg===id),p=>p.fear*p.size)/(sum(own.filter(p=>p.reg===id),p=>p.size)||1);const risk=(R.unrest-42)/100*(1-R.integ/55)*0.8*Math.max(0.2,1-fr/60)*(1+(mode!=='rule'?0.6:0)+(S.res.ord<40?0.6:0)+(kin?0.4:0)+(R.fed?0.3:0));
   if(E.rng()<risk){S.st.thr.secede=1;if(mode==='rule'){if(!(S.cool.t_secede>S.turn)&&!S.forced.some(f=>f.id==='t_secede')){const me=E.major(id,'eth');S.forced.push({id:'t_secede',ctx:{r:id,rn:D.reg[id].n,g:'eth:'+me+'+reg:'+id,gn:D.eth[me].n,e:me}});}}else E.secede(id);}}}
 const cs=E.cascade();
 if(cs.pot>0.25&&cs.m<0.2&&mode==='rule')E.say(D.L.whisper);
 if(cs.m>=0.3){S.st.thr.riot=1;if(mode==='rule'){if(cs.m>=0.5&&S.turn-S.warn<=6&&S.turn-S.warn>=1){E.end('revolution');return;}
   if(!(S.cool.t_riot>S.turn)){const t=E.table('eth').sort((a,b)=>b.tg*b.share-a.tg*a.share)[0];S.forced.push({id:'t_riot',ctx:{g:t.key,gn:t.name}});}S.warn=S.turn;}
  else if(cs.m>=0.5)E.interRevolt();else{const t=E.table('eth').sort((a,b)=>b.tg-a.tg)[0];if(t&&E.rng()<0.5){E.say(fmt(D.L.revoltDown,t.name));E.fx('g '+t.key+' fear 35; m '+t.key+' -14 p '+D.dx.massacre,{},D.dx.regency);}}}
 const o=S.org.army,cr=(o.pow/100)*Math.max(0,48-o.loy)/48*0.7+(o.aut>65?0.04:0);
 if(cr>0.035){S.st.thr.coup=1;if(mode==='rule'){E.say(D.L.officers);if(S.turn-S.coupWarn<=8&&S.turn-S.coupWarn>=1&&E.rng()<Math.min(0.6,cr*5)){S.pendingDeath='coup';}else if(!(S.cool.t_coupwarn>S.turn))S.forced.push({id:'t_coupwarn',ctx:{}});if(S.turn-S.coupWarn>8)S.coupWarn=S.turn;}
  else if(!S.junta&&S.regent!=='army'&&E.rng()<cr){S.regent='army';S.junta=1;E.say(D.L.coupI);E.chron(D.L.coupI,null,'coup');}}
 if(S.res.tre<0&&mode==='rule'&&!(S.cool.t_debt>S.turn)){S.st.thr.debt=1;S.forced.push({id:'t_debt',ctx:{}});}
 if(S.res.tre<-20&&mode!=='rule'){S.res.tre+=12;S.org.merch.aut=clamp(S.org.merch.aut+6);S.org.merch.pow=clamp(S.org.merch.pow+4);}
 if(famine){for(const p of own)p.size*=0.97;if(mode==='rule'&&!(S.cool.t_famine>S.turn))S.forced.push({id:'t_famine',ctx:{}});}
 if(S.res.ord<=3){S.lowOrd++;if(S.lowOrd>=2){if(mode==='rule'){E.end('collapse');return;}E.say(D.L.collapseI);for(const id in S.reg)if(S.reg[id].own==='p'&&!D.reg[id].home&&S.reg[id].integ<70)E.secede(id);S.res.ord=30;S.lowOrd=0;}}else S.lowOrd=0;
 const n2=E.nreg();if(n2>S.peak)S.peak=n2;if(S.over)return;
 if(S.peak>=4&&n2<=1){E.end('secession');return;}
 /* history */
 const H=S.hist;H.tre.push(S.res.tre);H.food.push(S.res.food);H.ord.push(S.res.ord);H.leg.push(E.legit());H.kno.push(S.res.kno);H.cleav.push(S.cleav*100);for(const k in H)if(H[k].length>80)H[k].shift();
 E.snap();
 const kal=E.grp('lang:kal').share;const km=Math.floor(kal*10);if(S.st.kalM!==undefined&&km!==S.st.kalM&&nr>1&&E.know()>=3)E.say(fmt(D.L.langMile,D.lang.kal.n,Math.round(kal*100)));S.st.kalM=km;
 for(const r in r0){const now=(r in S.leg)?S.leg[r]:S.res[r];const d=(now-r0[r])-((S.rcAcc[r]||0)-(acc0[r]||0));if(Math.abs(d)>=0.5){const a=S.rcNow[r]||(S.rcNow[r]=[]);a.push([D.dx.season,d]);}}
 if(S.era===4&&S.sing>=100){E.endSing();}
};
E.cascade=function(){const own=E.own(),tot=sum(own,p=>p.size)||1,T0=70-(S.cleav||0)*8+(S.res.ord-50)*0.15;let m=0;
 for(let it=0;it<6;it++){const T=T0-50*m;let s=0;for(const p of own)if(p.grv-p.fear*0.45>T)s+=p.size;const nm=s/tot;if(nm<=m+0.001)break;m=nm;}
 let pot=0;for(const p of own)if(p.grv>T0-12)pot+=p.size;return{m,pot:pot/tot};};
E.hazards=function(){const a=S.body.age,h={};h.age=a<40?0:(a-40)*0.006+(a>=60?(a-55)*0.02:0);h.ill=0.02+(S.res.food<=5?0.03:0);
 let k=0;for(const id in S.org){const o=S.org[id];if(o.on&&o.loy<38)k+=(38-o.loy)/100*(o.pow/100)*1.1;}k+=E.cascade().m*0.08+S.hazard*0.04+(S.childEarly>0?0.03:0);
 h.kill=Math.min(k,0.25);h.acc=0.008;h.war=S.war?0.05:0;return h;};
/* ---------- rivals ---------- */
E.borderReg=function(pref){let b=null,m=999;for(const id in S.reg){const R=S.reg[id];if(R.own!=='p'||D.reg[id].home)continue;let v=R.integ;if(pref&&E.major(id,'eth')===pref)v-=60;if(v<m){m=v;b=id;}}return b;};
E.rivals=function(mode){const st=E.strength(),L=S.law;
 for(const id in S.riv){const v=S.riv[id],d=D.riv[id];if(v.dead)continue;
  v.str=clamp(v.str+E.ri(-2,2)+(v.str<d.str?0.6:-0.2),10,95);
  const kin=E.grp('eth:'+d.kin);if(kin.size>0&&kin.grv>48){v.att-=2;if(mode==='rule'&&E.rng()<0.12)E.say(fmt(D.L.champ,d.n,D.eth[d.kin].n));}
  v.att+=(50+v.mem-v.att)*0.05;
  if(d.ag==='raider'){if(st<v.str*0.7){if(v.att<55&&E.rng()<0.4){const r=E.borderReg()||D.home;E.say(fmt(D.L.raid,D.reg[r].n));E.fx('r food -5; r tre -3; reg '+r+' unrest 6',{},fmt(D.L.raid,D.reg[r].n));}if(v.att<25&&E.rng()<0.15)E.seize(id);}else v.att+=1.5;}
  else if(d.ag==='trader'){v.att+=L.tax==='tariff'?-2:0.8;if(v.att<28&&E.rng()<0.5){E.say(D.L.embargo);E.fx('r tre -4',{},D.L.embargo);}if(v.att>70&&E.rng()<0.4){E.say(D.L.boon);E.fx('r tre 3; r kno 1',{},D.L.boon);}}
  else if(d.ag==='hegemon'){const lamp=E.grp('rel:lamp');if(lamp.size>0){if(L.rel==='cult')v.att-=2;if(lamp.grv>45)v.att-=1.5;}if(v.att<30&&st<v.str&&E.rng()<(mode==='rule'?0.1:0.22))E.seize(id,'im');S.crownClaim=v.att<38?1:0;}
  else if(d.ag==='warden'){if(S.reg.tw.own==='p')v.att-=3;if(v.att<28&&E.rng()<0.4){const r=E.borderReg('tu');if(r){E.say(D.L.shelter);S.reg[r].unrest=clamp(S.reg[r].unrest+6);}}}
  v.att=clamp(v.att);}};
E.seize=function(rid,pref){const r=E.borderReg(pref||D.riv[rid].kin);
 if(!r){const v=S.riv[rid];if(E.nreg()===1&&E.strength()<v.str*0.5&&v.att<15){E.end('conquest');}return;}
 S.reg[r].own=rid;S.reg[r].fed=0;const tx=fmt(D.L.seize,D.riv[rid].n,D.reg[r].n);E.say(tx);E.chron(tx,null,'loss');S.res.ord=clamp(S.res.ord-5);S.leg.tra=clamp(S.leg.tra-3);};
E.secede=function(r){const R=S.reg[r];if(!R||R.own!=='p'||D.reg[r].home)return;const me=E.major(r,'eth');let to='free',why=D.dx.secFree;
 for(const v in D.riv)if(D.riv[v].kin===me&&!S.riv[v].dead&&S.riv[v].att<50){to=v;why=fmt(D.dx.secKin,D.riv[v].n);}
 R.own=to;R.fed=0;const src=S.mem.filter(m=>m.v<0&&m.sel.indexOf(me)>=0).sort((a,b)=>a.v-b.v)[0];
 const tx=fmt(D.L.secede,D.reg[r].n,why)+(src?' '+fmt(D.dx.rooted,src.t,D.ord[src.l],src.y):'');E.say(tx);E.chron(tx,src?src.cid:null,'loss');S.res.ord=clamp(S.res.ord-4);S.leg.tra=clamp(S.leg.tra-4);};
E.targets=function(){const n=E.nreg(),out=[];for(const id in S.reg){const R=S.reg[id],d=D.reg[id];if(R.own==='p')continue;if(d.tier===1||(d.tier===2&&n>=3)||(d.tier===3&&n>=5))out.push(id);}return out;};
E.marchP=function(id){const R=S.reg[id],d=D.reg[id];const def=R.own==='free'?22+d.tier*6:S.riv[R.own].str*(d.heart?1:0.75);return clamp(0.35+(E.strength()-def)/90,0.08,0.92);};
E.annex=function(id,byForce,byPlayer,cid){const R=S.reg[id],d=D.reg[id],me=E.major(id,'eth'),prev=R.own;R.own='p';R.integ=clamp(8+40*(E.aff('eth',me,D.core)===1?1:E.aff('eth',me,D.core)===0.6?0.6:0.15)+(byForce?0:14));R.unrest=byForce?45:25;R.fed=byForce?0:1;
 for(const p of S.pops)if(p.reg===id){p.loy=byForce?35:48;p.grv=byForce?48:28;p.fear=byForce?25:0;p.bel=Math.min(p.bel,15);}
 const tx=fmt(D.L.annex,d.n);E.say(tx);const c=cid||E.chron(tx,null,'gain');
 if(byForce){S.mem.push({sel:'reg:'+id,v:-14,v0:-14,p:d.heart?1:0,t:fmt(D.dx.conq,d.n),l:S.life,y:S.year,cid:c});if(prev!=='free'&&S.riv[prev]){S.riv[prev].att=clamp(S.riv[prev].att-20);S.riv[prev].mem-=10;if(d.heart)S.riv[prev].dead=1;}}
 else S.mem.push({sel:'reg:'+id,v:10,v0:10,p:1,t:fmt(D.dx.pact,d.n),l:S.life,y:S.year,cid:c});
 const n=E.nreg();if(n>S.peak)S.peak=n;S.cleav=E.cleavage();};
E.interRevolt=function(){const rg=S.regent;E.say(fmt(D.L.revoltUp,E.oname(rg)));E.chron(fmt(D.L.revoltUp,E.oname(rg)),null,'revolt');const o=S.org[rg];o.pow=clamp(o.pow-15);o.aut=clamp(o.aut-25);
 for(const p of E.own()){p.grv=clamp(p.grv-18);p.fear=0;}S.res.ord=clamp(S.res.ord-15);S.leg.cha=clamp(S.leg.cha+10);S.leg.leg=clamp(S.leg.leg-8);S.regent=E.strongest(rg)||rg;S.junta=0;};
E.end=function(type){if(S.over)return;const d=D.end[type];S.over={type,win:d.win,year:S.year,life:S.life};S.over.score=E.score();E.chron(d.n,null,'end');
 S.cur={kind:'end',t:d.n,who:'',x:d.x,q:'',ch:[]};};
E.endSing=function(){if(S.over)return;const own=E.own(),tot=sum(own,p=>p.size)||1,ab=sum(own,p=>p.bel*p.size)/tot,ag=sum(own,p=>p.grv*p.size)/tot,n=E.nreg();
 const es=E.shares('eth',own),ls=E.shares('lang',own),big=Object.keys(es).filter(e=>es[e]>=0.08),top=Math.max(...Object.values(es)),topL=Math.max(...Object.values(ls));
 const recOK=S.body&&S.body.rec&&(S.lives.length<1||S.lives[S.lives.length-1].rec),pr=S.org.priest,c=[];
 if(pr.loy>=50&&pr.dev>=45&&ab>=50&&recOK)c.push(['axis',pr.loy+ab]);
 if(S.leg.leg>=62&&ag<=29&&n>=4&&S.res.ord>=52)c.push(['common',S.leg.leg+100-ag]);
 if(big.length>=3&&top<=0.62&&big.every(e=>E.grp('eth:'+e,own).loy>=47)&&n>=5&&ag<=38)c.push(['many',150-ag]);
 if(top>=0.68&&topL>=0.78&&ag<=36&&n>=3)c.push(['one',top*100+topL*60]);
 c.sort((a,b)=>b[1]-a[1]);S.sum={ab,ag,n,top,topL,big:big.length};E.end(c.length?c[0][0]:'survivor');};
E.score=function(){const own=E.own(),tot=sum(own,p=>p.size)||1,ag=sum(own,p=>p.grv*p.size)/tot;const b=[];
 b.push([D.dx.sc[0],E.nreg()*10]);b.push([D.dx.sc[1],Math.round(tot/5)]);b.push([D.dx.sc[2],Math.round(E.legit())]);b.push([D.dx.sc[3],S.lives.filter(l=>l.rec).length*15+(S.body&&S.body.rec?15:0)]);
 b.push([D.dx.sc[4],Math.round(100-ag)]);b.push([D.dx.sc[5],E.ntech()*5]);b.push([D.dx.sc[6],-8*S.mem.filter(m=>m.p&&m.v0<0).length]);b.push([D.dx.sc[7],D.end[S.over.type].win?200:S.over.type==='survivor'?60:0]);
 return{parts:b,total:sum(b,x=>x[1])};};
