# Rajiv Kumar H N — Personal Portfolio Website

A cinematic, editorial-grade animated personal portfolio website designed for **Rajiv Kumar H N**, specializing in AI Research, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), SEO, and AI-Driven Lead Generation.

---

## 🌟 Key Features

1. **Cinematic Hero Opening & Animated Identity**:
   - Authentic studio portrait of Rajiv Kumar H N styled with dark atmospheric lighting and subtle electric cyan highlights.
   - Smooth walking-style entrance transition gliding into a confident standing pose with natural breathing movement.
   - Interactive **Pose Director** (Walking Entrance, Confident Standing, Thoughtful Pose, Presentation Pose).
   - In-app **Portrait Identity Manager** allowing Rajiv to upload, test, or replace his photo directly from the browser (persisted locally).

2. **Core Specializations & Case Studies**:
   - **AI Index Survey**: Empirical research on artificial intelligence adoption and readiness in educational institutions.
   - **SEO, GEO & AEO Research**: Strategies for visibility across traditional engines and generative AI answers (Perplexity, ChatGPT, Gemini).
   - **AI-Powered Web Platforms**: Fast, accessible, search-optimized web architectures.
   - **Personal Portfolio Platform**: Accessible motion design, editorial typography, and multi-channel integrations.

3. **Full-Stack Node/Express Backend Server (`server.ts`)**:
   - `GET /api/health`: Health monitoring and uptime metrics.
   - `POST /api/contact`: Form processing, data validation, and persistent storage of recruiter inquiries with unique reference IDs.
   - `GET /api/contact/messages`: Retrieve received inquiries directly into Rajiv's in-app inbox.
   - `DELETE /api/contact/messages/:id`: Inquiry management.
   - Integrated with Vite in development (`tsx server.ts`) and static production serving (`node server.ts`).

4. **Grounded Direct Communication Channels**:
   - **LinkedIn**: Direct verified profile link to `https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/`.
   - **YouTube**: Official channel integration with `https://www.youtube.com/@Rajiv02-y6s1f`.
   - **WhatsApp**: Verified Indian destination (+91 7676546577) with pre-filled message format:
     `https://wa.me/917676546577?text=Hello%20Rajiv%2C%20I%20visited%20your%20portfolio%20website%20and%20would%20like%20to%20connect%20with%20you.`
   - **Validated Contact Form**: Full name, email, subject, message with direct WhatsApp & Email transmission options.

4. **Editorial & Anti-Slop Discipline**:
   - Zero pill capsules on metadata.
   - Clean unboxed labels with typographic separators (`·`, `/`).
   - No fake percentages, scores, or fabricated awards.
   - Full reduced-motion accessibility support.

---

## 🛠️ How to Customize Your Portfolio

All personal information, social links, project descriptions, skills, and copy are organized in a single configuration file:

👉 `src/data/portfolioData.ts`

### 1. Updating Your Portrait Permanently
To replace the default portrait with your permanent photograph:
1. Place your photo inside `public/assets/portrait.jpg` (or in `src/assets/images/`).
2. Update the `portraitImage` field in `src/data/portfolioData.ts`:
   ```ts
   portraitImage: '/assets/portrait.jpg',
   ```
*(You can also use the camera button in the top navigation or hero section to upload your photo directly in the browser).*

### 2. Updating Social Channels or Contact Numbers
Modify the `socials` object in `src/data/portfolioData.ts`:
```ts
socials: {
  linkedin: 'https://www.linkedin.com/in/rajiv-kumar-h-n-a024683b5/',
  youtube: 'https://www.youtube.com/@Rajiv02-y6s1f',
  whatsapp: {
    number: '917676546577',
    displayNumber: '+91 76765 46577',
    ...
  },
  email: 'rajiv2122004@gmail.com',
}
```

---

## 🚀 Deployment Instructions

### Deploy to GitHub Pages:
1. In `vite.config.ts`, add your repository name as the base:
   ```ts
   export default defineConfig({
     base: '/<your-repo-name>/', // or '/' if using a custom domain
     ...
   });
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the resulting `dist/` directory to your `gh-pages` branch.

### Deploy to Vercel / Netlify / Cloud Run:
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
