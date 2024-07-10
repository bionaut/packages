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

type OptimizedProps<T extends ModalHubProps> = Omit<
  T,
  'currentStep' | 'nextStep' | 'prevStep' | 'onClose'
> & { currentStep?: number }

export interface UseModalHubResult<TModalProps> {
  open: () => void
  openWithProps: (props?: Partial<TModalProps>) => void
  close: () => void
  isOpen: boolean
}

export interface UseModalHub {
  <TModalProps extends ModalHubProps>(
    modal: UseModalHubComponent<TModalProps>,
    props?: OptimizedProps<TModalProps>,
  ): UseModalHubResult<OptimizedProps<TModalProps>>
}

export type ModalHubContextValue = readonly [ModalHubState, ModalHubActions]
