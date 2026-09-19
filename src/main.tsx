import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import faviconUrl from './assets/favicon.svg?url'
import App from './App.tsx'

// иконка вкладки вшивается в сборку, чтобы одиночный index.html был самодостаточным
const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
icon.type = 'image/svg+xml'
icon.href = faviconUrl

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
