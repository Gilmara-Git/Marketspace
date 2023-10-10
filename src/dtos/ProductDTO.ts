export type ProductDTO = {
        id: string;
        name: string
        description: string, 
        is_new: string, 
        accept_trade: boolean, 
        payment_methods: string[], 
        price: string, 
        product_images: any[]
    };