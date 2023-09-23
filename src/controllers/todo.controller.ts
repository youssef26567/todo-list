import { Request, Response, NextFunction } from 'express';
import todomodel from '../models/todo.model';
const TodoModel = new todomodel();
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...todo },
      message: 'todo Created Successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const GetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.getAll();
    res.json({
      status: 'success',
      data: { todo },
      message: 'todo Showed Successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const GetOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.getTodo(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: { todo },
      message: 'todo showed Successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.Delete(
      req.params.id as unknown as string
    );
    res.json({
      status: 'success',
      data: todo,
      message: 'todo deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const pagination=async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const { sortBy, page, pageSize } = req.query as {
        sortBy: string;
        page: string;
        pageSize: string;
      };

  try {
    const paginatedModels = await TodoModel.getPaginatedModels(sortBy,page,pageSize);

    res.json(paginatedModels);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

  export const search= async (req: Request, res: Response) => {
    const { query } = req.query as {
        query :string ;
    };
  
    try {
      const searchResults = await TodoModel.search(query);
  
      res.json(searchResults);
    } catch (error) {
      console.error('Error executing search:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
