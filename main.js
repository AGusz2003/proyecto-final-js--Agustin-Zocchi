// arrays con cada producto para seleccioanr
const products = [
    {
      id: 1,
      nombre:'FIFA 23',
      precio: 69.99,
      img:'./img/fifa-23-cover-star-kylian-mbappe.jpg',
    },
    {
      id: 2,
      nombre:'NBA 2k23',
      precio: 69.99,
      img:'./img/nba-2k23.jpg',
    },
    {
      id: 3,
      nombre:'SPIDERMAN MILES MORALE',
      precio: 49.99,
      img:'./img/spiderman.jpg',
    },
    {
      id: 4,
      nombre:'God of War Ragnarök',
      precio: 69.99,
      img:'./img/GodofWarRagnarök.webp',
    },
    {
      id: 5,
      nombre:'Resident Evil 4',
      precio: 59.99,
      img:'./img/resident-evil4.png',
    },
    {
      id: 6,
      nombre:'NFL PRO ERA',
      precio: 29.99,
      img:'./img/nfl-pro-era.png',
    },
    {
        id: 7,
        nombre:'Hogwarts Legacy',
        precio: 69.99,
        img:'./img/Hogwarts-Legacy.webp',
      },
      {
        id: 8,
        nombre: 'Grand Theft Auto V',
        precio: 19.79,
        img:'./img/gtav.webp',
      },
      {
        id: 9,
        nombre: 'Call of Duty®: Modern Warfare®',
        precio: 59.99,
        img:'./img/Call-of-Duty-Modern-Warfare.webp',
      },
      {
        id: 10,
        nombre: 'The Last of Us Part II',
        precio: 59.59,
        img:'./img/TheLastofUsPart-II.webp',
      },
      {
        id: 11,
        nombre: 'PGA TOUR 2K23',
        precio: 59.59,
        img:'./img/PGA-TOUR-2K23.webp',
      },
      {
        id: 12,
        nombre: 'NHL 23',
        precio: 59.59,
        img:'./img/NHL23.jfif',
      },
      {
        id: 13,
        nombre: 'MLB® The Show™',
        precio: 39.99,
        img:'./img/MLB.jfif',
      },
      {
        id: 14,
        nombre: 'Battlefield™ 2042',
        precio: 53.59,
        img:'./img/Battlefield-2042.jfif',
      },
      {
        id: 15,
        nombre: 'DARK SOULS',
        precio: 59.99,
        img:'./img/dark-soul.jfif',
      },
  ];
  
  products.forEach((product) => {
    document.getElementById('lista-productos').innerHTML += `
  
    <div class="card" style="width: 15rem;">
  
        <img src=${product.img} class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${product.nombre}</h5>
          <p class="precio">  <span class="u-pull-right ">US$${product.precio}</span></p>
          <a href="#" class="btn btn-primary agregar-carrito" data-id="${product.id}">Agregar al Carrito</a>
        </div>
    </div>
    
    `;
  });



// listado de las variables creadas

const listaProductos = document.getElementById("lista-productos");


const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#datos-carrito tbody");
const limpiarCarritobtn = document.querySelector("#limpiar-carrito");
const listaCarrito = document.querySelector("#lista-productos");
let productosCarrito = [];


// Agrega-limpia los Productos seleccionados el carrito de compras

registrarEventListeners();
function registrarEventListeners() {
    listaCarrito.addEventListener("click", agregarProductos);

    carrito.addEventListener("click", eliminarProducto);

    limpiarCarritobtn.addEventListener("click", () => {
        productosCarrito = [];
        limpiarHTML();
    })

    document.addEventListener("DOMContentLoaded", () => {
        productosCarrito = JSON.parse( localStorage.getItem ("carrito")) || [];
        carritoHTML()
    });

}

// Funciones

function agregarProductos(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        datosProducto(productoSeleccionado)
        
    }
}
// Esta funcion elimina un juego seleccionado
function eliminarProducto(e) {
    if(e.target.classList.contains("borrar-producto")) {
        const productoId =e.target.getAttribute("data-id");
        

        //Elimina del carrito por id
        productosCarrito = productosCarrito.filter( producto => producto.id !== productoId);
        console.log(productosCarrito);
        carritoHTML ();
        
        
    }
}
// consigue los datos del juego
function datosProducto(producto) {

    //objeto del producto seleccionado
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("h5").textContent,
        precio: producto.querySelector(".precio span").textContent,
        id: producto.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // lee que no haya juegos duplicados en carrito de compras

    const duplicado = productosCarrito.some( producto => producto.id === infoProducto.id);
    console.log(duplicado);
    if(duplicado) {
        // Actualiza la cantidad de juegos seleccionados
        const Producto = productosCarrito.map( producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        } );
        productosCarrito = [...Producto];
    } else {
    //agrega juegos al carrito de compras
        productosCarrito = [...productosCarrito, infoProducto];
    }

    console.log(productosCarrito);

    carritoHTML();
}

// refleja el carrito de compras en html

function carritoHTML () {

    limpiarHTML();

    productosCarrito.forEach( productocarrito => {
        const {imagen, titulo, id, precio, cantidad} = productocarrito;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${productocarrito.id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });

    // relacionado al Storage
    aplicarStorage()

}

function aplicarStorage() {
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}

// Elimina juegos mal cargados en el carrito de compras
function limpiarHTML() {
while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
}

