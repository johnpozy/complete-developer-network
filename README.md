# Complete Developer Network
This code is part of interview process for Etika Fullstack Developer position.

## Demo
API documentation using Swagger is available at [http://52.77.232.120:3000/swagger](http://52.77.232.120:3000/swagger) and web application is accessible at [http://52.77.232.120:3001](http://52.77.232.120:3001/).

## Requirements
**Complete Developer Network** using the below technology stack
- [NodeJs](https://nodejs.org/en/)
- [NestJs](https://nestjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Angular](https://angular.io/) 
- [Yarn](https://yarnpkg.com/) or NPM (come with NodeJs)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [Swagger](https://swagger.io/)

## Development
Environment configuration file for both application is located inside ```environments``` folder
```treeview
<root_folder>/
├── apps/
│   ├── api/
│   │   └── src/
│   │       └── environments/
│   │           ├── environments.prod.ts
│   │           └── environments.ts
│   └── web/
│   │   └── src/
│   │       └── environments/
│   │           ├── environments.prod.ts
│   │           └── environments.ts
├── libs/
├── tools/
├── nx.json
├── package.json
├── tsconfig.json
└── ...
```

#### 1. Clone this repo
```bash
git clone https://gitlab.com/johnpozy/complete-developer-network.git
```
#### 2. Navigate to root folder and install all dependencies.
Using Yarn
```bash
cd complete-developer-network && yarn install
```
Using NPM
```bash
cd complete-developer-network && npm install
```

#### 3. Run Database using docker
```bash
docker-compose up -d
```

#### 4. Run application - API
after the building process is complete, an API documentation is available at ```http://localhost:3000/swagger```.

Using Yarn
```bash
yarn run start api
```
Using NPM
```bash
npm run start api
```

#### 4. Run application - WEB
after the building process is complete, go to ```http://localhost:3001``` to view the web application.

Using Yarn
```bash
yarn run start web
```
Using NPM
```bash
npm run start web
```
