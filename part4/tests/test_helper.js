const Blog = require('../models/blog')

const initialBlogs = [
    { "title": "Todo esto te daré", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-todo-esto-te-dare/", "likes": 11, "id": "67e40bb92cc8d11e96ebc953" },
    { "title": "La cara norte del corazón", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-la-cara-norte-del-corazon/", "likes": 16, "id": "67e40bdd2cc8d11e96ebc955" },
    { "title": "Arderá el viento", "author": "Guillermo Saccomanno", "url": "https://www.casadellibro.com/libro-ardera-el-viento/9788410496231/16660507?srsltid=AfmBOoqqTCAvpbfqZCBS1OgqPC7riDI1QUqp6Lld7OLhfTSuQnlc6FZa", "likes": 12, "id": "67e40c602cc8d11e96ebc957" },
    { "title": "Los alemanes", "author": "Sergio del Molino", "url": "https://www.amazon.es/alemanes-Premio-Alfaguara-novela-Hisp%C3%A1nica/dp/842047682X", "likes": 13, "id": "67e40cbc2cc8d11e96ebc959" },
    { "title": "La piel", "author": "Sergio del Molino", "url": "https://www.amazon.es/piel-Sergio-del-Molino-ebook/dp/B085ZQ632P?ref_=ast_author_dp&dib=eyJ2IjoiMSJ9.P_edkcWi-5kX2r0wQzDSy3dTrb2TIPWPN3AsHKE2pw4UITyiYXH5JchKQPz56SvpBekxl4zxG0r6Q8_QBpwVCwBGKTlzIbTbODbyQaxKToksjryfqew6zaQyM0lL0RTEAlDOCfFiBxY6rs9Oz2DlvipWx2ea_bvIxYj-IFwUeJOAYnXR1uvPuznXarELVUPLulA_E9lOAp02qyTboCjFlZ1B-PgHk64k-2F7c8lyu2r_J0_aIUu7c8T53g", "likes": 0, "id": "67e40cfe2cc8d11e96ebc95b" }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}