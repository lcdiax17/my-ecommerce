const mainCards = document.querySelector('main-cards')
const mainUl = document.querySelector('.main-ul')

let productsData = []
let countProductCart = 0
let countTotalPriceCart = 0


function ProductsDataList(list){

    for(let i = 0; i < list.length; i++){
        if(list[i].id > 0){
            productsData.push(list[i])
        }
    }
}
ProductsDataList(data)

function renderAllProducts(list){
    for(let i = 0; i < list.length; i++){
        const listLi = document.createElement('li')
        const imageLi = document.createElement('img')
        const tagLi = document.createElement('p')
        const titleLi = document.createElement('h3')
        const descriptionLi = document.createElement('p')
        const valueLi = document.createElement('p')
        const butttonLi = document.createElement('button')
    
        listLi.className = 'list-class'
        imageLi.className = 'image-li'
        tagLi.classList = 'tag-li'
        titleLi.className = 'title-li'
        descriptionLi.className = 'description-li'
        valueLi.className = 'value-li'
        butttonLi.className = 'button-li'
        
        imageLi.setAttribute('src', list[i].img)
        tagLi.innerText = list[i].tag
        titleLi.innerText = list[i].nameItem
        descriptionLi.innerText = list[i].description
        valueLi.innerText = `R$ ${list[i].value}`
        butttonLi.innerHTML = list[i].addCart
        butttonLi.id = `product-${list[i].id}`
        
        butttonLi.addEventListener('click', function(event){
            countProductCart++
            document.querySelector('#count-product').innerHTML = `${countProductCart}`

            countTotalPriceCart += list[i].value
            document.querySelector('#count-price').innerHTML = `R$ ${countTotalPriceCart},00`

            let productElement = event.target.id
            let id = parseInt(productElement.substring(8))
            let product = searchProduct(id)
            let liProductCart = productInMyCart(product)

            document.querySelector('.cart-list').appendChild(liProductCart)
            
            const removeCartEmpty = document.querySelector('.cart-empty')
            removeCartEmpty.classList.add('hidden-cart-empty')
        })
        listLi.append(imageLi, tagLi, titleLi, descriptionLi, valueLi, butttonLi)
        mainUl.appendChild(listLi)
    }
}

function searchProduct(id){
    for(let i = 0; i < data.length; i++){
        if(data[i].id === id){
            return data[i]
        }
    }
}

function productInMyCart(product){
    const cartLiProd = document.createElement('li')
    const cartImageProd = document.createElement('img')
    const cartTitleProd = document.createElement('h3')
    const cartValueProd = document.createElement('p')
    const cartButttonProd = document.createElement('button')

    cartImageProd.setAttribute('src', product.img)
    cartTitleProd.innerText = product.nameItem
    cartValueProd.innerText = `R$ ${product.value}`
    cartButttonProd.innerHTML = 'remover do carrinho'
    cartButttonProd.id = `product-${product.id}`

    cartLiProd.className = 'cart-product-list'
    cartImageProd.className = 'cart-product-image'
    cartTitleProd.className = 'cart-product-title' 
    cartValueProd.className = 'cart-product-value'
    cartButttonProd.className = 'cart-product-button'

    cartButttonProd.addEventListener('click', function(event){
        countProductCart--
        document.querySelector('#count-product').innerHTML = `${countProductCart}`

        countTotalPriceCart -= product.value
        document.querySelector('#count-price').innerHTML = `R$ ${countTotalPriceCart},00`

        let productElementRemovePath = event.composedPath()
        productElementRemovePath[1].remove()

        if(countProductCart === 0){
            const addCartEmpty = document.querySelector('.cart-empty')
            addCartEmpty.classList.remove('hidden-cart-empty')
        }
    })
    cartLiProd.append(cartImageProd, cartTitleProd, cartValueProd, cartValueProd, cartButttonProd)
    return cartLiProd
}

renderAllProducts(data)