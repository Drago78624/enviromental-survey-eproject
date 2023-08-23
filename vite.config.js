import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig({
  build: {
    rollupOptions: {
      input: getPagesInput(),
    },
  },
})

function getPagesInput() {
  const input = {}
  const pagesDir = resolve(__dirname, 'pages')

  // Read the files in the pages directory
  const files = fs.readdirSync(pagesDir)

  // Filter out HTML files
  const htmlFiles = files.filter(file => file.endsWith('.html'))

  // Generate input entries for each HTML file
  htmlFiles.forEach(file => {
    const name = file.replace('.html', '')
    input[name] = resolve(pagesDir, file)
  })

  return input
}