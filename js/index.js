const image=document.getElementById('image')
const box=document.getElementsByClassName('image-box')
const meal_name=document.getElementById('name')
const container=document.getElementsByClassName('box-container')
const imageBox=document.getElementsByClassName('image-box')


const api = "https://foodish-api.herokuapp.com/api/images/";

const meals = ['biryani','burger','butter-chicken'];

function getRandomMeal() {
    var randomMeal = meals[Math.floor(Math.random() * meals.length)];
    
    fetch(api + randomMeal)
        .then((response) => {
            return response.json();
           
        })
        .then((meal) => {
        
        meal_name.innerHTML = randomMeal.charAt(0).toUpperCase() + randomMeal.slice(1);
     

             image.src = meal.image;
   
        });
}
getRandomMeal()

//Working on the shopping cart

let carts=document.querySelectorAll('.btn')
let products=[
  {
name:"Spicy Noodle",
price:500,
inCart:0,
tag:"images/home-img-1.png"
},
{
name:"Fried Chicken",
price:1000,
inCart:0,
tag:"images/home-img-2.png"
},
{
name:"Hot Pizaa",
price:1100,
inCart:0,
tag:"images/home-img-3.png"
},
{
name:"Burger",
price:650,
inCart:0,
tag:"images/dish-1.png"
},
{
name:"Fresh Juice",
price:400,
inCart:0,
tag:"images/Fresh Juice.png"

},
{
name:"Fried Chicken",
price:800,
inCart:0,
tag:"images/Fresh Juice.png"
},
{
name:"Pizza",
price:900,
inCart:0,
tag:"images/dish-4.png"
},
{
name:"Burger + Chips",
price:999,
inCart:0,
tag:"images/Burger600.png"

},
{
name:"Fried Fish",
price:600,
inCart:0,
tag:"images/Fried Fish.jpg"
},
{
name:"Pasta",
price:600,
inCart:0,
tag:"images/pasta11.jpg"
},
{
name:"Cake",
price:750,
inCart:0,
tag:"images/Cake1.png" 
},
{
name:"Burger",
price:750,
inCart:0,
tag:"images/dish-1.png"
}


];
for(let i=0;i<carts.length;i++)
{

 carts[i].addEventListener('click',()=>{
  cartNumbers(products[i]);
  totalCost(products[i])
  displayCart(products[i])

 })  

}
function onLoadCartNumber(){
let productNumbers=localStorage.getItem("cartNumbers")
if(productNumbers){
 document.querySelector('.fa-shopping-cart span').textContent=productNumbers;
}

}
function cartNumbers(product){

  let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers)
  if(productNumbers){
     localStorage.setItem('cartNumbers',productNumbers+1);
     document.querySelector('.fa-shopping-cart span').textContent=productNumbers+1;

  }else{
     localStorage.setItem('cartNumbers',1);
     document.querySelector('.fa-shopping-cart span').textContent=1;
  }
    setItems(product);

}

function setItems(product){
let cartItems=localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems)
// console.log("My cart item",cartItems);

if(cartItems != null){

  if(cartItems[product.tag] ==undefined){
    cartItems={

          ...cartItems,
          [product.tag]:product

    }

  }
  cartItems[product.tag].inCart += 1;
}else{

   product.inCart =1 ;

  cartItems={
    [product.tag]:product

}

}
  localStorage.setItem("productsInCart",JSON.stringify
  (cartItems));

}

//Creating a function to get the total cost 
//in the cart
function totalCost(product){
  //console.log("Products price",product.price);
  let cartCost=localStorage.getItem('totalCost')
  
  console.log('My cartCost is',cartCost);
  //console.log(typeof cartCost)
if(cartCost != null){
  cartCost=parseInt(cartCost);
  localStorage.setItem('totalCost',cartCost+product.price)

}else{

localStorage.setItem("totalCost",product.price);

}

}
function displayCart(){

let cartItems=localStorage.getItem("productsInCart");
cartItems=JSON.parse(cartItems)
let productContainer=document.querySelector(".products");
let cartCost=localStorage.getItem('totalCost')

console.log(cartItems);
if(cartItems && productContainer){

productContainer.innerHTML="";
Object.values(cartItems).map(item=>{
productContainer.innerHTML+=`

<div class="product">
<ion-icon name="close-circle"></ion-icon>
<img src="${item.tag}" class="tag">
<span class="name">${item.name}</span>


<div class="price" >Ksh.${item.price}.00</div>
<div class="quantity">
<ion-icon name="arrow-dropleft-circle"></ion-icon>
<span class="inCart">${item.inCart}</span>
<ion-icon name="arrow-dropright-circle"></ion-icon>
</div>
<div class="total">
Ksh.${item.inCart*item.price}.00
</div>
</div>
`


})
productContainer.innerHTML+=`
<div class="basketTotalContainer">
    <h4 class="basketTotalTitle">
    Basket Total
    <h4>
    <h4 class="basketTotal">
    Ksh.${cartCost}.00
    
    </h4>


`




}


}
displayCart();
onLoadCartNumber();


let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 150,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;



