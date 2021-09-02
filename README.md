# docker-nodejs-restapi-cvl

starting docker

```cmd
docker build . -t membership:1.0
docker-compose up -d
```

# ROUTES

```
/login  <- POST
/authcheck  <- POST/Auth


/users  <- GET/Auth, POST
/users/:uid    <- GET/Auth, PATCH/Auth

/members  <- GET/Auth, POST
/members/:uid    <- GET/Auth, PATCH/Auth

/query  <-  POST
```
