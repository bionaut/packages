import { ChangeEvent } from 'react'

import { AnyEventObject, assign } from 'xstate'

import { AutocompleteContext } from '../autocomplete-types'

/**
 * Updates the focused item id when the user presses the arrow keys
 */
export const onArrow = assign<AutocompleteContext, AnyEventObject>({
  focusedItemId: (c, data) => {
    const items = c.items || []
    const itemsWithoutCategories = items.filter((item) => !item.isGroup)
    const length = itemsWithoutCategories.length

    if (data.event.key === 'ArrowDown') {
      const index = itemsWithoutCategories.findIndex(
        (item) => item.id === c.focusedItemId,
      )
      const nextIndex = index + 1
      const nextItem = itemsWithoutCategories[nextIndex]

      if (nextItem) {
        return nextItem.id
      }

      return itemsWithoutCategories[0].id
    }

    if (data.event.key === 'ArrowUp') {
      const index = itemsWithoutCategories.findIndex(
        (item) => item.id === c.focusedItemId,
      )
      const nextIndex = index - 1
      const nextItem = itemsWithoutCategories[nextIndex]

      if (nextItem) {
        return nextItem.id
      }

      return itemsWithoutCategories[length - 1].id
    }

    return c.focusedItemId
  },
})

export const onReset = assign<AutocompleteContext, AnyEventObject>({
  focusedItemId: undefined,
  searchValue: '',
  items: [],
})

export const onBlur = assign<AutocompleteContext, AnyEventObject>({
  focusedItemId: undefined,
})

export const onInputChange = assign<
  AutocompleteContext,
  ChangeEvent<HTMLInputElement>
>({
  searchValue: (_, event) => event.target.value,
})

export const onUpdateItems = assign<AutocompleteContext, AnyEventObject>({
  items: (_, event) => event.items,
})

export const onInputFocus = assign<AutocompleteContext, AnyEventObject>({
  focusedItemId: (c, data) => data.id,
})
