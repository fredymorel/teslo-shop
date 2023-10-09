

export const fileFilter = (req: Express.Request, file:Express.Multer.File, callback: Function) =>{
    if (!file) return callback(new Error ('File is empty'),false);

    const fileExtension = file.mimetype.split('/')[1];//para saber la extension del archivo ej .jpg .pdf
    const validExtension = ['jpg','jpeg','png','gif'];//tipo de archivos aceptados

    if( validExtension.includes (fileExtension)){
        return callback(null,true)
    }
    callback (null,false);
}