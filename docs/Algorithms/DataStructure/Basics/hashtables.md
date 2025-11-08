# Hash Tables

Hash tables store key–value pairs and provide average `O(1)` time for insertion, lookup, and deletion by hashing keys to bucket indices. Collisions are resolved by strategies like chaining (linked lists per bucket) or open addressing (probing).

## Key Concepts
- Hash function: maps a key to an integer index.
- Buckets: storage slots; multiple entries may share a bucket.
- Collision resolution:
  - Chaining: each bucket holds a list; simple and flexible.
  - Open addressing: probe sequence to find an empty slot; space efficient.
- Load factor: `size / buckets`; rehash when too high to keep `O(1)` operations.

## Complexity
- Average-case get/set/delete: `O(1)`.
- Worst-case (bad hash or heavy collisions): `O(n)`.
- Resize/rehash: `O(n)` when triggered.

## Python Examples

```python
from typing import Any, List, Tuple, Optional

def frequency_count(words: List[str]) -> dict[str, int]:
    """
    Count word frequencies using Python's built-in dict (hash table).

    Args:
        words: List of words to count.

    Returns:
        Mapping from word to count.
    """
    counts: dict[str, int] = {}
    for w in words:
        counts[w] = counts.get(w, 0) + 1
    return counts


class SimpleHashTable:
    """
    A minimal chaining-based hash table for demonstration only.

    Methods:
        put(key, value): Insert or update key.
        get(key): Return value or None.
        delete(key): Remove key if present.
    """
    def __init__(self, capacity: int = 8):
        self._buckets: List[List[Tuple[Any, Any]]] = [[] for _ in range(capacity)]
        self._size = 0

    def _index(self, key: Any) -> int:
        return hash(key) % len(self._buckets)

    def put(self, key: Any, value: Any) -> None:
        idx = self._index(key)
        bucket = self._buckets[idx]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self._size += 1

    def get(self, key: Any) -> Optional[Any]:
        idx = self._index(key)
        bucket = self._buckets[idx]
        for k, v in bucket:
            if k == key:
                return v
        return None

    def delete(self, key: Any) -> bool:
        idx = self._index(key)
        bucket = self._buckets[idx]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self._size -= 1
                return True
        return False


# Usage
table = SimpleHashTable()
table.put('apple', 1)
table.put('banana', 2)
assert table.get('banana') == 2
assert table.delete('apple') is True
```

## JavaScript Examples

```js
/**
 * Count word frequencies using Map (hash table).
 * @param {string[]} words
 * @returns {Map<string, number>} Map from word to count.
 */
function frequencyCount(words) {
  const map = new Map();
  for (const w of words) {
    map.set(w, (map.get(w) || 0) + 1);
  }
  return map;
}

/**
 * Simple chaining-based hash table using arrays.
 * Note: For demonstration; use Map in production for reliability.
 */
class SimpleHashTable {
  constructor(capacity = 8) {
    this._buckets = Array.from({ length: capacity }, () => []);
    this._size = 0;
  }

  /**
   * Compute bucket index for key.
   * @param {*} key
   * @returns {number}
   */
  _index(key) {
    // Basic string hash (djb2-like). For demo only.
    const s = String(key);
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = (h * 33) ^ s.charCodeAt(i);
    }
    return Math.abs(h) % this._buckets.length;
  }

  /**
   * Insert or update key.
   * @param {*} key
   * @param {*} value
   * @returns {void}
   */
  put(key, value) {
    const idx = this._index(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this._size++;
  }

  /**
   * Get value by key.
   * @param {*} key
   * @returns {*|undefined}
   */
  get(key) {
    const idx = this._index(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) return bucket[i][1];
    }
    return undefined;
  }

  /**
   * Delete key.
   * @param {*} key
   * @returns {boolean}
   */
  delete(key) {
    const idx = this._index(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }
}

// Usage
const table = new SimpleHashTable();
table.put('apple', 1);
table.put('banana', 2);
console.assert(table.get('banana') === 2);
console.assert(table.delete('apple') === true);
```

## Pitfalls and Tips
- Choose a robust hash function and maintain a moderate load factor.
- Iteration order is not guaranteed; use arrays for ordered needs.
- Beware of key collisions and probe sequences in open addressing.

## When to Use
- Fast lookups/updates by key (caches, symbol tables).
- Frequency counting and deduplication.
- Indexing items by identifiers.