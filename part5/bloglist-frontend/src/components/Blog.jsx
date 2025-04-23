import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}&nbsp;
        <button onClick={toggleDetails}>
          {visible ? 'hide' : 'view'} details
        </button>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}&nbsp;
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={() => handleDelete(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog