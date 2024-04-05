export type Discounts = {
    _id: any
    _idStore: any
    imageUrl: any
    name: string
    points: number
    discountPercentage: number
    isActive: boolean
    datetimeCreated: number
    datetimeUpdated?: number | null
}

export type GetDiscountDTO = Pick<Discounts, '_id'>;
export type EditDiscountDTO = Discounts;
export type CreateDiscountDTO = Omit<Discounts, "_id" | "_idStore" | "datetimeCreated" | "datetimeUpdated">;
export type DeleteDiscountDTO = Pick<Discounts, '_id'>;