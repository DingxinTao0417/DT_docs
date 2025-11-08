# Stacks

A stack is a Last-In-First-Out (LIFO) data structure. Elements are added to the top (push) and removed from the top (pop). Stacks are central to parsing, backtracking, and function call management.

## Operations and Complexity
- Push: `O(1)`.
- Pop: `O(1)`.
- Peek/top: `O(1)`.
- Size/empty checks: `O(1)`.

## Python Example (balanced parentheses)

```python
from typing import List

def is_balanced_parentheses(s: str) -> bool:
    """
    Check if the parentheses/brackets/braces in a string are balanced.

    Args:
        s: Input string containing parentheses characters.

    Returns:
        True if balanced, False otherwise.
    """
    stack: List[str] = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in ')]}':
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return len(stack) == 0


# Usage
assert is_balanced_parentheses("([]{})") is True
assert is_balanced_parentheses("([)]") is False
```

## JavaScript Example (basic stack)

```js
/**
 * Simple stack using an array.
 */
class Stack {
  constructor() {
    this._data = [];
  }

  /**
   * Push a value onto the stack in O(1).
   * @param {*} value
   * @returns {void}
   */
  push(value) {
    this._data.push(value);
  }

  /**
   * Pop the top value in O(1).
   * @returns {*|undefined}
   */
  pop() {
    return this._data.pop();
  }

  /**
   * Read the top value without removing it in O(1).
   * @returns {*|undefined}
   */
  peek() {
    return this._data.length ? this._data[this._data.length - 1] : undefined;
  }

  /**
   * @returns {boolean} Whether the stack is empty.
   */
  isEmpty() {
    return this._data.length === 0;
  }
}

// Usage
const st = new Stack();
st.push('A');
st.push('B');
console.log(st.peek()); // 'B'
console.log(st.pop());  // 'B'
console.log(st.pop());  // 'A'
```

## Pitfalls and Tips
- Avoid unbounded growth; enforce limits or monitor size.
- For recursion-heavy tasks, consider converting to an explicit stack to avoid call-stack overflow.

## When to Use
- Parsing and expression evaluation (e.g., postfix/infix conversion).
- Undo/redo functionality.
- Depth-first search (DFS) and backtracking problems.