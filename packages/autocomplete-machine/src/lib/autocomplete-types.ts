import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'

import { Subject } from 'rxjs'
import { EventObject } from 'xstate'

export interface AutocompleteItem {
  // unique id of the item
  id: string
  value?: string
  // label to be displayed in the dropdown
  label: string
  // image to be displayed on the left of the label
  image?: string
  // if true, the item will be rendered as a separator and not be clickable
  isGroup?: boolean
}

export enum AutocompleteState {
  // the input is not focused
  IDLE = 'IDLE',
  // the input is focused, shortcutComponent is rendered, and the input is empty
  FOCUSED_EMPTY = 'FOCUSED_EMPTY',
  // the input is focused and not empty
  FOCUSED_SEARCHING = 'FOCUSED_SEARCHING',
}

export interface AutocompleteContext {
  events$: Subject<AutocompleteEvent>
  searchValue: string
  focusedItemId?: string
  items?: AutocompleteItem[]
}

export interface AutocompleteFocusItemEvent extends EventObject {
  type: 'focusItem'
  id?: string
}

export interface AutocompleteSubmitItemEvent extends EventObject {
  type: 'submit'
}

export type AutocompleteEvent =
  | KeyboardEvent<HTMLInputElement>
  | ChangeEvent<HTMLInputElement>
  | FocusEvent<HTMLInputElement>
  | AutocompleteFocusItemEvent
  | AutocompleteSubmitItemEvent
