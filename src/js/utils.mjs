// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  //get existing Data from localStorage.  If it doesn't exist yet, make an empty array
  let existingData = getLocalStorage(key) || [];
  //append the new data to the existingData
  existingData.push(data);
  //save to localStorage
  localStorage.setItem(key, JSON.stringify(existingData));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//week2
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

//used by ProductList
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear=false){
  const htmlStrings = list.map(templateFn);
  //use clear to wipe the element before loading with the template
  if (clear){
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}



/* 
   _____          _____ _______    _____ ____  _    _ _   _ _______ ______ _____  
  / ____|   /\   |  __ \__   __|  / ____/ __ \| |  | | \ | |__   __|  ____|  __ \ 
 | |       /  \  | |__) | | |    | |   | |  | | |  | |  \| |  | |  | |__  | |__) |
 | |      / /\ \ |  _  /  | |    | |   | |  | | |  | | . ` |  | |  |  __| |  _  / 
 | |____ / ____ \| | \ \  | |    | |___| |__| | |__| | |\  |  | |  | |____| | \ \ 
  \_____/_/    \_\_|  \_\ |_|     \_____\____/ \____/|_| \_|  |_|  |______|_|  \_\
*/

//cart superscript
export function renderCartCount(){
  const cartCounter = document.getElementById('cart-count');
  const cartCount = getCartCount();

  if (cartCount>0){
    showCartCounter(cartCounter);
  }
  else{
    hideCartCounter(cartCounter);
  }
  cartCounter.innerText = cartCount;

}
//Toggle visibility of the cart depending on if something is in it
//default is hidden
function showCartCounter(element){
  element.classList.add('visible');
  element.classList.remove('hidden');
}
function hideCartCounter(element){
  element.classList.add('hidden');
  element.classList.remove('visible');
}
function getCartCount() {
  const cart = getLocalStorage('so-cart');
  let cartCount = 0;
  if (cart !== null && cart !== undefined) {
    cartCount = cart.length;
  }
  return cartCount;
}
//#################################################################################
