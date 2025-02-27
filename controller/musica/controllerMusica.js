/**
 * Objetivo: Controller responsável pela manipilação do CRUD de dados de música
 * Data: 13/02/2025
 * Dev: Richard
 * Versão: 1.0
 */

//import do arquivo de configurações de mensagens de status code


const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE MUSICA PARA MANIPULAR bd
const musicaDAO = require('../../model/dao/musica.js')

//função para inserir uma nova música
const inserirMusica = async function(musica, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (musica.nome == undefined || musica.nome == '' || musica.nome == null || musica.nome.length > 80 ||
            musica.link == undefined || musica.link == '' || musica.link == null || musica.link.length > 200 ||
            musica.duracao == undefined || musica.duracao == '' || musica.duracao == null || musica.duracao.length > 5 ||
            musica.data_lancamento == undefined || musica.data_lancamento == '' || musica.data_lancamento == null || musica.data_lancamento.length > 10 ||
            musica.foto_capa == undefined || musica.foto_capa.length > 200 ||
            musica.letra == undefined
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultMusica = await musicaDAO.insertMusica(musica)
        
                if(resultMusica)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
    }else{
        return MESSAGE.ERRO_CONTENT_TYPE //415
    }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
   
}
//função para atualizar uma música existente
const atualizarMusica = async function(){

}

//função para excluir uma música existente
const excluirMusica = async function(){

}

//função para retornar todas as música
const listarMusica = async function(){
    try {
        let dadosMusica = {}

        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object')
        {

        if(resultMusica.length > 0 ){
            dadosMusica.status = true 
            dadosMusica.status_code = 200 
            dadosMusica.itens = resultMusica.length
            dadosMusica.musics = resultMusica

            return dadosMusica // 200

        }else{
            return MESSAGE.ERRO_NOT_FOUND //404 
        }
    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
    }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
    





}

//função para listar uma música pelo ID
const buscarMusica = async function(){

}

module.exports = {
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica

}