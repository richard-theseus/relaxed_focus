import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { BINURAL_PRESETS } from '../presets'

// This component creates the audio context and exposes a small API via the `ready` prop.
// It does not render visible UI. Controls are in ControlsPanel.

export default function SoundGenerator({ ready }){
  const ctxRef = useRef(null)
  const nodesRef = useRef({})

  useEffect(()=>{
    // create audio context when component mounts but only on user gesture is ideal.
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ctxRef.current = ctx

    nodesRef.current = {
      master: ctx.createGain()
    }
    nodesRef.current.master.gain.value = 0.6
    nodesRef.current.master.connect(ctx.destination)

    // Expose API
    const api = createApi(ctx, nodesRef.current)
    if(ready) ready(api)

    // cleanup
    return () => {
      try{ ctx.close() }catch(e){}
    }
  }, [])

  return null
}

function createApi(ctx, nodes){
  const api = {
    startWhite: () => startWhiteNoise(ctx, nodes),
    stopWhite: () => stopWhiteNoise(nodes),
    startBrown: () => startBrownNoise(ctx, nodes),
    stopBrown: () => stopBrownNoise(nodes),
    startBinaural: (base=220, beat=14) => startBinaural(ctx, nodes, base, beat),
    updateBinaural: (base, beat) => updateBinaural(nodes, base, beat),
    stopBinaural: () => stopBinaural(nodes),
    setMasterVolume: (v) => { nodes.master.gain.value = v }
  }
  return api
}

/* ---------- noise implementations ---------- */
function startWhiteNoise(ctx, nodes){
  if(nodes.white) return
  const bufferSize = 2 * ctx.sampleRate
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for(let i=0;i<bufferSize;i++) data[i] = Math.random() * 2 - 1
  const whiteSource = ctx.createBufferSource()
  whiteSource.buffer = buffer
  whiteSource.loop = true
  const gain = ctx.createGain(); gain.gain.value = 0.2
  whiteSource.connect(gain).connect(nodes.master)
  whiteSource.start()
  nodes.white = { source: whiteSource, gain }
}

function stopWhiteNoise(nodes){ if(nodes.white){ try{ nodes.white.source.stop() }catch(e){} delete nodes.white } }

function startBrownNoise(ctx, nodes){
  if(nodes.brown) return
  const bufferSize = 4096
  const scriptNode = ctx.createScriptProcessor(bufferSize, 1, 1)
  let lastOut = 0.0
  scriptNode.onaudioprocess = function(e){
    const output = e.outputBuffer.getChannelData(0)
    for(let i=0;i<bufferSize;i++){
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + (0.02 * white)) / 1.02
      output[i] = lastOut * 3.5 // gain compensation
    }
  }
  const gain = ctx.createGain(); gain.gain.value = 0.2
  scriptNode.connect(gain).connect(nodes.master)
  nodes.brown = { node: scriptNode, gain }
}

function stopBrownNoise(nodes){ if(nodes.brown){ try{ nodes.brown.node.disconnect() }catch(e){} delete nodes.brown } }

/* ---------- binaural ---------- */
function startBinaural(ctx, nodes, base=220, beat=14){
  stopBinaural(nodes)
  const left = ctx.createOscillator()
  const right = ctx.createOscillator()
  left.type = 'sine'
  right.type = 'sine'
  left.frequency.value = base - beat/2
  right.frequency.value = base + beat/2

  const leftPanner = ctx.createStereoPanner()
  const rightPanner = ctx.createStereoPanner()
  leftPanner.pan.value = -1
  rightPanner.pan.value = 1

  const leftGain = ctx.createGain(); leftGain.gain.value = 0.05
  const rightGain = ctx.createGain(); rightGain.gain.value = 0.05

  left.connect(leftGain).connect(leftPanner).connect(nodes.master)
  right.connect(rightGain).connect(rightPanner).connect(nodes.master)

  left.start(); right.start()
  nodes.binaural = { left, right, leftGain, rightGain, leftPanner, rightPanner }
}

function updateBinaural(nodes, base, beat){
  if(!nodes.binaural) return
  nodes.binaural.left.frequency.setTargetAtTime(base - beat/2, 0, 0.01)
  nodes.binaural.right.frequency.setTargetAtTime(base + beat/2, 0, 0.01)
}

function stopBinaural(nodes){ if(nodes.binaural){ try{ nodes.binaural.left.stop(); nodes.binaural.right.stop() }catch(e){} delete nodes.binaural } }