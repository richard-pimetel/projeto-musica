const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE Album PARA MANIPULAR bd
const albumDAO = require('../../model/dao/album.js')

//função para inserir uma nova música
const inserirAlbum = async function(Album, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (Album.nome == undefined || Album.nome == '' || Album.nome == null || Album.nome.length > 100 ||
            Album.capa == undefined || Album.capa == '' || Album.capa.length > 200 ||
            Album.data_lancamento == undefined || Album.data_lancamento == '' || Album.data_lancamento == null || Album.data_lancamento.length > 10
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultAlbum = await albumDAO.insertAlbum(Album)
        
                if(resultAlbum)
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
const atualizarAlbum = async function(Album, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (Album.nome == undefined || Album.nome == '' || Album.nome == null || Album.nome.length > 100 ||
                    Album.capa == undefined || Album.capa == '' || Album.capa.length > 200 ||
                    Album.data_lancamento == undefined || Album.data_lancamento == '' || Album.data_lancamento ==null || Album.data_lancamento.length > 10 
                    ){
                        return MESSAGE.ERROR_REQUIRE_FIELDS //400
                    }else{ 
                        //Validar se o ID existe no banco
                        let resultAlbum = await buscarAlbum(id)

                        if(resultAlbum.status_code ==  200){
                            //Update
                            //Adiciona o atributo ID no json e coloca o ID da Album que chegou na controller
                            Album.id = id
                            let result = await albumDAO.updateAlbum(Album)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 
                            }


                        }else if(resultAlbum.status_code == 404){

                            return MESSAGE.ERRO_NOT_FOUND //404
                        }else{
                            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER//500
                        }
                    }
        }else{
            return MESSAGE.ERRO_CONTENT_TYPE //415
        }   


    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma música existente
const excluirAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            //validar se o ID existe 
            let resultAlbum = await buscarAlbum(id)
            if(resultAlbum.status_code == 200 ){
                //Delete
                let result =  await albumDAO.deleteAlbum(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM //200 
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }


            }else if(resultAlbum.status_code == 404 ){
                return MESSAGE.ERRO_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
            }

        }



    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

//função para retornar todas as música
const listarAlbum = async function(){
    try {
        let dadosAlbum = {}

        let resultAlbum = await albumDAO.selectAllAlbum()

        if(resultAlbum != false || typeof(resultAlbum) == 'object')
        {

        if(resultAlbum.length > 0 ){
            dadosAlbum.status = true 
            dadosAlbum.status_code = 200
            dadosAlbum.itens = resultAlbum.length
            dadosAlbum.musics = resultAlbum

            return dadosAlbum // 200

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
const buscarAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosAlbum = {}
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0 ){
                    dadosAlbum.status = true 
                    dadosAlbum.status_code = 200
                    dadosAlbum.musics = resultAlbum
                    return dadosAlbum //200 

                }else{
                    return MESSAGE.ERRO_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum

}