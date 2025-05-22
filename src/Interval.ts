export class Interval {
  constructor(
    public start: number,
    public end: number
  ) {
    if (start > end) {
      throw new Error("time interval can't have an end time that is smaller than the start time!");
    }
    if (start <  0) {
      throw new Error("time can't be negative.. yet?");
    }
  }

  //Checks if intervals are overlapping e.g. [0,5]-[5,6] OR [10,20]-[13,17] OR [1,10]-[7,12] .etc
  overlaps(other: Interval): boolean {
    return this.start <= other.end && other.start <= this.end;
  }

  //Checks if intervals are adjacent e.g. [0,5] -> [6,9]
  adjacent(other: Interval): boolean {
    return this.start == other.start + 1 || other.start == this.start + 1 || this.end + 1  == other.end ||  this.end  == other.end + 1 || this.end == other.start +1 || this.start == other.end +1 || this.end+1 == other.start || this.start +1 == other.end;
  }

  toString(): string {
    return `[${this.start},${this.end}]`;
  }
}
