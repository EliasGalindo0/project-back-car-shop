import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, buyValue, category, engineCapacity };
    const created = await this._service.create(motorcycle);

    res.status(201).json(created);
  }

  public async read(req: Request, res: Response) {
    const motorcycles = await this._service.read();

    return res.status(200).json(motorcycles);
  }
}

export default MotorcycleController;