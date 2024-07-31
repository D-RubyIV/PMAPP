type ProductDetail = {
    id: number,
    name: string,
    code: string,
    quantity: number,
    price: number,
    category: Category | number,
    product: Product | number,
    color: Color | number,
    size: Size | number,
    file: File | FileList,
    media: Media | number
}