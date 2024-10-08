export type Den = {
  "version": "0.1.0",
  "name": "den",
  "instructions": [
    {
      "name": "initializeNode",
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
    }
  ],
  "accounts": [
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
  ]
};

export const IDL: Den = {
  "version": "0.1.0",
  "name": "den",
  "instructions": [
    {
      "name": "initializeNode",
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
    }
  ],
  "accounts": [
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
  ]
};
