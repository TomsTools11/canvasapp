'use client';

import { useState, useEffect, useCallback } from 'react';
import InfiniteCanvas, { type Tool } from './components/InfiniteCanvas';
import Toolbar from './components/Toolbar';

export default function Home() {
  const [tool, setTool] = useState<Tool>('select');
  const [strokeColor, setStrokeColor] = useState('#C2E3FE'); // Ice Blue from style guide
  const [fillColor, setFillColor] = useState('transparent');
  const [strokeWidth, setStrokeWidth] = useState(2);

  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear the entire canvas?')) {
      localStorage.removeItem('infiniteCanvas');
      window.location.reload();
    }
  }, []);

  const handleDelete = useCallback(() => {
    // Dispatch delete event for Fabric.js to handle
    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    document.dispatchEvent(event);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Tool shortcuts (single keys without modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'v':
            setTool('select');
            break;
          case 'p':
            setTool('pen');
            break;
          case 'l':
            setTool('line');
            break;
          case 'r':
            setTool('rectangle');
            break;
          case 'o':
            setTool('circle');
            break;
          case 't':
            setTool('triangle');
            break;
          case 'x':
            setTool('text');
            break;
          case 'i':
            setTool('image');
            break;
          case 'escape':
            setTool('select');
            break;
        }
      }

      // Modifier key shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              // Redo - TODO: implement
              console.log('Redo');
            } else {
              // Undo - TODO: implement
              console.log('Undo');
            }
            break;
          case 'c':
            // Copy - handled by Fabric.js
            break;
          case 'v':
            // Paste - handled by Fabric.js
            break;
          case 'a':
            e.preventDefault();
            // Select all - TODO: implement
            console.log('Select all');
            break;
          case 'd':
            e.preventDefault();
            // Duplicate - TODO: implement
            console.log('Duplicate');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="w-full h-screen overflow-hidden bg-surface-canvas">
      <Toolbar
        tool={tool}
        setTool={setTool}
        strokeColor={strokeColor}
        setStrokeColor={setStrokeColor}
        fillColor={fillColor}
        setFillColor={setFillColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      {/* Canvas takes full viewport - toolbar floats above */}
      <InfiniteCanvas
        tool={tool}
        strokeColor={strokeColor}
        fillColor={fillColor}
        strokeWidth={strokeWidth}
        onImageUpload={(file) => console.log('Image uploaded:', file)}
      />
    </main>
  );
}
