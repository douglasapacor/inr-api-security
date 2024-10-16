import { z } from "zod"
export const createUserValidation = z.object({
  name: z
    .string()
    .max(200, { message: "Nome pode conter até 200 caracteres." }),
  email: z
    .string()
    .max(200, { message: "Email pode conter até 200 caracteres." }),
  cellphone: z
    .string()
    .max(11, { message: "Celular pode conter até 11 caracteres." }),
  cpf: z.string().max(14, { message: "Cpf pode conter até 14 caracteres." }),
  rg: z.string().max(11, { message: "Rg pode conter até 14 caracteres." }),
  super: z.boolean(),
  groupId: z.number(),
  active: z.boolean(),
  address: z
    .object({
      street: z
        .string()
        .max(200, { message: "Rua só pode conter até 200 caracteres." }),
      streetNumber: z
        .string()
        .max(200, { message: "Número só pode conter até 10 caracteres." }),
      neighborhood: z
        .string()
        .max(100, { message: "Bairro só pode conter até 100 caracteres." }),
      cep: z
        .string()
        .max(8, { message: "Cep só pode conter até 8 caracteres." }),
      cityIbge: z.number(),
      observation: z
        .string()
        .max(200, { message: "Observação só pode conter até 500 caracteres." })
    })
    .optional()
    .transform(address => (address ? address : null)),
  permissions: z.array(
    z.object({
      featureId: z.number({ message: "featureId" }),
      actions: z.array(z.number({ message: "actions" }))
    }),
    {
      message: "permissions",
      required_error: "req",
      invalid_type_error: "tp"
    }
  ),
  createdById: z.number()
})
export type createUserControllerProps = z.input<typeof createUserValidation>
export type createUserServiceProps = z.output<typeof createUserValidation>
