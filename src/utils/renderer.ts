import chalk from 'chalk'
import type { AsciiMatrix, RGB } from '../types'

/**
 * Format single line output
 */
export function formatLine(
  chars: string[],
  colors: RGB[],
  colored: boolean,
): string {
  if (!colored) {
    return chars.join('')
  }

  return chars
    .map((char, i) => {
      const { r, g, b } = colors[i]
      return chalk.rgb(r, g, b)(char)
    })
    .join('')
}

/**
 * Render ASCII art to string
 */
export function renderToString(
  matrix: AsciiMatrix,
  colored: boolean,
): string {
  const lines: string[] = []

  for (let y = 0; y < matrix.chars.length; y++) {
    const line = formatLine(
      matrix.chars[y],
      matrix.colors[y],
      colored,
    )
    lines.push(line)
  }

  return lines.join('\n')
}
