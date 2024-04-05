
export type ContactInfo = {
  referent: string
  email: string
  phoneNumber: string
  recipientCode?: string | null,
  pec?: string | null;
}

export type InvoiceStore = {
    typeCompany: string
    vatNumber: string
    taxIdCode: string
    businessName: string
    country: string
    cap: number
    province: string
    address: string
    contactInfo: ContactInfo;
    timestampCreated?: Date;
    timestampUpdated?: Date;
    timestampDeleted?: Date;
}

export type Branch = {
    username?: string
    password?: string
    managerName: string
    location: string
    isActive?: boolean
    isFirstTime?: boolean
    timestampCreated?: Date
    timestampUpdated?: Date
    timestampDeleted?: Date
    timestampLastActivity?: Date
}

export type Store = {
    _id: any
    storeName?: string
    location?: string
    imageUrl?: any
    bannerUrl?: any
    email: string
    password?: string
    tags?: string
    category?: string
    isActive: boolean
    branch?: Array<Branch> 
    invoiceStore?: InvoiceStore
    timestampPrivacyAccepted: Date
    timestampTermConditionAccepted: Date
    timestampCreated: Date
    timestampUpdated?: Date
    timestampDeleted?: Date
    timestampLastActivity?: Date
}

export type GetStoreDTO = Pick<Store, '_id'>;
export type EditStoreDTO = Omit<Store, 
"_id" | "email" | "isActive" | 
"timestampPrivacyAccepted" | "timestampTermConditionAccepted" | "timestampCreated">
export type CreateStoreDTO = Omit<Store, "_id" | "timestampCreated" | "timestampUpdated">;
export type DeleteStoreDTO = Pick<Store, '_id'>;


export type ActiveStoreDTO = Omit<Store, 
        "_id" | "email" | "isActive" | 
        "timestampPrivacyAccepted" | "timestampTermConditionAccepted" | "timestampCreated"
>&{packageSelected: string, subscriptionId: string}