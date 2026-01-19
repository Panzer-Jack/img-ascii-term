import type { AsciiMatrix, RGB } from '../types'
import { ImageData } from 'canvas'

/**
 * Calculate pixel brightness
 * Using standard brightness calculation formula: Y = 0.299R + 0.587G + 0.114B
 */
export function calculateBrightness(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114
}

/**
 * Map brightness to character
 */
export function mapBrightnessToChar(brightness: number, charset: string): string {
  // Brightness range 0-255, map to charset index
  const index = Math.floor((brightness / 255) * (charset.length - 1))
  return charset[index]
}

/**
 * Convert pixel data to ASCII character matrix
 */
export function convertToAscii(
  imageData: ImageData,
  width: number,
  height: number,
  charset: string,
): AsciiMatrix {
  const chars: string[][] = []
  const colors: RGB[][] = []
  const data = imageData.data

  for (let y = 0; y < height; y++) {
    const charRow: string[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]

      // Calculate brightness
      const brightness = calculateBrightness(r, g, b)

      // Map to character
      const char = mapBrightnessToChar(brightness, charset)

      charRow.push(char)
      colorRow.push({ r, g, b })
    }

    chars.push(charRow)
    colors.push(colorRow)
  }

  return { chars, colors }
}
