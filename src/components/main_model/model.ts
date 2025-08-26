export interface Root {
    data: IMenusData[]
    status: boolean
}

export interface IMenusData {
    id: number
    category_id: number
    name: string
    image: string
    price: number
    status: boolean
    created_at: string
    updated_at: string
    category_name: string
}


export interface IOrderRoot {
    data: IOrderData[]
    status: boolean
}

export interface IOrderData {
    id: number
    customer_id: number
    order_status: string
    table_number: string
    created_at: string
    order_items: OrderItem[]
}

export interface OrderItem {
    id: number
    menu_id: number
    name: string
    image: string
    category_id: number
    price: number
    quantity: number
    category_name: string
}



export interface Icagetory {
    data: DataIcagetory[]
    status: boolean
}

export interface DataIcagetory {
    id: number
    name: string
    created_at: string
    updated_at: string
}


export interface IBill_historyRoot {
    data: IBill_historyData[]
    status: boolean
}

export interface IBill_historyData {
    id: number
    customer_id: number
    table_number: string
    order_id: number
    total_amount: number
    total_customer: number
    adults: number
    children: number
    date: string
    created_at: string
    updated_at: string
    items: ItemBillData[]
    bill_status: boolean
    total_combined_amount: number
}

export interface ItemBillData {
    name: string
    quantity: number
    price: number
    total_price: number
}


export interface Allproductsprops {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
}
export interface CreateOrderResponse {
    message: string;
    order_id: number;
    status: boolean;
}

export interface CartItem {
    menu_id: number;
    title: string;
    quantity: number;
}