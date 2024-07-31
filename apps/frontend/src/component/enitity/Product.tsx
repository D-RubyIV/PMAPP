type Product = {
    id: number,
    name: string,
    code: string,
    suggest: boolean,
    price: number,
    category: Category,
    file: File | FileList,
    media: Media,
    description: string,
}
