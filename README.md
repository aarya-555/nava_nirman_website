# Nava Nirman — Mud Interlock Bricks Industries

Production-ready marketing website for Nava Nirman, a manufacturer of eco-friendly
mud interlock and compressed earth blocks in Bantwal, Dakshina Kannada, Karnataka.

## Project structure

```
website/
├── index.html          # Page markup
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # All interactions (nav, reveals, parallax, video control)
├── images/             # Photos, logo, product images, icons
├── videos/             # Optimised, muted MP4 loops (manufacturing + construction)
├── fonts/              # Reserved (fonts load from Google Fonts CDN)
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── README.md
```

## Run locally

It is a static site — no build step.

- Double-click `index.html`, **or**
- Serve the folder (recommended, so video/lazy-loading behave like production):
  ```bash
  cd website
  python3 -m http.server 8000
  # open http://localhost:8000
  ```

## Deploy

Upload the **entire `website/` folder** to any static host (Hostinger, Netlify,
Vercel, GitHub Pages, cPanel). Keep the folder structure intact.

After your domain is live, update these three references to your real URL:

1. `robots.txt` → `Sitemap: https://your-domain/sitemap.xml`
2. `sitemap.xml` → `<loc>https://your-domain/</loc>`
3. `index.html` `<head>` → `<meta property="og:image" content="https://your-domain/images/proj-curved-wall.jpg">`
   (so link previews on WhatsApp/Facebook show the project photo)

## Notes

- Fonts (Bricolage Grotesque, Inter, Space Mono) load from Google Fonts.
- Images are compressed/progressive; below-the-fold media uses `loading="lazy"`.
- Videos are muted, looped, `playsinline`, and pause when off-screen for performance.
- All animations respect the user's "reduce motion" setting.
- Business details, pricing and contact info are managed directly in `index.html`.
