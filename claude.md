# Jóga Zsuzsanna - Project Documentation

## Project Overview

This is a single-page application (SPA) website for Czvikli Zsuzsanna, a professional yoga instructor based in Budapest. The site serves as a portfolio, marketing platform, and content delivery system for yoga services.

**Live URL:** www.jogazzmindennap.online (translates to "Yoga Every Day")

## file manipulation
use relative paths instead of absolute

## Technologies Used

### Frontend
- **Handlebars v4.7.7** - Template engine for server-side template compilation
- **Materialize CSS** - Material Design CSS framework
- **Vanilla JavaScript (ES6+)** - No frontend framework, pure JS
- **YouTube IFrame API** - For video integration and playback
- **Fontello** - Icon library

### Build & Development
- **npm** - Package management
- **Handlebars CLI** - Template compilation
- **Node.js** - Build environment

### Analytics & Tracking
- **Google Tag Manager** (GTM-TKF8Z2P)
- **Google Analytics** (UA-165692815-1)

### Hosting
- **GitHub Pages** with custom domain via CNAME

## Project Structure

```
C:/work/jogazzmindennap/
├── index.html              # Main entry point, SPA shell
├── package.json            # NPM configuration
├── build-templates.js      # Template compilation script (Windows-compatible)
├── site.webmanifest        # PWA configuration
├── CNAME                   # GitHub Pages domain
│
├── js/                     # JavaScript application logic
│   ├── router.js           # Hash-based SPA routing (#aktualis, #video, etc.)
│   ├── menu.js             # UI interactions (menu, scroll, cookies)
│   ├── video_yt_au.js      # YouTube API integration (current version)
│   ├── video.js            # Older video utilities
│   ├── videolist.js        # Database of 100+ yoga videos
│   ├── templates.js        # Compiled Handlebars templates (generated)
│   ├── partials.js         # Handlebars partial templates
│   └── handlebars.runtime.min-v4.7.7.js
│
├── views/                  # Handlebars template source files
│   ├── aktualis.hbs        # Current events/news
│   ├── rolam.hbs           # About the instructor
│   ├── orak.hbs            # Classes schedule (online & in-person)
│   ├── video.hbs           # Video gallery page
│   ├── tabor.hbs           # Yoga retreats/camps
│   ├── kepzes.hbs          # Training courses (Fascia in Yoga)
│   ├── manual.hbs          # Manual therapy services
│   ├── bars.hbs            # Access Bars® therapy
│   ├── jelentkezes.hbs     # Registration form
│   ├── jem.hbs             # Energy massage services
│   ├── credits.hbs         # Credits page
│   ├── privacy.hbs         # Privacy policy
│   └── partials/
│       └── czs.hbs         # Instructor info partial
│
├── css/                    # Stylesheets
│   ├── materialize.css     # Framework CSS
│   ├── fontello.css        # Icon fonts
│   └── style.css           # Custom styles
│
├── img/                    # Images (webp, jpg, png)
├── thumbs/                 # Video thumbnails
├── font/                   # Custom fonts
└── assets/                 # Additional assets
```

## Key Files and Their Purposes

### index.html
- Main HTML shell for the SPA
- Contains navigation bar with all section links
- Single `<div id="pageContent">` where content is dynamically injected
- Footer with contact info and social media links
- Loads all required scripts and styles

### js/router.js
- Client-side routing system
- Listens for hash changes in URL (#aktualis, #video, #orak, etc.)
- Dynamically loads appropriate Handlebars template
- Injects rendered content into #pageContent
- Handles page-specific initialization (e.g., video page)

### js/videolist.js
- Contains array of 100+ yoga videos
- Structure: `{title, youtube, id, ext, duration}`
- Video categories: flow, slow flow, ladder flow, chakra, ashtanga, etc.
- Mix of public and premium content

### js/video_yt_au.js
- Current YouTube integration implementation
- Loads YouTube IFrame API
- Fetches video durations from YouTube API
- Renders video gallery with thumbnails and metadata
- Shows lock icons for premium/restricted videos

### js/menu.js
- Mobile menu toggle functionality
- Smooth scroll-to-top button
- Cookie consent banner (GDPR compliance)
- Pop-up notification system (currently commented out)

### js/templates.js
- **GENERATED FILE** - Do not edit manually
- Compiled from .hbs files using Handlebars CLI
- Contains all page templates in JavaScript format
- Regenerate using: `npm run compile_templates`

### build-templates.js
- Node.js script for cross-platform template compilation
- Handles glob expansion on Windows
- Automatically finds all .hbs files in /views/
- Called by `npm run compile_templates`

## Development Workflow

### Compiling Templates
After editing any .hbs files in /views/, run:
```bash
npm run compile_templates
```
This compiles all .hbs files from views/ into js/templates.js

### Template Structure
- Each page has a corresponding .hbs file in /views/
- Use Handlebars syntax: {{variable}}, {{#if}}, {{#each}}, etc.
- Partials stored in /views/partials/ (e.g., czs.hbs for instructor info)

### Adding New Pages
1. Create new .hbs template in /views/
2. Add navigation link in index.html
3. Run `npm run compile_templates`
4. Add routing logic in router.js if needed
5. Test hash navigation (#newpage)

## Routing Convention

The site uses hash-based routing:
- `#aktualis` - Current events
- `#rolam` - About instructor
- `#orak` - Classes
- `#video` - Video library
- `#tabor` - Retreats
- `#kepzes` - Training courses
- `#manual` - Manual therapy
- `#bars` - Access Bars therapy
- `#jelentkezes` - Registration
- `#credits` - Credits
- `#privacy` - Privacy policy

## Services Offered

1. **Yoga Classes**
   - In-studio at Samadhi Jógastúdió, Budapest
   - Online live classes
   - Recorded video library (100+ videos)
   - 5-session "Morning Flow" courses

2. **Training & Education**
   - "Fascia in Yoga" teacher training (100-hour accredited)
   - Professional development for yoga teachers
   - 2025 fall courses scheduled

3. **Retreats**
   - Seasonal yoga camps/retreats
   - Multi-day immersion experiences

4. **Specialized Services**
   - Access Bars® therapy
   - Manual therapy/treatments
   - Energy work sessions

5. **Community**
   - Private Facebook group "Jógázz minden nap"
   - 16-day yoga challenges
   - Daily asana practice support

## Important Notes

### Language
- Primary language: Hungarian
- All content, navigation, and metadata in Hungarian
- Some technical terms in English

### Video System
- Videos hosted on YouTube
- Thumbnails stored locally in /thumbs/
- Premium content marked with lock icon
- YouTube API automatically fetches durations

### Styling
- Uses Materialize CSS grid system
- Custom colors defined in style.css
- Responsive design - mobile-first approach
- Material Design components (cards, buttons, etc.)

### Analytics
- Google Tag Manager integrated (GTM-TKF8Z2P)
- Google Analytics tracking (UA-165692815-1)
- Cookie consent required per GDPR

### PWA Features
- Web manifest configured (site.webmanifest)
- Multiple icon sizes for Android
- Theme color: #b0c4de (light steel blue)

## Git Workflow

- **Main branch:** master
- Commit messages in Hungarian
- Direct push to GitHub Pages for deployment

## Common Tasks

### Update Video Library
1. Edit js/videolist.js
2. Add new video objects with YouTube ID
3. Thumbnails auto-loaded from YouTube or add to /thumbs/
4. No template compilation needed

### Update Class Schedule
1. Edit views/orak.hbs
2. Run `npm run compile_templates`
3. Commit and push changes

### Update Training/Course Info
1. Edit views/kepzes.hbs
2. Run `npm run compile_templates`
3. Commit and push changes

### Add New Service Page
1. Create views/newservice.hbs
2. Add link in index.html navigation
3. Add route handling in router.js
4. Run `npm run compile_templates`
5. Test hash navigation

## File Size Considerations

- js/templates.js: ~73KB (compiled templates)
- img/: 2.5MB+ (optimized webp/jpg images)
- thumbs/: 120+ video thumbnails
- Total: Optimized for web delivery

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 may have limited support
- Mobile-responsive design
- Touch-friendly navigation

## Contact & Support

- Instructor: Czvikli Zsuzsanna
- Email: info@jogazzmindennap.online
- Facebook: Links in footer
- Studio: Samadhi Jógastúdió, Budapest
