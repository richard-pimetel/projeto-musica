const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE TipoUsuario PARA MANIPULAR bd
const tipoUsuarioDAO = require('../../model/dao/tipo_usuario.js')

//função para inserir uma nova música
const inserirTipoUsuario = async function(TipoUsuario, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (TipoUsuario.tipo == undefined || TipoUsuario.tipo == '' || TipoUsuario.tipo == null || TipoUsuario.tipo.length > 50
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultTipoUsuario = await tipoUsuarioDAO.insertTipoUsuario(TipoUsuario)
        
                if(resultTipoUsuario)
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
const atualizarTipoUsuario = async function(TipoUsuario, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (TipoUsuario.tipo == undefined || TipoUsuario.tipo == ''|| TipoUsuario.tipo==null || TipoUsuario.tipo.length > 50 
                    ){
                        return MESSAGE.ERROR_REQUIRE_FIELDS //400
                    }else{ 
                        //Validar se o ID existe no banco
                        let resultTipoUsuario = await buscarTipoUsuario(id)

                        if(resultTipoUsuario.status_code ==  200){
                            //Update
                            //Adiciona o atributo ID no json e coloca o ID da TipoUsuario que chegou na controller
                            TipoUsuario.id = id
                            let result = await tipoUsuarioDAO.updateTipoUsuario(TipoUsuario)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200 
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 
                            }


                        }else if(resultTipoUsuario.status_code == 404){

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
const excluirTipoUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            //validar se o ID existe 
            let resultTipoUsuario = await buscarTipoUsuario(id)
            if(resultTipoUsuario.status_code == 200 ){
                //Delete
                let result =  await tipoUsuarioDAO.deleteTipoUsuario(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM //200 
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }


            }else if(resultTipoUsuario.status_code == 404 ){
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
const listarTipoUsuario = async function(){
    try {
        let dadosTipoUsuario = {}

        let resultTipoUsuario = await tipoUsuarioDAO.selectAllTipoUsuario()

        if(resultTipoUsuario != false || typeof(resultTipoUsuario) == 'object')
        {

        if(resultTipoUsuario.length > 0 ){
            dadosTipoUsuario.status = true 
            dadosTipoUsuario.status_code = 200 
            dadosTipoUsuario.itens = resultTipoUsuario.length
            dadosTipoUsuario.musics = resultTipoUsuario

            return dadosTipoUsuario // 200

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
const buscarTipoUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosTipoUsuario = {}
            let resultTipoUsuario = await tipoUsuarioDAO.selectByIdTipoUsuario(id)

            if(resultTipoUsuario != false || typeof(resultTipoUsuario) == 'object'){
                if(resultTipoUsuario.length > 0 ){
                    dadosTipoUsuario.status = true 
                    dadosTipoUsuario.status_code = 200 
                    dadosTipoUsuario.musics = resultTipoUsuario
                    return dadosTipoUsuario //200 

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
    inserirTipoUsuario,
    atualizarTipoUsuario,
    excluirTipoUsuario,
    listarTipoUsuario,
    buscarTipoUsuario

}