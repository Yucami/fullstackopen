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

test.only('a valid blog can be added ', async () => {
    const newBlog = {
        title: "Reina Roja",
        author: "Juan Gómez-Jurado",
        url: "https://juangomezjurado.com/libro/reina-roja/",
        likes: 11,
        id: "67e409a42cc8d11e96ebc93f"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('Reina Roja'))
})

test.only('if the likes property is missing from the request, it will default to 0', async () => {
    const newBlog = {
        title: "La novia gitana",
        author: "Carmen Mola",
        url: "https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi",
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(response.body.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})