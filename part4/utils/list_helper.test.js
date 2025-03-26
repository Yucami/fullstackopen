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

    console.log("Lista de blogs recibida:", blogs);  // Debugging
    const maxBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

    console.log("Blog con más likes:", maxBlog); // Debugging

    return {
        title: maxBlog.title,
        author: maxBlog.author,
        likes: maxBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}