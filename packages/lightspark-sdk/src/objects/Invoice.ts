// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import { type Query } from "@lightsparkdev/core";
import type CurrencyAmount from "./CurrencyAmount.js";
import {
  CurrencyAmountFromJson,
  CurrencyAmountToJson,
} from "./CurrencyAmount.js";
import type InvoiceData from "./InvoiceData.js";
import { InvoiceDataFromJson, InvoiceDataToJson } from "./InvoiceData.js";
import PaymentRequestStatus from "./PaymentRequestStatus.js";

/** This object represents a BOLT #11 invoice (https://github.com/lightning/bolts/blob/master/11-payment-encoding.md) created by a Lightspark Node. You can retrieve this object to receive relevant payment information for a specific invoice generated by a Lightspark node. **/
interface Invoice {
  /**
   * The unique identifier of this entity across all Lightspark systems. Should be treated as an
   * opaque string.
   **/
  id: string;

  /** The date and time when the entity was first created. **/
  createdAt: string;

  /** The date and time when the entity was last updated. **/
  updatedAt: string;

  /** The details of the invoice. **/
  data: InvoiceData;

  /** The status of the payment request. **/
  status: PaymentRequestStatus;

  /** The typename of the object **/
  typename: string;

  /** The total amount that has been paid to this invoice. **/
  amountPaid?: CurrencyAmount | undefined;
}

export const InvoiceFromJson = (obj: any): Invoice => {
  return {
    id: obj["invoice_id"],
    createdAt: obj["invoice_created_at"],
    updatedAt: obj["invoice_updated_at"],
    data: InvoiceDataFromJson(obj["invoice_data"]),
    status:
      PaymentRequestStatus[obj["invoice_status"]] ??
      PaymentRequestStatus.FUTURE_VALUE,
    typename: "Invoice",
    amountPaid: !!obj["invoice_amount_paid"]
      ? CurrencyAmountFromJson(obj["invoice_amount_paid"])
      : undefined,
  } as Invoice;
};
export const InvoiceToJson = (obj: Invoice): any => {
  return {
    __typename: "Invoice",
    invoice_id: obj.id,
    invoice_created_at: obj.createdAt,
    invoice_updated_at: obj.updatedAt,
    invoice_data: InvoiceDataToJson(obj.data),
    invoice_status: obj.status,
    invoice_amount_paid: obj.amountPaid
      ? CurrencyAmountToJson(obj.amountPaid)
      : undefined,
  };
};

export const FRAGMENT = `
fragment InvoiceFragment on Invoice {
    __typename
    invoice_id: id
    invoice_created_at: created_at
    invoice_updated_at: updated_at
    invoice_data: data {
        __typename
        invoice_data_encoded_payment_request: encoded_payment_request
        invoice_data_bitcoin_network: bitcoin_network
        invoice_data_payment_hash: payment_hash
        invoice_data_amount: amount {
            __typename
            currency_amount_original_value: original_value
            currency_amount_original_unit: original_unit
            currency_amount_preferred_currency_unit: preferred_currency_unit
            currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
            currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
        }
        invoice_data_created_at: created_at
        invoice_data_expires_at: expires_at
        invoice_data_memo: memo
        invoice_data_destination: destination {
            __typename
            ... on GraphNode {
                __typename
                graph_node_id: id
                graph_node_created_at: created_at
                graph_node_updated_at: updated_at
                graph_node_alias: alias
                graph_node_bitcoin_network: bitcoin_network
                graph_node_color: color
                graph_node_conductivity: conductivity
                graph_node_display_name: display_name
                graph_node_public_key: public_key
            }
            ... on LightsparkNodeWithOSK {
                __typename
                lightspark_node_with_o_s_k_id: id
                lightspark_node_with_o_s_k_created_at: created_at
                lightspark_node_with_o_s_k_updated_at: updated_at
                lightspark_node_with_o_s_k_alias: alias
                lightspark_node_with_o_s_k_bitcoin_network: bitcoin_network
                lightspark_node_with_o_s_k_color: color
                lightspark_node_with_o_s_k_conductivity: conductivity
                lightspark_node_with_o_s_k_display_name: display_name
                lightspark_node_with_o_s_k_public_key: public_key
                lightspark_node_with_o_s_k_owner: owner {
                    id
                }
                lightspark_node_with_o_s_k_status: status
                lightspark_node_with_o_s_k_total_balance: total_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_o_s_k_total_local_balance: total_local_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_o_s_k_local_balance: local_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_o_s_k_remote_balance: remote_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_o_s_k_blockchain_balance: blockchain_balance {
                    __typename
                    blockchain_balance_total_balance: total_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_confirmed_balance: confirmed_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_unconfirmed_balance: unconfirmed_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_locked_balance: locked_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_required_reserve: required_reserve {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_available_balance: available_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                }
                lightspark_node_with_o_s_k_uma_prescreening_utxos: uma_prescreening_utxos
                lightspark_node_with_o_s_k_balances: balances {
                    __typename
                    balances_owned_balance: owned_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    balances_available_to_send_balance: available_to_send_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    balances_available_to_withdraw_balance: available_to_withdraw_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                }
                lightspark_node_with_o_s_k_encrypted_signing_private_key: encrypted_signing_private_key {
                    __typename
                    secret_encrypted_value: encrypted_value
                    secret_cipher: cipher
                }
            }
            ... on LightsparkNodeWithRemoteSigning {
                __typename
                lightspark_node_with_remote_signing_id: id
                lightspark_node_with_remote_signing_created_at: created_at
                lightspark_node_with_remote_signing_updated_at: updated_at
                lightspark_node_with_remote_signing_alias: alias
                lightspark_node_with_remote_signing_bitcoin_network: bitcoin_network
                lightspark_node_with_remote_signing_color: color
                lightspark_node_with_remote_signing_conductivity: conductivity
                lightspark_node_with_remote_signing_display_name: display_name
                lightspark_node_with_remote_signing_public_key: public_key
                lightspark_node_with_remote_signing_owner: owner {
                    id
                }
                lightspark_node_with_remote_signing_status: status
                lightspark_node_with_remote_signing_total_balance: total_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_remote_signing_total_local_balance: total_local_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_remote_signing_local_balance: local_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_remote_signing_remote_balance: remote_balance {
                    __typename
                    currency_amount_original_value: original_value
                    currency_amount_original_unit: original_unit
                    currency_amount_preferred_currency_unit: preferred_currency_unit
                    currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                    currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                }
                lightspark_node_with_remote_signing_blockchain_balance: blockchain_balance {
                    __typename
                    blockchain_balance_total_balance: total_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_confirmed_balance: confirmed_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_unconfirmed_balance: unconfirmed_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_locked_balance: locked_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_required_reserve: required_reserve {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    blockchain_balance_available_balance: available_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                }
                lightspark_node_with_remote_signing_uma_prescreening_utxos: uma_prescreening_utxos
                lightspark_node_with_remote_signing_balances: balances {
                    __typename
                    balances_owned_balance: owned_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    balances_available_to_send_balance: available_to_send_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    balances_available_to_withdraw_balance: available_to_withdraw_balance {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                }
            }
        }
    }
    invoice_status: status
    invoice_amount_paid: amount_paid {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
}`;

export const getInvoiceQuery = (id: string): Query<Invoice> => {
  return {
    queryPayload: `
query GetInvoice($id: ID!) {
    entity(id: $id) {
        ... on Invoice {
            ...InvoiceFragment
        }
    }
}

${FRAGMENT}    
`,
    variables: { id },
    constructObject: (data: any) => InvoiceFromJson(data.entity),
  };
};

export default Invoice;
