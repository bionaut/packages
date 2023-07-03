import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react'

import {
  ModalHubActions,
  ModalHubContextValue,
  ModalHubState,
  UseModalHub,
} from './modal-hub-types'

export const modalHubContext = React.createContext<ModalHubContextValue>([] as any)

const Empty: FC = () => {
  return null
}

export const ModalHubProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [state, updateState] = useState<ModalHubState>({})
  const { active } = state

  const renderModal = (modalComponent: ReactElement) => {
    updateState(() => {
      return {
        active: modalComponent,
      }
    })
  }

  const removeModal = () => {
    updateState(() => {
      return {
        active: undefined,
      }
    })
  }

  const actions: ModalHubActions = {
    renderModal,
    removeModal,
  }

  const component = active || <Empty />

  return (
    <modalHubContext.Provider value={[state, actions]}>
      <>
        {children}
        {component}
      </>
    </modalHubContext.Provider>
  )
}

export const useModalHub: UseModalHub = (modal, props) => {
  const [isOpen, setOpen] = useState(false)
  const [, { removeModal, renderModal }] = useContext(modalHubContext)

  const Component = modal

  const close = useCallback(() => {
    setOpen(false)
    removeModal()
  }, [removeModal])

  const open = useCallback(() => {
    setOpen(true)
    renderModal(<Component {...(props || ({} as any))} onClose={close} />)
  }, [Component, close, props, renderModal])

  const openWithProps = useCallback(
    (overrideProps?: Partial<typeof props>) => {
      setOpen(true)
      renderModal(<Component {...({ ...props, ...overrideProps } as any)} onClose={close} />)
    },
    [Component, close, props, renderModal],
  )

  return {
    isOpen,
    close,
    open,
    openWithProps,
  }
}
