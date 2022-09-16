import { ErrorTypes } from '../errors/catalog';
import { IService } from '../interfaces/IService';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<Array<ICar>> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const updated = await this._car.update(_id, parsed.data);
    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }

  public async delete(_id: string): Promise<null> {
    const car = await this._car.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    await this._car.delete(_id);

    return null;
  }
}

export default CarService;
