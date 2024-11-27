import { z } from "zod"
export const searchFeatureValidation = z.object({
  name: z
    .string()
    .max(100, { message: "nome pode contar até 100 caracteres." }),
  canonical: z
    .string()
    .max(100, { message: "nome canónico pode contar até 100 caracteres." }),
  active: z.boolean(),
  path: z
    .string()
    .max(100, { message: "path pode contar até 300 caracteres." }),
  icon: z
    .string()
    .max(100, { message: "icone pode contar até 100 caracteres." }),
  visible: z
    .boolean()
    .optional()
    .transform(visible => {
      if (visible === undefined) return "NULL"
      else return visible
    }),
  deviceComponentsId: z
    .number()
    .optional()
    .transform(device => {
      if (device === undefined || device <= 0) return "NULL"
      else return device
    }),
  limit: z.number(),
  offset: z.number()
})

export type searchFeatureControllerProps = z.input<
  typeof searchFeatureValidation
>
export type searchFeatureServiceProps = z.output<typeof searchFeatureValidation>
