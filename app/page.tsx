'use client';

import { useState, useEffect } from 'react';
import InfiniteCanvas, { type Tool } from './components/InfiniteCanvas';
import Toolbar from './components/Toolbar';

export default function Home() {
  const [tool, setTool] = useState<Tool>('select');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('transparent');
  const [strokeWidth, setStrokeWidth] = useState(2);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the entire canvas?')) {
      localStorage.removeItem('infiniteCanvas');
      window.location.reload();
    }
  };

  const handleDelete = () => {
    // This will be handled by Fabric.js delete key
    const event = new KeyboardEvent('keydown', { key: 'Delete' });
    document.dispatchEvent(event);
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete key to remove selected objects
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Handled by Fabric.js internally
      }
      // Ctrl/Cmd + Z for undo (future enhancement)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        // TODO: Implement undo
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="w-full h-screen overflow-hidden">
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
      <div className="pt-16 w-full h-full">
        <InfiniteCanvas
          tool={tool}
          strokeColor={strokeColor}
          fillColor={fillColor}
          strokeWidth={strokeWidth}
          onImageUpload={(file) => console.log('Image uploaded:', file)}
        />
      </div>
    </main>
  );
}
