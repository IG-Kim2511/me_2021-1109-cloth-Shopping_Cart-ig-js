// const

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal')
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');


//products.js 에서 가져온 data확인
console.log(products)

// 🍀js09. Render products . 시작하자마자 아이템목록 render하기

/* 
  🦄productsData  : products.js 에서 가져온 variable
    
  🦄innerHTML += 사용
  
  🦄onClick 사용  - 🥒js13, addToCart
    JS로 rendering한 element에 variable할 수 없을 때..
    rendering할때, onClick 넣으면 간단함!!    
*/

   
renderProducts();
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
                <div class="add-to-cart" onclick="addToCart(${p_product.id})">
                    <img src="./icons/bag-plus.png" alt="add to cart">
                </div>
            </div>
        </div>
        `
    });    
}




// 🍀js13. Add to cart

// 🍉js13-10, 🍖js13-20, 
// let cart =[];

// 🍖js45-30,-40,-50,-60, localStorage
let cart = JSON.parse(localStorage.getItem("CART")) || [];


/* 
    🦄object....ID 찾아서 전체 목록 불러오기

    object.find((~)=>{~})
*/

/* 
    🦄array 문법... objectArray에 사용 가능함

    Ok : objectArray.find((~)=> ~ === ~ )

    x : objectArray.find((~)=> { ~ === ~ } )
*/

/* 🍄js13
    10. 빈 array ...variable 만듬 ->  let cart 

    20. click한 아이템id !== products.js파일의 id 다르면, cart화면에 추가
    array.find() : array에서 조건에 맞는것을 찾음

    find..찾아낸 object ->  const item
    ...spread operator
    products.js의 오브젝트 목록에 numberOfUnits:1 추가 (첫번째 아이템...)

    30. click한 아이템id === products.js파일의 id 같으면, cart화면에 추가 x... 수량 up & down
    ->🍖js28. changeNumberOfUnits함수 실행

    array.some() : array에 조건에 맞는게 있으면 true..return함
    ->🍖js09. onClick

    40. -> updateCart -> renderCartItems : cart에 아이템 render
*/

function addToCart(p_id) {
    
    // 🍉js13-30
    if (cart.some((pp_item) => pp_item.id === p_id)) {
        changeNumberOfUnits('plus',p_id)     /* js28 */   
    } 
    // 🍉js13-20
    else {
        // products : data.js에서 가져온 데이터
        const item = products.find((product) => product.id === p_id);

        // cart.push(item);
        cart.push(
            {
                ...item,
                numberOfUnits: 1,
            }
        );
    }
    console.log(cart)
    updateCart();    
}


// 🍀js13-40.update Cart
// 🍀js45. localStorage. save cart to local  storage
/* 🍄js45. 

    10. localStorage.setItem : update할때마다 local에 저장 

    20. JSON.stringify(): array -> json으로 저장

    30. localStorage.getItem : local에서 pull

    40. json.parse.. : array로 만듬

    50 updadeCart호출... -> renderCartItems에 적용

    60.  || []; 추가 : 첫 화면의 empty array에서도 실행되게...
*/

function updateCart() {
    renderCartItems();
    renderSubtotal();

    // 🍉js 45-10, js45-20
    // localStorage.setItem('CART',cart);
    localStorage.setItem('CART',JSON.stringify(cart));    
}
updateCart();

// 🍀js13-40. renderCartItems :  cart에 아이템 render

/* 🍄
    onclick "changeNumberOfUnits" - 🍖js28
    onclick "removeItemFromCart" - 🍖js41
*/

function renderCartItems() {
   
    /* 클릭할때마다 초기화 (초기화안하면, + - 할때,  이전목록도 같이 render됨)*/
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
                <img src="./img/icons8-delete-128.png" alt="" class="delete"  onclick="removeItemFromCart(${pp_item.id})">
            </div>
            <div class="units">
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${pp_item.id})">+</div>           
                <div class="number">${pp_item.numberOfUnits}</div>
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${pp_item.id})">-</div>
            </div>
        </div>
        `
    });
}

// 🍀js28. + - 버튼 클릭한때, change Number Of Units, 

/* 🦄
return { ~ } 형식 가능함

action, id...2개의 parameter 가져와서 사용하는 알고리즘
*/

/* 🍄
10. cart 안의 item.id === onclick으로 넘어온 id가 같다면...함수실행

 10-10. minus + 1보다 큰때에만 적용

 10-20. plus + instock보다 작을때에만 적용

20. cart 안의 item.id !== onclick으로 넘어온 id가 다르면... return : 바뀌지않은 이전 numberOfUnit 넣음. = 그대로 유지 (새 item... cart 칸에 추가)
*/

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,

      numberOfUnits: numberOfUnits, /* 🍖js3510. */
    //   numberOfUnits,
    };
  });

  updateCart();
}

//🦄 🍀js35. calculate, renderSubtotal 

/*
🦄 🍄 calculate - add, remove 모두 한번에 간단하게!!!

10. price (products.js의 오브젝트)

20. number of units 를 동적으로 products.js의 오브젝트 목록에 넣음

30 price * number of units 하면 자동으로 계산이 됨 
*/

/* 🦄
.toFixed(2)
*/


function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((pp_item)=>{
        totalPrice += pp_item.price * pp_item.numberOfUnits;
        totalItems += pp_item.numberOfUnits;
    });

    // subtotalEl.innerHTML =  `Subtotal (0 items): $0`;
    subtotalEl.innerHTML =  `Subtotal (${totalItems} items): $ ${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML= totalItems;    
}


// 🍀js41. remove item from cart
/* 🍄
  05. remove item을 제외한 새로운 object-array 만듬

  10. render html에서... onclick="removeItemFromCart(${pp_item.id})" 가져옴

  20. filter... cart안의 아이템들 id - onclick에서 가져온 id 비교

  20-2. 서로 다른것만 filter해서 cart array 다시 만듬 
  
  20-4.(서로 같으면 새로운 cart array에서 filter로 걸러져서 제외됨)
*/

// 🦄array.filter( ~~ => ~~~)

function removeItemFromCart(p_id) {
    cart = cart.filter (pp_item => pp_item.id !== p_id);

    updateCart();    
}



//🍀localStorage.clear(); /  location.reload();    
// 🍖js13-10,

const deleteAllBtn = document.querySelector('.delete-all-btn');
const checkoutBtn = document.querySelector('.checkoutBtn');

deleteAllBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();    
});

checkoutBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();    
   
    alert(`Thank you`);

});

