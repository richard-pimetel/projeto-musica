const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE Usuario PARA MANIPULAR bd
const usuarioDAO = require('../../model/dao/usuario.js')

//função para inserir uma nova música
const inserirUsuario = async function(Usuario, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (Usuario.nome == undefined || Usuario.nome == '' || Usuario.nome == null || Usuario.nome.length > 100 ||
            Usuario.email == undefined || Usuario.email == '' || Usuario.email == null || Usuario.email.length > 100 ||
            Usuario.senha == undefined || Usuario.senha == '' || Usuario.senha == null || Usuario.senha.length > 255 ||
            Usuario.data_criacao == undefined || Usuario.data_criacao == '' || Usuario.data_criacao == null || Usuario.data_criacao.length > 10
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultUsuario = await usuarioDAO.insertUsuario(Usuario)
        
                if(resultUsuario)
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
const atualizarUsuario = async function(Usuario, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (Usuario.nome == undefined || Usuario.nome == '' || Usuario.nome == null || Usuario.nome.length > 100 ||
                    Usuario.email == undefined || Usuario.email == '' || Usuario.email == null || Usuario.email.length > 100 ||
                    Usuario.senha == undefined || Usuario.senha == '' || Usuario.senha == null || Usuario.senha.length > 255 ||
                    Usuario.data_criacao == undefined || Usuario.data_criacao == '' || Usuario.data_criacao ==null || Usuario.data_criacao.length > 10 
                    ){
                        return MESSAGE.ERROR_REQUIRE_FIELDS //400
                    }else{ 
                        //Validar se o ID existe no banco
                        let resultUsuario = await buscarUsuario(id)

                        if(resultUsuario.status_code ==  200){
                            //Update
                            //Adiciona o atributo ID no json e coloca o ID da Usuario que chegou na controller
                            Usuario.id = id
                            let result = await usuarioDAO.updateUsuario(Usuario)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200 
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 
                            }


                        }else if(resultUsuario.status_code == 404){

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
const excluirUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            //validar se o ID existe 
            let resultUsuario = await buscarUsuario(id)
            if(resultUsuario.status_code == 200 ){
                //Delete
                let result =  await usuarioDAO.deleteUsuario(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM //200 
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }


            }else if(resultUsuario.status_code == 404 ){
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
const listarUsuario = async function(){
    try {
        let dadosUsuario = {}

        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object')
        {

        if(resultUsuario.length > 0 ){
            dadosUsuario.status = true 
            dadosUsuario.status_code = 200 
            dadosUsuario.itens = resultUsuario.length
            dadosUsuario.musics = resultUsuario

            return dadosUsuario // 200

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
const buscarUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0 ){
                    dadosUsuario.status = true 
                    dadosUsuario.status_code = 200 
                    dadosUsuario.musics = resultUsuario
                    return dadosUsuario //200 

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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario

}