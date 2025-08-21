# Letter53 Book - نامه ۵۳

An interactive Persian online book about Letter 53 from Nahjul Balagha, built with Astro.

## Features

- 📖 Full text of Letter 53 with Persian/Farsi content
- 🔍 Client-side full-text search with Persian support
- ✨ AI-powered conversational search (searches only within book content)
- 🌓 Dark/Light theme toggle
- 📱 Responsive design for all devices
- 💾 Offline support with client-side search
- 🔗 Auto-hyperlinking of chapter references in AI responses

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🤖 AI Search Feature

The AI search feature uses OpenRouter API with Google's Gemini Flash model to provide intelligent answers based on the book content.

### Important Notes:

1. **Content Updates**: The AI search index is generated at **build time**. This means:
   - During development (`npm run dev`): Restart the dev server after adding/modifying chapters
   - In production: Run `npm run build` to regenerate the search index with new content

2. **API Configuration**: 
   - **Development**: API key is temporarily in `src/layouts/BookLayout.astro` (for testing only)
   - **Production**: Use the Go proxy server in `/proxy` folder to keep your API key secure
   
### Secure Deployment with Proxy

For production, use the included Go proxy server to keep your API key secure:

1. Build the proxy: `cd proxy && go build -o letter53-proxy main.go`
2. Deploy the binary to your server
3. Set environment variable: `OPENROUTER_API_KEY=your-key`
4. Run the proxy: `./letter53-proxy`
5. Update `AI_CONFIG.proxyUrl` in `BookLayout.astro` to your proxy URL
6. Remove the API key from the frontend code

3. **Features**:
   - Chat history is saved in localStorage
   - Auto-hyperlinking of chapter references (e.g., "فصل اول", "جلسه دوم", etc.)
   - Rate limiting: 20 requests per session (invisible to users)
   - Keyboard shortcut: Ctrl+Shift+K (Windows/Linux) or ⌘+Shift+K (Mac)

## 🔍 Search Features

The book includes two search systems:

1. **Text Search** (Ctrl+K or ⌘+K):
   - Client-side full-text search using MiniSearch
   - Persian text normalization and fuzzy matching
   - Instant results with highlighting

2. **AI Search** (Ctrl+Shift+K or ⌘+Shift+K):
   - Conversational interface
   - Searches only within book content
   - Provides contextual answers with chapter references

## 📝 Development Tips

- The search index (`/api/search-index.json`) contains all chapter content
- Persian text utilities are in `src/lib/persian-utils.ts`
- All UI components are in `src/layouts/BookLayout.astro`
- Chapter content is stored in `src/content/chapters/`
