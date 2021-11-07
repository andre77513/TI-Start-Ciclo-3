const express = require('express');
const cors = require('cors');
const {Sequelize} = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());


let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;
let compra=models.Compra;
let itemcompra=models.ItemCompra;
let produto=models.Produto;

app.post('/inserir-cliente', async (req,res) => {
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            cli
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

app.get('/listar-cliente', async (req,res) => {
    await cliente.findAll()
    .then(cli => {
        return res.json({
            error: false,
            cli
        });
    })
    .catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

app.put('/atualizar-cliente', async (req,res) => {
    await cliente.update(req.body,{
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "Os dados do cliente foram atualizados com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });

});

app.get('/excluir-cliente/:id', async (req,res) => {
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "Cliente foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Impossível excluir o cliente."
        });
    });
});

app.post('/inserir-servico',async (req,res) => {
    await servico.create(
        req.body
    ).then(ser => {
        return res.json({
            error: false,
            message: "Serviço criado com sucesso.",
            ser
        });
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Impossivel conectar."
        });
    });
   
});

app.get('/listar-servico', async (req,res) => {
    await servico.findAll()
    .then(serv => {
        return res.json({
            error: false,
            serv
        });
    });
});

app.put('/atualizar-servico', async (req,res) => {
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "O servico foi atualizado com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do serviço."
        });
    });

});

app.get('/excluir-servico', async (req,res) => {
    await servico.destroy({
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "O servico foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do serviço."
        });
    });

});

app.post('/inserir-pedido', async (req,res)=>{
    await pedido.create(
        req.body
    ).then(ped => {
        return res.json({
            error: false,
            message: "Pedido criado com sucesso.",
            ped
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        });
    });
});

app.get('/listar-pedidos', async (req,res) => {
    await pedido.findAll()
    .then(ped => {
        return res.json({
            error: false,
            ped
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na conexão."
        });
    });

});

app.put('/atualizar-pedido', async (req,res) => {
    await pedido.update(req.body,{
        where: {id: req.body.id}
    }).then(ped => {
        return res.json({
            error: false,
            message: "O produto foi atualizado com sucesso.",
            ped
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do pedido."
        });
    });

});

app.get('/excluir-pedido', async (req,res) => {
    await pedido.destroy({
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "O pedido foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do pedido."
        });
    });

});

app.post('/inserir-itempedido', async (req,res)=>{
    await itempedido.create(
        req.body
    )
    .then(item => {
        return res.json({
            error: false,
            message: "Item criado com sucesso",
            item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível criar o Item."
            });
        });
});

app.get('/listar-itempedido', async (req,res) => {
    await itempedido.findAll()
    .then(item => {
        return res.json({
            error: false,
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro de conexão."
        })
    })
});

app.put('/atualizar-itempedido', async (req,res) => {
    await itempedido.update(req.body,{
        where: {PedidoId: req.body.PedidoId},
    }).then(item => {
        return res.json({
            error: false,
            message: "O item foi alterado com sucesso.",
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item."
        });
    });

});

app.get('/excluir-itempedido', async (req,res) => {
    await itempedido.destroy({where: {valor: req.body.valor}})
    .then(() => {
        return res.json({
            error: false,
            message: "O Item foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do item."
        });
    });

});

app.post('/inserir-produto',async (req,res) => {
    await produto.create(
        req.body
    ).then(pro => {
        return res.json({
            error: false,
            message: "Produto criado com sucesso.",
            pro
        });
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Impossivel conectar."
        });
    });
   
});

app.get('/listar-produto', async (req,res) => {
    await produto.findAll()
    .then(pro => {
        return res.json({
            error: false,
            pro
        });
    });
});

app.put('/atualizar-produto', async (req,res) => {
    await produto.update(req.body,{
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "O produto foi atualizado com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização do produto."
        });
    });

});

app.get('/excluir-produto', async (req,res) => {
    await produto.destroy({
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "O produto foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do produto."
        });
    });

});

app.post('/inserir-compra', async (req,res)=>{
    await compra.create(
        req.body
    ).then(comp => {
        return res.json({
            error: false,
            message: "Compra criada com sucesso.",
            comp
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        });
    });
});

app.get('/listar-compra', async (req,res) => {
    await compra.findAll()
    .then(comp => {
        return res.json({
            error: false,
            comp
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na conexão."
        });
    });

});

app.put('/atualizar-compra', async (req,res) => {
    await compra.update(req.body,{
        where: {id: req.body.id}
    }).then(comp => {
        return res.json({
            error: false,
            message: "A compra foi atualizado com sucesso.",
            comp
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na atualização da compra."
        });
    });

});

app.get('/excluir-compra', async (req,res) => {
    await compra.destroy({
        where: {id: req.body.id}
    }).then(() => {
        return res.json({
            error: false,
            message: "A compra foi excluida com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão da compra."
        });
    });

});

app.post('/inserir-itemcompra', async (req,res)=>{
    await itemcompra.create(
        req.body
    )
    .then(item => {
        return res.json({
            error: false,
            message: "Item criado com sucesso",
            item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível criar o Item."
            });
        });
});

app.get('/listar-itemcompra', async (req,res) => {
    await itemcompra.findAll()
    .then(item => {
        return res.json({
            error: false,
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro de conexão."
        })
    })
});

app.put('/atualizar-itemcompra', async (req,res) => {
    await itemcompra.update(req.body,{
        where: {ProdutoId: req.body.ProdutoId},
    }).then(item => {
        return res.json({
            error: false,
            message: "O item foi alterado com sucesso.",
            item
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do item."
        });
    });

});

app.get('/excluir-itemcompra', async (req,res) => {
    await itemcompra.destroy({where: {valor: req.body.valor}})
    .then(() => {
        return res.json({
            error: false,
            message: "O Item foi excluido com sucesso."
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro na exclusão do item."
        });
    });

});

let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor Ativo: http://localhost:3001');
});