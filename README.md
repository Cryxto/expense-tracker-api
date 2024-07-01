# Simple Expense Tracker API
An beginner API exercise that made by typescript and express to CRUD an JSON file that act like database

## Feature
- MVC influenced folder structure
- Expense data ID generated using nanoid
- Expense CRUD API including search by date range, by category, by ID for detail
- Class based model
- Schema validation
- Intuitive Controller, Model, Router, and Middleware structure
- JSON Data seeder
- Thunder client API Collection provided (on `specs` folder)

## Limitation and Shortcoming
- Can take up a plenty of memory because Model load the entire data in a data property (it would be a huge problem if you have a plenty of data)
- There are many part of the code that's not optimal and hardcoded
- The logic need more improvements
- This kinda a bit spaghetti i think 
- The Expense Category Full CRUD functionality to server request and its endpoint not ready yet, it is only for Expense CRUD purpose from the time this README.md written until it is touched `:D`