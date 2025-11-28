'use client';

import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Trash2 } from 'lucide-react';

interface PropertyPanelProps {
  selectedObject: fabric.Object | null;
  onStrokeColorChange: (color: string) => void;
  onFillColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onOpacityChange: (opacity: number) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function PropertyPanel({
  selectedObject,
  onStrokeColorChange,
  onFillColorChange,
  onStrokeWidthChange,
  onOpacityChange,
  onDelete,
  onClose,
}: PropertyPanelProps) {
  const [showStrokePicker, setShowStrokePicker] = useState(false);
  const [showFillPicker, setShowFillPicker] = useState(false);

  // Get current values from selected object
  const strokeColor = (selectedObject?.stroke as string) || '#C2E3FE';
  const fillColor = (selectedObject?.fill as string) || 'transparent';
  const strokeWidth = selectedObject?.strokeWidth || 2;
  const opacity = (selectedObject?.opacity || 1) * 100;

  // Close panel if no object selected
  if (!selectedObject) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-64">
      <div className="island p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body font-semibold text-text-primary">Properties</h3>
          <button
            onClick={onClose}
            className="btn-icon w-8 h-8"
            aria-label="Close panel"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Stroke Color */}
        <div className="mb-4">
          <label className="text-caption text-text-secondary block mb-2">
            Stroke Color
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setShowStrokePicker(!showStrokePicker);
                setShowFillPicker(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-surface-low border border-border hover:bg-primary/10 transition-colors"
              aria-expanded={showStrokePicker}
            >
              <div
                className="w-5 h-5 rounded border border-text-secondary/50"
                style={{ backgroundColor: strokeColor }}
              />
              <span className="text-caption text-text-primary font-mono">
                {strokeColor}
              </span>
            </button>

            {showStrokePicker && (
              <div className="absolute top-full mt-2 left-0 z-50 island p-3">
                <HexColorPicker color={strokeColor} onChange={onStrokeColorChange} />
                <input
                  type="text"
                  value={strokeColor}
                  onChange={(e) => onStrokeColorChange(e.target.value)}
                  className="input mt-2 font-mono text-caption"
                />
              </div>
            )}
          </div>
        </div>

        {/* Fill Color */}
        <div className="mb-4">
          <label className="text-caption text-text-secondary block mb-2">
            Fill Color
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setShowFillPicker(!showFillPicker);
                setShowStrokePicker(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-surface-low border border-border hover:bg-primary/10 transition-colors"
              aria-expanded={showFillPicker}
            >
              <div
                className="w-5 h-5 rounded border border-text-secondary/50 relative overflow-hidden"
                style={{
                  backgroundColor: fillColor === 'transparent' ? undefined : fillColor,
                }}
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
              <span className="text-caption text-text-primary font-mono">
                {fillColor === 'transparent' ? 'None' : fillColor}
              </span>
            </button>

            {showFillPicker && (
              <div className="absolute top-full mt-2 left-0 z-50 island p-3">
                <HexColorPicker
                  color={fillColor === 'transparent' ? '#ffffff' : fillColor}
                  onChange={onFillColorChange}
                />
                <button
                  onClick={() => onFillColorChange('transparent')}
                  className="btn-secondary w-full mt-2 text-caption"
                >
                  No Fill
                </button>
                <input
                  type="text"
                  value={fillColor}
                  onChange={(e) => onFillColorChange(e.target.value)}
                  className="input mt-2 font-mono text-caption"
                />
              </div>
            )}
          </div>
        </div>

        {/* Stroke Width */}
        <div className="mb-4">
          <label
            htmlFor="prop-stroke-width"
            className="text-caption text-text-secondary block mb-2"
          >
            Stroke Width
          </label>
          <div className="flex items-center gap-3">
            <input
              id="prop-stroke-width"
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-caption text-text-primary w-10 tabular-nums text-right">
              {strokeWidth}px
            </span>
          </div>
        </div>

        {/* Opacity */}
        <div className="mb-4">
          <label
            htmlFor="prop-opacity"
            className="text-caption text-text-secondary block mb-2"
          >
            Opacity
          </label>
          <div className="flex items-center gap-3">
            <input
              id="prop-opacity"
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => onOpacityChange(Number(e.target.value) / 100)}
              className="flex-1"
            />
            <span className="text-caption text-text-primary w-10 tabular-nums text-right">
              {Math.round(opacity)}%
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-error/10 text-error hover:bg-error/20 transition-colors"
        >
          <Trash2 size={16} strokeWidth={2} />
          <span className="text-body font-semibold">Delete</span>
        </button>
      </div>

      {/* Click outside to close pickers */}
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
