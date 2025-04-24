const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE Artista PARA MANIPULAR bd
const artistaDAO = require('../../model/dao/artista.js')

//função para inserir uma nova música
const inserirArtista = async function(Artista, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (Artista.nome == undefined || Artista.nome == '' || Artista.nome == null || Artista.nome.length > 100 ||
            Artista.foto_perfil == undefined || Artista.foto_perfil == ''  || Artista.foto_perfil.length > 200 ||
            Artista.biografia == undefined 
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultArtista = await artistaDAO.insertArtista(Artista)
        
                if(resultArtista)
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
const atualizarArtista = async function(Artista, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (Artista.nome == undefined || Artista.nome == '' || Artista.nome == null || Artista.nome.length > 100 ||
                    Artista.foto_perfil == undefined || Artista.foto_perfil == ''  || Artista.foto_perfil.length > 200 ||
                    Artista.biografia == undefined
                    ){
                        return MESSAGE.ERROR_REQUIRE_FIELDS //400
                    }else{ 
                        //Validar se o ID existe no banco
                        let resultArtista = await buscarArtista(id)

                        if(resultArtista.status_code ==  200){
                            //Update
                            //Adiciona o atributo ID no json e coloca o ID da Artista que chegou na controller
                            Artista.id = id
                            let result = await artistaDAO.updateArtista(Artista)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 
                            }


                        }else if(resultArtista.status_code == 404){

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
const excluirArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            //validar se o ID existe 
            let resultArtista = await buscarArtista(id)
            if(resultArtista.status_code == 200 ){
                //Delete
                let result =  await artistaDAO.deleteArtista(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM //200 
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }


            }else if(resultArtista.status_code == 404 ){
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
const listarArtista = async function(){
    try {
        let dadosArtista = {}

        let resultArtista = await artistaDAO.selectAllArtista()

        if(resultArtista != false || typeof(resultArtista) == 'object')
        {

        if(resultArtista.length > 0 ){
            dadosArtista.status = true 
            dadosArtista.status_code = 200 
            dadosArtista.itens = resultArtista.length
            dadosArtista.musics = resultArtista

            return dadosArtista // 200

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
const buscarArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0 ){
                    dadosArtista.status = true 
                    dadosArtista.status_code = 200 
                    dadosArtista.musics = resultArtista
                    return dadosArtista //200 

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
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista

}