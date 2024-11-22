import { z } from "zod"
export const updateDeviceComponentValidation = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, { message: "nome deve conter ao menos 1 caracter." })
    .max(40, { message: "nome pode conter até 10 caracteres." }),
  deviceId: z.number(),
  updatedBy: z.number()
})

export type updateDeviceComponentControllerProps = z.input<
  typeof updateDeviceComponentValidation
>
export type updateDeviceComponentServiceProps = z.output<
  typeof updateDeviceComponentValidation
>
