GEMINI.md — ARES OS Website Engineering Instructions

Project

You are working on the official ARES OS website.

Repository:
https://github.com/ares-os-official/ares-os-official.github.io

Live website:
https://ares-os-official.github.io/

Your task is to fully analyze the existing project before modifying anything.

Do not make assumptions about the architecture, existing localization system, assets, responsive behavior, metadata, or deployment structure.

---

1. REQUIRED INITIAL ANALYSIS

Before writing or modifying any code, inspect the repository in its entirety.

Analyze:

- Every HTML file
- Every JavaScript file
- Every CSS file
- Every image and logo asset
- The existing localization/translation system
- Language detection and language persistence
- "<head>" metadata
- Open Graph metadata
- Twitter/X card metadata
- Favicon configuration
- Web manifest, if present
- All responsive CSS/media queries
- Navigation
- Mobile navigation
- Buttons and interactive elements
- External resources/CDNs
- Links
- Images and their paths
- Font loading
- Layout structure
- Accessibility attributes
- Existing SEO configuration
- Existing performance optimizations
- Any build/deployment configuration

Also inspect the actual live website and compare it against the repository.

Do not immediately start editing after finding a potential problem.

First understand why the problem exists and how the current implementation works.

---

2. IMPORTANT — DO NOT DESTROY EXISTING FUNCTIONALITY

The website already contains a multilingual system.

Existing languages include:

- Italian
- English
- French
- Spanish
- German
- Russian
- Portuguese
- Chinese
- Japanese

The current website visibly exposes these language options.

Your modifications MUST NOT:

- Remove any language
- Remove existing translations
- Replace the localization system with a simpler system
- Delete translation keys
- Break language switching
- Break language persistence
- Break translated navigation
- Break translated buttons
- Break translated FAQ content
- Break translated sections
- Hardcode English over translated content
- Remove language selectors
- Change unrelated website functionality

If the existing localization architecture is imperfect, improve it carefully rather than replacing it blindly.

---

3. DEFAULT LANGUAGE MUST BE ENGLISH

The website currently loads in Italian by default.

This must be changed.

Required behavior

When a new visitor opens:

https://ares-os-official.github.io/

the default language must be:

English (EN)

The English translation must therefore be the fallback/default language.

However, this does NOT mean removing Italian or any other language.

The language system must continue supporting all existing languages.

---

Language priority logic

Implement a safe priority strategy similar to:

1. Explicitly saved user language preference
2. Explicitly selected language
3. Existing valid language preference/cookie/localStorage
4. Browser language, if the existing architecture intentionally supports browser detection
5. English fallback

The exact implementation must be determined after analyzing the existing localization code.

Do not blindly add a second localization system.

If the project already has a language-selection mechanism, modify that mechanism cleanly.

---

4. ARES OS LOGO — LINK PREVIEW / SOCIAL PREVIEW

Fix the issue where the official ARES OS logo does not appear correctly when someone shares or enters the website URL and a link preview is generated.

The preview should use the official ARES OS logo already present in the GitHub repository.

Do not create a fake replacement logo.

Do not use an unrelated external image.

First identify:

- The exact official logo asset
- Its repository path
- Its format
- Its dimensions
- Whether it is suitable for Open Graph
- Whether it needs an optimized/cropped variant

Then configure the website metadata correctly.

---

Required metadata

Inspect and correctly configure at minimum:

Open Graph

- "og:title"
- "og:description"
- "og:type"
- "og:url"
- "og:image"
- "og:image:alt"
- "og:site_name"
- "og:locale"

If appropriate for the existing site, also configure:

- "og:image:width"
- "og:image:height"
- "og:image:type"

Twitter/X

Configure the appropriate:

- "twitter:card"
- "twitter:title"
- "twitter:description"
- "twitter:image"
- "twitter:image:alt"

Use the official ARES OS logo.

---

IMPORTANT: IMAGE URL

The metadata image must resolve to a URL that social-media crawlers can actually access.

Do not use:

- Relative paths that are invalid for crawlers
- Local filesystem paths
- JavaScript-generated metadata
- Canvas-generated images
- Images that require client-side rendering
- An asset inaccessible from the public internet

Use a stable absolute URL appropriate for GitHub Pages.

Verify that the final URL actually points to the intended ARES OS logo.

---

5. SOCIAL PREVIEW COMPATIBILITY

Do not assume that changing the HTML is enough.

Understand that platforms such as:

- Discord
- Facebook
- X
- Telegram
- WhatsApp
- LinkedIn
- other link-preview crawlers

may cache previews.

After implementing the metadata, verify that:

- The metadata exists in the final deployed HTML
- The image URL is publicly reachable
- The image has an appropriate format
- The image is not blocked by robots/security configuration
- The metadata is not being overwritten by JavaScript

If the platform still displays an old preview after the fix, understand that this may be caused by crawler caching rather than the website implementation.

---

6. MOBILE-FRIENDLY REQUIREMENT

The entire website must be properly mobile-friendly.

Do NOT simply add one generic media query and consider the task finished.

Analyze the current layout at different viewport sizes.

At minimum, reason about:

- 320px
- 360px
- 375px
- 390px
- 412px
- 430px
- tablet-sized screens
- desktop
- large desktop

Check:

- Header
- Navigation
- Language selector
- Hero section
- Hero typography
- Buttons
- OS edition cards
- Feature cards
- Performance/statistics section
- FAQ
- Footer
- Images
- Logo
- Spacing
- Containers
- Text wrapping
- Horizontal overflow
- Vertical spacing
- Touch targets
- Interactive elements

---

7. MOBILE DESIGN PRINCIPLES

The mobile version should be a proper responsive adaptation of the existing design.

Do NOT redesign the entire website unless necessary.

Preserve the existing:

- Visual identity
- Branding
- Typography
- Color system
- Components
- Content hierarchy
- Animations
- Overall aesthetic

Improve responsiveness where required.

Avoid:

- Horizontal scrolling
- Text overflowing outside containers
- Buttons extending beyond the viewport
- Cards being wider than the viewport
- Tiny touch targets
- Excessive desktop-sized typography on mobile
- Navigation overflowing
- Broken grids
- Images overflowing containers
- Fixed elements covering content

---

8. RESPONSIVE IMPLEMENTATION

Prefer the project's existing CSS architecture.

Before introducing new CSS:

1. Understand existing styles.
2. Identify the actual responsive problems.
3. Determine whether existing rules can be corrected.
4. Reuse existing classes where possible.
5. Add new rules only when necessary.

Do not create duplicate styling systems.

Avoid excessive "!important".

Avoid arbitrary pixel values unless technically justified.

Use responsive units and layout primitives appropriately.

Prefer:

- CSS Grid
- Flexbox
- "clamp()"
- responsive spacing
- "max-width"
- fluid typography
- appropriate breakpoints

where they improve the existing implementation.

---

9. MOBILE NAVIGATION

Pay special attention to navigation.

Verify that the navigation:

- Fits on small screens
- Does not overflow
- Remains usable with touch
- Does not hide important links
- Does not conflict with the language selector
- Does not cause horizontal scrolling
- Maintains visual consistency

If a mobile menu already exists, fix it rather than replacing it unnecessarily.

---

10. ACCESSIBILITY

While modifying the website, preserve or improve accessibility.

Check:

- "alt" text
- button labels
- navigation semantics
- keyboard navigation
- focus states
- color contrast
- language selector accessibility
- touch target sizes

Do not sacrifice accessibility for visual appearance.

---

11. PERFORMANCE

Do not introduce unnecessary JavaScript or dependencies.

Before adding a library, ask whether the same result can be achieved using the existing project.

Prefer:

- existing JavaScript
- existing CSS
- native browser APIs
- optimized assets

Do not turn a simple static website into a framework-dependent application unless the repository already requires it.

---

12. SEO AND METADATA

While analyzing the project, verify:

- "<title>"
- meta description
- canonical URL
- language metadata
- Open Graph metadata
- Twitter metadata
- favicon
- viewport metadata

Make only changes that are actually justified.

The canonical website URL is:

https://ares-os-official.github.io/

---

13. DO NOT CHANGE UNRELATED CONTENT

Do not modify:

- ARES OS claims
- Product descriptions
- Performance numbers
- Edition information
- Legal text
- Privacy Policy
- Disclaimer
- Community links
- Download information

unless a change is strictly required to fix one of the requested technical problems.

Do not rewrite content simply because you prefer different wording.

---

14. VALIDATION BEFORE FINISHING

After making changes, perform a complete verification.

Check:

Localization

- Fresh visitor receives English
- English works
- Italian works
- French works
- Spanish works
- German works
- Russian works
- Portuguese works
- Chinese works
- Japanese works
- Language switching still works
- Existing saved language preferences still work

Link preview

Verify:

- "og:image"
- "og:title"
- "og:description"
- "og:url"
- Twitter metadata
- absolute image URL
- official ARES OS logo
- publicly accessible image

Responsive

Verify the site at:

- 320px
- 360px
- 375px
- 390px
- 412px
- 430px
- tablet
- desktop

Look specifically for horizontal overflow.

Functional

Verify:

- Navigation
- Buttons
- Language selector
- FAQ
- Links
- Images
- Footer
- Mobile menu, if present
- Animations

---

15. FINAL QUALITY CHECK

Before considering the task complete, answer these questions internally:

1. Did I inspect the entire repository before editing?
2. Did I understand the existing localization system?
3. Did I preserve every existing translation?
4. Is English now the safe default?
5. Does the official ARES OS GitHub logo appear in Open Graph previews?
6. Is the "og:image" absolute and publicly accessible?
7. Does the website work correctly on mobile?
8. Did I avoid unnecessary redesigns?
9. Did I avoid unnecessary dependencies?
10. Did I avoid breaking unrelated functionality?
11. Did I verify the final HTML/metadata?
12. Did I test for horizontal overflow?
13. Did I preserve the existing visual identity?

If any answer is "no", do not consider the task finished.

---

16. ENGINEERING PRINCIPLE

Analyze first. Modify second. Validate third.

Do not act impulsively.

Do not rewrite working systems simply because another implementation looks cleaner.

Make the smallest set of high-quality changes necessary to achieve:

- English as the default language
- Fully preserved multilingual functionality
- Correct ARES OS logo in link previews
- Proper Open Graph/Twitter metadata
- Strong mobile responsiveness
- No regressions

The final result should feel like the same ARES OS website, only technically corrected, more robust, and properly responsive.
