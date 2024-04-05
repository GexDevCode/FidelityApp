import { Item } from "../../sectionVertical/types/itemVertical"

export type RenderItemProps = { 
    item: Item, 
    index: number,
    rootKey: string, 
    onPressItem: (item: Item) => void
}