import { z } from "zod"
export const createFeatureValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter ao menos 2 caracteres" })
    .max(100, { message: "Nome deve até 100 caracteres" }),
  canonical: z
    .string()
    .min(2, { message: "Nome canónico deve ter ao menos 2 caracteres" })
    .max(100, { message: "Nome canónico deve deve caracteres" }),
  active: z.boolean(),
  path: z
    .string()
    .max(300, { message: "Caminho deve ter até 300 caracteres" })
    .optional(),
  icon: z
    .string()
    .max(300, { message: "Caminho deve ter até 300 caracteres" })
    .optional(),
  visible: z.boolean(),
  deviceComponentsId: z.number().optional(),
  createdBy: z.number({
    message: "Idenficação do usuário ausente"
  }),
  actions: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      canonical: z.string(),
      checked: z.boolean()
    }),
    { message: "Ações" }
  )
})

export type createFeatureControllerProps = z.input<
  typeof createFeatureValidation
>
export type createFeatureServiceProps = z.output<typeof createFeatureValidation>
