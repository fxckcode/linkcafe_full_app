import { pool } from "../database/connection.js";

export const getPublications = async (req, res) => {
    try {
        const [result] = await pool.query('select p.*, u.nombre_completo from publicaciones as p join usuarios as u on p.id_usuario = u.id')

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No hay publicaciones registradas'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const setPublications = async (req, res) => {
    try {
        const { nombre, descripcion, imagen, fuentes, tipo, id_usuario } = req.body
        const [result] = await pool.query('insert into publicaciones(nombre, descripcion, imagen, fuentes, tipo, id_usuario) values (?, ?, ?, ?, ?, ?)', [nombre, descripcion, imagen, fuentes, tipo, id_usuario])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Publicaciones creadas con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo registrar una nueva publicación'
            })
        }
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const showPublicationsById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select p.*, u.nombre_completo from publicaciones as p join usuarios as u on p.id_usuario = u.id where id=?', [id])

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No existe una publicación con ese ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const updatePublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, imagen, fuentes, tipo, id_usuario } = req.body
        const [oldPublication] = await pool.query('select * from publicaciones where id=?', [id])
        const [result] = await pool.query(`update publicaciones set 
                                                nombre='${nombre ? nombre : oldPublication[0].nombre}',
                                                descripcion='${descripcion ? descripcion : oldPublication[0].descripcion}',
                                                imagen='${imagen ? imagen : oldPublication[0].imagen}',
                                                fuentes='${fuentes ? fuentes : oldPublication[0].fuentes}',
                                                tipo='${tipo ? tipo : oldPublication[0].tipo}',
                                                id_usuario=${id_usuario ? id_usuario : parseInt(oldPublication[0].id_usuario)}
                                                where id=?`, [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Publicación actualizada con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se puedo actualizar la publicación'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const deletePublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('delete from publicaciones where id=?', [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Publicación eliminada con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo eliminar la publicación'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}