const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    response.status(201).json(savedBlog)
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