export const PRAYER_SUGGESTIONS = [
  "strength to defend my faith with charity",
  "wisdom and gentleness before a debate",
  "healing for a sick family member or friend",
  "courage to share the Gospel at work or school",
  "peace of mind during spiritual dryness or doubt",
  "discernment and guidance in my vocation",
  "conversion of a loved one who has left the Church",
  "protection against temptation and evil",
];

export interface TraditionalPrayer {
  id: string;
  title: string;
  latinTitle?: string;
  text: string;
  category: "Marian" | "Basic" | "Spiritual Warfare" | "Sacraments" | "Saints";
}

export const TRADITIONAL_PRAYERS: TraditionalPrayer[] = [
  {
    id: "hail_mary",
    title: "Hail Mary",
    latinTitle: "Ave Maria",
    category: "Marian",
    text: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  },
  {
    id: "our_father",
    title: "Our Father (The Lord's Prayer)",
    latinTitle: "Pater Noster",
    category: "Basic",
    text: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  },
  {
    id: "st_michael",
    title: "Prayer to St. Michael the Archangel",
    latinTitle: "Sancte Michael Archangele",
    category: "Spiritual Warfare",
    text: "Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all the evil spirits who prowl through the world seeking the ruin of souls. Amen.",
  },
  {
    id: "act_of_contrition",
    title: "Act of Contrition",
    category: "Sacraments",
    text: "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin. Amen.",
  },
  {
    id: "memorare",
    title: "The Memorare",
    category: "Marian",
    text: "Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thy intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.",
  },
  {
    id: "glory_be",
    title: "Glory Be",
    latinTitle: "Gloria Patri",
    category: "Basic",
    text: "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
  },
  {
    id: "anima_christi",
    title: "Anima Christi",
    category: "Sacraments",
    text: "Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O good Jesus, hear me. Within Thy wounds hide me. Suffer me not to be separated from Thee. From the malicious enemy defend me. In the hour of my death call me and bid me come unto Thee, that with Thy saints I may praise Thee forever and ever. Amen.",
  },
  {
    id: "st_thomas_study",
    title: "Prayer of St. Thomas Aquinas Before Study",
    category: "Saints",
    text: "Creator of all things, true Source of light and wisdom, lofty origin of all being, graciously let a ray of Your brilliance penetrate into the darkness of my understanding and take from me the double darkness in which I have been born, an obscurity of both sin and ignorance. Give me a sharp sense of understanding, a retentive memory, and the ability to grasp things correctly and fundamentally. Amen.",
  },
];
