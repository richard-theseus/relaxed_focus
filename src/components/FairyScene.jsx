import React from 'react'
import { motion } from 'framer-motion'
import './fairy-scene.css'

// Note: Put your source image(s) into src/assets/ as separate files.
// For this example we reference placeholders; replace with the actual files.

const sprites = [
  { id: 'fairy1', src: '/src/assets/fairy-pair.png', size: 120 },
  { id: 'fairy2', src: '/src/assets/fairy-single.png', size: 100 },
  { id: 'pegasus', src: '/src/assets/pegasus.png', size: 160 },
  { id: 'wizard', src: '/src/assets/wizard.png', size: 160 }
]

export default function FairyScene(){
  return (
    <div className="fairy-scene-root">
      <div className="background-layer" />

      {sprites.map((s, i) => (
        <FloatingSprite key={s.id} sprite={s} index={i} />
      ))}
    </div>
  )
}

function FloatingSprite({ sprite, index }){
  const delay = index * 1.6
  return (
    <motion.img
      src={sprite.src}
      alt={sprite.id}
      className="sprite"
      style={{ width: sprite.size }}
      initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -40 : 40 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, 0, -10, -30],
        x: [index % 2 === 0 ? -40 : 40, index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 5 : -5, index % 2 === 0 ? -20 : 20]
      }}
      transition={{
        delay,
        duration: 10 + index * 4,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
      whileHover={{ scale: 1.05 }}
    />
  )
}