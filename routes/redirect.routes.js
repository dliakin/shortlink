const { Router } = require('express')
const config = require('config')
const Link = require('../models/Link')
const shortId = require('shortid')

const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code })
        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json("Ссылка не найдена")
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router