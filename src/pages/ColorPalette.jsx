import { useState } from 'react'
import { colors } from '../data/colors'
import './ColorPalette.css'

export default function ColorPalette() {
  const [activeColor, setActiveColor] = useState(null)

  const handleStripClick = (colorName) => {
    setActiveColor(colorName)
    setTimeout(() => {
      setActiveColor((current) => (current === colorName ? null : current))
    }, 400)
  }

  return (
    <div className="palette-wrapper">
      <div className="palette-container">
        {colors.map((color) => {
          const hasText = Boolean(color.dashColor)
          const isActive = activeColor === color.name
          const isNoisiaEnergy = color.label === 'noisia. energy'

          return (
            <button
              key={color.name}
              className={`color-strip ${hasText ? 'has-text' : 'no-text'} ${isActive ? 'is-tapped' : ''}`}
              style={{
                backgroundColor: color.hex,
                '--strip-color': color.hex,
              }}
              onClick={() => {
                if (hasText) {
                  handleStripClick(color.name)
                }
              }}
              aria-label={`${color.label} color strip`}
            >
              {hasText && (
                <div
                  className="dash-link-container"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStripClick(color.name)
                    if (color.externalLink) {
                      window.open(color.externalLink, '_blank')
                    }
                  }}
                >
                  <span className={`hover-scale-item strip-custom-label ${isNoisiaEnergy ? 'label-noisia-energy' : ''}`}>
                    {color.label}
                  </span>
                  <div className="hover-scale-item dash-item">
                    <div
                      className="strip-dash-line"
                      style={{ backgroundColor: color.dashColor }}
                    />
                  </div>
                </div>
              )}
              {hasText && <div className="strip-hover-overlay" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
