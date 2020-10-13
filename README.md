## Recursion

All of these problems should be solved using recursion.

### Product of Nums
Write a function that finds the product of an array of numbers:

`product([2, 3, 4])   // 24`

### Longest Word
Given a list of words, return the length of the longest:

`longest(["hello", "hi", "hola"])  // 5`

### Every Other Character
Write a function that returns a string of every other character:

`everyOther("hello")  // "hlo"`

### Is Palindrome?
Write a function that returns true/false depending on whether passed-in string is a palindrome:

```
isPalindrome("tacocat")  // true
isPalindrome("tacodog")  // false
```

### Find Index
Given an array and a string, return the index of that string in the array (or -1 if not present):

```
let animals = ["duck", "cat", "pony"];

findIndex(animals, "cat");  // 1
findIndex(animals, "porcupine");   // -1
```

### Reverse String
Return a copy of a string, reversed:

`revString("porcupine") // 'enipucrop'`

### Gather Strings
Given an object, return an array of all the values in the object that are strings:

```
let nestedObj = {
  firstName: "Lester",
  favoriteNumber: 22,
  moreData: {
    lastName: "Testowitz"
  },
  funFacts: {
    moreStuff: {
      anotherNumber: 100,
      deeplyNestedString: {
        almostThere: {
          success: "you made it!"
        }
      }
    },
    favoriteString: "nice!"
  }
};

gatherStrings(nestedObj) // ["Lester", "Testowitz", "you made it!", "nice!"];
```

### Binary Search
Given an array (not a linked list!) of sorted numbers and a value, return the index of that value. If not found, return -1. This algorithm should run in O(log(N)) time (where N is the number of elements in the array):

```
binarySearch([1,2,3,4],1) // 0
binarySearch([1,2,3,4],3) // 2
binarySearch([1,2,3,4],5) // -1
```

## Split Square

Note: This is a long code challenge in four parts — each part a little harder than the previous.

In this challenge, you’ll be writing code to handle squares and “split squares”.

A square can be a “simple square”, where it’s either empty or filled:

```
+----+     +----+
|    |     |####|
+----+     +----+
```

A square can be divided into a “split square” of four squares:

```
+---------+
|    |####|
|----+----|
|    |    |
+---------+
```

Any or all of these can also be further split, so this is a legal square:

```
+-------------------+
|         |    |####|
|         |----+----|
|         |####|####|
|---------+---------|
|         |         |
|         |         |
|         |         |
+-------------------+
```

This splitting can be arbitrarily deep.

Representing Squares
We need a code-friendly way to represent these squares.

We’ll represent a simple square with 1 (filled) or 0 (empty)

```
+----+              +----+
|    |  =  0        |####|  =  1
+----+              +----+
```

A split square will be represented with a list of squares, with each item in the list being the (top-left, top-right, bottom-left, bottom-right) parts:

```
+---------+
|    |####|
|----+----|  =  [0, 1, 0, 0]
|    |    |
+---------+
```

These lists can be nested as needed so we can represent further divided squares:

```
+-------------------+
|         |    |####|
|         |----+----|
|         |####|####|
|---------+---------|  =  [0, [0, 1, 1, 1], 0, 0]
|         |         |
|         |         |
|         |         |
+-------------------+
```

You could think of this structure as a kind of “recursive list” — any square can contain four squares, so any list item could be another list of four list items.

Make sure you understand this data structural representation before you move forward. You may find it helpful to draw a few squares and write down what the JavaScript list-based representation would be, so that it’s clear in your head.

### Task 1: Dumping Squares
Squares can be “dumped”, which is returning a string of the square: a 1 or 0 space-separated.

For a simple square, this would just print 0 or 1.

For this split square:

```
+---------+
|    |####|
|----+----|
|    |    |
+---------+
```
Its dump would be:

`0 1 0 0`

For this split square:

```
+-------------------+
|         |    |####|
|         |----+----|
|         |####|####|
|---------+---------|
|         |         |
|         |         |
|         |         |
+-------------------+
```

Its dump would be:

`0 0 1 1 1 0 0`

We want to write a function, dump(square), which will dump out a square.

For example, a simple square will only be one line:

```
dump(0) // 0

dump(1) // 1
```

A split square will use four lines:

`dump([0, 1, 0, 1])  // 0 1 0 1`

A nested split square will use one line per square:

`dump([0, 0, 0, [1, 1, 1, 1]]) // 0 0 0 1 1 1 1`

Of course, these can nested deeply and still work:

```
dump([0, 0, 0, [1, 1, 1, [0, 0, 0, [1, 1, 1, 1]]]])
  // 0 0 0 1 1 1 0 0 0 1 1 1 1
```
  
As a hint, you’ll want to use recursion here. This first task, of dumping things, will give you a good “skeleton” for the later tasks, as they’ll all need some of the same ideas of “navigating an arbitrarily nested data structure”.

### Task 2: Validating Squares
Given our data structures, described above, write a function, validate(square), which takes a square/split square, and returns true if it is valid, and false if it is not.

For example, a simple square is valid:

`validate(0) // true`

A split square of four simple filled squares is valid:

`validate([1, 1, 1, 1]) // true`

We can nest split and simple squares:

```
validate([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1]) // true

validate([1,
         [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]],
         [1, 0, 1, 0],
         1])  // true
```
Simple squares must be either 0 (empty) or 1 (filled):

`validate(2) // false`

Split squares must contain exactly four parts:

```
validate([1, 1, 1, 1, 1]) // false

validate([1, 0, [1, [0, 0, 0, 0, 1], 1, [1, 1, 1, 1]], 1]) // false

validate([1, [1, 0, 1, [0, [0, 0, 0], 1, 1]], [1, 0, 1, 0], 1]) // false
```

### Task 3: Simplifying Squares
A split square that has all the same squares can be “simplified” into a simple square.

For example, this split square contains four filled squares, so we could simplify the entire thing into one simple filled square:

```
+---------+      +---------+
|####|####|      |#########|
|----+----|  =>  |#########|
|####|####|      |#########|
+---------+      +---------+
```

This works with nested split squares, too:

```
+-------------------+      +-------------------+
|         |####|####|      |         |#########|
|         |----+----|      |         |#########|
|         |####|####|      |         |#########|
|---------+---------|  =>  |---------+---------|
|         |         |      |         |         |
|         |         |      |         |         |
|         |         |      |         |         |
+-------------------+      +-------------------+
```

If an inner simplification makes a simple square out of a split square, this could simplify an outer split square:

```
+-------------------+      +-------------------+
|#########|####|####|      |###################|
|#########|----+----|      |###################|
|#########|####|####|      |###################|
|---------+---------|  =>  |###################|
|#########|#########|      |###################|
|#########|#########|      |###################|
|#########|#########|      |###################|
+-------------------+      +-------------------+
```

Write a function, simplify(square), that takes in a square and returns the maximally-simplified version of it.

For example, a simple square is already simplified:

`simplify(0) // 0`

A split square containing four simple filled squares can be simplified to a simple filled square:

`simplify([1, 1, 1, 1])  // 1`

A split square containing four simple empty squares can be simplified to a simple empty square:

`simplify([0, 0, 0, 0])   // 0`

A split square containing mixed squares cannot be simplified:

`simplify([1, 0, 1, 0])  // [1, 0, 1, 0]`

These can be simplified even when nested:

`simplify([1, 0, 1, [1, 1, 1, 1]])  // [1, 0, 1, 1]`

Simplification should nest, so if we can simplify one split square into a simple square and now an outer split square can be simplified, it should:

```
simplify([1, 1, 1, [1, 1, 1, 1]])  // 1

simplify([[1, 1, 1, 1], [1, 1, 1, 1], 1, 1])  // 1

simplify([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
// [1, 0, [1, 0, 1, 1], 1]
```

### Task 4: Adding Squares
Squares can be added together, using the rule that if either square is filled, the result is filled:

```
+----+     +----+     +----+
|    |  +  |    |  =  |    |
+----+     +----+     +----+

+----+     +----+     +----+
|    |  +  |####|  =  |####|
+----+     +----+     +----+

+----+     +----+     +----+
|####|  +  |    |  =  |####|
+----+     +----+     +----+

+----+     +----+     +----+
|####|  +  |####|  =  |####|
+----+     +----+     +----+
```

Split squares can be added with the same rules: for each part, if that part is filled, that part in the result is filled:

```
+---------+     +---------+     +---------+
|    |####|     |####|    |     |####|####|
|----+----|  +  |----+----|  =  |----+----|
|    |    |     |    |    |     |    |    |
+---------+     +---------+     +---------+
```

Even if one given square is more nested than another, the two squares can still be added. Any part of either square that is filled will be filled in the result square.

For example, if we add a simple empty square and a split square, we’ll get a split square with those same splits filled:

```
+---------+     +---------+     +---------+
|         |     |####|    |     |####|    |
|         |  +  |----+----|  =  |----+----|
|         |     |    |    |     |    |    |
+---------+     +---------+     +---------+
```

Or, as a more complex version of that same idea:

```
+-------------------+     +-------------------+     +-------------------+
|         |    |####|     |    |    |         |     |    |    |    |####|
|         |----+----|     |----+----|         |     |----+----|----+----|
|         |    |    |     |    |####|         |     |    |####|    |    |
|---------+---------|  +  |---------+---------|  =  |---------+---------|
|####|    |         |     |####|    |         |     |####|    |         |
|----+----|         |     |----+----|         |     |----+----|         |
|    |    |         |     |    |####|         |     |    |####|         |
+-------------------+     +-------------------+     +-------------------+
```

Write a function, add(square, square), that adds together two squares.

For example, two simple squares can be added:

```
let s1 = 0
let s2 = 1

add(s1, s2)   // 1
```

A simple square and a split square can be added:

```
let s1 = 0
let s2 = [1, 0, 1, 0]

add(s1, s2) // [1, 0, 1, 0]
```

Two split squares can be added:

```
let s1 = [0, 0, 0, 1]
let s2 = [0, 1, 0, 1]

add(s1, s2)   // [0, 1, 0, 1]
```
Nested squares can be added:

```
let s1 = [0, [1, 1, 1, [0, 0, 0, 0]], [0, 0, 0, 0], 1]
let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

add(s1, s2)
// [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]
```

Unevenly-nested squares can be added:

```
let s1 = [0, [1, 1, 1, 0           ], [0, 0, 0, 0], 1]
let s2 = [1, [1, 0, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

add(s1, s2)
// [1, [1, 1, 1, [0, 0, 1, 1]], [1, 0, 1, 0], 1]

let s1 = [0, [1, 1, 1, 1                      ], [0, 0, 0, 0], 1]
let s2 = [1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1]

add(s1, s2)
// [1, [1, 1, 1, [1, [1, 1, 1, 1], 1, 1]], [1, 0, 1, 0], 1]
```

## Boggle

In this problem, you’ll make a function that, given a 5x5 Boggle board, can check if a given word is in it.

In Boggle, you can start with any letter, then move in any NEWS direction. You can continue to change directions.

(In the real game of Boggle, you can also move diagonally, but in our simplified version, you can only move NEWS directions).

So, for example:

```
N C A N E
O U I O P
Z Q Z O N
F A D P L
E D E A Z
```

In this grid, you could find NOON (start at the N in the top row, head south, and turn east in the third row). You cannot find the word CANON — while you can find CANO by starting at the top-left C, you can ‘t re-use the exact same N tile on the front row, and there’s no other N you can reach.

A convenient make_board function is provided, which returns a list-of-rows, with each row being a list-of-letters:

```
let board = makeBoard(`
    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z
    `)

board.length;   // 5
5

board[0];       // ['N', 'C', 'A', 'N', 'E']
```
  
NOON should be found (0, 3 -> 1, 3 -> 2, 3 -> 2, 4):

`find(board, "NOON")  // true`  

NOPE should be found (0, 3 -> 1, 3 -> 1, 4 -> 0, 4):

`find(board, "NOPE") // true`  

CANON can’t be found (CANO starts at 0, 1 but can’t find the last N and can’t re-use the N):

`find(board, "CANON")  // false`

You cannot travel diagonally in one move, which would be required to find QUINE:

`find(board, "QUINE")  // false`

We can recover if we start going down a false path (start 3, 0):

`find(board, "FADED")  // true`

## Installation
To install, follow these steps:

Via Downloading from GitHub:

Download this repository onto your machine by clicking the "Clone or Download" button or Fork the repo into your own Github account
Download and extract the zip file to a directory of your choice.  

Via command line:

`$ git clone https://github.com/puglisac/recursion.git`  

Install dependencies

`npm install`  

Available Scripts  

In the project directory, you can run:    

`npm test`

Launches the test runner.

split-square was written in python.  In order to run doctests via command line:

`python3 -m doctest -v <FILE_NAME>`

boggle was written in python and javascript.  In order to run python doctests via command line:

`python3 -m doctest -v boggle.py`
