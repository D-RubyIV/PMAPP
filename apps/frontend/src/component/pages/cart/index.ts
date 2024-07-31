type GroupCartDetail = {
    id: number;
    carts: CartDetail[];
}

type TRequestsConfirmOrder = {
    id_cart: number
    carts: CartDetail[]
    voucher_id?: number
}