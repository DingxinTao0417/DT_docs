# Arrays

Arrays are contiguous blocks of memory that store elements of the same logical type, accessible by zero-based index. They offer constant-time random access and compact storage, making them ideal for scenarios with frequent reads and occasional appends.

## Core Properties
- Random access: `O(1)` to read/write by index.
- Search: `O(n)` linear scan unless sorted + binary search.
- Insert/delete at end: amortized `O(1)` in dynamic arrays.
- Insert/delete in middle: `O(n)` due to shifting.
- Memory: contiguous, which improves cache locality.

## Common Operations
- Access element at index.
- Iterate elements.
- Append, insert, remove.
- Find element or index.
- Sort and search.

## Python Examples

```python
from typing import List

def find_index(arr: List[int], target: int) -> int:
    """
    Find index of the first occurrence of target in arr.

    Args:
        arr: List of integers to search.
        target: Value to find.

    Returns:
        The index of target if found; otherwise -1.
    """
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1


def insert_at(arr: List[int], index: int, value: int) -> None:
    """
    Insert value at a specific index, shifting elements to the right.

    Args:
        arr: List to modify.
        index: Insertion position (0 <= index <= len(arr)).
        value: Value to insert.

    Returns:
        None. Mutates the input list.
    """
    arr.insert(index, value)


# Usage
numbers = [3, 1, 4]
numbers.append(1)           # amortized O(1)
insert_at(numbers, 1, 9)    # O(n) shift
idx = find_index(numbers, 4)  # O(n) search
```

## JavaScript Examples

```js
/**
 * Find index of the first occurrence of target in arr.
 * @param {number[]} arr - The array to search.
 * @param {number} target - The value to find.
 * @returns {number} Index of target if found; otherwise -1.
 */
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

/**
 * Insert value at a position, shifting elements to the right.
 * @param {number[]} arr - Array to mutate.
 * @param {number} index - Position to insert at.
 * @param {number} value - Value to insert.
 * @returns {void}
 */
function insertAt(arr, index, value) {
  arr.splice(index, 0, value);
}

const numbers = [3, 1, 4];
numbers.push(1);              // amortized O(1)
insertAt(numbers, 1, 9);      // O(n)
const idx = findIndex(numbers, 4); // O(n)
```

## Pitfalls and Tips
- Middle insert/remove costs `O(n)` due to shifting; prefer linked lists when frequent.
- For large arrays, copying/resizing can be costly; consider chunking or deques.
- Maintain bounds checks to avoid out-of-range errors.

## When to Use
- Need fast random access by index.
- Data size is relatively stable or operations mostly append/read.
- Cache-friendly processing of large numeric or fixed-structure data.

## Alternatives
- Linked list: frequent middle inserts/deletes, no random access.
- Deque: constant-time append/pop from both ends.
- Balanced tree: sorted data with `O(log n)` search/insert.