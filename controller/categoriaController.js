const express = require('express');

const categoriaModel = require('../model/categoriaModel');

/* GERENCIADOR DE ROTAS*/
const router = express.Router();

/* ROTA DE INSERÇÃO DE AUTOR(POST)*/ 
router.post('/categoria/inserir', (req,res)=>{

    let nome_categoria = req.body.nome_categoria;
    
    categoriaModel.create(
        {nome_categoria}
    ).then(
        ()=>{
            return res.status(201).json({
                errorStatus:false,
                mensageStatus:`Categoria ${nome_categoria} criada com sucesso!`
            })
        }   
    ).catch((error)=>{
        return res.status(500).json({
            errorStatus:true,
            mensageStatus:`O item ${nome_categoria}, não pode ser criado`
        })
    })

    //res.send('ROTA DE CATEGORIA DE INSERÇÃO!');

})

/* ROTA DE SELEÇÃO DE AUTOR(GET)*/
router.get('/categoria/selecionar', (req,res)=>{
    (categoriaModel.findAll()).then(
        (categorias)=>{
            //console.log(categorias);
            res.json(categorias);
        })

})

/* ROTA DE ALTERAÇÃO DE AUTOR(PUT)*/
router.put('/categoria/alterar', (req,res)=>{
    let id = req.body.id;
    let nome_categoria = req.body.nome_categoria;
    
    categoriaModel.update(
        {nome_categoria},{where:{id}}
    ).then(
        ()=>{
            return res.status(200).json({
                errorStatus:false,
                mensageStatus:`Categoria alterada para ${nome_categoria} com sucesso!`
            })
        }   
    ).catch((error)=>{
        return res.status(500).json({
            errorStatus:true,
            mensageStatus:`O item ${nome_categoria}, não pode ser atualizado`
        })
    })

})

/* ROTA DE EXCLUSÃO DE AUTOR(DELETE)*/
router.delete('/categoria/excluir/:id', (req,res)=>{
    let id = req.params.id;
    console.log('ID: ' + id);
    
    categoriaModel.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(200).json({
                errorStatus:false,
                mensageStatus:`Categoria com ID:${id} deletada com sucesso!`
            })
        }   
    ).catch((error)=>{
        return res.status(500).json({
            errorStatus:true,
            mensageStatus:`O item de ID:${id}, não pode ser deletado`
        })
    })
})

module.exports = router;