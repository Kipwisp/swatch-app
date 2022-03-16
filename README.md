# Swatch! 

Swatch is a web application built with Vue.js that allows users to easily analyze the colors of an image. This app interacts with a [separate API](https://github.com/Kipwisp/swatch-api) to retrieve statistics for an image which then get displayed using D3.js charts that describe the color palette, color proportions, and value distributions. View the live app at [swatch.kipwisp.io](https://swatch.kipwisp.io)!

![Home Screen](./media/main.jpg)
![Results Screen](./media/results.jpg)

## Project Setup
To set up the project, run the following command:
```
yarn install
```

## Environmental Variables
Add the following variables to your .env file:
```
VUE_APP_API_URL=[url_to_api]
```

## Compiling for Development
To compile for development, run the following command:
```
yarn serve
```

## Building for Production
To build for production, run the following command:
```
yarn build
```

## Licensing
This project is licensed under the GNU GPLv3 - see [LICENSE](https://raw.githubusercontent.com/Kipwisp/swatch-app/main/LICENSE?token=GHSAT0AAAAAABSOHVBSAZGEQ7R3JJHDCUSGYRRM2RQ) for details.