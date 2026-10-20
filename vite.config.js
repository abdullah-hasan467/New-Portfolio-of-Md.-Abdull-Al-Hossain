import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

// সর্বশেষ commit-এর সময়। git না পেলে build-এর সময় ধরবে।
function lastUpdate() {
  try {
    return execSync('git log -1 --format=%cI').toString().trim()
  } catch {
    return new Date().toISOString()
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_UPDATE__: JSON.stringify(lastUpdate()),
  },
})