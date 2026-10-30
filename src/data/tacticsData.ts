export interface Tactic {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  prompt: string;
  keyRule: string;
  examples: string[];
}

export const TACTICS: Tactic[] = [
  {
    id: "columbo",
    name: "The Columbo Tactic",
    subtitle: "Ask questions to expose contradictions",
    desc: "Named after TV detective Columbo, this strategy uses gentle, clarifying questions to manage conversations without preaching. Questions let you gather information, reverse the burden, and guide the other person to spot flaws in their own logic.",
    prompt: "Teach me the Columbo tactic in Catholic apologetics. Give practical examples of how to use 'Just one more thing...' style questions to expose weaknesses in anti-Catholic arguments.",
    keyRule: "Never make a statement when you can ask a genuine clarifying question.",
    examples: [
      "\"What do you mean by that?\"",
      "\"How did you reach that conclusion?\"",
      "\"Have you ever considered that the early Christians didn't have printed Bibles?\"",
    ],
  },
  {
    id: "burden",
    name: "Burden of Proof",
    subtitle: "Put the burden on the critic",
    desc: "The person making the positive assertion bears the burden of proof. When a critic claims 'the Catholic Church invented purgatory in the Middle Ages' or 'Catholics worship idols,' don't immediately defend—ask them to prove their premise.",
    prompt: "Explain how to apply the concept of burden of proof in Catholic apologetics. When critics make claims against Catholicism, how do I effectively shift the conversation to require them to support their claims?",
    keyRule: "He who asserts must prove. Do not defend against claims that have not been substantiated.",
    examples: [
      "\"Where in historical records did you find that Council or Pope inventing this?\"",
      "\"What biblical evidence leads you to believe that Scripture alone was intended as the sole authority?\"",
    ],
  },
  {
    id: "stealing",
    name: "Stealing the Atheist's Bait",
    subtitle: "Turn objections into opportunities",
    desc: "Acknowledge the partial truth or good instinct in the opponent's objection, then show how Catholic theology actually fulfills or resolves that exact insight in a far deeper way.",
    prompt: "Explain the tactic of using an objection against the Catholic faith to your advantage. How do I use the question itself to point back to Catholic truth?",
    keyRule: "Find the hidden truth inside the error, affirm the good desire, then complete the picture.",
    examples: [
      "\"I agree with you that salvation is a free gift of grace that nobody can purchase. That is precisely why the Council of Trent condemned Pelagianism!\"",
    ],
  },
  {
    id: "common_ground",
    name: "Finding Common Ground",
    subtitle: "Start with shared beliefs",
    desc: "Before highlighting differences, establish shared convictions. With Protestants, celebrate the Lordship of Christ, the Inspiration of Scripture, and the Trinity. With Muslims, celebrate the oneness and sovereignty of God. With secular people, celebrate reason and compassion.",
    prompt: "How do I find common ground with Protestants, atheists, and other critics before presenting Catholic arguments? Give specific examples with different types of critics.",
    keyRule: "Build bridges of charity before discussing walls of difference.",
    examples: [
      "\"We both love Jesus Christ and revere the Word of God in Sacred Scripture. Can we look at John 6 together through that lens?\"",
    ],
  },
  {
    id: "tu_quoque",
    name: "The Tu Quoque Defense",
    subtitle: "Handle 'your church is corrupt' attacks",
    desc: "When opponents point to historical scandals, corrupt popes, or bad Christians, distinguish between the holiness of Christ's Bride and the sinful nature of human members. Show that bad behavior disobeys Church teaching rather than reflects it.",
    prompt: "How do I handle the 'tu quoque' (you too) argument — when critics say the Catholic Church is morally corrupt? What is the proper Catholic response to historical scandals?",
    keyRule: "Judas does not invalidate the Twelve; hospital patients being sick does not mean medicine is false.",
    examples: [
      "\"If a doctor tells you to eat healthy but drinks soda, the medical truth remains true. Catholic dogma condemns greed and abuse.\"",
    ],
  },
];
