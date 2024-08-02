const { Router } = require('express')

const router = Router()

router.get('/', (req, res, next) => {
    res.json("post route")
})

module.exports = router