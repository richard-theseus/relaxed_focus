import React, { useState } from 'react'
import FairyScene from './components/FairyScene'
import SoundGenerator from './components/SoundGenerator'
import ControlsPanel from './components/ControlsPanel'

export default function App(){
  const [audioApi, setAudioApi] = useState(null)
  const [panelOpen, setPanelOpen] = useState(true)

  return (
    <div className="app-root">
      <FairyScene />

      <div className={`controls-container ${panelOpen ? 'open' : 'closed'}`}>
        <button className="toggle-panel" onClick={() => setPanelOpen(p => !p)}>
          {panelOpen ? 'Hide Controls' : 'Show Controls'}
        </button>
        {panelOpen && (
          <ControlsPanel api={audioApi} />
        )}
      </div>

      <SoundGenerator ready={(api) => setAudioApi(api)} />
    </div>
  )
}