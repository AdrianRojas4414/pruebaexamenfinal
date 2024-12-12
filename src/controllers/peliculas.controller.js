import {pool} from "../db.js";

export const getPeliculas   = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM peliculas');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({message: 'Error al obtener las películas'});
    }
}
    

export const getPelicula    = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', id);

        if (rows.length === 0) {
            return res.status(500).json({ message: 'Película no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({message: 'Error al obtener la película'});
    }
}


export const createPelicula = async (req, res) => {
    try {
        const title = req.body.title;
        const runtime = req.body.runtime;

        if (!title || !runtime) {
            return res.status(500).json({ message: 'Datos incompletos' });
        }

        const [result] = await pool.query(
            'INSERT INTO peliculas (title, runtime) VALUES (?, ?)',
            [title, runtime]
        );

        res.json({ id: result.insertId, title, runtime});
    } catch (error) {
        return res.status(500).json({message: 'Error al crear la película'});
    }
}


export const updatePelicula = async (req, res) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const runtime = req.body.runtime;

        const [result] = await pool.query(
            'UPDATE peliculas SET title = IFNULL(?, title), runtime = IFNULL(?, runtime) WHERE id = ?',
            [title, runtime, id]
        );

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Pelicula no encontrada' });
        }

        const [rows] = await pool.query('SELECT * FROM peliculas WHERE id = ?', id);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({message: 'Error al actualizar la pelicula'});
    }
}


export const deletePelicula = async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await pool.query('DELETE FROM peliculas WHERE id = ?', id);

        if (result.affectedRows === 0) {
            return res.status(500).json({ message: 'Película no encontrada' });
        }

        res.json({ message: 'Película eliminada exitosamente' });
    } catch (error) {
        return res.status(500).json({message: 'Error al eliminar la película'});
    }
}