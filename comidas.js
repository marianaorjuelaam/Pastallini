// CARRITO
document.getElementById("agregarCarrito").addEventListener("click", mostrarData,true);
const carrito = [];
//localStorage.clear();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('volver').addEventListener('click', function() {
        window.history.back();
    });
});

function mostrarPlato(data){
    info = {
        ID: data.food[0]?.ID ?? "",
        Nombre: data.food[0]?.Nombre ?? ""
        /*Precio: data.food[0]?.Costo ?? ""*/
    };

        /*let ingredientes = "";
        let instancia1 = {};
        let instancia2 = {};
        for (let i = 1; i <= 15; i++) {
            elemento = data.drinks[0]?.[`strIngredient${i}`] ?? "";
            cantidad = data.drinks[0]?.[`strMeasure${i}`] ?? "";
            instancia1["strIngredient"+`${i}`] = elemento;
            instancia2["strMeasure"+`${i}`] = cantidad;
            if (elemento != "") {
                //console.log(elemento);
                //console.log(cantidad);
                ingredientes += `${cantidad} ${elemento} - `;
            }
            //console.log(ingredientes)
        }

        contenido.innerHTML =  `
            <img alt="cocktail" id="imagenCocktail" src="${data.drinks[0].strDrinkThumb}"/>
            <div class="informacionCocktail">
                <p><span class="bold">ID:</span> ${data.drinks[0]?.idDrink ?? ""}</p>
                <p><span class="bold">Name:</span> ${data.drinks[0]?.strDrink ?? ""}</p>
                <p><span class="bold">Category:</span> ${data.drinks[0]?.strCategory ?? ""}</p>
                <p><span class="bold">Ingredients:</span> ${ingredientes}</p>
                <p><span class="bold">Preparation:</span> ${data.drinks[0]?.strInstructions ?? ""}</p>
            </div>
        `;*/
}

function mostrarData (){
    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=aKH9kRl9QuVpiP0Bji5nUq7lD83LZezLxfanTB53qEr65N2UyG8uIzLqTseLc69Hy464Uf0QwJDas06Ni-2twIQg8khB3G1em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOl3ck_PTNYvy0t0nrORX1szhy8PZaJWULmuKVUdC8M4LxhQi662aDHj3dD788xtfCSY1bn1xpOhWmWOLiqvWQWyipUbFI23ldz9Jw9Md8uu&lib=MbWhOQopuA1SJavcvdXFcMip12Db7KcaW")
        .then((response) => response.json())
        .then((data) => mostrarPlato(data))
        .catch((error) => {
            throw new Error("Error " + response.status + " al llamar al API: " + response.statusText + ": " + error);
        })
    cargando();
    }   

function agregarFav(){
    if (carrito.includes(info)) {
        //aumentar cantidad
        return;
    } else {
        cocktailFavorite.push(info);
        localStorage.setItem(JSON.stringify(info.ID), JSON.stringify(info.Nombre));
    }
    /*console.log(cocktailFavorite);*/
    mostrarFavoritos();
}


//ANTES:

//tiene en cuenta el historial para retornar a la pagina anterior
//Dom content es un escuchador de eventos que espera a que el DOM este listo7

let lista = [];

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



