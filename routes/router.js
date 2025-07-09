
import express from 'express'
import countries from './countries.route.js'
import users from './users.route.js'

const router = express.Router()

// country Details
router.use('/countries', countries)

router.use('/users', users)

export default router;

