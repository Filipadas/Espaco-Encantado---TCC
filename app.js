import express from "express";
import categoriasRoutes from "./routes/categoriasRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos (CSS, imagens, scripts)
app.use(express.static("."));

// Usar rotas de categorias
app.use("/categorias", categoriasRoutes);

app.get("/", (req, res) => {
    res.sendFile("./pages/index.html", { root: "." });
});

app.get("/login", (req, res) => {
    res.sendFile("./pages/login.html", { root: "." });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
