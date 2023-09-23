Todo List Application
This is a feature-rich Todo List application built with Node.js, Express.js using TypeScript, and PostgreSQL. It allows users to manage and organize their tasks by providing basic CRUD (Create, Read, Update, Delete) operations for todo items, along with additional features like sorting, pagination, and search.

Features
Create new todo items with a title ,priority, status and date .
Read and retrieve a list of all todo items.
Update existing todo items by marking them as completed or modifying their title and description.
Delete todo items from the list.
Sort todo items by various criteria such as title, date created, or completion status.
Paginate the list of todo items to display a specific number of items per page.
Search for specific todo items based on title .
Prerequisites
Before running the application, make sure you have the following prerequisites installed on your machine:

Node.js: Download and install Node.js
PostgreSQL: Download and install PostgreSQL
Getting Started
Clone the repository:
git clone https://github.com/youssef26567/todo-list.git

Install the dependencies:
cd todo-list
npm install
Set up the PostgreSQL database:
Create a new PostgreSQL database for the application.
Update the database configuration in the config.ts file to match your PostgreSQL credentials (host, port, database name, username, and password).
Run the migrations:

npm run migrate
Start the development server:
npm run dev
The server should now be running at http://localhost:3000.

API Endpoints
The following API endpoints are available:

GET /todos: Retrieve a list of all todo items. Supports sorting, pagination, and search.

Query Parameters:
sortBy: Sort the todo items by a specific criteria (e.g., title, createdAt, completed). Default is createdAt.
sortOrder: Specify the sort order as asc (ascending) or desc (descending). Default is asc.
page: Specify the page number for pagination. Default is 1.
pageSize: Specify the number of todo items per page. Default is 10.
search: Filter the todo items by title or description. Performs a case-insensitive search.
POST /todos: Create a new todo item.

GET /todos/:id: Retrieve a specific todo item by ID.

PUT /todos/:id: Update a specific todo item by ID.

DELETE /todos/:id: Delete a specific todo item by ID.

Refer to the API documentation for detailed information on how to interact with each endpoint.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Acknowledgments
This project was inspired by TodoMVC and the amazing Node.js, Express.js, and TypeScript communities.

Contact
If you have any questions or inquiries, please contact youssef.moustafa14@gmail.com

