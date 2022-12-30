import { Carobj } from "./index";
import { IPositionedMut } from "./interfaces/Positioned";

export class Spirit extends Carobj implements IPositionedMut {
  /**
   * You can set different types of status,the spirit only display one of all until you change it.
   */

  #status: HTMLImageElement[] = []; // The status of the carobj, default by the first.
  #statusNow = 0; // Current status.

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }

  /**
   * Delete one of status.
   * @param index The index of the status.
   */
  deleteStatus(index: number) {
    delete this.#status[index];
  }

  /**
   * Set the status.
   * @param dis[0] The image of all status.
   * @param dis[1] The index of all status,Non-required.
   */
  set displayStatus(dis: [HTMLImageElement, number]) {
    if (typeof dis[1] === "undefined") {
      this.#status.push(dis[0]);
    } else {
      this.#status[dis[1]] = dis[0];
    }
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx);
    ctx.drawImage(this.#status[this.#statusNow], 0, 0);
    return ctx;
  }

  set status(value: number) {
    this.#statusNow = value;
  }

  get sigh() {
    return "Spirit";
  }
}
