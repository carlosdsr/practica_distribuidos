const net = require('net');

const socket = new net.Socket();

var port=19876;
var hostname='localhost';

socket.on('connect', function(){
    console.log("se conecto al host "+hostname+" en el puerto "+port)
})

socket.on('error', function(){
    console.log("Ocurrio un error")
    socket.destroy();
    process.exit();
})

socket.on('data', function(data){
    const msg = data.toString().trim();
    if(
        msg == "error invalid command" || msg == "error invalid user name" ||
        msg == "error invalid src ip" || msg == "error unvalidated user" || 
        msg == "ok bye"
    ){
        console.log(msg)
        console.log('el servidor se esta desconectando');
        socket.destroy();
        process.exit();
    }else{
        process.stdout.write(data);
    }
})
process.stdin.on('data', function(data){
    socket.write(data);
})

socket.connect(port,hostname); 