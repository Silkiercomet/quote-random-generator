const apiUrl = 'https://type.fit/api/quotes'

//una funcion async/await que trae el contenido de la api y devuelve una promesa con el metodo json()
//usamos try catch para interactar con el proceso de fetching en caso de que haya errores
async  function apiQuotes () {

    try{
        let response = await fetch(apiUrl)
        return response.json()
    }catch(err){
        console.log(err)
    }
} 

// esta funcion toma y retorna una promesa, la api usada aqui devuelve un objeto de 1643
// elementos asi que asignamos una variable para que tome un elemento random dentro de los limites
// del onjeto en cuestion, se usa el metodo JSON.stringify para convertirlo en una cadena de texto
const readJson = (x) => {

    return x.then((a) => {
         let quote = a[Math.floor(Math.random() * 1643)]
         return [JSON.stringify(quote.text),JSON.stringify(quote.author)]
     })

}

// esta funcion toma un promesa de dos elementos de largo que contienen dos cadenas de texto y las ubica
//en el lugar correspondiente de la pagina
const setTextAndAuthor = (z) => {

    z.then(a => {
        document.querySelector(".quote").classList.remove("fade")
        document.querySelector("#quote__autor").classList.remove("fade")
        // a[0] == text && a[1] == author


        setTimeout(function(){

            document.querySelector(".quote").textContent = a[0]
            document.querySelector("#quote__autor").textContent = a[1]

            document.querySelector(".quote").classList.add("fade")
            document.querySelector("#quote__autor").classList.add("fade")
        }, 500)
    })
}

// esta es una funcion compuesta, del paradigma de programacion funcional, toma dos argumentos (funciones)
// en la primera funcion y un argumento data en la segunda, luego utiliza estos argumentos para interactuar
// con el dato y cada la primera funcion en correr (g) interactua con el argumento data y la segunda (f)
// con el resultado de la funcion g

/* en este caso usamos una funcion flecha pero sin ella este seria el proceso

function compose(f,g) {
   return f(
       g(data)
    ) 
}
*/
const compose = (f,g) => (data) => f(g(data));

// aqui definimos una funcion que toma n cantidad de argumentos (con el uso del spread operator)
// y con el uso del metodo reduce (que tiene un argumento acumulado y otro a ser agregado )
// utilizamos la funcion compose previamente definida para seguir agregando nuevos valores a 
// interactuan con el acumulado ene ste caso el valor original con el que interactuaron previamente
// las demas funciones
function puchaseItem(...fns) {
    return fns.reduce(compose)
}
puchaseItem(
    setTextAndAuthor,
    readJson,
    apiQuotes   
)()

// usamos un event listener para que el usuarion agrege nuevas frases 
document.querySelector("#new__quote").addEventListener('click', function(){
    puchaseItem(
        setTextAndAuthor,
        readJson,
        apiQuotes
           
    )()
})
