import {z} from "zod";


export const foodSchema =z.object({
    name:z 
    .string()
    .trim()
    .min(3,"Food name must be 3 or more than 3 chars")
    .max(30),

    description:z
    .string()
    .trim()
    .min(10,"Description must be 10 chars")
    .max(500),

    price:z
    .int()
    .positive("Must be greater than 0. "),

    image:z
    .string()
    .url("must be a valid URL")
    .optional(),

    category:z.enum([
        "BURGER","PIZZA","DRINK","DESSERT","PASTA","FRIES","OTHERS",
    ]),

    isAvailable:z.boolean(),
});

export const login=z.object({
    username:z
    .string()
    .trim()
    .min(3,"size should be 6 or more than 6 chars")
    .max(30,"size should be less than 30 chars"),

    password:z
    .string()
    .trim()
    .min(6,"size should be atleast 6 chars")
    .max(20,"size should be less than 20 chars"),
});

export const orderSchema=z.object({
    customerName:z
    .string()
    .trim()
    .min(3)
    .max(50),

    phone:z
    .string()
    .trim()
    .min(11)
    .max(13),

    address:z
    .string()
    .trim()
    .min(5),

    items:z
    .array(
        z.object({
            foodId:z.string().cuid(),
            quantity:z.number().int().min(1),
        })
    )
    .min(1,"At-least one item is required. "),
});


export const updateOrderStatus=z.object({
    status:z.enum([
        "PENDING",
        "PREPARING",
        "DELIVERED",
        "CANCELLED",
    ]),
});


export type FoodInput=z.infer<typeof foodSchema>;
export type LoginInput=z.infer<typeof login>;
export type OrderInput=z.infer<typeof orderSchema>;

export type UpdateOrder=z.infer<typeof updateOrderStatus>;