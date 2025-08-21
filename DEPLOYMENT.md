# Letter53 Book - Deployment Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Domain: letter53.ir configured

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Static Site
```bash
npm run build
```
This creates the production-ready files in the `dist/` folder.

### 3. Preview Build Locally (Optional)
```bash
npm run preview
```
Access at http://localhost:4322

## Deployment Options

### Option A: Netlify (Recommended - Free)
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add custom domain: letter53.ir

### Option B: Vercel (Alternative - Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts and set:
   - Build command: `npm run build`
   - Output directory: `dist`

### Option C: Traditional Hosting (cPanel/DirectAdmin)
1. Build locally: `npm run build`
2. Upload contents of `dist/` folder to public_html
3. Configure .htaccess for clean URLs:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]
```

### Option D: GitHub Pages
1. Add to package.json:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
2. Install: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

## Environment Variables
No environment variables required for basic deployment.

For AI chat feature (if using proxy):
- Deploy proxy server separately
- Update `PROXY_URL` in the code

## Post-Deployment Checklist
- [ ] Verify all pages load correctly
- [ ] Test search functionality
- [ ] Check font loading (Dana font)
- [ ] Test theme switcher
- [ ] Verify PWA installation
- [ ] Check mobile responsiveness
- [ ] Test offline functionality

## Domain Configuration
For letter53.ir, add these DNS records:
```
Type: A
Name: @
Value: [Your hosting IP]

Type: CNAME
Name: www
Value: letter53.ir
```

## SSL Certificate
- Netlify/Vercel: Automatic SSL
- Traditional hosting: Use Let's Encrypt

## Performance Optimization
The site is already optimized with:
- Static generation (no server required)
- PWA for offline access
- Optimized fonts with unicode-range
- Lazy loading for images

## Troubleshooting

### Fonts not loading
Ensure `/fonts/` directory is properly uploaded

### 404 errors on routes
Check .htaccess configuration for clean URLs

### Search not working
Verify search index is built during `npm run build`

## Support
For issues, check the browser console for errors.