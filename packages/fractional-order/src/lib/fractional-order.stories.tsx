import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import {
  generateKeys,
  placeBefore,
  placeAfter,
  sortItems,
} from './fractional-order'

interface Card {
  id: number
  content: string
  orderIndex: number
}

const FractionalOrderDemo: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(() => {
    const initialKeys = generateKeys(5)
    return initialKeys.map((key, index) => ({
      id: index + 1,
      content: `Card ${index + 1}`,
      orderIndex: key,
    }))
  })

  const moveCard = (id: number, direction: 'up' | 'down') => {
    const cardIndex = cards.findIndex((card) => card.id === id)
    if (cardIndex === -1) return

    const newCards = [...cards]
    const card = newCards[cardIndex]

    if (direction === 'up' && cardIndex > 0) {
      const prevCard = newCards[cardIndex - 1]
      card.orderIndex = placeBefore(prevCard.orderIndex)
    } else if (direction === 'down' && cardIndex < cards.length - 1) {
      const nextCard = newCards[cardIndex + 1]
      card.orderIndex = placeAfter(nextCard.orderIndex)
    }

    setCards(sortItems(newCards, 'orderIndex'))
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
            }}
          >
            <span>{card.content}</span>
            <div>
              <button
                onClick={() => moveCard(card.id, 'up')}
                style={{ marginRight: '5px' }}
              >
                ↑
              </button>
              <button onClick={() => moveCard(card.id, 'down')}>↓</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>JSON Output:</h3>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '5px',
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(cards, null, 2)}
        </pre>
      </div>
    </div>
  )
}

const meta: Meta<typeof FractionalOrderDemo> = {
  title: 'FractionalOrder/Demo',
  component: FractionalOrderDemo,
}

export default meta
type Story = StoryObj<typeof FractionalOrderDemo>

export const Default: Story = {}
