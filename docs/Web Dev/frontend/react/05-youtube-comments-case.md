# 5 Youtube Comments Case

A small case to manage a comments list: show, add, delete, and count.

## Goals
- Render a comments list with author, content, and timestamp
- Add new comments via a controlled form
- Delete comments by id
- Derive metrics (e.g., total count)

## Outline
- State: `comments` array in a parent component
- Add: form inputs bound to state; on submit, push a new item
- Delete: filter by id
- Render: `map` list with stable `key`

```jsx
function CommentsApp(){
  const [comments, setComments] = React.useState([
    {id: 1, author: 'Alice', content: 'Nice!', ts: Date.now()},
  ])

  const addComment = (author, content) => {
    setComments(prev => [
      ...prev,
      {id: crypto.randomUUID(), author, content, ts: Date.now()}
    ])
  }

  const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <b>{c.author}</b>: {c.content}
            <button onClick={() => deleteComment(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <CommentForm onSubmit={addComment} />
    </div>
  )
}
```