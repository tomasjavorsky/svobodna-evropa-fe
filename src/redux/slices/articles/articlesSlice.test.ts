import { configureStore } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { delay, http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, it } from 'vitest'

import { baseURL } from '../../../misc/consts'
import articlesReducer, {
  clearError,
  createBlankArticle,
  getArticle,
  getArticles,
  initialState,
} from './articlesSlice'

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it('loads article list from api', async () => {
  server.use(
    http.get(`${baseURL}/articles/`, async () => {
      await delay()
      return HttpResponse.json([
        {
          id: 'test-id',
          title: 'test-title',
          author: 'test-author',
          dateOfPublication: 'test-date',
        },
      ])
    })
  )

  const store = configureStore({
    reducer: articlesReducer,
  })

  await store.dispatch(
    getArticles({
      query: '',
      sort: '',
    })
  )

  expect(store.getState()).toEqual({
    ...initialState,
    list: [
      {
        id: 'test-id',
        title: 'test-title',
        author: 'test-author',
        dateOfPublication: 'test-date',
      },
    ],
  })
})

it('loads a specific article from api', async () => {
  const testArticle = {
    id: '123',
    title: 'The Great title',
    author: 'Lord Authorus',
    dateOfPublication: '2025-02-11',
    text: 'Lorem ipsum',
  }

  server.use(
    http.get(`${baseURL}/articles/`, async ({ request }) => {
      const url = new URL(request.url)
      const articleId = url.searchParams.get('id')
      if (articleId === '123') {
        await delay()
        return HttpResponse.json(testArticle)
      } else {
        return new HttpResponse(null, { status: 500 })
      }
    })
  )

  const store = configureStore({
    reducer: articlesReducer,
  })

  await store.dispatch(getArticle('123'))

  expect(store.getState()).toEqual({
    ...initialState,
    selectedArticle: testArticle,
  })
})

it('handles failed article list request', async () => {
  server.use(
    http.get(`${baseURL}/articles`, async () => {
      await delay()
      return new HttpResponse(null, { status: 500 })
    })
  )

  const store = configureStore({
    reducer: articlesReducer,
  })

  await store.dispatch(getArticles({ query: '', sort: '' }))

  expect(store.getState()).toEqual({
    ...initialState,
    error: 'Failed to fetch article list',
  })
})

it('has correct initial state', () => {
  expect(articlesReducer(undefined, { type: '' })).toEqual(initialState)
})

it('can create new blank article', () => {
  expect(
    articlesReducer(
      {
        ...initialState,
        selectedArticle: {
          id: 'test-id',
          title: 'test-title',
          author: 'test-author',
          dateOfPublication: 'test-date',
          text: 'test-text',
        },
      },
      createBlankArticle()
    )
  ).toEqual({
    ...initialState,
    selectedArticle: {
      id: '',
      title: '',
      author: '',
      dateOfPublication: dayjs().format('YYYY-MM-DD'),
      text: '',
    },
  })
})

it('can reset errors', () => {
  expect(
    articlesReducer(
      {
        ...initialState,
        error: 'test-error',
      },
      clearError()
    )
  ).toEqual({
    ...initialState,
    error: '',
  })
})
