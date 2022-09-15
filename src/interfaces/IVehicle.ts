// model - Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres
// year - Ano de fabricação do veículo. Deve ser um valor inteiro positivo maior ou igual a 1900, porém menor ou igual a 2022
// color - Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres
// status - Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional
// buyValue - Valor de compra do veículo. Deve receber apenas números inteiros

import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().int().positive().min(1900)
    .max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;