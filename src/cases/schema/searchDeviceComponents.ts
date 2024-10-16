import { z } from "zod"
export const searchDeviceComponentsValidation = z.object({
  name: z
    .string()
    .max(10, { message: "Nome só pode conter até 10 caracteres." }),
  deviceId: z.number().transform(deviceId => {
    if (deviceId <= 0) return "NULL"
    else return deviceId
  }),
  limit: z.number(),
  offset: z.number()
})

export type searchDeviceComponentsControllerProps = z.input<
  typeof searchDeviceComponentsValidation
>
export type searchDeviceComponentsServiceProps = z.output<
  typeof searchDeviceComponentsValidation
>
