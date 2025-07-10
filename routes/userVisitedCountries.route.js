import express from 'express'
import { createUserVisitedCountries, getSpecificUserVisitedCountries, getUserVisitedCountries } from '../controllers/userVisitedCountries.controller.js'

const router = express.Router()

router.get('/', getUserVisitedCountries)
router.get('/:id', getSpecificUserVisitedCountries)
router.post('/', createUserVisitedCountries)

export default router