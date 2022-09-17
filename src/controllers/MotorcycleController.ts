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

  public async read(_req: Request, res: Response) {
    const motorcycles = await this._service.read();

    return res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);

    return res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const updated = await this._service.update(id, {
      model,
      year,
      color,
      buyValue,
      category,
      engineCapacity,
    }); 

    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.delete(id);

    return res.status(204).send();
  }
}

export default MotorcycleController;