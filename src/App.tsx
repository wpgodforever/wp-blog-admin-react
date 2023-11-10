import { Suspense } from 'react'
import router from './routers'
import { Guard } from './routers/guard.ts'
function App() {
  return (
    <>
      <Suspense fallback={<>loading...</>}>
        <Guard router={router} />
      </Suspense>
    </>
  )
}

export default App
