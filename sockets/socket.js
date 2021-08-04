const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Socket Messages
io.on('connection', client => {
    console.log('Client connected')

    // Verificar autenticación
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) { return client.disconnect();}

    // Cliente autenticado
    usuarioConectado ( uid );


    // Ingresar al usuario a una sala en particular

    // Sala Global (Todos los dispositivos conectados) (client.id, )

    client.join( uid );

    client.on('mensaje-personal', async ( payload ) => {
        
        // Grabar mensaje
        await grabarMensaje( payload );
        io.to(payload.para).emit('mensaje-personal', payload);



    });

    client.on('disconnect', () => { 
        console.log('Client disconnected')

        usuarioDesconectado( uid );
     });

    client.on('mensaje', (payload) => {
        io.emit('mensaje', {admin: 'Nuevo mensaje'})
    }); 



   


});
