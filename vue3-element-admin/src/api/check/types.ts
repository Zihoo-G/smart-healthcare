export interface CheckList {
  name: string;
  desc?: string;
  commonDrug?: Array<string>;
  cureLasttime?: string;
}

export interface SubmitDrugInfo {
  uid?: number;
  did: number;
  name: string;
  number: number;
}
