import { createCanvas, loadImage as canvasLoadImage, Image, ImageData } from 'canvas'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Validate image file
 */
export function validateImageFile(imagePath: string): { valid: boolean; error?: string } {
  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    return { valid: false, error: `File does not exist: ${imagePath}` }
  }

  // Check if it's a file
  const stats = fs.statSync(imagePath)
  if (!stats.isFile()) {
    return { valid: false, error: `Path is not a file: ${imagePath}` }
  }

  // Check file extension
  const ext = path.extname(imagePath).toLowerCase()
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
  if (!supportedFormats.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported image format: ${ext}. Supported formats: ${supportedFormats.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Load image
 */
export async function loadImage(imagePath: string): Promise<Image> {
  try {
    const image = await canvasLoadImage(imagePath)
    return image
  }
  catch (error) {
    throw new Error(`Failed to load image: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * Calculate target dimensions (maintain aspect ratio, considering character aspect ratio)
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
): { width: number; height: number } {
  // Character aspect ratio is approximately 2:1
  const aspectRatio = 2.0
  const targetHeight = Math.floor((originalHeight / originalWidth) * targetWidth / aspectRatio)

  return {
    width: targetWidth,
    height: targetHeight,
  }
}

/**
 * Get image pixel data
 */
export function getImageData(
  image: Image,
  width: number,
  height: number,
): ImageData {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Draw scaled image
  ctx.drawImage(image, 0, 0, width, height)

  // Get pixel data
  return ctx.getImageData(0, 0, width, height)
}
