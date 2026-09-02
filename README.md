# AI Usage Monitor

Ferramenta acadêmica para registro e acompanhamento de uso de Inteligência Artificial em projetos estudantis.

![Status](https://img.shields.io/badge/status-ativo-brightgreen)
![Linguagem](https://img.shields.io/badge/linguagem-HTML%2FCSS%2FJS-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

## 📋 Sobre o Projeto

Este é um sistema de acompanhamento acadêmico que permite que alunos registrem e monitorem onde e como utilizaram Inteligência Artificial durante seus projetos. É composto por:

- **Autenticação segura** via Supabase
- **Formulário intuitivo** para registrar usos de IA
- **Dashboard de análise** com filtros e exportação em PDF
- **Interface moderna** com design glassmorphism

### Funcionalidades principais

- ✅ Registro detalhado de cada uso de IA
- ✅ Múltiplas ferramentas de IA suportadas (ChatGPT, Gemini, Copilot, Claude, etc.)
- ✅ Avaliação de qualidade do resultado
- ✅ Visualização e filtro de registros
- ✅ Exportação de relatórios em PDF
- ✅ Autenticação por email e senha

---

## 🚀 Quick Start (Comece Rápido)

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Git instalado (opcional, para clonar)
- Node.js 16+ (apenas se quiser usar um servidor local com npm)

### 1️⃣ Clonar o Repositório

```bash
# Via HTTPS
git clone https://github.com/BelmontBeta/IA-Formulario.git
cd IA-Formulario

# Ou via SSH
git clone git@github.com:BelmontBeta/IA-Formulario.git
cd IA-Formulario
```

### 2️⃣ Executar o Projeto

Escolha uma das opções abaixo:

#### Opção A: Servidor Python (Recomendado para iniciantes)

```bash
# Python 3.x
python3 -m http.server 8000

# Python 2.x (se necessário)
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

#### Opção B: npm serve

```bash
npm install -g serve
serve .
```

Acesse: `http://localhost:3000`

#### Opção C: Node.js http-server

```bash
npm install -g http-server
http-server
```

Acesse: `http://localhost:8080`

#### Opção D: Abrir diretamente (sem servidor)

Clique duas vezes em `index.html` (funciona, mas alguns recursos podem não funcionar adequadamente)

---

## 🎨 Personalização

### Alterar Cores do Projeto

Todas as cores estão centralizadas no arquivo **`css/global.css`** na seção `:root`. Você pode facilmente personalizá-las:

```css
:root {
  /* Cores de Fundo */
  --bg-primary: #050b16;           /* Fundo principal (escuro) */
  --bg-secondary: #081525;         /* Fundo secundário */
  --bg-card: rgba(10, 24, 44, 0.86);  /* Fundo dos cards */
  --bg-input: #071426;             /* Fundo dos inputs */

  /* Paleta de Azuis */
  --blue-100: #d9f3ff;  /* Azul muito claro */
  --blue-300: #73d9ff;  /* Azul claro */
  --blue-400: #20bfff;  /* Azul médio */
  --blue-500: #008cff;  /* Azul primário */
  --blue-600: #0064d8;  /* Azul escuro */

  /* Cores de Destaque */
  --cyan: #00e5ff;      /* Ciano/Turquesa */
  --green: #28d17c;     /* Verde (sucesso) */
  --yellow: #ffc857;    /* Amarelo (aviso) */
  --red: #ff5577;       /* Vermelho (erro) */

  /* Cores de Texto */
  --text-primary: #f1f7ff;     /* Texto principal (claro) */
  --text-secondary: #91a8c2;   /* Texto secundário */
  --text-muted: #627993;       /* Texto desativado */

  /* Bordas e Sombras */
  --border: rgba(89, 172, 255, 0.22);
  --border-strong: rgba(0, 212, 255, 0.55);

  /* Arredondamento (border-radius) */
  --radius-lg: 24px;   /* Cards e seções grandes */
  --radius-md: 14px;   /* Elementos médios */
  --radius-sm: 9px;    /* Pequenos elementos */
}
```

### Exemplo: Mudar para um tema quente (laranja/vermelho)

```css
:root {
  --blue-500: #ff6b35;      /* Laranja primário */
  --cyan: #ff8c42;          /* Laranja destaque */
  --bg-primary: #1a0f07;    /* Fundo mais quente */
  --bg-secondary: #2a1810;  /* Fundo secundário mais quente */
}
```

### Exemplo: Mudar para um tema verde

```css
:root {
  --blue-500: #10b981;      /* Verde primário */
  --cyan: #34d399;          /* Verde destaque */
  --bg-primary: #0f2e27;    /* Fundo verde escuro */
}
```

---

## 👤 Alterar Informações do Criador

A informação sobre o criador está centralizada no arquivo **`js/config.js`**:

```javascript
export const APP_CONFIG = {
  author: "Seu Nome Aqui",          // Mude para seu nome
  appName: "AI Usage Monitor",       // Nome da aplicação
  appVersion: "1.0.0"
};
```

Essa informação pode aparecer em:
- Meta tags (SEO)
- Comentários do código
- Rodapés (se implementado)

---

## 📁 Estrutura do Projeto

```
IA-Formulario/
├── index.html              # Página de login
├── formulario.html         # Página do formulário
├── dados.html             # Página de visualização de dados
│
├── css/
│   ├── global.css         # Estilos globais (CUSTOMIZE CORES AQUI!)
│   ├── auth.css           # Estilos da página de login
│   ├── formulario.css     # Estilos do formulário
│   └── dados.css          # Estilos da página de dados
│
├── js/
│   ├── config.js          # Configurações da aplicação (author, cores, etc)
│   ├── auth.js            # Lógica de autenticação
│   ├── formulario.js      # Lógica do formulário
│   ├── dados.js           # Lógica da página de dados
│   └── changePassword.js  # Lógica de alteração de senha
│
├── assets/
│   └── inteligencia-artificial.ico  # Favicon
│
└── README.md              # Este arquivo
```

---

## 🔧 Configurações Recomendadas

### Para Desenvolvimento

1. Use um servidor local (Python, npm serve, etc.)
2. Abra o Console DevTools (F12) para verificar erros
3. Teste em diferentes tamanhos de tela (responsividade)

### Para Deploy

Este projeto é ideal para ser hospedado em:

- **Vercel** (recomendado, com suporte a funções serverless)
- **Netlify**
- **GitHub Pages** (estático)
- **AWS S3 + CloudFront**
- Seu próprio servidor

**Nota:** Você precisará configurar um backend Supabase para autenticação e armazenamento de dados.

---

## 📝 Como Clonar e Personalizar

### Passo 1: Clone o repositório

```bash
git clone https://github.com/BelmontBeta/IA-Formulario.git
cd IA-Formulario
```

### Passo 2: Customize as cores

Abra `css/global.css` e modifique as variáveis CSS no `:root`

### Passo 3: Altere o autor

Abra `js/config.js` e mude o valor de `author`

### Passo 4: Inicie um servidor local

```bash
python3 -m http.server 8000
```

Visite: `http://localhost:8000`

### Passo 5: Customize conforme necessário

- Altere títulos em `index.html`, `formulario.html`, `dados.html`
- Modifique campos do formulário em `formulario.html`
- Adapte estilos específicos em `css/`

---

## 🔐 Autenticação

O projeto usa **Supabase** para autenticação. Para configurar:

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Configure as credenciais no arquivo `js/auth.js`
4. Crie tabelas de usuários conforme necessário

---

## 📱 Responsividade

O projeto é **totalmente responsivo** e funciona em:

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🎯 Principais Linguagens

- **CSS** — 48.1% (design e responsividade)
- **JavaScript** — 30.1% (lógica interativa)
- **HTML** — 21.8% (estrutura)

---

## 📄 Licença

Este projeto é disponibilizado sob a licença **MIT**. Você é livre para usar, modificar e distribuir este código.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se deseja contribuir:

1. **Fork** o repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-melhoria`
3. Faça commit das suas alterações: `git commit -m "Adiciona minha melhoria"`
4. Faça push: `git push origin feature/minha-melhoria`
5. Abra um **Pull Request**

---

## 📞 Suporte

Dúvidas ou problemas? Abra uma [issue no GitHub](https://github.com/BelmontBeta/IA-Formulario/issues)

---

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

**Desenvolvido com ❤️**
