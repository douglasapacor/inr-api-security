import { z } from "zod"
export const createActionValidation = z.object({
  name: z
    .string()
    .min(2, { message: "nome deve conter ao menos 2 caracteres." })
    .max(40, { message: "nome deve conter até 40 caracteres." }),
  canonical: z
    .string()
    .min(2, { message: "nome canonico deve conter ao menos 2 caracteres." })
    .max(40, { message: "nome canonico deve conter até 40 caracteres." }),
  createdBy: z.number()
})

export type createActionControllerProps = z.input<typeof createActionValidation>
export type createActionServiceProps = z.output<typeof createActionValidation>
