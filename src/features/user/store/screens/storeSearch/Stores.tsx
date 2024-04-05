import { SectionVertical } from "./components/sectionVertical/SectionVertical";
import { useStoreAllByCategoryName } from "../../../../../hooks/user/stores/useStoreAllByCategoryName";
import { Text } from "react-native";

export function Stores({route}: any){
    const categoryName = route.params?.categoryId;
    
    const { stores } = useStoreAllByCategoryName(categoryName);

    if(!categoryName || !stores){
        <Text>Invalid category</Text>
        return;
    }
    
    return <SectionVertical
                key={Stores.name + "AllStores"}
                id={categoryName} 
                stores={stores.stores}
            />
}