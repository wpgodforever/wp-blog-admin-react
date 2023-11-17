import { Suspense } from 'react'
import router from './routers'
import Guard from './routers/guard.ts'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
function App() {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <Provider store={store}>
          <Guard router={router} />
        </Provider>
      </Suspense>
    </>
  )
}

export default App
