const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes

describe('Total likes', () => {
  const listWithOneBlog = [
    {
      'title': 'La novia gitana',
      'author': 'Carmen Mola',
      'url': 'https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi',
      'likes': 5,
      'id': '67e18bcd829879ba2429f85e'
    }
  ]

  const listWithMultipleBlogs = [
    {
      'title': 'La novia gitana',
      'author': 'Carmen Mola',
      'url': 'https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi',
      'likes': 5,
      'id': '67e18bcd829879ba2429f85e'
    },
    {
      'title': 'La red púrpura',
      'author': 'Carmen Mola',
      'url': 'https://www.casadellibro.com/libro-la-red-purpura-serie-inspectora-elena-blanco-2/9788420435572/9083578?srsltid=AfmBOoqQCKr3ANPeEwoE8P6MVWvse7BdWCeJBw_oOVHRNoaUHszwLjDS',
      'likes': 3,
      'id': '67e243c22beda9a2b6083b59'
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of all likes', () => {
    const result = totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 8)
  })

  test('when list is empty, equals zero', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })
})