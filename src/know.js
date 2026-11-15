/* ===================== DATA + ENGINE: what the ruler can know =====================
 Level 0 band (eyes and ears), 1 no writing, 2 tallies (writing), 3 registers (schools or the Great Count), 4 statistics (printing).
 Below the level at which a thing is counted, the player sees words, and impressions carry error. */
D.kw={up:['rises slightly','rises','rises much','rises greatly'],dn:['falls slightly','falls','falls much','falls greatly'],
odds:['Probably not','Perhaps','As likely as not','More likely than not','Almost surely'],
helps:['counts heavily against you','counts against you','counts a little against you','helps a little','helps','helps greatly'],
mix:['mostly','many','some','a few'],
stores:['bare','thin','fair','ample','overflowing'],order:['breaking','brittle','holding','firm','unshakeable'],legit:['doubted','questioned','accepted','revered','sacred'],know:['little','some','much','deep','vast'],
share:['a handful','few','some','many','most'],power:['negligible','weak','middling','strong','dominant'],wealth:['destitute','poor','modest','comfortable','rich'],
loy:['hostile','sullen','wary','loyal','devoted'],bel:['scoffing','doubting','unsure','believing','fervent'],grv:['content','grumbling','aggrieved','bitter','seething'],
dev:['indifferent','lukewarm','dutiful','devout','zealous'],aut:['obedient','biddable','self-willed','entrenched','a law unto itself'],
integ:['foreign','uneasy','settling','bound','at home'],unrest:['quiet','restless','tense','angry','in ferment'],att:['hostile','cold','wary','friendly','warm'],
rel:['far weaker than you','weaker than you','a match for you','stronger than you','far stronger than you'],
bond:['fraying','strained','steady','close','as one'],chant:['unsung','in fragments','sung','well kept','on every tongue'],standing:['ignored','tolerated','heard','heeded','followed'],rift:['none','murmurs','rivalry','bitterness','two peoples'],
coh:['scattered','loose','knit','tight','as one'],mob:['inert','slow','stirring','ready','poised'],mem:['faintly','keenly','bitterly'],
proof:['next to nothing','a little','a fair showing','a strong showing','beyond doubt'],gap:['would hold','is nearly enough','falls some way short','falls far short'],
margin:['Your claim fails badly.','Your claim falls short.','Your claim barely holds.','Your claim holds.','Your claim is beyond dispute.'],
chantKept:['The chant was almost lost.','The chant survived in fragments.','The chant was worn but sung.','The chant was sung nearly whole.'],
about:'about {0}',under:'under 10',rose:'rose',fell:'fell',
lvl:['You know what you see and what you are told. Impressions can be wrong.','Nothing is written. You know your peoples as a chief does: by faces, rumour and feasts. Impressions can be wrong.','Tallies are kept. Stores are counted and headcounts are rough. Moods are hearsay.','Registers are kept. Numbers, wealth and offices are counted. Moods are still judged by ear.','Printing and surveys: the realm can be measured.'],
dOrg:['grew stronger','weakened','became more its own master','became more biddable','warmed to your memory','cooled toward your memory'],dOrgT:'The {0} {1}.',dMore:'The {0} became more numerous among your subjects.',dLess:'The {0} became fewer among your subjects.',
dRes:['The stores are fuller.','The stores are emptier.','Order is firmer.','Order is looser.'],dBelUp:'Belief in your return deepened.',dBelDn:'Belief in your return thinned.',
orgMile:'The {0} is now filled mostly with {1}.',openLow:'Now mostly {0}. Its ranks shift toward the realm\'s mix. Loyalty falls, autonomy falls slightly.'};
D.kwt={share:[4,12,25,50],power:[5,12,25,45],wealth:[10,20,32,48],loy:[25,40,52,65],bel:[15,30,48,65],grv:[25,38,50,62],unrest:[25,38,50,62],proof:[6,12,20,28]};
E.know=function(){if(!S||S.era===0)return 0;return 1+(S.tech.writing?1:0)+((S.tech.schools||S.flags.counted)?1:0)+(S.tech.press?1:0);};
E.wordOf=function(scale,v){const a=D.kw[scale],t=D.kwt[scale]||[20,40,60,80];let i=0;while(i<t.length&&v>=t[i])i++;return a[Math.min(i,a.length-1)];};
E.oddsW=p=>D.kw.odds[p>=0.75?4:p>=0.55?3:p>=0.45?2:p>=0.25?1:0];
E.helpsW=v=>D.kw.helps[v<=-12?0:v<=-5?1:v<0?2:v<5?3:v<12?4:5];
E.exactAt={Treasury:2,Food:2,Knowledge:2,Order:3,Charisma:3,Tradition:3,Law:3,Renown:3,power:3,devotion:3,autonomy:3,attitude:3,strength:3,integration:3,unrest:3};
E.soft=function(t,lv){lv=lv===undefined?E.know():lv;if(lv>=4||!t)return t;
 t=t.replace(/([A-Za-z]+) ([+-])(\d+(?:\.\d+)?)%?/g,(m,w,s,n)=>{if(lv>0&&(E.exactAt[w]||4)<=lv)return m;const v=+n,i=v<4?0:v<9?1:v<15?2:3;return w+' '+(s==='+'?D.kw.up:D.kw.dn)[i];});
 return t.replace(/(\d+) in 100/g,(m,n)=>lv>=2?'about '+Math.max(1,Math.round(n/10))+' in 10':E.oddsW(n/100));};
E.diffW=function(b){const out=[],K=D.kw,now=E.snapState();
 for(const id in S.org){if(!S.org[id].on||!b.o[id])continue;const dp=now.o[id].pow-b.o[id].pow,da=now.o[id].aut-b.o[id].aut,dl=now.o[id].loy-b.o[id].loy,w=[];
  if(Math.abs(dp)>=6)w.push(K.dOrg[dp>0?0:1]);if(Math.abs(da)>=10)w.push(K.dOrg[da>0?2:3]);if(Math.abs(dl)>=10)w.push(K.dOrg[dl>0?4:5]);if(w.length)out.push(fmt(K.dOrgT,E.oname(id),w.join(' and '))+(id===S.regent?' '+D.dx.dReg:''));}
 for(const d of['eth','lang','rel'])for(const k in now[d]){const a=(b[d][k]||0)*100,c=now[d][k]*100;if(Math.abs(c-a)>=4)out.push(fmt(c>a?K.dMore:K.dLess,D[d][k].n));}
 if(Math.abs(S.res.tre-b.res.tre)+Math.abs(S.res.food-b.res.food)>=12)out.push(K.dRes[(S.res.tre+S.res.food)>(b.res.tre+b.res.food)?0:1]);if(Math.abs(S.res.ord-b.res.ord)>=8)out.push(K.dRes[S.res.ord>b.res.ord?2:3]);
 if(Math.abs(now.bel-b.bel)>=4)out.push(now.bel>b.bel?K.dBelUp:K.dBelDn);return out;};
/* ---------- sources of knowledge: counsellors, distance, the regents' account, rivals ---------- */
Object.assign(D.kw,{src:'You hear of them through {0}.',srcO:'Your eyes inside it: {0}.',noSrc:'No one at your court speaks for them. You go by rumour.',noSrcO:'You have no one inside it. You go by rumour.',far:'They live far from your seat, in lands not yet bound to it. Word is thin.',
fresh:'You have only just returned. You know what the regents choose to tell you.',feared:'Under fear, people tell your surveyors what is safe. The true figure lies somewhere in the range.',
rivNone:'No one at your court has been there. You know only what travellers say.',rivEnvoy:'Their own envoys are your only window, and envoys say what serves their master.',rivOwn:'Your own people travel there and report.',
brief:{title:'What the Regents Tell You',who:'The {0}, rendering account',x:'They have had the seat for half a generation and they have had time to prepare this. You have no means, yet, of checking any of it.',
 t:['their own conduct','the stores','the mood of the peoples','the Search'],self:'"The {0} kept the seat warm and took nothing for itself."',selfBad:'"The {0} had to take much into its own hands. You will find it changed."',
 tre:'"The stores are as you left them."',treBad:'"The stores are lower than you left them. The years were hard."',mood:'"The {0} are content."',moodBad:'"The {0} are restless, and have been for years."',
 search:'"The {0} searched for you without rest."',searchBad:'"The {0} was slow to search. There were those who preferred the seat empty."',
 caught:'You have now seen for yourself: what the regents told you about {0} was false.',honest:'You have now seen for yourself: the regents\' account was true.'}});
E.lv=()=>(!S||S.over)?4:Math.min(4,E.know()+(S.listen===S.turn&&S.era>0?1:0));
E.fresh=()=>!!(S&&S.era>0&&S.life>(S.life0||0)+1&&S.body&&S.body.rec&&S.ruleTurn!==undefined&&S.turn-S.ruleTurn<2);
(function(){const k0=E.know;E.know=function(){const l=k0();return l>1&&E.fresh()?l-1:l;};})();
E.kn=function(topic){const l=E.lv();if(l>=3)return true;if(l<2)return false;return topic==='heads'?(S.law.tax==='head'||S.law.rec==='all'):topic==='wealth'?S.law.tax==='head':false;};
E.src=function(o){if(!o||!S.advs)return null;if(o.org)return S.advs.find(a=>a.org===o.org)||null;if(o.eth)return S.advs.find(a=>a.eth===o.eth)||null;return null;};
E.far=function(m){let t=0,f=0;for(const r in m){const R=S.reg[r];if(!R)continue;const i=D.reg[r].home?100:R.integ;let x=i<60?1+(60-i)/40:1;if(R.fed&&!D.reg[r].home)x*=1.2;f+=x*m[r];t+=m[r];}f=t?f/t:1;return S.tech.roads?1+(f-1)*0.6:f;};
E.seen=function(key,v,o){const lv=E.lv();let a=lv<=1?9:lv===2?5:lv===3?3:0;if(!a||S.listen===S.turn)return v;o=o||{};let sh=0;
 if(o.org||o.eth){const ad=E.src(o);if(ad){a*=0.45;const d=o.org?{loy:1,aut:-1,pow:-0.6,dev:0.6}[o.attr]:{grv:1,w:-0.8,loy:0.5,pow:-0.5}[o.attr];sh=(d||0)*ad.bias*12;}else a*=1.5;}
 if(o.far)a*=o.far;if(o.org&&o.org===S.regent&&E.fresh())sh+=({loy:10,aut:-12,dev:8}[o.attr]||0);if(o.sh)sh+=o.sh;
 return clamp(v+sh+(DBG.h(key+'|'+S.seed+'|'+S.life)-0.5)*2*a);};
E.contact=function(id){if(E.lv()>=4||S.advs.some(a=>a.org==='merch'||a.eth===D.riv[id].kin))return'own';const v=S.riv[id];return v.seen!==undefined&&S.turn-v.seen<=6?'envoy':null;};
E.brief=function(){const pre=S.pre,rg=S.regent;S.pre=null;if(!pre||S.era<1||!S.org[rg]){E.startTurn();return;}const o=S.org[rg],K=D.kw.brief,p=clamp(0.15+o.aut/120-o.loy/250,0.05,0.85),lines=[],lies=[];
 const say=(i,bad,good,badTx)=>{if(bad&&E.rng()<p){lines.push(good);lies.push(K.t[i]);}else lines.push(bad?badTx:good);};
 say(0,o.aut-(pre.aut[rg]||0)>=8,fmt(K.self,E.oname(rg)),fmt(K.selfBad,E.oname(rg)));say(1,S.res.tre<pre.tre-8,K.tre,K.treBad);
 const r=E.table('eth').sort((a,b)=>b.tg-a.tg)[0];if(r)say(2,r.tg>=45,fmt(K.mood,r.name),fmt(K.moodBad,r.name));const c=E.ctrl();if(c)say(3,S.org[c].dev<50,fmt(K.search,E.oname(c)),fmt(K.searchBad,E.oname(c)));
 S.lies=lies;S.st.brief=(S.st.brief||0)+1;S.st.lies=(S.st.lies||0)+lies.length;
 S.cur={kind:'cont',t:K.title,who:fmt(K.who,E.oname(rg)),x:K.x,list:lines,q:'',ch:[{l:D.ui.cont}],next:'turn'};};
(function(){const st0=E.startTurn,in0=E.interregnum;
 E.startTurn=function(){if(S.lies&&S.ruleTurn!==undefined&&S.turn-S.ruleTurn>=2){const K=D.kw.brief;if(S.lies.length)for(const t of S.lies)E.say(fmt(K.caught,t));else E.say(K.honest);S.lies=null;}st0();};
 E.interregnum=function(){const a={};for(const id in S.org)a[id]=S.org[id].aut;S.pre={aut:a,tre:S.res.tre};in0();};})();
