import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget, str2BlendMode } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { Canvas, CanvasKit, Paint } from 'canvaskit-wasm'
import type { Vector2 } from '../../utils/vector2'

export interface LineOptions extends WidgetOptions {
  style?: LineStyle
}

export interface LineStyle extends WidgetStyle {
  color?: Color
  width?: number
}

export class Line extends Widget {
  paint: Paint
  declare style: LineStyle

  constructor(public from: Vector2, public to: Vector2, options?: LineOptions) {
    options ??= {}
    super(options)
    options.style ??= {}
    this.style.color = options.style.color ?? Color.WHITE
    this.style.width = options.style.width ?? 2
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setStyle(ck.PaintStyle.Stroke)
    this.paint.setColor(this.style.color.toFloat4())
    this.paint.setStrokeWidth(this.style.width)
    this.paint.setAlphaf(this.style.transparency)
    this.paint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'style.color': {
        this.paint.setColor(this.style.color.toFloat4())
        break
      }
      case 'style.width': {
        this.paint.setStrokeWidth(this.style.width)
        break
      }
      case 'style.blendMode': {
        // Blend Mode
        this.paint.setBlendMode(str2BlendMode(ck, this.style.blendMode))
        break
      }
    }
    this.paint.setAlphaf(this.style.transparency)
  }

  draw(canvas: Canvas): void {
    canvas.drawLine(
      this.from[0],
      this.from[1],
      this.from[0] + (this.to[0] - this.from[0]) * this.progress,
      this.from[1] + (this.to[1] - this.from[1]) * this.progress,
      this.paint,
    )
  }

  isIn(x: number, y: number): boolean {
    const slope = (this.to[1] - this.from[1]) / (this.to[0] - this.from[0])
    const yIntercept = this.from[1] - slope * this.from[0]
    const expectedY = slope * x + yIntercept
    return Math.abs(y - expectedY) < Number.EPSILON
  }
}
