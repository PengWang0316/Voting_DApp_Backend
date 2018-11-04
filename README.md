# Voting Back-end

The DApp version back-end code for Voting. NodeJS + MySQL + Block Chain

### Simple file structure explanation

- src (source code)
  - contracts (Smart contractors)
  - migrations (The migration files to help deploying smart contractors)
  - test (Test code for smart contractors)
  - models (models file)
  - controllers
  - routers (all router file in this folder)
    - FacebookAuthRouters.js (Integrating all Facebook login code)
    - GoogleAuthRouters.js (Integrating all Google login code)
    - UsernamePasswordRouters.js (Integrating user name and password login code)
    - NormalRouters.js (all other router is intergrated here)
  - utils (some utilities code)
  - App.js (the entry file)
  - DBHelper.js (database helper)

### Test :tada: :tada:
Test code is under the __tests__ folder
Jest is using as the test framework
