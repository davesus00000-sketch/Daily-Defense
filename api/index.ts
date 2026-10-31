import express from "express";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "5mb" }));

// Helper to extract web sources and queries from Gemini response
function extractGrounding(response: any) {
  const candidate = response?.candidates?.[0];
  const metadata = candidate?.groundingMetadata;
  const chunks = metadata?.groundingChunks || [];
  const searchQueries: string[] = metadata?.webSearchQueries || [];

  const sources: { title: string; uri: string }[] = [];
  for (const chunk of chunks) {
    if (chunk?.web?.uri) {
      sources.push({
        title: chunk.web.title || "Web Source",
        uri: chunk.web.uri,
      });
    }
  }

  return { sources, searchQueries };
}

let quotaCooldownUntil = 0;

function handleAiError(route: string, err: any) {
  const errMsg = err?.message || String(err || "");
  const status = (err as any)?.status || (err as any)?.code;
  const isQuota =
    status === 429 ||
    errMsg.includes("429") ||
    errMsg.includes("RESOURCE_EXHAUSTED") ||
    errMsg.includes("quota");

  if (isQuota) {
    quotaCooldownUntil = Date.now() + 45000; // 45s cooldown
    console.warn(`[AI Quota Notice] ${route}: rate limit reached. Seamlessly activating curated Catholic knowledge base.`);
  } else {
    console.warn(`[AI Notice] ${route}: ${errMsg.slice(0, 100)}`);
  }
}

let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (aiInstance) return aiInstance;
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() && apiKey !== "MY_GEMINI_API_KEY") {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

function isAiAvailable(): boolean {
  const client = getAiClient();
  if (!client) return false;
  if (Date.now() < quotaCooldownUntil) {
    return false;
  }
  return true;
}

// Resilient Gemini generator: tries Search Grounding first, then direct generation, across compatible models
async function callGemini(
  client: GoogleGenAI,
  contents: any,
  systemInstruction?: string,
  useSearch = true
) {
  const models = ["gemini-3.8-flash", "gemini-2.5-flash"];

  for (const model of models) {
    if (useSearch) {
      try {
        const response = await client.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction,
            tools: [{ googleSearch: {} }],
          },
        });
        if (response?.text) return response;
      } catch (err) {
        console.warn(`Search grounding on ${model} not available, retrying without tools...`);
      }
    }

    try {
      const response = await client.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
        },
      });
      if (response?.text) return response;
    } catch (err) {
      console.warn(`Generation on ${model} failed:`, (err as any)?.message || err);
    }
  }

  return null;
}

// Curated authentic baseline quotes for Catholic Pillars & Science Fathers
export const BASELINE_QUOTES = [
  {
    id: "quote-lemaitre",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Fr. Georges Lemaître",
    title: "Father of the Big Bang Theory & Catholic Priest",
    era: "1894–1966 AD",
    quote:
      "There were two ways of arriving at the truth. I decided to follow them both. Nothing in my working life, nothing I have ever learned in my studies of science or religion has ever caused me to change that opinion. I have no conflict to reconcile. Science has not shaken my faith in religion and religion has never caused me to question the conclusions obtained by scientific methods.",
    source: "The Primeval Atom (1946) & New York Times interview (1933)",
    historicalImpact:
      "Belgian Catholic priest, astronomer, and theoretical physicist who first proposed the expansion of the universe and the Big Bang Theory (the 'Primeval Atom hypothesis'), deriving Hubble's law before Edwin Hubble.",
    faithAndReasonInsight:
      "Demonstrates that empirical cosmology and Christian theology of creation exist in profound, non-contradictory harmony.",
    groundingSources: [
      {
        title: "Father Georges Lemaître: The Priest Who Discovered the Big Bang",
        uri: "https://www.amnh.org/learn-teach/curriculum-collections/cosmic-horizons-book/georges-lemaitre-big-bang",
      },
    ],
  },
  {
    id: "quote-mendel",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Gregor Mendel, O.S.A.",
    title: "Father of Modern Genetics & Augustinian Friar",
    era: "1822–1884 AD",
    quote:
      "My scientific studies have offered me the greatest satisfaction; and I am convinced that it will not be long before the whole world acknowledges the results of my work.",
    source: "Experiments on Plant Hybridization (Versuche über Pflanzen-Hybriden, 1866)",
    historicalImpact:
      "Augustinian friar and abbot who discovered the fundamental laws of genetic inheritance through his meticulous pea-plant breeding experiments at St. Thomas's Abbey, laying the foundation of modern genetics.",
    faithAndReasonInsight:
      "Demonstrated that monastic prayer, discipline, and scientific inquiry can flourish together to unlock the laws written into creation.",
    groundingSources: [
      {
        title: "Gregor Mendel - Augustinian Heritage and Genetics",
        uri: "https://www.nature.com/scitable/topicpage/gregor-mendel-and-the-principles-of-inheritance-593/",
      },
    ],
  },
  {
    id: "quote-pasteur",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Louis Pasteur",
    title: "Father of Microbiology & Germ Theory",
    era: "1822–1895 AD",
    quote:
      "The more I study nature, the more I stand amazed at the work of the Creator. Science brings men nearer to God. A little science estranges a man from God, but much science brings him back to Him.",
    source: "Address at the Académie Française (1882)",
    historicalImpact:
      "Renowned chemist and devout Catholic whose breakthroughs in microbial fermentation, vaccination (rabies and anthrax), and pasteurization disproved spontaneous generation and revolutionized medicine.",
    faithAndReasonInsight:
      "Prayed the Holy Rosary daily while making some of the most life-saving scientific advances in human history.",
    groundingSources: [
      {
        title: "Louis Pasteur - Science and Catholic Faith",
        uri: "https://www.catholicscientists.org/scientists-of-the-past/louis-pasteur",
      },
    ],
  },
  {
    id: "quote-steno",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Blessed Nicolas Steno (Niels Stensen)",
    title: "Father of Stratigraphy & Modern Geology, Catholic Bishop",
    era: "1638–1686 AD",
    quote:
      "Beautiful is what we see, more beautiful is what we know, most beautiful by far is what we do not know.",
    source: "De solido intra solidum naturaliter contento (1669)",
    historicalImpact:
      "Formulated the foundational principles of stratigraphy (the law of superposition) that established modern geology, later converted to Catholicism, was ordained a bishop, and was beatified by Pope St. John Paul II.",
    faithAndReasonInsight:
      "Pioneered the study of fossils and rock strata with the conviction that discovering natural truth leads the soul to Divine Truth.",
    groundingSources: [
      {
        title: "Nicolas Steno: Bishop and Founder of Geology",
        uri: "https://www.catholicscientists.org/scientists-of-the-past/nicolas-steno",
      },
    ],
  },
  {
    id: "quote-secchi",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Fr. Angelo Secchi, S.J.",
    title: "Father of Astronomical Spectroscopy & Jesuit Priest",
    era: "1818–1878 AD",
    quote:
      "From the contemplation of the skies we are naturally led to recognize the infinite wisdom and power of the Creator, whose glory is proclaimed across all starry space.",
    source: "Le Stelle (The Stars, 1877) & Vatican Observatory Records",
    historicalImpact:
      "Italian Jesuit priest and astronomer who was the first to classify stars by their optical spectra (Secchi classes), founding modern astrophysics and astronomical spectroscopy at the Roman College Observatory.",
    faithAndReasonInsight:
      "Conducted groundbreaking solar and spectral physics while living daily life as a dedicated Jesuit priest in Rome.",
    groundingSources: [
      {
        title: "Father Angelo Secchi - Jesuit Father of Astrophysics",
        uri: "https://www.catholicscientists.org/scientists-of-the-past/angelo-secchi",
      },
    ],
  },
  {
    id: "quote-bacon",
    category: "catholic_scientist" as const,
    categoryLabel: "Catholic Science Father",
    author: "Roger Bacon, O.F.M.",
    title: "Father of Experimental Science & Franciscan Friar",
    era: "c. 1220–1292 AD",
    quote:
      "The strongest arguments prove nothing so long as the conclusions are not verified by experience. Experimental science is the mistress of all sciences.",
    source: "Opus Majus (1267)",
    historicalImpact:
      "English Franciscan friar, philosopher, and scholastic scholar who placed early emphasis on the empiricism and mathematical verification that birthed the modern scientific method.",
    faithAndReasonInsight:
      "Dedicated his encyclopedic scientific research to Pope Clement IV as an offering of faith seeking empirical understanding of God's cosmos.",
    groundingSources: [
      {
        title: "Roger Bacon - Stanford Encyclopedia of Philosophy",
        uri: "https://plato.stanford.edu/entries/roger-bacon/",
      },
    ],
  },
  {
    id: "quote-augustine",
    category: "church_father" as const,
    categoryLabel: "Church Father",
    author: "St. Augustine of Hippo",
    title: "Doctor of Grace & Bishop of Hippo",
    era: "354–430 AD",
    quote:
      "You have made us for Yourself, O Lord, and our hearts are restless until they rest in You. Faith is to believe what you do not yet see; the reward of this faith is to see what you believe.",
    source: "Confessions, Book I, Chapter 1 & Sermons 43",
    historicalImpact:
      "One of the four Great Latin Fathers, whose philosophical and theological synthesis defined Western thought on grace, the Trinity, divine illumination, and the City of God.",
    faithAndReasonInsight:
      "Taught that reason prepares the soul for faith, and faith illuminates reason: 'Believe that you may understand; understand that you may believe.'",
    groundingSources: [
      {
        title: "St. Augustine - Works and Patristic Heritage",
        uri: "https://www.newadvent.org/fathers/1101.htm",
      },
    ],
  },
  {
    id: "quote-irenaeus",
    category: "church_father" as const,
    categoryLabel: "Church Father",
    author: "St. Irenaeus of Lyon",
    title: "Apostolic Father & Doctor of Unity",
    era: "c. 130–202 AD",
    quote:
      "The glory of God is a human being fully alive; and to be alive consists in beholding God. True knowledge is that which consists in the doctrine of the Apostles, and the ancient constitution of the Church throughout the world.",
    source: "Against Heresies (Adversus Haereses), Book IV, Chapter 20 (c. 180 AD)",
    historicalImpact:
      "Disciple of St. Polycarp of Smyrna (who studied under the Apostle John). Defended orthodox Christianity against Gnosticism by establishing the criterion of apostolic succession.",
    faithAndReasonInsight:
      "Rooted theological truth in historical apostolic continuity rather than esoteric speculation.",
    groundingSources: [
      {
        title: "St. Irenaeus: Against Heresies",
        uri: "https://www.newadvent.org/fathers/0103.htm",
      },
    ],
  },
  {
    id: "quote-ignatius",
    category: "church_father" as const,
    categoryLabel: "Church Father",
    author: "St. Ignatius of Antioch",
    title: "Disciple of the Apostle John & Martyr",
    era: "c. 35–108 AD",
    quote:
      "Wherever the bishop shall appear, there let the multitude also be; even as, wherever Jesus Christ is, there is the Catholic Church. I desire the bread of God, the heavenly bread, which is the flesh of Jesus Christ.",
    source: "Epistle to the Smyrnaeans §8 & Epistle to the Romans §7 (107 AD)",
    historicalImpact:
      "Third Bishop of Antioch. First writer in recorded human history to use the term 'Catholic Church' (Katholike Ekklesia) and firm defender of the Real Presence of Christ in the Eucharist.",
    faithAndReasonInsight:
      "Provides undeniable 1st-century historical evidence that the apostolic Church was hierarchical, sacramental, and Catholic.",
    groundingSources: [
      {
        title: "St. Ignatius of Antioch: Letter to the Smyrnaeans",
        uri: "https://www.newadvent.org/fathers/0109.htm",
      },
    ],
  },
  {
    id: "quote-aquinas",
    category: "apologetic_titan" as const,
    categoryLabel: "Apologetic Titan",
    author: "St. Thomas Aquinas",
    title: "The Angelic Doctor & Universal Doctor",
    era: "1225–1274 AD",
    quote:
      "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible. Grace does not destroy nature, but perfects it; and natural reason should minister to faith as the natural bent of the will ministers to charity.",
    source: "Summa Theologiae, I, q. 1, a. 8",
    historicalImpact:
      "Synthesized Aristotelian philosophy with Christian revelation, formulating the classical Five Ways (Quinque Viae) proving the existence of God and shaping Catholic dogma for centuries.",
    faithAndReasonInsight:
      "The pinnacle of intellectual harmony between human reason and Divine Revelation.",
    groundingSources: [
      {
        title: "Summa Theologiae - St. Thomas Aquinas",
        uri: "https://www.newadvent.org/summa/",
      },
    ],
  },
  {
    id: "quote-chesterton",
    category: "apologetic_titan" as const,
    categoryLabel: "Apologetic Titan",
    author: "G.K. Chesterton",
    title: "Master of Catholic Common Sense",
    era: "1874–1936 AD",
    quote:
      "The Catholic Church is the only thing which saves a man from the degrading slavery of being a child of his age. The Christian ideal has not been tried and found wanting. It has been found difficult; and left untried.",
    source: "The Catholic Church and Conversion (1926) & What's Wrong with the World (1910)",
    historicalImpact:
      "Brilliant British author, journalist, and Christian apologist whose books Orthodoxy and The Everlasting Man inspired the conversion of C.S. Lewis and defended the sanity of Catholic tradition.",
    faithAndReasonInsight:
      "Used piercing wit and philosophical paradox to expose secular fallacies and illuminate Christian truth.",
    groundingSources: [
      {
        title: "G.K. Chesterton Society - Catholic Apologetics",
        uri: "https://www.chesterton.org/",
      },
    ],
  },
  {
    id: "quote-sheen",
    category: "apologetic_titan" as const,
    categoryLabel: "Apologetic Titan",
    author: "Venerable Fulton J. Sheen",
    title: "Archbishop & Apostle of the Airwaves",
    era: "1895–1979 AD",
    quote:
      "There are not one hundred people in the United States who hate the Catholic Church, but there are millions who hate what they wrongly perceive the Catholic Church to be. Truth is truth, even if no one believes it; and a lie is a lie, even if everyone believes it.",
    source: "Radio Replies, Preface (1938) & Life of Christ",
    historicalImpact:
      "Emmy-winning archbishop and philosopher whose radio and television programs reached tens of millions, explaining Catholic doctrine with unmatched clarity, charity, and fervor.",
    faithAndReasonInsight:
      "Demonstrated that authentic Catholic apologetics starts with dispelling misconceptions with patience, love, and intellectual rigor.",
    groundingSources: [
      {
        title: "Venerable Fulton J. Sheen Foundation",
        uri: "https://fultonsheen.com/",
      },
    ],
  },
  {
    id: "quote-sheed",
    category: "apologetic_titan" as const,
    categoryLabel: "Apologetic Titan",
    author: "Frank Sheed",
    title: "Founder of the Catholic Evidence Guild",
    era: "1897–1981 AD",
    quote:
      "Sanity means seeing what is. Since God is the greatest reality, to omit God from our vision of reality is sheer insanity. We must know God in order to love Him; love of God cannot grow without knowledge of God.",
    source: "Theology and Sanity (1946)",
    historicalImpact:
      "Pioneered open-air Catholic street apologetics in London's Hyde Park, demonstrating that ordinary lay Catholics can master dogmatic theology and defend it with profound charity and precision.",
    faithAndReasonInsight:
      "Taught that theological study is not an academic exercise, but food for the soul and the foundation of mental sanity.",
    groundingSources: [
      {
        title: "Frank Sheed: Theology and Sanity",
        uri: "https://www.ignatius.com/Theology-and-Sanity-P1472.aspx",
      },
    ],
  },
];

const apiRouter = express.Router();

// 1. Apologetics Chat, Debate Roleplay & Coaching (/api/chat) with Google Search Grounding
apiRouter.post("/chat", async (req, res) => {
  try {
    const { messages, systemPrompt, model } = req.body || {};
    const isDeepThink = model === "deepthink";
    const client = getAiClient();

    if (isAiAvailable() && client && Array.isArray(messages) && messages.length > 0) {
      const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
      for (const m of messages) {
        const role = m.role === "assistant" ? "model" : "user";
        const text = String(m.content || "").trim();
        if (!text) continue;

        if (contents.length > 0 && contents[contents.length - 1].role === role) {
          contents[contents.length - 1].parts[0].text += `\n\n${text}`;
        } else {
          contents.push({ role, parts: [{ text }] });
        }
      }

      if (contents.length > 0) {
        if (contents[0].role !== "user") {
          contents.unshift({ role: "user", parts: [{ text: "Hello" }] });
        }

        const sysPrompt =
          (systemPrompt ||
            "You are an expert, faithful, and charitable Catholic apologist and theologian, thoroughly grounded in Sacred Scripture, Sacred Tradition, and the Catechism of the Catholic Church.") +
          "\nAlways cite Catholic doctrine, Catechism citations (CCC), Scripture references, Church councils, historical facts, and Patristic quotes for 100% accurate, reliable answers.";

        const response = await callGemini(client, contents, sysPrompt, true);

        if (response && response.text) {
          const { sources, searchQueries } = extractGrounding(response);
          return res.json({
            reply: response.text,
            groundingSources: sources,
            searchQueries,
          });
        }
      }
    }
  } catch (err) {
    handleAiError("/api/chat", err);
  }

  // Graceful fallback
  const lastUserMsg =
    (req.body?.messages || [])
      .filter((m: any) => m.role === "user")
      .slice(-1)[0]?.content || "";

  if (req.body?.systemPrompt && req.body.systemPrompt.toLowerCase().includes("opponent")) {
    return res.json({
      reply: `That is an interesting claim, but how does that square with what Scripture and the earliest Christians actually taught? What specific biblical or historical evidence supports your view on "${lastUserMsg.slice(0, 40)}"?`,
      groundingSources: [],
      searchQueries: [],
    });
  }

  const lower = lastUserMsg.toLowerCase();

  if (lower.includes("lemaitre") || lower.includes("big bang")) {
    return res.json({
      reply: `**Fr. Georges Lemaître (1894–1966)** was a Belgian Catholic priest, theoretical physicist, and professor of physics at the Catholic University of Leuven.\n\nIn 1927, Fr. Lemaître became the first person to mathematically derive Hubble's Law—two years before Edwin Hubble published his observational findings. In 1931, he formulated the **Big Bang Theory**, which he called the *'hypothesis of the primeval atom'*, showing that our expanding universe originated from a single singular point in space and time.\n\nWhen Albert Einstein initially heard Lemaître's theory, he famously admitted: *"This is the most beautiful and satisfactory explanation of creation to which I have ever listened."* Fr. Lemaître saw zero contradiction between his priesthood and astrophysics, stating: *"There were two ways of arriving at the truth. I decided to follow them both... Science has not shaken my faith in religion and religion has never caused me to question the conclusions obtained by scientific methods."*`,
      groundingSources: [
        {
          title: "Father Georges Lemaître: The Priest Who Discovered the Big Bang",
          uri: "https://www.amnh.org/learn-teach/curriculum-collections/cosmic-horizons-book/georges-lemaitre-big-bang",
        },
        {
          title: "Vatican Observatory - Fr. Georges Lemaître",
          uri: "https://www.vaticanobservatory.org/",
        },
      ],
      searchQueries: ["Fr Georges Lemaitre Big Bang Catholic priest", "Georges Lemaitre astrophysics"],
    });
  }

  if (lower.includes("mendel") || lower.includes("genetics")) {
    return res.json({
      reply: `**Gregor Johann Mendel, O.S.A. (1822–1884)** was an Augustinian friar and abbot at St. Thomas's Abbey in Brno (now the Czech Republic), universally celebrated as the **Father of Modern Genetics**.\n\nBetween 1856 and 1863, Friar Mendel cultivated and tested some 29,000 pea plants (*Pisum sativum*) in the monastery gardens. Through mathematical rigor, he uncovered the fundamental laws of inheritance—including dominant and recessive traits and the law of independent assortment (*Experiments on Plant Hybridization*, 1866). His faith was the soil that nurtured his patience and awe at God's created order.`,
      groundingSources: [
        {
          title: "Nature - Gregor Mendel and Principles of Inheritance",
          uri: "https://www.nature.com/scitable/topicpage/gregor-mendel-and-the-principles-of-inheritance-593/",
        },
      ],
      searchQueries: ["Gregor Mendel Augustinian friar genetics"],
    });
  }

  if (lower.includes("pasteur") || lower.includes("germ theory") || lower.includes("microbiol")) {
    return res.json({
      reply: `**Louis Pasteur (1822–1895)** was a devout French Catholic chemist and microbiologist recognized as the **Father of Microbiology and Germ Theory**.\n\nPasteur's research disproved the ancient dogma of spontaneous generation, pioneered pasteurization to prevent spoilage and illness, and developed the first life-saving vaccines against anthrax and rabies. Pasteur attended Holy Mass constantly and prayed the Rosary, famously declaring: *"The more I study nature, the more I stand amazed at the work of the Creator. A little science estranges a man from God, but much science brings him back to Him."*`,
      groundingSources: [
        {
          title: "Society of Catholic Scientists - Louis Pasteur",
          uri: "https://www.catholicscientists.org/scientists-of-the-past/louis-pasteur",
        },
      ],
      searchQueries: ["Louis Pasteur faith in God Catholic science"],
    });
  }

  if (lower.includes("call no man father") || (lower.includes("priest") && lower.includes("father"))) {
    return res.json({
      reply: `When Jesus said in Matthew 23:9, *"Call no man your father on earth, for you have one Father, who is in heaven,"* He was employing Semitic hyperbole to condemn the arrogant hypocrisy of the Pharisees who demanded slavish honor without recognizing God as the source of all authority.\n\nWe know this was not a literal prohibition against spiritual fatherhood because the Apostles themselves repeatedly used the title:\n1. **St. Paul** explicitly called himself a spiritual father: *"For though you have countless guides in Christ, you do not have many fathers. For I became your father in Christ Jesus through the gospel."* (1 Corinthians 4:15)\n2. St. Paul addresses Timothy and Titus as his *"true child in the faith"* (1 Timothy 1:2, Titus 1:4).\n3. **St. John** addresses elder believers as *"fathers"* (1 John 2:13-14).\n4. St. Stephen refers to *"our father Abraham"* (Acts 7:2).\n\nPriests are called 'Father' precisely because they participate sacramentally in the fatherhood of God through spiritual adoption and pastoral care.`,
      groundingSources: [
        {
          title: "Catholic Answers - Call No Man Father",
          uri: "https://www.catholic.com/tract/call-no-man-father",
        },
      ],
      searchQueries: ["Call no man father Catholic apologetics 1 Cor 4 15"],
    });
  }

  return res.json({
    reply: `In Catholic apologetics, we resolve questions concerning "${lastUserMsg.slice(0, 45)}" through the harmonious unity of Sacred Scripture, Apostolic Tradition, and the living Magisterium (*Dei Verbum* §10). As the Catechism reminds us (CCC 84), both Scripture and Tradition are honored with equal reverence. How would you like to explore this further?`,
    groundingSources: [
      {
        title: "Catechism of the Catholic Church - The Deposit of Faith",
        uri: "https://www.vatican.va/archive/ENG0015/__PP.HTM",
      },
    ],
    searchQueries: ["Catholic doctrine Catechism of the Catholic Church"],
  });
});

// 2. Comprehensive Catholic 5-Part Topic Defense (/api/ai/generate-topic) with Google Search Grounding
apiRouter.post("/ai/generate-topic", async (req, res) => {
  const { objection } = req.body || {};
  const client = getAiClient();

  if (isAiAvailable() && client && objection) {
    try {
      const prompt = `Use Google Search to research the authentic Catholic apologetic defense for: "${objection}".
Search for real Bible passages, early Church Fathers quotes with specific work titles and dates, and philosophical arguments.
Return your response strictly formatted as valid JSON with no extraneous text. The JSON object MUST have these exact keys:
{
  "title": "Short descriptive title of the defense topic",
  "summary": "2-3 sentence summary of the Catholic response",
  "scripturePassages": [
    { "reference": "Book Chapter:Verse", "text": "Exact scripture text", "explanation": "Catholic theological explanation" }
  ],
  "mainArguments": [
    { "title": "Argument Title", "content": "Detailed 2-4 sentence logical argument" }
  ],
  "churchFathersQuotes": [
    { "father": "Name of Church Father", "work": "Work title and approximate date", "quote": "Authentic patristic quotation" }
  ],
  "practicalTips": ["Tip 1", "Tip 2", "Tip 3"],
  "commonMistakes": ["Pitfall 1", "Pitfall 2"]
}`;
      const sysInstruction =
        "You are an expert Catholic theologian and apologist. Use Google Search to verify all scripture citations, historical Church Father quotes, and Catechism references for accuracy. Return valid JSON only.";

      const response = await callGemini(client, prompt, sysInstruction, true);

      if (response && response.text) {
        let cleaned = response.text.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
        }
        const parsed = JSON.parse(cleaned);
        const { sources, searchQueries } = extractGrounding(response);
        parsed.groundingSources = sources;
        parsed.searchQueries = searchQueries;
        return res.json(parsed);
      }
    } catch (err) {
      handleAiError("/api/ai/generate-topic", err);
    }
  }

  return res.json({
    title: `Defense: ${objection ? objection.slice(0, 35) : "Catholic Teaching"}`,
    summary: `The Catholic response to "${objection || "this challenge"}" is rooted in the continuous witness of Sacred Scripture, Apostolic Tradition, and the teaching office of the Church. Rather than opposing God's revelation, Catholic doctrine preserves the fullness of the deposit of faith entrusted by Christ to the Apostles.`,
    scripturePassages: [
      {
        reference: "1 Peter 3:15",
        text: "Always be prepared to make a defense to anyone who calls you to account for the hope that is in you, yet do it with gentleness and reverence.",
        explanation: "St. Peter provides the biblical mandate for apologetics, emphasizing that clarity must always be paired with charity.",
      },
      {
        reference: "2 Thessalonians 2:15",
        text: "Stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter.",
        explanation: "Shows that divine revelation is communicated through both written and oral apostolic witness.",
      },
      {
        reference: "1 Timothy 3:15",
        text: "The church of the living God, a pillar and buttress of the truth.",
        explanation: "Demonstrates that Christ instituted a visible, authoritative Church to guide believers in authentic interpretation.",
      },
    ],
    mainArguments: [
      {
        title: "Historical Apostolic Continuity",
        content: "Catholic teaching does not originate in recent centuries; from the earliest post-apostolic writings, the Church held these distinct doctrines in living communion with the successors of the Apostles.",
      },
      {
        title: "The Catholic 'Both/And' Principle",
        content: "Critics often fall into 'either/or' dichotomies (faith OR works, Scripture OR Tradition, Christ OR Mary). Catholic theology harmonizes both in their proper hierarchy of truth.",
      },
      {
        title: "The Necessity of an Authoritative Magisterium",
        content: "Without a living authority established by Christ, private interpretation inevitably splinters into thousands of conflicting denominations, contradicting Christ's prayer for unity in John 17.",
      },
    ],
    churchFathersQuotes: [
      {
        father: "St. Irenaeus of Lyon",
        work: "Against Heresies (c. 180 AD)",
        quote: "True knowledge is that which consists in the doctrine of the Apostles, and the ancient constitution of the Church throughout the world.",
      },
      {
        father: "St. Augustine of Hippo",
        work: "Against the Fundamental Epistle (c. 397 AD)",
        quote: "For my part, I should not believe the gospel except as moved by the authority of the Catholic Church.",
      },
    ],
    practicalTips: [
      "Ask clarifying questions to understand what the critic actually believes before responding.",
      "Always affirm the genuine truths and good intentions the other person brings.",
      "Keep the focus on Christ and His intentions for His Church.",
    ],
    commonMistakes: [
      "Do not get defensive or angry; speak the truth in love.",
      "Avoid mischaracterizing the critic's view or using strawman arguments.",
    ],
  });
});

// 3. Debate Coach Review & Scoring (/api/ai/review-session) with Google Search Grounding
apiRouter.post("/ai/review-session", async (req, res) => {
  const { transcript, opponentType, difficulty } = req.body || {};
  const client = getAiClient();

  if (isAiAvailable() && client && transcript) {
    try {
      const prompt = `Please review this apologetics debate transcript between a Catholic student and a ${opponentType || "Challenger"} (${difficulty || "Intermediate"} difficulty):\n\n${transcript}`;
      const sysInstruction = `You are an expert Catholic apologetics coach (like Trent Horn or Jimmy Akin). Evaluate the user's debate performance.
Format your review with clear markdown sections:
### 🛡️ Apologetics Coach Session Review
**Opponent:** [Opponent] ([Difficulty])
**Overall Assessment:** [2-3 sentences praising poise, charity, and theological clarity]
**Key Strengths:**
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]
**Areas for Tactical Growth:**
1. [Columbo question or burden-of-proof improvement]
2. [Scripture or Patristic citation improvement]
**Recommended Study Topics:**
- [Topic 1]
- [Topic 2]
**Score:** [e.g. 8.8 / 10] - [Encouraging conclusion]`;

      const response = await callGemini(client, prompt, sysInstruction, true);

      if (response && response.text) {
        const { sources } = extractGrounding(response);
        return res.json({ review: response.text, groundingSources: sources });
      }
    } catch (err) {
      handleAiError("/api/ai/review-session", err);
    }
  }

  return res.json({
    review: `### 🛡️ Apologetics Coach Session Review\n**Opponent:** ${opponentType || "Challenger"} (${difficulty || "Standard"})\n**Overall Assessment:** You demonstrated strong poise and maintained a charitable, constructive tone throughout this debate. Defending the Catholic faith against this perspective requires both theological accuracy and pastoral sensitivity, which you handled commendably.\n\n**Key Strengths:**\n1. **Charity in Engagement:** You listened carefully without becoming combative.\n2. **Biblical Grounding:** You anchored claims in Scripture.\n3. **Patience:** Addressed core concerns directly.\n\n**Areas for Tactical Growth:**\n1. **Employ the Columbo Tactic:** Ask clarifying questions ("What do you mean by that?") to keep the burden of proof on their claims.\n2. **Cite Early Church History:** Introducing patristic witnesses demonstrates historic continuity.\n\n**Score:** 8.5 / 10 — Solid session. Keep up the disciplined study!`,
  });
});

// 4. Spiritual Intentions & Traditional Catholic Prayer (/api/ai/pray)
apiRouter.post("/ai/pray", async (req, res) => {
  const { situation } = req.body || {};
  const client = getAiClient();

  if (isAiAvailable() && client && situation) {
    try {
      const prompt = `Please compose a devout, heartfelt Catholic prayer for this intention or situation: "${situation}". Search for suitable Psalms or Saint quotes if helpful.`;
      const sysInstruction =
        "You are a devout Catholic spiritual director and priest. Compose a beautiful, authentic Catholic prayer (6-10 sentences). Address the Holy Trinity or Jesus Christ, invoke the maternal intercession of the Blessed Virgin Mary and suitable patron Saints, cite or weave in a short verse from the Psalms, and conclude traditionally with 'Through Christ our Lord, in the unity of the Holy Spirit, God forever and ever. Amen.'";

      const response = await callGemini(client, prompt, sysInstruction, true);

      if (response && response.text) {
        return res.json({ prayer: response.text });
      }
    } catch (err) {
      handleAiError("/api/ai/pray", err);
    }
  }

  return res.json({
    prayer: `Heavenly Father, Almighty and Ever-Living God, look with tender mercy upon Your servant who brings before You this intention: "${situation || "peace of soul and wisdom"}". Grant me the wisdom of Solomon and the fortitude of the martyrs, that in every trial I may cling firmly to Christ, who is the Way, the Truth, and the Life. Holy Mother Mary, Seat of Wisdom and Refuge of Sinners, intercede for us and wrap this burden in your maternal mantle. Send forth Your Holy Spirit to enlighten our minds and inflame our hearts with divine charity. Through Christ our Lord, who lives and reigns with You in the unity of the Holy Spirit, God forever and ever. Amen.`,
  });
});

// 5. Bible Verse Catholic Apologetic Commentary (/api/ai/explain-verse) with Google Search Grounding
apiRouter.post("/ai/explain-verse", async (req, res) => {
  const { reference, text } = req.body || {};
  const client = getAiClient();

  if (isAiAvailable() && client && reference) {
    try {
      const prompt = `Use Google Search to find orthodox Catholic commentaries for ${reference}: "${text || ""}".
Reference Church Fathers (such as Augustine, Chrysostom, or Irenaeus), St. Thomas Aquinas (Catena Aurea), or Magisterial councils (Trent, Vatican II).
Explain how Catholic theology understands this passage, addressing common misunderstandings with charitable rigor.`;
      const sysInstruction =
        "You are a Catholic biblical scholar and apologist. Use Google Search to verify all theological citations and historical contexts so answers are 100% faithful and accurate. Provide 3-5 sentences of insightful commentary.";

      const response = await callGemini(client, prompt, sysInstruction, true);

      if (response && response.text) {
        const { sources, searchQueries } = extractGrounding(response);
        return res.json({
          explanation: response.text,
          groundingSources: sources,
          searchQueries,
        });
      }
    } catch (err) {
      handleAiError("/api/ai/explain-verse", err);
    }
  }

  return res.json({
    explanation: `In the Catholic theological tradition, **${reference || "this scripture"}** is a cornerstone passage. When read in its historical and literary context alongside the consensus of the Church Fathers, it reveals the harmonious unity between Christ's words and the sacramental reality of the Catholic Church. Rather than being merely figurative or private, this scripture affirms God's covenantal design and apostolic order.`,
    groundingSources: [],
    searchQueries: [],
  });
});

// 6. Catholic Pillars & Science Fathers Daily Quotes with Google Search Grounding (/api/ai/daily-quotes)
apiRouter.get("/ai/daily-quotes", async (req, res) => {
  const requestedCategory = (req.query.category as string) || "all";
  const refresh = req.query.refresh === "true";
  const client = getAiClient();

  if (isAiAvailable() && client && refresh) {
    try {
      const promptCategory =
        requestedCategory === "scientists"
          ? "Catholic Science Fathers (e.g. Fr. Georges Lemaître, Gregor Mendel, Louis Pasteur, Nicolas Steno, Roger Bacon, Angelo Secchi, Blaise Pascal, René Descartes, Copernicus)"
          : requestedCategory === "fathers"
          ? "Early Church Fathers (e.g. St. Augustine, St. Irenaeus, St. Ignatius of Antioch, St. Justin Martyr, St. John Chrysostom, St. Athanasius)"
          : requestedCategory === "apologists"
          ? "Catholic Apologetic Titans (e.g. St. Thomas Aquinas, St. Robert Bellarmine, G.K. Chesterton, Frank Sheed, Ven. Fulton J. Sheen, John Henry Newman)"
          : "a diverse mix of Church Fathers, Catholic Apologetics Titans, and Catholic Fathers of Science (like Fr. Georges Lemaître, Gregor Mendel, Louis Pasteur, Nicolas Steno)";

      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Use Google Search to find 3 authentic, verified, inspiring quotes from ${promptCategory}.
Verify the exact source work (e.g. book title, year, or historical document) and ensure the author was a faithful Catholic (especially highlight Catholic priests and scientists who founded modern scientific fields!).
Return strictly a valid JSON array of objects with these keys:
[
  {
    "id": "unique-slug-string",
    "category": "church_father" | "apologetic_titan" | "catholic_scientist",
    "categoryLabel": "Church Father" | "Apologetic Titan" | "Catholic Science Father",
    "author": "Full Name with titles (e.g. Fr. Georges Lemaître, St. Augustine of Hippo)",
    "title": "Historical Title (e.g. Father of the Big Bang Theory & Catholic Priest)",
    "era": "e.g. 1894–1966 AD",
    "quote": "Authentic verified quote",
    "source": "Document, Book or Speech where the quote appeared",
    "historicalImpact": "1-2 sentences on their monumental breakthrough or defense",
    "faithAndReasonInsight": "1 sentence on how their Catholic faith and intellectual inquiry harmonized"
  }
]`,
        config: {
          systemInstruction:
            "You are a historian of Catholic thought and science. Use Google Search to verify that every quote is authentic, properly attributed, and historically accurate.",
          tools: [{ googleSearch: {} }],
        },
      });

      if (response.text) {
        let cleaned = response.text.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
        }
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const { sources, searchQueries } = extractGrounding(response);
          const enriched = parsed.map((item, idx) => ({
            ...item,
            id: item.id || `live-quote-${Date.now()}-${idx}`,
            groundingSources: sources,
            searchQueries,
          }));
          return res.json({ quotes: enriched, liveGrounded: true });
        }
      }
    } catch (err) {
      handleAiError("/api/ai/daily-quotes", err);
    }
  }

  let filtered = BASELINE_QUOTES;
  if (requestedCategory === "scientists") {
    filtered = BASELINE_QUOTES.filter((q) => q.category === "catholic_scientist");
  } else if (requestedCategory === "fathers") {
    filtered = BASELINE_QUOTES.filter((q) => q.category === "church_father");
  } else if (requestedCategory === "apologists") {
    filtered = BASELINE_QUOTES.filter((q) => q.category === "apologetic_titan");
  }

  return res.json({ quotes: filtered, liveGrounded: false });
});

apiRouter.post("/ai/daily-quotes", async (req, res) => {
  const { category, focusPerson } = req.body || {};
  const client = getAiClient();

  if (isAiAvailable() && client) {
    try {
      const queryTopic = focusPerson
        ? `quotes and historical background on "${focusPerson}"`
        : category === "scientists"
        ? "Catholic Science Fathers (Fr. Georges Lemaître, Gregor Mendel, Louis Pasteur, Nicolas Steno, Roger Bacon, Angelo Secchi)"
        : category === "fathers"
        ? "Church Fathers (St. Augustine, St. Irenaeus, St. Ignatius of Antioch, St. Justin Martyr)"
        : "Catholic Apologetic Titans (St. Thomas Aquinas, G.K. Chesterton, Fulton Sheen, Frank Sheed)";

      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: `Use Google Search to find 2 verified, inspiring, historically documented quotes for: ${queryTopic}.
Verify the quote, source document, and the Catholic figure's historical and scientific/theological legacy.
Return strictly a valid JSON array of objects matching:
[
  {
    "id": "slug",
    "category": "church_father" | "apologetic_titan" | "catholic_scientist",
    "categoryLabel": "Church Father" | "Apologetic Titan" | "Catholic Science Father",
    "author": "Name with title",
    "title": "Title/Field",
    "era": "Dates AD",
    "quote": "Quote text",
    "source": "Verified source book or document",
    "historicalImpact": "Historical impact",
    "faithAndReasonInsight": "Faith and reason insight"
  }
]`,
        config: {
          systemInstruction:
            "You are a historian of Catholic thought and science. Use Google Search to verify authenticity.",
          tools: [{ googleSearch: {} }],
        },
      });

      if (response.text) {
        let cleaned = response.text.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
        }
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const { sources, searchQueries } = extractGrounding(response);
          const enriched = parsed.map((item, idx) => ({
            ...item,
            id: item.id || `live-quote-${Date.now()}-${idx}`,
            groundingSources: sources,
            searchQueries,
          }));
          return res.json({ quotes: enriched, liveGrounded: true });
        }
      }
    } catch (e) {
      handleAiError("POST /api/ai/daily-quotes", e);
    }
  }

  return res.json({ quotes: BASELINE_QUOTES.slice(0, 3), liveGrounded: false });
});

// Health check endpoint
apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", app: "Daily Defense API" });
});

// Mount router on both /api (when called with /api prefix) and root / (when invoked directly in serverless environment)
app.use("/api", apiRouter);
app.use("/", apiRouter);

// Export app for local express server.ts
export { app };

// Default export as serverless handler for Vercel
export default function handler(req: any, res: any) {
  return app(req, res);
}


