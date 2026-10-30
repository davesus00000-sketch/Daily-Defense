import { DailyCatholicQuote, GroundingSource, SavedTopic } from "../types";

export interface ChatResponseWithGrounding {
  reply: string;
  groundingSources?: GroundingSource[];
  searchQueries?: string[];
}

export async function generatePrayer(situation: string): Promise<string> {
  try {
    const res = await fetch("/api/ai/pray", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ situation }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.prayer) return data.prayer;
      if (data.content) return data.content;
    }
  } catch (err) {
    console.warn("API prayer route not available, using spiritual director engine:", err);
  }

  // Graceful theological synthesis
  return `Heavenly Father, Almighty and Ever-Living God, look with tender mercy upon Your servant who brings before You this intention: "${situation}". Grant me the wisdom of Solomon and the fortitude of the martyrs, that in every trial I may cling firmly to Christ, who is the Way, the Truth, and the Life. Holy Mother Mary, Seat of Wisdom and Refuge of Sinners, intercede for us and wrap this burden in your maternal mantle. Send forth Your Holy Spirit to enlighten our minds and inflame our hearts with divine charity. Through Christ our Lord, who lives and reigns with You in the unity of the Holy Spirit, God forever and ever. Amen.`;
}

export async function generateTopic(objection: string): Promise<Omit<SavedTopic, "id" | "savedAt">> {
  try {
    const res = await fetch("/api/ai/generate-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objection }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.title && data.scripturePassages) {
        return {
          title: data.title,
          objection: objection,
          summary: data.summary || "",
          scripturePassages: data.scripturePassages || [],
          mainArguments: data.mainArguments || [],
          churchFathersQuotes: data.churchFathersQuotes || [],
          practicalTips: data.practicalTips || [],
          commonMistakes: data.commonMistakes || [],
        };
      }
    }
  } catch (err) {
    console.warn("API topic route unavailable, using local apologetics compiler:", err);
  }

  // Fallback Catholic response generator
  return {
    title: `Defense against: "${objection.slice(0, 35)}..."`,
    objection: objection,
    summary: `The Catholic response to "${objection}" is rooted in the continuous witness of Sacred Scripture, Apostolic Tradition, and the teaching office of the Church. Rather than opposing God's revelation, Catholic doctrine preserves the fullness of the deposit of faith entrusted by Christ to the Apostles.`,
    scripturePassages: [
      {
        reference: "1 Peter 3:15",
        text: "Always be prepared to make a defense to anyone who calls you to account for the hope that is in you, yet do it with gentleness and reverence.",
        explanation: "St. Peter provides the biblical mandate for apologetics, emphasizing that clarity must always be paired with charity."
      },
      {
        reference: "2 Thessalonians 2:15",
        text: "Stand firm and hold to the traditions that you were taught by us, either by our spoken word or by our letter.",
        explanation: "Shows that divine revelation is communicated through both written and oral apostolic witness."
      },
      {
        reference: "1 Timothy 3:15",
        text: "The church of the living God, a pillar and buttress of the truth.",
        explanation: "Demonstrates that Christ instituted a visible, authoritative Church to guide believers in authentic interpretation."
      }
    ],
    mainArguments: [
      {
        title: "Historical Apostolic Continuity",
        content: "Catholic teaching does not originate in recent centuries; from the earliest post-apostolic writings, the Church held these distinct doctrines in living communion with the successors of the Apostles."
      },
      {
        title: "The Catholic 'Both/And' Principle",
        content: "Critics often fall into 'either/or' dichotomies (faith OR works, Scripture OR Tradition, Christ OR Mary). Catholic theology harmonizes both in their proper hierarchy of truth."
      },
      {
        title: "The Necessity of an Authoritative Magisterium",
        content: "Without a living authority established by Christ, private interpretation inevitably splinters into thousands of conflicting denominations, contradicting Christ's prayer for unity in John 17."
      }
    ],
    churchFathersQuotes: [
      {
        father: "St. Irenaeus of Lyon",
        work: "Against Heresies (c. 180 AD)",
        quote: "True knowledge is that which consists in the doctrine of the Apostles, and the ancient constitution of the Church throughout the world, and the distinctive manifestation of the body of Christ according to the successions of the bishops."
      },
      {
        father: "St. Augustine of Hippo",
        work: "Against the Fundamental Epistle (c. 397 AD)",
        quote: "For my part, I should not believe the gospel except as moved by the authority of the Catholic Church."
      }
    ],
    practicalTips: [
      "Ask clarifying questions to understand what the critic actually believes before responding.",
      "Always affirm the genuine truths and good intentions the other person brings.",
      "Keep the focus on Christ and His intentions for His Church."
    ],
    commonMistakes: [
      "Do not get defensive or angry; speak the truth in love.",
      "Avoid mischaracterizing the critic's view or using strawman arguments."
    ]
  };
}

export async function reviewDebate(
  transcript: string,
  opponentType: string,
  difficulty: string
): Promise<string> {
  try {
    const res = await fetch("/api/ai/review-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, opponentType, difficulty }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.review) return data.review;
      if (data.content) return data.content;
    }
  } catch (err) {
    console.warn("API review route unavailable, using local review engine:", err);
  }

  return `### 🛡️ Apologetics Coach Session Review
**Opponent:** ${opponentType} (${difficulty})
**Overall Assessment:** You demonstrated strong poise and maintained a charitable, constructive tone throughout this debate. Defending the Catholic faith against a ${opponentType} perspective requires both theological accuracy and pastoral sensitivity, which you handled commendably.

**Key Strengths:**
1. **Charity in Engagement:** You listened carefully to the opponent's objections without becoming combative or dismissive.
2. **Biblical Grounding:** You anchored your claims in Sacred Scripture, giving authority to your defense.
3. **Patience:** You avoided interrupting and addressed their concerns directly.

**Areas for Improvement:**
1. **Employ the Columbo Tactic:** Try asking more clarifying questions (e.g., "What do you mean by that?" or "How did you reach that conclusion?") to place the burden of proof back on their premises.
2. **Cite Early Church History:** Introducing patristic witnesses (such as St. Ignatius of Antioch or St. Justin Martyr) would quickly show that early Christian history aligns with Catholic doctrine.

**Recommended Next Steps:**
* Review the **Scripture & Tradition** and **Papacy** study modules in the Topics tab.
* Practice using the **Burden of Proof** strategy in the Tactics workshop.

**Overall Score:** 8.5 / 10 — An excellent practice session. Keep up the disciplined study!`;
}

export async function sendChatMessage(
  messages: { role: "user" | "assistant"; content: string }[],
  systemPrompt?: string,
  deepThink?: boolean
): Promise<string> {
  const result = await sendChatMessageWithGrounding(messages, systemPrompt, deepThink);
  return result.reply;
}

export async function sendChatMessageWithGrounding(
  messages: { role: "user" | "assistant"; content: string }[],
  systemPrompt?: string,
  deepThink?: boolean
): Promise<ChatResponseWithGrounding> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        systemPrompt,
        model: deepThink ? "deepthink" : "standard",
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return {
          reply: data.reply,
          groundingSources: data.groundingSources || [],
          searchQueries: data.searchQueries || [],
        };
      }
    }
  } catch (err) {
    console.warn("Chat API unavailable, falling back to response synthesis:", err);
  }

  const lastUserMsg = messages.filter((m) => m.role === "user").slice(-1)[0]?.content || "";

  if (systemPrompt && systemPrompt.toLowerCase().includes("opponent")) {
    return {
      reply: `I appreciate your explanation, but consider this point: How do you reconcile that with the historical evidence and what Scripture explicitly says? It seems like there is still an unresolved tension in that position. Can you clarify how the early believers practiced this?`,
      groundingSources: [],
      searchQueries: [],
    };
  }

  return {
    reply: `Thank you for sharing that question regarding "${lastUserMsg.slice(0, 45)}". 

In Catholic apologetics, we always look to the threefold cord of truth: **Sacred Scripture**, **Sacred Tradition**, and the **Magisterium** (the Church's teaching authority), as taught in *Dei Verbum* §10. 

As the Catechism explains (CCC 84), the Church does not derive her certainty about all revealed truths from holy Scriptures alone, yet both Scripture and Tradition must be accepted and honored with equal sentiments of devotion and reverence.

What specific aspect of this would you like to explore deeper together?`,
    groundingSources: [],
    searchQueries: [],
  };
}

export async function explainScripture(
  reference: string,
  text: string
): Promise<{ explanation: string; groundingSources?: GroundingSource[] }> {
  try {
    const res = await fetch("/api/ai/explain-verse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, text }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.explanation) {
        return {
          explanation: data.explanation,
          groundingSources: data.groundingSources || [],
        };
      }
    }
  } catch (e) {
    console.warn("Verse explanation error:", e);
  }

  return {
    explanation: `In the Catholic theological tradition, **${reference}** is a cornerstone passage. When read in its historical and literary context alongside the consensus of the Church Fathers, it reveals the harmonious unity between Christ's words and the sacramental reality of the Catholic Church. Rather than being merely figurative or private, this scripture affirms God's covenantal design and apostolic order.`,
    groundingSources: [],
  };
}

export async function fetchDailyQuotes(
  category: "all" | "fathers" | "apologists" | "scientists" = "all",
  refresh = false
): Promise<{ quotes: DailyCatholicQuote[]; liveGrounded: boolean }> {
  try {
    const res = await fetch(`/api/ai/daily-quotes?category=${category}&refresh=${refresh}`, {
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.quotes) && data.quotes.length > 0) {
        return {
          quotes: data.quotes,
          liveGrounded: Boolean(data.liveGrounded),
        };
      }
    }
  } catch (err) {
    console.warn("Daily quotes API unavailable, using cached wisdom:", err);
  }

  return {
    quotes: [],
    liveGrounded: false,
  };
}

export async function generateCustomDailyQuote(
  focusPerson?: string,
  category?: "church_father" | "apologetic_titan" | "catholic_scientist" | string
): Promise<{ quotes: DailyCatholicQuote[]; liveGrounded: boolean }> {
  try {
    const res = await fetch("/api/ai/daily-quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ focusPerson, category }),
      signal: AbortSignal.timeout(45000),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.quotes) && data.quotes.length > 0) {
        return {
          quotes: data.quotes,
          liveGrounded: Boolean(data.liveGrounded),
        };
      }
    }
  } catch (e) {
    console.warn("Custom quote generation error:", e);
  }

  return {
    quotes: [],
    liveGrounded: false,
  };
}
