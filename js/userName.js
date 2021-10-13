const PizzaCart = require('./functions');

module.exports = function userName() {
    const sessionId = {};

    function getUsername(session){

        if(!sessionId[session]){
            sessionId[session] = PizzaCart();
            return sessionId[session];
        } else {
            return sessionId[session];
        }
    }
    
    return {
        getUsername
    }
}