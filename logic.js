const cart = JSON.parse(localStorage.getItem('cart')) || [];
const buttons = document.getElementsByClassName('btn-purchase');
const tableBody = document.getElementById('table-body');
const btnEnd = document.getElementById('btn-end');
const finalMessage = document.getElementById('final-message');
let totalPrice = 0;
let products = [];

for (const button of buttons) {
  button.addEventListener('click', answerClick);
}

function answerClick() {
  const prodToCart = products.find((product) => product.id == this.id);
  addToCart(prodToCart);
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: '¡Product added to cart!',
    showConfirmButton: false,
    timer: 1500
  });
}

function addToCart(prodToCart) {
  cart.push(prodToCart);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateAmountCart(); 
}

function renderCart() {
  if (tableBody) {
    tableBody.innerHTML = '';

    cart.forEach((product, index) => {
      tableBody.innerHTML += `
        <tr>
          <td>${product.type}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><button onclick="deleteFromCart(${index})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
      `;
    });

    updateTotalPrice();
  }
}

function deleteFromCart(index) {
  const deleteProduct = cart[index];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateAmountCart(); 
}

function updateTotalPrice() {
  const finalTotal = document.getElementById('total');
  totalPrice = cart.reduce((total, product) => total + product.price, 0);
  if (finalTotal) {
    finalTotal.innerHTML = 'Amount to pay $: ' + totalPrice;
  }
}

window.addEventListener('DOMContentLoaded', function () {
  obtainJsonProds();
});

if (btnEnd) {
  btnEnd.addEventListener('click', endPurchase);
}


function endPurchase() {
  Swal.fire({
    icon: 'success',
    title: '¡Purchase made!',
    text: '¡Thank you so much for shop on Kitsch, we hope to hear from you soon if you do not die!',
    showConfirmButton: false,
    timer: 2500
  }).then(() => {
    cart.length = 0;
    localStorage.removeItem('cart');
    renderCart();
    updateAmountCart(); 
  });
}

const selectedSection = document.getElementById('type');
  selectedSection.addEventListener('change', filterOnSection);


function filterOnSection() {
  const selectedSection = document.getElementById('type').value;
  const cards = document.getElementsByClassName('card');

  for (const card of cards) {
    const cardSection = card.getAttribute('data-type');

    if (selectedSection === '' || cardSection === selectedSection) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}

async function obtainJsonProds() {
  const URLJSON = './products.json';
  const answer = await fetch(URLJSON);
  const data = await answer.json();
  products = data;

  renderCart();
  updateAmountCart(); 
}


function updateAmountCart() {
  const amountCart = document.getElementById('amount-cart');
  if (amountCart) {
    amountCart.textContent = '' + cart.length;
  }
}

