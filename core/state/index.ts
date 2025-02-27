import { Action, configureStore, Store, ThunkAction } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'

export type RootState = ReturnType<typeof reducer>;
let store: Store<RootState> | undefined;

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', "store"]

const persistConfig = {
  key: 'root',
  whitelist: PERSISTED_KEYS,
  storage,
  // stateReconciler: false,
}

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(preloadedState: Partial<RootState> | undefined = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: false
        // {
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
      }),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  })
}

export const getOrCreateStore = (preloadedState: Partial<RootState> | undefined = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

store = getOrCreateStore()

// export function useStore(preloadedState) {
//   const store = useMemo(() => getOrCreateStore(preloadedState), [preloadedState])
//   return store
// }

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store

export const persistor = persistStore(store)
