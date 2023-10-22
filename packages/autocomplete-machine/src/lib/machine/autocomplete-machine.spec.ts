import { interpret, Interpreter } from 'xstate'
import { autocompleteMachine } from './autocomplete-machine'
import { AutocompleteContext } from '../autocomplete-types'
import { ChangeEvent } from 'react'

describe('autocompleteMachine', () => {
  let service: Interpreter<AutocompleteContext, any, any, any, any>
  const onReset = vi.fn()
  const onChange = vi.fn()

  beforeEach(() => {
    service = interpret(
      autocompleteMachine.withConfig({
        actions: {
          onReset,
          onChange,
        },
      }),
    ).start()
  })

  afterEach(() => {
    service.stop()
  })

  it('should transition to FOCUSED_EMPTY on focus event with empty value', () => {
    service.send({ type: 'focus', target: { value: '' } })
    expect(service.getSnapshot().value).toBe('FOCUSED_EMPTY')
  })

  it('should transition to FOCUSED_SEARCHING on focus event with non-empty value', () => {
    service.send({ type: 'focus', target: { value: 'test' } })
    expect(service.getSnapshot().value).toBe('FOCUSED_SEARCHING')
  })

  it('should transition to IDLE on blur event', () => {
    service.send({ type: 'blur' })
    expect(service.getSnapshot().value).toBe('IDLE')
  })

  it('should handle ArrowDown event by changing focusedItemId', () => {
    const initialItems = [{ id: 1 }, { id: 2 }, { id: 3 }]
    service.send({ type: 'updateItems', items: initialItems })
    service.send({ type: 'arrow', event: { key: 'ArrowDown' } })
    expect(service.getSnapshot().context.focusedItemId).toBe(1)

    service.send({ type: 'arrow', event: { key: 'ArrowDown' } })
    expect(service.getSnapshot().context.focusedItemId).toBe(2)
  })

  it('should handle ArrowUp event by changing focusedItemId', () => {
    const initialItems = [{ id: 1 }, { id: 2 }, { id: 3 }]
    service.send({ type: 'updateItems', items: initialItems })
    service.send({ type: 'arrow', event: { key: 'ArrowDown' } }) // setting focus on first item
    service.send({ type: 'arrow', event: { key: 'ArrowUp' } })
    expect(service.getSnapshot().context.focusedItemId).toBe(3) // should wrap around to last item
  })

  it('should reset to initial state on escape event', async () => {
    service.send({ type: 'focus', target: { value: 'test' } })
    service.send({ type: 'keyDown', event: { key: 'Escape' } })
    service.send({ type: 'reset' })
    expect(service.getSnapshot().context.focusedItemId).toBeUndefined()
    expect(service.getSnapshot().context.searchValue).toBe('')
    expect(service.getSnapshot().value).toBe('IDLE')
  })

  it('should call onReset action on reset event', () => {
    const initialItems = [{ id: 1 }, { id: 2 }, { id: 3 }]
    service.send({ type: 'updateItems', items: initialItems })
    service.send({ type: 'reset' })
    expect(onReset).toHaveBeenCalled()
    expect(service.getSnapshot().context.items).toHaveLength(3)
    expect(service.getSnapshot().value).toBe('IDLE')
    service.send({ type: 'focus', target: { value: '' } })
    expect(service.getSnapshot().value).toBe('FOCUSED_EMPTY')
  })

  it('external onChange should be called when search value changes', () => {
    vi.useFakeTimers()
    service
      .getSnapshot()
      .context.events$.next({
        type: 'change',
        target: { value: 'test' },
      } as ChangeEvent<HTMLInputElement>)
    vi.advanceTimersByTime(500)
    expect(onChange).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

})
