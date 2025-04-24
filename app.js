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

const controllerAlbum = require('./controller/album/controllerAlbum.js')
const controllerArtista = require('./controller/artista/controllerArtista.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerTipoUsuario = require('./controller/tipo_usuario/controllerTipoUsuario.js')
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')

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

app.get('/v1/controle-musicas/musica/:id', cors(), async function (request, response) {
    
        let idMusica = request.params.id
        let result = await controllerMusica.buscarMusica(idMusica)

        response.status(result.status_code)
        response.json(result)
    
})

app.delete('/v1/controle-musicas/musica/:id', cors(), async function (request, response){

    let idMusica = request.params.id
    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idMusica = request.params.id

    let dadosBody = request.body

    let result = await controllerMusica.atualizarMusica(dadosBody,idMusica, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


//album

app.post('/v1/controle-Albums/album', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerAlbum.inserirAlbum(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
app.get('/v1/controle-Albums/album', cors(), async function (request, response) {

    //Chama função para retornar uma lista de Albums
    let result = await controllerAlbum.listarAlbum()
    

    response.status(result.status_code)
    response.json(result)


})
app.get('/v1/controle-Albums/album/:id', cors(), async function (request, response) {
    
        let idAlbum = request.params.id
        let result = await controllerAlbum.buscarAlbum(idAlbum)
        
        response.status(result.status_code)
        response.json(result)
    
})
app.delete('/v1/controle-Albums/album/:id', cors(), async function (request, response){

    let idAlbum = request.params.id
    let result = await controllerAlbum.excluirAlbum(idAlbum)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-Albums/album/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idAlbum = request.params.id

    let dadosBody = request.body

    let result = await controllerAlbum.atualizarAlbum(dadosBody,idAlbum, contentType)
    
    response.status(result.status_code)
    response.json(result)

})



//artista

app.post('/v1/controle-Artistas/artista', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
app.get('/v1/controle-Artistas/artista', cors(), async function (request, response) {

    //Chama função para retornar uma lista de Artistas
    let result = await controllerArtista.listarArtista()
    


    response.status(result.status_code)
    response.json(result)


})
app.get('/v1/controle-Artistas/artista/:id', cors(), async function (request, response) {
    
        let idArtista = request.params.id
        let result = await controllerArtista.buscarArtista(idArtista)

        response.status(result.status_code)
        response.json(result)
    
})
app.delete('/v1/controle-Artistas/artista/:id', cors(), async function (request, response){

    let idArtista = request.params.id
    let result = await controllerArtista.excluirArtista(idArtista)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-Artistas/artista/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idArtista = request.params.id

    let dadosBody = request.body

    let result = await controllerArtista.atualizarArtista(dadosBody,idArtista, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


//genero

app.post('/v1/controle-Generos/genero', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerGenero.inserirGenero(dadosBody, contentType)
    

    response.status(result.status_code)
    response.json(result)
    
})
app.get('/v1/controle-Generos/genero', cors(), async function (request, response) {

    //Chama função para retornar uma lista de Generos
    let result = await controllerGenero.listarGenero()


    response.status(result.status_code)
    response.json(result)


})
app.get('/v1/controle-Generos/genero/:id', cors(), async function (request, response) {
    
        let idGenero = request.params.id
        let result = await controllerGenero.buscarGenero(idGenero)

        response.status(result.status_code)
        response.json(result)
    
})
app.delete('/v1/controle-Generos/genero/:id', cors(), async function (request, response){

    let idGenero = request.params.id
    let result = await controllerGenero.excluirGenero(idGenero)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-Generos/genero/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idGenero = request.params.id

    let dadosBody = request.body

    let result = await controllerGenero.atualizarGenero(dadosBody,idGenero, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


//tipoUsuario

app.post('/v1/controle-TipoUsuarios/tipoUsuario', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerTipoUsuario.inserirTipoUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
    
})
app.get('/v1/controle-TipoUsuarios/tipoUsuario', cors(), async function (request, response) {

    //Chama função para retornar uma lista de TipoUsuarios
    let result = await controllerTipoUsuario.listarTipoUsuario()


    response.status(result.status_code)
    response.json(result)


})
app.get('/v1/controle-TipoUsuarios/tipoUsuario/:id', cors(), async function (request, response) {
    
        let idTipoUsuario = request.params.id
        let result = await controllerTipoUsuario.buscarTipoUsuario(idTipoUsuario)

        response.status(result.status_code)
        response.json(result)
    
})
app.delete('/v1/controle-TipoUsuarios/tipoUsuario/:id', cors(), async function (request, response){

    let idTipoUsuario = request.params.id
    let result = await controllerTipoUsuario.excluirTipoUsuario(idTipoUsuario)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-TipoUsuarios/tipoUsuario/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idTipoUsuario = request.params.id

    let dadosBody = request.body

    let result = await controllerTipoUsuario.atualizarTipoUsuario(dadosBody,idTipoUsuario, contentType)
    
    response.status(result.status_code)
    response.json(result)

})


//usuario

app.post('/v1/controle-Usuarios/usuario', cors(), bodyParserJSON, async function (request, response) {

    //recebe ontentType da requisição para validar o formato de dados

    let contentType = request.headers['content-type']
    //Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)


    response.status(result.status_code)
    response.json(result)
    
})
app.get('/v1/controle-Usuarios/usuario', cors(), async function (request, response) {

    //Chama função para retornar uma lista de Usuarios
    let result = await controllerUsuario.listarUsuario()
    console.log(result)


    response.status(result.status_code)
    response.json(result)


})
app.get('/v1/controle-Usuarios/usuario/:id', cors(), async function (request, response) {
    
        let idUsuario = request.params.id
        let result = await controllerUsuario.buscarUsuario(idUsuario)

        response.status(result.status_code)
        response.json(result)
    
})
app.delete('/v1/controle-Usuarios/usuario/:id', cors(), async function (request, response){

    let idUsuario = request.params.id
    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)

})

app.put('/v1/controle-Usuarios/usuario/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idUsuario = request.params.id

    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(dadosBody,idUsuario, contentType)
    
    response.status(result.status_code)
    response.json(result)

})

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições....')
})

