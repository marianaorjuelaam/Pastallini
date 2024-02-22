//tiene en cuenta el historial para retornar a la pagina anterior
//Dom content es un escuchador de eventos que espera a que el DOM este listo
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
