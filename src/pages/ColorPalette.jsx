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
          const isActive = activeColor === color.name

          return (
            <button
              key={color.name}
              className={`color-strip ${isActive ? 'is-tapped' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleStripClick(color.name)}
              aria-label={`${color.label} color strip`}
            >
              {color.dashColor && (
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
                  <span className="hover-scale-item strip-custom-label">
                    {color.label === 'noisia. energy' ? (
                      <>
                        <span className="mobile-stacked-label">
                          <span>noisia.</span>
                          <span>energy</span>
                        </span>
                        <span className="desktop-inline-label">noisia. energy</span>
                      </>
                    ) : (
                      color.label
                    )}
                  </span>
                  <div className="hover-scale-item dash-item">
                    <div
                      className="strip-dash-line"
                      style={{ backgroundColor: color.dashColor }}
                    />
                  </div>
                </div>
              )}
              <div className="strip-hover-overlay" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
