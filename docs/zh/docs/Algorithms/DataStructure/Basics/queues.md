# Queues

A queue is a First-In-First-Out (FIFO) data structure. Elements are added at the tail (enqueue) and removed from the head (dequeue). Queues model real-world pipelines and are used in scheduling, BFS, and buffering.

## Operations and Complexity
- Enqueue: add to tail — `O(1)`.
- Dequeue: remove from head — `O(1)`.
- Peek: read head without removing — `O(1)`.
- Size/empty checks — `O(1)`.

Implementation notes:
- Arrays with `shift()` are `O(n)` per dequeue; prefer head/tail indices or linked lists.
- Deques provide efficient double-ended operations.

## Python Example (deque)

```python
from collections import deque
from typing import Deque, Any

def bfs_queue_usage() -> None:
    """
    Demonstrate a basic FIFO queue using collections.deque.

    Args:
        None.

    Returns:
        None. Prints operations to stdout.
    """
    q: Deque[Any] = deque()
    q.append('task1')  # enqueue
    q.append('task2')
    q.append('task3')

    head = q[0]        # peek O(1)
    print('peek:', head)

    while q:
        current = q.popleft()  # dequeue O(1)
        print('processing:', current)


# Usage
bfs_queue_usage()
```

## JavaScript Example (index-based array)

```js
/**
 * Queue implemented with a grow-only array and head index.
 * Avoids O(n) shift by moving a head pointer.
 */
class Queue {
  constructor() {
    this._data = [];
    this._head = 0;
  }

  /**
   * Add an element at the tail in O(1).
   * @param {*} value
   * @returns {void}
   */
  enqueue(value) {
    this._data.push(value);
  }

  /**
   * Remove and return the head element in O(1).
   * @returns {*|undefined}
   */
  dequeue() {
    if (this.isEmpty()) return undefined;
    const val = this._data[this._head];
    this._head += 1;
    // Periodically compact to avoid memory bloat
    if (this._head > 64 && this._head * 2 > this._data.length) {
      this._data = this._data.slice(this._head);
      this._head = 0;
    }
    return val;
  }

  /**
   * Read head element without removing it in O(1).
   * @returns {*|undefined}
   */
  peek() {
    return this.isEmpty() ? undefined : this._data[this._head];
  }

  /**
   * @returns {boolean} Whether the queue is empty.
   */
  isEmpty() {
    return this._head >= this._data.length;
  }
}

// Usage
const q = new Queue();
q.enqueue('task1');
q.enqueue('task2');
q.enqueue('task3');
console.log('peek:', q.peek());
while (!q.isEmpty()) {
  console.log('processing:', q.dequeue());
}
```

## Pitfalls and Tips
- Avoid `Array.shift()` in performance-sensitive code; use head index.
- For bounded queues, track size and reject when full.
- Consider `deque` for double-ended needs.

## When to Use
- Breadth-first search (BFS).
- Task scheduling, producer-consumer pipelines.
- Buffering I/O with order preservation.