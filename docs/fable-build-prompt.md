<role>
You are a senior game designer and front-end engineer. Build a complete, playable, text-based strategy game in the spirit of Civilization and Theocracy (Philos Laboratories, 2000), where play happens through questions the game puts to the player rather than a tile map. Further reference points: King of Dragon Pass and Six Ages (advisor-driven events), Crusader Kings (decisions that echo generations later), Victoria 3 (population blocks with culture, religion and occupation), Suzerain (political consequence), Into the Breach (telegraphed consequences). Avoid the shallowness of Reigns-style binary swiping.
</role>

<process>
1. First, ask me up to 8 design questions in one message, numbered, each with your recommended default, so I can answer briefly or reply "defaults". Ask only what materially changes the build. Cover at least: setting and era span, how much is supernatural beyond the reincarnation, how the birth of each new incarnation is decided, number of groups and identity dimensions, game length, and language of the game text. Then stop and wait for my answers.
2. After my answers: a design brief (max 300 words: core tensions, identity dimensions, the life and interregnum cycle, victory paths, three sample events), then the complete HTML file, then known limitations and the five most valuable next additions.
3. If two systems below collide or bloat the code, simplify and say so in the brief. Gameplay feel beats checklist completeness.
</process>

<deliverable>
One self-contained HTML file: inline CSS and vanilla JavaScript, no libraries, CDNs, web fonts or network calls. It must run offline by opening the file. The file must be complete and never truncated. If length becomes a constraint, ship a fully working engine with fewer events rather than a broken file with many; the data schema makes adding events later easy.
</deliverable>

<premise>
Working title: Neo-Theocracy. The player is a shaman who truly reincarnates; within the game world this is real, not a pretense. Play begins in a small tribal society and spans centuries as the polity grows, possibly into a theocracy built around the player. In each life the player rules from early adulthood until death; then time jumps to the next incarnation's early adulthood, and the player returns to a world that has moved on without them. Events pop up as questions from petitioners, advisors, envoys and rivals; the player decides; the ramifications play out much later as shifts in which groups hold power, control and resources along organizational, ethnic, linguistic, cultural, religious and class lines. Tone: grounded and morally ambiguous, no caricature of any group, religion or ideology. Every strategy (assimilation, pluralism, federalism, repression, patronage, reform) must be viable and costly.
</premise>

<reincarnation>
This is the frame of the whole game.
1. Life cycle: each life has several turns of rule. Death comes from age, illness, war, accident or assassination, with risk raised by the groups and organizations the player has alienated. The player sees risk signals but not the exact date.
2. Testament: as a standing action at any time, the player can leave instructions for after death: a regent or council, prophecies, signs by which the next incarnation will be known, hidden caches. Successors honor, twist or ignore them according to their own interests.
3. Interregnum: the jump until the new body's early adulthood (about 15 to 20 years) is simulated, not skipped. Slow variables keep drifting, rivals act, and whoever holds power at the death runs the state by their own agenda. On return the player gets a "While you were gone" report showing what changed and why. This is where delayed consequences are most visible.
4. Birth: each new incarnation is born into a specific pop with an ethnicity, language, religion, class and region. The birth group shapes who trusts the player, their native language and their starting network. Born into a marginalized group, the player must climb back. How birth is determined is settled by my answers; propose a default (for example weighted random toward regions where belief in the player is strongest, nudged by testament and spiritual investment).
5. Recognition: the player must be recognized before ruling again. Whoever controls the search for the reincarnation gains great power, and whoever controls recognition controls the reincarnation (the Tibetan tulku system and the Qing Golden Urn are useful real-world models). Factions may promote rival claimants. The institution built around the player may prefer a pliable false claimant, or no return at all.
6. Recognition tests ask the player about their own past lives, generated from the chronicle of this playthrough ("Which chief did you exile at the river ford?", "What sign did you leave for your return?"). Correct answers raise recognition. This rewards attention and makes the chronicle matter.
7. Childhood vignette: one or two choices before adulthood, for example reveal yourself early (faster recognition, but a child under regents and exposed to enemies) or stay hidden (safer, but others entrench).
8. Persistence: across lives the player keeps their own knowledge and the soul's renown; body, birth group, personal network and recognition reset. Belief that the reincarnation is real is itself a variable per group; some groups never believe.
9. Charisma against institution: the returning founder is pure charismatic authority; the organizations that ruled during the interregnum are routinized authority (Weber). This tension, including the irony that the church built around the player may not want them back, should drive many events.
10. Optional: voluntary death (ritual or sacrifice) as a strategic reset with real costs.
</reincarnation>

<population_model>
1. Population is made of pops (population blocks). Each pop has an ethnicity, a language, a religion (and sect), a culture, a class or occupation, and a home region. Dimensions can diverge: a pop can be ethnically A, speak language B and follow religion C.
2. Groups are aggregations of pops along any one dimension, so every person belongs to several groups at once.
3. Organizations: war band or army, priesthood, bureaucracy, merchant houses or guilds, noble houses, schools, and others fitting each era. Each has power, resources, control over regions or policy areas, and a membership composition drawn from the pops. Who staffs an institution matters: an officer corps dominated by one ethnic group behaves accordingly.
4. Every group and organization tracks size, wealth, political power, control (offices, institutions, regions), loyalty to the regime, belief in the reincarnation, grievance, cohesion and capacity to mobilize.
5. Cleavage structure: measure how far the dimensions overlap. When ethnicity, religion, class and region line up (reinforcing cleavages), conflicts escalate faster and compromise gets harder; cross-cutting memberships dampen conflict. Show this to the player as a readable indicator.
6. Memory: groups remember favors and slights across lives. Most memories decay; some (massacres, broken oaths, founding grants) never fully fade and resurface in later events that name the original decision, the life and the year.
</population_model>

<delayed_consequences>
Use two engines; both are required.
1. Authored: choices set flags that unlock follow-up events 2 to 15 turns later, often in a later life. At least 30% of choices do this; at least 10 chains have 3 or more steps.
2. Emergent: slow variables drift every turn and through each interregnum according to current policy, and compound over generations: language shift, conversion, assimilation, differential population growth, migration, wealth accumulation, and the composition of each organization. Example: an official administrative language decides who can enter the bureaucracy; two generations later that language group controls it, and excluded speakers start organizing. When slow variables cross thresholds (a group's share of an institution, grievance combined with mobilization, a regional majority flipping), they trigger events.
3. Causality must be traceable: each group and organization view lists the main causes of its recent changes, and the chronicle links consequences to the decisions and the life that started them.
</delayed_consequences>

<mechanic_inspirations>
Abstract these; gameplay comes first.
1. Weber: charismatic, traditional and rational-legal authority as components of Legitimacy; routinization of charisma is central (see reincarnation, point 9).
2. Rokkan's cleavages (center against periphery, state against church, urban against rural, owners against workers) as recurring axes of conflict.
3. Preference falsification (Kuran) with threshold cascades (Granovetter): public compliance hides private dissent, so revolts arrive suddenly. Give indirect signals so collapse is surprising but never unfair.
4. The coup or civil war trap (Roessler): excluding groups from the army and power lowers coup risk but raises rebellion risk; including them does the reverse.
5. Gellner and Deutsch: groups blocked from mobility (education, office, trade) by language or religion turn toward nationalism; groups with open channels tend to assimilate.
6. Kin states (Brubaker): a rival sharing a minority's ethnicity or religion can champion it, and can sponsor a rival claimant.
</mechanic_inspirations>

<systems>
1. State resources: 4 to 6 (for example Treasury, Food, Order, Legitimacy, Knowledge), each with a trade-off and a failure state. Most power and wealth should live in groups and organizations, not in abstract national meters.
2. Regions: 8 to 12 named regions shown as a list, each with its pop mix, who controls it, and unrest. The polity starts with one or two and grows.
3. Rivals: 3 to 4 AI polities with distinct, consistent agendas, an attitude score, memory of the player's actions across lives, and kin ties to internal groups. Behavior follows the agenda so it can be learned.
4. Laws and technology: 12 to 20 nodes total, including laws on language, religion, citizenship, military recruitment, land, taxation and the procedure for recognizing the reincarnation, all of which shift the slow variables.
5. Eras: 4, from tribe to state, each with its own event pool; transitions follow the polity's development, not a fixed calendar.
6. Time: one turn equals five years of a life unless my answers say otherwise. Default length: about 6 lives over several centuries.
7. Victory: at least 3 paths, including reincarnation-specific ones (for example an institution that reliably recognizes and obeys the player, or a stable state that no longer needs a returning founder). Loss states: collapse, revolution, secession, conquest, coup, and lasting non-recognition (a false claimant holds power through two of the player's lives). Score at the end.
</systems>

<turn_loop>
During a life:
1. Report: compact state summary and what changed since last turn, with causes.
2. Council: 1 to 2 events, each ending in a question.
3. Directive: one strategic action from a standing menu (including testament).
4. Resolution: apply effects, drift slow variables, check thresholds, check death risk, run rival AI, write a chronicle entry, autosave.
On death: final testament check, interregnum simulation, "While you were gone" report, childhood vignette, recognition phase, then the new life begins.
</turn_loop>

<question_design>
1. Every event ends with a direct question to the player, posed by someone with a stake.
2. Mix types: dilemmas, budget allocation, timing (act now or wait), decisions under uncertain information, advisor disagreement, and recognition tests. At most half are plain two-option choices.
3. Telegraph effects in three tiers: certain (exact), probable (range or likelihood), hidden (revealed later). Never punish with an outcome the player could not anticipate within the fiction.
4. No dominant options: every choice is best in some plausible state.
5. Advisors: 3 to 4, each from a different group, with a hidden bias toward their group and a hidden accuracy. Advisors die and are replaced across lives; the player's knowledge of their predecessors carries over. The end screen reveals their records.
6. Writing: 40 to 120 words per event, concrete names, places and stakes; recurring characters who age, die and remember, and descendants who remember what the player did to their ancestors.
7. Templated events: besides handwritten events, include templates filled from the current state ("{group} in {region} demand {concession}"), so the actors in events are the groups the player's decisions created.
</question_design>

<content_volume>
At least 90 events across eras: at least 55 handwritten and at least 30 templates, plus interregnum outcome templates, childhood vignettes and the recognition test generator. Events do not repeat unless marked repeatable.
</content_volume>

<architecture>
1. Keep DATA (pops, groups, organizations, events, templates, laws, regions, rivals, advisors, strings), ENGINE (state, life cycle, interregnum, drift, thresholds, conditions, effects, AI) and UI (rendering) separate. All player-facing text lives in DATA.
2. Event schema: id, era, phase (rule, interregnum, childhood, recognition), weight, repeatable, declarative conditions (minimum and maximum values, group shares, required and forbidden flags), text, question, and choices with label, preview, effects per group or organization, chance, delayed effects and flags.
3. Seeded pseudorandom number generator. Show the seed on the start screen; same seed plus same choices reproduces the same game.
4. Saving: localStorage wrapped in try/catch, plus export and import of the save as a copyable text string.
5. Interface: keys 1 to 4 pick choices, Enter continues. Responsive, readable, light and dark mode. A groups view: sortable table by dimension with power, wealth, loyalty, belief, grievance and trend; selecting a group or organization shows its composition and the causes of its changes. A lives view listing past incarnations. Small SVG sparklines drawn from JavaScript.
6. End screen: chronicle of the whole game, the line of incarnations (birth group, years ruled, cause of death, legacy), victory or loss type, score breakdown, advisor track records, and the three longest causal chains from a decision to its final outcome.
</architecture>

<self_testing>
Include a debug mode (URL parameter ?debug=1) that:
1. Validates data at load: every referenced event, flag, group, organization, law and region exists; every chain is reachable.
2. Runs 500 headless simulated games with several bot policies (random, greedy, assimilationist, pluralist, repressive, a sensible heuristic).
3. Reports win and loss distribution per policy, average game length, lives per game, deaths by cause, interregnum lengths, birth group distribution, share of returns that end in non-recognition, events and thresholds that never fire, choices a greedy bot picks over 80% of the time, groups that never matter, games where all groups converge to one, and any NaN or undefined values.
If you can execute code, run it yourself and tune until: the random bot wins under 10%, the heuristic bot wins 35 to 60%, no event is dead, no choice is dominant, recognition fails sometimes but not routinely, and different policies produce visibly different group landscapes by the final era. Report the final numbers.
</self_testing>
