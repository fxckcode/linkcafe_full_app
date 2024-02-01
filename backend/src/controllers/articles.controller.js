import { pool } from "../database/connection.js";

export const getArticles = async (req, res) => {
    try {
        const [result] = await pool.query('select a.*, u.nombre_completo from articulos as a join usuarios u on u.id = a.id_usuario')

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No hay articulos registrados'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const setArticles = async (req, res) => {
    try {
        const { nombre, tipo, enlace, autor, id_usuario } = req.body
        const [result] = await pool.query('insert into articulos(nombre, tipo, enlace, autor, id_usuario ) values (?, ?, ?, ?, ?, ?)', [nombre, tipo, enlace, autor, id_usuario])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Articulo creado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo registrar una nuevo articulo'
            })
        }
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const showArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("select a.*, u.nombre_completo from articulos as a join usuarios u on u.id = a.id_usuario where a.id=?", [id])

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No existe un articulo con ese ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const updateArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, enlace, autor, id_usuario } = req.body
        const [oldArticle] = await pool.query("select * from articulos where id=?", [id])
        const [result] = await pool.query(`update articulos set 
                                                nombre='${nombre ? nombre : oldArticle[0].nombre}',
                                                tipo='${tipo ? tipo : parseInt(oldArticle[0].tipo)}',
                                                enlace='${enlace ? enlace : oldArticle[0].enlace}',
                                                autor='${autor ? autor : oldArticle[0].autor}',
                                                id_usuario=${id_usuario ? id_usuario : parseInt(oldArticle[0].id_usuario)}
                                                where id=?`, [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Articulo actualizado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se puedo actualizar el articulo'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const deleteArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("delete from articulos where id=?", [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Articulo eliminado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo eliminar el articulo'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}