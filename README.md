# Alexandria

A portfolio website template with Alexandria’s original charcoal and gold design, uppercase headings, fine outlined buttons, and animated layered portrait. Built with Next.js 15, React 19, MUI Joy, and Framer Motion.

## Run

```sh
npm ci
npm run build
npm start -- --port 3001
```

Open http://localhost:3001. Development: `npm run dev -- --port 3001`. Source checks: `npm run lint`.

## Typography

Headlines use Instrument Serif with regular and italic WOFF2 faces bundled in `src/registry/alexandria/fonts.css`. Warm ivory headlines and the original #E1B77B gold accent add an editorial finish; navigation and body copy remain sans serif. The SIL Open Font License is included in `InstrumentSerif-OFL.txt`. The registry packages both files, so installations do not require runtime requests to Google Fonts.

## Pages

- `/`: a focused home hero with a dark-gold gradient, original layered portrait, short introduction, and contact button. The logo links home; there is no Home navigation item or homepage footer.
- `/services`: one service per full-width row, including deliverables and a contact link.
- `/work`: selected concept projects; every card opens a case study.
- `/work/analytics-dashboard`, `/work/digital-workspace`, `/work/creative-portfolio`: individual case studies with challenge, approach, design direction, and next-project navigation.
- `/about`: biography, skills, and design experience. Experience has no separate page or navigation item.
- `/contact`: sample contact details and a form that opens an email draft in the visitor’s email app. It does not send or store messages.
- `/registry`: install instructions and registry endpoints.

The header and footer are shared. Each route has its own title; invalid case-study slugs return 404.

## Customize the template

Edit `src/registry/alexandria/data.ts` for services and project case studies, `content.tsx` for About and Contact, and `resume.tsx` for the home hero and shared header. `src/components/website.tsx` supplies the local portrait and card photographs. Styles live in `resume.module.css`.

All biographies, project narratives, and contact details are illustrative. The case studies explicitly identify themselves as concepts and use stock photography; replace them with real project visuals and verified outcomes when personalizing. No employers, employment dates, testimonials, or performance metrics are fabricated. Change both `hello@example.com` references in the contact view before using it for real inquiries.

## shadcn registry

`npm run registry:build` uses the official shadcn CLI to build two items:

- `/r/alexandria-website.json`: the complete component set and App Router pages.
- `/r/alexandria-resume.json`: the component set only, retaining the previous item address. The `page` prop selects `home`, `services`, `work`, `about`, `contact`, or `case-study`; the last also accepts `projectSlug`.

Install the full template into a Next.js App Router project configured for shadcn:

```sh
npx shadcn@latest add http://localhost:3001/r/alexandria-website.json
```

Review route replacements when installing into an existing application. The host project supplies its root layout and global styles. Route source templates are in `registry/website-pages`; source definitions are in `registry.json`. The components declare their MUI Joy, Emotion, Framer Motion, and react-icons dependencies. Installed templates use remote images by default; the local preview serves downloaded Unsplash images and retains the original portrait.

Catalogs are served at `/registry.json` and `/r/registry.json`. Production builds rebuild the registry.

## Public discovery

Source: https://github.com/mesbahismail/Alexandria

The repository was private when inspected. Local builds do not publish it or change visibility. Deploy to a public HTTPS domain or explicitly publish the source before sharing the registry. Update the localhost namespace URL in `components.json` for hosted use.

Official directory listing requires a public open-source registry and a reviewed pull request to `shadcn-ui/ui`: https://ui.shadcn.com/docs/registry/registry-index. No directory submission has been made.

## Archived avatar assets

The generated avatar images in `public/images/alexandria-avatar-*.png` and generation prompts in `docs/avatar-prompts.md` are retained as optional assets. The homepage uses the original `public/hero-image.png` portrait with its offset gold frame and backing layers. It does not display avatar upload or pose controls.
