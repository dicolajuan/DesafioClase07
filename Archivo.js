//const fs = require('fs');
import fs from 'fs';

export class Archivo {
    
    constructor(fileName) {
        this.fileName = fileName;
    }


    readFile = async () => {
        try{
            let rFile = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(rFile);
        } catch {
            return false;
            //throw new Error('Error al leer');
        }
    }

    saveFile = async (producto) => {
        try{
            await fs.promises.writeFile(this.fileName,JSON.stringify(producto,null,'\t'));
            console.log('Archivo grabado!');
        } catch  {
            throw new Error('Error al grabar');
        }
    }

    deleteFile = async () => {
        try{
            await fs.promises.unlink(this.fileName);
            console.log('Archivo eliminado!');
        } catch  {
            throw new Error('Error al eliminar');
        }
    }
    

}