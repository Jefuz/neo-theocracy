/* ===================== ENGINE: cards, council, directives, lives ===================== */
E.val=function(path){const a=path.split('.');if(a[0]==='r')return a[1] in S.leg?S.leg[a[1]]:S.res[a[1]];if(a[0]==='o')return S.org[a[1]][a[2]];if(a[0]==='v')return S.riv[a[1]][a[2]];
 if(a[0]==='g'){const g=E.grp(a[1]);return g.size?g[a[2]]:(a[2]==='loy'?50:0);}if(path==='lives')return S.life;if(path==='age')return S.body.age;if(path==='regions')return E.nreg();return 0;};
E.cond=function(c){if(!c)return true;if(c.min)for(const k in c.min)if(E.val(k)<c.min[k])return false;if(c.max)for(const k in c.max)if(E.val(k)>c.max[k])return false;
 if(c.flag)for(const f of c.flag)if(!S.flags[f])return false;if(c.nflag)for(const f of c.nflag)if(S.flags[f])return false;if(c.tech)for(const t of c.tech)if(!S.tech[t])return false;
 if(c.cls&&c.cls.indexOf(S.body.cls)<0)return false;if(c.foreignTongue&&D.lang[S.body.lang].fam==='kal')return false;return true;};
/* ---------- template pickers: who is the actor, given the state? ---------- */
(function(){const rowCtx=r=>({g:r.key,gn:r.name,e:r.key.split(':')[1],en:r.name,pct:Math.round(r.share)});
 const top=(rows,f)=>{rows.sort((a,b)=>f(b)-f(a));return rows.length?rows[0]:null;};
 const regCtx=function(max){let b=null,m=max;for(const id in S.reg){const R=S.reg[id];if(R.own==='p'&&!D.reg[id].home&&R.integ<m){m=R.integ;b=id;}}if(!b)return null;const me=E.major(b,'eth');return{r:b,rn:D.reg[b].n,g:'eth:'+me+'+reg:'+b,gn:D.eth[me].n,e:me,en:D.eth[me].n};};
 const memCtx=function(neg){let bi=-1,bv=7.9;S.mem.forEach((m,i)=>{const v=neg?-m.v:m.v;if(v>bv&&!(S.cool['m'+m.y+m.sel]>S.turn)&&m.l<=S.life&&S.year-m.y>=10&&E.sel(m.sel).length){bv=v;bi=i;}});if(bi<0)return null;const m=S.mem[bi];
  return{mem:bi,g:m.sel,gn:E.gname(m.sel),e:(m.sel.match(/eth:(\w+)/)||[])[1],mt:m.t,mlo:D.ord[m.l],my:m.y,_p:m.cid,_ck:'m'+m.y+m.sel};};
 E.picks={
 any:()=>({}),forced:()=>null,
 anyRival:()=>{const a=Object.keys(S.riv).filter(x=>!S.riv[x].dead);if(!a.length)return null;const v=E.pick(a);return{v,vn:D.riv[v].n};},
 newReg:()=>regCtx(62),lowInteg:()=>regCtx(40),
 aggrEth:()=>{const r=top(E.table('eth').filter(r=>r.key!=='eth:'+D.core&&r.share>=5&&r.tg>=40),r=>r.tg);return r?rowCtx(r):null;},
 underrep:()=>{const c=S.org.council.comp;const r=top(E.table('eth').filter(r=>r.share>=10&&(c[r.key.slice(4)]||0)<r.share/200),r=>r.share);return r?Object.assign(rowCtx(r),{o:'council',on:E.oname('council'),_p:(S.lawSrc.lang||{}).cid}):null;},
 blockedLang:()=>{if(S.law.lang!=='kaldic')return null;const r=top(E.table('lang').filter(r=>D.lang[r.key.slice(5)].fam!=='kal'&&r.share>=5),r=>r.share);return r?Object.assign(rowCtx(r),{_p:(S.lawSrc.lang||{}).cid}):null;},
 minorityRel:()=>{const r=top(E.table('rel').filter(r=>D.rel[r.key.slice(4)].fam!=='ret'&&r.share>=5),r=>r.tg);return r?Object.assign(rowCtx(r),{_p:(S.lawSrc.rel||{}).cid}):null;},
 orgDom:()=>{const es=E.shares('eth');for(const id of['council','army','priest','school','merch']){const o=S.org[id];if(!o.on)continue;const d=E.dom(o);if(d.s>=0.65&&(es[d.e]||0)<d.s-0.2)return{o:id,on:E.oname(id),e:d.e,en:D.eth[d.e].n,pct:Math.round(d.s*100),_p:(S.lawSrc[id==='army'?'rec':id==='priest'?'rel':'lang']||{}).cid};}return null;},
 armyDom:()=>{const d=E.dom(S.org.army),g=E.grp('eth:'+d.e);return g.size&&(g.loy<46||S.org.army.loy<42)?{e:d.e,en:D.eth[d.e].n,_p:(S.lawSrc.rec||{}).cid}:null;},
 kin:()=>{for(const v in S.riv){if(S.riv[v].dead)continue;const k=D.riv[v].kin,g=E.grp('eth:'+k);if(g.size>0&&g.grv>=40)return{v,vn:D.riv[v].n,g:'eth:'+k,gn:D.eth[k].n,e:k};}return null;},
 memNeg:()=>memCtx(true),memPos:()=>memCtx(false),
 richCls:()=>{const r=top(E.table('cls').filter(r=>(r.key==='cls:merchant'||r.key==='cls:artisan')&&r.w>=38&&r.share>=5),r=>r.w);return r?rowCtx(r):null;},
 poorCls:()=>{const r=top(E.table('cls').filter(r=>(r.key==='cls:farmer'||r.key==='cls:bonded'||r.key==='cls:herder')&&r.tg>=38),r=>r.tg);return r?rowCtx(r):null;},
 priestAut:()=>S.org.priest.aut>=42?{o:'priest',on:E.oname('priest')}:null,
 councilAut:()=>S.org.council.aut>=42?{o:'council',on:E.oname('council')}:null,
 believers:()=>{const r=top(E.table('eth').filter(r=>r.bel>=50),r=>r.bel);if(!r)return null;const e=r.key.slice(4);let b=null,m=0;for(const p of E.own())if(p.eth===e&&p.size>m&&p.reg!==S.lastVisit){m=p.size;b=p.reg;}return b?Object.assign(rowCtx(r),{r:b,rn:D.reg[b].n}):null;},
 skeptics:()=>{const r=top(E.table('eth').filter(r=>r.share>=5&&r.bel<=24),r=>-r.bel);return r?rowCtx(r):null;},
 border:()=>{const r=E.borderReg();if(!r)return null;for(const v in S.riv)if(!S.riv[v].dead&&S.riv[v].att<42)return{v,vn:D.riv[v].n,r,rn:D.reg[r].n};return null;},
 rivalFriend:()=>{let a=null,b=null;for(const v in S.riv){if(S.riv[v].dead)continue;if(S.riv[v].att>=58&&!a)a=v;else if(S.riv[v].att<45&&!b)b=v;}return a&&b?{v:a,vn:D.riv[a].n,v2:b,v2n:D.riv[b].n}:null;},
 twoAdv:()=>S.advs.length>=2?{a1:S.advs[0].n,a2:S.advs[1].n,o1:S.advs[0].org,o2:S.advs[1].org}:null,
 assim:()=>{const own=E.own(),t={},k={};let tot=0;for(const p of own){tot+=p.size;if(p.eth===D.core)continue;t[p.eth]=(t[p.eth]||0)+p.size;if(p.lang==='kal'&&D.rel[p.rel].fam==='ret')k[p.eth]=(k[p.eth]||0)+p.size;}
  for(const e in t)if(t[e]/tot>=0.03&&(k[e]||0)/t[e]>=0.12)return{g:'eth:'+e,gn:D.eth[e].n,e,en:D.eth[e].n,_p:(S.lawSrc.cit||{}).cid};return null;},
 mixed:()=>{for(const id in S.reg){if(S.reg[id].own!=='p')continue;const c={};let t=0;for(const p of S.pops)if(p.reg===id){c[p.eth]=(c[p.eth]||0)+p.size;t+=p.size;}const es=Object.keys(c).filter(e=>c[e]/t>=0.22).sort((a,b)=>c[b]-c[a]);
  if(es.length>=2)return{r:id,rn:D.reg[id].n,g:'eth:'+es[0]+'+reg:'+id,gn:D.eth[es[0]].n,g2:'eth:'+es[1]+'+reg:'+id,g2n:D.eth[es[1]].n};}return null;},
 birth:()=>(S.life>1&&(S.body.eth!==D.core||['bonded','farmer','herder'].indexOf(S.body.cls)>=0))?{g:'birth',gn:D.eth[S.body.eth].n}:null,
 birthLang:()=>D.lang[S.body.lang].fam!=='kal'?{}:null,
 shifted:()=>{const r=top(E.table('lang').filter(r=>r.key!=='lang:kal'&&r.share>=3&&(S.causes[r.key]||[]).some(c=>c.ty==='ls'&&c.d<-1.5)),r=>r.share);return r?Object.assign(rowCtx(r),{_p:(S.lawSrc.lang||{}).cid}):null;},
 otherOrg:()=>{const a=Object.keys(S.org).filter(o=>S.org[o].on&&o!==S.regent);const o=E.pick(a);return{o,on:E.oname(o)};},
 ctrlAut:()=>{const c=E.ctrl();return c&&S.org[c].aut>=40?{}:null;},
 regDom:()=>{const d=E.dom(S.org[S.regent]);return{e:d.e,en:D.eth[d.e].n};}
 };})();
/* ---------- advisors ---------- */
E.newAdvs=function(){for(const a of S.advs)S.pastAdvs.push(Object.assign({life:S.lives.length},a));S.advs=[];
 const orgs=['army','priest','council','noble','merch'].filter(o=>S.org[o].on);for(let i=orgs.length-1;i>0;i--){const j=E.ri(0,i);const t=orgs[i];orgs[i]=orgs[j];orgs[j]=t;}
 const n=3+(E.rng()<0.5?1:0),usedE={},usedN={};
 for(const o of orgs){if(S.advs.length>=n)break;const comp=S.org[o].comp;const e=E.wpick(Object.keys(comp),k=>usedE[k]?comp[k]*0.15:comp[k])||D.core;usedE[e]=1;
  let nm=E.pick(D.names[D.eth[e].fam]),g=0;while(usedN[nm]&&g++<8)nm=E.pick(D.names[D.eth[e].fam]);usedN[nm]=1;
  S.advs.push({n:nm+' '+D.dx.advT[o],org:o,eth:e,bias:0.15+E.rng()*0.6,acc:0.4+E.rng()*0.5,rec:{n:0,fol:0,sound:0,self:0}});}};
E.fxS=function(fx,ctx,f,hid){let s=0;for(let st of fx.split(';')){st=st.trim();if(!st)continue;if(st[0]==='?'){if(!hid)continue;st=st.slice(1).trim();}st=st.replace(/\$(\w+)/g,(m,k)=>ctx[k]!==undefined?ctx[k]:m);if(st.indexOf('$')>=0)continue;s+=f(st.split(/\s+/))||0;}return s;};
E.fxScore=function(c,ctx,src,f,hid){let s=E.fxS(E.fill(c.fx||'',ctx,src),ctx,f,hid);if(c.ch)for(const b of c.ch)s+=b[0]*E.fxS(E.fill(b[1],ctx,src),ctx,f,hid);return s;};
E.need=(lv,lo,hi)=>clamp(1+(50-lv)/30,lo||0.3,hi||2.2);
E.soundF=function(a){const k=a[0],N=E.need;
 if(k==='r'){const r=a[1],lv=r in S.leg?S.leg[r]:S.res[r];return(+a[2])*({tre:.5,food:.5,ord:.7,kno:.5,cha:.35,tra:.3,leg:.35}[r]||0)*(r==='kno'?1:r==='tre'?N(lv+20):N(lv));}
 if(k==='g'){const g=E.grp(a[1]),n=+a[3],at=a[2],w=0.25+g.share*2;if(at==='loy')return n*w*0.5*N(g.loy);if(at==='bel')return n*w*0.25*N(g.bel+10);if(at==='grv')return-n*w*0.6*(0.4+g.grv/45);if(at==='w')return n*w*0.2;if(at==='fear')return-n*w*0.15;if(at==='size')return n*w;return 0;}
 if(k==='o'){const o=S.org[a[1]],n=+a[3],at=a[2];if(!o||!o.on)return 0;if(at==='loy')return n*0.3*N(o.loy,0.3,3);if(at==='pow')return n*0.08;if(at==='dev')return n*0.25*N(o.dev);if(at==='aut')return-n*0.2*(0.2+o.aut/40);return 0;}
 if(k==='m')return(+a[2])*0.2*(a[3]==='p'?2:1);if(k==='v')return a[2]==='att'&&S.riv[a[1]]?(+a[3])*0.12*N(S.riv[a[1]].att):0;
 if(k==='reg'){const R=S.reg[a[1]];if(!R)return 0;return a[2]==='integ'?(+a[3])*0.3*N(R.integ):-(+a[3])*0.2*(0.4+R.unrest/45);}
 if(k==='x'){if(a[1]==='recog')return(+a[2])*0.3*(1+S.falseCount);if(a[1]==='claim')return-(+a[2])*0.3;if(a[1]==='secede')return-8;if(a[1]==='heal')return 3;}return 0;};
E.selfF=function(ad){return function(a){const k=a[0];
 if(k==='g'){const s=a[1];if(s.indexOf('eth:'+ad.eth)>=0||(s==='core'&&ad.eth===D.core))return(+a[3])*({loy:.3,w:1,grv:-.6,fear:-1,size:1}[a[2]]||0);return 0;}
 if(k==='o')return a[1]===ad.org?(+a[3])*({pow:1,aut:1,loy:.3}[a[2]]||0):0;if(k==='c')return a[1]===ad.org?(a[2]===ad.eth?(+a[3])*0.5:-(+a[3])*0.3):0;
 if(k==='m')return a[1].indexOf('eth:'+ad.eth)>=0?(+a[2])*0.5:0;if(k==='x'&&a[2]===ad.org)return a[1]==='open'?-5:a[1]==='close'?5:0;return 0;};};
E.advise=function(ev,ctx,src){if(!S.advs.length||ev.ch.length<2)return[];const so=ev.ch.map(c=>E.fxScore(c,ctx,src,E.soundF,true));const bs=so.indexOf(Math.max(...so));const out=[];
 for(const ad of S.advs){const se=ev.ch.map(c=>E.fxScore(c,ctx,src,E.selfF(ad),true));const mx=Math.max(...se),mn=Math.min(...se),bi=se.indexOf(mx);let i;const r=E.rng(),r2=E.rng();
  if(mx-mn>0.5&&r<ad.bias)i=bi;else if(r2<ad.acc)i=bs;else i=E.ri(0,ev.ch.length-1);out.push({a:S.advs.indexOf(ad),i,snd:i===bs?1:0,slf:(i===bi&&bi!==bs&&mx-mn>0.5)?1:0});}return out;};
/* ---------- council ---------- */
E.describe=function(st,ctx){st=st.replace(/\$(\w+)/g,(m,k)=>ctx&&ctx[k]!==undefined?ctx[k]:m);if(st.indexOf('$')>=0)return'';const a=st.split(/\s+/),k=a[0],X=D.dx;
 if(k==='r')return D.res[a[1]]+' '+sg(+a[2]);if(k==='g')return E.gname(a[1])+' '+D.attr[a[2]]+' '+sg(+a[3])+(a[2]==='size'?'%':'');
 if(k==='o')return S.org[a[1]]&&S.org[a[1]].on?E.oname(a[1])+' '+D.attr[a[2]]+' '+sg(+a[3]):'';if(k==='c')return fmt(X.cmoreIn,D.eth[a[2]]?D.eth[a[2]].n:a[2],E.oname(a[1]));
 if(k==='m')return E.gname(a[1])+' '+(a[3]==='p'?D.ui.rememberP:D.ui.remember)+' ('+(+a[2]>0?X.fav:X.ill)+')';
 if(k==='v')return D.riv[a[1]].n+' '+D.attr[a[2]]+' '+sg(+a[3]);if(k==='law')return fmt(X.lawTo,D.laws[a[1]].n,D.laws[a[1]].opts[a[2]].n);
 if(k==='reg')return D.reg[a[1]].n+' '+D.attr[a[2]]+' '+sg(+a[3]);if(k==='fed')return D.reg[a[1]].n+' '+(+a[2]?X.fed1:X.fed0);
 if(k==='x'){const v=a[2];switch(a[1]){case'recog':return +v>0?X.recE:X.recH;case'claim':return +v>0?X.clS:X.clW;case'regent':return fmt(X.regentIs,E.oname(v));case'secede':return fmt(X.leaves,D.reg[v].n);
  case'open':return fmt(X.openD,E.oname(v));case'close':return fmt(X.closeD,E.oname(v));case'heal':return X.healD;case'assim':return X.assimD;case'nudge':return fmt(X.nudgeD,D.reg[v].n);case'sing':return +v>0?X.singN:X.singF;case'renown':return X.renown+' '+sg(+v);case'learnkal':return X.learn;}}
 return'';};
E.preview=function(c,ctx,src){const out=[],fx=E.fill(c.fx||'',ctx,src),cert=[];let hid=!!c.d;
 for(let st of fx.split(';')){st=st.trim();if(!st)continue;if(st[0]==='?'){hid=true;continue;}const d=E.describe(st,ctx);if(d)cert.push(d);}
 if(cert.length)out.push([0,cert.join(', ')]);
 if(c.ch)for(const b of c.ch){const ds=E.fill(b[1],ctx,src).split(';').map(s=>E.describe(s.trim(),ctx)).filter(Boolean).join(', ');out.push([1,fmt(D.dx.chance,Math.round(b[0]*100))+(ds?': '+ds:'')]);}
 if(c.pv)out.push([hid?2:1,E.fill(c.pv,ctx,src)]);else if(hid)out.push([2,D.ui.hidden]);return out;};
E.candidates=function(){const out=[];
 for(const e of D.ev){if(e.fu||S.used[e.id]||e.era.indexOf(S.era)<0||!E.cond(e.c))continue;let ctx={};if(e.pick){ctx=E.picks[e.pick]();if(!ctx)continue;}out.push({ev:e,ctx,w:e.w||10});}
 for(const e of D.tpl){if(!e.w||S.cool[e.id]>S.turn||!E.cond(e.c))continue;const ctx=E.picks[e.pick]();if(!ctx||(ctx._ck&&S.cool[ctx._ck]>S.turn))continue;out.push({ev:e,ctx,w:e.w});}return out;};
E.startTurn=function(){if(S.over)return;S.stage='council';S.rep=S.log;S.log=[];S.rcRep=S.rcNow;S.rcNow={};const evs=[];
 while(S.forced.length&&evs.length<2){const f=S.forced.shift();const ev=E.evById(f.id);if(ev&&!(S.cool[f.id]>S.turn)&&(!f.ctx.r||S.reg[f.ctx.r].own==='p')){S.cool[f.id]=S.turn+4;evs.push({ev,ctx:f.ctx,src:null});}}
 S.forced=[];
 for(let i=0;i<S.queue.length&&evs.length<2;){const q=S.queue[i];if(q.due<=S.turn){S.queue.splice(i,1);const ev=E.evById(q.ev);if(ev&&(!q.ctx||!q.ctx.r||S.reg[q.ctx.r].own==='p'))evs.push({ev,ctx:q.ctx||{},src:{cid:q.p,l:q.l,y:q.y,ry:q.ry}});}else i++;}
 const want=1+(E.rng()<0.45?1:0);let guard=0;
 while(evs.length<want&&guard++<4){const c=E.candidates().filter(x=>!evs.some(e=>e.ev.id===x.ev.id));const p=E.wpick(c,x=>x.w);if(!p)break;evs.push({ev:p.ev,ctx:p.ctx,src:p.ctx._p?{cid:p.ctx._p,l:S.life,y:S.year}:null});}
 S.evq=evs;E.nextCard();};
E.mkCard=function(e){const ev=e.ev,ctx=e.ctx||{},src=e.src||null;
 const card={kind:'ev',id:ev.id,ctx,src,t:E.fill(ev.t||ev.who||'',ctx,src),who:E.fill(ev.who||'',ctx,src),x:E.fill(ev.x,ctx,src),q:E.fill(ev.q,ctx,src),ch:ev.ch.map(c=>({l:E.fill(c.l,ctx,src),pv:E.preview(c,ctx,src)}))};
 card.adv=E.advise(ev,ctx,src);S.st.ev[ev.id]=(S.st.ev[ev.id]||0)+1;if(E.isTpl(ev.id)){S.cool[ev.id]=S.turn+7;if(ctx._ck)S.cool[ctx._ck]=S.turn+14;}else S.used[ev.id]=1;return card;};
E.nextCard=function(){if(S.over)return;
 if(S.evq.length){S.cur=E.mkCard(S.evq.shift());return;}
 if(S.stage==='council'){S.stage='directive';if(S.regency>0){S.regency--;E.say(D.L.regency);E.fx('r ord 2',{},D.L.regency);E.endTurn();return;}S.cur=E.dirCard();return;}
 E.endTurn();};
E.resolveEv=function(card,i){const ev=E.evById(card.id),c=ev.ch[i],ctx=card.ctx,src=card.src,title=card.t,why=title+' ('+E.when()+')';
 const cid=E.chron(fmt(D.L.c_dec,title,card.ch[i].l),src?src.cid:null,'dec');const cx=Object.assign({},ctx,{_cid:cid});S.flash=fmt(D.L.c_dec,title,card.ch[i].l);
 E.fx(E.fill(c.fx||'',ctx,src),cx,why);
 if(c.ch){let r=E.rng();for(const b of c.ch){if(r<b[0]){const tx=E.fill(b[2],ctx,src);E.fx(E.fill(b[1],ctx,src),cx,why);S.flash+=' '+tx;E.chron(tx,cid,'out');break;}r-=b[0];}}
 if(c.f)S.flags[c.f]=1;
 if(c.d){const keep={};for(const k of['g','gn','r','rn','e','en'])if(ctx[k]!==undefined)keep[k]=ctx[k];S.queue.push({ev:c.d[2],due:S.turn+E.ri(c.d[0],c.d[1]),p:cid,l:S.life,y:S.year,ry:src?(src.ry||src.y):S.year,ctx:keep});}
 if(!E.isTpl(ev.id)&&ev.ch.length>=3)S.facts.push({k:'dec',l:S.life,q:fmt(D.test.dec,D.ord[S.life],title),a:card.ch[i].l,w:card.ch.filter((x,j)=>j!==i).map(x=>x.l)});
 for(const a of card.adv||[]){const ad=S.advs[a.a];if(!ad)continue;ad.rec.n++;ad.rec.sound+=a.snd;ad.rec.self+=a.slf;if(a.i===i)ad.rec.fol++;}
 const pk=S.st.pk[ev.id]||(S.st.pk[ev.id]=[]);pk[i]=(pk[i]||0)+1;if(ctx.r&&ev.id==='t_pilgrim')S.lastVisit=ctx.r;if(ctx.v&&S.riv[ctx.v])S.riv[ctx.v].seen=S.turn;if(ctx.v2&&S.riv[ctx.v2])S.riv[ctx.v2].seen=S.turn;
 E.nextCard();};
/* ---------- directives ---------- */
E.dirOk=function(id){const t=S.res.tre;if(id==='tech')return E.nextTechs().some(x=>S.res.kno>=D.tech[x].k);if(id==='expand')return E.targets().length>0&&t>=8;if(id==='patron')return t>=8;
 if(id==='integrate')return t>=10&&Object.keys(S.reg).some(r=>S.reg[r].own==='p'&&!D.reg[r].home&&S.reg[r].integ<95);if(id==='rite')return S.body.age>=25;return true;};
E.dirCard=function(){const ch=[];for(const d of D.dirs)if(E.dirOk(d.id))ch.push({key:d.id,l:d.l,pv:[[0,d.d]]});return{kind:'dir',t:D.dx.dirT,who:'',x:D.dx.dirX,q:'',ch};};
E.dirSubs=function(k,step){const ch=[],X=D.dx;
 if(k==='law'){for(const l in D.laws)for(const o in D.laws[l].opts)if(S.law[l]!==o&&E.lawOk(l,o)){const O=D.laws[l].opts[o];ch.push({key:l+':'+o,l:D.laws[l].n+': '+O.n,pv:[[1,O.d],[0,O.fx.split(';').map(s=>E.describe(s.trim(),{})).filter(Boolean).concat([D.res.tra+' -3']).join(', ')]]});}}
 else if(k==='tech'){for(const t of E.nextTechs())if(S.res.kno>=D.tech[t].k)ch.push({key:t,l:D.tech[t].n+' ('+D.res.kno+' -'+D.tech[t].k+')',pv:[[0,D.tech[t].d]]});}
 else if(k==='expand'){for(const id of E.targets()){const R=S.reg[id],me=E.major(id,'eth'),who=R.own==='free'?X.free:D.riv[R.own].n;
   ch.push({key:'m:'+id,l:fmt(X.march,D.reg[id].n),pv:[[0,fmt(X.marchD,who,D.eth[me].n)],[1,fmt(X.chance,Math.round(E.marchP(id)*100))+': '+X.marchW]]});
   if((R.own==='free'||(S.riv[R.own].att>=65&&!D.reg[id].heart))&&S.res.tre>=12)ch.push({key:'t:'+id,l:fmt(X.treat,D.reg[id].n),pv:[[0,X.treatD],[1,fmt(X.chance,Math.round(E.treatP(id)*100))+': '+X.treatW]]});}}
 else if(k==='patron'){for(const r of E.table('eth'))if(r.share>=3)ch.push({key:'g:'+r.key,l:r.name,pv:[[0,X.patG]]});for(const r of E.table('cls'))if(r.share>=3)ch.push({key:'g:'+r.key,l:r.name,pv:[[0,X.patG]]});for(const o in S.org)if(S.org[o].on)ch.push({key:'o:'+o,l:E.oname(o),pv:[[0,X.patO]]});}
 else if(k==='repress'){for(const d of['eth','rel','cls'])for(const r of E.table(d))if(r.share>=3)ch.push({key:r.key,l:r.name,pv:[[0,X.repD],[2,X.repH]]});}
 else if(k==='integrate'){for(const id in S.reg)if(S.reg[id].own==='p'&&!D.reg[id].home&&S.reg[id].integ<95)ch.push({key:id,l:D.reg[id].n+' ('+(E.know()>=3?Math.round(S.reg[id].integ):E.wordOf('integ',S.reg[id].integ))+')',pv:[]});}
 else if(k==='teach'){for(const id in S.reg)if(S.reg[id].own==='p')ch.push({key:id,l:D.reg[id].n,pv:[]});}
 else if(k==='reform'){for(const o in S.org)if(S.org[o].on){const d=E.dom(S.org[o]);ch.push({key:'open:'+o,l:fmt(X.openL,E.oname(o)),pv:[[0,E.know()>=3?fmt(X.openP,Math.round(d.s*100),D.eth[d.e].n):fmt(D.kw.openLow,D.eth[d.e].n)]]});ch.push({key:'purge:'+o,l:fmt(X.purgeL,E.oname(o)),pv:[[0,X.purgeP]]});}}
 else if(k==='rite'){ch.push({key:'yes',l:X.riteYes,pv:[]});}
 else if(k==='tst'){if(step===0){for(const o of['priest','council','army','noble','merch'])ch.push({key:o,l:fmt(X.tReg,E.oname(o)),pv:[[1,fmt(X.tRegP,E.know()>=4?Math.round(S.org[o].loy):E.wordOf('loy',S.org[o].loy))]]});ch.push({key:'',l:X.tNone,pv:[]});}
  else if(step===1){D.signs.forEach((s,i)=>ch.push({key:''+i,l:s,pv:[]}));ch.push({key:'',l:X.tNoSign,pv:[]});}
  else if(step===2){for(const r of E.table('eth'))ch.push({key:r.key.slice(4),l:fmt(X.tProph,r.name),pv:[[1,X.tProphP]]});ch.push({key:'',l:X.tNoProph,pv:[]});}
  else{ch.push({key:'0',l:X.tCache0,pv:[]});if(S.res.tre>=10)ch.push({key:'10',l:fmt(X.tCache,10),pv:[[1,X.tCacheP]]});if(S.res.tre>=20)ch.push({key:'20',l:fmt(X.tCache,20),pv:[[1,X.tCacheP]]});}
  return{kind:'dir2',dir:'tst',step,t:D.dx.tstT[step],who:'',x:D.dx.tstX[step],q:'',ch};}
 ch.push({key:'back',l:D.ui.back,pv:[]});const d=D.dirs.find(x=>x.id===k);return{kind:'dir2',dir:k,t:d.l,who:'',x:d.d,q:'',ch};};
E.treatP=function(id){const R=S.reg[id];return clamp(0.3+E.legit()/250+E.aff('eth',E.major(id,'eth'),D.core)*0.15+(R.own==='free'?0.05:-0.1),0.05,0.9);};
E.dirPick=function(c,i){const k=c.ch[i].key;const d=D.dirs.find(x=>x.id===k);if(d.sub){S.cur=E.dirSubs(k,0);return;}E.dirDo(k,null);};
E.dir2Pick=function(c,i){const key=c.ch[i].key;if(key==='back'){S.cur=E.dirCard();return;}
 if(c.dir==='tst'){const T=S.tst;if(c.step===0)T.regent=key||null;else if(c.step===1)T.sign=key===''?null:+key;else if(c.step===2)T.proph=key||null;else{const n=+key;if(n>T.cache){S.res.tre-=n-T.cache;}T.cache=Math.max(T.cache,n);}
  if(c.step<3){S.cur=E.dirSubs('tst',c.step+1);return;}
  if(T.regent)E.special(['x','regent',T.regent],{});const tx=D.L.c_tst;E.chron(tx,null,'tst');S.flash=tx;E.endTurn();return;}
 E.dirDo(c.dir,key,c.ch[i].l);};
E.dirDo=function(k,key,label){const why=D.dirs.find(x=>x.id===k).l+' ('+E.when()+')';let tx=D.dirs.find(x=>x.id===k).l+(label?': '+label:'');let cid=0;const pk=S.st.pk['dir']||(S.st.pk['dir']={});pk[k]=(pk[k]||0)+1;
 if(k==='court')E.fx('r ord 3; r tra 1',{},why);
 else if(k==='law'){const a=key.split(':');E.setLaw(a[0],a[1],true);tx='';}
 else if(k==='tech'){E.getTech(key,true);tx='';}
 else if(k==='expand'){const id=key.slice(2),force=key[0]==='m';cid=E.chron(tx,null,'dir');tx='';
  if(force){S.war=1;E.fx('r tre -8',{},why);if(E.rng()<E.marchP(id)){E.annex(id,true,true,cid);E.fx('o army loy 3',{},why);S.flash=fmt(D.L.expWin,D.reg[id].n);}else{E.fx('o army pow -8; r ord -6; o army loy -4',{},why);S.flash=fmt(D.L.expLose,D.reg[id].n);E.say(S.flash);if(S.reg[id].own!=='free'&&S.riv[S.reg[id].own])E.fx('v '+S.reg[id].own+' att -12',{});}}
  else{E.fx('r tre -12',{},why);if(E.rng()<E.treatP(id)){E.annex(id,false,true,cid);S.flash=fmt(D.L.treatWin,D.reg[id].n);}else{S.flash=fmt(D.L.treatLose,D.reg[id].n);E.say(S.flash);}}}
 else if(k==='patron'){const s=key.slice(2);if(key[0]==='g')E.fx('r tre -8; g '+s+' loy 10; g '+s+' grv -8; g '+s+' w 3',{},why);else E.fx('r tre -8; o '+s+' loy 10',{},why);}
 else if(k==='repress'){cid=E.chron(tx,null,'dir');tx='';E.fx('g '+key+' fear 40; g '+key+' grv 10; r ord 5; o army loy 2; m '+key+' -12 t '+fmt(D.dx.repM,S.year),{_cid:cid},why);}
 else if(k==='integrate')E.fx('r tre -10; reg '+key+' integ 12; reg '+key+' unrest -5',{},why);
 else if(k==='teach'){E.fx('g reg:'+key+' bel 8; r cha 2; x nudge '+key,{},why);S.lastVisit=key;}
 else if(k==='reform'){const a=key.split(':'),o=a[1];if(a[0]==='open')E.fx('x open '+o+'; o '+o+' loy -8; o '+o+' aut -5',{},why);else{const d=E.dom(S.org[o]);E.fx('o '+o+' aut -15; o '+o+' loy 6; o '+o+' pow -8; g eth:'+d.e+' grv 5; x hazard 0.5',{},why);}}
 else if(k==='listen'){S.listen=S.turn+1;if(S.advs.length){const ad=E.pick(S.advs);ad.seen=1;E.say(fmt(D.L.advLean,ad.n,D.L.lean[ad.bias<0.3?0:ad.bias<0.55?1:2]));}}
 else if(k==='rite'){E.chron(tx,null,'dir');E.fx('g all bel 10; r cha 15; r ord -10; x renown 5',{},why);E.die('rite');return;}
 if(tx){E.chron(tx,null,'dir');S.flash=tx;}
 E.endTurn();};
E.endTurn=function(){E.sim('rule');if(S.over)return;
 if(S.childEarly>0)S.childEarly--;
 if(S.pendingDeath){E.die(S.pendingDeath);return;}
 const h=E.hazards(),tot=h.age+h.ill+h.kill+h.acc+h.war;S.war=0;
 if(E.rng()<tot){let r=E.rng()*tot,c='age';for(const k of['age','ill','kill','acc','war']){r-=h[k];if(r<0){c=k;break;}}E.die(c);return;}
 E.startTurn();};
/* ---------- death, interregnum, birth ---------- */
E.legacy=function(){const l=S.life,cs=S.chron.filter(c=>c.l===l),m=S.mem.filter(x=>x.l===l).sort((a,b)=>Math.abs(b.v0)-Math.abs(a.v0))[0];
 return fmt(D.dx.legacy,cs.filter(c=>c.k==='law').length,cs.filter(c=>c.k==='gain').length,cs.filter(c=>c.k==='loss').length)+(m?' '+fmt(D.dx.legMem,m.t):'');};
E.pushLife=function(cause){const b=S.body;S.lives.push({n:S.life,eth:b.eth,lang:b.lang,rel:b.rel,cls:b.cls,reg:b.reg,born:b.born,start:b.rec?b.start:null,died:S.year,age:b.age,cause,rec:b.rec?1:0,legacy:E.legacy()});
 S.facts.push({k:'death',l:S.life,q:fmt(D.test.death,D.ord[S.life]),a:D.cause[cause],w:['age','ill','kill','acc','war','rite'].filter(c=>c!==cause).map(c=>D.cause[c])});
 S.facts.push({k:'birth',l:S.life,q:fmt(D.test.birth,D.ord[S.life]),a:D.eth[b.eth].n,w:Object.keys(D.eth).filter(e=>e!==b.eth).map(e=>D.eth[e].n)});
 S.st.deaths[cause]=(S.st.deaths[cause]||0)+1;};
E.die=function(cause){const b=S.body;S.pendingDeath=null;const tx=fmt(D.L.death,D.cause[cause],S.year,b.age);E.chron(tx,null,'death');E.pushLife(cause);if(cause==='coup')S.junta=1;
 S.cur={kind:'cont',t:D.dx.deathT,who:'',x:tx+(S.tst.regent||S.tst.sign!==null?'':'\n\n'+D.dx.noTst),q:'',ch:[{l:D.ui.cont}],next:'inter'};};
E.snapState=function(){const own=E.own(),o={};for(const id in S.org)o[id]={pow:S.org[id].pow,aut:S.org[id].aut,loy:S.org[id].loy};
 return{o,res:Object.assign({},S.res),legit:E.legit(),eth:E.shares('eth',own),lang:E.shares('lang',own),rel:E.shares('rel',own),bel:sum(own,p=>p.bel*p.size)/(sum(own,p=>p.size)||1),cle:S.cleav};};
E.diff=function(b){if(E.know()<3)return E.diffW(b);const out=[],X=D.dx,now=E.snapState();
 for(const id in S.org){if(!S.org[id].on||!b.o[id])continue;const dp=now.o[id].pow-b.o[id].pow,da=now.o[id].aut-b.o[id].aut,dl=now.o[id].loy-b.o[id].loy;if(Math.abs(dp)>=6||Math.abs(da)>=10||Math.abs(dl)>=10)out.push(fmt(X.dOrg,E.oname(id),sg(dp),sg(da),sg(dl))+(id===S.regent?' '+X.dReg:''));}
 for(const d of['eth','lang','rel'])for(const k in now[d]){const a=(b[d][k]||0)*100,c=now[d][k]*100;if(Math.abs(c-a)>=3){const cs=S.causes[d+':'+k];out.push(fmt(X.dShare,D[d][k].n,Math.round(a),Math.round(c))+(cs&&cs.length?' ('+cs[cs.length-1].t+')':''));}}
 out.push(fmt(X.dRes,Math.round(b.res.tre),Math.round(S.res.tre),Math.round(b.res.food),Math.round(S.res.food),Math.round(b.res.ord),Math.round(S.res.ord),Math.round(b.legit),Math.round(now.legit)));
 if(Math.abs(now.bel-b.bel)>=4)out.push(fmt(X.dBel,Math.round(b.bel),Math.round(now.bel)));return out;};
E.birth=function(){const cand=S.pops.filter(p=>p.size>0.5);let p;
 if(E.rng()<0.08)p=E.wpick(cand,x=>x.size);else p=E.wpick(cand,x=>S.reg[x.reg].own==='p'?x.size*(x.bel+8)*(S.tst.proph===x.eth?3:1)*(1+(S.nudge[x.reg]||0)):x.size*0.8);
 const R=S.reg[p.reg];S.body={eth:p.eth,lang:p.lang,rel:p.rel,cls:p.cls,reg:p.reg,age:0,born:S.year,start:null,rec:0,foreign:R.own==='p'?null:R.own};
 S.signLeft=S.tst.sign;S.prophLeft=S.tst.proph;S.cacheLeft=S.tst.cache;S.tst={regent:null,sign:null,proph:null,cache:0};S.nudge={};S.hazard=0;S.childEarly=0;S.testRes=[];
 S.st.births[p.eth]=(S.st.births[p.eth]||0)+1;};
E.interTurn=function(){E.sim('inter');if(S.over)return;S.body.age+=5;const rg=S.regent,ag=D.org[rg].ag,a0=S.org[rg].aut;E.fx(ag.fx,{},null);if(S.org[rg].aut>a0)S.org[rg].aut=a0+(S.org[rg].aut-a0)*Math.max(0.15,1-a0/85);
 if(E.rng()<0.3)for(const l in ag.law){const o=ag.law[l];if(S.law[l]!==o&&E.lawOk(l,o)){E.setLaw(l,o,false);E.say(fmt(D.L.lawChg,D.laws[l].n,D.laws[l].opts[o].n));break;}}
 const c=[];for(const t of D.inter){const ctx=E.picks[t.pick]();if(ctx)c.push([t,ctx]);}const pk=E.wpick(c,x=>x[0].w);
 if(pk){const ctx=Object.assign({reg:rg,regn:E.oname(rg)},pk[1]);const tx=E.fill(pk[0].x,ctx);E.fx(E.fill(pk[0].fx,ctx),ctx,tx||null);E.say(tx);S.st.ev[pk[0].id]=(S.st.ev[pk[0].id]||0)+1;}
 const ts=E.nextTechs();if(ts.length&&S.res.kno>=D.tech[ts[0]].k&&E.rng()<0.5)E.getTech(ts[0],true);
 S.ilog.push(...S.log.splice(0));};
E.interregnum=function(){const before=E.snapState();S.ilog=[];S.log=[];const want=S.tst.regent,str=E.strongest();
 if(S.life-(S.life0||0)>=16){S.sing=100;S.era=4;E.say(D.L.cap);E.endSing();return;}
 S.life++;E.birth();let rg;
 if(S.junta){rg='army';S.ilog.push(D.L.regJunta);}else if(want&&S.org[want].on&&(S.org[want].loy>=45||want===str)){rg=want;S.ilog.push(fmt(D.L.regHon,E.oname(want)));}
 else if(want){rg=str;S.ilog.push(fmt(D.L.regIgn,E.oname(want),E.oname(str)));}else{rg=str;S.ilog.push(fmt(D.L.regNone,E.oname(str)));}
 S.regent=rg;for(let i=0;i<3&&!S.over;i++)E.interTurn();if(S.over)return;
 if(S.cacheLeft>0){if(E.rng()<0.3+S.org[S.regent].aut/200){S.ilog.push(fmt(D.L.cacheLost,E.oname(S.regent)));S.cacheHeld=0;}else S.cacheHeld=Math.round(S.cacheLeft*1.5);}
 const b=S.body;let tx=fmt(D.L.born,D.eth[b.eth].n,D.lang[b.lang].n,D.rel[b.rel].n,D.cls[b.cls].n.toLowerCase(),D.reg[b.reg].n)+(b.foreign&&b.foreign!=='free'?fmt(D.L.bornF,D.riv[b.foreign].n):'');
 E.chron(tx,null,'birth');S.st.inter.push(15);
 S.cur={kind:'cont',t:D.L.gone,who:'',x:tx,list:S.ilog.concat(E.diff(before)),q:'',ch:[{l:D.ui.cont}],next:'child'};S.childQ=null;};
E.childCard=function(){if(!S.childQ){S.childQ=['v_reveal'];const o=D.child.slice(1).filter(v=>E.cond(v.c));if(o.length&&E.rng()<0.75)S.childQ.push(E.pick(o).id);}
 if(!S.childQ.length){if(S.hiddenExtra){S.hiddenExtra=0;S.ilog=[];E.interTurn();if(S.over)return;S.st.inter[S.st.inter.length-1]=20;S.cur={kind:'cont',t:D.dx.hidT,who:'',x:D.dx.hidX,list:S.ilog,q:'',ch:[{l:D.ui.cont}],next:'tests'};return;}E.go('tests');return;}
 const vid=S.childQ.shift(),v=D.child.find(x=>x.id===vid),pat=E.strongest(S.regent),ctx={pat,patn:E.oname(pat)};
 S.cur={kind:'child',id:v.id,ctx,t:v.t,who:v.who,x:E.fill(v.x,ctx),q:E.fill(v.q,ctx),ch:v.ch.map(c=>({l:E.fill(c.l,ctx),pv:c.pv?[[0,E.fill(c.pv,ctx)]]:E.preview(c,ctx,null)}))};};
E.go=function(next){if(S.over)return;if(next==='turn')E.startTurn();else if(next==='inter')E.interregnum();else if(next==='child')E.childCard();else if(next==='tests')E.startTests();else if(next==='rule')E.beginRule();else if(next==='exile')E.exileCard();};
/* ---------- recognition ---------- */
E.startTests=function(){const pool=S.facts.filter(f=>f.l<S.life&&f.w.length>=2),W={dec:3,law:2,regent:2,birth:1,death:1},out=[];
 if(S.signLeft!==null&&S.signLeft!==undefined)out.push({k:'sign',q:D.test.sign,a:D.signs[S.signLeft],w:D.signs.filter((s,i)=>i!==S.signLeft)});
 let g=0;while(out.length<3&&pool.length&&g++<20){const f=E.wpick(pool,x=>W[x.k]*(out.some(o=>o.k===x.k)?0.3:1));pool.splice(pool.indexOf(f),1);out.push(f);}
 S.tests=out;S.testRes=[];E.nextTest();};
E.nextTest=function(){if(!S.tests.length){E.recogResult();return;}const f=S.tests.shift(),w=f.w.slice();while(w.length>3)w.splice(E.ri(0,w.length-1),1);const opts=w.concat([f.a]);
 for(let i=opts.length-1;i>0;i--){const j=E.ri(0,i);const t=opts[i];opts[i]=opts[j];opts[j]=t;}
 S.cur={kind:'test',t:D.test.t,who:D.test.who,x:(S.testRes.length?'':D.test.pre)+f.q,q:D.test.q,ans:opts.indexOf(f.a),ch:opts.map(o=>({l:o,pv:[]}))};};
E.recogCalc=function(){const b=S.body,parts=[],own=E.own(),tot=sum(own,p=>p.size)||1,RX=D.rx;const add=(t,v)=>{if(Math.abs(v)>=0.5)parts.push([t,Math.round(v)]);};
 add(RX.base,22);add(RX.renown,S.renown/6);
 const bg=b.foreign?{size:0}:E.grp('eth:'+b.eth+'+reg:'+b.reg,own);add(fmt(RX.birthBel,D.eth[b.eth].n),(bg.size?bg.bel:5)*0.2);
 const c=E.ctrl(),ab=sum(own,p=>p.bel*p.size)/tot;let claim=S.claim;
 if(c){const o=S.org[c];add(fmt(RX.ctrl,E.oname(c)),(o.dev-45)*0.4-o.aut*0.25-(S.junta?15:0));}else add(RX.people,(ab-40)*0.5);
 if(S.regent&&S.regent!==c){const o=S.org[S.regent];add(fmt(RX.regent,E.oname(S.regent)),(o.dev-50)*0.2-o.aut*0.1);}
 const de=c?E.dom(S.org[c]).e:D.core,a=E.aff('eth',b.eth,de);if(a<1)add(fmt(RX.outs,D.eth[de].n),-(1-a)*12*(S.law.cit==='oath'?0.5:1));
 if(S.law.lang==='kaldic'&&E.aff('lang',b.lang,'kal')<1)add(RX.tongue,-5);
 if(b.cls==='bonded')add(RX.bonded,-4);else if(b.cls==='noble')add(RX.noble,3);
 if(b.foreign)add(RX.foreign,-10);
 if(S.signLeft!==null&&S.signLeft!==undefined){const o=c?S.org[c]:null;if(!o||o.dev>=50)add(D.L.signHon,10);else if(o.dev<32&&o.aut>45){add(D.L.signTw,-5);claim+=10;}else parts.push([D.L.signIgn,0]);}
 if(S.prophLeft)add(b.eth===S.prophLeft?D.L.prophHit:D.L.prophMiss,b.eth===S.prophLeft?8:-6);
 add(RX.child,S.recogB);if(S.falseCount>0)add(RX.tired,6+Math.max(0,(sum(own,p=>p.grv*p.size)/tot-25)*0.4));if(S.puppet)add(fmt(RX.patron,D.riv[S.puppet].n),15);
 const k=S.law.recog==='trial'?1.5:1;let nr=0,nw=0;for(const r of S.testRes){if(r)nr++;else nw++;}if(nr)add(fmt(RX.right,nr),9*k*nr);if(nw)add(fmt(RX.wrong,nw),-7*k*nw);
 const R=sum(parts,p=>p[1]),C=Math.round(30+(c?S.org[c].aut*0.35:0)+(S.crownClaim?8:0)+claim-ab*0.15+(S.junta?10:0));
 return{parts,R,C,ok:R>=Math.max(48,C)};};
E.recogResult=function(){const r=E.recogCalc();S.st.rec[0]++;const lv=E.know(),mg=r.R-Math.max(48,r.C),list=r.parts.map(p=>p[0]+': '+(lv>=3?sg(p[1]):E.helpsW(p[1])));list.push(lv>=3?fmt(D.rx.total,r.R,Math.max(48,r.C)):D.kw.margin[mg<-12?0:mg<0?1:mg<6?2:mg<18?3:4]);
 S.claim=Math.max(0,S.claim*0.4);S.recogB=0;S.signLeft=null;S.prophLeft=null;S.recMargin=r.R-Math.max(48,r.C);
 if(r.ok){S.cur={kind:'cont',t:D.rx.t,who:'',x:D.L.recYes,list,q:'',ch:[{l:D.ui.cont}],next:'rule'};}
 else{S.st.rec[1]++;S.falseCount++;const c=E.ctrl()||E.strongest();S.falseName=E.pick(D.names.kal);const tx=fmt(D.L.recNo,S.falseName,E.oname(c));E.chron(tx,null,'norec');
  if(S.falseCount>=2){S.cur={kind:'cont',t:D.rx.t,who:'',x:tx+'\n\n'+D.L.recNo2,list,q:'',ch:[{l:D.ui.cont}],next:'lost'};S.lostType=(S.junta||c==='army')?'coupreg':(S.puppetClaim||(S.flags.crown_bowl&&S.crownClaim))?'puppet':'hollow';}
  else S.cur={kind:'cont',t:D.rx.t,who:'',x:tx,list,q:'',ch:[{l:D.ui.cont}],next:'exile'};}};
E.beginRule=function(force){const b=S.body;b.rec=1;b.start=S.year;S.falseCount=0;S.junta=0;S.puppet=null;S.renown=clamp(S.renown+5);
 S.leg.cha=clamp(Math.max(S.leg.cha,30)+18+(S.recMargin||0)*0.3);
 for(const id in S.org){const o=S.org[id];if(o.on&&o.aut>50)o.loy=clamp(o.loy-(o.aut-50)*0.25);}
 if(S.cacheHeld>0){E.say(fmt(D.L.cacheKept,S.cacheHeld));S.res.tre=clamp(S.res.tre+S.cacheHeld,-40,100);S.cacheHeld=0;}
 E.newAdvs();E.chron(force?D.L.revoltWin:D.L.recYes,null,'rec');S.log.push(force?D.L.revoltWin:D.L.recYes);S.ruleTurn=S.turn;if(force){S.pre=null;E.startTurn();}else E.brief();};
E.revoltP=function(){const b=S.body,bg=E.grp('eth:'+b.eth);return clamp(0.1+bg.bel/250*Math.min(1,bg.share*3)+(55-S.org.army.loy)/150+S.cacheHeld/100+E.cascade().pot*0.3,0.05,0.65);};
E.exileCard=function(){const X=D.exile;let v=null,m=-1;for(const id in S.riv)if(!S.riv[id].dead&&S.riv[id].att>m){m=S.riv[id].att;v=id;}
 const ctx={vn:v?D.riv[v].n:'',v,pct:Math.round(E.revoltP()*100)};const ch=X.ch.filter(c=>c.id!=='patron'||v).map(c=>({key:c.id,l:E.fill(c.l,ctx),pv:[[c.id==='revolt'?1:0,E.fill(c.pv,ctx)]]}));
 S.cur={kind:'exile',ctx,t:X.t,who:X.who,x:E.fill(X.x,ctx),q:X.q,ch};};
E.exilePick=function(c,i){const k=c.ch[i].key,ct=E.ctrl()||E.strongest(),why=D.exile.t+' ('+E.when()+')';const cid=E.chron(D.exile.t+': '+c.ch[i].l,null,'dec');
 const pk=S.st.pk.exile||(S.st.pk.exile={});pk[k]=(pk[k]||0)+1;
 if(k==='preach')E.fx('g birth bel 12; g birth loy 4; x renown 4; x recog 10',{},why);
 else if(k==='serve')E.fx('o '+ct+' dev 12; o '+ct+' aut -10; x recog 6; r kno 2',{},why);
 else if(k==='patron'){S.puppet=c.ctx.v;S.puppetClaim=1;E.fx('v '+c.ctx.v+' att 10; r tra -5',{},why);}
 else if(k==='revolt'){if(E.rng()<E.revoltP()){E.fx('r leg -15; r ord -15; o army loy -10; g birth loy 10',{_cid:cid},why);S.recMargin=10;E.beginRule(true);return;}
  E.fx('g birth fear 40; g birth grv 12; m birth -16 p '+D.dx.reprisal,{_cid:cid},why);S.body.age+=5;S.year+=0;E.pushLife('revolt');
  S.cur={kind:'cont',t:D.dx.deathT,who:'',x:D.L.revoltLose,q:'',ch:[{l:D.ui.cont}],next:'inter'};return;}
 S.regent=ct;S.ilog=[];S.log=[];const y0=S.year,n=5+E.ri(0,2);for(let j=0;j<n&&!S.over;j++)E.interTurn();if(S.over)return;
 const cause=E.rng()<0.15?'exec':'obscure';E.pushLife(cause);const tx=fmt(D.L.exileEnd,S.year-y0,D.cause[cause]);E.chron(tx,cid,'death');
 S.cur={kind:'cont',t:D.dx.deathT,who:'',x:tx,list:S.ilog,q:'',ch:[{l:D.ui.cont}],next:'inter'};};
/* ---------- dispatcher ---------- */
E.choose=function(i){const c=S.cur;if(!c||S.over||!c.ch||!c.ch[i])return;S.flash='';
 if(c.kind==='cont'){if(c.next==='lost'){E.end(S.lostType);return;}E.go(c.next);}
 else if(c.kind==='ev')E.resolveEv(c,i);else if(c.kind==='dir')E.dirPick(c,i);else if(c.kind==='dir2')E.dir2Pick(c,i);
 else if(c.kind==='child'){const v=D.child.find(x=>x.id===c.id);E.chron(v.t+': '+c.ch[i].l,null,'dec');E.fx(E.fill(v.ch[i].fx,c.ctx),c.ctx,v.t+' ('+E.when()+')');const pk=S.st.pk[v.id]||(S.st.pk[v.id]=[]);pk[i]=(pk[i]||0)+1;E.childCard();}
 else if(c.kind==='test'){S.testRes.push(i===c.ans?1:0);E.nextTest();}
 else if(c.kind==='exile')E.exilePick(c,i);};
E.chains=function(){const by={};for(const c of S.chron)by[c.id]=c;const depth=c=>{let d=1,x=c;while(x.p&&by[x.p]){x=by[x.p];d++;}return{d,root:x.id};};
 const kids={};for(const c of S.chron)if(c.p)kids[c.p]=1;const leaves=S.chron.filter(c=>!kids[c.id]&&c.p).map(c=>Object.assign({c},depth(c))).sort((a,b)=>b.d-a.d||(b.c.y-by[b.root].y)-(a.c.y-by[a.root].y));
 const out=[],seen={};for(const l of leaves){if(seen[l.root])continue;seen[l.root]=1;const path=[];let x=l.c;while(x){path.unshift(x);x=x.p?by[x.p]:null;}out.push(path);if(out.length>=3)break;}return out;};
