import { Subject } from 'rxjs'
import { createMachine } from 'xstate'

import {
  AutocompleteContext,
  AutocompleteEvent,
  AutocompleteState,
} from '../autocomplete-types'

import {
  onArrow,
  onBlur,
  onInputChange,
  onInputFocus,
  onReset,
  onUpdateItems,
} from './autocomplete-actions'
import {
  arrowEvents,
  debouncedChange,
  enterEvent,
  escapeEvent,
} from './streams'

export const autocompleteMachine = createMachine<AutocompleteContext>({
  id: 'autocomplete',
  predictableActionArguments: true,
  context: {
    events$: new Subject<AutocompleteEvent>(),
    searchValue: '',
    focusedItemId: undefined,
  },
  invoke: [
    { src: debouncedChange },
    { src: arrowEvents },
    { src: escapeEvent },
    { src: enterEvent },
    { src: (context) => context.events$ },
  ],
  initial: AutocompleteState.IDLE,
  on: {
    reset: [
      {
        target: AutocompleteState.IDLE,
        actions: [
          onReset, // internal onReset handler
          'onReset', // external onReset handler
        ],
      },
    ],
    focus: [
      {
        cond: (_, event) => event.target.value === '',
        target: AutocompleteState.FOCUSED_EMPTY,
      },
      {
        target: AutocompleteState.FOCUSED_SEARCHING,
      },
    ],
    blur: { target: AutocompleteState.IDLE, actions: [onBlur] },
    change: { actions: [onInputChange] },
    arrow: { actions: [onArrow] },
    updateItems: { actions: [onUpdateItems] },
    focusItem: { actions: [onInputFocus] },
    // external event handlers
    debouncedChange: {
      target: AutocompleteState.FOCUSED_SEARCHING,
      actions: ['onChange'],
    },
    submit: {
      actions: ['onSubmit'],
    },
  },
  states: {
    [AutocompleteState.IDLE]: {},
    [AutocompleteState.FOCUSED_EMPTY]: {},
    [AutocompleteState.FOCUSED_SEARCHING]: {},
  },
})
