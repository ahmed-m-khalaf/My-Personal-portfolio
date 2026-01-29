# Portfolio Development Guide

> **Reference**: [3bnaser.tech](https://3bnaser.tech/)

---

## 1. Design System

| Element       | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Background**| Abyss `#0A1628`                                            |
| **Cards**     | Midnight `#551818` + Glassmorphism                         |
| **Accent**    | Crimson `#1e98d9`, Sapphire `#1E5F7E`                      |
| **Text**      | White `#FAFBFC`, Gray `#E8ECEF`, Slate `#7C8B9F`           |
| **Fonts**     | Space Grotesk (Headings), Inter (Body)                     |

---

## 2. Site Sections (Order)

| #   | Section          | Key Elements                                              |
| --- | ---------------- | --------------------------------------------------------- |
| 1   | **Navbar**       | Logo, Links (Home, About, Skills, Projects, Contact), Blur |
| 2   | **Hero**         | Name, Tagline, 2 CTAs (View Work, Let's Talk)              |
| 3   | **About**        | Photo, Bio, Email, Phone, Hire Me, Download CV             |
| 4   | **Skills**       | Grid of skill cards with icons                             |
| 5   | **Services**     | What I Can Do (Build Sites, Apps, UI/UX, SEO)              |
| 6   | **Projects**     | Cards: Image, Title, Tags, Demo/GitHub                     |
| 7   | **Certificates** | 🆕 GSAP Image Slider, animated transitions, auto-play      |
| 8   | **Contact**      | Form (Name, Email, Message), Contact Info                  |
| 9   | **Footer**       | Logo, Quick Links, Socials, Copyright                      |

---

## 3. Development Phases

### Phase 1: Data Layer
| File                        | Status                                       |
| --------------------------- | -------------------------------------------- |
| `src/data/skills.js`        | Pending                                      |
| `src/data/projects.js`      | Pending                                      |
| `src/data/services.js`      | Pending                                      |
| `src/data/socials.js`       | Pending                                      |
| `src/data/about.js`         | Pending                                      |
| `src/data/certificates.js`  | Pending                                      |

### Phase 2: Layout Components
| Component              | Details                                       |
| ---------------------- | --------------------------------------------- |
| `Navbar.jsx`           | Sticky, blur, responsive, mobile menu         |
| `Footer.jsx`           | Links, socials, copyright                     |
| `SectionWrapper.jsx`   | Reusable padding/container + SectionHeader    |
| `Button.jsx`           | Primary, Secondary, Ghost, Outline variants   |
| `Card.jsx`             | Glass effect + Project/Skill/Service cards    |

### Phase 3: Page Sections
| Section             | Key Features                                   |
| ------------------- | ---------------------------------------------- |
| `Hero.jsx`          | GSAP text animation, gradient bg               |
| `About.jsx`         | Photo + bio + stats grid                       |
| `Skills.jsx`        | Icon grid from `skills.js`                     |
| `Services.jsx`      | Service cards from `services.js`               |
| `Projects.jsx`      | Project cards with hover, filters              |
| `Certificates.jsx`  | 🆕 GSAP image slider, smooth transitions       |
| `Contact.jsx`       | Form + EmailJS + contact info                  |

### Phase 4: UI Polish & Enhancements 🆕
- [ ] Add `Lenis` for smooth scrolling
- [ ] Implement Custom GSAP Cursor
- [ ] Add background noise texture
- [ ] Floating image animation in `About.jsx`
- [ ] Staggered reveal for all sections

### Phase 5: Testing & Deployment
- [ ] Responsive: 375px, 768px, 1440px
- [ ] Lighthouse: Performance, SEO, Accessibility
- [ ] Final visual QA

---

## 4. Data Structure Examples

### `projects.js`
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Brief description.",
    tags: ["React", "Tailwind"],
    demo: "https://demo.com",
    github: "https://github.com/...",
    image: "/images/project-1.png"
  }
];
```

### `services.js`
```javascript
export const services = [
  {
    id: 1,
    title: "Build Websites",
    description: "Responsive, modern websites.",
    icon: "FaCode"
  }
];
```

### `socials.js`
```javascript
export const socials = [
  { id: 1, name: "GitHub", url: "https://github.com/...", icon: "FaGithub" },
  { id: 2, name: "LinkedIn", url: "https://linkedin.com/...", icon: "FaLinkedin" }
];
```

### `certificates.js` 🆕
```javascript
export const certificates = [
  {
    id: 1,
    title: "React Developer Certificate",
    issuer: "Meta",
    date: "2024",
    image: "/images/certificates/cert-1.png",
    credentialUrl: "https://credential.url"
  }
];
```

---

## 5. Next Actions
1. [ ] Review this guide
2. Create `src/data/projects.js`, `services.js`, `socials.js`, `about.js`
3. Build `Navbar.jsx` + `Footer.jsx`
4. Build `Hero.jsx`
