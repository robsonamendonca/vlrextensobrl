const express = require('express');
var extenso = require('extenso');


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({titulo: "Versão 0.0.1 converter para extenso BRL, uso vlr=0,00 "});
});


app.get("/vlr=:id", async (req, res) => {        
    const n = extenso(req.params.id, { mode: 'currency', currency: { type: 'BRL' } } );
    const id = req.params.id    
    try{    
        if(!id) return res.status(404).send({ error: 'Número nao informado'}) 
        if(typeof(id) === String) return res.status(403).send({ error: 'Número inforamdo não é valido'})     
        const extensoptbr = await extenso(id, { mode: 'currency', currency: { type: 'BRL' } });        
        res.send( { data: extensoptbr } );        

    }catch(error){    
       res.send({    
            error: 'Error',
            message: error.message    
       })    
    }   
});

app.listen(3000, () =>{
    console.log("Servidor iniciado na porta 3000: http://localhost:3000/");
});