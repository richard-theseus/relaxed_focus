import React, { useEffect, useState } from 'react'
import { BINURAL_PRESETS } from '../presets'

export default function ControlsPanel({ api }){
  const [whiteOn, setWhiteOn] = useState(false)
  const [brownOn, setBrownOn] = useState(false)
  const [binauralOn, setBinauralOn] = useState(false)
  const [preset, setPreset] = useState(BINURAL_PRESETS[0].id)
  const [base, setBase] = useState(BINURAL_PRESETS[0].base)
  const [beat, setBeat] = useState(BINURAL_PRESETS[0].beat)
  const [vol, setVol] = useState(0.6)

  useEffect(()=>{ if(api) api.setMasterVolume(vol) }, [vol, api])

  useEffect(()=>{
    const p = BINURAL_PRESETS.find(x=>x.id===preset)
    if(p){ setBase(p.base); setBeat(p.beat) }
  }, [preset])

  useEffect(()=>{
    if(!api) return
    if(whiteOn) api.startWhite(); else api.stopWhite()
  }, [whiteOn, api])

  useEffect(()=>{
    if(!api) return
    if(brownOn) api.startBrown(); else api.stopBrown()
  }, [brownOn, api])

  useEffect(()=>{
    if(!api) return
    if(binauralOn) api.startBinaural(base, beat); else api.stopBinaural()
  }, [binauralOn, api])

  useEffect(()=>{ if(api && binauralOn) api.updateBinaural(base, beat) }, [base, beat, api, binauralOn])

  return (
    <div className="controls-panel" role="region" aria-label="Audio controls">
      <h3>Sound Layers</h3>
      <div className="row">
        <label><input type="checkbox" checked={whiteOn} onChange={e=>setWhiteOn(e.target.checked)} /> White noise</label>
        <label><input type="checkbox" checked={brownOn} onChange={e=>setBrownOn(e.target.checked)} /> Brown noise</label>
      </div>

      <h3>Binaural Beats</h3>
      <div className="row">
        <label>Preset:
          <select value={preset} onChange={e=>setPreset(e.target.value)}>
            {BINURAL_PRESETS.map(p=> <option value={p.id} key={p.id}>{p.name}</option>)}
          </select>
        </label>
      </div>
      <div className="row">
        <label>Base frequency: {base} Hz
          <input type="range" min="60" max="880" value={base} onChange={e=>setBase(Number(e.target.value))} />
        </label>
      </div>
      <div className="row">
        <label>Beat frequency: {beat} Hz
          <input type="range" min="0.5" max="30" step="0.5" value={beat} onChange={e=>setBeat(Number(e.target.value))} />
        </label>
      </div>
      <div className="row">
        <label><input type="checkbox" checked={binauralOn} onChange={e=>setBinauralOn(e.target.checked)} /> Enable binaural</label>
      </div>

      <h3>Master</h3>
      <div className="row">
        <label>Volume: {Math.round(vol*100)}%
          <input type="range" min="0" max="1" step="0.01" value={vol} onChange={e=>setVol(Number(e.target.value))} />
        </label>
      </div>

      <small className="hint">Tip: For binaural beats, use headphones for the effect.</small>
    </div>
  )
}