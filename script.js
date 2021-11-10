// const

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal')
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');


// 🍀js0903. Render products . 시작하자마자 아이템목록 render하기

/* 
    products  : products.js 에서 가져온 variable
    innerHTML += 사용
    onClick 사용  - 🍖addToCart
*/

function renderProducts() {
    products.forEach((p_product)=>{
        productsEl.innerHTML += `
            <div class="item">
            <div class="item-container">
                <div class="item-img">
                    <img src="${p_product.imgSrc}" alt="${p_product.name}">
                </div>
                <div class="desc">
                    <h2>${p_product.name}</h2>
                    <h2><small>$</small>${p_product.price}</h2>
                    <p>
                        ${p_product.description}
                    </p>
                </div>
                <div class="add-to-wishlist">
                    <img src="./icons/heart.png" alt="add to wish list">
                </div>
                <div class="add-to-cart" onclick="addToCart(${p_product.id})">
                    <img src="./icons/bag-plus.png" alt="add to cart">
                </div>
            </div>
        </div>
        `
    });    
}

renderProducts();


// 🍀js1340.  Add to cart

/* 🍄js1340
10. 빈 array ...variable 만듬 ->  let cart 

20. click한 아이템id === products.js파일의 id 다르면, cart화면에 추가
array.find() : array에서 조건에 맞는것을 찾음

find..찾아낸 object ->  const item
...spread operator
product.js의 오브젝트 목록에 numberOfUnits:1 추가 (첫번째 아이템...)

30. click한 아이템id === products.js파일의 id 같으면, cart화면에 추가 x... 수량 up
array.some() : array에 조건에 맞는게 있으면 true..return함
🍖changeNumberOfUnits

40. -> updateCart -> renderCartItems : cart에 아이템 render

*/

let cart =[];

function addToCart(p_id) {
    
    // 🍉js1340-30
    if (cart.some((pp_item) => pp_item.id === p_id)) {
        changeNumberOfUnits('plus',p_id)        
    } 
    // 🍉js1340-20
    else {
        const item = products.find((pp_product) => pp_product.id === p_id);

        cart.push(
            {
                ...item,
                numberOfUnits: 1,
            }
        );
    }

    updateCart();    
}


// 🍀update Cart

function updateCart() {
    renderCartItems();
    
}

// 🍀renderCartItems :  cart에 아이템 render

function renderCartItems() {
    cartItemsEl.innerHTML="";
    cart.forEach((pp_item)=>{
        cartItemsEl.innerHTML += `
            <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${pp_item.id})">
                <img src="${pp_item.imgSrc}" alt="${pp_item.name}">
                <h4>${pp_item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${pp_item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${pp_item.id})">-</div>
                <div class="number">${pp_item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${pp_item.id})">+</div>           
            </div>
        </div>
        `
    });
}


// 🍀changeNumberOfUnits
function changeNumberOfUnits(params) {
    
}