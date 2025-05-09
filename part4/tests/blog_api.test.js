const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

let token

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    token = await helper.getTokenForUser(api, {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    })
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the unique identifier property og the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body.length > 0, 'No blogs found')

    const firstBlog = response.body[0]

    assert.ok(firstBlog.id, 'Property id is missing')

    assert.strictEqual(firstBlog._id, undefined, 'Property _id should not exist')
  })

  describe('adding a new blog', () => {
    test('a valid blog with valid token ', async () => {
      const newBlog = {
        title: 'titulo prueba',
        url: 'https://www.google.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('titulo prueba'))
    })

    test('adding a blog fails with 401 Unauthorized if token is missing', async () => {
      const newBlog = {
        title: 'Reina Roja',
        author: 'Juan Gómez-Jurado',
        url: 'https://juangomezjurado.com/libro/reina-roja/',
        likes: 11
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if the likes property is missing from the request, it will default to 0', async () => {
      const newBlog = {
        title: 'La novia gitana',
        author: 'Carmen Mola',
        url: 'https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi'
      }
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('if the title and url properties are missing, the backend responds with 400 Bad Request', async () => {
      const newBlogWithoutTitle = {
        author: 'Anonimo',
        url: 'https://www.anonimo.com',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutTitle)
        .expect(400)

      const newBlogWithoutUrl = {
        title: 'Sin url',
        author: 'Anonimo',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogWithoutUrl)
        .expect(400)
    })
  })

  describe('delection of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {

      const newBlog = {
        title: 'Blog a aliminar',
        author: 'Autor',
        url: 'https://www.delete.com',
        likes: 2
      }

      const postResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)

      const blogToDelete = postResponse.body


      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '1234asdf'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  describe('updating a blog', () => {
    test('a blog can be updated with likes', async () => {
      const initialBlog = await Blog.findOne({ title: 'Todo esto te daré' })
      const updatedBlog = { likes: 333 }

      const response = await api
        .put(`/api/blogs/${initialBlog.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, updatedBlog.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})