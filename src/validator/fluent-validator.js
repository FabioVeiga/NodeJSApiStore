
let errors = []

function ValitadionContract(){
    error = []
}

ValitadionContract.prototype.isRequired = (value,message) => {
    if(!value || value.length <= 0)
        errors.push({message: message})
}

ValitadionContract.prototype.hasMinLen = (value,min,message) => {
    if(!value || value.length <= min)
        errors.push({message: message})
}

ValitadionContract.prototype.hasMaxLen = (value,max,message) => {
    if(!value || value.length <= max)
        errors.push({message: message})
}

ValitadionContract.prototype.hasFixLen = (value,len,message) => {
    if(!value || value.length <= len)
        errors.push({message: message})
}

ValitadionContract.prototype.isEmail = (value,message) => {
    let reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    if(!reg.test(value))
        errors.push({message:message})
}

ValitadionContract.prototype.errors = () => {
    return errors
}

ValitadionContract.prototype.clear = () => {
    errors = []
}


ValitadionContract.prototype.isValid = () => {
    return errors.length == 0
}

module.exports = ValitadionContract