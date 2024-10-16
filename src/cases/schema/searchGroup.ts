import { z } from "zod"
export const searchGroupValidation = z.object({
  name: z
    .string()
    .min(0)
    .max(100, { message: "nome pode contar até 100 caracteres." }),
  canonical: z
    .string()
    .min(0)
    .max(100, { message: "nome canónico pode contar até 100 caracteres." }),
  color: z.string().max(7, { message: "cor pode contar até 7 caracteres." }),
  active: z.boolean(),
  super: z.boolean(),
  createdBy: z.number(),
  limit: z.number(),
  offset: z.number()
})

export type searchGroupControllerProps = z.input<typeof searchGroupValidation>
export type searchGroupServiceProps = z.output<typeof searchGroupValidation>
