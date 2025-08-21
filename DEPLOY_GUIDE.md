# Deployment Guide for Letter53 Book

## Overview
This project consists of two parts:
1. **Static Site** (Astro) - The frontend
2. **Go Proxy Server** - Securely handles AI API calls

## Prerequisites
- Node.js 18+ for building the static site
- Go 1.19+ for building the proxy server (optional if using pre-built binary)
- OpenRouter API key from https://openrouter.ai/keys

## Setup Instructions

### 1. Build the Static Site
```bash
npm install
npm run build
```
This creates a `dist/` folder with all static files.

### 2. Build the Go Proxy Server
```bash
cd proxy
go build -o letter53-proxy main.go
```
Or use the pre-built binaries:
- `letter53-proxy` (macOS)
- `letter53-proxy-linux` (Linux)

### 3. Configure Environment Variables
Create a `.env` file:
```bash
OPENROUTER_API_KEY=your-api-key-here
PORT=8080  # Optional, defaults to 8080
```

### 4. Update Proxy URL in Frontend
Edit `src/layouts/BookLayout.astro` line 1449:
```javascript
proxyUrl: window.location.hostname === 'localhost' 
  ? 'http://localhost:8080/proxy'  
  : 'https://api.yourdomain.com/proxy',  // <- Update this
```

## Deployment Options

### Option A: Single Server (Recommended)
Deploy both static files and proxy on the same server:

1. Upload files:
   ```
   dist/           # Static files
   letter53-proxy  # Go binary
   .env           # Environment variables
   ```

2. Run the proxy server:
   ```bash
   ./letter53-proxy &
   ```

3. Configure nginx/Apache to:
   - Serve static files from `dist/`
   - Proxy `/api/proxy` to `localhost:8080/proxy`

Example nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Serve static files
    root /path/to/dist;
    
    # Proxy AI requests to Go backend
    location /api/proxy {
        proxy_pass http://localhost:8080/proxy;
        proxy_set_header Host $host;
    }
}
```

### Option B: Separate Services
1. **Static hosting** (Vercel/Netlify): Deploy `dist/` folder
2. **API hosting** (VPS/Cloud): Deploy Go proxy server
3. Update `proxyUrl` in frontend to point to API server

### Option C: Docker
```dockerfile
# Dockerfile
FROM golang:1.19 AS builder
WORKDIR /app
COPY proxy/ .
RUN go build -o letter53-proxy main.go

FROM node:18 AS frontend
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM alpine:latest
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY --from=builder /app/letter53-proxy .
COPY --from=frontend /app/dist ./dist
COPY .env .
EXPOSE 8080
CMD ["./letter53-proxy"]
```

## Running Locally for Development

1. Start the Go proxy server:
   ```bash
   cd proxy
   OPENROUTER_API_KEY=your-key-here go run main.go
   ```

2. Start the Astro dev server:
   ```bash
   npm run dev
   ```

## Production Checklist

- [ ] Set `OPENROUTER_API_KEY` environment variable
- [ ] Update `proxyUrl` in `BookLayout.astro` to production URL
- [ ] Build static site with `npm run build`
- [ ] Build Go proxy server
- [ ] Configure HTTPS (required for PWA)
- [ ] Set up process manager (systemd/PM2) for Go server
- [ ] Configure CORS if frontend and backend are on different domains
- [ ] Test AI chat functionality

## Security Notes

- **Never** expose the OpenRouter API key in client-side code
- The Go proxy server keeps the API key secure on the server
- Consider rate limiting and authentication for production
- Use HTTPS for all production deployments

## Files to Deploy

```
Production Server:
├── dist/              # Static site files
├── letter53-proxy     # Go proxy executable  
├── .env              # Environment variables
└── (optional) nginx/apache config
```

## Troubleshooting

1. **AI chat not working**: Check proxy server logs and CORS settings
2. **Proxy connection refused**: Ensure Go server is running and port is correct
3. **API key error**: Verify `OPENROUTER_API_KEY` is set in `.env`

## Support

For issues, check the proxy server logs:
```bash
./letter53-proxy  # Logs will appear in console
```