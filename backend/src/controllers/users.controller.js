import { pool } from "../database/connection.js";

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('select * from usuarios')

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No hay usuarios registrados'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const setUsers = async (req, res) => {
    try {
        const { nombre_completo, correo, clave } = req.body
        const [result] = await pool.query('insert into usuarios(nombre_completo, correo, clave) values (?, ?, ?)', [nombre_completo, correo, clave])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Usuario creado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo registrar una nuevo usuario'
            })
        }
    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const showUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("select * from usuarios where id=?", [id])

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                'mensaje': 'No existe un usuario con ese ID'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, correo, clave } = req.body
        const [oldUser] = await pool.query("select * from usuarios where id=?", [id])
        const [result] = await pool.query(`update usuarios set 
                                                nombre_completo='${nombre_completo ? nombre_completo : oldUser[0].nombre_completo} ',
                                                correo='${correo ? correo : oldUser[0].correo}',
                                                clave='${clave ? clave : oldUser[0].clave}'
                                                where id=?`, [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Usuario actualizado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se puedo actualizar el usuario'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query("delete from usuarios where id=?", [id])

        if (result.affectedRows > 0) {
            res.status(200).json({
                'mensaje': 'Usuario eliminado con exito'
            })
        } else {
            res.status(403).json({
                'mensaje': 'No se pudo eliminar el usuario'
            })
        }

    } catch (error) {
        res.status(500).json({
            'mensaje': error
        })
    }
}