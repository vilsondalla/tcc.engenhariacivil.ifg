# Sistema de Avaliação TCC I - IFG Uruaçu

## 📋 Estrutura do Projeto para Vercel

```
seu-repositorio/
├── index.html
├── app.js
└── README.md
```

## 🚀 Como fazer Deploy no Vercel via GitHub

### Passo 1: Criar repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde)
3. Dê um nome ao repositório (ex: `tcc-avaliacao-ifg`)
4. Marque como **Public** ou **Private** (sua escolha)
5. **NÃO** marque "Add a README file"
6. Clique em **"Create repository"**

### Passo 2: Adicionar os arquivos

**Opção A - Pelo site do GitHub (mais fácil):**

1. Na página do repositório criado, clique em **"uploading an existing file"**
2. Arraste os arquivos `index.html` e `app.js`
3. Clique em **"Commit changes"**

**Opção B - Via linha de comando (se você usa Git):**

```bash
git init
git add index.html app.js
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Passo 3: Conectar com Vercel

1. Acesse [Vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório que você criou
4. Clique em **"Import"**
5. **Configure as seguintes opções:**
   - **Framework Preset:** Selecione `Other` (ou deixe vazio)
   - **Build Command:** Deixe vazio
   - **Output Directory:** Deixe vazio
   - **Install Command:** Deixe vazio

6. Clique em **"Deploy"**

### Passo 4: Aguardar Deploy

- O Vercel vai fazer o deploy automaticamente (leva ~1 minuto)
- Quando terminar, você receberá uma URL tipo: `https://seu-projeto.vercel.app`
- Pronto! Seu sistema está no ar! 🎉

## 🔄 Atualizações Automáticas

Agora toda vez que você fizer alterações no GitHub:

1. Edite os arquivos diretamente no GitHub OU
2. Faça `git push` se estiver usando linha de comando
3. O Vercel detecta automaticamente e faz novo deploy

## ✅ Principais Correções Feitas

### ❌ Problemas Corrigidos:

1. **`tccList` duplicado** - Estava definido 2 vezes no código
2. **Falta do arquivo HTML** - Necessário para o Vercel funcionar
3. **Imports do React incorretos** - Ajustados para funcionar no HTML
4. **Try-catch no localStorage** - Adicionado tratamento de erros
5. **URL do Google Script** - Corrigida (estava com `/a/` desnecessário)

### ✨ Melhorias Implementadas:

- Estrutura otimizada para Vercel
- localStorage com tratamento de erros
- Código mais limpo e organizado
- Funciona 100% no navegador

## 🔧 Testando Localmente (Opcional)

Se quiser testar antes de fazer deploy:

1. Salve os arquivos `index.html` e `app.js` na mesma pasta
2. Abra o arquivo `index.html` no navegador
3. O sistema deve funcionar normalmente

## 📝 Notas Importantes

- **localStorage:** Os dados ficam salvos no navegador de cada professor
- **Google Sheets:** A integração com planilhas está configurada no código
- **Responsivo:** Funciona em desktop, tablet e celular
- **Sem banco de dados:** Não precisa de backend ou servidor

## 🐛 Solução de Problemas

**Se a tela ficar branca:**
- Abra o DevTools (F12) → aba Console
- Veja se há erros em vermelho
- Se houver, copie e me envie

**Se não carregar no Vercel:**
- Verifique se os arquivos estão na raiz do repositório
- Confirme que o Framework Preset está como "Other"

## 📞 Suporte

Se tiver qualquer problema, me envie:
1. Print da tela de erro
2. Mensagem do Console (F12)
3. URL do seu deploy no Vercel

---

**Desenvolvido para:** IFG Câmpus Uruaçu - Engenharia Civil  
**Data do Seminário:** 03/12/2025 às 16:30 - Sala 401
