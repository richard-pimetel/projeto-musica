
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertAlbum = async function(Album){
try {
        
    let sql = `insert into tbl_album ( nome,
                                        data_lancamento,
                                        capa
                                        )
                                values (
                                        '${Album.nome}',
                                        '${Album.data_lancamento}',
                                        '${Album.capa}'
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
const updateAlbum = async function(Album){
    try {
        
        let sql = `update tbl_album set nome =              '${Album.nome}',
                                         data_lancamento =   '${Album.data_lancamento}',
                                         capa =           '${Album.capa}'
        where id=${Album.id}`
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
const deleteAlbum = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_album where id='+id
    
    
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
const selectAllAlbum = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_album order by id desc'


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
const selectByIdAlbum = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_album where id='+id


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
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}