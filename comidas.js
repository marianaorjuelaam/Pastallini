//tiene en cuenta el historial para retornar a la pagina anterior
//Dom content es un escuchador de eventos que espera a que el DOM este listo7

let lista = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('volver').addEventListener('click', function() {
        window.history.back();
    });
});
//redirigir desde la imagen del carrito al carrito de compras
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('carrito').addEventListener('click', function() {
        window.location.href = 'carrito.html';
    });
});
//enviar
function pedir() {
    // Borra el contenido de la lista de compras
    document.getElementById('compras').innerHTML = '';

    // Muestra el mensaje de confirmación
    document.getElementById('mensajeConfirmacion').style.display = 'block';
}

function addCarrito() {

    window.location.href = 'carrito.html';

    const li = document.createElement('li');
    li.id = 'jugoTrad';

    li.innerHTML = "hola"

    const lugar = document.getElementById('compras');
    lugar.appendChild(li);  
}
