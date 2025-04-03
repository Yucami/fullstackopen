const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const users = await User.find({})
    if (users.length === 0) {
        return response.status(400).json({ error: 'No users found' })
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ error: 'Invalid blog ID' })
    }

    const blog = await Blog.findById(id)
    if (!blog) {
        return response.status(404).send({ error: 'Blog not found' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid'})
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
        return response.status(403).json({ error: 'only the creator can delete the blog' })
    }

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).send({ error: 'Blog not found' })
    }

    blog.likes = likes !== undefined ? likes : blog.likes
    
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogsRouter