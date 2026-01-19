import { resolve } from 'node:path'
import { convertImageToAscii } from '../dist/index.mjs'


async function run() {
  const ciallo = resolve('./playground/ciallo.png')
  console.log('Loaded image from:', ciallo)
  const asciiArt = await convertImageToAscii(ciallo, { width: 150 })
  console.log(asciiArt)
}

run()
