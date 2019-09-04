## AGABOO Script Front End 
![REACT + Firebase = love](https://miro.medium.com/max/1624/1*CywxT9za2jlqaemf9vjYAQ.png)
<br>
<em>by DForce2055</em>

### Prerequisites
You need to have create-react-app and firebase-tools installed globally.
#### `npm install -g create-react-app`
&&
#### `npm install -g firebase-tools`

### Step-1
First, you need to create your React.js app call firebase-deploy using the create-react-app tool
#### `create-react-app agaboo-front`

### Step-2
Once the installation is done, you need to get your app ready to deploy. To do so, Open your project folder and build your app for production.
#### `cd agaboo-front`
#### `yarn build`

### Step-3
After, you need to install the Firebase command line tool. Because it’s a good practice to frequently update the CLI to the latest version, I suggest you run this command even if you have already installed the CLI.
#### `yarn global add firebase-tools`
or witout global
#### `yarn add firebase-tools` 

### Step-4
It’s now the time to connect your local computer to your Firebase account. You can login to Firebase using the following command. You will be redirected to a Google authentification web page.
#### `firebase login`

### Step-5
Next, it’s time to initialize your website using the command line. Run the following command:
#### `firebase init`

1-Choose Hosting: Configure and deploy Firebase Hosting sites<br>
2-Choose [create a new project]<br>
3-Answer the following questions like below:<br>

What do you want to use as your public directory? (public) <b>build</b>
Configure as a single-page app (rewrite all urls to /index.html)? <b>Yes</b>
File build/index.html already exists. Overwrite? <b>No</b>

![Step-5](https://miro.medium.com/max/1600/1*9h8ykXF0nM2OOjxH6hvPTQ.png)


### Step-6
Now, you will need to create a new project. To do so, go inside your Firebase console (https://console.firebase.google.com/), click on the add project button, give it a name and create your new project.
![Step-6](https://miro.medium.com/max/1200/1*Rx4-_9d33LDquRCyLOk49w.gif)


### Step-7
After your app is initialized, add your newly created project using the following command and create an alias for the project (here I choose firebase-react-deploy).
#### `firebase use --add`
![Step-7](https://miro.medium.com/max/1138/1*3skC6tTLfXv3mTV40f3M9g.png)

### Step-8
The last step is to actually deploy the app and let the magic happen!
#### `firebase deploy`
![Step-8](https://miro.medium.com/max/1343/1*dmR_ojBzKeEpRBb4YXQp6w.png)

Your web application is now running on the server. You can visit your website using the provided Hosting URL.

###You made it 
Congratulation, you are now able to deploy your next awesome apps using Firebase!

=========================================================================================================================
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
