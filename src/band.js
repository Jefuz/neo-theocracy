/* ===================== DATA: the Age of Bands (era 0) ===================== */
D.eras[0]='Age of Bands';
D.ord=D.ord.concat(['nineteenth','twentieth','twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth']);
Object.assign(D.cause,{hunger:'hunger',hunt:'a hunt gone wrong'});
D.end.bandlost={n:'The Last Fire',win:0,x:'Too few are left to keep a fire through winter. The last of the band walk to another people\'s hearth and take another people\'s names. No one is left to look for you.'};
D.end.scattered={n:'The Scattering',win:0,x:'The band no longer agrees on anything, including being a band. Hearth by hearth it walks apart. You will be born again, among strangers who never heard of you.'};
D.bres={people:'People',food:'Food',bond:'Bond',belief:'Belief',standing:'Standing',lore:'Lore',chant:'Chant',rift:'Rift between the hearths'};
D.broles={chief:'Headwoman',hunt:'Hunt-leader',fire:'Firekeeper',spirit:'Spirit-talker'};
D.bnames={chief:['Ysa','Kelda','Senna','Vessa'],hunt:['Borr','Tovik','Haral','Brann'],fire:['Maren','Ysolde','Ilma','Oda'],spirit:['Orlen','Edrin','Joska','Davit']};
D.grounds={
flats:{n:'River Flats',d:'Fish, reeds and seed-grass. Rich, crowded with other bands, and feverish in a wet year.',pv:[[0,'Food rises, Lore rises slightly'],[1,'In a wet year, river fever takes some of the band']]},
high:{n:'High Pastures',d:'The herds in summer, wind the rest of the year. The band is alone there, and the Stone hearth feels at home.',pv:[[0,'Bond rises slightly, the rift between the hearths widens slightly'],[1,'The hunt may fail or feed everyone']]},
forest:{n:'Forest Edge',d:'Nuts, roots, small game. Never much, never nothing. No one finds you there.',pv:[[0,'Food rises slightly, the band grows a little, safe from raids']]},
shore:{n:'Salt Shore',d:'Shellfish, salt and strangers. Things are learned and things are taken.',pv:[[0,'Food rises, Lore rises slightly'],[1,'Now and then raiders take food and people']]}};
D.bact=[
{id:'teach',l:'Teach the children your words',fx:'b chant 6; b belief 2',pv:'What they chant will outlast those who knew you.'},
{id:'mark',l:'Leave your mark on this ground',fx:'x mark 1; b chant 1',pv:'A painted shelter, a stone set upright. Something a later child could lead them to.'},
{id:'learn',l:'Learn: herbs, tracks, the sky',fx:'x skill 1; b standing 3; b lore 1',pv:'What you know, you keep across deaths.'},
{id:'ties',l:'Tend your ties to those who matter',fx:'b bond 3; ba all 5; b standing 2',pv:''},
{id:'hunt',l:'Hunt with the others',fx:'b food 5; b standing 3; ba hunt 4; ?x hazard 1',pv:'Hunts go wrong.'}];
D.bcarry={
grove_friend:{fx:'v moot att 14; m eth:tu 8 p the stranger nursed by the wandering band',x:'The forest folk still tell of a wounded man the wanderers nursed. The Tuun Moot remembers.'},
salt_trade:{fx:'v league att 10; o merch pow 5',x:'The shore people have traded with your line since the wandering years. Their heirs became the League of Sor.'},
raid_blood:{fx:'v horde att -14',x:'Blood was spilled on the herd grounds in the wandering years. The riders of the steppe count it still.'},
chant_fixed:{fx:'o priest aut 8; o priest pow 4; r tra 5',x:'The chant was fixed word for word in the wandering years. Those who keep it already think of it as theirs.'},
shaman_chief:{fx:'r cha 10; r tra -6; o noble loy -8',x:'In the wandering years the shaman took the headship. The clan heads have not forgotten whose place that was.'},
hill_parted:{fx:'m eth:kh 8 p the peaceful parting of the hearths; reg hk integ -10',x:'The Stone hearth walked to the hills with your blessing, and became its own people.'},
hill_forced:{fx:'m eth:kh -12 p the hearth that was forbidden to leave; reg hk unrest 10',x:'The Stone hearth was held in the band by force. Its children became the Hill Kaldar, and were told why.'},
cast_out:{fx:'m cls:herder -8 p the sick cast out in the wandering years',x:'The band once cast out its sick. Herders tell it to their children as a warning about you.'},
grain:{fx:'r food 8; r kno 4',x:'The seed-grass tended in the wandering years is barley now.'},
dogs:{fx:'o army pow 4; r food 3',x:'The wolf pups raised by the band are hounds now.'},
bones:{fx:'g all bel 6; o priest pow 3',x:'The band carried the bones of its first shaman for generations. They lie under the shrine.'}};
D.bx={intro:'You are fifteen winters old, one of some forty people who walk between four grounds as the seasons turn. There is a headwoman, a hunt-leader, a firekeeper who knows the old stories, and a spirit-talker who drums for the dead. You are none of these.\n\nLast night you dreamed of drowning, and woke knowing it was not a dream. You have died before. No one here has a word for that yet.',
goal:'Keep the band alive. Make them believe, if you can. When you die you will be born to their distant grandchildren, who will know you only by what you left behind: a chant, a mark on stone, a skill no child should have. Somewhere ahead lies a valley worth stopping in.',
rangeT:'Where the band walks',rangeX:'The headwoman asks the fires where to go when the season turns. {standingLine}',rangeQ:'"Which ground?"',heard:'Your word carries: where you point, most will walk.',unheard:'No one asks you, but a word at the right fire still counts for something.',
stay:'The band is here now. Staying wears the ground thin: Food -{0}',actT:'Your own doing',actX:'Between the walking and the hunting there is a little time that is yours.',actQ:'What do you do with it?',
fever:'River fever went through the camp.',raid:'Raiders came along the shore.',thin:'The ground was thin from long use.',hungry:'Hunger. The band shrinks.',grew:'Children were born and lived.',
death:'This body dies of {0}, {1} winters old. No one knows to look for you. Not yet.',
goneT:'The long dark',gone:'You are not born at once. {0} years pass before you draw breath again. Everyone who knew your face is dead.',gone40:'You are not born at once. {0} years pass. One or two old ones were children when you died.',
gChant:'The chant was sung at {0} in 100 of its old strength.',gMark:'{0} of your marks weathered away.',gPeople:'The band numbers some {0}, where it had numbered some {1}.',winter:'A killing winter. The stores went early.',gLore:'They learned new things without you.',gHard:'{0} killing winters came in those years.',gWinter:'In the long dark between your lives, the killing winters ended the band.',gRoles:'New names hold the old places: {0}.',
bornB:'You are born to the {0} hearth, and at fifteen winters you remember.',
proofT:'The showing',proofX:'At the naming-fire a child may speak. You could show them who you are. A showing that fails is remembered as a child\'s boast.',proofQ:'What do you show them?',proof2:'One showing is a marvel. Two is a claim.',proofN:'As things stand, your claim {0}. You may make two showings.',
pChant:'Sing the lines of the chant no child was taught',pMark:'Lead them to a mark you left',pSkill:'Do what only the old one could do',pWit:'Go to the old one who saw you as a child',pNone:'Say nothing. Live as one of them',pEnough:'That is enough',
pv:'It would count as {0}',pvP:'{0} it works, and then it counts as {1}. If it fails, it counts against you',pvNone:'You start as an ordinary member of the band.',
resYes:'They believe. From this winter the drum is yours, and the band calls you by the old one\'s name.',resNo:'They do not believe, or not enough. You are a strange child with a good memory. You begin again from the edge of the fire.',
rBase:'A child at the naming-fire',rBel:'What the band still believes',rOk:'{0} showed true',rFail:'{0} failed',rTotal:'Your claim: {0}. Needed: 45.',
lockSt:'They will not follow you yet. You need more standing.',lockSh:'Only one who drums for the dead may do this.',lockMk:'You have left no mark to gather at.',
settleT:'The Vale',settled:'The band stops walking. In the valley the River Kaldar will call Kalda Vale, the first posts are sunk. You are {0} winters old, and for the first time a people will stay where your bones lie.\n\nWhat the wandering years made of them, they carry in.',
role:{none:'one of the band',app:'apprentice to the spirit-talker',shaman:'spirit-talker of the band'},hearth:{water:'Water',stone:'Stone'},
bandT:'The band',you:'You',ground:'Ground',marks:'Marks left',skill:'What you know',att:'toward you',grounds:'The four grounds',
c_start:'A child of the wandering band wakes from a dream of drowning.',c_settle:'The band settles in the Vale.',c_rec:'The band knows its shaman again.',c_norec:'The showing fails. You live as one of the band.'};
D.bev=[
{id:'b_dream',t:'The Dream of Drowning',first:1,who:'Yourself, at the morning fire',
x:`You know where the old winter cache is: under the split rock, three days north, sealed with clay by hands that were yours. No one living has seen it. {spirit}, who drums for the dead, is watching you the way he watches weather.`,
q:`What do you do with what you know?`,
ch:[{l:'Tell {spirit} alone',fx:'x role app; ba spirit 12; b standing 5',pv:'He may teach you. He may also keep you close for other reasons.'},
{l:'Tell everyone at the fire',fx:'b belief 6; ba spirit -15',ch:[[.6,'b food 8; b standing 8; b belief 6','They dig where you say. The clay seal is there.'],[.4,'b standing -4','They laugh. No one walks three days for a child\'s dream.']]},
{l:'Say nothing, and dig it up yourself',fx:'b food 6; x skill 1; b standing 2'}]},
{id:'b_orlen',t:'The Drum',c:{nbf:['shaman']},w:14,who:'{spirit}, the spirit-talker',
x:`{spirit} has drummed for this band since before you were born. People have begun bringing their fevers and their dead to you instead. He sets his drum between you at the fire, where everyone can see it, and waits.`,
q:`"There is one drum. Whose hands?"`,
ch:[{l:'Kneel and ask to be taught',fx:'x role app; ba spirit 15; b chant 4; b standing 3',pv:'When he dies, the drum passes to you.'},
{l:'Take up the drum',st:25,fx:'ba spirit -30',ch:[[.55,'x role shaman; b belief 10; b standing 8','You drum the dead by name. Names he never told you.'],[.45,'b standing -10; b bond -4','Your hands shake. He takes the drum back gently, which is worse.']]},
{l:'Leave him the drum. Heal quietly',fx:'b belief 4; x skill 1; ba spirit 4'}]},
{id:'b_passing',t:'The Old One Dies',c:{role:'app'},w:20,who:'{spirit}, dying',
x:`{spirit} is dying in the lean-to, and has sent the others out. He holds the drum against his chest. He says he always knew what you were, and that he taught you anyway, and asks if you know what that cost him.`,
q:`"Take it. Tell them it was I who found you."`,
ch:[{l:'Take the drum and tell them so',fx:'x role shaman; b standing 10; b belief 5; b chant 5'},
{l:'Take the drum. Say it was always yours',fx:'x role shaman; b standing 6; b belief 10; b bond -4; ba fire -10'}]},
{id:'b_hunt',t:'Another Band\'s Herds',rep:1,w:8,who:'{hunt}, the hunt-leader',
x:`The herds have crossed the ridge onto ground another band hunts. {hunt} wants to follow. He says meat does not know whose ground it stands on. The other band\'s fires are visible at night.`,
q:`"Do we eat, or do we mind our manners?"`,
ch:[{l:'Follow the herds',fx:'b food 11; ba hunt 8',ch:[[.35,'b people -4; x carry raid_blood','Their hunters are waiting at the ford. Not everyone comes back.']]},
{l:'Speak against it',fx:'ba hunt -10; b bond 3; b food -3'},
{l:'Read the signs for them',shaman:1,fx:'',ch:[[.55,'b food 8; b belief 7; b standing 4','You name the valley. The herds are there.'],[.45,'b belief -6; b standing -4; b food -3','You name the valley. It is empty.']]}]},
{id:'b_winter',t:'The Hunger Moon',rep:1,w:14,c:{bmax:{food:28}},who:'{chief}, the headwoman',
x:`There is not enough to reach spring. By custom the oldest walk out into the snow so the youngest eat. {fire}, who keeps every story the band has, is among the oldest. {chief} looks at the fire, not at anyone.`,
q:`"Custom is clear. Is custom right?"`,
ch:[{l:'Custom holds: the old walk out',fx:'b people -3; b food 9; b lore -5; b chant -4; b bond -4'},
{l:'Everyone shares, and everyone thins',fx:'b food -4; b bond 6',ch:[[.5,'b people -4','The weakest die anyway, slowly.']]},
{l:'Eat the dogs',fx:'b food 8; b lore -2; ba hunt -10'}]},
{id:'b_stranger',t:'The Man in the Leaves',w:10,who:'Children, shouting',
x:`The children have found a man at the forest edge with a broken leg and a tongue no one knows. His people are the ones who live under the trees and are never seen. He has herbs in a pouch and fear in his face.`,
q:`"Is it a person? What do we do with it?"`,
ch:[{l:'Nurse him until he can walk',fx:'b food -3; b lore 5; x skill 1; x carry grove_friend'},
{l:'Leave him where he lies',fx:'b bond 1'},
{l:'Take him into the band as kin',fx:'b people 1; b lore 3; b bond -3; x carry grove_friend'}]},
{id:'b_hearths',t:'The Bride-Price',w:12,who:'Two families, across one fire',
x:`A girl of the Water hearth and a boy of the Stone hearth want to marry. The Stone hearth offers three hides. The Water hearth says a daughter is worth five, and that the Stone hearth has always thought itself better than its price.`,
q:`"You see things. See who is right."`,
ch:[{l:'The Water hearth is right',fx:'b rift 9; b bond -2',pv:'Your own hearth, if you are of it, will remember kindly.'},
{l:'The Stone hearth is right',fx:'b rift 9; b bond -2'},
{l:'One feast, and each hearth fosters a child of the other',st:30,fx:'b rift -10; b food -5; b bond 5'},
{l:'It is not yours to judge',fx:'b standing -2; b rift 3'}]},
{id:'b_shelter',t:'The Painted Shelter',w:10,who:'Yourself',
x:`Above the {ground} there is a dry overhang where older hands than any you remember painted beasts in red. There is room on the wall. Ochre keeps for longer than a people does.`,
q:`What do you do with the wall?`,
ch:[{l:'Paint your sign among the beasts',fx:'x mark 1; b chant 2'},
{l:'Make it the place the band gathers each year',st:25,fx:'x mark 1; b bond 5; b food -3; bf gathering',pv:'A mark the band visits does not weather away.'},
{l:'Paint it where only you would look',fx:'x mark 1; ?x mark 1',pv:'Hidden paint keeps its colour.'}]},
{id:'b_split',t:'Too Many Fires',w:30,c:{bmin:{people:62},nbf:['split']},who:'The elders of the Stone hearth',
x:`The band has grown until the grounds cannot feed it in one place. The Stone hearth proposes to walk its own round, in the high country, and meet the rest at midsummer. Everyone knows that hearths which part at midsummer meet as strangers within three generations.`,
q:`"We are not leaving. We are only walking somewhere else. Will you bless it?"`,
ch:[{l:'Bless the parting',fx:'b people -22; b rift 14; b food 6; bf split; x carry hill_parted'},
{l:'Forbid it',st:35,fx:'b bond -10; b rift 12; bf split; x carry hill_forced',ch:[[.3,'b people -5','Knives come out at the midsummer fire.']]},
{l:'Bind both rounds to one chant and one gathering',mark:1,fx:'b people -20; b rift -4; b chant 6; b food 4; bf split; bf gathering'}]},
{id:'b_trade',t:'Shells and Daughters',w:10,who:'A shore man with a string of shells',
x:`The shore people offer salt, shell and black glass that takes an edge like nothing else. They want hides, and they want a marriage, because people who are kin do not rob each other. Mostly.`,
q:`"We have been watching your fires for years. Shall we be strangers or cousins?"`,
ch:[{l:'Trade hides for black glass',fx:'b lore 5; b food -4; x carry salt_trade'},
{l:'A marriage, and kin on the shore',fx:'b people 2; b lore 3; b rift 3; x carry salt_trade'},
{l:'Keep to our own',fx:'b bond 3'}]},
{id:'b_sick',t:'The Coughing Camp',rep:1,w:8,c:{bmin:{people:30}},who:'A mother, holding a hot child',
x:`A cough has come into the camp and it is not the ordinary cough. Four are down. The band looks to whoever will say what it is: a curse, a bad ground, or something that walks from mouth to mouth.`,
q:`"Say what to do. Anything. Say it."`,
ch:[{l:'Burn the shelters and move camp',fx:'b food -6; b people -2; b lore 2'},
{l:'Sing over the sick',shaman:1,fx:'',ch:[[.5,'b belief 10; b standing 5; b people -1','The fever breaks on the third night.'],[.5,'b belief -8; b people -5','You sing for nine nights. You bury five.']]},
{l:'Send the sick away from the fires',fx:'b people -4; b bond -8; x carry cast_out'},
{l:'Tend them with what you know of herbs',fx:'b people -3; b standing 2',ch:[[.4,'b people 2; b belief 4','Some of it works.']]}]},
{id:'b_chief',t:'Who Speaks for the Band',w:10,who:'{chief}, the headwoman, dying',
x:`{chief} is dying and the band must have someone to speak for it. Her son is steady and dull. {hunt} is bold and feeds people. Both look at you, because whoever the dead favour will have the easier time.`,
q:`"The spirits have an opinion, I suppose. They usually do."`,
ch:[{l:'Her son',fx:'ba chief 20; ba hunt -10; b bond 4'},
{l:'{hunt}',fx:'ba hunt 20; b food 5; b bond -3; b rift 3'},
{l:'"The dead choose me."',st:50,shaman:1,fx:'b standing 10; b bond -6; ba hunt -15; x carry shaman_chief'}]},
{id:'b_fire',t:'The Firekeeper\'s Offer',w:12,c:{bmin:{standing:25}},who:'{fire}, the firekeeper',
x:`{fire} keeps the stories: who begat whom, where the water is in a dry year. She offers to put your sayings into the long chant, between the flood and the naming of the stars, where children learn them before they can question them.`,
q:`"A thing sung is a thing kept. But I sing it my way, and so will those after me."`,
ch:[{l:'Let her set it in the long chant',fx:'b chant 14; b standing 3; ba fire 10; x carry chant_fixed'},
{l:'Teach it yourself, loosely, to anyone',fx:'b belief 6; b chant 5; ba fire -6'},
{l:'Words are not for fixing',fx:'b standing 2; ba fire -4'}]},
{id:'b_grain',t:'The Seed-Grass',w:14,c:{ground:'flats',bmin:{lore:25}},who:'An old woman with a handful of seed',
x:`Where the band spilled seed-grass at last year\'s camp, seed-grass has come up thick. An old woman says that if someone stayed through the year to chase off the birds, there would be more food on this one bank than in a season\'s walking. No one has ever stayed anywhere.`,
q:`"Is it permitted, to stay?"`,
ch:[{l:'Some stay the year and tend it',fx:'b lore 10; b food -4; b bond -3; x carry grain',ch:[[.3,'b people -3','The ones who stayed met the fever alone.']]},
{l:'Scatter seed, and come back for it',fx:'b lore 5; b food 2; x carry grain'},
{l:'The band walks. That is what a band is',fx:'b bond 4'}]},
{id:'b_pups',t:'The Den',w:10,who:'{hunt}, the hunt-leader',
x:`The hunters have killed a she-wolf and found the den. Five pups, eyes just open. {hunt} would knock them on the head. A boy has already picked one up, and it has stopped crying.`,
q:`"They grow into wolves. Or do they?"`,
ch:[{l:'Raise them at the fire',fx:'b food -3; b lore 5; x carry dogs'},
{l:'Kill them',fx:'ba hunt 5; b food 1'},
{l:'Let the boy keep one',fx:'b lore 2; b bond 2; x carry dogs'}]},
{id:'b_bones',t:'The Old One\'s Bones',w:14,c:{life:2,bf:['shaman_before']},who:'{fire}, the firekeeper',
x:`The band still carries a bundle of bones: the one who drummed before, long ago, whose words are in the chant. Yours. The bundle is heavy and the carriers are tired. {fire} asks what the old one would have wanted, since you claim to know.`,
q:`"Do the dead mind where they are left?"`,
ch:[{l:'The band carries them still',fx:'b belief 6; b chant 3; b food -2; x carry bones'},
{l:'Bury them at a mark, and gather there',fx:'x mark 1; b belief 3; bf gathering'},
{l:'Leave them to the birds, as with anyone',fx:'b standing 3; b belief -3; b bond 2'}]},
{id:'b_raid',t:'Taken in the Night',rep:1,w:7,c:{bmin:{people:35}},who:'A father',
x:`Strangers came at night, took two girls and the dried meat, and went toward the open country. The tracks are plain. So is the number of them.`,
q:`"They are our daughters. What are we?"`,
ch:[{l:'Follow and take them back',fx:'ba hunt 6',ch:[[.5,'b bond 6; b standing 4; x carry raid_blood','You come back with both girls and blood on the spears.'],[.5,'b people -5; b bond -3; x carry raid_blood','You come back with fewer than left.']]},
{l:'Send gifts and ask for them back',fx:'b food -5; b people -1; b standing -2'},
{l:'Move to ground where no one comes',fx:'b people -2; b bond -4; x ground forest'}]},
{id:'b_settle',t:'The Valley',forced:1,who:'{chief}, the headwoman',
x:`From the ridge the band looks down on a valley with a river in it, black soil, and no one\'s fires. There is enough here that no one would need to walk again. The old ones say a people that stops walking stops being a people. The young ones are already choosing where to build.`,
q:`"Do we stop?"`,
ch:[{l:'The band stops here',fx:'x settle whole'},
{l:'The Water hearth takes the valley, the Stone hearth the hills above',fx:'b rift 10; x carry hill_parted; x settle hills'},
{l:'Not yet. One more generation of walking',fx:'b bond 4; b lore -4; x wait 1'}]}
];
/* ===================== ENGINE: the Age of Bands ===================== */
(function(){
const ng=E.newGame,op=E.op,sp=E.special,ds=E.describe,ev0=E.evById,ch0=E.choose,on0=E.oname;
E.oname=id=>D.org[id]?D.org[id].n[Math.max(0,S.era-1)]:id;
E.evById=id=>D.bev.find(e=>e.id===id)||ev0(id);
E.newGame=function(seed,noBand){ng(seed);if(noBand)return S;
 S.era=0;S.year=1;S.band={people:40,food:38,bond:60,belief:5,standing:15,lore:10,chant:0,rift:10,marks:0,hid:0,skill:0,role:'none',hearth:'water',ground:'flats',stay:0,roles:{},carry:[],flags:{},used:{},lives:0,wait:0,haz:0};
 E.broles();S.body={eth:D.core,lang:'kal',rel:'anc',cls:'herder',reg:D.home,age:15,born:-14,start:null,rec:0,foreign:null};S.chron=[];S.cid=0;E.chron(D.bx.c_start,null);
 S.cur={kind:'cont',t:D.eras[0],who:'',x:D.bx.intro+'\n\n'+D.bx.goal,q:'',ch:[{l:D.ui.start}],next:'bturn'};return S;};
E.broles=function(){const B=S.band;for(const r in D.broles)B.roles[r]={n:E.pick(D.bnames[r]),att:50};};
E.bctx=function(){const B=S.band,c={ground:D.grounds[B.ground].n,hearth:D.bx.hearth[B.hearth]};for(const r in B.roles)c[r]=B.roles[r].n;return c;};
E.op=function(a,st,ctx,why){const B=S.band;
 if(a[0]==='b'){if(!B)return;const k=a[1],n=+a[2];B[k]=k==='people'?Math.max(0,B[k]+n):clamp(B[k]+n);return;}
 if(a[0]==='ba'){if(!B)return;for(const r in B.roles)if(a[1]==='all'||a[1]===r)B.roles[r].att=clamp(B.roles[r].att+(+a[2]));return;}
 if(a[0]==='bf'){if(B)B.flags[a[1]]=1;return;}op(a,st,ctx,why);};
E.special=function(a,ctx,why){const B=S.band,k=a[1],v=a[2];
 if(B&&S.era===0){if(k==='carry'){if(!B.carry.some(c=>c.id===v))B.carry.push({id:v,cid:ctx._cid||0});return;}
  if(k==='mark'){if(a.hid)B.hid+=+v;B.marks+=+v;return;}if(k==='skill'){B.skill+=+v;return;}if(k==='role'){B.role=v;if(v==='shaman'){B.flags.shaman=1;B.flags.shaman_before=1;}return;}
  if(k==='hazard'){B.haz+=+v;return;}if(k==='ground'){B.ground=v;B.stay=0;return;}if(k==='wait'){B.wait=S.turn+4;return;}if(k==='settle'){B.settle=v;return;}}
 sp(a,ctx,why);};
E.describe=function(st,ctx){const a=st.replace(/\$(\w+)/g,(m,k)=>ctx&&ctx[k]!==undefined?ctx[k]:m).split(/\s+/),X=D.bxd;
 if(a[0]==='b')return D.bres[a[1]]+' '+sg(+a[2]);if(a[0]==='ba')return(a[1]==='all'?X.all:D.broles[a[1]])+' '+X.warm+' '+sg(+a[2]);if(a[0]==='bf')return'';
 if(a[0]==='x'&&X[a[1]]!==undefined)return a[1]==='role'?fmt(X.role,D.bx.role[a[2]]):a[1]==='ground'?fmt(X.ground,D.grounds[a[2]].n):X[a[1]];return ds(st,ctx);};
D.bxd={all:'All who matter',warm:'warmth',carry:'This will be remembered long after the band has a home',mark:'A mark is left',skill:'You learn something you will keep',role:'You become {0}',hazard:'',ground:'The band moves to the {0}',wait:'',settle:'The wandering ends'};
/* ---------- a turn ---------- */
E.bcond=function(c){if(!c)return true;const B=S.band;if(c.bmin)for(const k in c.bmin)if(B[k]<c.bmin[k])return false;if(c.bmax)for(const k in c.bmax)if(B[k]>c.bmax[k])return false;
 if(c.bf)for(const f of c.bf)if(!B.flags[f])return false;if(c.nbf)for(const f of c.nbf)if(B.flags[f])return false;if(c.role&&B.role!==c.role)return false;if(c.ground&&B.ground!==c.ground)return false;if(c.life&&B.lives+1<c.life)return false;return true;};
E.bmk=function(ev){const B=S.band,ctx=E.bctx();const sh=B.role==='shaman';
 const ch=ev.ch.map(c=>{let lock='';if(c.st&&B.standing<c.st)lock=fmt(D.bx.lockSt,c.st);else if(c.shaman&&!sh)lock=D.bx.lockSh;else if(c.mark&&B.marks<1)lock=D.bx.lockMk;return{l:E.fill(c.l,ctx),pv:lock?[[2,lock]]:E.preview(c,ctx,null),off:lock?1:0};});
 S.st.ev[ev.id]=(S.st.ev[ev.id]||0)+1;if(!ev.rep)B.used[ev.id]=1;else B.used[ev.id]=S.turn+5;
 return{kind:'bev',id:ev.id,ctx,t:ev.t,who:E.fill(ev.who,ctx),x:E.fill(ev.x,ctx),q:E.fill(ev.q,ctx),ch};};
E.bturn=function(){if(S.over)return;const B=S.band;S.stage='band';S.rep=S.log;S.log=[];let ev=null;
 if(!B.used.b_dream)ev=E.evById('b_dream');
 else if(((B.lore>=70&&B.people>=38)||(B.lives>=6&&B.people>=25))&&!(B.wait>S.turn))ev=E.evById('b_settle');
 else{const c=D.bev.filter(e=>!e.first&&!e.forced&&E.bcond(e.c)&&(e.rep?!(B.used[e.id]>S.turn):!B.used[e.id]));ev=E.wpick(c,e=>e.w||10);}
 if(ev)S.cur=E.bmk(ev);else E.brange();};
E.brange=function(){const B=S.band,ch=[];for(const g in D.grounds){const G=D.grounds[g],pv=G.pv.slice();if(g===B.ground)pv.push([0,fmt(D.bx.stay,4*(B.stay+1))]);ch.push({key:g,l:G.n,pv:[[0,G.d]].concat(pv)});}
 S.cur={kind:'brange',t:D.bx.rangeT,who:'',x:D.bx.rangeX.replace('{standingLine}',B.standing>=30?D.bx.heard:D.bx.unheard),q:D.bx.rangeQ,ch};};
E.bact=function(){const ctx=E.bctx();S.cur={kind:'bact',t:D.bx.actT,who:'',x:D.bx.actX,q:D.bx.actQ,ch:D.bact.map(a=>({key:a.id,l:a.l,pv:E.preview({fx:a.fx,pv:a.pv||undefined},ctx,null)}))};};
E.bsim=function(){const B=S.band,g=B.ground;S.year+=5;S.turn++;S.body.age+=5;
 if(g==='flats'){B.food+=8;B.lore+=2;if(E.rng()<0.3){B.people*=0.93;E.say(D.bx.fever);}}
 else if(g==='high'){B.food+=E.ri(-3,9);B.bond+=3;B.rift+=2;}
 else if(g==='forest'){B.food+=3;B.people*=1.02;}
 else{B.food+=6;B.lore+=2;if(E.rng()<0.22){B.food-=7;B.people*=0.95;E.say(D.bx.raid);}}
 if(B.stay>0){B.food-=4*B.stay;E.say(D.bx.thin);}
 B.food-=4.5+B.people/10;if(E.rng()<0.14){B.food-=9;E.say(D.bx.winter);}
 if(B.food<=10){B.people*=0.86;B.bond-=4;E.say(D.bx.hungry);}else if(B.food>=40){B.people*=1.06;}else if(B.food>=22)B.people*=1.02;
 B.food=clamp(B.food);B.lore=clamp(B.lore+1.5);B.bond=clamp(B.bond+(55-B.bond)*0.08);B.rift=clamp(B.rift+(B.people>60?1:0));
 B.belief=clamp(B.belief+((B.chant*0.4+B.standing*0.4+(B.role==='shaman'?15:0))-B.belief)*0.12);B.chant=clamp(B.chant);B.people=Math.round(B.people*10)/10;
 if(B.people<=12){E.end('bandlost');return;}if(B.bond<=2){E.end('scattered');return;}
 const a=S.body.age,h={age:a<30?0.02:(a-30)*0.012+(a>=50?0.15:0),ill:0.03,hunger:B.food<=10?0.08:0,hunt:B.haz*0.06,acc:0.015};B.haz=0;
 let tot=0;for(const k in h)tot+=h[k];if(E.rng()<tot){let r=E.rng()*tot,c='age';for(const k in h){r-=h[k];if(r<0){c=k;break;}}E.bdie(c);return;}
 E.bturn();};
E.bdie=function(cause){const B=S.band,b=S.body;const tx=fmt(D.bx.death,D.cause[cause],b.age);E.chron(tx,null,'death');S.st.deaths[cause]=(S.st.deaths[cause]||0)+1;
 S.lives.push({n:S.life,eth:b.eth,lang:b.lang,rel:b.rel,cls:b.cls,reg:b.reg,born:b.born,start:b.rec?b.start:null,died:S.year,age:b.age,cause,rec:b.rec?1:0,legacy:fmt(D.bxd.legacy,D.bx.role[B.role],Math.round(B.people/5)*5,E.wordOf('chant',B.chant),B.marks)});
 S.facts.push({k:'death',l:S.life,q:fmt(D.test.death,D.ord[S.life]),a:D.cause[cause],w:['age','ill','acc','hunger','hunt','kill'].filter(c=>c!==cause).map(c=>D.cause[c])});
 S.cur={kind:'cont',t:D.dx.deathT,who:'',x:tx,q:'',ch:[{l:D.ui.cont}],next:'binter'};};
D.bxd.legacy='Died as {0}. The band numbered some {1}. The chant: {2}. Marks left: {3}.';
E.binter=function(){const B=S.band,J=40+E.ri(0,6)*20,steps=J/20,p0=B.people,c0=B.chant,list=[];let lost=0,hard=0;
 for(let i=0;i<steps;i++){B.chant*=B.flags.gathering?0.93:0.84;B.belief+=(B.chant*0.6-B.belief)*0.3;B.people=Math.min(110,B.people*(1+E.ri(-7,13)/100));if(E.rng()<0.25){B.people*=B.lore>40?0.9:0.8;hard++;}B.lore=clamp(B.lore+2.5);
  for(let m=B.marks-B.hid;m>0;m--)if(!B.flags.gathering&&E.rng()<0.12&&B.marks>B.hid){B.marks--;lost++;}if(B.people>60)B.rift=clamp(B.rift+1);}
 S.year+=J;S.turn+=steps;if(B.people<=12){E.chron(D.bx.gWinter,null,'loss');E.end('bandlost');return;}B.lives++;S.life++;B.bond=clamp(50+E.ri(-8,8));B.food=clamp(35+E.ri(-8,15));B.standing=12;B.role='none';B.flags.shaman=0;B.stay=0;B.witness=J<=40?1:0;B.gap=J;B.used.b_orlen=0;B.used.b_passing=0;B.used.b_chief=0;
 E.broles();B.hearth=E.rng()<0.5?'water':'stone';S.body={eth:D.core,lang:'kal',rel:'anc',cls:'herder',reg:D.home,age:15,born:S.year-14,start:null,rec:0,foreign:null};S.st.inter.push(J);
 if(c0>1)list.push(D.kw.chantKept[Math.min(3,Math.floor(B.chant/c0*4))]);if(lost)list.push(fmt(D.bx.gMark,lost));if(hard)list.push(fmt(D.bx.gHard,hard));list.push(fmt(D.bx.gPeople,Math.round(B.people/5)*5,Math.round(p0/5)*5));list.push(D.bx.gLore);
 list.push(fmt(D.bx.gRoles,Object.keys(B.roles).map(r=>B.roles[r].n+' ('+D.broles[r]+')').join(', ')));list.push(fmt(D.bx.bornB,D.bx.hearth[B.hearth]));
 E.chron(fmt(D.bx.bornB,D.bx.hearth[B.hearth]),null,'birth');S.log=[];B.proofs=[];B.pUsed={};
 S.cur={kind:'cont',t:D.bx.goneT,who:'',x:fmt(J<=40?D.bx.gone40:D.bx.gone,J),list,q:'',ch:[{l:D.ui.cont}],next:'bproof'};};
/* The showing: recognition by what you left behind, not by quiz. */
E.bproofCard=function(){const B=S.band,X=D.bx,ch=[],n=B.proofs.length;
 if(!B.pUsed.chant&&B.chant>=5)ch.push({key:'chant',l:X.pChant,val:Math.round(B.chant*0.5),pv:[[0,fmt(X.pv,E.wordOf('proof',B.chant*0.5))]]});
 if(!B.pUsed.mark&&B.marks>=1){const v=Math.min(30,12+B.marks*6);ch.push({key:'mark',l:X.pMark,val:v,pv:[[0,fmt(X.pv,E.wordOf('proof',v))]]});}
 if(!B.pUsed.skill&&B.skill>=1){const p=Math.min(0.9,0.4+B.skill*0.08),v=Math.min(26,10+B.skill*3);ch.push({key:'skill',l:X.pSkill,val:Math.round(v*p-6*(1-p)),p,v,pv:[[1,fmt(X.pvP,E.oddsW(p),E.wordOf('proof',v))]]});}
 if(!B.pUsed.wit&&B.witness)ch.push({key:'wit',l:X.pWit,val:18,pv:[[0,fmt(X.pv,E.wordOf('proof',18))]]});
 ch.push(n?{key:'done',l:X.pEnough,val:0,pv:[]}:{key:'none',l:X.pNone,val:-99,pv:[[0,X.pvNone]]});
 S.cur={kind:'bproof',t:X.proofT,who:'',x:(n?X.proof2:X.proofX)+' '+fmt(X.proofN,(g=>D.kw.gap[g<=0?0:g<=10?1:g<=22?2:3])(45-(10+Math.round(B.belief*0.3)+B.proofs.reduce((t,p)=>t+p[1],0)))),q:X.proofQ,ch};};
E.bproofPick=function(c,i){const B=S.band,o=c.ch[i],k=o.key;
 if(k==='none'||k==='done'||B.proofs.length>=2){if(k!=='none'&&k!=='done')E.bproofAdd(o);E.bproofEnd(k==='none');return;}
 E.bproofAdd(o);if(B.proofs.length>=2)E.bproofEnd(false);else E.bproofCard();};
E.bproofAdd=function(o){const B=S.band;B.pUsed[o.key]=1;if(o.key==='skill'){const ok=E.rng()<o.p;B.proofs.push([o.l,ok?o.v:-6,ok]);}else B.proofs.push([o.l,o.val,true]);};
E.bproofEnd=function(silent){const B=S.band,X=D.bx,parts=[[X.rBase,10],[X.rBel,Math.round(B.belief*0.3)]];for(const p of B.proofs)parts.push([fmt(p[2]?X.rOk:X.rFail,p[0]),p[1]]);
 const R=parts.reduce((s,p)=>s+p[1],0),ok=!silent&&R>=45;S.st.rec[0]++;if(!ok)S.st.rec[1]++;const list=silent?[]:parts.map(p=>p[0]+': '+E.helpsW(p[1]));
 if(ok){B.role='shaman';B.flags.shaman=1;B.flags.shaman_before=1;B.standing=clamp(40+(R-45));B.belief=clamp(B.belief+8);S.body.rec=1;S.body.start=S.year;E.chron(X.c_rec,null,'rec');}
 else{B.standing=silent?18:14;if(!silent)B.belief=clamp(B.belief-4);E.chron(X.c_norec,null,'norec');}
 S.cur={kind:'cont',t:X.proofT,who:'',x:ok?X.resYes:X.resNo,list,q:'',ch:[{l:D.ui.cont}],next:'bturn'};};
E.bresolve=function(card,i){const ev=E.evById(card.id),c=ev.ch[i],ctx=card.ctx,B=S.band;if(card.ch[i].off)return;
 const cid=E.chron(fmt(D.L.c_dec,ev.t,card.ch[i].l),null,'dec'),cx=Object.assign({},ctx,{_cid:cid});S.flash=fmt(D.L.c_dec,ev.t,card.ch[i].l);
 for(let st of E.fill(c.fx||'',ctx).split(';')){st=st.trim();if(!st)continue;const hid=st[0]==='?';if(hid)st=st.slice(1).trim();const a=st.split(/\s+/);if(a[0]==='x'&&a[1]==='mark'&&hid)a.hid=1;E.op(a,st,cx,ev.t);}
 if(c.ch){let r=E.rng();for(const b of c.ch){if(r<b[0]){const tx=E.fill(b[2],ctx);E.fx(E.fill(b[1],ctx),cx,ev.t);S.flash+=' '+tx;E.chron(tx,cid,'out');break;}r-=b[0];}}
 if(ev.ch.length>=3)S.facts.push({k:'dec',l:S.life,q:fmt(D.test.dec,D.ord[S.life],ev.t),a:card.ch[i].l,w:card.ch.filter((x,j)=>j!==i).map(x=>x.l)});
 const pk=S.st.pk[ev.id]||(S.st.pk[ev.id]=[]);pk[i]=(pk[i]||0)+1;
 if(B.people<=12){E.end('bandlost');return;}if(B.settle){E.settle(B.settle);return;}E.brange();};
E.settle=function(mode){const B=S.band;S.era=1;S.stage='';S.life0=S.life-1;
 for(const p of S.pops){if(p.eth===D.core)p.bel=clamp(15+B.belief*0.5);if(p.eth==='kh')p.loy=clamp(58-B.rift*0.3);}
 const f=S.pops[1];f.size=8+B.belief*0.2;f.bel=clamp(60+B.belief*0.3);
 const pr=S.org.priest;pr.pow=clamp(8+B.chant*0.12);pr.dev=clamp(70+B.belief*0.2);pr.aut=clamp(5+B.chant*0.1);
 S.reg.hk.integ=clamp(75-B.rift*0.6-(mode==='hills'?8:0));S.res.ord=clamp(35+B.bond*0.3);S.res.food=clamp(Math.max(25,B.food));S.res.kno=Math.min(8,Math.max(0,(B.lore-70)*0.3));
 S.leg.cha=clamp(40+B.standing*0.4);S.leg.tra=clamp(20+B.bond*0.15);S.renown=clamp(5+B.belief*0.15+B.marks*3);
 const cid=E.chron(D.bx.c_settle,null,'gain');
 if(B.rift>55&&!B.carry.some(c=>c.id==='hill_forced'))E.fx('m eth:kh -8 p the quarrel of the hearths in the wandering years',{_cid:cid},D.bx.settleT);
 const list=[];for(const c of B.carry){const d=D.bcarry[c.id];if(c.id==='chant_fixed')S.flags.chant_fixed=1;const id=E.chron(d.x,c.cid||cid,'carry');E.fx(d.fx,{_cid:id},d.x);list.push(d.x);}
 S.queue=[];S.body.rec=1;S.body.start=S.year;S.cleav=E.cleavage();S.advs=[];E.newAdvs();S.snaps=[];E.snap();S.log=[];S.rep=[];S.flash='';
 S.cur={kind:'cont',t:D.bx.settleT,who:'',x:fmt(D.bx.settled,S.body.age),list,q:'',ch:[{l:D.ui.cont}],next:'turn'};};
E.choose=function(i){const c=S.cur;if(!c||S.over||!c.ch||!c.ch[i])return;
 if(c.kind==='cont'&&(c.next==='bturn'||c.next==='binter'||c.next==='bproof')){S.flash='';if(c.next==='bturn')E.bturn();else if(c.next==='binter')E.binter();else E.bproofCard();return;}
 if(c.kind==='bev'){if(c.ch[i].off)return;S.flash='';E.bresolve(c,i);return;}
 if(c.kind==='brange'){const B=S.band,g=c.ch[i].key;if(g===B.ground)B.stay++;else{B.ground=g;B.stay=0;}E.bact();return;}
 if(c.kind==='bact'){const a=D.bact[i];E.fx(a.fx,E.bctx(),a.l);const pk=S.st.pk.bact||(S.st.pk.bact={});pk[a.id]=(pk[a.id]||0)+1;E.bsim();return;}
 if(c.kind==='bproof'){E.bproofPick(c,i);return;}ch0(i);};
})();
