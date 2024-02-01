import { pool } from "../database/connection.js";

export const getComments = async (req, res) => {
    try {
        const [result] = await pool.query('select c.*, u.nombre_completo from comentarios as c join usuarios u on u.id = c.id_usuario')

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No hay comentarios registrados'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const setComments = async (req, res) => {
    try {
        const { comentario, id_usuario, id_publicacion } = req.body
        const [result] = await pool.query('insert into comentarios(comentario, id_usuario, id_publicacion) values (?, ?, ?)', [comentario, id_usuario, id_publicacion])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Comentario creado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo registrar un nuevo comentario'
            })
        }
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const showCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select c.*, u.nombre_completo from comentarios as c join usuarios u on u.id = c.id_usuario where c.id=?', [id])

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No existe un comentario con ese ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const updateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario, id_usuario, id_publicacion } = req.body
        const [oldComment] = await pool.query('select * from comentarios where id=?', [id])
        const [result] = await pool.query(`update comentarios set 
                                                comentario='${comentario ? comentario : oldComment[0].comentario}',
                                                id_usuario=${id_usuario ? id_usuario : parseInt(oldComment[0].id_usuario)},
                                                id_publicacion=${id_publicacion ? id_publicacion : oldComment[0].id_publicacion}
                                                where id=?`, [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Comentario actualizado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo actualizar el comentario'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('delete from comentarios where id=?', [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Comentario eliminado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo eliminar el comentario'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}