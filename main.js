const itemsDatabase = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];
 const barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];
// printReceipt(barcodes);
function printReceipt(barcodes) {
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)

    cartItems = groupItemsWithCount(barcodes);
    cartItemsDetail = getItemsDetail(cartItems, itemsDatabase);
    cartItemsDetailWithTotalPrice = getItemsDetailWithTotalPrice(cartItemsDetail);
    totalPrice = getCartItemsTotalPrice(cartItemsDetailWithTotalPrice);
    var receipt = formatReceipt(cartItemsDetailWithTotalPrice, totalPrice);
    console.log(receipt);

}

function groupItemsWithCount(barcodes){
    var itemsList = {};
    var cartItems = [];
    for (let i=0; i<barcodes.length; i++){
        if (itemsList[barcodes[i]]==null){
            var newItem = {
                barcode: barcodes[i],
                quantity: 1
            }
            itemsList[barcodes[i]] = newItem;
        }else{
            itemsList[barcodes[i]].quantity++;
        }
    }
    for (var barcode in itemsList){
        cartItems.push(itemsList[barcode]);
    }
    return cartItems;
}

function getItemsDetail(cartItems, itemsDatabase){
    var cartItemsDetail = [];
    cartItems.forEach(itemInCart => {
        itemsDatabase.forEach(itemInDatabase => {
            if (itemInCart.barcode == itemInDatabase.barcode){
                var itemDetail = {
                    barcode: itemInCart.barcode,
                    name: itemInDatabase.name,
                    unitPrice: itemInDatabase.price,
                    quantity: itemInCart.quantity
                }
                cartItemsDetail.push(itemDetail);
            }
        })
    });
    return cartItemsDetail;
}

function getItemsDetailWithTotalPrice(cartItemsDetail){
    var cartItemsDetailWithTotalPrice = [];
    cartItemsDetail.forEach(itemInCart=>{
        var itemTotalPrice = itemInCart.quantity * itemInCart.unitPrice;
        var itemDetailWithTotalPrice = {
            barcode: itemInCart.barcode,
            name: itemInCart.name,
            unitPrice: itemInCart.unitPrice,
            quantity: itemInCart.quantity,
            totalPrice: itemTotalPrice
        }
        cartItemsDetailWithTotalPrice.push(itemDetailWithTotalPrice);
    })
    return cartItemsDetailWithTotalPrice;
} 

function getCartItemsTotalPrice(cartItemsDetailWithTotalPrice){
    var totalPrice = 0;
    cartItemsDetailWithTotalPrice.forEach(item => {
        totalPrice += item.totalPrice;
    })
    return totalPrice;
}

function formatReceipt(cartItemsDetailWithTotalPrice, totalPrice){
    var receipt = '\n***<store earning no money>Receipt ***\n';
    cartItemsDetailWithTotalPrice.forEach(item => {
        var itemDescription = `Name: ${item.name}, Quantity: ${item.quantity}, Unit price: ${item.unitPrice} (yuan), Subtotal: ${item.totalPrice} (yuan)`;
        receipt += itemDescription + '\n';
    })
    receipt += '----------------------\n';
    receipt += `Total: ${totalPrice} (yuan)\n`;
    receipt += '**********************';
    return receipt;
}


module.exports = {
    printReceipt
};

