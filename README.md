# The Worthy Web App Challenge

This application is a platform for sharing and discovering art, music, and entertainment media across the internet.
It is a web application optimized for desktop and mobile platforms. Find a demo of the application [here](https://youtu.be/zgw5XRV7xj8).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes on running the application:
- You may need to register your KendoReact License Key using the steps listed [here](https://www.telerik.com/kendo-react-ui/my-license/?utm_medium=product&utm_source=kendoreact&utm_campaign=kendo-ui-react-purchase-license-keys-warning).
- Change the `useApi` to `false` key in `AppConfig.js` if you want to run the application without a back-end; this runs the UI application with sample data.
- If running the application with a backend, change the `apiUrl` key in `AppConfig.js` to the location where the backend is hosted. Note that the application is designed to allow hosting the backend and frontend on separate URLs and uses CORS.
- The application uses [react-tiny-link](https://www.npmjs.com/package/react-tiny-link) package to render URL previews. You can enable temporary access for the package's CORS requirement [here](https://cors-anywhere.herokuapp.com/).

## Running the UI

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running the Backend

The backend is a .Net 5.0 Web API project, and can be run from Visual Studio, or executing the following from the project directory:

### `dotnet run`
