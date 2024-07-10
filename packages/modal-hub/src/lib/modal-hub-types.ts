import { FC, ReactElement } from 'react'

export type UseModalHubComponent<TModalProps extends ModalHubProps> =
  FC<TModalProps>

export interface ModalHubProps {
  onClose: () => void
  currentStep?: number
}

export interface MultiStepModalProps extends ModalHubProps {
  currentStep: number
  nextStep: () => void
  prevStep: () => void
}

export interface ModalHubState {
  active?: ReactElement
}

export interface ModalHubActions {
  renderModal: (component: ReactElement) => void
  removeModal: () => void
}

export interface UseModalHubResult<TModalProps> {
  open: () => void
  openWithProps: (props?: Partial<TModalProps>) => void
  close: () => void
  isOpen: boolean
}

export interface UseModalHub {
  <TModalProps extends MultiStepModalProps>(
    modal: UseModalHubComponent<TModalProps>,
    props?: Omit<TModalProps, 'onClose' | 'prevStep' | 'nextStep'>,
  ): UseModalHubResult<TModalProps>
}

export type ModalHubContextValue = readonly [ModalHubState, ModalHubActions]


