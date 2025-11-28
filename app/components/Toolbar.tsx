'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { Tool } from './InfiniteCanvas';

interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  fillColor: string;
  setFillColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  onClear: () => void;
  onDelete: () => void;
}

export default function Toolbar({
  tool,
  setTool,
  strokeColor,
  setStrokeColor,
  fillColor,
  setFillColor,
  strokeWidth,
  setStrokeWidth,
  onClear,
  onDelete,
}: ToolbarProps) {
  const [showStrokePicker, setShowStrokePicker] = useState(false);
  const [showFillPicker, setShowFillPicker] = useState(false);

  const tools: { name: Tool; icon: string; label: string }[] = [
    { name: 'select', icon: '↖', label: 'Select' },
    { name: 'pen', icon: '✏️', label: 'Pen' },
    { name: 'line', icon: '/', label: 'Line' },
    { name: 'rectangle', icon: '▭', label: 'Rectangle' },
    { name: 'circle', icon: '○', label: 'Circle' },
    { name: 'triangle', icon: '△', label: 'Triangle' },
    { name: 'text', icon: 'T', label: 'Text' },
    { name: 'image', icon: '🖼', label: 'Image' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
      <div className="flex items-center gap-2 p-3">
        {/* Tools */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          {tools.map((t) => (
            <button
              key={t.name}
              onClick={() => setTool(t.name)}
              className={`px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                tool === t.name ? 'bg-blue-100 text-blue-600' : 'bg-white'
              }`}
              title={t.label}
            >
              <span className="text-lg">{t.icon}</span>
            </button>
          ))}
        </div>

        {/* Stroke Color */}
        <div className="relative">
          <button
            onClick={() => {
              setShowStrokePicker(!showStrokePicker);
              setShowFillPicker(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            title="Stroke Color"
          >
            <div
              className="w-6 h-6 rounded border-2 border-gray-300"
              style={{ backgroundColor: strokeColor }}
            />
            <span className="text-sm">Stroke</span>
          </button>
          {showStrokePicker && (
            <div className="absolute top-full mt-2 left-0 z-50 bg-white p-3 rounded-lg shadow-xl border border-gray-200">
              <HexColorPicker color={strokeColor} onChange={setStrokeColor} />
              <input
                type="text"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          )}
        </div>

        {/* Fill Color */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFillPicker(!showFillPicker);
              setShowStrokePicker(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            title="Fill Color"
          >
            <div
              className="w-6 h-6 rounded border-2 border-gray-300"
              style={{ backgroundColor: fillColor }}
            />
            <span className="text-sm">Fill</span>
          </button>
          {showFillPicker && (
            <div className="absolute top-full mt-2 left-0 z-50 bg-white p-3 rounded-lg shadow-xl border border-gray-200">
              <HexColorPicker color={fillColor} onChange={setFillColor} />
              <input
                type="text"
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          )}
        </div>

        {/* Stroke Width */}
        <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
          <label className="text-sm text-gray-600">Width:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm w-8">{strokeWidth}px</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Delete Selected"
          >
            Delete
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            title="Clear Canvas"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Click outside to close color pickers */}
      {(showStrokePicker || showFillPicker) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStrokePicker(false);
            setShowFillPicker(false);
          }}
        />
      )}
    </div>
  );
}
