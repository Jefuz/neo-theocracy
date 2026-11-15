/* ===================== DATA: interface strings ===================== */
D.U={sub:'A game of lives, peoples and long consequences',life:'Life',year:'Year',age:'aged',unrec:'unrecognized',body:'Body',knives:'Knives',faults:'Fault lines',waking:'The Waking',
urges:'urges',cols:{name:'',share:'Share',pow:'Power',w:'Wealth',loy:'Loyalty',bel:'Belief',grv:'Grievance',trend:'Trend'},
gline:'{0} of your people; {1} in influence; {2}. Toward you: {3}. Of your return: {4}. Mood: {5}.',tblNote:'Share and power are in every 100 where counted. Loyalty is what they show you. Grievance is what can be seen: fear hides the rest. Trend is the change in power over three seasons. Tap a row.',
truth:'You walked unseen this season: grievance shown is the true figure.',comp:'Made up of',coh:'Cohesion',mob:'Capacity to mobilize',mems:'What they remember',noMem:'Nothing that still burns.',causes:'Why this changed',noCause:'No notable causes yet.',
never:'never fades',fades:'fading',pw:'Power',loy:'Loyalty to you',dev:'Devotion to your return',aut:'Autonomy',ranks:'Ranks',regentNow:'Held the last regency.',ctrlNow:'Controls the Search for your return.',dormant:'Not yet founded.',
owner:'Held by',you:'your realm',free:'no one',integ:'Integration',unrest:'Unrest',charter:'Chartered',home:'The heartland',att:'Attitude',str:'Strength',kin:'Kin of the',inRealm:'in your realm',kinNone:'none in your realm',reach:'within reach',notYet:'not yet within reach',gone:'Destroyed.',
lawsT:'Laws',craftsT:'Crafts',have:'Mastered',next:'Within reach',cost:'Knowledge',tstT:'Testament',tstNone:'Nothing dictated for this life.',tReg:'Regent',tSign:'Sign',tProph:'Prophecy',tCache:'Cache',
livesT:'The line of incarnations',lh:['Life','Born among','Class','Birthplace','Ruled','Died','Cause'],now:'living',notRuled:'never ruled',advT:'Counsellors of this life',advPast:'Counsellors of past lives',followed:'counsel followed',
chronT:'Chronicle',because:'Because of',menuT:'Menu',seed:'Seed',newSeed:'Seed for a new game',begin:'Begin a new game',cont:'Continue saved game',exp:'Export save as text',imp:'Import save from text',copy:'Copy',copied:'Copied',badImp:'That text is not a valid save.',
theme:'Switch light and dark',dbg:'Run self-test: validate data and simulate games',dbgRun:'Running 500 band-era games and 120 full games. This takes a few seconds.',keys:'Keys: 1 to 9 choose, Enter continues.',confirmNew:'Press again to start over. The current game will be overwritten.',
endT:'The reckoning',score:'Score',total:'Total',advRec:'What your counsellors really were',advH:['Counsellor','Life','Own-people bias','Accuracy','Sound counsel','Self-serving','Followed'],chains:'The three longest chains of consequence',noChain:'No chain of consequence was recorded.',
since:'Since last season',rule:'ruled',to:'to',sameSeed:'The same seed and the same choices replay the same game.',saved:'Saved in this browser after every choice.'};
/* ===================== UI ===================== */
(function(){if(typeof document==='undefined')return;
const app=document.getElementById('app'),U=D.U,KEY='neotheo_save_v1',TK='neotheo_theme';
let tab='court',dim='eth',sortK='pow',sortD=-1,selG=null,note='',dbgOut='',expTxt='',pendNew=false;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const R=x=>Math.round(x);const TABS=['court','peoples','orders','lands','rivals','laws','lives','chronicle','menu'];
const COL={eth:{kr:'#b5532f',kh:'#dc9a3c',so:'#2f7fa3',sv:'#74b8cf',im:'#6a4c93',is:'#b095d0',tu:'#4f8f5b'},lang:{kal:'#b5532f',hkal:'#dc9a3c',sor:'#2f7fa3',vek:'#74b8cf',ime:'#6a4c93',imh:'#b095d0',tuu:'#4f8f5b'},
 rel:{ret_k:'#8a2f1d',ret_s:'#e0805a',anc:'#dc9a3c',sky:'#2f7fa3',lamp:'#6a4c93',lamp_h:'#b095d0',grove:'#4f8f5b'},cls:{farmer:'#8a9a5b',herder:'#c2b280',warrior:'#9b2c2c',merchant:'#2f7fa3',artisan:'#777',noble:'#6a4c93',bonded:'#444'}};
const RC=['#b5532f','#dc9a3c','#2f7fa3','#6a4c93','#4f8f5b','#74b8cf','#b095d0','#8a9a5b','#9b2c2c','#777'];
const col=(d,v)=>d==='reg'?RC[Object.keys(D.reg).indexOf(v)%RC.length]:(COL[d][v]||'#888');
const nm=(d,v)=>d==='reg'?D.reg[v].n:D[d][v].n;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function load(){try{const t=localStorage.getItem(KEY);if(t){const o=JSON.parse(t);if(o&&o.v===1&&o.pops){S=o;return true;}}}catch(e){}return false;}
function hasSave(){try{return!!localStorage.getItem(KEY);}catch(e){return false;}}
function theme(set){let t;try{t=localStorage.getItem(TK);}catch(e){}if(set){t=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem(TK,t);}catch(e){}}
 if(!t)t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';document.documentElement.dataset.theme=t;}
function spark(a,w,h){w=w||50;h=h||18;if(!a||a.length<2)return'';const n=a.slice(-30),mn=Math.min(...n),mx=Math.max(...n),sp=(mx-mn)||1;
 const pts=n.map((v,i)=>(i/(n.length-1)*(w-2)+1).toFixed(1)+','+(h-1-(v-mn)/sp*(h-2)).toFixed(1)).join(' ');return'<svg width="'+w+'" height="'+h+'" aria-hidden="true"><polyline fill="none" stroke="currentColor" stroke-width="1.3" points="'+pts+'"/></svg>';}
function bar(map,d){const ks=Object.keys(map).sort((a,b)=>map[b]-map[a]),t=ks.reduce((s,k)=>s+map[k],0)||1,l=lvl();
 if(l<=1)return'<div class="small">'+esc(ks.filter(k=>map[k]/t>=0.04).map(k=>KW.mix[map[k]/t>=0.6?0:map[k]/t>=0.3?1:map[k]/t>=0.12?2:3]+' '+nm(d,k)).join(', '))+'</div>';
 return'<div class="bar">'+ks.map(k=>'<i style="width:'+(map[k]/t*100).toFixed(1)+'%;background:'+col(d,k)+'"></i>').join('')+'</div><div class="legend">'+ks.filter(k=>map[k]/t>=0.02).map(k=>'<span><i style="background:'+col(d,k)+'"></i>'+esc(nm(d,k))+(l>=3?' '+R(map[k]/t*100):'')+'</span>').join('')+'</div>';}
const meter=v=>'<span class="meter"><i style="width:'+clamp(v)+'%"></i></span> '+R(v);
const KW=D.kw,lvl=E.lv;
const soft=t=>E.soft(t,lvl());
const seen=(key,v,o)=>E.seen(key,v,o);
const wd=(scale,v,key,o)=>E.wordOf(scale,key?seen(key,v,o):v);
const mt=(scale,v,need,key,o)=>lvl()>=need?meter(v):'<b>'+wd(scale,v,key,o)+'</b>';
const num=(scale,v,need,key,o)=>lvl()>=need?''+R(v):wd(scale,v,key,o);
function causes(key){const a=S.causes[key];if(!a||!a.length)return'<p class="small">'+U.noCause+'</p>';return'<ul class="log">'+a.slice().reverse().map(c=>'<li>'+esc(soft(c.t))+(c.d&&lvl()>=4?' ('+sg(c.d)+')':'')+' <span class="small">'+esc(fmt(D.dx.when,D.ord[c.l],c.y))+'</span></li>').join('')+'</ul>';}
/* ---------- header ---------- */
function header(){let h='<header><div class="top"><h1>'+esc(D.title)+'</h1>';
 if(S){const b=S.body;h+='<span class="when">'+U.year+' '+S.year+' · '+esc(D.eras[S.era])+' · '+U.life+' '+S.life+(b?' · '+(S.era===0?D.bx.role[S.band.role]:esc(D.eth[b.eth].n))+', '+U.age+' '+b.age+(b.rec||S.era===0?'':' ('+U.unrec+')'):'')+'</span></div>';
  const B=S.band,L=E.legit(),lv=lvl(),it=S.era===0?[['People',fmt(KW.about,R(B.people/5)*5),null,B.people<20],['Food',wd('stores',B.food),null,B.food<15],['Bond',wd('bond',B.bond),null,B.bond<20],['Belief',wd('bel',B.belief),null,false],['Lore',wd('know',B.lore),null,false]]:[['tre',num('stores',S.res.tre,2),S.hist.tre,S.res.tre<8],['food',num('stores',S.res.food,2),S.hist.food,S.res.food<15],['ord',num('order',S.res.ord,3),S.hist.ord,S.res.ord<25],['leg',num('legit',L,3),S.hist.leg,L<25],['kno',lv>=2?''+R(S.res.kno):wd('know',S.res.kno*1.6),S.hist.kno,false]];
  h+='<div class="res">'+it.map(x=>'<div class="chip'+(x[3]?' low':'')+'"><span>'+(x[0]==='leg'?'Legitimacy':(D.res[x[0]]||x[0]))+'<b'+(/[a-z]/.test(x[1])?' style="font-size:13px"':'')+'>'+x[1]+'</b></span>'+(lv>=3?spark(x[2]):'')+'</div>').join('')+'</div>';
  const ids=S.era===0?['court','band','lives','chronicle','menu']:TABS;if(ids.indexOf(tab)<0)tab='court';h+='<nav>'+ids.map(t=>'<button data-tab="'+t+'" class="'+(t===tab?'on':'')+'">'+(t==='band'?D.bx.bandT:D.ui.tabs[TABS.indexOf(t)])+'</button>').join('')+'</nav>';}
 else h+='</div>';return h+'</header>';}
/* ---------- court ---------- */
function status(){const b=S.body;let h='<div class="status">';if(S.era===0){const B=S.band;return h+'<span>'+D.bx.you+': <b>'+D.bx.role[B.role]+'</b>, '+D.bx.hearth[B.hearth]+' hearth</span><span>'+D.bres.standing+': <b>'+wd('standing',B.standing)+'</b></span><span>'+D.bx.ground+': <b>'+D.grounds[B.ground].n+'</b></span><span>'+D.bres.chant+': <b>'+wd('chant',B.chant)+'</b> · '+D.bx.marks+' <b>'+B.marks+'</b></span></div>';}
 if(b&&b.rec&&!S.over&&S.stage){const hz=E.hazards(),bd=hz.age+hz.ill,bi=bd<0.05?0:bd<0.12?1:bd<0.25?2:3,ki=hz.kill<0.02?0:hz.kill<0.06?1:2;
  h+='<span>'+U.body+': <b class="'+(bi>=2?'sig2':bi?'sig1':'')+'">'+D.ui.body[bi]+'</b></span><span>'+U.knives+': <b class="'+(ki===2?'sig2':ki?'sig1':'')+'">'+D.ui.knives[ki]+'</b></span>';}
 const c=S.cleav,ci=c<0.55?0:c<0.7?1:2;h+='<span>'+U.faults+(lvl()>=4?' '+R(c*100):'')+': <b class="'+(ci===2?'sig2':ci?'sig1':'')+'">'+D.ui.cleav[ci]+'</b></span>';
 h+='<span>Charisma <b>'+num('legit',S.leg.cha,3)+'</b> · Tradition <b>'+num('legit',S.leg.tra,3)+'</b> · Law <b>'+num('legit',S.leg.leg,3)+'</b></span>';
 if(S.era===4)h+='<span>'+U.waking+': '+meter(Math.min(100,S.sing))+'</span>';return h+'</div>';}
function tiers(pv){return(pv||[]).map(p=>'<span class="pv"><span class="tier t'+p[0]+'">'+D.ui.tiers[p[0]]+':</span> '+esc(soft(p[1]))+'</span>').join('');}
function since(){let h='';const rc=S.rcRep||{},ks=Object.keys(rc).filter(k=>Math.abs(rc[k].reduce((s,x)=>s+x[1],0))>=1);
 if(!S.flash&&!(S.rep&&S.rep.length)&&!ks.length)return'';h+='<div class="panel"><h3 style="margin-top:0">'+U.since+'</h3>';
 if(S.flash)h+='<div class="flash">'+esc(S.flash)+'</div>';
 if(S.rep&&S.rep.length)h+='<ul class="log">'+S.rep.filter(t=>!S.flash||S.flash.indexOf(t)<0).map(t=>'<li>'+esc(soft(t))+'</li>').join('')+'</ul>';
 if(ks.length)h+='<ul class="log">'+ks.map(k=>{const a=rc[k].slice().sort((x,y)=>Math.abs(y[1])-Math.abs(x[1])),t=a.reduce((s,x)=>s+x[1],0);const ex=lvl()>=(k==='tre'||k==='food'||k==='kno'?2:3);return'<li><b class="'+(t>0?'up':'dn')+'">'+esc(D.res[k])+' '+(ex?sg(R(t)):(t>0?KW.rose:KW.fell))+'</b>: '+a.slice(0,3).map(x=>esc(soft(x[0]))+(ex?' '+sg(R(x[1])):'')).join('; ')+'</li>';}).join('')+'</ul>';
 return h+'</div>';}
function court(){const c=S.cur;if(!c)return'';if(c.kind==='end')return endScreen();let h=status();
 if(c.kind==='ev'||c.kind==='dir'||c.kind==='bev')h+=since();else if(S.flash)h+='<div class="panel"><div class="flash">'+esc(S.flash)+'</div></div>';
 h+='<div class="panel"><h2>'+esc(c.t)+'</h2>'+(c.who?'<div class="who">'+esc(c.who)+'</div>':'')+'<div class="txt">'+esc(c.x)+'</div>';
 if(c.list&&c.list.length)h+='<ul class="log">'+c.list.map(t=>'<li>'+esc(soft(t))+'</li>').join('')+'</ul>';
 if(c.q)h+='<div class="q">'+esc(c.q)+'</div>';
 if(c.adv&&c.adv.length){h+='<h3>'+D.ui.counsel+'</h3>';for(const a of c.adv){const ad=S.advs[a.a];if(ad)h+='<div class="adv"><b>'+esc(ad.n)+'</b> ('+esc(D.eth[ad.eth].n)+') '+U.urges+': '+esc(c.ch[a.i].l)+'</div>';}}
 h+='<div class="choices">'+c.ch.map((x,i)=>'<button class="ch" data-ch="'+i+'"'+(x.off?' disabled style="opacity:.5;cursor:default"':'')+'><span class="n">'+(i+1)+'.</span>'+esc(soft(x.l))+tiers(x.pv)+'</button>').join('')+'</div></div>';return h;}
/* ---------- peoples ---------- */
function peoples(){const l=lvl();let h='<div class="panel"><div class="seg">'+Object.keys(D.dims).map(d=>'<button data-dim="'+d+'" class="'+(d===dim?'on':'')+'">'+D.dims[d]+'</button>').join('')+'</div><p class="small">'+KW.lvl[l]+(E.fresh()?' <b>'+KW.fresh+'</b>':'')+(S.listen===S.turn?' <b>'+U.truth+'</b>':'')+'</p>';
 const rows=E.table(dim);for(const r of rows){const k=r.key+'|',id=r.key.split(':')[1],far=E.far(dim==='reg'?{[id]:1}:r.sub.reg),o=a=>({eth:dim==='eth'?id:null,attr:a,far});r.far=far;r.P={share:seen(k+'s',r.share,o('share')),pow:seen(k+'p',r.pow,o('pow')),w:seen(k+'w',r.w,o('w')),loy:seen(k+'l',r.loy,o('loy')),bel:seen(k+'b',r.bel,o('bel')),grv:seen(k+'g',r.grv,o('grv')),trend:r.trend};}
 const dot=r=>'<i style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px;background:'+col(dim,r.key.split(':')[1])+'"></i>';
 if(l<=1){rows.sort((a,b)=>b.P.share-a.P.share);for(const r of rows)h+='<div class="row" data-g="'+r.key+'" style="cursor:pointer;padding:6px 0;border-bottom:1px solid var(--line)">'+dot(r)+'<b>'+esc(r.name)+'</b><div class="small">'+fmt(U.gline,E.wordOf('share',r.P.share),E.wordOf('power',r.P.pow),E.wordOf('wealth',r.P.w),E.wordOf('loy',r.P.loy),E.wordOf('bel',r.P.bel),E.wordOf('grv',r.P.grv))+'</div></div>';h+='</div>';}
 else{rows.sort((a,b)=>sortK==='name'?sortD*a.name.localeCompare(b.name):sortD*(a.P[sortK]-b.P[sortK]));
  h+='<div class="scroll"><table><tr>'+Object.keys(U.cols).map(k=>'<th data-sort="'+k+'" class="'+(k===sortK?'s':'')+'">'+(k==='name'?D.dims[dim]:U.cols[k])+'</th>').join('')+'</tr>';
  for(const r of rows){const t=r.trend,P=r.P,sh=E.kn('heads')?R(r.share):(P.share<10?KW.under:fmt(KW.about,R(P.share/10)*10)),gh=r.grv+r.fr*0.6;
   h+='<tr class="row" data-g="'+r.key+'"><td>'+dot(r)+esc(r.name)+'</td><td>'+sh+'</td><td>'+(l>=3?R(r.pow):E.wordOf('power',P.pow))+'</td><td>'+(E.kn('wealth')?R(r.w):E.wordOf('wealth',P.w))+'</td><td>'+(l>=4?R(r.loy):E.wordOf('loy',P.loy))+'</td><td>'+(l>=4?R(r.bel):E.wordOf('bel',P.bel))+'</td><td>'+(l>=4?(r.fr>8&&S.listen!==S.turn?R(r.grv)+' to '+R(gh):R(r.grv)):E.wordOf('grv',P.grv))+'</td><td class="'+(t>0.5?'up':t<-0.5?'dn':'')+'">'+(t>0.5?'▲ ':t<-0.5?'▼ ':'')+(l>=4?sg(R(t*10)/10):'')+'</td></tr>';}
  h+='</table></div><p class="small">'+(l>=4&&rows.some(r=>r.fr>8)?'<b>'+KW.feared+'</b> ':'')+U.tblNote+'</p></div>';}
 const r=rows.find(x=>x.key===selG);
 if(r){const ad=dim==='eth'?E.src({eth:r.key.slice(4)}):null;h+='<div class="panel"><h2>'+esc(r.name)+'</h2>'+(l<4?'<p class="small">'+(dim==='eth'?(ad?fmt(KW.src,esc(ad.n)):KW.noSrc):'')+(r.far>1.3?' '+KW.far:'')+'</p>':'')+'<dl class="kv"><dt>'+U.coh+'</dt><dd>'+mt('coh',r.coh,4,r.key+'c')+'</dd><dt>'+U.mob+'</dt><dd>'+mt('mob',r.mob,4,r.key+'m')+'</dd></dl><h3>'+U.comp+'</h3>';
  for(const d2 in r.sub)h+='<div class="small">'+D.dims[d2]+'</div>'+bar(r.sub[d2],d2);
  const part=r.key,ms=S.mem.filter(m=>m.sel.split('+').indexOf(part)>=0||(part==='eth:'+D.core&&m.sel==='core'));
  h+='<h3>'+U.mems+'</h3>'+(ms.length?'<ul class="log">'+ms.map(m=>'<li class="'+(m.v>0?'up':'dn')+'">'+esc(m.t)+' <span class="small">'+esc(fmt(D.dx.when,D.ord[m.l],m.y))+' · '+(l>=4?sg(R(m.v)):KW.mem[Math.abs(m.v)<6?0:Math.abs(m.v)<13?1:2])+' · '+(m.p?U.never:U.fades)+'</span></li>').join('')+'</ul>':'<p class="small">'+U.noMem+'</p>');
  h+='<h3>'+U.causes+'</h3>'+causes(r.key)+'</div>';}
 return h;}
/* ---------- orders, lands, rivals, laws ---------- */
function orders(){let h='<p class="small">'+KW.lvl[lvl()]+(E.fresh()?' <b>'+KW.fresh+'</b>':'')+'</p>';const ct=E.ctrl();for(const id in S.org){const o=S.org[id];h+='<div class="panel'+(o.on?'':' dim')+'"><h2>'+esc(E.oname(id))+'</h2>';if(!o.on){h+='<p class="small">'+U.dormant+'</p></div>';continue;}
  h+='<dl class="kv"><dt>'+U.pw+'</dt><dd>'+mt('power',o.pow,3,id+'p',{org:id,attr:'pow'})+'</dd><dt>'+U.loy+'</dt><dd>'+mt('loy',o.loy,4,id+'l',{org:id,attr:'loy'})+'</dd><dt>'+U.dev+'</dt><dd>'+mt('dev',o.dev,3,id+'d',{org:id,attr:'dev'})+'</dd><dt>'+U.aut+'</dt><dd>'+mt('aut',o.aut,3,id+'a',{org:id,attr:'aut'})+'</dd></dl>'+(lvl()<4?'<p class="small">'+(E.src({org:id})?fmt(KW.srcO,esc(E.src({org:id}).n)):KW.noSrcO)+'</p>':'');
  h+='<h3>'+U.ranks+(o.closed?' ('+D.dx.closed+')':'')+'</h3>'+bar(o.comp,'eth');if(id===ct)h+='<p class="small">'+U.ctrlNow+'</p>';if(id===S.regent&&S.life>1)h+='<p class="small">'+U.regentNow+'</p>';
  h+='<h3>'+U.causes+'</h3>'+causes('o:'+id)+'</div>';}return h;}
function lands(){let h='';const ids=Object.keys(S.reg).sort((a,b)=>(S.reg[a].own==='p'?0:1)-(S.reg[b].own==='p'?0:1));
 for(const id of ids){const Rg=S.reg[id],mine=Rg.own==='p',m={};for(const p of S.pops)if(p.reg===id)m[p.eth]=(m[p.eth]||0)+p.size;
  h+='<div class="panel'+(mine?'':' dim')+'"><h2>'+esc(D.reg[id].n)+'</h2><div class="who">'+U.owner+' '+(mine?U.you:Rg.own==='free'?U.free:'the '+esc(D.riv[Rg.own].n))+(D.reg[id].home?' · '+U.home:'')+(mine&&Rg.fed?' · '+U.charter:'')+'</div>';
  if(mine&&!D.reg[id].home)h+='<dl class="kv"><dt>'+U.integ+'</dt><dd>'+mt('integ',Rg.integ,3,id+'i',{far:E.far({[id]:1})})+'</dd><dt>'+U.unrest+'</dt><dd>'+mt('unrest',Rg.unrest,3,id+'u',{far:E.far({[id]:1})})+'</dd></dl>'+(lvl()<3&&E.far({[id]:1})>1.3?'<p class="small">'+KW.far+'</p>':'');
  h+=bar(m,'eth');if(mine&&S.causes['reg:'+id])h+='<h3>'+U.causes+'</h3>'+causes('reg:'+id);h+='</div>';}return h;}
function rivals(){let h='';for(const id in S.riv){const v=S.riv[id],d=D.riv[id],k=E.grp('eth:'+d.kin);h+='<div class="panel'+(v.dead?' dim':'')+'"><h2>'+esc(d.n)+'</h2><p class="small">'+esc(d.d)+'</p>';
  if(v.dead)h+='<p>'+U.gone+'</p>';else{const ct=E.contact(id),lie=ct==='envoy'&&v.att<35;
   if(!ct)h+='<p class="small"><b>'+KW.rivNone+'</b></p>';
   else h+='<p class="small">'+(ct==='own'?KW.rivOwn:KW.rivEnvoy)+'</p><dl class="kv"><dt>'+U.att+'</dt><dd>'+(lvl()>=4?meter(v.att):'<b>'+E.wordOf('att',seen(id+'t',v.att,{sh:lie?18:0}))+'</b>')+'</dd><dt>'+U.str+'</dt><dd>'+(lvl()>=4?meter(v.str):'<b>'+E.wordOf('rel',clamp(50+(seen(id+'s',v.str,{sh:lie?15:0})-E.strength())*1.5))+'</b>')+'</dd><dt>'+U.kin+'</dt><dd>'+esc(D.eth[d.kin].n)+' ('+(k.size?(E.kn('heads')?R(k.share*100)+' in 100':E.wordOf('share',k.share*100))+' '+U.inRealm:U.kinNone)+')</dd></dl>';}
  h+='</div>';}return h;}
function laws(){let h='<div class="panel"><h2>'+U.lawsT+'</h2>';for(const l in D.laws){const o=D.laws[l].opts[S.law[l]],s=S.lawSrc[l];h+='<h3>'+esc(D.laws[l].n)+'</h3><div><b>'+esc(o.n)+'</b>'+(s?' <span class="small">'+esc(fmt(D.dx.when,D.ord[s.l],s.y))+'</span>':'')+'</div><div class="small">'+esc(o.d)+'</div>';}
 h+='</div><div class="panel"><h2>'+U.craftsT+'</h2><h3>'+U.have+'</h3><p>'+(Object.keys(S.tech).map(t=>esc(D.tech[t].n)).join(', ')||'-')+'</p><h3>'+U.next+'</h3>'+(E.nextTechs().map(t=>'<div><b>'+esc(D.tech[t].n)+'</b> <span class="small">'+(lvl()>=2?U.cost+' '+D.tech[t].k:(S.res.kno>=D.tech[t].k?U.reach:U.notYet))+'. '+esc(D.tech[t].d)+'</span></div>').join('')||'<p>-</p>')+'</div>';
 const T=S.tst;h+='<div class="panel"><h2>'+U.tstT+'</h2>'+((T.regent||T.sign!==null||T.proph||T.cache)?'<dl class="kv"><dt>'+U.tReg+'</dt><dd>'+(T.regent?esc(E.oname(T.regent)):'-')+'</dd><dt>'+U.tSign+'</dt><dd>'+(T.sign!==null?esc(D.signs[T.sign]):'-')+'</dd><dt>'+U.tProph+'</dt><dd>'+(T.proph?esc(D.eth[T.proph].n):'-')+'</dd><dt>'+U.tCache+'</dt><dd>'+(T.cache||'-')+'</dd></dl>':'<p class="small">'+U.tstNone+'</p>')+'</div>';return h;}
/* ---------- lives, chronicle ---------- */
function livesTbl(){let h='<div class="scroll"><table><tr>'+U.lh.map(x=>'<th>'+x+'</th>').join('')+'</tr>';const all=S.lives.slice();
 if(S.body&&(!S.over||true)&&!all.some(l=>l.n===S.life))all.push(Object.assign({n:S.life,died:null,cause:null},S.body,{start:S.body.rec?S.body.start:null}));
 for(const l of all)h+='<tr><td>'+l.n+'</td><td>'+esc(D.eth[l.eth].n)+'</td><td>'+esc(D.cls[l.cls].n)+'</td><td>'+esc(D.reg[l.reg].n)+'</td><td>'+(l.start!==null&&l.start!==undefined?l.start+' '+U.to+' '+(l.died||S.year):U.notRuled)+'</td><td>'+(l.died?l.died+' ('+l.age+')':U.now)+'</td><td>'+(l.cause?esc(D.cause[l.cause]):'')+'</td></tr>'+(l.legacy?'<tr><td></td><td colspan="6" class="small" style="text-align:left;white-space:normal">'+esc(l.legacy)+'</td></tr>':'');
 return h+'</table></div>';}
function lives(){let h='<div class="panel"><h2>'+U.livesT+'</h2>'+livesTbl()+'</div><div class="panel"><h2>'+U.advT+'</h2>';
 for(const a of S.advs)h+='<div><b>'+esc(a.n)+'</b> <span class="small">'+esc(E.oname(a.org))+', '+esc(D.eth[a.eth].n)+' · '+U.followed+' '+a.rec.fol+'/'+a.rec.n+(a.seen?' · '+D.L.lean[a.bias<0.3?0:a.bias<0.55?1:2]:'')+'</span></div>';
 if(S.pastAdvs.length){h+='<h3>'+U.advPast+'</h3>';for(const a of S.pastAdvs)h+='<div class="small">'+U.life+' '+a.life+': '+esc(a.n)+', '+esc(D.eth[a.eth].n)+' · '+U.followed+' '+a.rec.fol+'/'+a.rec.n+(a.seen?' · '+D.L.lean[a.bias<0.3?0:a.bias<0.55?1:2]:'')+'</div>';}
 return h+'</div>';}
function chronList(list){const by={};for(const c of S.chron)by[c.id]=c;return list.map(c=>'<div class="chron"><span class="y">'+c.y+'</span>'+esc(c.t)+(c.p&&by[c.p]?'<span class="be">'+U.because+': '+esc(by[c.p].t)+' ('+esc(fmt(D.dx.when,D.ord[by[c.p].l],by[c.p].y))+')</span>':'')+'</div>').join('');}
function chronicle(){return'<div class="panel"><h2>'+U.chronT+'</h2>'+chronList(S.chron.slice(-200).reverse())+'</div>';}
/* ---------- menu, start, end ---------- */
function menu(){let h='<div class="panel"><h2>'+U.menuT+'</h2>';if(S)h+='<p>'+U.seed+': <b>'+S.seed+'</b>. <span class="small">'+U.sameSeed+' '+U.saved+'</span></p>';
 h+='<p><label class="small">'+U.newSeed+'</label><input type="text" id="seed" value="'+(Math.floor(Math.random()*900000)+100000)+'"></p><p><button class="btn" data-act="new">'+U.begin+'</button> '+(!S&&hasSave()?'<button class="btn" data-act="load">'+U.cont+'</button> ':'')+'<button class="btn" data-act="theme">'+U.theme+'</button></p>';
 h+='<p>'+(S?'<button class="btn" data-act="exp">'+U.exp+'</button> ':'')+'<button class="btn" data-act="imp">'+U.imp+'</button> <button class="btn" data-act="copy">'+U.copy+'</button></p><textarea id="io" rows="4" spellcheck="false">'+esc(expTxt)+'</textarea>'+(note?'<p class="small">'+esc(note)+'</p>':'');
 h+='<p><button class="btn" data-act="dbg">'+U.dbg+'</button></p>'+(dbgOut?'<pre>'+esc(dbgOut)+'</pre>':'')+'<p class="small">'+U.keys+'</p></div>';return h;}
function startScreen(){return'<div class="panel"><h2>'+esc(D.title)+'</h2><div class="who">'+U.sub+'</div><div class="txt">'+esc(D.bx.intro)+'\n\n'+esc(D.bx.goal)+'</div></div>'+menu();}
function endScreen(){const o=S.over,d=D.end[o.type];let h='<div class="panel"><h3 style="margin-top:0">'+U.endT+' · '+U.year+' '+o.year+' · '+U.life+' '+o.life+'</h3><h2>'+esc(d.n)+'</h2><div class="txt">'+esc(d.x)+'</div>';
 h+='<h3>'+U.score+'</h3><table>'+o.score.parts.map(p=>'<tr><td>'+esc(p[0])+'</td><td>'+p[1]+'</td></tr>').join('')+'<tr><td><b>'+U.total+'</b></td><td><b>'+o.score.total+'</b></td></tr></table></div>';
 h+='<div class="panel"><h2>'+U.livesT+'</h2>'+livesTbl()+'</div>';
 const ch=E.chains();h+='<div class="panel"><h2>'+U.chains+'</h2>'+(ch.length?ch.map(p=>'<ol class="log">'+p.map(c=>'<li>'+esc(c.t)+' <span class="small">'+esc(fmt(D.dx.when,D.ord[c.l],c.y))+'</span></li>').join('')+'</ol>').join('<hr style="border:0;border-top:1px solid var(--line)">'):'<p class="small">'+U.noChain+'</p>')+'</div>';
 const pc=x=>R(x*100)+'%',all=S.pastAdvs.concat(S.advs.map(a=>Object.assign({life:S.life},a)));
 h+='<div class="panel"><h2>'+U.advRec+'</h2><div class="scroll"><table><tr>'+U.advH.map(x=>'<th>'+x+'</th>').join('')+'</tr>'+all.map(a=>{const n=a.rec.n||1;return'<tr><td>'+esc(a.n)+' <span class="small">'+esc(D.eth[a.eth].n)+'</span></td><td>'+a.life+'</td><td>'+pc(a.bias)+'</td><td>'+pc(a.acc)+'</td><td>'+pc(a.rec.sound/n)+'</td><td>'+pc(a.rec.self/n)+'</td><td>'+a.rec.fol+'/'+a.rec.n+'</td></tr>';}).join('')+'</table></div></div>';
 h+='<div class="panel"><h2>'+U.chronT+'</h2>'+chronList(S.chron)+'</div>';return h;}
/* ---------- render and input ---------- */
function bandView(){const B=S.band;let h='<div class="panel"><h2>'+D.bx.bandT+'</h2><p class="small">'+KW.lvl[0]+'</p><dl class="kv">';for(const k of['people','food','bond','belief','lore','chant','rift'])h+='<dt>'+D.bres[k]+'</dt><dd>'+'<b>'+(k==='people'?fmt(KW.about,R(B[k]/5)*5):wd({food:'stores',bond:'bond',belief:'bel',lore:'know',chant:'chant',rift:'rift'}[k],B[k]))+'</b></dd>';
 h+='</dl><h3>'+D.bx.you+'</h3><dl class="kv"><dt>'+D.bres.standing+'</dt><dd><b>'+wd('standing',B.standing)+'</b></dd><dt>'+D.bx.marks+'</dt><dd>'+B.marks+'</dd><dt>'+D.bx.skill+'</dt><dd>'+B.skill+'</dd></dl><h3>'+D.ui.counsel+'</h3><dl class="kv">';
 for(const r in B.roles)h+='<dt>'+esc(B.roles[r].n)+', '+D.broles[r]+'</dt><dd><b>'+wd('att',B.roles[r].att)+'</b> '+D.bx.att+'</dd>';h+='</dl></div><div class="panel"><h2>'+D.bx.grounds+'</h2>';
 for(const g in D.grounds)h+='<h3>'+esc(D.grounds[g].n)+(g===B.ground?' ·':'')+'</h3><div class="small">'+esc(D.grounds[g].d)+'</div>';return h+'</div>';}
const VIEWS={court:court,peoples:peoples,orders:orders,lands:lands,rivals:rivals,laws:laws,lives:lives,chronicle:chronicle,menu:menu,band:bandView};
function render(top){let h=header()+'<main>';if(!S)h+=startScreen();else h+=VIEWS[tab]();app.innerHTML=h+'</main>';if(top)window.scrollTo(0,0);}
function choose(i){if(!S||!S.cur||!S.cur.ch||!S.cur.ch[i])return;if(S.cur.ch[i].off)return;E.choose(i);save();tab='court';render(true);}
function runDebug(){dbgOut=U.dbgRun;render();setTimeout(function(){const keep=S?JSON.stringify(S):null;let out;try{out=DBG.runBand(500)+'\n\nFULL GAME (120 games, not yet rebalanced for the new opening)\n'+DBG.run(120);}catch(e){out='Self-test failed: '+e.message;}S=keep?JSON.parse(keep):null;dbgOut=out;render();},60);}
app.addEventListener('click',function(e){const t=e.target.closest('[data-ch],[data-tab],[data-dim],[data-sort],[data-g],[data-act]');if(!t)return;const ds=t.dataset;
 if(ds.ch!==undefined)choose(+ds.ch);else if(ds.tab!==undefined){tab=ds.tab;note='';render(true);}else if(ds.dim){dim=ds.dim;selG=null;render();}
 else if(ds.sort){if(sortK===ds.sort)sortD=-sortD;else{sortK=ds.sort;sortD=ds.sort==='name'?1:-1;}render();}else if(ds.g){selG=selG===ds.g?null:ds.g;render();}
 else if(ds.act){const io=document.getElementById('io'),a=ds.act;
  if(a==='new'){if(S&&!S.over&&!pendNew){pendNew=true;note=U.confirmNew;render();return;}pendNew=false;const sd=parseInt((document.getElementById('seed')||{}).value,10)||Math.floor(Math.random()*1e6);E.newGame(sd);save();tab='court';note='';render(true);}
  else if(a==='load'){if(load()){tab='court';render(true);}}else if(a==='theme'){theme(true);}
  else if(a==='exp'){try{expTxt=btoa(unescape(encodeURIComponent(JSON.stringify(S))));}catch(x){expTxt='';}note='';render();const el=document.getElementById('io');if(el){el.focus();el.select();}}
  else if(a==='imp'){try{const o=JSON.parse(decodeURIComponent(escape(atob(io.value.trim()))));if(!o||o.v!==1||!o.pops)throw 0;S=o;save();tab='court';note='';expTxt='';render(true);}catch(x){note=U.badImp;expTxt=io.value;render();}}
  else if(a==='copy'){const v=io.value;try{navigator.clipboard.writeText(v).then(function(){note=U.copied;expTxt=v;render();},function(){io.select();});}catch(x){io.select();}}
  else if(a==='dbg')runDebug();}});
document.addEventListener('keydown',function(e){const tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||e.ctrlKey||e.metaKey||e.altKey)return;if(!S||tab!=='court'||!S.cur||!S.cur.ch)return;
 if(e.key>='1'&&e.key<='9'){choose(+e.key-1);e.preventDefault();}else if(e.key==='Enter'&&S.cur.ch.length===1){choose(0);e.preventDefault();}});
theme(false);if(/[?&]debug=1/.test(location.search)||location.hash==='#debug'){load();tab='menu';render();runDebug();}else{load();render();}
})();
