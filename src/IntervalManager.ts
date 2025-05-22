import { Interval } from "./Interval";

/**
 * This class manages a collection of time intervals
 */
export class IntervalManager {
  private intervals: Interval[] = [];

  /**
   * Add an interval to the list or merge it with existing intervals if it satisfies the merging conditions
   */
  addInterval(newInterval: Interval): void {
    this.intervals.push(newInterval);
    if (this.intervals.length > 1) {
      this.mergeIntervals();
    }
  }

  /**
   * Iterate through the intervals list, get the first element and the new added element (last in list) and check if we should merge them
   * If merging is decided, remove the two elements and add the new one.
   * Then we call this  function in recursion until no merging is furthermore required
   */
  mergeIntervals(): Interval[] {
    let shouldMerge = false;
    let currentInterval: Interval ;
    let nextInterval : Interval ;
    let jIter: number = this.intervals.length-1;
    for (let i = 0; i <this.intervals.length-1 ; i++) {
      currentInterval = this.intervals[i];
      for (let j = jIter; j > i; j--) {
        nextInterval = this.intervals[j];
        if (currentInterval.overlaps(nextInterval) || currentInterval.adjacent(nextInterval)) {
          shouldMerge = true;
          break;
        }
      }
      if (shouldMerge) {
        break;
      }
    }
    if (shouldMerge) {
      let newIndex: number = 0;
      // @ts-ignore
      this.intervals.splice(this.getIndexOf(currentInterval), 1);
      // @ts-ignore
      this.intervals.splice(this.getIndexOf(nextInterval), 1);
      // @ts-ignore
      this.intervals.push(new Interval(Math.min(currentInterval.start, nextInterval.start), Math.max(currentInterval.end, nextInterval.end)));
      if (this.intervals.length > 1) {
        this.mergeIntervals();
      }
    }
    return this.intervals;
  }

  private getIndexOf(interval: Interval) :number {
    for (let i = 0; i < this.intervals.length; i++) {
      // @ts-ignore
      if (this.intervals[i] === interval) {
        return i;
      }
    }
    throw Error(`Invalid interval: ${interval}`);
  }

  //we sort and save the intervals every time we get it -potentially sort on merge/add depending on use of application, caching also an option to avoid sorting a sorted list
  getIntervals(): Interval[] {
    return this.intervals.sort((a, b) => a.start - b.start);
  }

  removeInterval(intervalToRemove: Interval)  {
    for (let i = 0; i <this.intervals.length ; i++) {
      if (this.intervals[i].start === intervalToRemove.start && this.intervals[i].end === intervalToRemove.end) {
        this.intervals.splice(i, 1);
        break;
      }
      if (this.intervals[i].overlaps(intervalToRemove)) {
        this.splitIntervalAndAddBack(this.intervals[i], intervalToRemove, i);
        break;
      }
    }
  }

  splitIntervalAndAddBack(intervalToSplit: Interval ,intervalToRemove: Interval, intervalToRemoveIndex: number) {
    this.intervals.splice(intervalToRemoveIndex, 1);
    if (intervalToRemove.start > intervalToSplit.start && intervalToRemove.end < intervalToSplit.end) {
      this.intervals.push(new Interval(intervalToSplit.start, intervalToRemove.start));
      this.intervals.push(new Interval(intervalToRemove.end, intervalToSplit.end));
    }
    //TODO: more cases e.g. more overlapping cases one border, removal spanning two different intervals already there, negative no removal..
  }
}
