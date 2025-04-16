const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

  return {
    title: maxBlog.title,
    author: maxBlog.author,
    likes: maxBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorsArray = _.map(groupedByAuthor, (blogs, author) => ({
    author, blogs: blogs.length
  }))

  return _.maxBy(authorsArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const authorsArray = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }))

  return _.maxBy(authorsArray, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}