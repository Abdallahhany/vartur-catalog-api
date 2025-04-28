import { z } from 'zod'


export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  parentId: z.number().optional().nullable(),
})


export const updateCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').optional(),
  parentId: z.number().nullable().optional(),
})


export const categoryIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
})


export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
export type CategoryIdParamInput = z.infer<typeof categoryIdParamSchema>

