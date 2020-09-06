const { io } = require('../server');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado')
    client.on('disconnect', () => {
        console.log('Cliente desconetado')
    })


    client.on('mensaje', (payload) => {
        console.log('Mensaje: ' + payload.nombre)
        client.emit('mensaje', { admin: "Nuevo mensaje" });
    })
})