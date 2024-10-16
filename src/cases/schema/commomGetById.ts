import { z } from "zod"
export const getByIdValidation = z.object({
  id: z.number()
})
export type getByIdControllerProps = z.input<typeof getByIdValidation>
export type getByIdServiceProps = z.output<typeof getByIdValidation>
