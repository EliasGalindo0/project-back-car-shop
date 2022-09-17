import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const path = '/motorcycles/:id';

route.put(path, (req, res) => motorcycleController.update(req, res));
route.get(path, (req, res) => motorcycleController.readOne(req, res));
route.delete(path, (req, res) => motorcycleController.delete(req, res));
route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));

export default route;