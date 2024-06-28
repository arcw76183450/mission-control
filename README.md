# mission-control

Mission Control is a web application designed to manage and monitor various tasks and operations. It consists of two main components: the client, built using React, and the server, built using Express.js.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Features

- Real-time monitoring of tasks and operations
- User-friendly interface for managing tasks
- Secure and scalable server architecture
- RESTful API endpoints for integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 16.x)
- npm (>= 8.x)

## Architecture

![Screenshot 2024-06-28 at 6 16 41 PM](https://github.com/arcw76183450/mission-control/assets/126561169/2d7428d0-fd82-48c7-848b-f6818531284f)

## Installation

To set up the project locally, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/yourusername/mission-control.git
cd mission-control
```

### Setup the project

1. Install all the dependencies
    ```bash
    npm run install
    ```
2. Run the project
    ```bash
    npm run watch
    ```
The client will be running on `http://localhost:3000` and the server on `http://localhost:8000`.

### Server Setup

#### Run from root folder

1. Install all the dependencies
    ```bash
    npm run install-server
    ```
2. Run the project
    ```bash
    npm run server
    ```

#### Run from the server folder

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Install server dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm run watch
    ```
The server will be running on `http://localhost:8000`.

### Client Setup

#### Run from root folder

1. Install all the dependencies
    ```bash
    npm run install-client
    ```
2. Run the project
    ```bash
    npm run client
    ```

#### Run from the client folder

1. Open a new terminal and navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install client dependencies:

    ```bash
    npm install
    ```

3. Start the client:

    ```bash
    npm start
    ```

The client will be running on `http://localhost:3000`.

## deployment

1. Install all the dependencies
    ```bash
    npm run install
    ```
2. Run the project
    ```bash
    npm run deploy
    ```
Both client and server will be running on `http://localhost:8000`.
