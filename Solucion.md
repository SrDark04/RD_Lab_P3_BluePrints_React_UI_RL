
# SOLUCION DEL LABORATORIO 

## ESTUDIANTES:
1. Roger Mauricio Duran Guacaneme
2. Camilo Alfonso Leon Acosta



## PREPARACION DEL ENTORNO:

Relazamos la instalación de dependencias y configuración del proyecto con Vite, React, Redux Toolkit, Axios y Vitest. Se creó el archivo `.env` para definir la URL base del backend y se configuró el servicio de Blueprints para alternar entre el mock y el cliente real según la variable `VITE_USE_MOCK`.

Al realizar el `npm test`, se verificó que las pruebas unitarias iniciales pasaran correctamente, al no pasar esto lo que se realizó fue que en el archivo `vitest.config.js` se configuró el `globals: true`.

El tercer cambio realizado fue en el archivo `src/components/BlueprintCanvas.jsx` en donde se agrego un guard `if (!ctx) return` despues de obtener el contexto del canvas.
```
//Antes
const ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, canvas.width, canvas.height) 

//Después
const ctx = canvas.getContext('2d') 
if (!ctx) return
ctx.clearRect(0, 0, canvas.width, canvas.height)
```
En los tests, Vitest usa jsdom como entorno de navegador falso. jsdom no implementa el Canvas real (necesitaría el paquete canvas de npm). El archivo setup.js intenta poner un mock de getContext, pero el test de BlueprintCanvas.test.jsx hace esto:
```const spy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext')```
Ese spyOn reemplaza el mock del setup con un spy que llama al original de jsdom → jsdom retorna null. Entonces ctx era null y la línea ctx.clearRect(...) lanzaba TypeError: Cannot read properties of null.
Con el `if (!ctx) return`, el componente simplemente no dibuja nada en tests (lo cual está bien), y no explota.

Y el ultimo cambio que se realizo fue agregar los cambios en atributos `htmlFor` a los `<label>` e `id` en los `<inputs>` y `<textarea>`.
```
//Antes
<label>Author</label>
<input className="input" value={author}... />

//Después
<label htmlFor="bp-author">Author</label>
<input id="bp-author" className="input" value={author}... />
``` 

Pasa lo mismo para "Nombre" (`bp-name`) y "Puntos (JSON)" (`bp-points`). Esto debido a que los tests hacian esto:

```
fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: 'john' } }) 
```

`getByLabelText` busca un campo de formulario asociado a un label con ese texto. En HTML, la asociacion entre un <label> y su input se hace mediante:
- `<label htmlFor="X">` apuntando a `<input id="X">`

Ya que sin estos atributos, testing library encuentra el label con texto "Author" pero no encuentra ningun input conectado a el; de esta manera, lanza el error `"no form control was found associated to that label"`; este cambio ademas mejora la accesibilidad del formulario.


## IMPLEMENTACION DE APIMOCK Y APICLIENT:

En este encabezado nos encargamos de la implementacion de los servicios de 'apimock.js' y 'apiclientservice.js' los cuales implementan la misma interfaz, esto para poder alternar entre el mock y el cliente real segun la variable 'VITE_USE_MOCK' en el archivo '.env'.

Ahora, lo que se realizo en este encabezado fue la implementacion de los metodos de la interfaz, los cuales son: `getAll`, `getByAuthor`, `getByAuthorAndName` y `create`; entonces de este modo quedaron asi las siguientes clases.

`apimock.js`:
![apimock](resources/images/ClaseMockData.png)

`apiclientservice.js`:
![apiclient](resources/images/ClaseApiClient.png)

En estas clases podemos evidenciar que se implementaron los metodos de la interfaz, y en el caso de `apimock.js` se implemento un arreglo de objetos de prueba para poder retornar datos desde memoria, mientras que en `apiclientservice.js` se implemento el consumo del API REST real con Axios, junto a esto si implemento una forma de llamar los datos desde los diferentes endpoints del backend sin necesidad de tener que escribir la url completa, esto gracias a tener presente los principios SOLID, en escaso el principio de responsabilidad unica y open/close, ya que cada que nos envien la query con un usuario y sector en especifico lo que vamos a realizar es diseccionar esto para llamar el valor al endpoint correspondiente, de esta manera se puede tener un codigo mas limpio y organizado.

La forma en la que haremos esto es diseccionar la url que nos envien, `const parts = url.split('/').filter(part => part !== '');` esto nos va a permitir realizar una busqueda de los diferentes elementos que componen la url, para luego poder obtener el autor y el nombre del plano, de esta manera podemos llamar al endpoint correspondiente.
