# Linked Lists

A linked list is a sequence of nodes where each node holds data and a reference to the next node (and optionally to the previous node in doubly linked lists). Linked lists excel at constant-time insertions and deletions at known positions without shifting elements.

## Variants
- Singly linked list: node → next.
- Doubly linked list: node ↔ next/prev; easier bidirectional traversal at extra memory cost.
- Circular list: last node references the head.

## Complexity
- Access by index: `O(n)` (no random access).
- Insert/delete at head: `O(1)`.
- Insert/delete at known node: `O(1)` once node is found.
- Search: `O(n)`.

## Python Implementation

```python
from typing import Optional, Any

class Node:
    """
    List node holding a value and reference to the next node.

    Attributes:
        value: Data stored in the node.
        next: Reference to the next node or None.
    """
    def __init__(self, value: Any):
        self.value = value
        self.next: Optional[Node] = None


class LinkedList:
    """
    Singly linked list with head pointer.

    Methods:
        push_front(value): Insert at head in O(1).
        pop_front(): Remove head in O(1), returns value or None.
        find(target): Return first node with value == target, else None.
    """
    def __init__(self):
        self.head: Optional[Node] = None

    def push_front(self, value: Any) -> None:
        node = Node(value)
        node.next = self.head
        self.head = node

    def pop_front(self) -> Optional[Any]:
        if not self.head:
            return None
        val = self.head.value
        self.head = self.head.next
        return val

    def find(self, target: Any) -> Optional[Node]:
        cur = self.head
        while cur:
            if cur.value == target:
                return cur
            cur = cur.next
        return None


# Usage
ll = LinkedList()
ll.push_front(3)
ll.push_front(2)
ll.push_front(1)  # List: 1 -> 2 -> 3
node = ll.find(2)  # O(n) search
removed = ll.pop_front()  # O(1)
```

## JavaScript Implementation

```js
/**
 * Node in a singly linked list.
 * @constructor
 * @param {*} value - Data stored in the node.
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

/**
 * Singly linked list with head pointer.
 */
class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * Insert a value at the head in O(1).
   * @param {*} value
   * @returns {void}
   */
  pushFront(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  /**
   * Remove the head and return its value in O(1).
   * @returns {*|null}
   */
  popFront() {
    if (!this.head) return null;
    const val = this.head.value;
    this.head = this.head.next;
    return val;
  }

  /**
   * Find the first node holding target value, or null.
   * @param {*} target
   * @returns {Node|null}
   */
  find(target) {
    let cur = this.head;
    while (cur) {
      if (cur.value === target) return cur;
      cur = cur.next;
    }
    return null;
  }
}

// Usage
const ll = new LinkedList();
ll.pushFront(3);
ll.pushFront(2);
ll.pushFront(1); // 1 -> 2 -> 3
const node = ll.find(2);
const removed = ll.popFront();
```

## Pitfalls and Tips
- No random access; iterating to position `k` costs `O(k)`.
- Watch for null pointer mistakes when manipulating `next/prev`.
- Doubly linked lists ease deletion of non-head nodes at the cost of memory.

## When to Use
- Frequent insertions/deletions in the middle/head without random access needs.
- Unpredictable sizes or memory fragmentation concerns.
- Implementing stacks/queues with stable `O(1)` end operations.