import { describe, it, expect } from 'vitest'
import reducer, {
  fetchAuthors,
  fetchByAuthor,
  fetchBlueprint,
} from '../src/features/blueprints/blueprintsSlice.js'

const initialState = {
  authors: [],
  byAuthor: {},
  current: null,
  status: 'idle',
  error: null,
}

describe('blueprints slice', () => {
  it('should initialize correctly', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    expect(state.authors).toEqual([])
  })

  it('fetchAuthors.pending → status loading', () => {
    const action = fetchAuthors.pending('', undefined)
    const state = reducer(initialState, action)
    expect(state.status).toBe('loading')
  })

  it('fetchAuthors.rejected → status failed con mensaje', () => {
    const action = fetchAuthors.rejected(new Error('Network Error'), '', undefined)
    const state = reducer(initialState, action)
    expect(state.status).toBe('failed')
    expect(state.error).toBe('Network Error')
  })

  it('fetchByAuthor.fulfilled → guarda items por autor', () => {
    const blueprints = [
      { author: 'John', name: 'house', points: [] },
      { author: 'John', name: 'car', points: [] },
    ]
    const action = fetchByAuthor.fulfilled({ author: 'John', items: blueprints }, '', 'John')
    const state = reducer(initialState, action)
    expect(state.byAuthor['John']).toHaveLength(2)
    expect(state.byAuthor['John'][0].name).toBe('house')
  })

  it('fetchBlueprint.fulfilled → actualiza current', () => {
    const bp = { author: 'John', name: 'house', points: [{ x: 1, y: 2 }] }
    const action = fetchBlueprint.fulfilled(bp, '', { author: 'John', name: 'house' })
    const state = reducer(initialState, action)
    expect(state.current).toEqual(bp)
    expect(state.current.name).toBe('house')
  })
})
