# Portfolio Template - Universel & Polyvalent

Template de portfolio professionnel et universel one-page construit avec **Next.js 16**, **Tailwind CSS 4** et **shadcn/ui**. Adaptable à n'importe quel corps de métier (designers, consultants, chefs de projet, créatifs, freelances, développeurs, etc.). Site responsive avec mode sombre/clair, animations fluides au scroll (Framer Motion), design épuré (thème neutral/zinc) et formulaire de contact fonctionnel via EmailJS.

---

## Sommaire

- [Aperçu des sections](#aperçu-des-sections)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Structure des fichiers](#structure-des-fichiers)
- [Installation](#installation)
- [Configuration](#configuration)
- [Personnalisation](#personnalisation)
- [Dépendances du portfolio](#dépendances-du-portfolio)
- [Dépannage](#dépannage)
- [Déploiement](#déploiement)

---

## Aperçu des sections

| Section          | ID            | Description                                                                                                                          |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Navbar**       | —             | Barre de navigation fixe avec effet blur au scroll, toggle dark/light, menu hamburger mobile                                         |
| **Hero**         | `#hero`       | Présentation avec titre animé (rotation des métiers/spécialités), avatar neutre, CTA et liens sociaux                               |
| **Réalisations** | `#projects`   | Badges de compétences modulables par catégorie + 3 projets vedettes en cartes larges + 3 projets secondaires en grille             |
| **Parcours**     | `#experience` | Formation (cartes) puis expérience professionnelle (timeline verticale)                                                               |
| **Contact**      | `#contact`    | Informations de contact en sidebar + formulaire fonctionnel avec validation et notifications toast                                   |
| **Footer**       | —             | Copyright et liens sociaux rapides                                                                                                   |

---

## Stack technique

| Catégorie            | Technologie             | Version | Rôle                                                                  |
| -------------------- | ----------------------- | ------- | --------------------------------------------------------------------- |
| **Framework**        | Next.js                 | 16.x    | App Router, rendu côté serveur/client, optimisation d'images          |
| **Langage**          | TypeScript              | 5.x     | Typage statique                                                       |
| **Styling**          | Tailwind CSS            | 4.x     | Utilitaires CSS, responsive, dark mode (classe)                       |
| **UI Kit**           | shadcn/ui               | —       | Composants accessibles (Button, Card, Input, Textarea, Tooltip)       |
| **Animations**       | Framer Motion           | 12.x    | Animations d'entrée, scroll-triggered, transitions                    |
| **Thème**            | next-themes             | 0.4.x   | Basculement dark/light mode via classe CSS                            |
| **Icônes**           | Lucide React            | 0.525.x | Icônes SVG légères                                                    |
| **Notifications**    | Sonner                  | 2.x     | Toasts de succès/erreur (importé directement, PAS via shadcn toaster) |
| **Email**            | @emailjs/browser        | 4.x     | Envoi de emails côté client sans backend                              |
| **Polices**          | Geist Sans / Geist Mono | —       | Polices système via `next/font/google`                                |
| **Base de couleurs** | Neutral / Zinc          | —       | Palette monochrome via variables CSS oklch                            |

---

## Architecture du projet

### Pattern : Single-file component avec App Router

Le portfolio suit une architecture simple et directe :

- **`page.tsx`** est un composant client unique (`"use client"`) contenant toutes les sections du site. Chaque section (Navbar, Hero, Réalisations, Parcours, Contact, Footer) est une fonction composant déclarée dans le même fichier. Le composant exporté `Home` les compose dans l'ordre.

- **`layout.tsx`** est un Server Component qui configure les polices, la metadata SEO et le thème. Il importe un composant `Providers` client pour encapsuler `ThemeProvider` (voir ci-dessous).

- **`providers.tsx`** est un Client Component (`"use client"`) qui encapsule `ThemeProvider` de `next-themes`. Cette séparation est **obligatoire** avec Next.js 16 pour éviter l'erreur `"Encountered a script tag while rendering React component"` qui se produit quand on place `ThemeProvider` directement dans un Server Component.

### Flux de rendu

```
layout.tsx (Server Component)
  └── <html> + <body> + polices Geist
       └── <Providers> (Client Component — providers.tsx)
            └── <ThemeProvider attribute="class" defaultTheme="dark">
                 └── {children}
                      └── page.tsx (Client Component)
                           └── <Navbar />
                           └── <HeroSection />
                           └── <ProjectsSection />
                           └── <ExperienceSection />
                           └── <ContactSection />
                           └── <Footer />
                           └── <Toaster richColors position="top-right" />
```

### Système de thème

Le thème est géré par `next-themes` avec la stratégie `attribute="class"` :

- Le mode sombre est le thème par défaut (`defaultTheme="dark"`)
- Le toggle est accessible dans la Navbar (desktop et mobile)
- Les variables CSS sont définies dans `globals.css` :
  - `:root` pour le thème clair
  - `.dark` pour le thème sombre
  - Toutes les couleurs utilisent le format **oklch** pour une meilleure précision chromatique

### Animations

Deux niveaux d'animation avec Framer Motion :

1. **Entrées de page** : Les éléments du Hero apparaissent en cascade (`opacity` + `y` avec des `delay` croissants de 0.1s)
2. **Scroll-triggered** : Le wrapper `AnimatedSection` utilise `useInView` pour déclencher une animation `opacity: 0, y: 30` → `opacity: 1, y: 0` quand l'élément entre dans le viewport (trigger une seule fois, marge de -60px)

### Formulaire de contact (EmailJS)

Le formulaire envoie des emails directement depuis le navigateur via EmailJS, sans passer par un backend :

1. L'utilisateur remplit le formulaire (nom, email, sujet, message)
2. La validation vérifie que nom, email et message sont remplis
3. `emailjs.send()` envoie les données au service EmailJS
4. Un toast de succès ou d'erreur s'affiche via Sonner

Les identifiants EmailJS doivent être remplacés (voir section [Configuration](#configuration)).

---

## Structure des fichiers

```
portfolio/
├── next.config.ts          # Configuration Next.js (images distantes, standalone output)
├── package.json            # Dépendances et scripts
├── tsconfig.json           # Configuration TypeScript (path alias @/*)
├── postcss.config.mjs      # PostCSS avec @tailwindcss/postcss (v4)
├── tailwind.config.ts      # Config Tailwind (héritage v3, partiellement utilisé)
├── components.json         # Config shadcn/ui (style: new-york, base: neutral)
├── public/
│   ├── profile.png         # Photo de profil (format carré recommandé, 400x400px min)
│   ├── logo.svg            # Logo du site
│   └── robots.txt          # Autorise tous les crawlers
└── src/
    ├── app/
    │   ├── layout.tsx      # Layout racine (Server Component : polices, metadata, Providers)
    │   ├── providers.tsx   # Client Component : encapsule ThemeProvider de next-themes
    │   ├── page.tsx        # Page principale (Client Component : toutes les sections)
    │   └── globals.css     # Variables CSS oklch (thème clair/sombre), scrollbar, Tailwind
    ├── components/
    │   └── ui/             # Composants shadcn/ui installés
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── textarea.tsx
    │       ├── tooltip.tsx
    │       └── ... (autres composants shadcn non utilisés par le portfolio)
    └── lib/
        └── utils.ts        # Helper cn() pour fusionner les classes Tailwind
```

### Description des fichiers clés

| Fichier                 | Type             | Description                                                                                                                                                                                                                          |
| ----------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/app/providers.tsx` | Client Component | Encapsule `ThemeProvider` de `next-themes`. **Fichier obligatoire** pour Next.js 16 — sans lui, placer ThemeProvider directement dans `layout.tsx` provoque une erreur de script tag.                                                |
| `src/app/layout.tsx`    | Server Component | Importe `Providers` (pas ThemeProvider directement), configure les polices Geist, la metadata SEO (title, description, Open Graph, favicon) et la langue (`lang="fr"`).                                                              |
| `src/app/page.tsx`      | Client Component | Fichier principal (~1096 lignes). Contient tous les composants de section, les données du portfolio (projets, compétences, expériences, formation), l'intégration EmailJS et l'import `Toaster` depuis `sonner`.                     |
| `src/app/globals.css`   | CSS              | Imports Tailwind v4 (`@import "tailwindcss"`), variant dark `@custom-variant`, mapping des variables de thème dans `@theme inline`, définition des couleurs oklch pour `:root` (clair) et `.dark` (sombre), scrollbar personnalisée. |
| `next.config.ts`        | Config           | Active `output: "standalone"` pour le déploiement, configure `remotePatterns` pour autoriser les images depuis `images.unsplash.com` (nécessaire pour les images des projets).                                                       |

---

## Installation

### Prérequis

- Node.js 18+ ou Bun
- npm, yarn ou bun

### Installation pas à pas

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-user/portfolio.git
cd portfolio

# 2. Installer les dépendances
npm install
# ou : bun install

# 3. Configurer EmailJS (voir section Configuration ci-dessous)

# 4. Lancer le serveur de développement
npm run dev
# ou : bun run dev
```

Le site est accessible sur **http://localhost:3000**.

### Scripts disponibles

| Commande        | Description                                         |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Serveur de développement avec Turbopack (port 3000) |
| `npm run build` | Build de production (mode standalone)               |
| `npm run start` | Lancer le build de production                       |
| `npm run lint`  | Linter ESLint                                       |

---

## Configuration

### EmailJS (obligatoire pour le formulaire)

Le formulaire de contact nécessite un compte [EmailJS](https://www.emailjs.com/) gratuit. Remplacez les trois identifiants placeholders dans `src/app/page.tsx`, fonction `ContactSection`, méthode `handleSubmit` :

```typescript
await emailjs.send(
  "VOTRE_SERVICE_ID", // ← Remplacer par votre Service ID
  "VOTRE_TEMPLATE_ID", // ← Remplacer par votre Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject || "Nouveau message du portfolio",
    message: formData.message,
  },
  "VOTRE_PUBLIC_KEY", // ← Remplacer par votre Public Key
);
```

**Étapes EmailJS :**

1. Créer un compte sur [emailjs.com](https://www.emailjs.com/)
2. Ajouter un **Email Service** (Gmail, Outlook, etc.) → noter le `Service ID`
3. Créer un **Email Template** avec les variables `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}` → noter le `Template ID`
4. Récupérer la **Public Key** depuis Account > API Keys
5. Remplacer les trois valeurs dans le code

### Photo de profil

Remplacer `public/profile.png` par votre propre photo. Recommandation : format carré, 400x400px minimum, format PNG ou JPG.

### Images des projets

Les projets utilisent des images depuis Unsplash. Pour utiliser vos propres images :

1. Placer vos images dans `public/projects/` par exemple
2. Mettre à jour les URLs dans le tableau `projects` de la fonction `ProjectsSection()` dans `page.tsx` :

```typescript
image: "/projects/mon-projet.jpg",  // au lieu de l'URL Unsplash
```

Si vous utilisez une source externe, ajoutez le domaine dans `next.config.ts` :

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "votre-domaine.com" },  // ajouter ici
  ],
},
```

---

## Personnalisation

### Guide de modification par section

Toutes les données du portfolio sont centralisées dans `src/app/page.tsx`. Voici où modifier chaque élément :

| Élément                     | Fonction / Emplacement                                                    | Ligne approx. |
| --------------------------- | ------------------------------------------------------------------------- | ------------- |
| **Nom complet**             | `HeroSection()` — texte dans le `<h1>`                                    | ~260          |
| **Titres animés**           | `HeroSection()` — tableau `titles`                                        | ~227          |
| **Description**             | `HeroSection()` — paragraphe sous les titres                              | ~290          |
| **Photo de profil**         | Remplacer `public/profile.png`                                            | —             |
| **Liens sociaux (Hero)**    | `HeroSection()` — tableau dans la section social links                    | ~319          |
| **Compétences (badges)**    | `ProjectsSection()` — tableau `skillGroups`                               | ~411          |
| **Projets vedettes**        | `ProjectsSection()` — entrées du tableau `projects` avec `featured: true` | ~417          |
| **Autres projets**          | `ProjectsSection()` — entrées avec `featured: false`                      | ~451          |
| **Formation**               | `ExperienceSection()` — tableau `education`                               | ~724          |
| **Expériences**             | `ExperienceSection()` — tableau `experiences`                             | ~691          |
| **Email de contact**        | `ContactSection()` — objet dans la liste d'infos contact                  | ~906          |
| **Localisation**            | `ContactSection()` — objet "Localisation"                                 | —             |
| **Liens sociaux (Contact)** | `ContactSection()` — objets "GitHub" et "LinkedIn"                        | —             |
| **Footer**                  | `Footer()` — tableau des liens sociaux                                    | ~1060         |

### Modifier le thème de couleurs

Les couleurs sont définies dans `src/app/globals.css` via des variables CSS en format **oklch** :

- **`:root`** — Couleurs du thème clair
- **`.dark`** — Couleurs du thème sombre

Variables principales à modifier pour changer la palette :

```css
:root {
  --background: oklch(1 0 0); /* Fond principal */
  --foreground: oklch(0.145 0 0); /* Texte principal */
  --primary: oklch(0.205 0 0); /* Couleur primaire (boutons, liens) */
  --muted: oklch(0.97 0 0); /* Fond secondaire */
  --border: oklch(0.922 0 0); /* Bordures */
  --ring: oklch(0.708 0 0); /* Focus rings */
}
```

Le thème actuel utilise une palette **neutral/zinc** (monochrome). Pour ajouter de la couleur, modifiez les valeurs oklch pour inclure une composante de chroma (deuxième paramètre) et de hue (troisième paramètre).

### Composants shadcn/ui utilisés

Le portfolio utilise uniquement ces composants de shadcn/ui :

| Composant                                                | Import                     | Usage                                    |
| -------------------------------------------------------- | -------------------------- | ---------------------------------------- |
| Button                                                   | `@/components/ui/button`   | CTA, toggle thème, liens                 |
| Card, CardContent                                        | `@/components/ui/card`     | Cartes de projets, formation, expérience |
| Input                                                    | `@/components/ui/input`    | Champs du formulaire de contact          |
| Textarea                                                 | `@/components/ui/textarea` | Champ message du formulaire              |
| Tooltip, TooltipContent, TooltipProvider, TooltipTrigger | `@/components/ui/tooltip`  | Info-bulles sur les icônes sociales      |

---

## Dépendances du portfolio

Seules ces dépendances sont réellement utilisées par le portfolio. Les autres packages dans `package.json` proviennent du scaffold de base et peuvent être ignorés :

```json
{
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.23.2",
    "next-themes": "^0.4.6",
    "sonner": "^2.0.6",
    "@emailjs/browser": "^4.4.1",
    "lucide-react": "^0.525.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "class-variance-authority": "^0.7.1"
  }
}
```

Composants Radix UI utilisés (via shadcn/ui) :

- `@radix-ui/react-slot` (Button)
- `@radix-ui/react-tooltip` (Tooltip)
- `@radix-ui/react-label` (Input, Textarea)

---

## Dépannage

### Erreurs fréquentes et solutions

#### 1. Erreur de build liée à `tailwind.config.ts`

**Note** : Le fichier `tailwind.config.ts` utilise la syntaxe Tailwind v3 (compatible avec les composants shadcn/ui), mais le runtime utilise Tailwind v4 via `@tailwindcss/postcss`. Ce fichier est partiellement utilisé pour la configuration des composants. Ne pas le supprimer même si l'application compile sans erreur sans lui.

---

## Déploiement

### Vercel (recommandé)

Le déploiement sur Vercel est automatique et optimisé pour Next.js :

1. Créer un compte sur [vercel.com](https://vercel.com/)
2. Importer le dépôt GitHub
3. Vercel détecte automatiquement Next.js et configure le build
4. Le déploiement se lance à chaque `push` sur `main`

### Build standalone (production)

Le projet est configuré avec `output: "standalone"` dans `next.config.ts` :

```bash
# Build
npm run build

# Le résultat est dans .next/standalone/
# Lancer en production
node .next/standalone/server.js
```

### Variables d'environnement

Aucune variable d'environnement n'est requise pour le portfolio lui-même. Les identifiants EmailJS sont codés directement dans le composant client (acceptable pour un portfolio personnel où la clé publique est destinée à être publique).

---

## Licence

Projet personnel — Tous droits réservés.
