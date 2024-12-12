import {Router} from 'express'
import {
    getPelicula,
    getPeliculas,
    updatePelicula,
    deletePelicula,
    createPelicula
}from "../controllers/peliculas.controller.js";

const router = Router();

router.get('/peliculas', getPeliculas)
router.get('/peliculas/:id', getPelicula)
router.post('/peliculas', createPelicula)
router.patch('/peliculas/:id', updatePelicula)
router.delete('/peliculas/:id', deletePelicula)

export default router;