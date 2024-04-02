// CARRITO
let dataApi = [];
console.log(localStorage.length);
let pedido = {};
let infoProductos = {};

//DOM content es un escuchador de eventos que espera a que el DOM esté listo
window.addEventListener("DOMContentLoaded", () => {
    cargarData();
    let irCarrito = document.getElementsByClassName("carrito");
    let volverPag = document.getElementsByClassName('volver');
    if (irCarrito) {
        for (let i = 0; i < irCarrito.length; i++) {
            if (window.location.href.includes("carrito.html")) {
                irCarrito[i].addEventListener("click", llevarIndex, false);
            } else {
                irCarrito[i].addEventListener("click", llevarCarrito, false);
            }
        }
    }
    if (volverPag) {
        for (let i = 0; i < volverPag.length; i++) {
            volverPag[i].addEventListener("click", volver, false);
        }
    }
});

// Tener en cuenta el historial para retornar a la página anterior 
function volver() {
    window.history.back();
}

// Redirigir desde la imágen del carrito al carrito de compras
function llevarCarrito() {
    window.location.href = "carrito.html";
}

// Redirigir desde el logo al index
function llevarIndex() {
    window.location.href = "index.html";
}

// Barra de carga
function cargando(contenido) {
    contenido.innerHTML = `
        <div class="pantCarga">
            <h4 class="bold cargando">Cargando...</h4>
            <progress></progress>
        </div>
    `;
}

function cargarData() {
    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=aKH9kRl9QuVpiP0Bji5nUq7lD83LZezLxfanTB53qEr65N2UyG8uIzLqTseLc69Hy464Uf0QwJDas06Ni-2twIQg8khB3G1em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOl3ck_PTNYvy0t0nrORX1szhy8PZaJWULmuKVUdC8M4LxhQi662aDHj3dD788xtfCSY1bn1xpOhWmWOLiqvWQWyipUbFI23ldz9Jw9Md8uu&lib=MbWhOQopuA1SJavcvdXFcMip12Db7KcaW")
        .then((response) => response.json())
        .then((datos) => mostrarPlato(datos))
        .catch((error) => {
            //throw new Error("Error " + response.status + " al llamar al API: " + response.statusText + ": " + error);
            console.log("Error: " + error);
        })
    if (window.location.href.includes("entradas.html")) {
        let entradas = document.getElementById("entradas");
        cargando(entradas);
    } else if (window.location.href.includes("platosFuertes.html")) {
        let platosFuertes = document.getElementById("platosFuertes");
        cargando(platosFuertes);
    } else if (window.location.href.includes("bebidas.html")) {
        let bebidas = document.getElementById("bebidas");
        cargando(bebidas);
    } else if (window.location.href.includes("postres.html")) {
        let postres = document.getElementById("postres");
        cargando(postres);
    } else if (window.location.href.includes("carrito.html")) {
        if (localStorage.length > 0) {
            let contenido = document.getElementById("platosCarrito");
            cargando(contenido);
        }
    }
}

function mostrarPlato(datos) {
    setTimeout(() => {
        console.log(datos.data);
        dataApi = datos.data;

        if (window.location.href.includes("carrito.html")) {
            console.log(localStorage.length);
            mostrarCarrito();
        }

        // MOSTRAR PRODUCTOS
        if (window.location.href.includes("entradas.html")) {
            let entradas = document.getElementById("entradas");
            entradas.innerHTML = "";
        } else if (window.location.href.includes("platosFuertes.html")) {
            let platosFuertes = document.getElementById("platosFuertes");
            platosFuertes.innerHTML = "";
        } else if (window.location.href.includes("bebidas.html")) {
            let bebidas = document.getElementById("bebidas");
            bebidas.innerHTML = "";
        } else if (window.location.href.includes("postres.html")) {
            let postres = document.getElementById("postres");
            postres.innerHTML = "";
        }

        for (let i = 0; i < dataApi.length; i++) {
            infoProductos = {
                ID: dataApi[i]?.ID ?? "",
                Precio: dataApi[i]?.Costo ?? "",
                Cantidad: dataApi[i]?.Cantidad ?? ""
            };
            const platoHtml = `
                <li>
                    <h2 class="tituloFood">${dataApi[i]?.Nombre ?? ""}</h2>
                    <div>
                        <img alt="producto_${i}" class="imgComida" src="${dataApi[i]?.Imagen ?? ""}"/>
                        <section>
                            <p><span class="bold">ID:</span> ${dataApi[i]?.ID ?? ""}</p>
                            <p class="descripcion">${dataApi[i]?.Descripcion ?? ""}</p>
                            <p class="cost">$${dataApi[i]?.Costo ?? ""}</p>
                            <button class="agregarCarrito" onclick="agregarCarrito(${dataApi[i]?.ID})">Añadir al carrito</button>
                        </section>
                    </div>
                </li>
            `;

            console.log(dataApi[i]?.Tipo);

            switch (dataApi[i]?.Tipo) {
                case "Entrada":
                    if (window.location.href.includes("entradas.html")) {
                        entradas.innerHTML += platoHtml;
                    }
                    break;
                case "Plato principal":
                    if (window.location.href.includes("platosFuertes.html")) {
                        platosFuertes.innerHTML += platoHtml;
                    }
                    break;
                case "Bebida":
                    if (window.location.href.includes("bebidas.html")) {
                        bebidas.innerHTML += platoHtml;
                    }
                    break;
                case "Postre":
                    if (window.location.href.includes("postres.html")) {
                        postres.innerHTML += platoHtml;
                    }
                    break;
                default:
                    console.error("La categoría no existe: " + dataApi[i]?.Tipo);
                    break;
            };
        }
    }, 1000);
}

function agregarCarrito(id) {
    let index = 0;
    for (let i = 0; i < dataApi.length; i++) {
        if (id === dataApi[i].ID) {
            index = i;
            dataApi[i].Cantidad = 1;
            break;
        }
    }
    let yaHay = false;
    console.log(localStorage.length);
    if (localStorage.length > 0) {
        for (let j = 0; j < dataApi.length; j++) {
            if (j === id && localStorage.getItem(j) !== null) {
                cambiarCantidad(id, 1);
                yaHay = true;
                alert("¡Se ha actualizado la cantidad en el carrito!");
                break;
            }
        }
    }
    if (yaHay === false) {
        let info = { Precio: dataApi[index].Costo, Cantidad: dataApi[index].Cantidad, Nombre: dataApi[index].Nombre };

        console.log(info);
        localStorage.setItem(id, JSON.stringify(info));

        alert("¡Se ha añadido al carrito!");
    }
    console.log(localStorage.length);
    console.log(id, localStorage.getItem(id));
}

function mostrarCarrito() {
    if (window.location.href.includes("carrito.html")) {
        let contenido = document.getElementById("platosCarrito");
        let total = document.getElementById("total");
        setTimeout(() => {
            contenido.innerHTML = "";
            if (localStorage.length > 0) {
                for (let i = 0; i < localStorage.length; i++) {
                    let clave = localStorage.key(i);
                    let valor = localStorage.getItem(clave);
                    console.log(clave + ": " + valor);
                    const platoHtml = `  
                        <li>
                            <div>
                                <h3>ID: ${clave}</h3>
                                <h3 class="tituloFood">${JSON.parse(valor).Nombre}</h3>
                                <input type="hidden" name="id_producto_carrito_${(clave)}" value="${(clave)}" readonly>
                                <p><span class="bold">Valor unitario:</span> $${JSON.parse(valor).Precio ?? 0}</p>
                                <input type="hidden" name="precio_producto_carrito_${(clave)}" value=${JSON.parse(valor).Precio ?? 0}" readonly>
                                <p class="bold">Cantidad: ${JSON.parse(valor).Cantidad ?? 1}</p>
                                <button type="button" onclick="cambiarCantidad(${(clave) ?? 0}, -1)">-</button>
                                <input class="cantidad-carrito" type="number" name="cantidad_${(clave)}" value="${JSON.parse(valor).Cantidad ?? 1}" readonly>
                                <button type="button" onclick="cambiarCantidad(${(clave) ?? 0}, 1)">+</button>
                                <button class="borrar-plato" onclick="borrarPlato(${(clave) ?? 0})">X</button>
                            </div>
                        </li>
                    `;
                    contenido.innerHTML += platoHtml;
                }
                total.value = `${calcularTotal()}`;
            }
        }, 1000);
    }
}

function cambiarCantidad(id, cantidad) {
    console.log(id, cantidad);
    let plato = {};
    for (let j = 0; j < dataApi.length; j++) {
        if (j === id) {
            console.log(localStorage.getItem(j));
            plato = JSON.parse(localStorage.getItem(j));
            break;
        }
    }
    console.log(plato);
    if (plato) {
        if ((plato.Cantidad + cantidad) <= 0) {
            borrarPlato(id);
        } else {
            plato.Cantidad += cantidad;
            let info = { Precio: plato.Precio, Cantidad: plato.Cantidad, Nombre: plato.Nombre };
            localStorage.setItem(id, JSON.stringify(info));
        }
        mostrarCarrito();
    }
}

function calcularTotal() {
    let total = 0;
    if (localStorage.length > 0) {
        for (let i = 0; i < dataApi.length; i++) {
            if (localStorage.getItem(i) !== null) {
                total += JSON.parse(localStorage.getItem(i)).Precio * JSON.parse(localStorage.getItem(i)).Cantidad;
            }
        }
    }
    return total;
}

function borrarPlato(id) {
    localStorage.removeItem(id);
    mostrarCarrito();
}

// Limpiar la lista de compras
function limpiar() {
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('total').innerHTML = 0;
    localStorage.clear();
    mostrarCarrito();
    
}

// Enviar pedido
function pedir() {
    let listaProductos = [];
    for (let i = 0; i < dataApi.length; i++) {
        if (localStorage.getItem(i) !== null) {
            let producto = {
                ID: i,
                Precio: JSON.parse(localStorage.getItem(i)).Precio,
                Cantidad: JSON.parse(localStorage.getItem(i)).Cantidad
            };
            listaProductos.push(producto);
        }
    }
    console.log(listaProductos);
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;
    if (nombre === '' || telefono === '' || direccion === '') {
        alert('¡Por favor, diligencie todos los campos!');
        return;
    }
    else {
        // Pasar pedido en formato JSON
        async function postJSON(data) {
            try {
                const response = await fetch("https://script.google.com/macros/s/AKfycbxmgeoxpORC_J3i74H-n0U6_Jj_C9_hPiEuAblooFRhobCJ4NiSIilF0VKkOj-tp4kjNw/exec", {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: 'no-cors'
                });

                const result = await response.json();
                console.log("Success:", result);
            } 
            catch (error) {
                console.error("Error:", error);
            }
        }

        const data = {
            Nombre: nombre,
            Telefono: telefono,
            Direccion: direccion,
            Productos: listaProductos,
            Total: document.getElementById('total').value
        };
        console.log(data);
        postJSON(data);
    }

    // Borra el contenido de la lista de compras
    if (window.location.href.includes("carrito.html")) {
        document.getElementById('platosCarrito').innerHTML = '';
    };
    limpiar();

    // Muestra el mensaje de confirmación
    document.getElementById('mensajeConfirmacion').style.display = 'block';
}