# Infinite Canvas App

A powerful infinite canvas application built with Next.js and Fabric.js that allows you to draw, create shapes, add text, upload images, and unleash your creativity.

## Features

- **Drawing Tools**
  - Freehand pen drawing
  - Line tool
  - Rectangle, Circle, and Triangle shapes
  - Text editing (double-click to edit)
  - Image upload and placement

- **Customization**
  - Color picker for stroke and fill colors
  - Adjustable stroke width (1-20px)
  - Real-time color preview

- **Canvas Controls**
  - Select and move objects
  - Resize and rotate objects
  - Delete selected objects
  - Clear entire canvas
  - Infinite canvas with pan and zoom

- **Persistence**
  - Auto-save to browser local storage
  - Your work is preserved between sessions

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Tools

- **Select (↖)**: Click to select and manipulate objects
- **Pen (✏️)**: Freehand drawing
- **Line (/)**: Draw straight lines
- **Rectangle (▭)**: Draw rectangles
- **Circle (○)**: Draw circles
- **Triangle (△)**: Draw triangles
- **Text (T)**: Add editable text
- **Image (🖼)**: Upload and place images

### Color Controls

- **Stroke Color**: Sets the outline/drawing color
- **Fill Color**: Sets the fill color for shapes
- **Width Slider**: Adjusts stroke thickness

### Keyboard Shortcuts

- **Delete/Backspace**: Delete selected objects
- **Double-click**: Edit text objects

### Actions

- **Delete**: Remove selected object
- **Clear All**: Remove everything from canvas (with confirmation)

## Technologies Used

- **Next.js 15** - React framework
- **Fabric.js 6** - Canvas manipulation library
- **React Colorful** - Color picker component
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Local Storage** - Data persistence

## Project Structure

```
canvasapp/
├── app/
│   ├── components/
│   │   ├── InfiniteCanvas.tsx  # Main canvas component
│   │   └── Toolbar.tsx         # Tool controls
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Future Enhancements

- Undo/Redo functionality
- Export canvas as PNG/SVG
- Layer management
- More shape tools (polygon, star, etc.)
- Collaborative editing
- Canvas templates
- Zoom controls UI

## License

MIT
