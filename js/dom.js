const smallAddBtn = document.querySelector(".addBtn.small");
const medAddBtn = document.querySelector(".addBtn.med");
const largeAddBtn = document.querySelector(".addBtn.large");

const smallAddBtnBuy = document.querySelector(".addBtn.small.buy");
const medAddBtnBuy = document.querySelector(".addBtn.med.buy");
const largeAddBtnBuy = document.querySelector(".addBtn.large.buy");

const smallMinusBtn = document.querySelector(".minusBtn.small");
const medMinusBtn = document.querySelector(".minusBtn.med");
const largeMinusBtn = document.querySelector(".minusBtn.large");

const smallPizzaQty = document.querySelector(".smallPizzaQty");
const medPizzaQty = document.querySelector(".medPizzaQty");
const largePizzaQty = document.querySelector(".largePizzaQty");

const smallPizzaTotal = document.querySelector(".smallPizzaTotal");
const medPizzaTotal = document.querySelector(".medPizzaTotal");
const largePizzaTotal = document.querySelector(".largePizzaTotal");
const cartTotal = document.querySelector(".cartTotal");

const order = document.querySelector(".order");

const payOut = document.querySelector(".payOut");
const message = document.querySelector(".message");
const payAmt = document.querySelector(".payAmt");
const payBtn = document.querySelector(".payBtn");

const shoppingCart = PizzaCart();

function BtnClicked(event) {
   pizzaCart.BtnClicked(event.target.dataset.size);

   smallPizzaQty.innerHTML = shoppingCart.qtyUpdate().smallQty;
   medPizzaQty.innerHTML = shoppingCart.qtyUpdate().medQty;
   largePizzaQty.innerHTML = shoppingCart.qtyUpdate().largeQty;

    smallPizzaTotal.innerHTML = shoppingCart.priceUpdate().smallCost;
    medPizzaTotal.innerHTML = shoppingCart.priceUpdate().medCost;
    largePizzaTotal.innerHTML = shoppingCart.priceUpdate().largeCost;
    cartTotal.innerHTML = shoppingCart.priceUpdate().totalCart;

    if (shoppingCart.priceUpdate().totalCart > 0) {
        order.classList.remove('hidden');
    } else {
        order.classList.add('hidden');
        payOut.classList.add('hidden');
    } 
}

function checkOutClick(){
    order.classList.add('hidden');
    payOut.classList.remove('hidden');
}

function payment(){
    message.classList.toggle('hidden');
    var paymentAmt = Number(payAmt.value);
 if (paymentAmt == shoppingCart.priceUpdate().totalCart){
    message.innerHTML = "Enjoy your Pizza!";
    shoppingCart.resetCart();
    order.classList.remove('hidden');

    smallPizzaQty.innerHTML = shoppingCart.resetCart().smallQty;
    medPizzaQty.innerHTML = shoppingCart.resetCart().medQty;
    largePizzaQty.innerHTML = shoppingCart.resetCart().largeQty;

    smallPizzaTotal.innerHTML = shoppingCart.resetCart().smallTotal;
    medPizzaTotal.innerHTML = shoppingCart.resetCart().medTotal;
    largePizzaTotal.innerHTML = shoppingCart.resetCart().largeTotal;
    cartTotal.innerHTML = shoppingCart.resetCart().totalCart;

    setTimeout(function () {
        message.classList.toggle('hidden');
        order.classList.toggle('hidden');
        payOut.classList.add('hidden');
        payAmt.value = "";
    }, 2500);

 } else if (paymentAmt > shoppingCart.priceUpdate().totalCart) {
    //var change = paymentAmt - totalCart;
    message.innerHTML = "Enjoy your Pizza, here is your change R" + shoppingCart.change(paymentAmt);
    shoppingCart.resetCart();
    order.classList.toggle('hidden');

    smallPizzaQty.innerHTML = shoppingCart.resetCart().smallQty;
    medPizzaQty.innerHTML = shoppingCart.resetCart().medQty;
    largePizzaQty.innerHTML = shoppingCart.resetCart().largeQty;

    smallPizzaTotal.innerHTML = shoppingCart.resetCart().smallTotal;
    medPizzaTotal.innerHTML = shoppingCart.resetCart().medTotal;
    largePizzaTotal.innerHTML = shoppingCart.resetCart().largeTotal;
    cartTotal.innerHTML = shoppingCart.resetCart().totalCart;

    setTimeout(function () {
        message.classList.toggle('hidden');
        order.classList.toggle('hidden');
        payOut.classList.add('hidden');
        payAmt.value = "";
    }, 2500);

} else{
    message.innerHTML = "Sorry, that is not enough money!";
    setTimeout(function () {
        order.classList.add('hidden');
        message.classList.toggle('hidden');
    }, 2500);
}
}

smallAddBtn.addEventListener('click', BtnClicked);
smallMinusBtn.addEventListener('click', BtnClicked);
smallAddBtnBuy.addEventListener('click', BtnClicked);

medAddBtn.addEventListener('click', BtnClicked);
medMinusBtn.addEventListener('click', BtnClicked);
medAddBtnBuy.addEventListener('click',BtnClicked);

largeAddBtn.addEventListener('click', BtnClicked);
largeMinusBtn.addEventListener('click', BtnClicked);
largeAddBtnBuy.addEventListener('click',BtnClicked);

checkOut.addEventListener('click', checkOutClick)

payBtn.addEventListener('click', payment)