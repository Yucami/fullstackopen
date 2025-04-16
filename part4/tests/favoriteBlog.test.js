const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('Favorite blog', () => {
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
    },
    {
      'title': 'La nena',
      'author': 'Carmen Mola',
      'url': 'https://www.casadellibro.com/libro-la-nena-la-nuvia-gitana-3/9788419394538/16182006',
      'likes': 10,
      'id': '67e26343284ba5bf487941b9'
    }
  ]

  test('when list has only one blog, it is the favorite', () => {
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      'title': 'La novia gitana',
      'author': 'Carmen Mola',
      'likes': 5
    })
  })

  test('when list has multiple blogs, return the one with most likess', () => {
    const result = favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      'title': 'La nena',
      'author': 'Carmen Mola',
      'likes': 10
    })
  })

  test('when list is empty, return null', () => {
    const result = favoriteBlog([])
    assert.strictEqual(result, null)
  })
})