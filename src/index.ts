import { loadImage, calculateDimensions, getImageData, validateImageFile } from './utils/image'
import { convertToAscii } from './utils/converter'
import { renderToString } from './utils/renderer'

/**
 * Image to ASCII art conversion options
 */
interface ConvertImageOptions {
  /** Output width (character count), default 80 */
  width?: number
  /** Whether to output in color, default true */
  colored?: boolean
  /** Character set, default ' .:-=+*#%@' */
  charset?: string
}

/**
 * Default configuration
 */
const DEFAULT_OPTIONS: Required<ConvertImageOptions> = {
  width: 80,
  colored: true,
  charset: ' .:-=+*#%@',
}

/**
 * Convert image to ASCII art string
 *
 * @param imagePath Image path
 * @param options Conversion options
 * @returns ASCII art string
 *
 * @example
 * ```typescript
 * const ascii = await convertImageToAscii('./logo.png', { width: 60 })
 * console.log(ascii)
 * ```
 */
async function convertImageToAscii(
  imagePath: string,
  options?: ConvertImageOptions,
): Promise<string> {
  const config = { ...DEFAULT_OPTIONS, ...options }

  // Validate image file
  const validation = validateImageFile(imagePath)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // Load image
  const image = await loadImage(imagePath)

  // Calculate target dimensions
  const dimensions = calculateDimensions(
    image.width,
    image.height,
    config.width,
  )

  // Get pixel data
  const imageData = getImageData(image, dimensions.width, dimensions.height)

  // Convert to ASCII
  const matrix = convertToAscii(
    imageData,
    dimensions.width,
    dimensions.height,
    config.charset,
  )

  // Render to string
  return renderToString(matrix, config.colored)
}


export {
  convertImageToAscii,
}

export type {
  ConvertImageOptions,
}