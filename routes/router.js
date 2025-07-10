
import express from 'express'
import countries from './countries.route.js'
import users from './users.route.js'
import userVisitedCountries from './userVisitedCountries.route.js'


const router = express.Router()

// country Details
router.use('/countries', countries)
router.use('/users', users)
router.use('/user-visited-countries', userVisitedCountries)


export default router;

