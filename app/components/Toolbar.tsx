'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import type { Tool } from './InfiniteCanvas';
import {
  MousePointer2,
  Pencil,
  Minus,
  Square,
  Circle,
  Triangle,
  Type,
  Image,
  Trash2,
  RotateCcw,
} from 'lucide-react';

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

interface ToolConfig {
  name: Tool;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  shortcut: string;
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

  const tools: ToolConfig[] = [
    { name: 'select', icon: MousePointer2, label: 'Select', shortcut: 'V' },
    { name: 'pen', icon: Pencil, label: 'Pen', shortcut: 'P' },
    { name: 'line', icon: Minus, label: 'Line', shortcut: 'L' },
    { name: 'rectangle', icon: Square, label: 'Rectangle', shortcut: 'R' },
    { name: 'circle', icon: Circle, label: 'Circle', shortcut: 'O' },
    { name: 'triangle', icon: Triangle, label: 'Triangle', shortcut: 'T' },
    { name: 'text', icon: Type, label: 'Text', shortcut: 'X' },
    { name: 'image', icon: Image, label: 'Image', shortcut: 'I' },
  ];

  return (
    <>
      {/* Main floating toolbar - centered at top */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="island flex items-center gap-1 px-3 py-2">
          {/* Tool buttons */}
          <div className="flex items-center gap-1">
            {tools.map((t) => {
              const IconComponent = t.icon;
              const isActive = tool === t.name;

              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setTool(t.name)}
                  className={`tool-btn ${isActive ? 'active' : ''}`}
                  title={`${t.label} (${t.shortcut})`}
                  aria-label={`${t.label} tool`}
                  aria-pressed={isActive}
                >
                  <IconComponent
                    size={20}
                    strokeWidth={2}
                    className={isActive ? 'fill-current' : ''}
                  />
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="separator" aria-hidden="true" />

          {/* Stroke Color */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStrokePicker(!showStrokePicker);
                setShowFillPicker(false);
              }}
              className="tool-btn flex items-center gap-2 w-auto px-2"
              title="Stroke Color"
              aria-label="Stroke color"
              aria-expanded={showStrokePicker}
            >
              <div
                className="w-5 h-5 rounded border-2 border-text-secondary/50"
                style={{ backgroundColor: strokeColor }}
                aria-hidden="true"
              />
              <span className="text-caption text-text-secondary hidden sm:inline">Stroke</span>
            </button>

            {showStrokePicker && (
              <div
                className="absolute top-full mt-2 left-0 z-50 island p-3"
                role="dialog"
                aria-label="Stroke color picker"
              >
                <HexColorPicker color={strokeColor} onChange={setStrokeColor} />
                <input
                  type="text"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="input mt-2 font-mono text-caption"
                  aria-label="Stroke color hex value"
                />
              </div>
            )}
          </div>

          {/* Fill Color */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowFillPicker(!showFillPicker);
                setShowStrokePicker(false);
              }}
              className="tool-btn flex items-center gap-2 w-auto px-2"
              title="Fill Color"
              aria-label="Fill color"
              aria-expanded={showFillPicker}
            >
              <div
                className="w-5 h-5 rounded border-2 border-text-secondary/50 relative overflow-hidden"
                style={{
                  backgroundColor: fillColor === 'transparent' ? undefined : fillColor,
                }}
                aria-hidden="true"
              >
                {fillColor === 'transparent' && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(45deg, #666 25%, transparent 25%, transparent 75%, #666 75%), linear-gradient(45deg, #666 25%, transparent 25%, transparent 75%, #666 75%)',
                      backgroundSize: '6px 6px',
                      backgroundPosition: '0 0, 3px 3px',
                    }}
                  />
                )}
              </div>
              <span className="text-caption text-text-secondary hidden sm:inline">Fill</span>
            </button>

            {showFillPicker && (
              <div
                className="absolute top-full mt-2 left-0 z-50 island p-3"
                role="dialog"
                aria-label="Fill color picker"
              >
                <HexColorPicker
                  color={fillColor === 'transparent' ? '#ffffff' : fillColor}
                  onChange={setFillColor}
                />
                <button
                  type="button"
                  onClick={() => setFillColor('transparent')}
                  className="btn-secondary w-full mt-2 text-caption"
                >
                  No Fill
                </button>
                <input
                  type="text"
                  value={fillColor}
                  onChange={(e) => setFillColor(e.target.value)}
                  className="input mt-2 font-mono text-caption"
                  aria-label="Fill color hex value"
                />
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="separator" aria-hidden="true" />

          {/* Stroke Width */}
          <div className="flex items-center gap-2 px-2">
            <label
              htmlFor="stroke-width"
              className="text-caption text-text-secondary hidden sm:inline"
            >
              Width
            </label>
            <input
              id="stroke-width"
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-20"
              aria-label="Stroke width"
            />
            <span className="text-caption text-text-primary w-8 tabular-nums">
              {strokeWidth}px
            </span>
          </div>

          {/* Separator */}
          <div className="separator" aria-hidden="true" />

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onDelete}
              className="btn-icon danger"
              title="Delete Selected (Del)"
              aria-label="Delete selected objects"
            >
              <Trash2 size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={onClear}
              className="btn-icon danger"
              title="Clear Canvas"
              aria-label="Clear entire canvas"
            >
              <RotateCcw size={20} strokeWidth={2} />
            </button>
          </div>
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
          aria-hidden="true"
        />
      )}
    </>
  );
}
