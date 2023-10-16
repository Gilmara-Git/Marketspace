export type MyProductsDTO = {
    id: string,
    name: string,
    description: string, 
    is_new: boolean, 
    price: string, 
    accept_trade: boolean,
    user_id: string,
    is_active: boolean, 
    payment_methods: string[], 
    product_images: any[],
    path: string
};