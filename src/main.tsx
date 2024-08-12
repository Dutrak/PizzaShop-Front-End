import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { enableMSW } from './api/mocks/index.ts'
import { App } from './app.tsx'

await enableMSW()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
