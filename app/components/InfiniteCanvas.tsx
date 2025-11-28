'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';

export type Tool = 'select' | 'pen' | 'line' | 'rectangle' | 'circle' | 'triangle' | 'text' | 'image';

export interface InfiniteCanvasHandle {
  deleteSelected: () => void;
}

interface InfiniteCanvasProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  onImageUpload: (file: File) => void;
}

const InfiniteCanvas = forwardRef<InfiniteCanvasHandle, InfiniteCanvasProps>(({
  tool,
  setTool,
  strokeColor,
  fillColor,
  strokeWidth,
  onImageUpload,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingObjectRef = useRef<fabric.Object | null>(null);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);

  // Expose delete method to parent component
  useImperativeHandle(ref, () => ({
    deleteSelected: () => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      const activeObjects = canvas.getActiveObjects();
      if (activeObjects.length > 0) {
        activeObjects.forEach((obj) => {
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    },
  }));

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#121212', // True Black from style guide
      selection: tool === 'select',
    });

    fabricCanvasRef.current = canvas;

    // Load from local storage
    const savedCanvas = localStorage.getItem('infiniteCanvas');
    if (savedCanvas) {
      canvas.loadFromJSON(savedCanvas, () => {
        canvas.renderAll();
      });
    }

    // Handle window resize
    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  // Update canvas settings when tool changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.selection = tool === 'select';
    canvas.isDrawingMode = tool === 'pen';

    if (tool === 'pen' && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = strokeColor;
      canvas.freeDrawingBrush.width = strokeWidth;
    }

    canvas.defaultCursor = tool === 'select' ? 'default' : 'crosshair';
  }, [tool, strokeColor, strokeWidth]);

  // Save to local storage whenever canvas changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const saveCanvas = () => {
      const json = JSON.stringify(canvas.toJSON());
      localStorage.setItem('infiniteCanvas', json);
    };

    canvas.on('object:added', saveCanvas);
    canvas.on('object:modified', saveCanvas);
    canvas.on('object:removed', saveCanvas);

    return () => {
      canvas.off('object:added', saveCanvas);
      canvas.off('object:modified', saveCanvas);
      canvas.off('object:removed', saveCanvas);
    };
  }, []);

  // Handle mouse down for shape drawing
  const handleMouseDown = (e: fabric.IEvent) => {
    if (tool === 'select' || tool === 'pen') return;

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const pointer = canvas.getPointer(e.e as MouseEvent);
    startPointRef.current = { x: pointer.x, y: pointer.y };

    let object: fabric.Object | null = null;

    switch (tool) {
      case 'line':
        object = new fabric.Line(
          [pointer.x, pointer.y, pointer.x, pointer.y],
          {
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            selectable: false,
          }
        );
        break;
      case 'rectangle':
        object = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          selectable: false,
        });
        break;
      case 'circle':
        object = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 0,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          selectable: false,
        });
        break;
      case 'triangle':
        object = new fabric.Triangle({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          selectable: false,
        });
        break;
      case 'text':
        object = new fabric.IText('Double click to edit', {
          left: pointer.x,
          top: pointer.y,
          fill: strokeColor,
          fontSize: 20,
        });
        canvas.add(object);
        canvas.setActiveObject(object);
        setIsDrawing(false);
        // Switch to select mode after creating text to allow editing
        setTool('select');
        return;
    }

    if (object) {
      drawingObjectRef.current = object;
      canvas.add(object);
    }
  };

  // Handle mouse move for shape drawing
  const handleMouseMove = (e: fabric.IEvent) => {
    if (!isDrawing || !drawingObjectRef.current || !startPointRef.current) return;

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const pointer = canvas.getPointer(e.e as MouseEvent);
    const object = drawingObjectRef.current;

    switch (tool) {
      case 'line':
        (object as fabric.Line).set({
          x2: pointer.x,
          y2: pointer.y,
        });
        break;
      case 'rectangle':
        (object as fabric.Rect).set({
          width: Math.abs(pointer.x - startPointRef.current.x),
          height: Math.abs(pointer.y - startPointRef.current.y),
          left: Math.min(pointer.x, startPointRef.current.x),
          top: Math.min(pointer.y, startPointRef.current.y),
        });
        break;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(pointer.x - startPointRef.current.x, 2) +
          Math.pow(pointer.y - startPointRef.current.y, 2)
        ) / 2;
        (object as fabric.Circle).set({
          radius: radius,
          left: startPointRef.current.x,
          top: startPointRef.current.y,
        });
        break;
      case 'triangle':
        (object as fabric.Triangle).set({
          width: Math.abs(pointer.x - startPointRef.current.x),
          height: Math.abs(pointer.y - startPointRef.current.y),
          left: Math.min(pointer.x, startPointRef.current.x),
          top: Math.min(pointer.y, startPointRef.current.y),
        });
        break;
    }

    canvas.renderAll();
  };

  // Handle mouse up for shape drawing
  const handleMouseUp = () => {
    if (drawingObjectRef.current) {
      drawingObjectRef.current.set({ selectable: true });
      drawingObjectRef.current = null;
    }
    setIsDrawing(false);
    startPointRef.current = null;
  };

  // Attach event listeners
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [tool, strokeColor, fillColor, strokeWidth, isDrawing]);

  // Handle image upload
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || tool !== 'image') return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgUrl = event.target?.result as string;
          fabric.Image.fromURL(imgUrl, (img) => {
            img.scale(0.5);
            img.set({
              left: 100,
              top: 100,
            });
            canvas.add(img);
            canvas.renderAll();
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [tool]);

  // Handle keyboard events for delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Don't trigger delete when typing in text objects
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'i-text' && (activeObject as fabric.IText).isEditing) {
        return;
      }

      // Handle Delete and Backspace keys
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0) {
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0"
    />
  );
});

InfiniteCanvas.displayName = 'InfiniteCanvas';

export default InfiniteCanvas;
