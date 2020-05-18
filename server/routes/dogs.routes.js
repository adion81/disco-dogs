const DogController = require("../controllers/dogs.controllers");

module.exports = (app) => {
    app.get("/api/dogs", DogController.index);
    app.post("/api/dogs",DogController.create);
    app.get("/api/dogs/random",DogController.random);
    app.get("/api/dogs/:id",DogController.show);
    app.put("/api/dogs/:id",DogController.update);
    app.post("/api/dance/:id",DogController.boogie);
    app.delete("/api/dogs/:id",DogController.adopt);
}