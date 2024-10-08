export type Den = {
  "version": "0.1.0",
  "name": "den",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nfts",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateNfts",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "nfts",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "showNfts",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "submitEconomicData",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "invoiceData",
          "type": "string"
        },
        {
          "name": "hsnNumber",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u32"
        },
        {
          "name": "timestamp",
          "type": "i64"
        },
        {
          "name": "signature",
          "type": "string"
        }
      ],
      "returns": {
        "defined": "SubmitResponse"
      }
    },
    {
      "name": "validateInvoiceData",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "hsnNumber",
          "type": "string"
        }
      ]
    },
    {
      "name": "validateNode",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "credentials",
          "type": "string"
        }
      ],
      "returns": {
        "defined": "ValidateResponse"
      }
    },
    {
      "name": "getNodeStats",
      "accounts": [
        {
          "name": "node",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "NodeStatsResponse"
      }
    },
    {
      "name": "removeNode",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "RemoveResponse"
      }
    },
    {
      "name": "queryEconomicData",
      "accounts": [
        {
          "name": "node",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "parameters",
          "type": {
            "defined": "QueryParameters"
          }
        }
      ],
      "returns": {
        "defined": "QueryResponse"
      }
    }
  ],
  "accounts": [
    {
      "name": "economicData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "invoiceData",
            "type": {
              "defined": "InvoiceData"
            }
          }
        ]
      }
    },
    {
      "name": "nftState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nfts",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "stakerStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "buyAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "adminStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakePaused",
            "type": "bool"
          },
          {
            "name": "withdrawPaused",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stakeCount",
            "type": "u64"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "stakerAmount",
            "type": "u32"
          },
          {
            "name": "buyPaused",
            "type": "bool"
          },
          {
            "name": "buyAmount",
            "type": "u64"
          },
          {
            "name": "buyerCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "node",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "totalTransactions",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicData"
              }
            }
          }
        ]
      }
    },
    {
      "name": "nodeStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "invoiceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "nodeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicDataEntry"
              }
            }
          },
          {
            "name": "activeSince",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "totalRewards",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "economicDataEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "invoiceData",
            "type": "string"
          },
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "signature",
            "type": "string"
          },
          {
            "name": "isVerified",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "queryParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amountRange",
            "type": {
              "option": {
                "defined": "Range"
              }
            }
          }
        ]
      }
    },
    {
      "name": "submitResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "success",
            "type": "bool"
          },
          {
            "name": "transactionHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "validateResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "nodeStatus",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "queryResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicDataEntry"
              }
            }
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "nodeStatsResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalTransactions",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "activeSince",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "removeResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": "bool"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Range",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "min",
            "type": "u64"
          },
          {
            "name": "max",
            "type": "u64"
          }
        ]
      }
    }
  ],
};

export const IDL: Den = {
  "version": "0.1.0",
  "name": "den",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "nfts",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateNfts",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "nfts",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "showNfts",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "submitEconomicData",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "invoiceData",
          "type": "string"
        },
        {
          "name": "hsnNumber",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u32"
        },
        {
          "name": "timestamp",
          "type": "i64"
        },
        {
          "name": "signature",
          "type": "string"
        }
      ],
      "returns": {
        "defined": "SubmitResponse"
      }
    },
    {
      "name": "validateInvoiceData",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "hsnNumber",
          "type": "string"
        }
      ]
    },
    {
      "name": "validateNode",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "credentials",
          "type": "string"
        }
      ],
      "returns": {
        "defined": "ValidateResponse"
      }
    },
    {
      "name": "getNodeStats",
      "accounts": [
        {
          "name": "node",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "NodeStatsResponse"
      }
    },
    {
      "name": "removeNode",
      "accounts": [
        {
          "name": "node",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": {
        "defined": "RemoveResponse"
      }
    },
    {
      "name": "queryEconomicData",
      "accounts": [
        {
          "name": "node",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "parameters",
          "type": {
            "defined": "QueryParameters"
          }
        }
      ],
      "returns": {
        "defined": "QueryResponse"
      }
    }
  ],
  "accounts": [
    {
      "name": "economicData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "invoiceData",
            "type": {
              "defined": "InvoiceData"
            }
          }
        ]
      }
    },
    {
      "name": "nftState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nfts",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "stakerStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "buyAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "adminStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stakePaused",
            "type": "bool"
          },
          {
            "name": "withdrawPaused",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "stakeCount",
            "type": "u64"
          },
          {
            "name": "lockTime",
            "type": "i64"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "stakerAmount",
            "type": "u32"
          },
          {
            "name": "buyPaused",
            "type": "bool"
          },
          {
            "name": "buyAmount",
            "type": "u64"
          },
          {
            "name": "buyerCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "node",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "totalTransactions",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicData"
              }
            }
          }
        ]
      }
    },
    {
      "name": "nodeStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "invoiceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "nodeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nodeId",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicDataEntry"
              }
            }
          },
          {
            "name": "activeSince",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "totalRewards",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "economicDataEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "invoiceData",
            "type": "string"
          },
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "quantity",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "signature",
            "type": "string"
          },
          {
            "name": "isVerified",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "queryParameters",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hsnNumber",
            "type": "string"
          },
          {
            "name": "amountRange",
            "type": {
              "option": {
                "defined": "Range"
              }
            }
          }
        ]
      }
    },
    {
      "name": "submitResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "success",
            "type": "bool"
          },
          {
            "name": "transactionHash",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "validateResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isValid",
            "type": "bool"
          },
          {
            "name": "nodeStatus",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "queryResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": {
              "vec": {
                "defined": "EconomicDataEntry"
              }
            }
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "nodeStatsResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalTransactions",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "activeSince",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "removeResponse",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "status",
            "type": "bool"
          },
          {
            "name": "message",
            "type": "string"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Range",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "min",
            "type": "u64"
          },
          {
            "name": "max",
            "type": "u64"
          }
        ]
      }
    }
  ],
};
