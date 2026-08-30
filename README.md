# IA-Formulario

Aplicação front-end simples para criação e visualização de formulários.

Este repositório contém páginas HTML, estilos em CSS e scripts JavaScript para demonstração de formulários e visualização de dados submetidos localmente.

Principais linguagens (estimativa):
- CSS — 48.1%
- JavaScript — 30.1%
- HTML — 21.8%

## Conteúdo do repositório

- index.html — página inicial / menu de navegação
- formulario.html — formulário principal para entrada de dados
- dados.html — página demonstrativa para exibir/consultar os dados submetidos
- css/ — pasta com folhas de estilo (estilização do layout e dos formulários)
- js/ — pasta com scripts JavaScript (validação, manipulação do DOM, armazenamento local)

> Observação: os nomes acima refletem os arquivos presentes no repositório. Atualize o conteúdo se adicionar novos arquivos ou reorganizar pastas.

## Como visualizar localmente

Métodos rápidos para abrir o projeto:

1) Abrir diretamente no navegador
- Basta abrir `index.html` com um duplo clique. Funcionalidades que usam fetch ou módulos podem exigir um servidor local.

2) Servidor HTTP rápido (recomendado)
- Com Python 3:

```bash
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

- Com Node.js (serve):

```bash
npm install -g serve
serve .
```

3) Live Server (VS Code)
- Instale a extensão Live Server e clique em "Go Live".

## Uso

- Abra `formulario.html` para preencher os campos do formulário.
- Dependendo da implementação dos scripts em `js/`, os dados podem ser validados no cliente e armazenados no localStorage ou exibidos em `dados.html`.

Se quiser que eu escreva exemplos de preenchimento, valide campos específicos ou implemente salvamento em backend (Node/Express, Firebase, etc.), descreva o que deseja.

## Estrutura sugerida para desenvolvimento

- css/
  - styles.css — estilos globais
- js/
  - main.js — lógica de interação e validação
- index.html
- formulario.html
- dados.html

Adote nomes semânticos e mantenha a separação entre estilos, scripts e markup.

## Contribuição

- Fork o repositório
- Crie uma branch descritiva: `feature/nome-da-funcionalidade` ou `fix/descricao`
- Abra um Pull Request explicando as mudanças

## Licença

Nenhuma licença detectada. Recomenda-se adicionar um arquivo `LICENSE` (por exemplo MIT) se você pretende permitir uso público e contribuições.

Exemplo rápido (MIT):

```
MIT License

Copyright (c) [ANO] [NOME]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[...]
```

Substitua [ANO] e [NOME] conforme apropriado.

## Contato

Autor: BelmontBeta
Repositório: https://github.com/BelmontBeta/IA-Formulario

----

Se quiser, eu posso:
- Inserir exemplos de uso detalhados e screenshots (você pode enviar imagens)
- Gerar um arquivo LICENSE.json com MIT/Apache
- Implementar melhoria como validação avançada, salvar em CSV/JSON, ou integrar um backend simples

Diga qual ação prefere que eu faça a seguir.