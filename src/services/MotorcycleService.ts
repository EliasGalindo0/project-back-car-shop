import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motoZodSchema } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService <IMotorcycle> {
  constructor(private _motorcycle: IModel<IMotorcycle>) {}

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    return motorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    const updated = this._motorcycle.update(_id, parsed.data);

    return updated;
  }

  public async delete(_id: string): Promise<null> {
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);

    await this._motorcycle.delete(_id);

    return null;
  }
}

export default MotorcycleService;