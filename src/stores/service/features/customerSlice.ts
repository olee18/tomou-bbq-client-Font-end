import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
    customer_id: string | null;
    token: string | null;
}
function isWithinOpeningHours(): boolean {
    const now = new Date();
    const open = new Date();
    const close = new Date();
    open.setHours(1, 0, 0, 0);
    close.setHours(23, 59, 59, 999);
    return now >= open && now <= close;
}
function getInitialCustomerState(): CustomerState {
    const customer_id = localStorage.getItem('customer_id');
    const token = localStorage.getItem('token');

    if (customer_id && token && isWithinOpeningHours()) {
        return {
            customer_id,
            token,
        };
    }
    localStorage.removeItem('customer_id');
    localStorage.removeItem('token');
    return {
        customer_id: null,
        token: null,
    };
}
const initialState: CustomerState = getInitialCustomerState();
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomer(state, action: PayloadAction<{ customer_id: string; token: string }>) {
            if (!isWithinOpeningHours()) {
                console.warn("ຮ້ານປິດແລ້ວບໍ່ສາມາດເຂົ້າໃຊ້ງານໄດ້");
                return;
            }

            state.customer_id = action.payload.customer_id;
            state.token = action.payload.token;

            localStorage.setItem('customer_id', action.payload.customer_id);
            localStorage.setItem('token', action.payload.token);
        },
        logoutCustomer(state) {
            state.customer_id = null;
            state.token = null;

            localStorage.removeItem('customer_id');
            localStorage.removeItem('token');
        },
    },
});

export const { setCustomer, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
