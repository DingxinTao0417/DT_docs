# 15 Article Management System Case

Manage articles (CRUD) with filters and pagination.

- Entities: article { id, title, content, status, tags }
- Views: list, detail, edit form
- Filters: status, tag, keyword
- Persistence: mock API or local storage

```jsx
function ArticleList({ articles, onEdit, onDelete }){
  return (
    <ul>
      {articles.map(a => (
        <li key={a.id}>
          <b>{a.title}</b> [{a.status}]
          <button onClick={() => onEdit(a.id)}>Edit</button>
          <button onClick={() => onDelete(a.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```