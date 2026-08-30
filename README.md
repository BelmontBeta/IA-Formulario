# IA-Formulario

Projeto para acompanhamento acadêmico: formulário para alunos registrarem usos de Inteligência Artificial (IA) em seus projetos da faculdade.

Este repositório contém páginas estáticas (HTML/CSS/JavaScript) que servem como uma ferramenta simples para os estudantes reportarem e acompanharem onde e como usaram IA durante o desenvolvimento de trabalhos acadêmicos.

Principais linguagens (estimativa):
- CSS — 48.1%
- JavaScript — 30.1%
- HTML — 21.8%

Conteúdo do repositório

- `index.html` — página inicial / menu
- `formulario.html` — formulário para registrar um uso de IA
- `dados.html` — página para visualizar os registros
- `css/` — estilos
- `js/` — scripts (validação, manipulação do DOM)

Objetivo

Permitir que alunos registrem cada ocorrência de uso de IA (por exemplo: geração de texto, auxílio de código, uso de modelos pré-treinados, ferramentas de imagem, etc.), com campos típicos como:
- nome do aluno / grupo
- disciplina / projeto
- tipo de uso de IA
- descrição do uso
- data
- observações sobre responsabilidade / ética

Modo de uso

1. Abra `index.html` no navegador ou rode um servidor local (recomendado):

```bash
python3 -m http.server 8000
# ou
npm install -g serve
serve .
```

2. Acesse `formulario.html` para criar um novo registro.
3. Verifique os registros em `dados.html`.

Observações técnicas

- Atualmente o projeto é composto por páginas estáticas. Dependendo da implementação em `js/`, os registros podem ser salvos localmente no navegador (localStorage) ou podem ser enviados a um backend se você integrar uma API.
- Se desejar, posso inspecionar os arquivos em `js/` e adaptar o README com exemplos reais de armazenamento/validação.

Contribuição

Contribuições são bem‑vindas. Fluxo sugerido:

1. Fork do repositório
2. Criar branch: `feature/minha-melhoria` ou `fix/descricao`
3. Abrir Pull Request descrevendo as alterações

Privacidade e uso de dados

- Este projeto, por padrão, deve ser usado apenas em ambiente acadêmico controlado.
- Se optar por armazenar dados em um backend, verifique conformidade com normas da sua instituição sobre privacidade e proteção de dados.

Licença

Este projeto é disponibilizado sob a licença MIT — veja o arquivo `LICENSE`.

Contato

- Autor/Organização: BelmontBeta
- Repositório: https://github.com/BelmontBeta/IA-Formulario

----
