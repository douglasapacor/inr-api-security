import { z } from "zod"
export const recoveryPasswordValidation = z.object({
  login: z
    .string()
    .max(200, { message: "login deve contar no máximo 200 caracteres" })
})

export type recoveryPasswordControllerProps = z.input<
  typeof recoveryPasswordValidation
>

export type recoveryPasswordServiceProps = z.output<
  typeof recoveryPasswordValidation
>
