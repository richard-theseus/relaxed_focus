// src/components/StoicQuotesBar.jsx
import React, { useEffect, useMemo, useState } from 'react'

const QUOTES = [
  { text: 'The impediment to action advances action.', source: 'Marcus Aurelius' },
  { text: 'You have power over your mind, not outside events.', source: 'Marcus Aurelius' },
  { text: 'Waste no more time arguing what a good man should be. Be one.', source: 'Marcus Aurelius' },
  { text: 'If it is not right, do not do it; if it is not true, do not say it.', source: 'Marcus Aurelius' },
  { text: 'The soul becomes dyed with the color of its thoughts.', source: 'Marcus Aurelius' },
  { text: 'The best revenge is not to be like your enemy.', source: 'Marcus Aurelius' },
  { text: 'He who lives in harmony with himself lives in harmony with the universe.', source: 'Marcus Aurelius' },
  { text: 'Receive without pride, let go without attachment.', source: 'Marcus Aurelius' },

  { text: 'We suffer more often in imagination than in reality.', source: 'Seneca' },
  { text: 'Luck is what happens when preparation meets opportunity.', source: 'Seneca' },
  { text: 'How does it help… to make troubles heavier by bemoaning them?', source: 'Seneca' },
  { text: 'Difficulties strengthen the mind, as labor does the body.', source: 'Seneca' },
  { text: 'Begin at once to live, and count each day as a separate life.', source: 'Seneca' },
  { text: 'It is not the man who has too little, but the man who craves more, who is poor.', source: 'Seneca' },
  { text: 'No man was ever wise by chance.', source: 'Seneca' },

  { text: 'It is not things that disturb us, but our judgments about them.', source: 'Epictetus' },
  { text: 'No great thing is created suddenly.', source: 'Epictetus' },
  { text: 'First say to yourself what you would be; then do what you have to do.', source: 'Epictetus' },
  { text: 'Freedom is the power to live as one wishes.', source: 'Epictetus' },
  { text: 'If you want to improve, be content to be thought foolish and stupid.', source: 'Epictetus' },
  { text: 'Wealth consists not in having great possessions, but in having few wants.', source: 'Epictetus' },
  { text: 'Make the best use of what is in your power.', source: 'Epictetus' },

  { text: 'Man conquers the world by conquering himself.', source: 'Zeno of Citium' },
  { text: 'Fate leads the willing and drags along the reluctant.', source: 'Cleanthes' },
  { text: 'To live happily is an inward power of the soul.', source: 'Marcus Aurelius' },
  { text: 'What we do now echoes in eternity.', source: 'Marcus Aurelius (attributed)' },

  { text: 'The greater the difficulty, the more glory in surmounting it.', source: 'Epicurus' },
  { text: 'No man is free who is not master of himself.', source: 'Epictetus' },
  { text: 'He who fears death will never do anything worthy of a living man.', source: 'Seneca' },
  { text: 'Cease to hope and you will cease to fear.', source: 'Seneca' },
  { text: 'The whole future lies in uncertainty: live immediately.', source: 'Seneca' },

  { text: 'Be tolerant with others and strict with yourself.', source: 'Marcus Aurelius' },
  { text: 'If you are distressed by anything external, the pain is not due to the thing itself.', source: 'Marcus Aurelius' },
  { text: 'Do not explain your philosophy. Embody it.', source: 'Epictetus' },
  { text: 'Control what you can. Endure what you must.', source: 'Stoic maxim' },
  { text: 'Character is fate.', source: 'Heraclitus' },
  { text: 'The willing soul is led by fate, the unwilling is dragged.', source: 'Cleanthes (paraphrase)' },
  { text: 'Keep your will aligned with nature and you will be calm.', source: 'Stoic teaching' },

  { text: 'Be like the rock against which the waves break.', source: 'Marcus Aurelius' },
  { text: 'A gem cannot be polished without friction, nor a man perfected without trials.', source: 'Seneca (paraphrase)' },
  { text: 'What stands in the way becomes the way.', source: 'Stoic maxim' },
  { text: 'Nothing is worth doing pointlessly.', source: 'Marcus Aurelius (paraphrase)' },
  { text: 'Silence is a lesson learned from the many sufferings of life.', source: 'Seneca (paraphrase)' },

  { text: 'The good person is invincible, for they do not engage in any contest where they are not stronger.', source: 'Epictetus (paraphrase)' },
  { text: 'To be even-minded is the greatest virtue.', source: 'Heraclitus (paraphrase)' },
  { text: 'If you seek tranquillity, do less.', source: 'Marcus Aurelius (paraphrase)' },
  { text: 'Align your actions with your values, not your moods.', source: 'Modern stoic maxim' },
  { text: 'The cosmos is change; our life is what our thoughts make it.', source: 'Marcus Aurelius (paraphrase)' },
  { text: 'Every day provides its own gifts.', source: 'Marcus Aurelius (paraphrase)' }
]

export default function StoicQuotesBar(){
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length)
  )

  const quote = useMemo(() => QUOTES[index], [index])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % QUOTES.length)
    }, 60_000) // 1 minute

    return () => clearInterval(id)
  }, [])

  return (
    <div className="stoic-bar">
      <span className="stoic-text">“{quote.text}”</span>
      <span className="stoic-source">— {quote.source}</span>
    </div>
  )
}
