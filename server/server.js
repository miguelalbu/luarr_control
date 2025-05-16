const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const produtosRouter = require('./routes/produtos');
const despesasRouter = require('./routes/despesas')
const dashboardRoutes = require('./routes/dashboard')
const relatoriosRoutes = require("./routes/relatorios");
const vendasRoutes = require("./routes/vendas");

app.use(cors());
app.use(express.json());

// Rota da API
app.use('/api/produtos', produtosRouter);
app.use('/api/despesas', despesasRouter);
app.use('/api/dashboard', dashboardRoutes)
app.use("/api/relatorios", relatoriosRoutes);
app.use("/api/vendas", vendasRoutes);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
