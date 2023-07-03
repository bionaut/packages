import type { Meta, StoryObj } from '@storybook/react'
import { ModalHubProvider, useModalHub } from './modal-hub-context'
import type { ModalHubProps } from './modal-hub-types'

const Story: Meta<typeof ModalHubProvider> = {
  title: 'ModalHub',
  component: ModalHubProvider,
}

export default Story
type Story = StoryObj<typeof ModalHubProvider>

export const ModalHubStory: Story = {
  name: 'ModalHub',
  render: () => {
    return (
      <ModalHubProvider>
        <Controls />
      </ModalHubProvider>
    )
  },
}

function Controls() {
  const sampleModal = useModalHub(SampleModal, {
    // this is type-safe
    title: 'Default title',
  })

  return (
    <div>
      <button style={{ display: 'block' }} onClick={sampleModal.open}>
        open()
      </button>
      <button
        style={{ display: 'block' }}
        onClick={() =>
          sampleModal.openWithProps({
            // this is type-safe
            title: 'Overriden title',
          })
        }
      >
        {`openWithProps({ title: 'Overriden title'})`}
      </button>
      <button
        style={{ display: 'block' }}
        disabled={!sampleModal.isOpen}
        onClick={() => sampleModal.close()}
      >
        Close from outside
      </button>
    </div>
  )
}

interface SampleModalProps extends ModalHubProps {
  title: string
}

function SampleModal({ title, onClose }: SampleModalProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid black',
        padding: '1rem',
        backgroundColor: 'white',
      }}
    >
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
