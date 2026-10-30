export interface LibraryDocument {
  title: string;
  desc: string;
  url: string;
  source: string;
}

export interface LibraryCategory {
  category: string;
  color: string;
  badgeBg: string;
  icon: string;
  documents: LibraryDocument[];
}

export const LIBRARY_CATEGORIES: LibraryCategory[] = [
  {
    category: "Catechism of the Catholic Church",
    color: "text-sky-700",
    badgeBg: "bg-sky-50 border-sky-200",
    icon: "BookOpen",
    documents: [
      {
        title: "Catechism of the Catholic Church (USCCB)",
        desc: "Complete official text of the Catechism with search and index",
        url: "https://www.usccb.org/beliefs-and-teachings/what-we-believe/catechism/catechism-of-the-catholic-church",
        source: "USCCB",
      },
      {
        title: "Compendium of the Catechism",
        desc: "Shorter question-and-answer format summarizing Catholic doctrine",
        url: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html",
        source: "Vatican",
      },
    ],
  },
  {
    category: "Vatican Documents & Councils",
    color: "text-purple-700",
    badgeBg: "bg-purple-50 border-purple-200",
    icon: "Landmark",
    documents: [
      {
        title: "Lumen Gentium (Light of the Nations)",
        desc: "Dogmatic Constitution on the Church from the Second Vatican Council",
        url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html",
        source: "Vatican II",
      },
      {
        title: "Dei Verbum (Word of God)",
        desc: "Dogmatic Constitution on Divine Revelation, Sacred Scripture, and Sacred Tradition",
        url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651118_dei-verbum_en.html",
        source: "Vatican II",
      },
      {
        title: "Gaudium et Spes (Joy and Hope)",
        desc: "Pastoral Constitution on the Church in the Modern World",
        url: "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19651207_gaudium-et-spes_en.html",
        source: "Vatican II",
      },
    ],
  },
  {
    category: "Papal Encyclicals",
    color: "text-amber-700",
    badgeBg: "bg-amber-50 border-amber-200",
    icon: "Scroll",
    documents: [
      {
        title: "Fides et Ratio (Faith and Reason)",
        desc: "St. John Paul II on the harmonious relationship between faith and human reason",
        url: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_15101998_fides-et-ratio.html",
        source: "St. John Paul II",
      },
      {
        title: "Veritatis Splendor (The Splendor of Truth)",
        desc: "Fundamental principles of Catholic moral theology and moral absolutes",
        url: "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_06081993_veritatis-splendor.html",
        source: "St. John Paul II",
      },
      {
        title: "Deus Caritas Est (God is Love)",
        desc: "Pope Benedict XVI on eros, agape, and divine charity",
        url: "https://www.vatican.va/content/benedict-xvi/en/encyclicals/documents/hf_ben-xvi_enc_20051225_deus-caritas-est.html",
        source: "Benedict XVI",
      },
    ],
  },
  {
    category: "Apologetics & Patristics Archives",
    color: "text-navy-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
    icon: "Shield",
    documents: [
      {
        title: "Catholic Answers",
        desc: "The world's largest Catholic apologetics database and encyclopedia",
        url: "https://www.catholic.com",
        source: "Catholic.com",
      },
      {
        title: "New Advent Church Fathers",
        desc: "Complete early Church Fathers writings from the 1st through 8th centuries",
        url: "https://www.newadvent.org/fathers/",
        source: "New Advent",
      },
    ],
  },
];
