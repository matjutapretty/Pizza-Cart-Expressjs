module.exports = function (param){
    
    let counter = param || 0;

    function small(){
        counter++;
    }
    
    function medium(){
        counter++;
    }
    
    function large(){
        counter++;
    }

    function reset(){
        counter = 0;
    }
    
    function value(){
        counter
    }
    return {
        small,
        medium,
        large,
        value,
        reset
    }

}

