
type Order = {
    id: number,
    orderDate: Date,
    user: User | number,
    voucher: Voucher | number,
    status: string
}