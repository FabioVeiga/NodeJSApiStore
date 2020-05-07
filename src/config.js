global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef' //token para autenticacao
global.EMAIL_TMPL = 'Ola, <string>{0}</strong>, seja bem vindo ao NODE Store'

module.exports = {
    connectionString: 'mongodb+srv://root:root4321@cluster0-0ajmi.mongodb.net/test?retryWrites=true&w=majority',
    sendgridKey: 'SUA CHAVE', //usa para enviar email
    containerConnectionString: 'SUA CHAVE' //para armazenar produtos
}