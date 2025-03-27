const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test.only('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('the unique identifier property og the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body.length > 0, 'No blogs found')

    const firstBlog = response.body[0]

    assert.ok(firstBlog.id, 'Property id is missing')

    assert.strictEqual(firstBlog._id, undefined, 'Property _id should not exist')
})

after(async () => {
    await mongoose.connection.close()
})