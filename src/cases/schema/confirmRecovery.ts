import { z } from "zod"
export const confirmRecoveryValidation = z.object({
  user: z.string(),
  oldPassword: z
    .string()
    .max(50, { message: "Tamanho máximo do password é de 50 caracteres." }),
  newPassword: z
    .string()
    .max(50, { message: "Tamanho máximo do password é de 50 caracteres." })
})

export type confirmRecoveryControllerProps = z.input<
  typeof confirmRecoveryValidation
>

export type confirmRecoveryServiceProps = z.output<
  typeof confirmRecoveryValidation
>
