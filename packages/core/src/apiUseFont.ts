import fs from 'node:fs'
import path from 'node:path'
import { $source } from './global'

export async function useFont(src: string) {
  if (typeof window !== 'undefined') {
    const response = await fetch(src)
    const array = await response.arrayBuffer()
    $source.fonts.push(array)
    return array
  } else {
    const buffer = fs.readFileSync(path.resolve(src))
    const array = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    )
    $source.fonts.push(array)
    return array
  }
}
