//Selectors
const listInput = document.querySelector('.input-list');
const insertButton = document.querySelector('.insert-button')
const productList = document.querySelector('.product-list');


//Dark mode selectors
const body = document.querySelector('#body');
const header = document.querySelector('header');
const darkModeButton = document.querySelector('#mode-selector');

const darkModeClass = 'dark-mode';

//Events
document.addEventListener('DOMContentLoaded', getProducts);
insertButton.addEventListener('click', addProduct);
productList.addEventListener('click', deleteProduct);

const produto = document.getElementById('product')

//Dark mode events
darkModeButton.addEventListener('click', changeClasses);

//Functions
function addProduct(event) {

    if(listInput.value.trim().length > 0){
        event.preventDefault();

        //Creating List Div 
        const listDiv = document.createElement('div');
        listDiv.classList.add('product');
        saveLocalProducts(listInput.value);
    
        //Creating list
        const newList = document.createElement('li');
        newList.innerText = listInput.value;
        newList.classList.add('product-list');
    
    
        //Creating checkbox
        const checkProduct = document.createElement('input');
        checkProduct.type = "checkbox";
        checkProduct.innerHTML = '<i class="fa-regular fa-square-check"></i>'
        checkProduct.classList.add('product-checkbox');
    
        const deleteProductBtn = document.createElement('button');
        deleteProductBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteProductBtn.classList.add('delete-btn');
    
        listDiv.appendChild(checkProduct)
        listDiv.appendChild(newList);
        productList.appendChild(listDiv);
        listDiv.appendChild(deleteProductBtn);
    
        listInput.value = '';
    
        checkProduct.onclick = event => {
    
            if (event.target.checked) {
                const valor = prompt("Digite o valor do produto")
                product.value = Number(valor);
            }
        }
    } else {
        alert("Insira um produto válido!")
        listInput.value = '';
        return listInput.classList.add('error');
    }

}

function deleteProduct(event) {

    const item = event.target;

    if (item.classList[0] === "delete-btn") {
        const product = item.parentElement;

        removeLocalProducts(product)

        product.remove();
    }

    if (item.classList[0] === "product-checkbox") {
        const product = item.parentElement;
        product.classList.toggle('buyed');
    }
}

function saveLocalProducts(product) {

    //Verifica se já existem produtos salvos em LocalStorage
    let products;

    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    //Adiciona o produto ao array e salva no localStorage
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

}

function getProducts() {

    //Verifica se já existem produtos salvos em LocalStroage
    let products;

    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.forEach((product) => {

        const listDiv = document.createElement('div');
        listDiv.classList.add('product');

        const newList = document.createElement('li');
        newList.innerText = product;
        newList.classList.add('product-list');

        const checkProduct = document.createElement('input');
        checkProduct.type = "checkbox";
        checkProduct.innerHTML = '<i class="fa-regular fa-square-check"></i>'
        checkProduct.classList.add('product-checkbox');
        listDiv.appendChild(checkProduct)

        const deleteProductBtn = document.createElement('button');
        deleteProductBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteProductBtn.classList.add('delete-btn');

        listDiv.appendChild(newList);
        productList.appendChild(listDiv);
        listDiv.appendChild(deleteProductBtn);
    })
}

function removeLocalProducts(product) {

    let products;

    // Verifica se já existem produtos salvos em localStorage
    if (localStorage.getItem('products') === null) {
        // Se não houver, ele iniciará a variárvel todo com um array
        products = [];
    } else {
        // Se houver, ele buscará os produtos que já estão no localStorage
        products = JSON.parse(localStorage.getItem('products'));
    }
    // Busca o index do produto removido
    const productIndex = product.children[0].innerText;

    // Remove o produto do array, de acordo com o index recebido 
    products.splice(products.indexOf(productIndex), 1);

    // Atualiza o array no localStorage
    localStorage.setItem('products', JSON.stringify(products))
}

//Dark mode functions
function changeMode() {
    changeClasses();
}

function changeClasses() {
    body.classList.toggle(darkModeClass);
    darkModeButton.classList.toggle(darkModeClass);
    header.classList.toggle(darkModeClass);
}