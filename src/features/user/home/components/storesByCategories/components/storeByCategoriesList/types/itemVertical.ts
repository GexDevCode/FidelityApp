export type ItemVertical = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
} 

export type Summary = {
    idCategory: string,
    title: string;
    stores: ItemVertical[]
} 