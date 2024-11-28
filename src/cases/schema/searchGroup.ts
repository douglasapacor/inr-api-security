import { z } from "zod"
export const searchGroupValidation = z.object({
  name: z.string(),
  canonical: z.string(),
  active: z.boolean(),
  super: z.boolean(),
  limit: z.number(),
  offset: z.number()
})

export type searchGroupControllerProps = z.input<typeof searchGroupValidation>
export type searchGroupServiceProps = z.output<typeof searchGroupValidation>
