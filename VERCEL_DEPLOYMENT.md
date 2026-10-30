# 🚀 Complete Guide: Connecting to GitHub & Deploying on Vercel

Follow these 5 simple steps to connect Daily Defense to a GitHub repository and deploy it live on Vercel with serverless AI backend support.

---

## Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com/new).
2. Choose a repository name (e.g., `daily-defense-catholic-apologetics`).
3. Set the visibility to **Public** or **Private** according to your preference.
4. **Do NOT** initialize with a README, .gitignore, or license (we already have those configured for you).
5. Click **Create repository**.
6. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/daily-defense-catholic-apologetics.git`).

---

## Step 2: Push Your Code to GitHub

Open your terminal in the project root directory and run:

```bash
# 1. Add all project files
git add .

# 2. Create the initial commit
git commit -m "feat: initial commit for Daily Defense Catholic Apologetics"

# 3. Rename branch to main (if not already main)
git branch -M main

# 4. Link your GitHub remote repository (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/daily-defense-catholic-apologetics.git

# 5. Push to GitHub
git push -u origin main
```

*(If you are prompted for GitHub credentials, use your GitHub username and a Personal Access Token with repo scope, or authenticate via the GitHub CLI `gh auth login`)*.

---

## Step 3: Deploy to Vercel

1. Log in to [Vercel](https://vercel.com).
2. On your Vercel Dashboard, click **Add New...** and select **Project**.
3. Under **Import Git Repository**, select your newly pushed GitHub repository.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite` (Vercel automatically detects this)
   - **Root Directory**: `./` (default)
   - **Build Command**: `vite build` (or leave default)
   - **Output Directory**: `dist` (default)

---

## Step 4: Configure Environment Variables in Vercel

Under the **Environment Variables** section on the Vercel project configuration page (or later in **Settings > Environment Variables**), add:

| Key | Value | Description |
|---|---|---|
| `GEMINI_API_KEY` | `AIzaSy...` | Your Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey) |

> **Note:** The Firebase configuration is already embedded in `firebase-applet-config.json`, which runs client-side in the browser.

Click **Deploy**! Vercel will build the frontend, deploy the serverless functions in `/api`, and give you a live production URL (e.g., `https://daily-defense-catholic-apologetics.vercel.app`).

---

## Step 5: Whitelist Your Vercel Domain in Firebase (Crucial for Auth!)

To allow Google Sign-In and Firebase Authentication to work on your new Vercel domain:

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project (`ai-studio-applet-webapp-ea9be`).
3. In the left sidebar, navigate to **Build** > **Authentication**.
4. Click on the **Settings** tab at the top.
5. In the **Authorized domains** card, click **Add domain**.
6. Enter your Vercel deployment domain:
   - Example: `daily-defense-catholic-apologetics.vercel.app` (or your custom domain)
7. Click **Save**.

---

## ⚡ How Vercel Runs This App

- **Frontend (`dist`)**: Vercel serves the compiled Vite SPA directly from its global Edge CDN with instant caching and fast load times.
- **Backend API (`api/index.ts`)**: Handled by Vercel Serverless Functions. All calls to `/api/chat`, `/api/ai/generate-topic`, `/api/ai/review-session`, `/api/ai/pray`, `/api/ai/explain-verse`, and `/api/ai/daily-quotes` execute securely on the server with full Gemini AI & Google Search Grounding capabilities.
- **Routing (`vercel.json`)**: Configured to route `/api/*` to the serverless backend and all other requests to the SPA.
