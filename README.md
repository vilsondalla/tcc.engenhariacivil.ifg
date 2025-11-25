# Sistema de Avaliação de TCC - IFG Uruaçu

Sistema web para avaliação de Trabalhos de Conclusão de Curso (TCC I) do curso de Engenharia Civil do Instituto Federal de Goiás - Câmpus Uruaçu.

## 📋 Descrição

Este sistema permite que professores avaliem os TCCs tanto na parte escrita quanto na apresentação oral, conforme as normas estabelecidas pela Resolução nº 28/2014 do IFG.

## 🚀 Deploy no Render.com

### Estrutura de Arquivos Necessária
```
tcc.engenhariacivil.ifg/
├── package.json
├── server.js
├── .gitignore
├── README.md
└── public/
    ├── index.html
    └── app.js
```

### Passo a Passo para Deploy

1. **No GitHub:**
   - Certifique-se de que todos os arquivos estão no repositório
   - Faça commit e push de todas as alterações

2. **No Render.com:**
   - Faça login em https://render.com
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub: `tcc.engenhariacivil.ifg`
   - Configure:
     - **Name:** tcc-ifg-uruacu (ou o nome que preferir)
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Clique em "Create Web Service"

3. **Aguarde o deploy** (leva alguns minutos)

4. **Acesse seu site** através da URL fornecida pelo Render

## 🛠️ Tecnologias Utilizadas

- React 18
- Tailwind CSS
- Express.js
- Node.js

## 📝 Funcionalidades

- Login de professor avaliador
- Visualização de instruções e critérios de avaliação
- Seleção de TCC a ser avaliado
- Formulário de avaliação (parte escrita e apresentação)
- Cálculo automático da nota final
- Confirmação de envio da avaliação

## 📧 Suporte

Para dúvidas ou problemas, entre em contato com a coordenação do curso de Engenharia Civil do IFG Uruaçu.

---

Desenvolvido para o Seminário de Qualificação - 03/12/2025
