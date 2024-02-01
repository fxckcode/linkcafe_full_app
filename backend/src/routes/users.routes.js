import { Router } from "express";
import { deleteUserById, getUsers, setUsers, showUserById, updateUserById } from "../controllers/users.controller.js";

const router = Router()

router.get('/users', getUsers)
router.post('/users', setUsers)
router.get('/users/:id', showUserById)
router.put('/users/:id', updateUserById)
router.delete('/users/:id', deleteUserById)

export default router