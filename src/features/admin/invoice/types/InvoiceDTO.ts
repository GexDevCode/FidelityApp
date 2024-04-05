import { Store } from "../../../../types/Store";

export type InvoiceDTO = {
    typeCompany: string
    vatNumber: string
    taxIdCode: string
    businessName: string
    country: string
    cap: number
    province: string
    address: string
    referent: string
    email: string
    phoneNumber: string
    recipientCode: string
    pec: string
}