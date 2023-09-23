import { Router } from 'express';
import * as controllers from '../controllers/todo.controller';
const route = Router();
route.route('/').get(controllers.GetAll).post(controllers.create).get(controllers.search).get(controllers.pagination);
route.route('/:id').get(controllers.GetOne).delete(controllers.deleteOne)

export default route;
