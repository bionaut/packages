import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ViewportTrap } from './viewport-trap'
import { useEffect } from 'react'

const Story: Meta<typeof ViewportTrap> = {
  title: 'ViewportTrap',
  component: ViewportTrap,
}

export default Story
type Story = StoryObj<typeof ViewportTrap>

export const ViewportTrapStory: Story = {
  name: 'ViewportTrap',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = React.useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setTimeout(() => {
        setIsOpen(true)
      }, 2000)
    }, [])

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200vw',
          height: '200vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 300,
            height: 300,
            border: '2px dashed gray',
            display: 'flex',
            padding: 20,
          }}
        >
          {isOpen && (
            /* main positional wrapper - e.g. dropdown menu wrapper that is invisible  */
            /* think of this wrapper as the ideal place for your element */
            /* can be relative */
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
              }}
            >
              {/*  dropdown menu that is allowed to correct its position dynamically */}
              <ViewportTrap>
                <div
                  style={{
                    width: 300,
                    height: 300,
                    border: '2px solid black',
                    background: 'rgba(255,255,255,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <button style={{
                    padding: 20,
                  }} onClick={() => alert('Yay!')}>
                    I'm always clickable
                  </button>
                </div>
              </ViewportTrap>
            </div>
          )}
        </div>
      </div>
    )
  },
}
