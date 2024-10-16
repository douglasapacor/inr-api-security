import { z } from "zod"
export const authenticationUserValidation = z.object({
  login: z
    .string()
    .min(1, { message: "Login não pode ser vazio" })
    .max(50, { message: "Login deve contar no máximo 50 caracteres" }),
  password: z
    .string()
    .min(1, { message: "Password não pode ser vazio" })
    .max(50, { message: "Password deve contar no máximo 50 caracteres" })
})

export type authenticationUserControllerProps = z.input<
  typeof authenticationUserValidation
>

export type authenticationUserServiceProps = z.output<
  typeof authenticationUserValidation
>
