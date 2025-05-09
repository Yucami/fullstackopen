import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Logged in successfully')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Wrong credentials')
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout  = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logged out successfully')
    setMessageType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      const blogWithUser = {
        ...returnedBlog,
        user: {
          id: user.id,
          name: user.name,
          username: user.username
        }
      }
      setBlogs(blogs.concat(blogWithUser))
      setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Error creating blog:', error)
      setMessage('Error creating blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const renderNotification = () => (
    <Notification message={message} type={messageType} />
  )

  const renderForm = () => (
    <div>
      <h2>Log in to application</h2>
      {renderNotification()}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const renderBlogs = () => (
    <div>
      <h2>blogs</h2>
      {renderNotification()}
      <p>
        {user.name} logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        ))}
    </div>
  )

  const handleLike = async (blogToUpdate) => {
    try {
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      const returnedBlog = await blogService.update(blogToUpdate.id, updatedBlog)
      setBlogs(blogs.map(blog =>
        blog.id === blogToUpdate.id
          ? returnedBlog
          : blog
      ))
    } catch (error) {
      console.error('Error liking blog:', error)
      setMessage('Error liking blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogToDelete) => {
    const confirmDelete = window.confirm(`Delete "${blogToDelete.title}" by ${blogToDelete.author}?`)
    if (!confirmDelete) return

    try {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      setMessage(`Deleted ${blogToDelete.title}`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Error deleting blog:', error)
      setMessage('Error deleting blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ? renderForm() : renderBlogs()}
    </div>
  )
}

export default App