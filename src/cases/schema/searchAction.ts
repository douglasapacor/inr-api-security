import { z } from "zod"
export const searchActionValidation = z.object({
  name: z.string().max(40, { message: "nome deve conter até 40 caracteres." }),
  canonical: z
    .string()
    .max(40, { message: "nome canonico deve conter até 40 caracteres." }),
  limit: z.number(),
  offset: z.number()
})

export type searchActionControllerProps = z.input<typeof searchActionValidation>
export type searchActionServiceProps = z.output<typeof searchActionValidation>
