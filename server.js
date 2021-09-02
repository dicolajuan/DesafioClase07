import express from 'express';
import { Archivo } from './Archivo.js';

const app = express();
const PORT = 8080;
let objVisitas = {
    visitas: {
        items: 0,
        itemRandom: 0
    }
};
let objFile = new Archivo('./productos.txt');

const getAllItems = async (rFile) => {
    let rfile = await rFile.readFile();
    return rfile;
}

const server = app.listen(PORT, () => {
    console.log(`Estas escuchando en el puerto: ${server.address().port}`);
});

server.on('ERROR', error => console.log(`Error en servidor: ${error}` ));

app.get('/items', async (req,res) => {
    try{
        let prodArray = await getAllItems(objFile);
        let items = {
            items: prodArray,
            cantidad: prodArray.length
        }
        objVisitas.visitas.items ++;
        //console.log(objVisitas);
        res.send(
            `<h1> Items </h1> 
            <p> ${JSON.stringify(items,null,'\t')} </p>
            <a href="/">Home</a>
            `);
    } catch {
        console.log('Error al obtener los productos');
        res.send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});


app.get('/item-random', async (req,res) => {
    try{
        let prodArray = await getAllItems(objFile);
        let random = Math.floor(Math.random() * ((prodArray.length + 1) - 0)) + 0;
        let item = {
            items: prodArray[random]
        }
        objVisitas.visitas.itemRandom ++;
        //console.log(objVisitas);
        res.send(
            `<h1> Item </h1> 
            <p> ${JSON.stringify(item,null,'\t')} </p>
            <a href="/">Home</a>`
            );
    } catch {
        console.log('Error al obtener el producto');
        res.send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});

app.get('/visitas', (req,res)=>{
    try{
        res.send(
            `<h1 style="color:blue"> Visitas </h1>
            <p> ${JSON.stringify(objVisitas,null,'\t')} </p>
            <a href="/">Home</a>`
            );
    } catch {
        console.log('Error al obtenerlas visitas');
        res.send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});

app.get('/', (req,res)=>{
    try{
        res.send(
            `<h1 style="color:blue"> Bienvenidos al Servidor Express </h1>
            <a href="/items">Items</a>
            <a href="/item-random">Item Random</a>
            <a href="/visitas">Visitas</a>`
            );
    } catch {
        console.log('Error al cargar el Home');
        res.send('<h1 style="color:red"> Parece que hubo un error </h1> ');
    }
});
