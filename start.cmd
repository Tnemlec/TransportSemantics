docker run --name fuseki -v ./fuseki:/fuseki -p 3030:3030 -e ADMIN_PASSWORD=admin -d stain/jena-fuseki

nodemon server.js