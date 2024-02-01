import { Router } from "express";
import { deleteArticleById, getArticles, setArticles, showArticleById, updateArticleById } from "../controllers/articles.controller.js";

const router = Router()

router.get('/articles', getArticles)
router.post('/articles', setArticles)
router.get('/articles/:id', showArticleById)
router.put('/articles/:id', updateArticleById)
router.delete('/articles/:id', deleteArticleById)


export default router