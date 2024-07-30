import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'

import {
  ModalHubActions,
  ModalHubContextValue,
  ModalHubState,
  UseModalHub,
} from './modal-hub-types'

export const modalHubContext = React.createContext<ModalHubContextValue>(
  [] as any,
)

const Empty: FC = () => {
  return null
}

export const ModalHubProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [state, updateState] = useState<ModalHubState>({})
  const { active } = state

  const renderModal = (modalComponent: ReactElement) => {
    updateState((prevState) => {
      if (prevState.active === modalComponent) {
        return prevState
      }
      return {
        active: modalComponent,
      }
    })
  }

  const removeModal = () => {
    updateState((prevState) => {
      if (prevState.active === undefined) {
        return prevState
      }
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
  const [overrideProps, setOverrideProps] = useState<Partial<typeof props>>({})
  const [isOpen, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(props?.currentStep || 0)
  const [, { removeModal, renderModal }] = useContext(modalHubContext)

  const Component = modal

  const close = useCallback(() => {
    setOpen(false)
    setCurrentStep(0)
    setOverrideProps({})
  }, [])

  useEffect(() => {
    if (isOpen) {
      renderModal(
        <Component
          {...({ ...(props as any), ...overrideProps } as any)}
          onClose={close}
          currentStep={currentStep}
          nextStep={() => setCurrentStep((prev) => prev + 1)}
          prevStep={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
        />,
      )
    } else {
      removeModal()
    }
  }, [Component, close, currentStep, isOpen, overrideProps])

  const open = useCallback(() => {
    setCurrentStep(props?.currentStep || 0)
    setOverrideProps({})
    setOpen(true)
  }, [props?.currentStep])

  const openWithProps = useCallback(
    (overrideProps?: Partial<typeof props>) => {
      setOverrideProps(overrideProps)
      setCurrentStep(overrideProps?.currentStep || props?.currentStep || 0)
      setOpen(true)
    },
    [props?.currentStep],
  )

  return {
    isOpen,
    close,
    open,
    openWithProps,
    currentStep,
  }
}
