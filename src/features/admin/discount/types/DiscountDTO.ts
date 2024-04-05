import { Discounts } from "../../../../types/Discounts";


export type DiscountDTO = Omit<Discounts, 'imageUrl'>&{
    imageUrl: {
        uri: string,
        type: string,
        fileName: string
    }
};