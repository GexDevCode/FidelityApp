export interface ProductItem{
    id: string;
    imageUrl: string;
    title: string;
    description: string;

    onPress: ()=> void;
}