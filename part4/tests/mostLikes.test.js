const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper.test').mostLikes

describe('Author with most likes', () => {
    test('should return the author with the most likes', () => {

        const blogs = [
            { "title": "La novia gitana", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-la-novia-gitana-serie-inspectora-elena-blanco-1/9788420433189/6409431?srsltid=AfmBOoqt2fJGYowvpuwLvznOrZiW2EuCt6flIza-ppu0fB9L-lskzeSi", "likes": 0, "id": "67e18bcd829879ba2429f85e" },
            { "title": "La nena", "author": "Carmen Mola", "url": "https://www.casadellibro.com/libro-la-nena-la-nuvia-gitana-3/9788419394538/16182006", "likes": 0, "id": "67e26343284ba5bf487941b9" },
            { "title": "El Paciente", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/el-paciente/", "likes": 6, "id": "67e4093e2cc8d11e96ebc93b" },
            { "title": "Cicatriz", "author": "Juan Gómez-Jurado", "url": "https://juangomezjurado.com/libro/cicatriz/", "likes": 4, "id": "67e4097f2cc8d11e96ebc93d" },
            { "title": "Todo esto te daré", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-todo-esto-te-dare/", "likes": 11, "id": "67e40bb92cc8d11e96ebc953" },
            { "title": "La cara norte del corazón", "author": "Dolores Redondo", "url": "https://www.doloresredondo.com/item/novela-la-cara-norte-del-corazon/", "likes": 16, "id": "67e40bdd2cc8d11e96ebc955" },
            { "title": "Los alemanes", "author": "Sergio del Molino", "url": "https://www.amazon.es/alemanes-Premio-Alfaguara-novela-Hisp%C3%A1nica/dp/842047682X", "likes": 13, "id": "67e40cbc2cc8d11e96ebc959" },
            { "title": "La piel", "author": "Sergio del Molino", "url": "https://www.amazon.es/piel-Sergio-del-Molino-ebook/dp/B085ZQ632P?ref_=ast_author_dp&dib=eyJ2IjoiMSJ9.P_edkcWi-5kX2r0wQzDSy3dTrb2TIPWPN3AsHKE2pw4UITyiYXH5JchKQPz56SvpBekxl4zxG0r6Q8_QBpwVCwBGKTlzIbTbODbyQaxKToksjryfqew6zaQyM0lL0RTEAlDOCfFiBxY6rs9Oz2DlvipWx2ea_bvIxYj-IFwUeJOAYnXR1uvPuznXarELVUPLulA_E9lOAp02qyTboCjFlZ1B-PgHk64k-2F7c8lyu2r_J0_aIUu7c8T53g", "likes": 0, "id": "67e40cfe2cc8d11e96ebc95b" }
        ];

        const result = mostLikes(blogs)

        assert.deepStrictEqual(result, {
            author: "Dolores Redondo",
            likes: 27
        })
    })
})
