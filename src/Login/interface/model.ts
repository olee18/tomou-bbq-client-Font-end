export interface ITableCustomerRoot {
    data: TableCustomerDataRes[]
    status: boolean
}

export interface TableCustomerDataRes {
    id: number
    table_number: string
    adults: number
    children: number
    total_customer: number
    status: boolean
    created_at: string
    updated_at: string
}
