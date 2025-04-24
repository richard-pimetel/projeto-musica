//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertGenero = async function(Genero){
try {
        
    let sql = `insert into tbl_genero ( nome_genero
                                        )
                                values (
                                        '${Genero.nome_genero}'
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
const updateGenero = async function(Genero){
    try {
        
        let sql = `update tbl_genero set nome_genero =              '${Genero.nome_genero}'
        where id=${Genero.id}`
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
const deleteGenero = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_genero where id='+id
    
    
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
const selectAllGenero = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_genero order by id desc'


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
const selectByIdGenero = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_genero where id='+id


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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}