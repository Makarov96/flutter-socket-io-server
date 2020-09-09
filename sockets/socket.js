const { io } = require('../server')
const Bands = require('../models/bands')
const Band = require('../models/band')
const bands = new Bands()
console.log('init server')
    //Mensajes de Sockets

bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes del Silencio'))
bands.addBand(new Band('Metalica'))
    //console.log(bands);

io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => {
        console.log('Cliente desconetado')
    })


    client.on('mensaje', (payload) => {
        client.emit('mensaje', { admin: "Nuevo mensaje" });
    })

    client.on('vote-band', (payload) => {

        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands());

    })

    client.on('add-band', (payload) => {
        const band = new Band(payload.name)
        bands.addBand(band)
        io.emit('active-bands', bands.getBands());

    })


    client.on('delete-band', (payload) => {

        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands());

    })


    /** 
    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit('nuevo-mensaje', payload); //todos menos el que lo emitiio
    })*/

})