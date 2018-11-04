# Voting Back-end

The traditional back-end code for Voting. NodeJS + MySQL

### Simple file structure explanation

- src (source code)
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
