export type modal_type =
  | "dashboard"
  | "receive"
  | "history"
  | "fund"
  | "transfer"
  | "onramp"
  | "offramp";

// A Linkio test vendor, as returned by GET /linkio/vendors/. Note the
// response uses this casing/typo ("venderName") — not our naming choice.
export type LinkioVendor = {
  venderName: string;
  vendorNumber: string;
  vendorBank: string;
};

// A bank, as returned by GET /linkio/banks/ (under the capitalized `Banks`
// key). `value` is the bank_code verify-account-number expects.
export type LinkioBank = {
  name: string;
  value: string;
};
