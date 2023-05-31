# TESTING USING JEST & SUPERTEST

## Testing library Library

- jest website = [https://jestjs.io/](https://jestjs.io/)
- jest package = [https://www.npmjs.com/package/jest](https://www.npmjs.com/package/jest)
- supertest library = [https://www.npmjs.com/package/supertest](https://www.npmjs.com/package/supertest)

## Demo

### **Jest**

- Globals Methods
  - `describe`
  - `test` (alias `it`)
  - Lifecycle / Hooks
    - `beforeAll`
    - `beforeEach`
    - `afterAll`
    - `afterEach`
  - `skip`
  - `only`
  - etc
- Expect Methods
  - `toBe(value)` untuk type data primitive
  - `toEqual(value)` untuk type data non-primitive
  - `toBeInstanceOf(Array || Object)`
  - `toHaveProperty("key", values)`
  - `toHaveProperty("key", expect.any(Number || String || Boolean))`
  - `arrayContaining([1, 2, 3])`
  - etc
- Jest CLI Options
  - `--runInBand` = sequence
  - `--forceExit`
  - `--testTimeout`
  - etc
- Running test

  - `sequelize db:drop --env test`
  - buat `.sequelizerc` berisikan :

  ```jsx
  module.exports = {
    env: "test",
  };
  ```

- Run Server Script
  - lakukan export pada `app.js`
  ```jsx
  modules.export = app;
  ```
  - buatkan folder `bin/www`
  ```jsx
  const app = require('../app');
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
  	console.log(`Server listening on port ${port}`);
  }
  ```
