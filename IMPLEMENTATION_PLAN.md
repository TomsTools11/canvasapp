# Infinite Canvas App - Implementation Plan

## Project Overview
Build a feature-rich infinite canvas application using Next.js 14+, Fabric.js, and LocalStorage for persistence.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Canvas Library**: Fabric.js 5.3.0
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Color Picker**: React-Colorful
- **Icons**: Lucide React
- **Storage**: LocalStorage with auto-save

## Features
- ✏️ Freehand drawing with pen tool
- 🔷 Geometric shapes (rectangle, circle, ellipse, triangle)
- ➡️ Lines and arrows
- 🔤 Text editing
- 🖼️ Image upload and placement
- 🎨 Color picker for stroke and fill
- 🧹 Eraser tool
- ↩️ Undo/Redo functionality
- 💾 Auto-save to LocalStorage
- 📥 Export to PNG and JSON
- 📤 Import from JSON
- 🔄 Object selection, move, resize, rotate
- 📚 Layer management (bring to front/back)
- ⌨️ Keyboard shortcuts
- ∞ Infinite pan and zoom

---

## Implementation Phases

### Phase 0: Project Setup
**Duration**: 30 minutes

#### Step 1: Initialize Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

#### Step 2: Install Dependencies
```bash
npm install fabric@5.3.0 @types/fabric zustand react-colorful lucide-react clsx tailwind-merge
```

---

### Phase 1: Foundation (Day 1-2)
**Goal**: Set up project structure, type definitions, and state management

**Files to Create**:
1. `lib/utils/cn.ts` - Tailwind class merger utility
2. `types/canvas.types.ts` - TypeScript type definitions
3. `store/toolStore.ts` - Tool selection state
4. `store/historyStore.ts` - Undo/redo state
5. `store/canvasStore.ts` - Canvas instance state

**Key Deliverables**:
- ✅ Central type system for tools and canvas state
- ✅ Zustand stores for state management
- ✅ Utility functions set up

---

### Phase 2: Canvas Core (Day 2-3)
**Goal**: Initialize Fabric.js canvas with infinite pan/zoom

**Files to Create**:
1. `lib/canvas/fabricConfig.ts` - Fabric.js initialization
2. `lib/canvas/canvasHelpers.ts` - Pan/zoom utilities
3. `components/canvas/CanvasProvider.tsx` - Context provider
4. `components/canvas/InfiniteCanvas.tsx` - Main canvas component

**Key Features**:
- ✅ Canvas initialization with proper defaults
- ✅ Mouse wheel zoom
- ✅ Middle-mouse or Shift+click pan
- ✅ Viewport transformation
- ✅ Window resize handling

---

### Phase 3: Drawing Tools (Day 3-4)
**Goal**: Implement all drawing and shape tools

**Files to Create**:
1. `lib/canvas/drawingTools.ts` - Freehand, eraser, lines, arrows
2. `lib/canvas/shapeTools.ts` - Geometric shapes
3. `lib/canvas/textTools.ts` - Text creation/editing
4. `lib/canvas/imageTools.ts` - Image upload/placement

**Key Features**:
- ✅ Freehand drawing with PencilBrush
- ✅ Eraser tool
- ✅ Line and arrow creation
- ✅ Rectangle, circle, ellipse, triangle
- ✅ Editable text boxes
- ✅ Image upload with drag-and-drop

---

### Phase 4: Transform & Layers (Day 4-5)
**Goal**: Object manipulation and layer management

**Files to Create**:
1. `lib/canvas/transformTools.ts` - Selection, move, resize, rotate, layers

**Key Features**:
- ✅ Object selection (single and multi)
- ✅ Move, resize, rotate objects
- ✅ Delete and duplicate
- ✅ Bring to front/back
- ✅ Bring forward/send backward
- ✅ Group/ungroup objects

---

### Phase 5: Export & Persistence (Day 5)
**Goal**: Save/load canvas and export functionality

**Files to Create**:
1. `lib/canvas/exportTools.ts` - PNG and JSON export/import
2. `lib/storage/localStorage.ts` - LocalStorage wrapper
3. `lib/storage/autosave.ts` - Auto-save functionality

**Key Features**:
- ✅ Export canvas as PNG (high resolution)
- ✅ Export canvas as JSON
- ✅ Import from JSON file
- ✅ Auto-save every 30 seconds
- ✅ Restore from LocalStorage on load

---

### Phase 6: Hooks (Day 5-6)
**Goal**: Create reusable hooks for canvas operations

**Files to Create**:
1. `hooks/useCanvas.ts` - Canvas instance hook
2. `hooks/useTools.ts` - Tool management
3. `hooks/useHistory.ts` - Undo/redo
4. `hooks/useLocalStorage.ts` - Persistence
5. `hooks/useKeyboardShortcuts.ts` - Keyboard shortcuts

**Keyboard Shortcuts**:
- `V` - Select tool
- `H` - Pan tool
- `P` - Pen/draw tool
- `E` - Eraser
- `R` - Rectangle
- `C` - Circle
- `L` - Line
- `T` - Text
- `Ctrl+Z` - Undo
- `Ctrl+Y` / `Ctrl+Shift+Z` - Redo
- `Delete` / `Backspace` - Delete selected
- `Ctrl+D` - Duplicate

---

### Phase 7: UI Components (Day 6-7)
**Goal**: Build toolbar and UI components

**Files to Create**:
1. `components/ui/Button.tsx` - Reusable button
2. `components/ui/Dropdown.tsx` - Dropdown menu
3. `components/toolbar/ToolButton.tsx` - Tool button
4. `components/toolbar/ColorPicker.tsx` - Color picker with presets
5. `components/toolbar/Toolbar.tsx` - Main toolbar

**UI Features**:
- ✅ Top toolbar with all tools
- ✅ Active tool highlighting
- ✅ Color pickers for stroke and fill
- ✅ Export dropdown menu
- ✅ Layer controls
- ✅ Undo/redo buttons

---

### Phase 8: Integration (Day 7)
**Goal**: Bring everything together in the main app

**Files to Create/Modify**:
1. `app/globals.css` - Global styles
2. `app/layout.tsx` - Root layout
3. `app/page.tsx` - Main page
4. `next.config.js` - Next.js config

**Final Integration**:
- ✅ Canvas renders full screen
- ✅ Toolbar fixed at top
- ✅ All hooks connected
- ✅ Auto-restore from LocalStorage
- ✅ Keyboard shortcuts active

---

## File Structure

```
canvasapp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── canvas/
│   │   ├── InfiniteCanvas.tsx
│   │   ├── CanvasWrapper.tsx
│   │   └── CanvasProvider.tsx
│   ├── toolbar/
│   │   ├── Toolbar.tsx
│   │   ├── ToolButton.tsx
│   │   ├── ColorPicker.tsx
│   │   └── ExportMenu.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Dropdown.tsx
│       └── Separator.tsx
│
├── lib/
│   ├── canvas/
│   │   ├── fabricConfig.ts
│   │   ├── canvasHelpers.ts
│   │   ├── drawingTools.ts
│   │   ├── shapeTools.ts
│   │   ├── textTools.ts
│   │   ├── imageTools.ts
│   │   ├── transformTools.ts
│   │   └── exportTools.ts
│   ├── storage/
│   │   ├── localStorage.ts
│   │   └── autosave.ts
│   └── utils/
│       ├── cn.ts
│       └── types.ts
│
├── store/
│   ├── canvasStore.ts
│   ├── toolStore.ts
│   └── historyStore.ts
│
├── hooks/
│   ├── useCanvas.ts
│   ├── useTools.ts
│   ├── useHistory.ts
│   ├── useLocalStorage.ts
│   └── useKeyboardShortcuts.ts
│
├── types/
│   └── canvas.types.ts
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## Testing Checklist

### Core Functionality
- [ ] Canvas initializes and renders
- [ ] Pan with middle mouse / Shift+click works
- [ ] Zoom with mouse wheel works
- [ ] All drawing tools work correctly
- [ ] All shape tools create proper shapes
- [ ] Text tool creates editable text
- [ ] Image upload works
- [ ] Eraser removes objects

### Transform & Selection
- [ ] Objects can be selected
- [ ] Objects can be moved
- [ ] Objects can be resized
- [ ] Objects can be rotated
- [ ] Multi-select works
- [ ] Delete removes selected objects
- [ ] Duplicate creates copies

### Layer Management
- [ ] Bring to front works
- [ ] Send to back works
- [ ] Bring forward works
- [ ] Send backward works

### History
- [ ] Undo works for all operations
- [ ] Redo works correctly
- [ ] History limit is respected (50 states)

### Persistence
- [ ] Auto-save runs every 30 seconds
- [ ] Canvas saves to LocalStorage
- [ ] Canvas restores on page refresh
- [ ] Export to PNG works (high resolution)
- [ ] Export to JSON works
- [ ] Import from JSON works

### Keyboard Shortcuts
- [ ] Tool shortcuts work (V, H, P, E, R, C, L, T)
- [ ] Ctrl+Z undoes
- [ ] Ctrl+Y redoes
- [ ] Delete key works
- [ ] Ctrl+D duplicates

### UI
- [ ] Toolbar displays correctly
- [ ] Color pickers work
- [ ] Active tool highlights
- [ ] Dropdowns open/close properly
- [ ] Buttons are responsive

---

## Critical Files Priority

**Start with these 5 files first**:

1. **`components/canvas/InfiniteCanvas.tsx`** - Core canvas component
2. **`store/toolStore.ts`** - Tool state management
3. **`lib/canvas/fabricConfig.ts`** - Fabric.js setup
4. **`hooks/useHistory.ts`** - Undo/redo system
5. **`components/toolbar/Toolbar.tsx`** - Main UI

---

## Future Enhancements

### Advanced Features
- Real-time collaboration with WebSockets
- SVG export
- PDF export
- Custom brushes and patterns
- Gradient fills
- Path editing
- Snap to grid
- Rulers and guides
- Dark mode
- Layer panel
- Properties panel
- Touch/mobile support

### Performance
- Canvas virtualization for massive canvases
- Object pooling
- Lazy loading off-screen objects
- Canvas caching

---

## Common Issues & Solutions

**Issue**: Fabric.js type errors
**Solution**: Ensure `@types/fabric` is installed

**Issue**: Canvas not rendering
**Solution**: Use `'use client'` directive for client-side only

**Issue**: Pan/Zoom conflicts
**Solution**: Manage viewport transform matrix carefully

**Issue**: LocalStorage quota exceeded
**Solution**: Compress data or limit history size

**Issue**: Performance with many objects
**Solution**: Enable object caching, limit render frequency

---

## Getting Started

```bash
# 1. Initialize project
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# 2. Install dependencies
npm install fabric@5.3.0 @types/fabric zustand react-colorful lucide-react clsx tailwind-merge

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

---

**Plan Created**: 2025-11-28
**Estimated Timeline**: 7-10 days for full implementation
**Tech Stack**: Next.js 14+ • Fabric.js • Zustand • Tailwind CSS
