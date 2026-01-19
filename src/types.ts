/**
 * User configuration interface
 */
export interface UserConfig {
  /** Project name, used for configuring jinkela and BFS static resource addresses */
  appName: string
  /** Project tree ID, used for jinkela configuration */
  treeId: string
  /** Target directory (full path) */
  targetDir: string
  /** Base directory (user input relative path, e.g. ./pages) */
  baseDir: string
  /** Vue version */
  vueVersion: 'vue2' | 'vue3'
}

/**
 * Template replacement configuration
 */
export interface TemplateReplacements {
  [key: string]: string
}

/**
 * CLI options
 */
export interface CliOptions {
  help?: boolean
  version?: boolean
}

/**
 * ASCII art configuration
 */
export interface AsciiConfig {
  /** Image path */
  imagePath: string
  /** Output width (character count) */
  width: number
  /** Whether to output in color */
  colored: boolean
  /** Character set */
  charset: string
  /** Whether to save to file */
  saveToFile?: string
}

/**
 * ASCII command options
 */
export interface AsciiCliOptions {
  width?: number
  color?: boolean
  charset?: string
  output?: string
  help?: boolean
}

/**
 * RGB color
 */
export interface RGB {
  r: number
  g: number
  b: number
}

/**
 * ASCII character matrix
 */
export interface AsciiMatrix {
  chars: string[][]
  colors: RGB[][]
}
