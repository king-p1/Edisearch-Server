import {Router} from 'express'
import { createFavoriteRecipe,fetchFavoriteRecipe,deleteFavoriteRecipe } from '../controllers/recipe-controller.js'

const router = Router()

router.get('/add-favorite/:userId',fetchFavoriteRecipe)
router.post('/add-favorite',createFavoriteRecipe)
router.delete('/remove-favorite/:userId/:recipeId',deleteFavoriteRecipe)


export default router