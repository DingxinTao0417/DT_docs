# 10 Optimizing the Comments Case

Strategies to improve performance and UX:
- Memoize list items with `React.memo`
- Stable keys and event handlers
- Avoid unnecessary re-renders via state normalization
- Lazy-loading or virtualization for very long lists

```jsx
const CommentItem = React.memo(function CommentItem({ c, onDelete }){
  return (
    <li>
      <b>{c.author}</b>: {c.content}
      <button onClick={() => onDelete(c.id)}>Delete</button>
    </li>
  )
})
```