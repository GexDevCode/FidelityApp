import { Store } from "../../../../types/Store";

export type EditStoreDTO = Pick<Store, 'storeName' | 'location' | 'category' | 'imageUrl' | 'bannerUrl'>;