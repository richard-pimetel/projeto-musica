//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertTipoUsuario = async function(TipoUsuario){
try {
        
    let sql = `insert into tbl_tipo_usuario ( tipo
                                        )
                                values (
                                        '${TipoUsuario.tipo}'
                                        )`



    //executa o script SQL no DB e aguarda o retorno do DB
    let result = await prisma.$executeRawUnsafe(sql)


    if(result){
        return true
    }else{
        return false
    }

    } catch (error){
        return false
    }
}

//função para atualizar uma música existente no banco de dados
const updateTipoUsuario = async function(TipoUsuario){
    try {
        
        let sql = `update tbl_tipo_usuario set tipo =              '${TipoUsuario.tipo}'
        where id=${TipoUsuario.id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

//função para excluir uma música existente no banco de dados
const deleteTipoUsuario = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_tipo_usuario where id='+id
    
    
        //Exeuta o script SQL no BD e aguada o retorno dos daods 
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else 
            return false
    
    
    } catch (error) {
        return false 
    }
}

//função para retornar todas as músicas do banco de dados
const selectAllTipoUsuario = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_tipo_usuario order by id desc'


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else 
        return false


} catch (error) {
    return false 
}
}

//função para listar uma música pelo ID no banco de dados
const selectByIdTipoUsuario = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_tipo_usuario where id='+id


    //Exeuta o script SQL no BD e aguada o retorno dos daods 
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else 
        return false


} catch (error) {
    return false 
}
}


module.exports = {
    insertTipoUsuario,
    updateTipoUsuario,
    deleteTipoUsuario,
    selectAllTipoUsuario,
    selectByIdTipoUsuario
}