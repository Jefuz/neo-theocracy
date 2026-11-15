"use strict";
/* ===================== DATA ===================== */
const D={};
D.title='Neo-Theocracy';
D.core='kr';D.home='kv';
/* Peoples: shared name roots mark kinship (fam). */
D.eth={kr:{n:'River Kaldar',fam:'kal'},kh:{n:'Hill Kaldar',fam:'kal'},so:{n:'Coast Soranni',fam:'sor'},sv:{n:'Steppe Sorvek',fam:'sor'},im:{n:'Plain Imeri',fam:'ime'},is:{n:'Mountain Imeshi',fam:'ime'},tu:{n:'Tuun',fam:'tuu'}};
D.lang={kal:{n:'Kaldic',fam:'kal'},hkal:{n:'High Kaldic',fam:'kal'},sor:{n:'Soran',fam:'sor'},vek:{n:'Steppe Soran',fam:'sor'},ime:{n:'Imeric',fam:'ime'},imh:{n:'High Imeric',fam:'ime'},tuu:{n:'Tuunish',fam:'tuu'}};
D.rel={ret_k:{n:'Returning Way (Keepers)',fam:'ret'},ret_s:{n:'Returning Way (Seekers)',fam:'ret'},anc:{n:'Kaldar Ancestor Rites',fam:'anc'},sky:{n:'Sky Oath',fam:'sky'},lamp:{n:'Nine Lamps',fam:'lamp'},lamp_h:{n:'Hidden Lamp',fam:'lamp'},grove:{n:'Grove Rites',fam:'grove'}};
D.cls={farmer:{n:'Farmers',pw:.7,tw:20,gr:.035},herder:{n:'Herders',pw:.7,tw:16,gr:.03},warrior:{n:'Warriors',pw:2.5,tw:30,gr:.02},merchant:{n:'Merchants',pw:2,tw:50,gr:.03},artisan:{n:'Artisans and workers',pw:1,tw:30,gr:.03},noble:{n:'Nobles',pw:4,tw:60,gr:.01},bonded:{n:'Bonded',pw:.3,tw:8,gr:.02}};
D.dims={eth:'People',lang:'Tongue',rel:'Faith',cls:'Class',reg:'Region'};
/* Regions. pops: "eth lang rel cls size wealth" */
D.reg={
kv:{n:'Kalda Vale',own:'p',tier:0,home:1,pops:['kr kal anc farmer 40 20','kr kal ret_s herder 18 18','kr kal anc warrior 10 30','kr kal anc noble 4 55']},
hk:{n:'High Kald',own:'p',tier:0,pops:['kh hkal anc herder 28 15','kh hkal anc warrior 10 28','kh hkal anc noble 3 50']},
rm:{n:'Reedmouth',own:'free',tier:1,pops:['so sor sky merchant 10 50','kr kal anc farmer 16 18','so sor sky artisan 8 30','tu tuu grove bonded 6 8']},
sm:{n:'Saltmarch',own:'free',tier:1,pops:['im ime lamp farmer 14 16','kr kal anc farmer 10 16','so sor sky merchant 4 45']},
ih:{n:'Imesh Heights',own:'free',tier:1,pops:['is imh lamp_h herder 22 14','is imh lamp_h warrior 8 25']},
gi:{n:'Greywater Isles',own:'league',tier:2,pops:['so sor sky artisan 12 22','tu tuu grove farmer 8 12']},
tw:{n:'Tuunwood',own:'moot',tier:2,pops:['tu tuu grove herder 26 12','tu tuu grove warrior 8 20']},
sc:{n:'Sor Coast',own:'league',tier:3,heart:'league',pops:['so sor sky merchant 14 60','so sor sky artisan 20 30','so sor sky farmer 24 20']},
vs:{n:'Vek Steppe',own:'horde',tier:3,heart:'horde',pops:['sv vek sky herder 36 16','sv vek sky warrior 16 30','sv vek sky noble 3 55']},
ip:{n:'Imer Plain',own:'crown',tier:3,heart:'crown',pops:['im ime lamp farmer 50 18','im ime lamp artisan 16 30','im ime lamp noble 5 70','im ime lamp bonded 20 6']}};
/* Organizations. n: name per era. */
D.org={
army:{n:['War Band','Royal Host','Imperial Army','National Army'],pow:35,loy:65,dev:50,aut:10,comp:{kr:.8,kh:.2},on:1,base:35,
 ag:{fx:'o army pow 4; o army aut 6; r tre -3; r ord 4',law:{rec:'core'},x:'The captains ruled by the spear and paid themselves first.'}},
priest:{n:['Circle of Keepers','Temple of the Return','Temple of the Return','Church of the Return'],pow:12,loy:85,dev:90,aut:5,comp:{kr:1},on:1,base:25,
 ag:{fx:'o priest pow 4; o priest aut 7; g rel:ret_k loy 3; r tra 1',law:{rel:'cult',recog:'priest'},x:'The Keepers ruled from the Empty Seat and gathered tithes in your name.'}},
council:{n:['Elder Council','Royal Chancery','Imperial Bureaucracy','Civil Service'],pow:30,loy:55,dev:40,aut:20,comp:{kr:.75,kh:.25},on:1,base:30,
 ag:{fx:'o council pow 4; o council aut 6; r leg 3; r tre 3',law:{lang:'kaldic',tax:'head',recog:'urn'},x:'The council ruled by tally and seal and trusted no voice it could not file.'}},
merch:{n:['Trader Kin','Merchant Houses','Great Houses','Banks and Combines'],pow:8,loy:50,dev:30,aut:20,comp:{kr:.6,so:.4},on:1,base:15,
 ag:{fx:'o merch pow 5; o merch aut 5; r tre 2; r kno 2',law:{rel:'tol',lang:'multi'},x:'The trading houses ruled through debts and let every port keep its own gods.'}},
noble:{n:['Clan Heads','Noble Houses','Landed Peers','Old Families'],pow:30,loy:50,dev:35,aut:25,comp:{kr:.7,kh:.3},on:1,base:28,
 ag:{fx:'o noble pow 5; o noble aut 5; g cls:farmer grv 4',law:{land:'estates',gov:'federal'},x:'The great families ruled as a circle of equals and fenced what they could.'}},
school:{n:['Lore Houses','Lore Houses','Academies','Universities'],pow:10,loy:50,dev:30,aut:20,comp:{kr:1},on:0,base:20,
 ag:{fx:'o school pow 4; r kno 3',law:{lang:'multi',recog:'trial'},x:'The scholars ruled by commission and report.'}}};
/* Laws. First option is the starting one. */
D.laws={
lang:{n:'Tongue of rule',opts:{custom:{n:'Each land its own tongue',fx:'o council pow -3',d:'Slow drift to each region\'s majority tongue. Local notables fill offices.'},kaldic:{n:'Kaldic only',req:'writing',fx:'o council pow 4; r leg 3; g lang:kal loy 3',d:'Offices open only to Kaldic speakers. Fast language shift where the oath opens the door, resentment where it does not.'},multi:{n:'Many tongues, sworn interpreters',req:'writing',fx:'r tre -5; o council pow -2; g core loy -3',d:'Offices open to all literate. Little language shift. Costs treasury.'}}},
rel:{n:'Faith',opts:{tol:{n:'Every hearth its rites',fx:'o priest loy -4',d:'Slow conversion by neighbourhood. The Keepers resent it.'},cult:{n:'The Returning Way alone',fx:'o priest loy 8; o priest pow 5; r ord 2; v crown att -8',d:'Fast conversion to the Keepers. Other faiths and Seekers aggrieved. The Imeric Crown is offended.'},sync:{n:'All rites under the Return',fx:'o priest loy -6; g rel:ret_s loy 4',d:'Other gods are honoured as faces of the Return. Moderate conversion toward the Seekers.'}}},
cit:{n:'Belonging',opts:{kin:{n:'Kaldar by blood',fx:'g core loy 4',d:'Non-Kaldar are subjects. They assimilate slowly and resent exclusion.'},oath:{n:'Any who swear the oath',fx:'g core loy -5; o noble loy -4',d:'Opens assimilation and integration. A foreign-born incarnation is doubted less.'}}},
rec:{n:'Arms',opts:{core:{n:'Kaldar spears only',fx:'o army loy 4',d:'A loyal, narrow army: low coup risk, excluded peoples have no stake.'},all:{n:'Levy of all peoples',fx:'o army pow 5; o army loy -4; ?x cohere 1',d:'A broad army mirrors the realm, including its grievances. Muster rolls count every people, so you learn their numbers. Men mustered by people remember which people they are.'},merc:{n:'Hired riders',req:'coinage',fx:'o army pow 8; r tre -6; o army loy -6',d:'Strong and costly. Fills the ranks with steppe and hill fighters.'}}},
land:{n:'Land',opts:{commons:{n:'Clan commons',fx:'',d:'No one gains, no one loses.'},estates:{n:'Noble estates',fx:'o noble loy 8; o noble pow 5; r food 4',d:'More grain, richer nobles, aggrieved farmers and bonded.'},free:{n:'Freeholds',fx:'o noble loy -10; g cls:farmer loy 6',d:'Content farmers, angry nobles.'}}},
tax:{n:'Revenue',opts:{kind:{n:'Tribute in kind',fx:'',d:'Light, falls on farmers and herders.'},head:{n:'Head tax',req:'writing',fx:'r tre 4; ?x cohere 1',d:'More revenue. Falls hardest on the poor. The collectors\' rolls count every head and hearth, so you learn numbers and wealth. Being listed also hardens who people think they are.'},tariff:{n:'Tariffs on trade',req:'coinage',fx:'r tre 4; o merch loy -8; v league att -8',d:'Most revenue with coinage. Merchants and the League of Sor object.'}}},
recog:{n:'Recognition of the Returner',opts:{priest:{n:'The Keepers\' Search',fx:'o priest pow 4; o priest loy 4',d:'The priesthood finds you. Their devotion and autonomy decide how hard they look.'},urn:{n:'The Council Urn',req:'writing',fx:'o council pow 5; o priest loy -8',d:'Lots drawn under the council\'s seal. The council decides.'},trial:{n:'Trial of Memory',fx:'o priest loy -6; r cha 4',d:'Anyone may claim. Popular belief judges, and your memory answers count for more.'}}},
gov:{n:'Rule of the lands',opts:{direct:{n:'Governors from the Vale',fx:'',d:'Faster integration, more resentment in unintegrated lands.'},federal:{n:'Chartered lands',fx:'o noble loy -3; r leg 2',d:'Less resentment and revenue, slower integration, easier exit for lands that never integrated.'}}}};
D.tech={writing:{n:'Writing',k:16,era:1,fx:'r leg 5',d:'Unlocks language law, head tax and the Urn.'},irrigation:{n:'Irrigation',k:16,era:1,fx:'r food 8',d:'More food each turn.'},iron:{n:'Iron',k:22,era:1,fx:'o army pow 8',d:'A stronger army.'},coinage:{n:'Coinage',k:30,era:2,fx:'o merch pow 8',d:'More revenue. Unlocks tariffs and hired riders.'},roads:{n:'Roads',k:36,era:2,fx:'r ord 4',d:'Faster integration, migration to the Vale.'},schools:{n:'Schools',k:46,era:2,fx:'',d:'Doubles language shift. Founds the schools as an order.'},press:{n:'Printing',k:56,era:3,fx:'r kno 4',d:'Knowledge and language shift accelerate.'},steam:{n:'Steam',k:70,era:3,fx:'o merch pow 10',d:'Farmers become workers. The last age begins.'}};
D.eras=['','Age of Clans','Age of Kings','Age of Empires','Age of Engines'];
D.riv={
league:{n:'League of Sor',kin:'so',str:45,att:55,ag:'trader',d:'Merchant republic. Wants open trade and safe Soranni. Punishes tariffs with embargo, rewards friendship with silver and learning.'},
horde:{n:'Sorvek Horde',kin:'sv',str:55,att:40,ag:'raider',d:'Raids the weak, respects the strong. Tribute buys seasons, not friendship.'},
crown:{n:'Imeric Crown',kin:'im',str:65,att:45,ag:'hegemon',d:'Guardian of the Nine Lamps. Protects Lamp-faithful everywhere, covets Imeri lands, and backs rival claimants when offended.'},
moot:{n:'Tuun Moot',kin:'tu',str:35,att:55,ag:'warden',d:'Wants the forest left alone. Never conquers, but shelters rebels when wronged.'}};
D.names={kal:['Haral','Senna','Edrin','Vessa','Orlen','Maren','Tovik','Ysolde','Brann','Kelda','Joska','Davit'],sor:['Ila','Tabar','Mirek','Sava','Dorun','Yelka','Oskan','Zoya'],ime:['Ushet','Naburi','Tiamar','Eshan','Ninsa','Belit','Arkan','Sumu'],tuu:['Aino','Vali','Ilmo','Tarja','Kauko','Sorja','Oiva','Lempi']};
D.signs=['A child who names the three stones of Stonewater Ford','A child who refuses salt until the first snow','A child who knows the last line of the unsung chant','A child born with the ash mark on the left palm','A child who chooses the cracked bowl among nine','A child who greets the eldest Keeper by a secret name'];
D.res={tre:'Treasury',food:'Food',ord:'Order',kno:'Knowledge',cha:'Charisma',tra:'Tradition',leg:'Law'};
D.attr={loy:'loyalty',bel:'belief',grv:'grievance',w:'wealth',fear:'fear',pow:'power',dev:'devotion',aut:'autonomy',att:'attitude',str:'strength',integ:'integration',unrest:'unrest',size:'numbers'};
D.cause={age:'old age',ill:'illness',kill:'assassination',acc:'accident',war:'battle',coup:'a coup of the officers',rite:'the rite of return',obscure:'obscurity',exec:'execution as a false claimant',revolt:'a failed rising'};
/* Directives */
D.dirs=[
{id:'court',l:'Hold court',d:'Order +3, Tradition +1.'},
{id:'law',l:'Proclaim a law',d:'Change one law. Tradition -3. Laws steer the slow drift of tongues, faiths and offices.',sub:1},
{id:'tech',l:'Fund a craft',d:'Spend Knowledge on the next craft.',sub:1},
{id:'expand',l:'Expand the realm',d:'March or treat with a neighbouring land. New peoples arrive unintegrated.',sub:1},
{id:'patron',l:'Grant patronage',d:'Treasury -8. A people or an order gains wealth and loyalty.',sub:1},
{id:'repress',l:'Repress a people',d:'Fear hides grievance and feeds it. They will remember.',sub:1},
{id:'integrate',l:'Bind a land closer',d:'Treasury -10. Integration +12 through roads, offices and marriages.',sub:1},
{id:'teach',l:'Walk and teach',d:'Belief +8 in one land, Charisma +2. Your next birth leans toward it.',sub:1},
{id:'reform',l:'Remake an order',d:'Open its ranks to all peoples, or purge its entrenched heads.',sub:1},
{id:'listen',l:'Walk unseen',d:'This turn you see true grievance behind public loyalty, and learn one advisor\'s leaning.'},
{id:'tst',l:'Dictate your testament',d:'Regent, sign of return, prophecy of birth, hidden cache. Successors may honour, twist or ignore it.',sub:1},
{id:'rite',l:'Die by the rite of return',d:'End this life now. Belief +10 everywhere, Charisma +15, Order -10. The interregnum begins.',sub:1}];
/* Interface and log strings */
D.L={
intro:'You are the shaman of the River Kaldar, and you have died before. This the Kaldar half believe. In this body you are twenty years old and the clans of Kalda Vale and High Kald bring you their quarrels. You will rule until this body fails. Then you will be born again, somewhere, to someone, into a world that went on without you. Whether it lets you back in is the game.',
goal:'The age of clans will pass through kings and empires to the Age of Engines, and at its end stands the Waking: the moment the world\'s machines begin to think. What your realm is on that day decides how you are judged. If a false Returner holds your seat through two of your lives, you never return at all.',
death:'This body dies of {0} in year {1}, aged {2}. The chant begins. Somewhere a child is drawing breath.',
regHon:'Your testament was honoured: the {0} held the regency.',regIgn:'Your testament was set aside: you named the {0}, but the {1} took the regency.',regNone:'You named no regent. The {0}, strongest at your death, took the regency.',regJunta:'The officers who killed you ruled in their own name.',
born:'You were reborn among the {0}, speakers of {1}, of the {2}, to a family of {3} in {4}.',bornF:' That land lies under the banner of the {0}.',
gone:'While you were gone',goneNone:'Little changed.',
secede:'{0} broke away ({1}).',seize:'The {0} seized {1}.',annex:'{0} joined the realm.',
revoltDown:'A rising of the {0} was drowned in blood by the regents.',revoltUp:'The people rose and broke the regents. The {0} was scattered.',
lawChg:'The regents changed the law of {0} to "{1}".',techGot:'The craft of {0} was mastered.',techDiff:'The craft of {0} arrived with traders and wanderers.',
era:'The {0} begins.',cacheLost:'Your hidden cache was found by the {0}.',cacheKept:'Your hidden cache lay untouched: Treasury +{0}.',
signHon:'The sign you left was kept and searched for',signTw:'The sign you left was taught to another child',signIgn:'The sign you left was forgotten',
prophHit:'You were born where you prophesied',prophMiss:'You were born outside your own prophecy',
recYes:'You are recognized. The seat is yours again.',recNo:'You are not recognized. A child named {0}, raised by the {1}, sits in your seat.',recNo2:'For a second lifetime another wears your name. The realm has learned to do without the one who made it.',
raid:'Sorvek riders raided {0}.',embargo:'The League of Sor closed its ports to your traders.',boon:'League ships brought silver and books.',champ:'The {0} declared itself protector of the {1} in your lands.',shelter:'The Tuun Moot sheltered rebels at the forest edge.',
whisper:'Whispers: songs in the taverns stop when your stewards enter.',officers:'The officers dine apart and fall silent when you pass.',
famine:'Famine. The weakest die first.',langMile:'{0} is now the tongue of {1}% of your subjects.',orgMile:'The {0} is now {1}% {2}.',
coupI:'The officers set the council aside and ruled by decree.',collapseI:'Order failed during the regency. The outer lands went their own way.',
sing:'The Waking',cap:'The engines wake without waiting for you.',
revoltWin:'The rising carries you to the seat by force.',revoltLose:'The rising fails. You die on the road, and your birth people pay for it.',
exileEnd:'You lived {0} years outside the seat and died in {1}.',
regency:'You are a child on the seat. The regents decide in your name this season.',
expWin:'{0} is taken.',expLose:'The march on {0} fails.',treatWin:'{0} swears to the realm under a pact.',treatLose:'{0} takes your gifts and declines.',
advLean:'You watched {0}: {1}.',lean:['an honest counsellor','leans toward their own people','serves their own people first']};
D.end={
axis:{n:'The Living Axis',win:1,x:'The machines wake inside a temple that obeys you. They are taught your chant as their first language, and when they ask who made the world, the Keepers point at you.'},
common:{n:'The Commonwealth',win:1,x:'The machines wake inside a state of laws that would run without you, and knows it. You are its founder, honoured and unnecessary. It is the most durable thing you built.'},
many:{n:'The Many-Voiced Realm',win:1,x:'The machines wake speaking several tongues at once, because no one people owns the realm. Each believes you were born among them. Each is right.'},
one:{n:'One People',win:1,x:'The machines wake into one tongue, one faith and one name for the people. What the others were is kept in archives. It was not gentle, and it held.'},
survivor:{n:'The Survivor',win:0,x:'The machines wake in a realm that is neither obedient, lawful, plural nor one. You endured. That is all that can be said.'},
collapse:{n:'Collapse',win:0,x:'Order failed. The seat stands in an empty hall.'},
revolution:{n:'Revolution',win:0,x:'The silence broke all at once. Those who cheered you last spring pulled down your gate this autumn.'},
secession:{n:'Secession',win:0,x:'Land by land the realm unbound itself, until only the Vale answered.'},
conquest:{n:'Conquest',win:0,x:'A foreign banner flies over Kalda Vale.'},
coupreg:{n:'The Coup Holds',win:0,x:'The officers found a Returner who salutes. Two lifetimes on, no one asks for another.'},
hollow:{n:'The Hollow Seat',win:0,x:'The institution you built has learned to produce its own Returner. It no longer needs the original.'},
puppet:{n:'The Foreign Returner',win:0,x:'A claimant raised abroad sits in your seat, and the realm takes its orders from elsewhere.'}};
D.ui={tabs:['Court','Peoples','Orders','Lands','Rivals','Laws','Lives','Chronicle','Menu'],
cleav:['Cross-cutting: memberships overlap, quarrels stay local','Mixed: some fault lines are forming','Reinforcing: people, faith, class and land line up. Conflicts will escalate fast'],
body:['hale','aging','failing','frail'],knives:['no plots','whispers of plots','knives are out'],
tiers:['Certain','Likely','Hidden'],hidden:'More will follow from this, later.',remember:'will remember this',rememberP:'will remember this for generations',
start:'Begin',cont:'Continue',seed:'Seed',newg:'New game',load:'Continue saved game',exp:'Export save',imp:'Import save',theme:'Light / dark',dbg:'Run self-test (500 games)',
counsel:'Counsel',since:'Since last season',q:'Decide',back:'Back'};
