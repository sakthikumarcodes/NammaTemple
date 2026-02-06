# Deployment Guide - Temple Donation App

## ✅ Pre-Deployment Checklist

- [x] Build passes successfully (`npm run build`)
- [x] All features working locally
- [x] Mobile responsive design implemented
- [x] No environment variables needed (using public Google Sheets)

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (if not already done):
   ```bash
   git push origin main
   ```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"

3. **Import Repository**:
   - Select your `temple-donation-app` repository
   - Vercel will auto-detect Next.js settings

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (first time - will ask for login)
vercel

# For production deployment
vercel --prod
```

## 📝 Important Notes

### Google Sheets Access
- Your Google Sheets are **publicly accessible** via CSV URLs
- No authentication needed
- Make sure your Google Sheets are published as CSV (which they already are)

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables
- **None required** - All data comes from public Google Sheets
- If you add private APIs later, add them in Vercel Dashboard → Settings → Environment Variables

## 🔄 Updating the App

After making changes:

```bash
# Commit changes
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will **automatically deploy** the new version (if you enabled auto-deploy).

## 📱 Post-Deployment

1. **Test the live site**:
   - Check all pages load correctly
   - Test mobile responsiveness
   - Verify Google Sheets data loads

2. **Share the link**:
   - Share `https://your-app-name.vercel.app` with your team
   - The app is now publicly accessible!

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs in Dashboard
- Ensure `package.json` has correct dependencies
- Verify Node.js version (Vercel uses Node 20 by default)

### Data Not Loading
- Verify Google Sheets CSV URLs are correct
- Check if sheets are publicly accessible
- Check browser console for errors

### Mobile Issues
- Test on actual devices
- Use Chrome DevTools mobile emulator
- Check responsive breakpoints

## 📊 Monitoring

- **Analytics**: Vercel provides built-in analytics
- **Logs**: Check Vercel Dashboard → Deployments → View Logs
- **Performance**: Vercel automatically optimizes Next.js apps

---

**Ready to deploy?** Just push to GitHub and connect to Vercel! 🚀

