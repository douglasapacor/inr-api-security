import { z } from "zod"
export const commonDeleteValidation = z.object({
  id: z.number(),
  deletedBy: z.number()
})
export type commonDeleteControllerProps = z.input<typeof commonDeleteValidation>
export type commonDeleteServiceProps = z.output<typeof commonDeleteValidation>
