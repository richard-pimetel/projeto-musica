const MESSAGE = require('../../modulo/config.js')
//Import do arquivo dao DE Genero PARA MANIPULAR bd
const generoDAO = require('../../model/dao/genero.js')

//função para inserir uma nova música
const inserirGenero = async function(Genero, contentType){

try {

    if(String(contentType).toLowerCase() == 'application/json')
    {
        if (Genero.nome_genero == undefined || Genero.nome_genero == '' || Genero.nome_genero == null || Genero.nome_genero.length > 50
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //401
            }else{
                let resultGenero = await generoDAO.insertGenero(Genero)
        
                if(resultGenero)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
    }else{
        return MESSAGE.ERRO_CONTENT_TYPE //415
    }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
   
}
//função para atualizar uma música existente
const atualizarGenero = async function(Genero, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (Genero.nome_genero == undefined || Genero.nome_genero == ''|| Genero.nome_genero==null || Genero.nome_genero.length > 50 
                    ){
                        return MESSAGE.ERROR_REQUIRE_FIELDS //400
                    }else{ 
                        //Validar se o ID existe no banco
                        let resultGenero = await buscarGenero(id)

                        if(resultGenero.status_code ==  200){
                            //Update
                            //Adiciona o atributo ID no json e coloca o ID da Genero que chegou na controller
                            Genero.id = id
                            let result = await generoDAO.updateGenero(Genero)

                            if(result){
                                return MESSAGE.SUCCESS_UPDATED_ITEM //200 
                            }else{
                                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 
                            }


                        }else if(resultGenero.status_code == 404){

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
const excluirGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            //validar se o ID existe 
            let resultGenero = await buscarGenero(id)
            if(resultGenero.status_code == 200 ){
                //Delete
                let result =  await generoDAO.deleteGenero(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETE_ITEM //200 
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }


            }else if(resultGenero.status_code == 404 ){
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
const listarGenero = async function(){
    try {
        let dadosGenero = {}

        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object')
        {

        if(resultGenero.length > 0 ){
            dadosGenero.status = true 
            dadosGenero.status_code = 200 
            dadosGenero.itens = resultGenero.length
            dadosGenero.musics = resultGenero

            return dadosGenero // 200

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
const buscarGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400

        }else{
            let dadosGenero = {}
            let resultGenero = await generoDAO.selectByIdGenero(id)

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0 ){
                    dadosGenero.status = true 
                    dadosGenero.status_code = 200 
                    dadosGenero.musics = resultGenero
                    return dadosGenero //200 

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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGenero,
    buscarGenero

}