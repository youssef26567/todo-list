import { todo } from 'node:test';
import db from '../database/index'
import Todo from '../types/todo.type'
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
class todomodel{
//create One
async create(T:Todo): Promise<Todo> {
try{
 // open connection with DB
 const connection = await db.connect();
 const sql = `INSERT INTO todos (task_name,due_date,priority,status)
     values ($1, $2, $3,$4) returning *`;
 // run query
 const result = await connection.query(sql, [
  T.task_name,
  T.due_date,
  T.priority,
  T.status
 ]);
 // release connection
 connection.release();
 // return created user
 return result.rows[0];
} catch (error) {
 throw new Error(
   `Unable to create (${T.id}): ${(error as Error).message}`
 );
}
}
//Get One
async getTodo(id : string ):Promise <Todo>{

    try {
        const connection =await db.connect();
        const sql= "SELECT *  FROM todos WHERE id=$1";
        const result =await connection.query(sql,[id]);
        connection.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(
            `Unable to show (${id}): ${(error as Error).message}`
          );
    }
}

//Get All
async getAll(): Promise<Todo[]> {

    try {
        const connection =await db.connect();
        const sql= "SELECT *  FROM todos";
        const result =await connection.query(sql);
        connection.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(
            `Unable to show (): ${(error as Error).message}`
          );
    }
}

//Delete Todo
async Delete(id:string):Promise<Todo>{

    try {
        const connection = await db.connect();
        const sql = `DELETE FROM todos 
                        WHERE id=($1) `;
  
        const result = await connection.query(sql, [id]);
  
        connection.release();
  
        return result.rows[0];
      } catch (error) {
        throw new Error(
          `Could not delete todo ${id}, ${(error as Error).message}`
        );
      }
    }

//update
async  updateTodo(id: string, T: Todo): Promise<Todo> {
    const client = await db.connect();
  
    try {
      const query = `UPDATE todos SET task_name = $1, due_date = $2, priority = $3, status = $4 WHERE id = $5`;
      const values = [T.task_name, T.due_date, T.priority, T.status, id];
  
      await client.query(query, values);
  
      // Return the updated todo item.
      const updatedTodo = await this.getTodo(id);
      return updatedTodo;
    } finally {
      client.release();
    }
  }


//search
async search(query: string): Promise<Todo[]> {
    const sql = `
      SELECT * FROM todos
      WHERE task_name ILIKE $1`; 
  
    const connection = await db.connect();
  
    try {
      const result = await connection.query(sql, [`%${query}%`]);
      return result.rows;
    } finally {
      connection.release();
    }
  }
//sortiing
//   async  getSortedModels(sortBy: string): Promise<Todo[]> {
//     const sortColumn = sortBy === 'name' ? 'name' : 'id'; // Example sorting by 'name' or 'id'
//     const sortDirection = sortBy === 'name' ? 'ASC' : 'DESC'; // Example sorting direction
  
//     const query = `
//       SELECT * FROM todos
//       ORDER BY ${sortColumn} ${sortDirection}
//     `;
  
//     const client = await db.connect();
  
//     try {
//       const result = await client.query(query);
//       return result.rows as Todo[];
//     } finally {
//       client.release();
//     }
//   }

//sorting with pagination
async  getPaginatedModels(
    sortBy: string='ASC',
    page: string='1',
    pageSize: string='10'
  ): Promise<{ models: Todo[]; totalCount: number }> {
    const sortColumn = sortBy === 'name' ? 'name' : 'id'; // Example sorting by 'name' or 'id'
    const sortDirection = sortBy === 'name' ? 'ASC' : 'DESC'; // Example sorting direction
    const offset = (parseInt(page) - 1) * parseInt(pageSize); // Calculate the offset based on page number and page size
  
    const countQuery = `
      SELECT COUNT(*) FROM todos`;
  
    const query = `
      SELECT * FROM todos
      ORDER BY ${sortColumn} ${sortDirection}
      OFFSET ${offset} LIMIT ${pageSize}
    `;
  
    const client = await db.connect();
  
    try {
      const countResult = await client.query(countQuery);
      const totalCount = parseInt(countResult.rows[0].count);
  
      const result = await client.query(query);
      const models = result.rows as Todo[];
  
      return {
        models,
        totalCount,
      };
    } finally {
      client.release();
    }
  }
}
export default todomodel;



