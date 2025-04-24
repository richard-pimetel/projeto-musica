
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertUsuario = async function(Usuario){
try {
        
    let sql = `insert into tbl_usuario ( nome,
                                        email,
                                        senha,
                                        data_criacao
                                        )
                                values (
                                        '${Usuario.nome}',
                                        '${Usuario.email}',
                                        '${Usuario.senha}',
                                        '${Usuario.data_criacao}'
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
const updateUsuario = async function(Usuario){
    try {
        
        let sql = `update tbl_usuario set nome =              '${Usuario.nome}',
                                         email =              '${Usuario.email}',
                                         senha =           '${Usuario.senha}',
                                         data_criacao =   '${Usuario.data_criacao}'
        where id=${Usuario.id}`
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
const deleteUsuario = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_usuario where id='+id
    
    
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
const selectAllUsuario = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_usuario order by id desc'


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
const selectByIdUsuario = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_usuario where id='+id


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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}