import { KeyboardEvent } from 'react'

import { debounceTime, filter, map } from 'rxjs'
import { AnyEventObject, InvokeCreator } from 'xstate'

import { AutocompleteContext } from '../autocomplete-types'

/**
 * Transforms change events into debouncedChange events
 */
export const debouncedChange: InvokeCreator<
  AutocompleteContext,
  AnyEventObject
> = (context) =>
  context.events$.pipe(
    filter((event) => event.type === 'change'),
    debounceTime(300),
    map((event) => ({
      ...event,
      type: 'debouncedChange',
    })),
  )

/**
 * Transforms keydown events into arrow events
 */
export const arrowEvents: InvokeCreator<AutocompleteContext, AnyEventObject> = (
  context,
) =>
  context.events$.pipe(
    filter(
      (event) =>
        event.type === 'keydown' &&
        (event as KeyboardEvent<HTMLInputElement>).key.startsWith('Arrow'),
    ),
    map((event) => ({
      type: 'arrow',
      event,
    })),
  )

/**
 * Transforms escape keydown events into reset events
 */
export const escapeEvent: InvokeCreator<AutocompleteContext, AnyEventObject> = (
  context,
) =>
  context.events$.pipe(
    filter(
      (event) =>
        event.type === 'keydown' &&
        (event as KeyboardEvent<HTMLInputElement>).key === 'Escape',
    ),
    map((event) => ({
      type: 'reset',
      event,
    })),
  )

/**
 * Transforms enter keydown events into enter-pressed events
 */
export const enterEvent: InvokeCreator<AutocompleteContext, AnyEventObject> = (
  context,
) =>
  context.events$.pipe(
    filter(
      (event) =>
        event.type === 'keydown' &&
        (event as KeyboardEvent<HTMLInputElement>).key === 'Enter',
    ),
    map((event) => ({
      type: 'submit',
      event,
    })),
  )
