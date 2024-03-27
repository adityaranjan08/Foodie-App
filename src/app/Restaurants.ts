export interface Restaurant{
    
    restaurantName: string,
    address: {
                   city: string, 
                   street: string,   
                   zipCode: number,                               
             },
    type: string,
    image?: string,
    cuisines: Array<{   
        cuisineName: string,
        category: string,
        price: number,
        rating: number,
        image?: string
    }>
    
                    
                
                     
}

export interface RestaurantComplete{
    restaurantId: String
    restaurantName: string,
    address: {
                   city: string, 
                   street: string,   
                   zipCode: number,                               
             },
    type: string,
    image?: string,
    cuisines: Array<{   
        cuisineName: string,
        category: string,
        price: number,
        rating: number,
        image?: string
    }>
                    
                
                     
}