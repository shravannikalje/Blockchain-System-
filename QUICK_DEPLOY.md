# 🚀 Quick Deploy Guide (सोपी पद्धत)

## तुमची code आधीच GitHub वर आहे! ✅

Repository: https://github.com/shravannikalje/Blockchain-System-

आता फक्त **2 simple steps** करा:

---

## Step 1️⃣: GitHub Pages Enable करा (Frontend)

**काय करायचं:**

1. Browser मध्ये जा: 
   ```
   https://github.com/shravannikalje/Blockchain-System-/settings/pages
   ```

2. **"Source"** dropdown मध्ये select करा: **"GitHub Actions"**

3. **Save** button दाबा

4. **2-3 minutes** wait करा

5. फिरून या या page वर - तुम्हाला दिसेल:
   ```
   Your site is live at https://shravannikalje.github.io/Blockchain-System-/
   ```

✅ **Done!** Frontend deploy झालं!

---

## Step 2️⃣: Backend Deploy करा (Render - Free)

### Option A: Render Dashboard (Recommended)

1. जा: https://render.com (GitHub account ने login करा - free आहे)

2. **"New +"** button → **"Web Service"** click करा

3. **"Build and deploy from a Git repository"** → **Next**

4. तुमची repo शोधा: `Blockchain-System-` → **Connect**

5. Settings fill करा:
   ```
   Name: chainsys-backend (काहीही नाव द्या)
   Region: Singapore (closest to India)
   Branch: main
   Root Directory: backend
   Environment: Docker
   ```

6. **Free plan** select करा

7. **"Create Web Service"** दाबा

8. ⏳ **Wait 5-10 minutes** - build होईल

9. Deploy झाल्यावर वर दिसेल: 
   ```
   https://chainsys-backend-xxxx.onrender.com
   ```
   
   **या URL ची copy करा!**

---

## Step 3️⃣: Backend URL Connect करा

Backend URL मिळाल्यावर:

1. `js/config.js` file उघडा

2. बदला:
   ```js
   window.APP_CONFIG = {
     API_BASE_URL: "https://chainsys-backend-xxxx.onrender.com/api"
   };
   ```
   (तुमचं actual Render URL घाला)

3. Save करा

4. Git मध्ये push करा:
   ```bash
   git add js/config.js
   git commit -m "Connect backend URL"
   git push origin main
   ```

5. **2-3 minutes** wait - GitHub Pages auto-update होईल

---

## ✅ Verify Deployment

### Frontend Check:
- Browser मध्ये जा: `https://shravannikalje.github.io/Blockchain-System-/`
- Page load व्हायला हवं (light/dark theme toggle काम करेल)

### Backend Check:
- Browser मध्ये जा: `https://chainsys-backend-xxxx.onrender.com/api/health`
- दिसायला हवं: `{"status":"OK","service":"Blockchain Backend"}`

### Full System Check:
- Frontend वर **"Create Transaction"** button दाबा
- Details fill करा → Submit
- Transaction table मध्ये add व्हायला हवं
- **"Create Block"** दाबा
- Blocks count increase व्हायला हवं

---

## 🔧 Troubleshooting

### GitHub Pages 404 Error?
- Settings → Pages मध्ये "GitHub Actions" select केलं का check करा
- Actions tab जा: https://github.com/shravannikalje/Blockchain-System-/actions
- Latest workflow ✅ green tick असायला हवं

### Backend Not Responding?
- Render dashboard मध्ये "Logs" tab check करा
- First request ला 30-50 seconds लागतील (free tier cold start)

### Frontend Shows "Demo Mode"?
- `js/config.js` मध्ये correct backend URL आहे का check करा
- Backend URL `/api` ने end व्हायला हवं
- HTTPS असायला हवं (HTTP नाही)

---

## 📊 Free Tier Limits

**Render Free Plan:**
- Backend 15 minutes inactivity नंतर sleep होईल
- First request नंतर wake up होण्यास 30-50s
- Month मध्ये 750 hours free (पुरेसे!)

**GitHub Pages:**
- Unlimited usage ✅
- Auto-deploy on every push ✅

---

**Need help?** Check full docs: `DEPLOYMENT.md`
