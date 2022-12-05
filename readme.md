## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Changes Made

In the UI the user must put in their Private key inorder to Sign the Transfer transaction

### Public Keys and Private Keys for Testing

1. Private Key `25d40a64b0388d5b8fd383ed3feb31febf045aa91cc32f5198c34eb61b0c19f5` , Public Key `04ecd005151189593c51d655b59bb4754ac51162f449a8443db55bce4e17c51f6783bef138ae0a5186311743f3062c1b12e96410e8a1d36c607ae5f458378c401d`
2. Private Key `59749d6137f1a8173e3e04151bfb229cfdaa5e427ca6a5f9cd5e20d8291cd7eb` , Public Key `04b65eaa4d11eb1bd1ec4aefd3199bb03f52cd534121373384cbec0f13552a75e25291b9b2c50596ff61c6a7b824e13bdbb628f18ac98dae499a37d4b0ea593879`
3. Private Key `acddd7b8a6ab62f8ff7abbbb3a7d4e96d3d2aec2456c5cab4814809dbd942755` ,
   `049fb09d3626c7a2b08091851804630834c3dba75634fb6118eff728b7d06a682d1f8eb9762bf8541cff48a8dce5fc540ff3a5ce07359cfc94babb643a28773a25`
