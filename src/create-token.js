const AVAILABLE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

module.exports = (size) => {
    let token = '';

    for(let i = 0; i < size; i++){
        token += AVAILABLE_CHARACTERS.charAt(Math.floor(Math.random() * AVAILABLE_CHARACTERS.length));
    }

    return token;
}
