import { z } from "zod"
export const createDeviceComponentValidation = z.object({
  name: z
    .string()
    .min(1, { message: "nome deve conter ao menos um caracter." })
    .max(10, { message: "nome pode conter até 10 caracteres." }),
  deviceId: z.number(),
  createdBy: z.number()
})

export type createDeviceComponentControllerProps = z.input<
  typeof createDeviceComponentValidation
>
export type createDeviceComponentServiceProps = z.output<
  typeof createDeviceComponentValidation
>
