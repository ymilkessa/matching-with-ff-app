import { floor } from "lodash";

export class Coloring {
  private colorA: number[];
  private colorB: number[];
  private colorDelta: number[];
  private numOfOptions: number;

  constructor(
    numOfOptions: number,
    colorA: number[] = [32, 144, 160],
    colorB: number[] = [32, 120, 255]
  ) {
    this.colorA = colorA;
    this.colorB = colorB;

    this.colorDelta = [];
    for (let i = 0; i < 3; i++) {
      this.colorDelta.push(
        floor((this.colorB[i] - this.colorA[i]) / numOfOptions)
      );
    }
    this.numOfOptions = numOfOptions;
  }

  /**
   * selectColoring returns a hex representation of an RGB color from among the colors
   * availabe in this object based on the the index provided
   */
  public selectColoring(colorIndex: number): string {
    if (colorIndex >= 0 && colorIndex < this.numOfOptions) {
      const difference = this.colorDelta.map((num) => num * colorIndex);
      const newColor = [];
      for (let k = 0; k < 3; k++) {
        newColor.push(this.colorA[k] + difference[k]);
      }
      const hexStrings = newColor.map((colorNum) => colorNum.toString(16));
      let finalString = "";
      for (let k = 0; k < 3; k++) {
        finalString += hexStrings[k];
      }
      return finalString;
    }

    // Return an error if the input is invalid
    throw Error(
      `Input index ${colorIndex} is invalid for a coloring set with ${this.numOfOptions} options.`
    );
  }
}
