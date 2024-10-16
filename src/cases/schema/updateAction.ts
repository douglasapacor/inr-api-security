import { z } from "zod"
export const updateActionValidation = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, { message: "nome deve conter ao menos 2 caracteres." })
    .max(40, { message: "nome deve conter até 40 caracteres." }),
  canonical: z
    .string()
    .min(2, { message: "nome canonico deve conter ao menos 2 caracteres." })
    .max(40, { message: "nome canonico deve conter até 40 caracteres." }),
  updatedBy: z.number()
})

export type updateActionControllerProps = z.input<typeof updateActionValidation>
export type updateActionServiceProps = z.output<typeof updateActionValidation>
