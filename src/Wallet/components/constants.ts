// Linkio's minimum transaction amounts. Not documented anywhere we have
// access to — found by live-testing the test backend (sending a
// below-minimum amount returns `{ code: "TXN_MINIMUM_VIOLATION", details: {
// minimum_allowed } }`). Revisit if Linkio ever changes these.
export const ONRAMP_MIN_NGN = 15000;
export const OFFRAMP_MIN_USDC = 10;
