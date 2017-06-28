var Q = require('q');
var product = require('./sanphamRepo');

exports.add = function(cart, item) {
    for (var i = 0; i < cart.length; i++) {
        if (item.product.ProID === cart[i].product.ProID) {
            cart[i].quantity += item.quantity;
            return;
        }
    }

    cart.push(item);
}

exports.update = function(cart, proId, quantity) {
    for (var i = 0; i < cart.length; i++) {
        if (proId === cart[i].product.ProID) {
            cart[i].quantity = quantity;
            cart[i].amount = quantity * cart[i].product.Price;
            return;
        }
    }
}

exports.remove = function(cart, proId) {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (proId === cart[i].product.ProID) {
            cart.splice(i, 1);
            return;
        }
    }
}

exports.sumQ = function(cart) {

    if (!cart) return 0;

    var total = 0;
    for (var i = cart.length - 1; i >= 0; i--) {
        total += cart[i].quantity;
    }

    return total;
}


exports.getTotal = function(cart) {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].amount;
    }
    return total;
}
