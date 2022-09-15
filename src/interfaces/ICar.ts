// doorsQty - Quantidade de portas de um carro. Deve ser um valor inteiro positivo maior ou igual a 2 e menor ou igual a 4
// seatsQty - Quantidade de assentos disponíveis no carro. Deve ser maior ou igual a 2 e menor ou igual a 7

import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().positive().min(2)
    .max(4),
  seatsQty: z.number().int().positive().min(2)
    .max(4),
});

export type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema };