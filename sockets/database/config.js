const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

      await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
    });

    console.log('DB online');

    } catch(e) {
        console.log(e);
        throw new('Error en la base de datos - Hable con el admin');
    }


}


module.exports = {
    dbConnection
}