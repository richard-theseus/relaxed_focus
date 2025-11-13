// src/components/YoutubeOverlay.jsx
import React from 'react'

export default function YoutubeOverlay({ videoId, onClose }){
  if(!videoId) return null

  return (
    <div className="yt-overlay" aria-label="YouTube video overlay">
      <div className="yt-backdrop" onClick={onClose} />
      <div className="yt-frame-wrapper">
        <button className="yt-close" onClick={onClose} aria-label="Close video">
          ×
        </button>
        <div className="yt-frame-inner">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
