import { z } from "zod";

export const searchSchema = z.object({
    name: z
        .string()
        .min(1, 'Pokemon name is required')
        .max(100, 'Name is too long')
        .regex(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers and hyphens')
})

export type SearchForm = z.infer<typeof searchSchema>