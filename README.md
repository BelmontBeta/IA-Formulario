# AI Usage Monitor

Ferramenta acadêmica para registro, acompanhamento e visualização do uso de Inteligência Artificial em projetos estudantis.

![Status](https://img.shields.io/badge/status-ativo-brightgreen)
![Linguagem](https://img.shields.io/badge/linguagem-HTML%2FCSS%2FJavaScript-blue)
![Supabase](https://img.shields.io/badge/backend-Supabase-3ECF8E)
![Licença](https://img.shields.io/badge/licença-MIT-green)

---

## 📋 Sobre o projeto

O **AI Usage Monitor** é uma aplicação web criada para registrar como ferramentas de Inteligência Artificial são utilizadas em projetos acadêmicos.

O sistema permite que usuários autorizados registrem informações como:

- Nome do responsável pelo registro
- Ferramenta de IA utilizada
- Finalidade do uso
- Data e horário
- Avaliação do resultado
- Observações adicionais

Os dados são armazenados no Supabase e exibidos em um painel organizado, com filtros e opção de exportação em PDF.

---

## ✨ Funcionalidades

- ✅ Login com e-mail e senha
- ✅ Acesso permitido somente a usuários cadastrados no Supabase
- ✅ Formulário protegido contra acesso não autenticado
- ✅ Alteração de senha pelo painel do usuário
- ✅ Registro detalhado de uso de Inteligência Artificial
- ✅ Seleção padronizada das ferramentas de IA
- ✅ Prevenção de variações como `ChatGPT`, `chatgpt` e `CHATGPT`
- ✅ Painel público para visualização dos registros
- ✅ Pesquisa por responsável, ferramenta ou finalidade
- ✅ Filtro por qualidade do resultado
- ✅ Contador de registros e ferramentas utilizadas
- ✅ Exportação dos registros para PDF
- ✅ Atualização automática dos dados com Supabase Realtime
- ✅ Interface responsiva para desktop, tablet e celular
- ✅ Design high-tech com tons de azul, ciano e fundo escuro

---

## 🧰 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript ES Modules
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security
- Supabase Realtime
- jsPDF
- jsPDF AutoTable
- Google Fonts

---

## 📁 Estrutura do projeto

```text
IA-Formulario/
│
├── index.html
├── formulario.html
├── dados.html
│
├── css/
│   ├── global.css
│   ├── auth.css
│   ├── formulario.css
│   └── dados.css
│
├── js/
│   ├── supabase.js
│   ├── auth.js
│   ├── formulario.js
│   ├── dados.js
│   └── changePassword.js
│
├── assets/
│   └── inteligencia-artificial.ico
│
└── README.md
```

### Principais arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Página de login |
| `formulario.html` | Página protegida para registro |
| `dados.html` | Painel de visualização dos registros |
| `global.css` | Variáveis, cores e estilos globais |
| `auth.css` | Estilos específicos da página de login |
| `formulario.css` | Estilos do formulário e modal de senha |
| `dados.css` | Estilos do dashboard e cards |
| `supabase.js` | Inicialização do cliente Supabase |
| `auth.js` | Login e controle de sessão |
| `formulario.js` | Proteção da página e envio dos relatórios |
| `dados.js` | Consulta, filtros, cards e exportação em PDF |
| `changePassword.js` | Alteração da senha do usuário |

---

# 🚀 Instalação

## Pré-requisitos

- Navegador moderno
- Git, opcional
- Python 3 ou Node.js para servidor local
- Um projeto criado no Supabase

---

## 1. Clonar o projeto

```bash
git clone https://github.com/BelmontBeta/IA-Formulario.git
cd IA-Formulario
```

---

## 2. Executar localmente

### Opção A: Python

```bash
python3 -m http.server 8000
```

No Windows, também pode ser utilizado:

```bash
python -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

### Opção B: Serve

```bash
npx serve .
```

### Opção C: Live Server

No Visual Studio Code, instale a extensão **Live Server** e abra o projeto utilizando a opção:

```text
Open with Live Server
```

> Recomenda-se utilizar um servidor local porque o projeto usa JavaScript com `type="module"` e imports externos.

---

# 🗄️ Configuração do Supabase

## 1. Criar um projeto

Crie um projeto no Supabase e aguarde a inicialização do banco de dados.

Depois, acesse:

```text
Project Settings → API
```

Copie:

- Project URL
- Publishable key ou chave pública anon

Nunca utilize a chave `service_role` no frontend.

---

## 2. Configurar as credenciais

Abra:

```text
js/supabase.js
```

Substitua o conteúdo pelas credenciais do seu projeto:

```javascript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_ANON_KEY = "SUA_CHAVE_PUBLICA";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
```

### Importante

A chave pública pode aparecer no frontend. A chave `service_role` nunca deve ser publicada no código, no GitHub ou no navegador.

---

# 🧱 Criação da tabela de relatórios

Abra o **SQL Editor** no Supabase e execute:

```sql
create table if not exists public.ia_reports (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users(id),

  user_name text not null,
  ia_tool text not null,
  usage_purpose text not null,
  usage_date timestamptz not null,
  result_quality text not null,
  notes text,

  created_at timestamptz not null default now(),

  constraint result_quality_valid
  check (
    result_quality in (
      'Excelente',
      'Boa',
      'Regular',
      'Ruim'
    )
  )
);
```

Crie um índice para melhorar a ordenação por data:

```sql
create index if not exists ia_reports_usage_date_idx
on public.ia_reports (usage_date desc);
```

---

# 🔐 Configuração de segurança com RLS

O Row Level Security protege os dados diretamente no banco de dados.

Ative o RLS:

```sql
alter table public.ia_reports enable row level security;
```

---

## Permitir envio somente para usuários autenticados

```sql
drop policy if exists "Usuários autenticados podem inserir relatórios"
on public.ia_reports;

create policy "Usuários autenticados podem inserir relatórios"
on public.ia_reports
for insert
to authenticated
with check (
  user_id = auth.uid()
);
```

Essa regra garante que:

- Usuários não autenticados não podem inserir dados
- Um usuário não pode enviar um relatório usando o `user_id` de outra pessoa
- O ID registrado precisa ser igual ao ID da sessão atual

---

## Permitir visualização pública dos registros

Como a página `dados.html` pode ser acessada publicamente, crie esta política:

```sql
drop policy if exists "Qualquer pessoa pode visualizar relatórios"
on public.ia_reports;

create policy "Qualquer pessoa pode visualizar relatórios"
on public.ia_reports
for select
to anon, authenticated
using (true);
```

> Essa política torna os registros públicos. Não coloque informações pessoais sensíveis no formulário caso os dados possam ser vistos por qualquer pessoa.

---

## Ativar atualizações em tempo real

Para que o painel seja atualizado automaticamente quando um relatório novo for inserido, adicione a tabela à publicação Realtime:

```sql
alter publication supabase_realtime
add table public.ia_reports;
```

Se a tabela já estiver adicionada, o Supabase poderá informar que ela já pertence à publicação.

---

# 👥 Configuração dos usuários

Neste projeto, os usuários não precisam criar uma conta pelo site.

Os usuários devem ser cadastrados manualmente no painel do Supabase.

## Criar um usuário autorizado

No painel do Supabase:

```text
Authentication → Users → Add user
```

Cadastre:

- E-mail do usuário
- Senha inicial genérica
- Confirmação de e-mail, conforme a configuração escolhida

Exemplo:

```text
E-mail: aluno@exemplo.com
Senha inicial: SenhaTemporaria123
```

O usuário poderá acessar o sistema usando esses dados e alterar a senha posteriormente pelo botão **Alterar senha**.

---

## Configuração do provedor de e-mail

Acesse:

```text
Authentication → Providers → Email
```

Recomendações:

- Ativar o provedor Email
- Manter a confirmação de e-mail ativada em produção
- Não permitir cadastro público caso somente usuários pré-aprovados possam acessar
- Criar os usuários manualmente pelo painel administrativo

---

# 🔑 Fluxo de autenticação

O fluxo da aplicação funciona da seguinte maneira:

1. O usuário acessa `index.html`
2. Informa o e-mail e a senha
3. O Supabase valida as credenciais
4. Usuários autenticados são redirecionados para `formulario.html`
5. Usuários não autenticados não conseguem acessar o formulário
6. O usuário pode alterar sua própria senha
7. Após alterar a senha, a sessão é encerrada
8. O usuário deve fazer login novamente com a nova senha

A proteção é feita em dois níveis:

- No frontend, com verificação da sessão
- No banco, usando RLS

---

# 📝 Cadastro de ferramentas de IA

A ferramenta é selecionada por meio de um campo `<select>`.

Exemplo:

```html
<select id="iaTool" name="iaTool" required>
  <option value="">Selecione uma ferramenta</option>
  <option value="ChatGPT">ChatGPT</option>
  <option value="Gemini">Gemini</option>
  <option value="Copilot">Copilot</option>
  <option value="Claude">Claude</option>
  <option value="Midjourney">Midjourney</option>
  <option value="DALL-E">DALL-E</option>
  <option value="Stable Diffusion">Stable Diffusion</option>
  <option value="Outra">Outra</option>
</select>
```

O uso de opções fixas evita registros diferentes para a mesma ferramenta, como:

```text
ChatGPT
chatgpt
CHATGPT
```

Todos os registros passam a utilizar o mesmo padrão:

```text
ChatGPT
```

Para adicionar uma nova ferramenta, edite o `<select>` no arquivo:

```text
formulario.html
```

Exemplo:

```html
<option value="Perplexity">Perplexity</option>
```

---

# 📊 Painel de dados

A página `dados.html` apresenta:

- Total de relatórios
- Quantidade de ferramentas únicas
- Data da última atualização
- Cards individuais para cada registro
- Responsável pelo uso
- Ferramenta utilizada
- Finalidade
- Qualidade do resultado
- Observações
- Data e horário

---

## 🔎 Pesquisa e filtros

O painel permite pesquisar por:

- Nome do responsável
- Ferramenta utilizada
- Finalidade do uso
- Observações

Também é possível filtrar pela qualidade:

- Excelente
- Boa
- Regular
- Ruim

Os filtros são aplicados no painel e também são considerados na geração do PDF.

---

# 📄 Exportação para PDF

O painel possui um botão para baixar os relatórios em PDF.

O PDF contém:

- Título do relatório
- Data de geração
- Total de registros selecionados
- Responsável
- Ferramenta utilizada
- Finalidade
- Data e horário
- Qualidade
- Observações
- Paginação
- Rodapé institucional

O PDF respeita os filtros utilizados na tela.

Por exemplo, se o usuário pesquisar apenas por `ChatGPT`, o PDF conterá somente os registros filtrados.

As bibliotecas utilizadas são carregadas no `dados.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.1/jspdf.plugin.autotable.min.js"></script>

<script type="module" src="./js/dados.js"></script>
```

A ordem dos scripts é importante:

1. jsPDF
2. jsPDF AutoTable
3. `dados.js`

---

# 🎨 Personalização visual

As principais cores do projeto estão no arquivo:

```text
css/global.css
```

Exemplo de variáveis utilizadas:

```css
:root {
  --bg-primary: #050b16;
  --bg-secondary: #081525;
  --bg-card: rgba(10, 24, 44, 0.86);
  --bg-input: #071426;

  --blue-100: #d9f3ff;
  --blue-300: #73d9ff;
  --blue-400: #20bfff;
  --blue-500: #008cff;
  --blue-600: #0064d8;

  --cyan: #00e5ff;

  --green: #28d17c;
  --yellow: #ffc857;
  --red: #ff5577;

  --text-primary: #f1f7ff;
  --text-secondary: #91a8c2;
  --text-muted: #627993;

  --border: rgba(89, 172, 255, 0.22);
  --border-strong: rgba(0, 212, 255, 0.55);

  --radius-lg: 24px;
  --radius-md: 14px;
  --radius-sm: 9px;
}
```

---

## Alterar o tema de cores

Para utilizar outra paleta, edite as variáveis no `:root`.

### Tema verde

```css
:root {
  --blue-400: #22c55e;
  --blue-500: #16a34a;
  --cyan: #34d399;
  --bg-primary: #071a12;
}
```

### Tema roxo

```css
:root {
  --blue-400: #a78bfa;
  --blue-500: #7c3aed;
  --cyan: #c084fc;
  --bg-primary: #10091f;
}
```

---

# 📱 Responsividade

A interface foi desenvolvida para funcionar em:

- Desktop
- Notebook
- Tablet
- Celulares
- Telas a partir de aproximadamente 320px

Os arquivos CSS possuem media queries para ajustar:

- Largura dos cards
- Tamanho dos títulos
- Organização dos botões
- Campos do formulário
- Cabeçalho
- Filtros
- Modal de alteração de senha
- Tabela e exportação visual

---

# 🧪 Testes locais

Antes de publicar, verifique:

- Login com usuário válido
- Login com usuário inválido
- Redirecionamento de usuário não autenticado
- Registro de um novo relatório
- Bloqueio de envio sem autenticação
- Alteração de senha
- Logout
- Visualização dos dados
- Pesquisa por ferramenta
- Filtro por qualidade
- Geração do PDF
- Atualização automática dos registros
- Layout em celular

Para verificar erros, abra as ferramentas do navegador:

```text
F12 → Console
```

Mensagens comuns:

### Tabela inexistente

```text
relation "ia_reports" does not exist
```

Execute novamente o SQL de criação da tabela.

### Falta de permissão

```text
permission denied for table ia_reports
```

Verifique as políticas de RLS.

### Nenhum dado aparecendo

Confirme se:

- O registro foi inserido em `ia_reports`
- O `dados.js` utiliza `.from("ia_reports")`
- A política de `SELECT` foi criada
- A URL e a chave do Supabase estão corretas

---

# 🌐 Deploy

O projeto pode ser hospedado em serviços estáticos, como:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3
- Servidor próprio

Após o deploy, configure no Supabase os endereços autorizados da aplicação.

No painel do Supabase, procure as configurações de URL da autenticação e adicione:

```text
URL principal do projeto
```

Também adicione as URLs de redirecionamento utilizadas pela aplicação.

> Em produção, não utilize `localhost` como URL principal.

---

# 🔒 Boas práticas de segurança

- Nunca publique a chave `service_role`
- Utilize somente a chave pública no frontend
- Mantenha o RLS ativado
- Permita INSERT somente para usuários autenticados
- Valide os dados também no banco
- Não armazene senhas em tabelas próprias
- Utilize o Supabase Auth para autenticação
- Evite colocar dados pessoais sensíveis nos relatórios públicos
- Restrinja a política de SELECT caso os registros não devam ser públicos

---

# 🛠️ Personalização do projeto

Para alterar o sistema:

### Alterar o nome da aplicação

Edite os arquivos:

```text
index.html
formulario.html
dados.html
```

### Alterar ferramentas disponíveis

Edite o campo `select` em:

```text
formulario.html
```

### Alterar campos do relatório

Edite:

```text
formulario.html
formulario.js
dados.js
```

Também será necessário atualizar a tabela do Supabase caso seja criado um novo campo.

### Alterar estilos

Edite:

```text
css/global.css
css/auth.css
css/formulario.css
css/dados.css
```

---

# 🤝 Contribuição

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch

```bash
git checkout -b feature/minha-melhoria
```

3. Faça as alterações
4. Realize o commit

```bash
git add .
git commit -m "Adiciona minha melhoria"
```

5. Envie a branch

```bash
git push origin feature/minha-melhoria
```

6. Abra um Pull Request

---

# 📄 Licença

Este projeto está disponibilizado sob a licença MIT.

Você pode:

- Usar
- Copiar
- Modificar
- Distribuir
- Utilizar comercialmente

Consulte o arquivo `LICENSE`, caso esteja presente no repositório, para obter os termos completos.

---

# 📚 Referências

- Documentação do Supabase
- Documentação do JavaScript
- Documentação do CSS
- Documentação do jsPDF
- Documentação do AutoTable
- MDN Web Docs

---

## 👨‍💻 Autor

Desenvolvido por **Caio Belmont**.

---

**AI Usage Monitor — Registro acadêmico, transparência e responsabilidade no uso de Inteligência Artificial.**
