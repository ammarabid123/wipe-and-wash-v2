# Wipe & Wash

React/Vite website for Wipe & Wash solar panel cleaning services in Karachi.

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Validate a production build

```powershell
npm run build
npm run preview
```

## Project structure

```text
src/
  App.jsx                         Page composition only
  main.jsx                        React entry point
  index.css                       Shared site styles and responsive layout
  content.js                      Site details, page content, and form helpers
  icons.jsx                       Reusable SVG icon components
  components/
    layout/
      Header.jsx                  Desktop and mobile navigation
      Footer.jsx                  Footer and floating social links
    sections/
      Hero.jsx                    Hero banner and primary calls to action
      Stats.jsx                   Trust/statistics strip
      Process.jsx                 Four-step cleaning process
      Impact.jsx                  Solar loss messaging
      Results.jsx                 Before/after results carousel
      WhyChoose.jsx               Service benefits
      Reviews.jsx                 Customer reviews
      ContactSection.jsx          FAQ and quote form
    Calculator/
      Calculator.jsx              Solar loss calculator logic and markup
      Calculator.css              Calculator-only styles
```

## Where to make common edits

- Update business contact details or page copy in `src/content.js`.
- Update a page section in its matching file under `src/components/sections/`.
- Update navigation or footer links in `src/components/layout/`.
- Update site-wide colors, spacing, and responsive rules in `src/index.css`.
- Update calculator behavior or its isolated styles in `src/components/Calculator/`.
- Add public images and videos under `public/images/` and `public/videos/`.

Keep `App.jsx` focused on ordering sections. New page sections should generally be added as their own component rather than growing `App.jsx`.
