// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CampaignAlreadyComplete",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CampaignAlreadyFunded",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CampaignNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CampaignNotRefundable",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CampaignNotSucceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__CurrencyMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__DeadlineNotPassed",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__DeadlinePassed",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__DurationTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__EmptyOffchainId",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__FeeTooHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__InvalidCampaign",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__InvalidMilestoneIndex",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__InvalidOffchainId",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__InvalidTip",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__MilestoneAlreadyApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__MilestoneAlreadyReleased",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__MilestoneArrayMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__MilestoneBpsInvalid",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__MilestoneNotApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__NoContribution",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__NotCreator",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__OffchainIdAlreadyUsed",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__PlatformWalletOnly",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__TokenNotAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__TooManyMilestones",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__TransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__Unauthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__ValueMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__ZeroDuration",
    type: "error",
  },
  {
    inputs: [],
    name: "MilestoneCrowdfund__ZeroGoal",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum MilestoneCrowdfundUpgradeable.CurrencyType",
        name: "currencyType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "goal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "offchainId",
        type: "string",
      },
    ],
    name: "CampaignCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum MilestoneCrowdfundUpgradeable.State",
        name: "newState",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalRaised",
        type: "uint256",
      },
    ],
    name: "CampaignFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalWithdrawn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundableBps",
        type: "uint256",
      },
    ],
    name: "CampaignHalted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint96",
        name: "oldFee",
        type: "uint96",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "newFee",
        type: "uint96",
      },
    ],
    name: "FeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "fiatTxId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FiatPledged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "milestoneIndex",
        type: "uint256",
      },
    ],
    name: "MilestoneApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "milestoneIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalWithdrawn",
        type: "uint256",
      },
    ],
    name: "MilestoneWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldWallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "PlatformWalletUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "netAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tipAmount",
        type: "uint256",
      },
    ],
    name: "Pledged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "donor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RefundClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAllowed",
        type: "bool",
      },
    ],
    name: "TokenAllowlistUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldWallet",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newWallet",
        type: "address",
      },
    ],
    name: "TreasuryWalletUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "BPS_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_FEE_BPS",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowedTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_milestoneIndex",
        type: "uint256",
      },
    ],
    name: "approveMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "campaignCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "cancelCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "claimRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum MilestoneCrowdfundUpgradeable.CurrencyType",
            name: "currencyType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "durationDays",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "milestoneNames",
            type: "string[]",
          },
          {
            internalType: "uint256[]",
            name: "milestoneBps",
            type: "uint256[]",
          },
          {
            internalType: "string",
            name: "contextData",
            type: "string",
          },
          {
            internalType: "string",
            name: "offchainId",
            type: "string",
          },
        ],
        internalType:
          "struct MilestoneCrowdfundUpgradeable.CreateCampaignParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createCampaign",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultFeeBps",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "finalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getCampaign",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum MilestoneCrowdfundUpgradeable.CurrencyType",
            name: "currencyType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalRaised",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "enum MilestoneCrowdfundUpgradeable.State",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "contextData",
            type: "string",
          },
          {
            internalType: "string",
            name: "offchainId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "milestoneCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "milestonesReleased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalBpsReleased",
            type: "uint256",
          },
        ],
        internalType: "struct MilestoneCrowdfundUpgradeable.Campaign",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_offchainId",
        type: "string",
      },
    ],
    name: "getCampaignByOffchainId",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "creator",
            type: "address",
          },
          {
            internalType: "enum MilestoneCrowdfundUpgradeable.CurrencyType",
            name: "currencyType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalRaised",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalWithdrawn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "enum MilestoneCrowdfundUpgradeable.State",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "contextData",
            type: "string",
          },
          {
            internalType: "string",
            name: "offchainId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "milestoneCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "milestonesReleased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalBpsReleased",
            type: "uint256",
          },
        ],
        internalType: "struct MilestoneCrowdfundUpgradeable.Campaign",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_milestoneIndex",
        type: "uint256",
      },
    ],
    name: "getMilestone",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "percentageBps",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "released",
            type: "bool",
          },
        ],
        internalType: "struct MilestoneCrowdfundUpgradeable.Milestone",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_donor",
        type: "address",
      },
    ],
    name: "getPledge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "haltCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_platformWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasuryWallet",
        type: "address",
      },
      {
        internalType: "address",
        name: "_initialToken",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformWallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tipAmount",
        type: "uint256",
      },
    ],
    name: "pledgeETH",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_fiatTxId",
        type: "string",
      },
    ],
    name: "pledgeFiatOnBehalf",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_grossAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tipAmount",
        type: "uint256",
      },
    ],
    name: "pledgeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "_feeBps",
        type: "uint96",
      },
    ],
    name: "setFeeBps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newWallet",
        type: "address",
      },
    ],
    name: "setPlatformWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isAllowed",
        type: "bool",
      },
    ],
    name: "setTokenAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newWallet",
        type: "address",
      },
    ],
    name: "setTreasuryWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryWallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpauseProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_milestoneIndex",
        type: "uint256",
      },
    ],
    name: "withdrawMilestone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const ERC_20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const Treasury_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
];

// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
// ----------------------------------------------------------------------------------------------------------- [  ]
export const Smart_Treasury_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
