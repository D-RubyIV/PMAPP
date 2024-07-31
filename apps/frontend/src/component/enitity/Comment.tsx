namespace ModelModule {
    export type Comment = {
        id: number;
        content: string;
        user: User;
        star: number;
        product: Product;
        time: Date;
        comment: Comment
    };
}
