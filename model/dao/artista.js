
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova música no banco de dados
const insertArtista = async function(Artista){
try {
        
    let sql = `insert into tbl_artista ( nome,
                                        biografia,
                                        foto_perfil
                                        )
                                values (
                                        '${Artista.nome}',
                                        '${Artista.biografia}',
                                        '${Artista.foto_perfil}'
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
const updateArtista = async function(Artista){
    try {
        
        let sql = `update tbl_artista set nome =              '${Artista.nome}',
                                         biografia =   '${Artista.biografia}',
                                         foto_perfil =           '${Artista.foto_perfil}'
        where id=${Artista.id}`
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
const deleteArtista = async function(id){
    try {
       
        //Script SQL 
        let sql = 'delete from tbl_artista where id='+id
    
    
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
const selectAllArtista = async function(){
try {

    //Script SQL 
    let sql = 'select * from tbl_artista order by id desc'


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
const selectByIdArtista = async function(id){
    try {
       
    //Script SQL 
    let sql = 'select * from tbl_artista where id='+id


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
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}