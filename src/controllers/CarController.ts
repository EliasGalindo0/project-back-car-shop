import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { model, year, color, buyValue, doorsQty, seatsQty };
    const created = await this._service.create(car);

    return res.status(201).json(created);
  }

  public async read(_req: Request, res: Response) {
    const cars = await this._service.read();

    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const car = await this._service.readOne(id);

    return res.status(200).json(car);
  }
}

export default CarController;