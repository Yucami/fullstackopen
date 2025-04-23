import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog({
            title, 
            author, 
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create new blog</h2>
            <div>
                título:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm