## Elite BOT
Esse é o repositório do bot Segurança, criado para o servidor Elite dos Desenvolvedores no discord.

## Instalação
Após ter clonado o repositorio e extraido todos arquivos. tenha certeza que possui o [npm](https://www.npmjs.com/) e o [node.js 8.0.0](https://nodejs.org/en/) ou mais recente. caso estiver com tudo pronto então execute o seguinte comando no diretorio dos arquivos.

```$ npm install```

Se tudo estiver certo, crie um arquivo com o nome de **config.json** seguindo o exemplo do **config-example.json** na pasta comandos

| Opção        | Descrição                        | Obrigatório? |
| ------------ | -------------------------------- | ------------ |
| PREFIX       | Prefixo para os comandos         | sim          |
| TOKEN        | Token de autenticação do bot     | sim          |
| DB           | Conexão com a DB do Mongo        | sim          |
|GOOGLE_API_KEY| Key da API do Youtube            | sim          |

*Caso você vá testar o BOT em outro servidor é necessário alterar o ID de cada sala no config.json*

Depois de tudo configurado é só usar o comando

```
$ node app.js
```

Caso apareça a lista de comandos sendo carregada e após isso a seguinte mensagem, o BOT já estara funcionando.

```
[CONECTADO] A aplicação foi conectada e estabelecida com sucesso!
O Bot foi iniciado completamente com x usuarios em x servidores
```

## Contribuições
Serão aceitas pull requests com códigos limpos e não maliciosos, sempre tendo em mente a melhoria do BOT para o servidor.

## Ajuda
Tem alguma dúvida? Entre em nosso discord e converse com a gente: https://discord.gg/cys2Y8
