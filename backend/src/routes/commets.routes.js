import { Router } from "express";
import { deleteCommentById, getComments, setComments, showCommentById, updateCommentById } from "../controllers/comments.controller.js";

const router = Router()

router.get('/comments', getComments)
router.post('/comments', setComments)
router.get('/comments/:id', showCommentById)
router.put('/comments/:id', updateCommentById)
router.delete('/comment/:id', deleteCommentById)

export default router