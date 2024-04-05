export interface ProductItem{
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    canClaim: boolean;

    onPress?: ()=> void;
}