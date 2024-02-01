import { Router } from "express";
import { deletePublicationById, getPublications, setPublications, showPublicationsById, updatePublicationById } from "../controllers/publications.controller.js";

const router = Router()

router.get('/publications', getPublications)
router.post('/publications', setPublications)
router.get('/publications/:id', showPublicationsById)
router.put('/publications/:id', updatePublicationById)
router.delete('/publications/:id', deletePublicationById)

export default router