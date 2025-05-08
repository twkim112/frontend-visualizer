# Frontend Visualizer

Frontend Visualizer is an intuitive, static web-based catalog designed to empower "vibe coders," designers, and developers who think visually. The core mission is to bridge the gap between visual concepts for UI elements/effects and their corresponding technical names.

## Project Overview

Many individuals know what they want a feature to look or feel like but struggle to find the correct terminology to search for examples, tutorials, or implementations. Frontend Visualizer serves as a comprehensive visual dictionary, showcasing UI components, visual effects, and interaction patterns with clear visual examples.

### Features

- **Visual Component Catalog**: Browse through components categorized by function and appearance
- **Clear Technical Terminology**: Each component displays its proper name and common aliases
- **Visual First Approach**: Identify components by sight and learn their proper names
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for static site generation

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd frontend-visualizer

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
  - `/src/components/layout` - Layout components (header, footer)
  - `/src/components/visuals` - Visual examples of UI components
- `/src/data` - Data structures for the visual components catalog

## Component Categories

1. **Navigation Systems**: Menus, tabs, breadcrumbs, and navigation controls
2. **Input Controls**: Buttons, form elements, and interactive inputs
3. **Feedback Elements**: Alerts, notifications, and status indicators
4. **Content Organization**: Cards, containers, and layout structures
5. **Animation & Effects**: Transitions, hover effects, and visual animations

## Deployment

This application is configured for static site generation, making it ideal for deployment on platforms like Vercel, Netlify, or GitHub Pages.

```bash
# Build the static site
npm run build

# Preview the built site locally
npm run start
```

## Contributing

Contributions are welcome! To add new components to the catalog:

1. Update the component data in `/src/data/visuals.ts`
2. Create the visual component in `/src/components/visuals/{ComponentName}`
3. Test the component appearance and responsiveness

## License

MIT
