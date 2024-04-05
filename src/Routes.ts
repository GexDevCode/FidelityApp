export type RoutesAuth = {
  Welcome: undefined
  LoginUser: undefined
  LoginStore: undefined
  RegisterUser: undefined
  RegisterStore: undefined
  RegisterVerificationUser: undefined;
  RegisterVerificationStore: undefined;
  CompleteRegistration: undefined
}


export type RoutesAdmin = {
    Analytics: undefined
    CodeScanner: undefined
    Store: undefined
    EditStore: undefined
    ManageBranch: undefined
    CreateBranch: undefined
    DetailBranch: undefined
    ManageDiscount: undefined
    CreateDiscount: undefined
    DetailDiscount: undefined
    EditFidalityCard: undefined
    PackageSelection: undefined
    Invoice: undefined
    CustomerSupport: undefined
  }

  export type RoutesUser = {
    Home: undefined;
    QRCode: undefined;
    Profile: undefined;
    Stores: { categoryId: string};
    StoreDetails: { storeId: string};
    User: undefined;
    Orders: undefined;
  }