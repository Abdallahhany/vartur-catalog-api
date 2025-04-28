import { z } from 'zod'


export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().nonnegative('Price must be 0 or more'),
  categoryId: z.number({ required_error: 'Category ID is required' }),
})


export const updateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').optional(),
  price: z.number().nonnegative().optional(),
  categoryId: z.number().optional(),
})


export const productIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
})


export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductIdParamInput = z.infer<typeof productIdParamSchema>
