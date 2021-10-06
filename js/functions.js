module.exports = function PizzaCart() {

    let smallQty = 0;
    let medQty = 0;
    let largeQty = 0;

    let smallTotal = 0;
    let medTotal = 0;
    let largeTotal = 0;
    let totalCart = 0;
    let order = 0;
    //let payAmt = 0;
    let hiddenBtn = "hidden";

    function BtnClicked(event) {
        //event = event || window.event;
       //var target = event.target || event.srcElement;
        if (event === "smallAdd") {
            //priceUpdate()
            smallQty++;
        } else if (event === "medAdd") {
            medQty++;
        } else if (event === "largeAdd") {
            largeQty++;
        }
        if (event === "smallMinus") {
            smallQty--;
            if (smallQty < 0) {
                smallQty = 0;
            }
        } else if (event === "medMinus") {
            medQty--;
            if (medQty < 0) {
                medQty = 0;
            }
        } else if (event === "largeMinus") {
            largeQty--;
            if (largeQty < 0) {
                largeQty = 0;
            }
        }
    }

    function priceUpdate() {
        smallTotal = (smallQty * 49).toFixed(2);
        medTotal = (medQty * 89).toFixed(2);
        largeTotal = (largeQty * 129).toFixed(2);
        totalCart = (smallQty * 49.00 + medQty * 89.00 + largeQty * 129.00).toFixed(2);
    }

    function change(amount) {
        return (amount - totalCart).toFixed(2);
    }

    function resetCart() {
        smallQty = 0;
        medQty = 0;
        largeQty = 0;
        smallTotal = 0;
        medTotal = 0;
        largeTotal = 0;
        totalCart = 0;

        return {
            smallQty,
            medQty,
            largeQty,
            smallTotal,
            medTotal,
            largeTotal,
            totalCart,
        }
    }

function buySmall(){
smallTotal = smallTotal + 49.00
smallQty++
totalCart = totalCart + smallTotal
showOrderBtn();
}
function removeSmall(){
    smallTotal = smallTotal - 49.00
    smallQty--
    totalCart = totalCart - 49.00
    showOrderBtn();
}

function buyMed(){
    medTotal = medTotal + 89.00
    medQty++
    totalCart = totalCart + medTotal
    showOrderBtn();
    }
function removeMed(){
        medTotal = medTotal - 89.00
        medQty--
        totalCart = totalCart - 89.00
        showOrderBtn();
    }

function buyLarge(){
    largeTotal = largeTotal + 129.00
    largeQty++
    totalCart = totalCart + largeTotal
    showOrderBtn();
    }
function removeLarge(){
    largeTotal = largeTotal - 129.00
    largeQty--
    totalCart = totalCart - 129.00
    showOrderBtn();
    }

function getTotals(){
    return {
        smallTotal,
        medTotal,
        largeTotal,
        totalCart
    }
}

function getQuantities(){
    return {
        smallQty,
        medQty,
        largeQty
    }
}

function showOrderBtn(){
    //hiddenBtn = "block"
    if (totalCart > 0 ){
        hiddenBtn = "block";
    } else {
        hiddenBtn = "hidden";
    } 
}

function getHiddenBtn(){
    return hiddenBtn;
}

// function checkoutBtn(){
//     checkOut.classList.add('hidden');
//     payOut.classList.remove('hidden');
// {
//     return checkOut
// }
// }

// function checkOutClick(){
//     checkOut.classList.add('hidden');
//     payOut.classList.remove('hidden');
// }

    return {
        BtnClicked,
        priceUpdate,
        change,
        resetCart,
        buySmall,
        buyMed,
        buyLarge,
        removeSmall,
        removeMed,
        removeLarge,
        getTotals,
        getQuantities,
        getHiddenBtn,
        //checkoutBtn,
        //checkOutClick
    }


     }