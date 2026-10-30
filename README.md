# 🛡️ Daily Defense - Catholic Apologetics Web Application

A full-stack Catholic apologetics and spiritual study web application featuring in-depth doctrinal topic studies, AI practice debates with Google Search Grounding, Scripture analysis, traditional prayers, Church Fathers quotes, Catholic science history, and user progress tracking.

---

## 🚀 Features

- **📚 Core Apologetic Modules:** In-depth defenses of Catholic dogmas (Papacy, Real Presence in the Eucharist, Marian Dogmas, Scripture & Tradition, Purgatory, Justification, Sacraments).
- **⚔️ Practice Arena & AI Debate Simulation:** Real-time apologetic debates against various challenger archetypes (Evangelical Protestant, Secular Atheist, Eastern Orthodox, Progressive Christian) with tactical coaching feedback.
- **✨ Google Search-Grounded AI:** Verifies Catechism citations, Scripture verses, Church Councils, and Patristic quotes via Gemini 3.8 Flash.
- **🔬 Catholic Science Fathers & Church Fathers Wisdom:** Inspiring historical profiles and quotes from Fr. Georges Lemaître (Big Bang), Gregor Mendel (Genetics), Louis Pasteur (Microbiology), Bl. Nicolas Steno (Geology), St. Thomas Aquinas, and Church Fathers.
- **📖 Bible Study Explorer:** Integrated Douay-Rheims Scripture lookup and apologetics cross-references.
- **🙏 Traditional Catholic Prayers & Spiritual Intentions:** Daily prayers, Rosary guides, and personalized spiritual intention requests.
- **🔒 Firebase Authentication & Persistent Notes:** Cloud Firestore note storage, user profiles, and seamless Google & Defender authentication.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
- **Backend / Serverless:** Express & Vercel Serverless Function (`api/index.ts`)
- **AI Engine:** Google Gemini 3.8 Flash with Google Search Grounding (`@google/genai`)
- **Database & Auth:** Firebase Firestore & Firebase Authentication
- **Build Tooling:** Vite, TypeScript, PWA Support

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)):
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deploying to Vercel via GitHub

This project is pre-configured with `vercel.json` and `api/index.ts` for instant deployment on Vercel:

1. **Push this repository to GitHub** (see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for full commands).
2. Go to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Add the Environment Variable in Vercel:
   - `GEMINI_API_KEY`: Your Google Gemini API Key
5. Click **Deploy**!
6. In **Firebase Console -> Authentication -> Settings -> Authorized Domains**, add your Vercel domain (`*.vercel.app`) so Google Sign-In works on your live URL.

For detailed, step-by-step guidance, refer to **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**.
