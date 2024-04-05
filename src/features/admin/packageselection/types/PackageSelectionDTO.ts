import { Store } from "../../../../types/Store";

export type EditFidalityCardDTO = Omit<Store, '_id' | 'datetimeCreated' | 'datetimeUpdated'>