import { Router } from "express";

const router = Router();

// Rota principal de categorias
router.get("/", (req, res) => {
    res.sendFile("./pages/categorias.html", { root: "." });
});

// Rotas de Decoração
router.get("/decoracao", (req, res) => {
    res.sendFile("./pages/decoração.html", { root: "." });
});

router.get("/decoracao/aniversario", (req, res) => {
    res.sendFile("./pages/aniversario.html", { root: "." });
});

router.get("/decoracao/formatura", (req, res) => {
    res.sendFile("./pages/formatura.html", { root: "." });
});

router.get("/decoracao/casamento", (req, res) => {
    res.sendFile("./pages/casamento.html", { root: "." });
});

// Rotas de Brinquedos
router.get("/brinquedos", (req, res) => {
    res.sendFile("./pages/brinquedos.html", { root: "." });
});

// Rotas de Salão
router.get("/salao", (req, res) => {
    res.sendFile("./pages/salao.html", { root: "." });
});

export default router;
