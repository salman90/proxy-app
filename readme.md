This is an example of an basic docker setup for a node api

### Build image:

    docker build -t node-api:v1 .

## create network

    docker network create node-api-network

## Start MYSQL:
    
    docker run \
    --rm \
    -d \
    --name mysql_server \
    -e MYSQL_DATABASE='urlDatabase' \
    -e MYSQL_USER='dan' \
    -e MYSQL_PASSWORD='secret' \
    -e MYSQL_ROOT_PASSWORD='secret' \
    --network node-api-network \
    mysql





     docker run -d \
     --name mysql \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_PASSWORD=secret \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_USER=root\
     -e MYSQL_DATABASE=todos \
     mysql

     docker run -d \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_USER=root \
     -e MYSQL_DATABASE=todos \
     mysql


   

     

    
## Start node-api

    docker run \
    --rm \
    --name node-app \
    --network node-api-network \
    -p 3000:3000 \
    -v $(pwd):/app \
    node-api:v1 

    docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network todo-app \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=todos \
   node:12-alpine \
   sh -c "yarn install && yarn run dev"


      docker run -dp 3000:3000 \
        -w /app -v "$(pwd):/app" \
        --network todo-app \
        -e MYSQL_HOST=mysql-server \
        -e MYSQL_USER=root \
        -e MYSQL_PASSWORD=secret \
        -e MYSQL_DB=todos \
        node:12-alpine \
        sh -c "yarn install && yarn run dev"

## Stop running container using

    docker stop node-app
    docker stop mysql_server

## or start using

    docker-compose up

## and stop using

    docker-compose down
    