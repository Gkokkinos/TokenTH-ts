import { Interval } from "./Interval";
import { IntervalManager } from "./IntervalManager";

function assertEqual(actual: string, expected: string, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function simpleTest() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1, 3));
  assertEqual(manager.getIntervals().toString(), "[1,3]", "Test failed");
  manager.addInterval(new Interval(5, 7));
  assertEqual(manager.getIntervals().toString(), "[1,3],[5,7]", "Test failed");
  manager.addInterval(new Interval(2, 6));
  assertEqual(manager.getIntervals().toString(), "[1,7]", "Test failed");

  console.log("simpleTest passed!");
}

function simpleTestReverse() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(2, 6));
  manager.addInterval(new Interval(5, 7));
  manager.addInterval(new Interval(1, 3));
  assertEqual(manager.getIntervals().toString(), "[1,7]", "Test failed");

  console.log("simpleTestReverse passed!");
}

function mergeTest1() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1, 3));
  manager.addInterval(new Interval(100, 150));
  manager.addInterval(new Interval(1, 4));
  manager.addInterval(new Interval(1, 98));
  manager.addInterval(new Interval(101, 170));
  assertEqual(manager.getIntervals().toString(), "[1,98],[100,170]", "Test failed");

  console.log("mergeTest1 passed!");
}

function mergeTest2() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1, 3));
  manager.addInterval(new Interval(4, 99));
  manager.addInterval(new Interval(1, 65));
  manager.addInterval(new Interval(101, 150));
  manager.addInterval(new Interval(100, 170));
  manager.addInterval(new Interval(120, 169));
  assertEqual(manager.getIntervals().toString(), "[1,170]", "Test failed");

  console.log("mergeTest2 passed!");
}

function sortingAndMergeTest() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(101,167));
  manager.addInterval(new Interval(105,170));
  manager.addInterval(new Interval(171,172));
  manager.addInterval(new Interval(3,3));
  manager.addInterval(new Interval(4,99));
  manager.addInterval(new Interval(0,97));
  assertEqual(manager.getIntervals().toString(), "[0,99],[101,172]", "Test failed");

  console.log("sortingAndMergeTest passed!");
}

function duplicateTest() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1,1));
  manager.addInterval(new Interval(1,1));
  assertEqual(manager.getIntervals().toString(), "[1,1]", "Test failed");

  console.log("duplicateTest passed!");
}

function negativeTest() {
  const manager = new IntervalManager();

  try {
    manager.addInterval(new Interval(-1,1));
  }
  catch (e) {
    console.log("negativeTest passed!");
    return;
  }

  throw Error("negativeTest failed!");
}

function smallerUpperTest() {
  const manager = new IntervalManager();

  try {
    manager.addInterval(new Interval(-10,1));
  }
  catch (e) {
    console.log("smallerUpperTest passed!");
    return;
  }

  throw Error("smallerUpperTest failed!");
}

function removalSameIntervalCaseTest() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1,1));
  manager.removeInterval(new Interval(1,1));
  assertEqual(manager.getIntervals().toString(), "", "Test failed");

  console.log("removalSameIntervalCaseTest passed!");
}

function removalSimpleCaseTest() {
  const manager = new IntervalManager();

  manager.addInterval(new Interval(1,10));
  manager.removeInterval(new Interval(3,5));
  assertEqual(manager.getIntervals().toString(), "[1,3],[5,10]", "Test failed");

  console.log("removalSimpleCaseTest passed!");
}



simpleTest();
simpleTestReverse();
mergeTest1();
mergeTest2();
sortingAndMergeTest();
duplicateTest();
negativeTest();
smallerUpperTest();
removalSameIntervalCaseTest();
removalSimpleCaseTest();