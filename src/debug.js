/* ===================== DEBUG: validation, bots, headless simulation (?debug=1 or #debug) ===================== */
const DBG={};
DBG.validate=function(){const errs=[],ids={},reach={},flagsSet={},flagsUsed={};const all=D.ev.concat(D.tpl);
 const SP=['recog','claim','renown','regent','cohere','open','close','sing','heal','assim','nudge','mix','settle','keep','secede','hazard','count','addpop','carry','mark','skill','role','ground','wait','settle','child','learnkal','iexpand'];
 const selOk=s=>s.split('+').every(p=>{if(p==='all'||p==='core'||p==='birth'||p[0]==='$')return true;const i=p.indexOf(':'),d=p.slice(0,i),v=p.slice(i+1);if(v[0]==='$')return true;return D.dims[d]&&(d==='reg'?D.reg[v]:D[d][v]);});
 const chk=function(fx,w){if(!fx)return;for(const ver of[fx.replace(/\{\?(\w+):([^|}]*)\|([^}]*)\}/g,'$2'),fx.replace(/\{\?(\w+):([^|}]*)\|([^}]*)\}/g,'$3')])for(let st of ver.split(';')){st=st.trim();if(!st)continue;if(st[0]==='?')st=st.slice(1).trim();const a=st.split(/\s+/),k=a[0],dl=x=>x&&x[0]==='$';
  const bad=m=>errs.push(w+': '+m+' in "'+st+'"');
  if(k==='r'){if(!D.res[a[1]])bad('resource');if(isNaN(+a[2]))bad('number');}
  else if(k==='g'){if(!selOk(a[1]))bad('group');if(!D.attr[a[2]])bad('attr');if(isNaN(+a[3]))bad('number');}
  else if(k==='o'){if(!dl(a[1])&&!D.org[a[1]])bad('org');if(!D.attr[a[2]])bad('attr');if(isNaN(+a[3]))bad('number');}
  else if(k==='c'){if(!dl(a[1])&&!D.org[a[1]])bad('org');if(!dl(a[2])&&!D.eth[a[2]])bad('people');}
  else if(k==='m'){if(!selOk(a[1]))bad('group');if(isNaN(+a[2]))bad('number');if(a[3]!=='p'&&a[3]!=='t')bad('memory kind');if(a.length<5)bad('memory text');}
  else if(k==='v'){if(!dl(a[1])&&!D.riv[a[1]])bad('rival');}
  else if(k==='law'){if(!D.laws[a[1]]||!D.laws[a[1]].opts[a[2]])bad('law');}
  else if(k==='reg'||k==='fed'){if(!dl(a[1])&&!D.reg[a[1]])bad('region');}
  else if(k==='x'){if(SP.indexOf(a[1])<0)bad('special');if(a[1]==='carry'&&!D.bcarry[a[2]])bad('carry');}
  else if(k==='b'){if(!D.bres[a[1]]||isNaN(+a[2]))bad('band');}else if(k==='ba'){if(a[1]!=='all'&&!D.broles[a[1]])bad('role');}else if(k==='bf'){}
  else bad('op');}};
 const txt=function(e,s){(s||'').replace(/\{\?(\w+):/g,(m,f)=>{flagsUsed[f]=e.id;});};
 for(const e of all){if(ids[e.id])errs.push('duplicate id '+e.id);ids[e.id]=1;}
 for(const e of all){if(e.pick&&!E.picks[e.pick])errs.push(e.id+': unknown pick '+e.pick);if(!e.x||!e.q||!e.ch||e.ch.length<2)errs.push(e.id+': incomplete');txt(e,e.x);txt(e,e.q);
  if(e.c&&e.c.flag)for(const f of e.c.flag)flagsUsed[f]=e.id;if(e.c&&e.c.tech)for(const t of e.c.tech)if(!D.tech[t])errs.push(e.id+': tech '+t);
  for(const c of e.ch){chk(c.fx,e.id);txt(e,c.fx);txt(e,c.l);if(c.ch){let s=0;for(const b of c.ch){chk(b[1],e.id);s+=b[0];}if(s>1.001)errs.push(e.id+': chance over 1');}if(c.f)flagsSet[c.f]=1;
   if(c.d){const t=ids[c.d[2]]&&E.evById(c.d[2]);if(!t)errs.push(e.id+': missing follow-up '+c.d[2]);else{reach[c.d[2]]=1;if(!t.fu)errs.push(e.id+': follow-up '+c.d[2]+' not marked fu');}}}}
 for(const e of D.ev)if(e.fu&&!reach[e.id])errs.push(e.id+': unreachable follow-up');
 for(const f in flagsUsed)if(!flagsSet[f])errs.push('flag '+f+' used by '+flagsUsed[f]+' but never set');
 for(const e of D.bev){if(!e.x||!e.q||e.ch.length<2)errs.push(e.id+': incomplete');for(const c of e.ch){chk(c.fx,e.id);if(c.ch){let t=0;for(const b of c.ch){chk(b[1],e.id);t+=b[0];}if(t>1.001)errs.push(e.id+': chance over 1');}}if(e.ch.every(c=>c.st||c.shaman||c.mark))errs.push(e.id+': every choice can be locked');}
 for(const a of D.bact)chk(a.fx,a.id);for(const k in D.bcarry)chk(D.bcarry[k].fx,'carry '+k);
 for(const t of D.inter){if(!E.picks[t.pick])errs.push(t.id+': pick');chk(t.fx,t.id);}
 for(const v of D.child)for(const c of v.ch)chk(c.fx,v.id);
 for(const l in D.laws)for(const o in D.laws[l].opts){const O=D.laws[l].opts[o];if(O.req&&!D.tech[O.req])errs.push('law '+l+' req');chk(O.fx,'law '+l+':'+o);}
 for(const o in D.org){chk(D.org[o].ag.fx,'agenda '+o);for(const l in D.org[o].ag.law)if(!D.laws[l]||!D.laws[l].opts[D.org[o].ag.law[l]])errs.push('agenda law '+o);for(const e in D.org[o].comp)if(!D.eth[e])errs.push('org comp '+o);}
 for(const r in D.reg)for(const s of D.reg[r].pops){const a=s.split(' ');if(!D.eth[a[0]]||!D.lang[a[1]]||!D.rel[a[2]]||!D.cls[a[3]])errs.push('region pop '+r+': '+s);}
 for(const t in D.tech)chk(D.tech[t].fx,'tech '+t);
 /* chains of three or more steps */
 let chains=0;const depth=id=>{const e=E.evById(id);let m=1;for(const c of e.ch)if(c.d)m=Math.max(m,1+depth(c.d[2]));return m;};for(const e of D.ev)if(!e.fu&&depth(e.id)>=3)chains++;
 let delayed=0,total=0,two=0;for(const e of all){if(e.ch.length===2)two++;for(const c of e.ch){total++;if(c.d||c.f||/(^|;)\s*(\?|m |law |x )/.test(c.fx||''))delayed++;}}
 return{errs,chains,hand:D.ev.length,tpl:D.tpl.length,inter:D.inter.length,child:D.child.length,delayedShare:delayed/total,twoOpt:two/all.length};};
/* ---------- bots ---------- */
DBG.seed=1;DBG.r=function(){DBG.seed=(DBG.seed+0x6D2B79F5)|0;let t=DBG.seed;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
(function(){const nonCore=s=>s.indexOf('eth:')>=0&&s.indexOf('eth:'+D.core)<0;
 DBG.bots={
 random:{rand:1,test:0.25},
 greedy:{test:0.6,laws:()=>({tax:S.tech.coinage?'tariff':'head'}),expand:0.45,f:a=>{if(a[0]==='r'){const lv=a[1] in S.leg?S.leg[a[1]]:S.res[a[1]];return(+a[2])*Math.min(2.2,Math.max(0.15,(70-lv)/35))*(a[1]==='tre'?1.3:1);}if(a[0]==='o'&&a[2]==='loy'&&S.org[a[1]])return(+a[3])*Math.min(1.5,Math.max(0,(60-S.org[a[1]].loy)/40))*0.6;if(a[0]==='g'&&a[2]==='loy'){const g=E.grp(a[1]);return(+a[3])*g.share*Math.min(1.5,Math.max(0,(60-g.loy)/30));}if(a[0]==='v'&&a[2]==='att')return(+a[3])*Math.min(1,Math.max(0,(50-S.riv[a[1]].att)/40))*0.5;return 0;},child:0,exile:'patron'},
 assim:{test:0.8,laws:()=>({lang:'kaldic',rel:'cult',cit:'oath',gov:'direct',tax:'head'}),expand:0.6,integ:65,repress:60,child:0,exile:'serve',
  f:a=>E.soundF(a)+(a[0]==='law'?({'lang:kaldic':6,'rel:cult':6,'cit:oath':5,'gov:direct':4}[a[1]+':'+a[2]]!==undefined?6:-6):a[0]==='reg'&&a[2]==='integ'?(+a[3])*0.3:a[0]==='fed'?(+a[2]?-5:3):a[0]==='x'&&a[1]==='assim'?6:0)},
 plural:{test:0.8,laws:()=>({lang:'multi',rel:'sync',cit:'oath',rec:'all',gov:'federal',land:'free'}),expand:0.7,integ:40,child:0,exile:'preach',open:1,
  f:a=>E.soundF(a)+(a[0]==='g'&&nonCore(a[1])?(+a[3])*({loy:.3,grv:-.3}[a[2]]||0):a[0]==='fed'?(+a[2]?5:-6):a[0]==='law'?({'lang:multi':1,'rel:sync':1,'rel:tol':1,'cit:oath':1,'rec:all':1,'gov:federal':1,'land:free':1}[a[1]+':'+a[2]]?6:-6):a[0]==='x'&&a[1]==='open'?4:a[0]==='x'&&a[1]==='close'?-4:0)},
 repress:{test:0.7,laws:()=>({rec:'core',cit:'kin',rel:'cult',gov:'direct',land:'estates'}),expand:0.5,repress:44,child:1,exile:'revolt',
  f:a=>E.soundF(a)*0.6+(a[0]==='r'&&a[1]==='ord'?(+a[2])*0.8:a[0]==='g'&&a[2]==='fear'?(+a[3])*0.1:a[0]==='o'&&a[1]==='army'&&a[2]==='loy'?(+a[3])*0.5:a[0]==='fed'?(+a[2]?-6:2):0)},
 heur:{test:0.9,laws:()=>{const n=E.nreg(),w={};if(n>=3){w.cit='oath';w.lang='multi';}if(S.org.priest.aut>50)w.recog='trial';if(S.res.tre<12&&S.tech.writing)w.tax='head';return w;},expand:0.6,integ:55,child:2,exile:'auto',open:1,purge:55,f:a=>E.soundF(a)}};
 DBG.plan=function(B){const P=[],t=S.res.tre,o=S.org;
  if(B===DBG.bots.greedy){const ts=E.nextTechs().filter(x=>S.res.kno>=D.tech[x].k);if(ts.length)P.push(['tech',ts[0]]);}
  if(!(S.tst.regent||S.tst.sign!==null)&&S.body.age>=35&&B!==DBG.bots.greedy)P.push(['tst']);
  if(o.army.loy<45&&t>=8)P.push(['patron','o:army']);
  if(B!==DBG.bots.greedy)for(const id of['priest','council','noble','merch'])if(o[id].loy<34&&t>=8)P.push(['patron','o:'+id]);
  if(S.leg.tra>18){const w=B.laws();for(const l in w)if(S.law[l]!==w[l]&&E.lawOk(l,w[l]))P.push(['law',l+':'+w[l]]);}
  const rows=E.table('eth').sort((a,b)=>b.tg-a.tg);if(rows.length&&rows[0].tg>(B.repress||50)){if(B.repress)P.push(['repress',rows[0].key]);else if(t>=10)P.push(['patron','g:'+rows[0].key]);}
  let low=null,lm=B.integ||0;for(const id in S.reg){const R=S.reg[id];if(R.own==='p'&&!D.reg[id].home&&R.integ<lm){lm=R.integ;low=id;}}if(low&&t>=14)P.push(['integrate',low]);
  const ts=E.nextTechs().filter(x=>S.res.kno>=D.tech[x].k);if(ts.length)P.push(['tech',ts[0]]);
  if(B.purge)for(const id in o)if(o[id].on&&o[id].aut>B.purge)P.push(['reform','purge:'+id]);
  if(B.open){const es=E.shares('eth');for(const id of['council','army'])if(E.dom(o[id]).s>0.75&&(es[E.dom(o[id]).e]||0)<0.6)P.push(['reform','open:'+id]);}
  if(t>=22&&S.res.ord>=45&&!low){for(const id of E.targets()){if(S.reg[id].own==='free'&&B!==DBG.bots.repress&&E.treatP(id)>=0.45)P.push(['expand','t:'+id]);if(E.marchP(id)>=(B.expand||0.6))P.push(['expand','m:'+id]);}}
  if(B!==DBG.bots.greedy){let br=null,bm=999;for(const id in S.reg)if(S.reg[id].own==='p'){const g=E.grp('reg:'+id);if(g.bel<bm){bm=g.bel;br=id;}}if(br&&bm<55)P.push(['teach',br]);}
  P.push(['court']);return P;};
 DBG.choose=function(B){const c=S.cur,n=c.ch.length,rnd=()=>Math.floor(DBG.r()*n);
  if(c.kind==='cont')return 0;
  if(c.kind==='bev'||c.kind==='brange'||c.kind==='bact'||c.kind==='bproof'){const on=c.ch.map((x,i)=>i).filter(i=>!c.ch[i].off);if(B.rand)return on[Math.floor(DBG.r()*on.length)];const Bd=S.band;
   if(c.kind==='bproof'){let bi=on[0],bv=-1e9;for(const i of on)if(c.ch[i].val>bv&&c.ch[i].val>0){bv=c.ch[i].val;bi=i;}return bv>0?bi:on[on.length-1];}
   if(c.kind==='brange'){const sc={flats:9-(Bd.people<30?4:0),high:3+(Bd.bond<40?4:0),forest:3+(Bd.people<32?6:0)+(Bd.food>50?3:0),shore:6};let bi=0,bv=-1e9;c.ch.forEach((x,i)=>{let v=sc[x.key]+(Bd.food<30?(x.key==='flats'?4:x.key==='shore'?2:0):0)-(x.key===Bd.ground?4*(Bd.stay+1):0)+DBG.r();if(v>bv){bv=v;bi=i;}});return bi;}
   if(c.kind==='bact'){const k=Bd.food<25?'hunt':Bd.marks<2?'mark':Bd.chant<45?'teach':Bd.skill<4?'learn':Bd.bond<45?'ties':'teach';return c.ch.findIndex(x=>x.key===k);}
   const ev=E.evById(c.id),W={people:1.5,food:0.5,bond:0.4,belief:0.5,standing:0.4,lore:0.8,chant:0.4,rift:-0.3},f=a=>a[0]==='b'?(+a[2])*W[a[1]]*(a[1]==='food'?E.need(Bd.food):1):a[0]==='ba'?(+a[2])*0.05:a[0]==='x'?({carry:0.5,mark:4,skill:3,role:6,settle:100}[a[1]]||0):0;
   let bi=on[0],bs=-1e9;for(const i of on){const s=E.fxScore(ev.ch[i],c.ctx,null,f,true)+DBG.r()*0.5;if(s>bs){bs=s;bi=i;}}return bi;}if(c.kind==='ev'&&DBG.judging)DBG.judge(c);
  if(c.kind==='test'){if(DBG.r()<B.test)return c.ans;let i=rnd();return i;}
  if(B.rand){if(c.kind==='dir2'&&c.dir!=='tst'&&n>1){return Math.floor(DBG.r()*(n-1));}return rnd();}
  if(c.kind==='ev'){const ev=E.evById(c.id);let bi=0,bs=-1e9;ev.ch.forEach((ch,i)=>{const s=E.fxScore(ch,c.ctx,c.src,B.f,B!==DBG.bots.greedy)+(ch.d&&B.far?B.far:0)+DBG.r()*(B.noise||0.02);if(s>bs){bs=s;bi=i;}});return bi;}
  if(c.kind==='child'){if(c.id==='v_reveal'){if(B.child===2)return(S.org[E.ctrl()||'priest'].aut>45||S.org[S.regent].aut>50)?0:1;return B.child;}const v=D.child.find(x=>x.id===c.id);let bi=0,bs=-1e9;v.ch.forEach((ch,i)=>{const s=E.fxS(ch.fx,c.ctx,B.f,true)+DBG.r()*0.02;if(s>bs){bs=s;bi=i;}});return bi;}
  if(c.kind==='exile'){let k=B.exile;if(k==='auto')k=E.revoltP()>=0.4?'revolt':'preach';const i=c.ch.findIndex(x=>x.key===k);return i<0?0:i;}
  if(c.kind==='dir'){for(const p of DBG.plan(B)){const i=c.ch.findIndex(x=>x.key===p[0]);if(i<0)continue;if(p[0]==='court'||p[0]==='listen'){DBG.want=null;return i;}if(p[0]==='tst'){DBG.want=null;return i;}const subs=E.dirSubs(p[0],0);if(subs.ch.some(x=>x.key===p[1])){DBG.want=p[1];return i;}}return 0;}
  if(c.kind==='dir2'){if(c.dir==='tst'){if(c.step===0){let b='priest',m=-1;for(const o of['priest','council','army'])if(S.org[o].loy-S.org[o].aut*0.3>m){m=S.org[o].loy-S.org[o].aut*0.3;b=o;}return c.ch.findIndex(x=>x.key===b);}
    if(c.step===1){const ct=E.ctrl();return(!ct||S.org[ct].dev>=50)?0:n-1;}if(c.step===2){if(B===DBG.bots.plural)return n-1;const i=c.ch.findIndex(x=>x.key===D.core);return i<0?n-1:(E.grp('eth:'+D.core).share>0.5?i:n-1);}return 0;}
   const i=c.ch.findIndex(x=>x.key===DBG.want);return i<0?n-1:i;}
  return 0;};
})();
function top0(){const es=E.shares('eth');return Math.max(0,...Object.values(es));}
/* Dominance test: 16 value profiles (random but fixed tastes) judge every presented event in its actual state, hidden effects included. */
DBG.h=function(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}h^=h>>>13;h=Math.imul(h,0x5bd1e995);h^=h>>>15;return(h>>>0)/4294967296;};
DBG.ln=function(k){const u=Math.max(1e-6,DBG.h(k)),v=DBG.h(k+'~');return Math.exp(0.9*Math.sqrt(-2*Math.log(u))*Math.cos(6.2832*v));};
DBG.profF=function(pi){const P='p'+pi+':';return function(a){const k=a[0];let key=k,b=E.soundF(a);
 if(k==='r')key+=a[1];else if(k==='g'){key+=a[2];const m=a[1].match(/eth:(\w+)/);b*=DBG.ln(P+'eth'+(m?m[1]:a[1]));}
 else if(k==='o'){key+=a[1]+a[2];if(a[2]==='pow')b=(+a[3])*0.25*(DBG.h(P+key)<0.5?-1:1);}
 else if(k==='v')key+=a[1];else if(k==='reg')key+=a[2];
 else if(k==='law')return(DBG.h(P+a[1]+a[2])-0.5)*12;else if(k==='fed')return(DBG.h(P+'fed')-0.5)*10*(+a[2]?1:-1);
 else if(k==='c')return(+a[2].length?(+a[3])*0.12*(DBG.h(P+'eth'+a[2])<0.5?-1:1):0);
 else if(k==='x'){key+=a[1];if(a[1]==='open'||a[1]==='close')return(DBG.h(P+'open')-0.5)*8*(a[1]==='open'?1:-1);if(a[1]==='sing')return(+a[2])*(DBG.h(P+'sing')-0.5);if(a[1]==='cohere')return-3*DBG.ln(P+'coh');}
 return b*DBG.ln(P+key);};};
DBG.prof={};DBG.profs=[];for(let i=0;i<16;i++)DBG.profs.push(DBG.profF(i));
DBG.judge=function(c){const ev=E.evById(c.id);if(!ev)return;const t=DBG.prof[c.id]||(DBG.prof[c.id]=ev.ch.map(()=>0));
 DBG.profs.forEach((f,pi)=>{let bi=0,bs=-1e9;ev.ch.forEach((ch,i)=>{const s=E.fxScore(ch,c.ctx,c.src,f,true)+(ch.d?(DBG.h('p'+pi+'far')-0.4)*3:0);if(s>bs){bs=s;bi=i;}});t[bi]++;});};
DBG.scan=function(o,path,out){if(out.length>5)return;if(typeof o==='number'){if(!isFinite(o))out.push(path);}else if(o===undefined)out.push(path+' undefined');else if(o&&typeof o==='object')for(const k in o)DBG.scan(o[k],path+'.'+k,out);};
DBG.game=function(bot,seed){E.newGame(seed);DBG.seed=seed*7+13;const B=DBG.bots[bot];let steps=0;while(!S.over&&steps++<6000){const i=DBG.choose(B);const before=S.cur;E.choose(i);if(S.cur===before&&!S.over){E.choose(0);}}
 const bad=[];DBG.scan({res:S.res,leg:S.leg,pops:S.pops,org:S.org,reg:S.reg,riv:S.riv},'S',bad);return{stuck:!S.over,bad};};
DBG.run=function(total){total=total||500;DBG.prof={};DBG.judging=1;const V=DBG.validate(),names=Object.keys(DBG.bots),per=Math.ceil(total/names.length),R={},fired={},thr={},greedyPk={},heurPk={},allPk={},births={},deaths={},matter={};let nan=[],stuck=0,conv=0,games=0;
 for(const b of names){const r=R[b]={n:0,win:0,out:{},turns:0,lives:0,years:0,rec:[0,0],land:{top:0,kal:0,ret:0,grv:0,cle:0,nreg:0,eths:0}};
  for(let g=0;g<per;g++){const res=DBG.game(b,1000+g*7919+names.indexOf(b)*101);games++;if(res.stuck){stuck++;continue;}if(res.bad.length)nan=nan.concat(res.bad.slice(0,2));
   r.n++;const t=S.over.type;if(S.sum){r.sn=(r.sn||0)+1;r.st=(r.st||0)+S.turn;r.sl=(r.sl||0)+S.life;for(const k of['ab','ag','n','top','topL','big'])r['s_'+k]=(r['s_'+k]||0)+S.sum[k];r.s_pl=(r.s_pl||0)+S.org.priest.loy;r.s_pd=(r.s_pd||0)+S.org.priest.dev;r.s_leg=(r.s_leg||0)+S.leg.leg;r.s_ord=(r.s_ord||0)+S.res.ord;}if(top0(S)>=0.95)r.conv=(r.conv||0)+1;r.out[t]=(r.out[t]||0)+1;if(S.over.win)r.win++;r.turns+=S.turn;r.lives+=S.life;r.years+=S.year;r.rec[0]+=S.st.rec[0];r.rec[1]+=S.st.rec[1];
   for(const k in S.st.ev)fired[k]=(fired[k]||0)+S.st.ev[k];for(const k in S.st.thr)thr[k]=(thr[k]||0)+1;for(const k in S.st.births)births[k]=(births[k]||0)+S.st.births[k];for(const k in S.st.deaths)deaths[k]=(deaths[k]||0)+S.st.deaths[k];
   if(b!=='random')for(const k in S.st.pk){if(k==='dir'||k==='exile'||k==='bact')continue;const a=allPk[k]||(allPk[k]=[]);S.st.pk[k].forEach((v,i)=>{a[i]=(a[i]||0)+(v||0);});}
   if(b==='heur')for(const k in S.st.pk){if(k==='dir'||k==='exile'||k==='bact')continue;const a=heurPk[k]||(heurPk[k]=[]);S.st.pk[k].forEach((v,i)=>{a[i]=(a[i]||0)+(v||0);});}
   if(b==='greedy')for(const k in S.st.pk){if(k==='dir'||k==='exile'||k==='bact')continue;const a=greedyPk[k]||(greedyPk[k]=[]);S.st.pk[k].forEach((v,i)=>{a[i]=(a[i]||0)+(v||0);});}
   const own=E.own(),es=E.shares('eth',own),tot=sum(own,p=>p.size)||1,top=Math.max(0,...Object.values(es));if(top>=0.95)conv++;for(const row of E.table('eth'))if(row.pow>=5)matter[row.key.slice(4)]=(matter[row.key.slice(4)]||0)+1;
   const L=r.land;L.top+=top;L.kal+=E.grp('lang:kal',own).share;L.ret+=sum(own,p=>D.rel[p.rel].fam==='ret'?p.size:0)/tot;L.grv+=sum(own,p=>p.grv*p.size)/tot;L.cle+=S.cleav;L.nreg+=E.nreg();L.eths+=Object.values(es).filter(x=>x>=0.1).length;}}
 const out=[],P=x=>(Math.round(x*10)/10),pc=x=>Math.round(x*100)+'%';
 out.push('DATA: '+V.hand+' handwritten events, '+V.tpl+' templates, '+V.inter+' interregnum templates, '+V.child+' childhood vignettes, '+V.chains+' chains of 3+ steps, '+pc(V.delayedShare)+' of choices with delayed or lasting effects, '+pc(V.twoOpt)+' two-option events.');
 out.push('VALIDATION: '+(V.errs.length?V.errs.join(' | '):'no errors'));out.push('GAMES: '+games+', stuck '+stuck+', non-finite values: '+(nan.length?nan.join(', '):'none'));out.push('');
 for(const b of names){const r=R[b],n=r.n||1,L=r.land;out.push(b.toUpperCase()+': wins '+pc(r.win/n)+' | '+Object.keys(r.out).sort((a,c)=>r.out[c]-r.out[a]).map(k=>k+' '+r.out[k]).join(', '));
  out.push('   turns '+P(r.turns/n)+', lives '+P(r.lives/n)+', years '+Math.round(r.years/n)+', returns not recognized '+pc(r.rec[1]/(r.rec[0]||1))+' ('+r.rec[1]+'/'+r.rec[0]+')');
  if(r.sn)out.push('   at the Waking ('+r.sn+' games): turn '+P(r.st/r.sn)+', life '+P(r.sl/r.sn)+', belief '+P(r.s_ab/r.sn)+', grievance '+P(r.s_ag/r.sn)+', lands '+P(r.s_n/r.sn)+', top people '+pc(r.s_top/r.sn)+', top tongue '+pc(r.s_topL/r.sn)+', peoples>10% '+P(r.s_big/r.sn)+', priest loy '+P(r.s_pl/r.sn)+' dev '+P(r.s_pd/r.sn)+', law '+P(r.s_leg/r.sn)+', order '+P(r.s_ord/r.sn)+'; one-people games '+(r.conv||0));
  out.push('   final landscape: lands '+P(L.nreg/n)+', largest people '+pc(L.top/n)+', peoples over 10% '+P(L.eths/n)+', Kaldic speakers '+pc(L.kal/n)+', Returning Way '+pc(L.ret/n)+', grievance '+P(L.grv/n)+', cleavage '+P(L.cle/n*100));}
 out.push('');const dt=sum(Object.values(deaths),x=>x)||1;out.push('DEATHS: '+Object.keys(deaths).sort((a,b)=>deaths[b]-deaths[a]).map(k=>k+' '+pc(deaths[k]/dt)).join(', '));
 const bt=sum(Object.values(births),x=>x)||1;out.push('BIRTHS: '+Object.keys(births).sort((a,b)=>births[b]-births[a]).map(k=>D.eth[k].n+' '+pc(births[k]/bt)).join(', '));
 out.push('INTERREGNUM: 15 years, or 20 when the child stays hidden.');
 const dead=D.ev.concat(D.tpl,D.inter,D.child).map(e=>e.id).filter(id=>!fired[id]&&D.child.every(c=>c.id!==id));out.push('EVENTS NEVER FIRED: '+(dead.length?dead.join(', '):'none'));
 const rare=D.ev.concat(D.tpl).map(e=>e.id).filter(id=>fired[id]&&fired[id]<games*0.02);out.push('RARE (<2% of games): '+(rare.length?rare.map(i=>i+' '+fired[i]).join(', '):'none'));
 const TH=['secede','riot','coup','debt','famine'];out.push('THRESHOLDS (games reached): '+TH.map(k=>k+' '+(thr[k]||0)).join(', '));
 const dom=[];for(const k in greedyPk){const a=greedyPk[k],t=sum(a,x=>x||0);if(t>=8)a.forEach((v,i)=>{if((v||0)/t>0.8)dom.push(k+'#'+(i+1)+' '+pc(v/t));});}out.push('GREEDY BOT PICKS OVER 80% ('+dom.length+' choices; it is myopic by design and cannot see hidden or delayed costs, so the profile test below is the real dominance check): '+dom.join(', '));
 const dom2=[];for(const k in heurPk){const a=heurPk[k],t=sum(a,x=>x||0);if(t>=8)a.forEach((v,i)=>{if((v||0)/t>0.8)dom2.push(k+'#'+(i+1)+' '+pc(v/t));});}const pd=[],pn=[];let pe=0;for(const k in DBG.prof){const a=DBG.prof[k],t=sum(a,x=>x);if(t<160)continue;pe++;a.forEach((v,i)=>{if(v/t>0.8)pd.push(k+'#'+(i+1)+' '+pc(v/t));if(v/t<0.03)pn.push(k+'#'+(i+1)+' '+P(v/t*100)+'%');});}out.push('DOMINANCE TEST (16 value profiles x actual states, '+pe+' events): best in over 80% of cases: '+(pd.length?pd.join(', '):'none'));out.push('   best in under 3% of cases: '+(pn.length?pn.join(', '):'none'));
 out.push('PEOPLES THAT NEVER REACH 5% OF POWER AT GAME END: '+(Object.keys(D.eth).filter(e=>!matter[e]).map(e=>D.eth[e].n).join(', ')||'none'));
 out.push('GAMES ENDING WITH ONE PEOPLE OVER 95%: '+conv);return out.join('\n');};
/* Band era only: play until the band settles or is lost. */
DBG.runBand=function(total){total=total||500;const out=[],P=x=>Math.round(x*10)/10,pc=x=>Math.round(x*100)+'%',V=DBG.validate(),fired={},pk={};let bad=[],stuck=0;DBG.judging=0;
 for(const b of['random','heur']){const r={n:0,out:{},lives:0,years:0,turns:0,rec:[0,0],d:{},v:{people:0,belief:0,chant:0,rift:0,marks:0,skill:0,bond:0},carry:{},sh:0,gap:0,gn:0},B=DBG.bots[b],per=total/2;
  for(let g=0;g<per;g++){E.newGame(5000+g*7919+(b==='heur'?17:0));DBG.seed=g*31+7;let st=0;while(!S.over&&S.era===0&&st++<4000){const i=DBG.choose(B),bf=S.cur;E.choose(i);if(S.cur===bf&&!S.over&&S.era===0){stuck++;break;}}
   const Bd=S.band,t=S.over?S.over.type:'settled';r.n++;r.out[t]=(r.out[t]||0)+1;r.lives+=Bd.lives+1;r.years+=S.year;r.turns+=S.turn;r.rec[0]+=S.st.rec[0];r.rec[1]+=S.st.rec[1];for(const k in S.st.deaths)r.d[k]=(r.d[k]||0)+S.st.deaths[k];for(const j of S.st.inter){r.gap+=j;r.gn++;}
   for(const k in S.st.ev)fired[k]=(fired[k]||0)+S.st.ev[k];for(const k in S.st.pk){if(k==='bact')continue;const a=pk[k]||(pk[k]=[]);S.st.pk[k].forEach((v,i)=>{a[i]=(a[i]||0)+(v||0);});}
   if(t==='settled'){for(const k in r.v)r.v[k]+=Bd[k];for(const c of Bd.carry)r.carry[c.id]=(r.carry[c.id]||0)+1;if(Bd.role==='shaman')r.sh++;}
   const x=[];DBG.scan({band:Bd,res:S.res,leg:S.leg,org:S.org},'S',x);bad=bad.concat(x.slice(0,2));}
  const n=r.n,s=r.out.settled||1,dt=sum(Object.values(r.d),x=>x)||1;
  out.push(b.toUpperCase()+' ('+n+' games): '+Object.keys(r.out).sort((a,c)=>r.out[c]-r.out[a]).map(k=>k+' '+pc(r.out[k]/n)).join(', '));
  out.push('   lives '+P(r.lives/n)+', turns '+P(r.turns/n)+', years '+Math.round(r.years/n)+', gap between lives '+Math.round(r.gap/(r.gn||1))+' years, showings failed or declined '+pc(r.rec[1]/(r.rec[0]||1))+' ('+r.rec[1]+'/'+r.rec[0]+')');
  out.push('   deaths: '+Object.keys(r.d).sort((a,c)=>r.d[c]-r.d[a]).map(k=>k+' '+pc(r.d[k]/dt)).join(', '));
  out.push('   at settling: people '+P(r.v.people/s)+', belief '+P(r.v.belief/s)+', chant '+P(r.v.chant/s)+', rift '+P(r.v.rift/s)+', bond '+P(r.v.bond/s)+', marks '+P(r.v.marks/s)+', skill '+P(r.v.skill/s)+', shaman at settling '+pc(r.sh/s));
  out.push('   carried into the Age of Clans: '+(Object.keys(r.carry).sort((a,c)=>r.carry[c]-r.carry[a]).map(k=>k+' '+pc(r.carry[k]/s)).join(', ')||'nothing'));}
 const dead=D.bev.filter(e=>!fired[e.id]).map(e=>e.id),np=[];for(const e of D.bev){const a=pk[e.id]||[];for(let i=0;i<e.ch.length;i++)if(!a[i])np.push(e.id+'#'+(i+1));}
 return['BAND ERA: '+D.bev.length+' events, 4 grounds, '+D.bact.length+' personal actions, '+Object.keys(D.bcarry).length+' carry-overs. Validation: '+(V.errs.length?V.errs.join(' | '):'no errors')+'. Stuck '+stuck+', non-finite: '+(bad.length?bad.join(','):'none')].concat(out,['EVENTS NEVER FIRED: '+(dead.join(', ')||'none'),'CHOICES NEVER PICKED BY EITHER BOT: '+(np.join(', ')||'none')]).join('\n');};
if(typeof module!=='undefined')module.exports={D,E,DBG,get S(){return S;}};
