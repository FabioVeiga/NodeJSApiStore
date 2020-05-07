const app = require('../src/app') //inicializa APP
//importando pacotes
const http = require('http')
const debug = require('debug')('nodestr:server')

/*
 process.env = enviroment
 PORT = valor da porta de execusao
 se nao tem valor, SET 3000
*/
const port = normalizePort(process.env.PORT || 3000);
app.set('port',port)

const server = http.createServer(app) //criando o server com base na app


server.on('error',onError)//chamando a funcao, error = eventos
server.on('listening',onListening) //escuta o evento listining
console.log(`Server executing in localhost:${port}`)

server.listen(port)

//criando um funcao para saber se a porta que o server ira usar esta diponivel
function normalizePort(val){
    //tendo converter para inteiro
    let port = parseInt(val,10)

    //se nao for numero retornar 10
    if(isNaN(port)){
        return val
    }

    //se for maior que zero, retorna a porta
    if(port >= 0){
        return port
    }
    //renotnar nada
    return false
}

//rececbe oo erro do server para tratamento
function onError(error){
    if(error.syscall !== 'listen'){
        throw error
    }

    let bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch (error.code){
        case 'EACCES': //erro de permissao
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADRINUSE'://erro de endereco em uso
            console.error(bind + ' is already is use')
            process.exit(1)
            break
        default:
            throw error
    }
}

//funcao para o debug
function onListening(error){
    let addr = server.address()
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listing on ' + bind)//starta o debug
}