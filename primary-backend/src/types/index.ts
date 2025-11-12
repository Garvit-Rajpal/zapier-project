import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(3),
    email:z.string().min(5),
    password:z.string().min(8)
})

export const LoginSchema = z.object({
    email:z.string().min(5),
    password:z.string().min(8)
})

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetaData: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetaData: z.any().optional()
    }))
})