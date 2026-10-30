export interface TopicContent {
  id: string;
  title: string;
  category: string;
  summary: string;
  scripturePassages: { reference: string; text: string; explanation: string }[];
  mainArguments: { title: string; content: string }[];
  churchFathersQuotes: { father: string; work: string; quote: string }[];
  practicalTips: string[];
  commonMistakes: string[];
}

export const TOPIC_CONTENT: Record<string, TopicContent> = {
  s1: {
    id: "s1",
    title: "Sola Scriptura",
    category: "Scripture & Tradition",
    summary: "The doctrine of Sola Scriptura — that the Bible alone is the sole rule of faith — is self-refuting, historically unsupported, and would have been unrecognizable to the early Christians. Scripture itself points to the Church's authority and the necessity of Sacred Tradition.",
    scripturePassages: [
      { reference: "2 Thessalonians 2:15", text: "Stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter.", explanation: "Paul explicitly commands Christians to hold to oral traditions passed down by the Apostles, not just written Scripture." },
      { reference: "1 Timothy 3:15", text: "The church of the living God, a pillar and buttress of truth.", explanation: "Paul calls the Church — not the Bible — the pillar and foundation of truth, showing the Church has a role in preserving and teaching truth." },
      { reference: "2 Peter 1:20-21", text: "No prophecy of Scripture comes from someone's own interpretation.", explanation: "Scripture itself warns against private interpretation, pointing to the need for an authoritative interpretive body — the Church." },
    ],
    mainArguments: [
      { title: "Sola Scriptura is Self-Refuting", content: "The Bible nowhere teaches that Scripture alone is the sole rule of faith. This teaching must come from somewhere outside the Bible — which itself would be a tradition. The doctrine thus destroys itself by its own logic." },
      { title: "The Canon Requires Tradition", content: "The table of contents of the Bible (the canon) is not found in Scripture itself. It took centuries of Church councils (Rome 382, Hippo 393, Carthage 397) to formally define the biblical canon. Without Sacred Tradition and the Church's authority, we cannot even know which books belong in the Bible." },
      { title: "Historical Impossibility", content: "For the first 1500 years of Christianity, the majority of believers were illiterate and had no personal copy of Scripture. A system requiring Scripture alone would have made Christianity inaccessible to most Christians throughout history. The early Church relied on oral tradition, liturgy, and bishops." },
      { title: "Scripture Commands Oral Tradition", content: "Paul explicitly commands the Thessalonians to hold to 'traditions' delivered both by letter and by spoken word (2 Thess 2:15). He praises the Corinthians for 'maintaining the traditions even as I delivered them to you' (1 Cor 11:2). Scripture itself validates Tradition." },
    ],
    churchFathersQuotes: [
      { father: "St. Irenaeus of Lyon", work: "Against Heresies (c. 180 AD)", quote: "Suppose there arise a dispute relative to some important question among us: should we not have recourse to the most ancient Churches with which the apostles held constant intercourse, and learn from them what is certain and clear?" },
      { father: "St. Augustine", work: "Against the Epistle of Manichaeus (c. 397 AD)", quote: "I would not believe in the Gospel myself if the authority of the Catholic Church did not move me to do so." },
    ],
    practicalTips: ["Ask where the Bible's table of contents comes from", "Point out that the early Christians did not have personal Bibles"],
    commonMistakes: ["Don't attack the Bible — affirm it as sacred Scripture", "Avoid sounding anti-Bible; explain that Catholics use Scripture AND Tradition"],
  },
  s2: {
    id: "s2",
    title: "Catholic Books Added to the Bible",
    category: "Scripture & Tradition",
    summary: "Catholics did not add books to the Bible. Rather, the Catholic canon was established in the early Church councils of the 4th century. It was Martin Luther and the Protestant Reformers who removed seven books (the Deuterocanonicals) in the 16th century.",
    scripturePassages: [
      { reference: "Sirach 44:1", text: "Let us now praise famous men, and our fathers in their generations.", explanation: "The Book of Sirach (Ecclesiasticus), one of the contested books, was widely used by the early Church and quoted in the New Testament." },
      { reference: "2 Maccabees 12:46", text: "Therefore he made atonement for the dead, so that they might be delivered from their sin.", explanation: "This passage, from another contested book, supports the Catholic doctrine of praying for the dead and Purgatory." },
      { reference: "Matthew 5:17", text: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.", explanation: "Jesus affirmed the existing Jewish Scriptures, which in the Septuagint (Greek OT used by early Christians) included the Deuterocanonicals." },
    ],
    mainArguments: [
      { title: "The Deuterocanonicals Were in the Septuagint", content: "The Septuagint (LXX), the Greek translation of the Old Testament used by Jesus and the Apostles, included the seven books Protestants removed. The New Testament quotes from the Septuagint hundreds of times. These books were part of the Bible Jesus and the Apostles used." },
      { title: "Early Church Councils Defined the Canon", content: "The Councils of Rome (382 AD), Hippo (393 AD), and Carthage (397 AD) formally defined the 73-book Catholic canon. These councils were universally accepted for over 1,000 years. The 66-book Protestant canon didn't exist until Luther's Reformation in the 1500s." },
      { title: "Luther's Removals Were Theologically Motivated", content: "Martin Luther removed Maccabees partly because it contradicts his denial of Purgatory (2 Macc 12:46), and he wanted to remove James ('an epistle of straw') and Revelation too. His canon was shaped by theology, not history." },
      { title: "The Early Church Fathers Quoted These Books", content: "St. Clement of Rome, St. Irenaeus, St. Augustine, and countless Church Fathers cited the Deuterocanonicals as Scripture. Origen, Athanasius, and Jerome (who translated the Vulgate) all knew these books and most considered them canonical." },
    ],
    churchFathersQuotes: [
      { father: "Council of Carthage (397 AD)", work: "Canon 24", quote: "The canonical Scriptures are these: Genesis, Exodus, Leviticus, Numbers, Deuteronomy... Tobias, Judith, Esther, Ezra... Maccabees, Psalms..." },
      { father: "St. Augustine", work: "On Christian Doctrine", quote: "Now the whole canon of Scripture on which we say this judgment is to be exercised, is contained in the following books: Five books of Moses... two books of Maccabees." },
    ],
    practicalTips: ["Ask when the Protestant Bible was compiled — it was after Luther's Reformation", "Point out that Luther himself wanted to remove James and Revelation"],
    commonMistakes: ["Don't use the word 'Apocrypha' pejoratively — these are sacred Scripture to Catholics", "Avoid getting into a proof-texting battle; focus on history"],
  },
  s3: {
    id: "s3",
    title: "Catholics Worship Idols",
    category: "Scripture & Tradition",
    summary: "Catholics do not worship statues or images. The Church makes a clear distinction between latria (worship given to God alone), dulia (honor given to saints), and hyperdulia (special honor to Mary). Statues and images serve as visual reminders, not objects of worship.",
    scripturePassages: [
      { reference: "Numbers 21:8-9", text: "The LORD said to Moses, 'Make a fiery serpent and set it on a pole, and everyone who is bitten, when he sees it, shall live.' So Moses made a bronze serpent and set it on a pole.", explanation: "God himself commanded the making of a sacred image that people looked toward for healing — contradicting a blanket prohibition on all religious images." },
      { reference: "Exodus 25:18-20", text: "And you shall make two cherubim of gold... and the cherubim shall spread out their wings above, overshadowing the mercy seat with their wings.", explanation: "God commanded elaborate golden sculptures to be placed in the Ark of the Covenant and the Temple. Religious art was always part of biblical worship." },
      { reference: "Revelation 5:8", text: "The four living creatures and the twenty-four elders fell down before the Lamb... And when he had taken the scroll, the four living creatures and the twenty-four elders fell down before the Lamb, each holding a harp, and golden bowls full of incense, which are the prayers of the saints.", explanation: "The heavenly liturgy shows saints offering prayers to God — exactly what Catholics do when asking saints to intercede." },
    ],
    mainArguments: [
      { title: "Distinction Between Worship and Veneration", content: "The Catholic Church has always distinguished between latria (worship due to God alone) and dulia (honor/veneration given to saints). This distinction goes back to the early Church Fathers. Catholics honor saints but worship only God. This is not semantics — it reflects a fundamental difference in the acts performed." },
      { title: "God Commanded Religious Images", content: "The same God who said 'you shall not make idols' commanded Moses to make the Bronze Serpent, commanded the construction of golden Cherubim for the Ark, and ordered elaborate artwork in Solomon's Temple. The prohibition is against worshiping images as gods, not against sacred art itself." },
      { title: "No Different from Family Photos", content: "When a soldier carries a photo of his mother and kisses it, no one accuses him of worshiping a photo. The photo represents the person. Catholics use statues and images as reminders of holy men and women who are alive in God. The honor goes through the image to the person it represents." },
      { title: "The Church Has Always Condemned Idolatry", content: "The Second Council of Nicaea (787 AD) carefully defined the difference between the veneration of images (proskunesis) and the worship due to God alone (latria). The Catholic Church explicitly teaches that 'idolatry consists in divinizing what is not God' (CCC 2113). Catholics are not idolaters." },
    ],
    churchFathersQuotes: [
      { father: "St. John of Damascus", work: "On Holy Images (c. 730 AD)", quote: "I do not worship matter, I worship the God of matter, who became matter for my sake, and deigned to inhabit matter, who worked out my salvation through matter." },
      { father: "Second Council of Nicaea", work: "Definition (787 AD)", quote: "The honor paid to an image traverses it, reaching the model; and he who venerates the image, venerates the person portrayed in it." },
    ],
    practicalTips: ["Point to the Bronze Serpent in Numbers 21 — God commanded a sacred image", "Distinguish clearly: Catholics pray WITH the saints, not TO statues"],
    commonMistakes: ["Don't get defensive — calmly explain the theology of veneration vs. worship", "Avoid claiming Catholics 'never' pray in front of images — clarify what that prayer means"],
  },
  p1: {
    id: "p1",
    title: "Papal Infallibility",
    category: "Papacy & Authority",
    summary: "Papal infallibility is a very specific, narrow doctrine defined in 1870 that only applies when the Pope speaks ex cathedra on matters of faith and morals. It has been invoked only twice. Popes making personal mistakes or bad decisions does not contradict this doctrine.",
    scripturePassages: [
      { reference: "Matthew 16:18-19", text: "And I tell you, you are Peter, and on this rock I will build my church, and the gates of hell shall not prevail against it. I will give you the keys of the kingdom of heaven.", explanation: "Jesus gives Peter a unique authority — the keys of the kingdom — signifying supreme teaching and governing authority over the Church." },
      { reference: "Luke 22:32", text: "But I have prayed for you that your faith may not fail. And when you have turned again, strengthen your brothers.", explanation: "Jesus specifically prays for Peter's faith not to fail and commissions him to strengthen the other Apostles — a promise of special protection for Peter's teaching role." },
      { reference: "John 21:15-17", text: "'Feed my lambs... Tend my sheep... Feed my sheep.' He said to him the third time, 'Simon, son of John, do you love me?' Peter was grieved... Jesus said to him, 'Feed my sheep.'", explanation: "Jesus' triple commission to Peter establishes him as the supreme shepherd of the entire flock — a role that required reliable teaching authority." },
    ],
    mainArguments: [
      { title: "Infallibility is Narrowly Defined", content: "Papal infallibility does not mean the Pope is sinless, always right, or can't make personal errors. It means only that when the Pope formally defines a doctrine of faith or morals for the whole Church (ex cathedra), the Holy Spirit prevents him from teaching error. This has happened only twice: the Immaculate Conception (1854) and the Assumption (1950)." },
      { title: "Bad Popes Don't Refute the Doctrine", content: "The Church has had corrupt, immoral, and weak popes throughout history. But none of them formally defined heresy as doctrine. As G.K. Chesterton noted, the remarkable thing is that despite the very human failings of popes, the Church's formal teaching has remained consistent for 2000 years — which itself suggests divine protection." },
      { title: "Christ's Promise of Protection", content: "Jesus promised that 'the gates of hell shall not prevail' against the Church (Matt 16:18) and that He would be with the Church 'always, to the end of the age' (Matt 28:20). A church that officially taught error in matters of faith and morals could not fulfill this promise. Infallibility is the guarantee that Jesus' promise is kept." },
      { title: "Historical Consistency is Remarkable", content: "Despite centuries of political pressure, theological disputes, and human sinfulness, the formal teaching of the Catholic Church on matters of faith and morals has remained remarkably consistent. No other institution in history has maintained doctrinal unity across 2000 years and billions of members without some form of authoritative teaching protection." },
    ],
    churchFathersQuotes: [
      { father: "St. Irenaeus of Lyon", work: "Against Heresies 3:3:2 (c. 180 AD)", quote: "For it is a matter of necessity that every Church should agree with this Church [Rome], on account of its preeminent authority." },
      { father: "St. Cyprian of Carthage", work: "Epistle 59 (c. 252 AD)", quote: "He who does not hold the unity of the Church does not hold the law of God, the faith of the Father and the Son, life and salvation." },
    ],
    practicalTips: ["Always clarify what infallibility actually means before defending it", "Point out the narrow scope: only twice in 150+ years since the doctrine was defined"],
    commonMistakes: ["Don't defend every action of every pope — infallibility is not about that", "Avoid conflating personal holiness with the charism of infallibility"],
  },
  m1: {
    id: "m1",
    title: "Catholics Worship Mary",
    category: "Mary & Saints",
    summary: "Catholics honor and venerate Mary as the Mother of God and our spiritual mother, but they do not worship her. Worship (latria) is given to God alone. Asking Mary to pray for us is no different than asking a friend to pray — except Mary's intercession is uniquely powerful because she is with God in heaven.",
    scripturePassages: [
      { reference: "Luke 1:28", text: "And he came to her and said, 'Greetings, O favored one, the Lord is with you!'", explanation: "The angel's greeting to Mary — 'favored one' (kecharitomene in Greek) — indicates a unique fullness of grace given to Mary by God, showing her special status." },
      { reference: "Luke 1:48", text: "For he has looked on the humble estate of his servant. For behold, from now on all generations will call me blessed.", explanation: "Mary prophesies that all generations will call her blessed — which Catholics do through the Hail Mary. This is biblical!" },
      { reference: "John 19:26-27", text: "'Woman, behold, your son!' Then he said to the disciple, 'Behold, your mother!'", explanation: "Jesus gives Mary as mother to the beloved disciple — and by extension to all disciples. The Church has always understood this as giving us Mary as our spiritual mother." },
    ],
    mainArguments: [
      { title: "Asking for Intercession is Not Worship", content: "When Catholics ask Mary to pray for them, they are doing exactly what they do when asking a friend to pray — requesting intercession. The difference is that Mary is alive in heaven with God, making her intercession uniquely powerful. If asking a fellow Christian to pray is acceptable, asking Mary to pray cannot be inherently wrong." },
      { title: "The Church Explicitly Forbids Worshiping Mary", content: "The Catechism of the Catholic Church (771, 2112-2114) explicitly states that worship belongs to God alone and that idolatry is a grave sin. The Council of Trent and Vatican II both emphasized the distinction between honoring Mary and worshiping God. Any Catholic who worships Mary is sinning against Church teaching." },
      { title: "Mary's Role is Christ-Centered", content: "Every Marian doctrine and devotion points to Christ. The Incarnation — God becoming man — required a human mother. Mary's unique graces are entirely gifts from God through Jesus. The Rosary meditates on the life of Christ. Honoring Mary is honoring God's greatest work of grace and the vessel of the Incarnation." },
      { title: "All Generations Shall Call Her Blessed", content: "The Hail Mary is largely Scripture. 'Hail Mary' comes from Luke 1:28. 'Full of grace' from the same verse. 'Blessed art thou among women' from Luke 1:42. 'Blessed is the fruit of thy womb, Jesus' also from Luke 1:42. Catholics are simply following the biblical mandate to call Mary blessed in all generations." },
    ],
    churchFathersQuotes: [
      { father: "St. Irenaeus of Lyon", work: "Against Heresies 3:22:4 (c. 180 AD)", quote: "The knot of Eve's disobedience was loosed by the obedience of Mary. What the virgin Eve had bound in unbelief, the Virgin Mary loosed through faith." },
      { father: "Sub Tuum Praesidium", work: "Oldest Known Marian Prayer (c. 250 AD)", quote: "We fly to thy patronage, O holy Mother of God; despise not our petitions in our necessities, but deliver us always from all dangers, O glorious and blessed Virgin." },
    ],
    practicalTips: ["Ask whether they think it's wrong to ask other Christians to pray — then apply the same logic to Mary", "Point out that the Hail Mary is mostly Scripture"],
    commonMistakes: ["Don't claim Catholics never misuse Marian devotion — acknowledge it can be misunderstood", "Avoid making Mary sound like a fourth member of the Trinity"],
  },
  sa2: {
    id: "sa2",
    title: "Real Presence in the Eucharist",
    category: "Sacraments",
    summary: "The Catholic doctrine of the Real Presence holds that Christ is truly, substantially present in the Eucharist — Body, Blood, Soul, and Divinity. This is not a medieval invention but was the universal faith of the early Church, rooted in Christ's explicit words in John 6 and the Last Supper accounts.",
    scripturePassages: [
      { reference: "John 6:53-56", text: "'Truly, truly, I say to you, unless you eat the flesh of the Son of Man and drink his blood, you have no life in you... For my flesh is true food, and my blood is true drink.'", explanation: "Jesus uses the strongest possible language (the Greek word 'trogo' — 'gnaw/munch') and refuses to soften His statement when disciples leave. This is literal." },
      { reference: "1 Corinthians 11:27-29", text: "Whoever eats the bread or drinks the cup of the Lord in an unworthy manner will be guilty of sinning against the body and blood of the Lord... For anyone who eats and drinks without recognizing the body of the Lord eats and drinks judgment on himself.", explanation: "Paul says unworthy reception makes one 'guilty of the body and blood of the Lord' — a statement that only makes sense if the Eucharist truly is Christ's body and blood." },
      { reference: "Matthew 26:26-28", text: "'Take, eat; this IS my body'... 'Drink of it, all of you, for this IS my blood of the covenant.'", explanation: "Jesus says 'IS' (estin in Greek), not 'represents' or 'symbolizes.' The Aramaic Jesus likely spoke had no copula, making the identity even more direct." },
    ],
    mainArguments: [
      { title: "Early Christians Believed in the Real Presence", content: "St. Ignatius of Antioch (c. 110 AD) — who knew the Apostle John — condemned Docetists who 'abstain from the Eucharist because they do not confess that the Eucharist is the flesh of our Savior Jesus Christ.' Every major Church Father — Justin Martyr, Irenaeus, Tertullian, Ambrose, Augustine — affirmed the Real Presence. The symbolic view was never the view of the early Church." },
      { title: "John 6 is Not Symbolic", content: "When Jesus taught about eating His flesh in John 6, many disciples said 'This is a hard saying; who can listen to it?' and left. If Jesus meant it symbolically, He would have corrected them. Instead, He let them leave and asked the Twelve if they too would leave — affirming the literal meaning even at the cost of followers." },
      { title: "Paul Treats Unworthy Reception as Grave Sin", content: "In 1 Corinthians 11, Paul says those who eat unworthily eat 'judgment' upon themselves and some have become sick and died because of it. Such severe consequences make no sense if the Eucharist is merely a symbol or memorial. Only the Real Presence gives weight to this warning." },
      { title: "Transubstantiation Explains How, Not What", content: "Transubstantiation is the philosophical explanation of HOW the Real Presence occurs — the substance changes while the appearances remain. But the WHAT — that Christ is truly present — predates this term by over 1,000 years. You can reject the philosophical terminology while still affirming the Real Presence, as many Eastern Orthodox do." },
    ],
    churchFathersQuotes: [
      { father: "St. Ignatius of Antioch", work: "Letter to the Smyrnaeans (c. 110 AD)", quote: "They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Savior Jesus Christ, which suffered for our sins." },
      { father: "St. Justin Martyr", work: "First Apology 66 (c. 150 AD)", quote: "We do not receive these things as common bread or common drink; but as Jesus Christ our Savior... so also we have been taught that the food which is blessed by the prayer of His word... is the flesh and blood of that Jesus who was made flesh." },
    ],
    practicalTips: ["Focus on John 6 — especially that Jesus let disciples leave rather than clarifying it was symbolic", "Point to St. Ignatius as a student of the Apostle John who affirmed the Real Presence"],
    commonMistakes: ["Don't lead with the philosophical term 'transubstantiation' — start with Scripture", "Avoid being dismissive of the 'symbol' view; engage it charitably"],
  },
  sv1: {
    id: "sv1",
    title: "Works vs. Faith for Salvation",
    category: "Salvation & Works",
    summary: "Catholics do not believe we earn salvation by good works. Salvation is entirely God's free gift through grace. However, Catholics believe this grace transforms us and produces real change — including good works — which are themselves gifts of God. Faith and works are not competitors but are inseparably linked.",
    scripturePassages: [
      { reference: "Ephesians 2:8-10", text: "'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast. For we are his workmanship, created in Christ Jesus for good works.'", explanation: "Paul affirms salvation is by grace through faith — AND immediately says we are created for good works. Catholics affirm verses 8-9 but also take verse 10 seriously." },
      { reference: "James 2:24", text: "You see that a person is justified by works and not by faith alone.", explanation: "James explicitly says justification is NOT by faith alone — the only place in the entire Bible where 'faith alone' appears, and it denies it." },
      { reference: "Matthew 25:31-46", text: "'For I was hungry and you gave me food... Come, you who are blessed by my Father, inherit the kingdom prepared for you...' 'Lord, when did we see you hungry and feed you?'", explanation: "Jesus describes final judgment based on acts of mercy — demonstrating that real saving faith manifests in concrete works of love." },
    ],
    mainArguments: [
      { title: "Catholics Affirm Grace-Based Salvation", content: "The Council of Trent explicitly condemned the idea of earning salvation by works: 'If anyone says that by his own free will without God's grace, he is able to meet God... let him be anathema.' Catholics fully affirm that salvation is God's free gift that we cannot earn. The dispute is about the nature and effects of saving faith." },
      { title: "Faith Without Works is Dead", content: "James 2:17 states plainly: 'Faith by itself, if it does not have works, is dead.' Catholic teaching holds that genuine saving faith is not merely intellectual assent but a living trust that transforms the believer and produces love and good works. These works do not earn salvation but are the natural fruit of a truly saved life — and God rewards them." },
      { title: "Grace Transforms — It Doesn't Just Declare", content: "The Protestant view of justification tends to see it as a legal declaration (forensic). The Catholic view is that God actually transforms the believer through justifying grace — we are made righteous, not just declared righteous. This doesn't eliminate grace; it means grace is more powerful, not less." },
      { title: "God Rewards Works He Gives Us", content: "Catholics believe good works flow from God's grace within us. St. Augustine put it perfectly: 'Without God's grace we can do nothing; with it, we do meritorious acts.' When God rewards our works, He is crowning His own gifts to us. Works are meritorious because they are God's life in us." },
    ],
    churchFathersQuotes: [
      { father: "St. Augustine", work: "On Grace and Free Will, ch. 15", quote: "What else but His gifts does God crown when He crowns our merits?" },
      { father: "St. Clement of Rome", work: "First Epistle to the Corinthians (c. 96 AD)", quote: "We also pray that the Creator of all things may keep unharmed the number of His elect throughout the whole world, through His beloved Son Jesus Christ, through whom He called us from darkness to light." },
    ],
    practicalTips: ["Quote Ephesians 2:10 — Catholics believe all three verses, not just 8-9", "Use St. Augustine's quote about God crowning His own gifts"],
    commonMistakes: ["Don't say Catholics believe we 'earn' salvation — this is a caricature", "Avoid implying Protestants are wrong to emphasize grace — agree on grace, discuss what it does"],
  },
  h1: {
    id: "h1",
    title: "The Early Church Was Protestant",
    category: "Church History",
    summary: "The claim that the early Church was 'Protestant' is historically untenable. The early Church had bishops, priests, the Eucharist as the Real Presence, the authority of Tradition, prayer for the dead, and venerated Mary and the saints — all distinctively Catholic or Orthodox practices, not Protestant ones.",
    scripturePassages: [
      { reference: "Acts 15:28", text: "'It has seemed good to the Holy Spirit and to us to lay on you no greater burden than these requirements.'", explanation: "The Council of Jerusalem demonstrates the early Church made binding doctrinal decisions through conciliar authority — not by Scripture alone." },
      { reference: "1 Timothy 4:14", text: "Do not neglect the gift you have, which was given you by prophecy when the council of elders laid their hands on you.", explanation: "Timothy received his ministry through the laying on of hands by elders — showing the early Church practiced the apostolic succession and ordination found in Catholicism." },
      { reference: "Acts 2:42", text: "And they devoted themselves to the apostles' teaching and the fellowship, to the breaking of bread and the prayers.", explanation: "The early Church devoted itself to apostolic teaching (Tradition), fellowship, the Eucharist (breaking of bread), and liturgical prayer — a Catholic pattern." },
    ],
    mainArguments: [
      { title: "No Protestant Doctrines in the Early Church", content: "The Reformers' key doctrines — Sola Scriptura, Sola Fide, symbolic Eucharist, rejection of the papacy — cannot be found in the writings of the early Church Fathers. These were 16th-century innovations. St. Ignatius (110 AD), Justin Martyr (150 AD), Irenaeus (180 AD) — all describe a Church that is unmistakably Catholic." },
      { title: "Early Church Had Bishops with Apostolic Authority", content: "Ignatius of Antioch (c. 110 AD), writing to seven churches, repeatedly emphasizes submission to the bishop as essential to the Church. 'Apart from the bishop, let no one do anything pertaining to the Church.' This episcopal structure was universal in the early Church — not a later Catholic invention." },
      { title: "Real Presence Was Universal Belief", content: "Justin Martyr (c. 150 AD) describes Christian worship: 'We do not receive these as common bread and drink... but as Jesus Christ our Savior made flesh by God's Word.' This Real Presence doctrine is found in every early Church Father. The symbolic view was condemned as heretical (Radbertus vs. Ratramnus controversy in 9th century)." },
      { title: "The Word 'Catholic' Appears in 110 AD", content: "St. Ignatius of Antioch, writing around 110 AD, wrote: 'Where the bishop is, there let the multitude of believers be; even as where Jesus is, there is the Catholic Church.' The word 'Catholic' appears in the very earliest extra-biblical Christian writing, showing the Catholic Church's ancient origins." },
    ],
    churchFathersQuotes: [
      { father: "St. Ignatius of Antioch", work: "Letter to the Smyrnaeans (c. 110 AD)", quote: "Where the bishop is, there let the multitude of believers be; even as where Jesus is, there is the Catholic Church." },
      { father: "St. Irenaeus of Lyon", work: "Against Heresies 3:3:1 (c. 180 AD)", quote: "For it is a matter of necessity that every Church should agree with this Church [Rome], on account of its preeminent authority — that is, the faithful everywhere — inasmuch as the Apostolic Tradition has been preserved continuously by those who exist everywhere." },
    ],
    practicalTips: ["Ask: 'Name one doctrine that Protestants and early Church Fathers share that Catholics reject'", "Point to Ignatius using the word 'Catholic' in 110 AD — very close to the Apostles"],
    commonMistakes: ["Don't claim all Protestants will be damned — focus on the historical argument", "Avoid being triumphalist — acknowledge the Church has had failures while maintaining its identity"],
  },
  sa1: {
    id: "sa1",
    title: "Confession to a Priest",
    category: "Sacraments",
    summary: "The sacrament of Confession is not an invention of the medieval Church. It flows directly from Christ's words giving the Apostles authority to forgive and retain sins. The early Church practiced a form of confession, and the sacrament provides not just forgiveness but grace for healing and transformation.",
    scripturePassages: [
      { reference: "John 20:22-23", text: "'Receive the Holy Spirit. If you forgive the sins of any, they are forgiven them; if you withhold forgiveness from any, it is withheld.'", explanation: "Jesus breathes on the Apostles and gives them the power to forgive or retain sins. For this power to be meaningful, the Apostles must know what sins people have committed — requiring confession." },
      { reference: "James 5:16", text: "Therefore, confess your sins to one another and pray for one another, that you may be healed.", explanation: "James commands confession of sins — not just directly to God — noting it leads to healing. This supports the practice of oral confession." },
      { reference: "2 Corinthians 5:18-20", text: "All this is from God, who through Christ reconciled us to himself and gave us the ministry of reconciliation... Therefore, we are ambassadors for Christ, God making his appeal through us.", explanation: "Paul describes ministers as ambassadors of Christ's reconciliation — a role that includes the exercise of forgiving sins on behalf of God." },
    ],
    mainArguments: [
      { title: "Christ Gave Apostles Power to Forgive Sins", content: "In John 20:23, the Risen Christ specifically gives the Apostles authority to forgive or retain sins. This is a unique power bestowed by Christ — and one that requires confession to exercise meaningfully. How can a priest decide to forgive or retain a sin without knowing what the sin is?" },
      { title: "The Early Church Practiced Confession", content: "The Didache (c. 90 AD) says: 'Confess your sins in the assembly.' The Shepherd of Hermas (c. 140 AD), Tertullian (c. 200 AD), and Origen all describe a practice of confessing serious sins to Church leaders. Infant confession developed gradually in form, but the core practice of confessing to ordained ministers is ancient." },
      { title: "Confession to a Priest is Confession to God Through a Priest", content: "Catholics do not believe the priest forgives sins by his own power. He acts 'in persona Christi' — in the person of Christ — as Christ's ordained representative. The Catechism states: 'God alone forgives sins' (CCC 1441). The priest is the instrument, not the source, of forgiveness." },
      { title: "Confession Provides Grace Beyond Forgiveness", content: "The sacrament of Confession provides not just absolution but sanctifying grace, advice, and strength to avoid sin. It also provides an objective assurance of forgiveness that private prayer cannot give. Psychologically and spiritually, the concrete act of confessing and receiving absolution is profoundly healing — as even secular therapists recognize." },
    ],
    churchFathersQuotes: [
      { father: "Tertullian", work: "On Repentance (c. 203 AD)", quote: "Yet most men either shun this work, as being an exposure of themselves, or else defer it from day to day. I presume they are more mindful of modesty than of salvation." },
      { father: "St. Cyprian of Carthage", work: "On the Lapsed (c. 251 AD)", quote: "I entreat you, brethren, that each one should confess his own sin, while he who has sinned is still in this world." },
    ],
    practicalTips: ["Always go to John 20:22-23 first — Christ's specific words are the strongest argument", "Emphasize that the priest acts as Christ's instrument, not as God"],
    commonMistakes: ["Don't claim the priest is a mediator in the same way Christ is — there's only one Mediator", "Avoid arguing from authority alone — use Scripture first"],
  },
};

export const OBJECTIONS_WITH_CONTENT = [
  "s1", "s2", "s3", "p1", "m1", "sa1", "sa2", "sv1", "h1",
];

export function getTopicContent(id: string): TopicContent | null {
  return TOPIC_CONTENT[id] ?? null;
}
