# MK MotionFX - 3D Gaming Portfolio

A high-performance, gaming-style 3D portfolio website for a Video Editor & Motion Graphics Designer, built with React, Three.js (React Three Fiber), Tailwind CSS, and Framer Motion.

## 🎮 Features

- **Immersive 3D Background** - Floating geometric shapes, particle systems, and animated grid using React Three Fiber
- **Gaming-Style UI** - Dark theme with neon accents (green/pink/purple), glitch effects, scanlines
- **Smooth Animations** - Framer Motion for page transitions, hover effects, scroll animations
- **Smooth Scrolling** - Lenis for buttery smooth scroll experience
- **Responsive Design** - Mobile-first approach, works on all devices
- **Performance Optimized** - Dynamic imports, efficient Three.js rendering, optimized assets

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Three.js + React Three Fiber** - 3D graphics
- **@react-three/drei** - Three.js helpers
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Advanced animations (available)
- **Lenis** - Smooth scrolling

## 📦 Project Structure

```
portfolio-3d/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── three/           # Three.js/React Three Fiber components
│   │   │   ├── Scene3D.jsx         # Main 3D scene with floating shapes
│   │   │   ├── FloatingParticles.jsx # Particle system
│   │   │   ├── GridBackground.jsx  # Animated grid floor
│   │   │   ├── AboutScene.jsx      # Skill tree visualization
│   │   │   ├── ServiceCard3D.jsx   # 3D icons for service cards
│   │   │   ├── PortfolioScene.jsx  # Project grid visualization
│   │   │   └── ContactScene.jsx    # Envelope animation
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

```bash
# Navigate to project directory
cd portfolio-3d

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
pnpm build
# or
yarn build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
# or
yarn preview
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the gaming color palette:

```js
colors: {
  gaming: {
    bg: '#0a0a0f',
    bgSecondary: '#11111a',
    card: '#16161f',
    border: '#1f1f2e',
    primary: '#00ff88',      // Neon green
    secondary: '#ff006e',    // Neon pink
    accent: '#7209b7',       // Purple
    // ...
  }
}
```

### Content

Update the data arrays in each component:
- `Hero.jsx` - Stats, tagline
- `About.jsx` - Skills, experience, bio
- `Services.jsx` - Service offerings
- `Portfolio.jsx` - Projects, categories
- `Contact.jsx` - Form fields, contact info
- `Footer.jsx` - Links, social media

### 3D Scenes

Modify the Three.js components in `src/components/three/` to customize:
- Particle counts, colors, behavior
- Geometry types, materials
- Animation speeds, patterns
- Camera positions

## 📱 Sections

1. **Hero** - Full-screen 3D scene with animated title, stats, CTAs
2. **About** - Profile card with 3D skill tree, bio, skills, experience
3. **Services** - 6 service cards with 3D icons, features, stats
4. **Portfolio** - Filterable project grid with modal detail view
5. **Contact** - Gaming-style form with 3D envelope animation
6. **Footer** - Links, newsletter, social, scroll-to-top

## 🌐 Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables if needed

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Framework preset: Vite
4. Deploy

### Other Static Hosts

Upload the `dist/` folder to any static hosting (GitHub Pages, Cloudflare Pages, Firebase Hosting, etc.)

## ⚡ Performance Tips

- Use optimized images (WebP, proper sizing)
- Enable gzip/brotli compression on server
- Consider using a CDN for assets
- Monitor Three.js render performance with `stats.js` in development

## 🐛 Troubleshooting

### Three.js Canvas Not Showing
- Ensure WebGL is supported in browser
- Check browser console for errors
- Verify `antialias: true` and `alpha: true` in Canvas props

### Animations Stuttering
- Reduce particle counts in Three.js components
- Lower `fog` distance
- Use `useMemo` for geometries/materials

### Tailwind Classes Not Working
- Run `npm run dev` to rebuild CSS
- Check `tailwind.config.js` content paths
- Ensure `@tailwind` directives in `index.css`

## 📄 License

MIT License - Feel free to use for your own portfolio!

## 🤝 Credits

- **Design Inspiration**: Gaming UI, Cyberpunk aesthetics
- **Fonts**: Space Grotesk, Orbitron, JetBrains Mono (Google Fonts)
- **Icons**: Unicode emojis
- **Images**: Unsplash (placeholder images)

---

Built with ❤️ using React + Three.js + Tailwind CSS