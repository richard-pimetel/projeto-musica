/**
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/02/2025
 * Dev: Richard
 * Versões: 1.0
 * Observações: 
 * ****Para criar a API precisamos instalar:
 *      express           npm install express --save
 *      cors              npm install cors --save
 *      body-parser       npm install body-parser --save
 * ****Para criar a conexão com o banco de dados MYSQL precisamos instalar:
 *      prisma            npm install prisma --save
 *      @prisma/client     npm install @prisma/client --save    
 *      
 *  Após a instalação do prisma é necessário inicializar o prisma:
 *    npx prisma init  
 * 
 */



//Import das bibliotecas para criar a API 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import das crotrollers do projeto
const controllerMusica = require('./controller/musica/controllerMusica.js')

//criando o  formato de dados que sera recebido no body da requisição (post/put)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API

const app = express()


app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST,PUT DELETE, OPTIONS')

    app.use(cors())
    next()

})

app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})


app.get('/v1/controle-musicas/musica', cors(), async function (request, response) {

    //Chama função para retornar uma lista de musicas
    let result = await controllerMusica.listarMusica()


    response.status(result.status_code)
    response.json(result)


})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições....')
})