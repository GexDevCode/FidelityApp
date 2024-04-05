
export type CodeScannerUser = {
  idUser: string,
  type: 'USER',
}

export type CodeScannerDiscount = {
  idDiscount: string,
  idUserRewardCard: string,
  type: "DISCOUNT",
}