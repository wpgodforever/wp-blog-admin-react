import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import router from './routers'
function App() {
  const outlet = useRoutes(router)
  return (
    <>
      <div>
        <React.Suspense fallback={<div>loading...</div>}>
          {outlet}
        </React.Suspense>
      </div>

    </>
  )
}

export default App
