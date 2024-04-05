export type Item = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
} 

export type Summary = {
    idCategory: string,
    title: string;
    stores: Item[]
} 