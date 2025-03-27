const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs

describe('Author with the most blogs', () => {
    test('should return the author with the most blogs', () => {

        const blogs = [
            { "title": "La novia gitana", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi", "likes": 0, "id": "67e18bcd829879ba2429f85e" },
            { "title": "La red púrpura", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-la-red-purpura-serie-inspectora-elena-blanco-2/9788420435572/9083578?srsltid=AfmBOoqQCKr3ANPeEwoE8P6MVWvse7BdWCeJBw_oOVHRNoaUHszwLjDS", "likes": 0, "id": "67e243c22beda9a2b6083b59" },
            { "title": "La nena", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-la-nena-la-nuvia-gitana-3/9788419394538/16182006", "likes": 0, "id": "67e26343284ba5bf487941b9" },
            { "title": "Las madres", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-las-madres-la-novia-gitana-4/9788420456027/578578?srsltid=AfmBOoo8119grLCu7pjxThFoc2BGFt886nUDKP-Yh0cLe98rddRvyl7a", "likes": 0, "id": "67e2a8698d1009104e58711f" },
            { "title": "El Paciente", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/el-paciente/", "likes": 6, "id": "67e4093e2cc8d11e96ebc93b" },
            { "title": "Cicatriz", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/cicatriz/", "likes": 4, "id": "67e4097f2cc8d11e96ebc93d" },
            { "title": "Reina Roja", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/reina-roja/", "likes": 11, "id": "67e409a42cc8d11e96ebc93f" },
            { "title": "Loba Negra", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/loba-negra/", "likes": 9, "id": "67e409e72cc8d11e96ebc941" },
            { "title": "Rey Blanco", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/rey-blanco/", "likes": 7, "id": "67e40a142cc8d11e96ebc943" },
            { "title": "Todo arde", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/todo-arde/", "likes": 4, "id": "67e40a4b2cc8d11e96ebc945" },
            { "title": "Todo vuelve", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/todo-vuelve", "likes": 6, "id": "67e40a682cc8d11e96ebc947" },
            { "title": "Todo muere", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/todo-muere/", "likes": 8, "id": "67e40a892cc8d11e96ebc949" },
            { "title": "Los privilegios del ángel", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-los-privilegios-del-angel/", "likes": 8, "id": "67e40b292cc8d11e96ebc94b" },
            { "title": "Ofrenda a la tormenta", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-ofrenda-a-la-tormenta/", "likes": 9, "id": "67e40b4c2cc8d11e96ebc94d" },
            { "title": "Legado en los huesos", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-legado-en-los-huesos/", "likes": 10, "id": "67e40b742cc8d11e96ebc94f" },
            { "title": "El guardián invisible", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-el-guardian-invisible/", "likes": 7, "id": "67e40b972cc8d11e96ebc951" },
            { "title": "Todo esto te daré", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-todo-esto-te-dare/", "likes": 11, "id": "67e40bb92cc8d11e96ebc953" },
            { "title": "La cara norte del corazón", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-la-cara-norte-del-corazon/", "likes": 16, "id": "67e40bdd2cc8d11e96ebc955" },
            { "title": "Arderá el viento", "author": "Guillermo Saccomanno", "url": "https://www.casadellibro.com/libro-ardera-el-viento/9788410496231/16660507?srsltid=AfmBOoqqTCAvpbfqZCBS1OgqPC7riDI1QUqp6Lld7OLhfTSuQnlc6FZa", "likes": 12, "id": "67e40c602cc8d11e96ebc957" },
            { "title": "Los alemanes", "author": "Sergio del Molino", "url": "https://www.amazon.es/alemanes-Premio-Alfaguara-novela-Hisp%C3%A1nica/dp/842047682X", "likes": 13, "id": "67e40cbc2cc8d11e96ebc959" },
            { "title": "La piel", "author": "Sergio del Molino", "url": "https://www.amazon.es/piel-Sergio-del-Molino-ebook/dp/B085ZQ632P?ref_=ast_author_dp&dib=eyJ2IjoiMSJ9.P_edkcWi-5kX2r0wQzDSy3dTrb2TIPWPN3AsHKE2pw4UITyiYXH5JchKQPz56SvpBekxl4zxG0r6Q8_QBpwVCwBGKTlzIbTbODbyQaxKToksjryfqew6zaQyM0lL0RTEAlDOCfFiBxY6rs9Oz2DlvipWx2ea_bvIxYj-IFwUeJOAYnXR1uvPuznXarELVUPLulA_E9lOAp02qyTboCjFlZ1B-PgHk64k-2F7c8lyu2r_J0_aIUu7c8T53g", "likes": 0, "id": "67e40cfe2cc8d11e96ebc95b" }
        ];

        const result = mostBlogs(blogs)

        assert.deepStrictEqual(result, {
            author: "Juan Gómez-Jurado",
            blogs: 8
        })
    })
})
