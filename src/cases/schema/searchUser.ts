import { z } from "zod"
export const searchUserValidation = z.object({
  name: z.string().max(200, { message: "nome deve conter até 200 caracteres" }),
  email: z
    .string()
    .max(200, { message: "email deve conter até 200 caracteres" }),
  cpf: z.string().max(14, { message: "cpf deve conter até 14 caracteres" }),
  rg: z.string().max(11, { message: "rg deve conter até 11 caracteres" }),
  cellphone: z
    .string()
    .max(11, { message: "celular deve conter até 11 caracteres" }),
  groupId: z.number().nullable(),
  active: z.boolean(),
  super: z.boolean(),
  limit: z.number(),
  offset: z.number()
})

export type searchUserControllerProps = z.input<typeof searchUserValidation>
export type searchUserServiceProps = z.output<typeof searchUserValidation>
