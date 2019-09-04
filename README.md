## AGABOO Script Front End 
![REACT + Firebase = love](https://miro.medium.com/max/1624/1*CywxT9za2jlqaemf9vjYAQ.png)
<br>
<em>by DForce2055</em>

### Prerequisitos
Necesitas tener instalado un entorno **Node.js (node -v^10.15.3)**, **create-react-app (v^3.1.1)**, **yarn (v^1.17.3)**,
**GIT (^2.17.1)**, y **Firebase CLI (^7.3.0)**<br>

1. [NodeJS](https://www.hostinger.com.ar/tutoriales/instalar-node-js-ubuntu/)

2. [Create React APP](https://create-react-app.dev/docs/getting-started)
    - `npm install -g create-react-app`

3. [yarn](https://yarnpkg.com/es-ES/docs/install#debian-stable)
    - `apt-get install -yarn`

4. [Firebase CLI](https://firebase.google.com/docs/cli/?hl=es-419)
    - `npm install -g firebase-tools`

5. [GIT](https://git-scm.com/)
    - `apt-get install git`


### Paso-1
Bajarse el repositior de Git
#### `git clone https://github.com/dforce2055/agaboo-front.git`

### Paso-2
Una vez que la copia del repositorio finalizó, necesitas dejar lista tu aplicación para la implementación <em>(deploy)</em>para lo cual es necesario instalar dependencias y construir el proyecto <em>(build)</em><br>
Dentro de la carpeta del repositorio recientemente clonado ejecutar:
#### `cd agaboo-front`
#### `npm install`
#### `yarn build`


### Paso-3
Crearse un proyecto en Firebase
1. En Firebase console, haz clic en Agregar proyecto y, luego, selecciona o ingresa el Nombre del proyecto.<br>
Si ya tienes un proyecto de Google Cloud Platform (GCP) existente, puedes seleccionarlo del menú desplegable Nombre del proyecto. De lo contrario, ingresa un nombre de proyecto nuevo.<br>

2. Edita el ID del proyecto (opcional).
Firebase asignará de manera automática un ID único a tu proyecto de Firebase. Consulta la Información sobre los proyectos de Firebase para obtener detalles sobre cómo usa Firebase el ID del proyecto.
Una vez que Firebase aprovisione los recursos para tu proyecto, no podrás cambiar su ID. 
Para usar un identificador específico, debes editar el ID del proyecto durante este paso de la configuración.<br>

3. Sigue los pasos de configuración restantes en Firebase console y, luego, haz clic en Crear proyecto (o Agregar Firebase si usas un proyecto de Google existente).<br>

Firebase aprovisiona los recursos para tu proyecto de forma automática. Cuando finalice, verás la página de descripción general del proyecto en Firebase console.
![Step-3](https://miro.medium.com/max/1200/1*Rx4-_9d33LDquRCyLOk49w.gif)


### Paso-4
Luego, es necesario tener instalada la consola de Firebase, ya ques es una practica mantener siempre actualizadas tus herramientas a la ultima versión, la sugerencia es que corras el siguiente comando siempre que instales la CLI de Firebase.
#### `yarn global add firebase-tools`
o sin global
#### `yarn add firebase-tools` 

### Paso-5
Ahora es momento de conectar tu computadora local a la cuenta de Firebase. Te podes loguear en Firebase utilizando el siguiente comando. Vas a ser redirigido a la pagina de autentificación de Google.
#### `firebase login`

### Paso-6
Ahora es momento de inicializar tu sitio web utilizando la linea de comando. Ejecuta el siguiente comando:
#### `firebase init`


1. **Selecciona** Hosting: Configure and deploy Firebase Hosting sites<br>
2. **Selecciona** el Proyecto <em>(previamente creado)</em><br>
3. **Responde** las siguientes preguntas como se indica a continuación:<br>

What do you want to use as your public directory? (public) **build**
Configure as a single-page app (rewrite all urls to /index.html)? **Yes**
File build/index.html already exists. Overwrite? **No**

![Step-5](https://miro.medium.com/max/1600/1*9h8ykXF0nM2OOjxH6hvPTQ.png)


### Paso-7
Seleccionar el Proyecto previamente creado en Firebase, y brindale un **alias** ejecutando el siguiente comando:
#### `firebase use --add`

![Step-7](https://miro.medium.com/max/1138/1*3skC6tTLfXv3mTV40f3M9g.png)

### Paso-8
El último paso es realizar la implementación **(deploy)** de la aplicación, previamente corre de manera automática un **build**
#### `firebase deploy`
![Step-8](https://miro.medium.com/max/1343/1*dmR_ojBzKeEpRBb4YXQp6w.png)

Tu aplicación web ahora esta corriendo en el servidor de Firbase. Podes visitar tu pagina web utilizando la URL del Hosting provista por la **CLI**.

### Lo lograste
Felicitaciones :+1:, ahora ya sabes como realizar una implementación de tu aplicación en Firebase!

==============================================================================================

<br><br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
