const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota principal
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

## 📄 **ARQUIVO 3: .gitignore**
**(Criar na RAIZ do repositório)**
```
node_modules/
.env
.DS_Store
*.log
