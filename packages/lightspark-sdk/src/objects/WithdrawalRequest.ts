// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

import { type Query } from "@lightsparkdev/core";
import autoBind from "auto-bind";
import type LightsparkClient from "../client.js";
import type CurrencyAmount from "./CurrencyAmount.js";
import {
  CurrencyAmountFromJson,
  CurrencyAmountToJson,
} from "./CurrencyAmount.js";
import type Entity from "./Entity.js";
import RequestInitiator from "./RequestInitiator.js";
import WithdrawalMode from "./WithdrawalMode.js";
import WithdrawalRequestStatus from "./WithdrawalRequestStatus.js";
import type WithdrawalRequestToChannelClosingTransactionsConnection from "./WithdrawalRequestToChannelClosingTransactionsConnection.js";
import { WithdrawalRequestToChannelClosingTransactionsConnectionFromJson } from "./WithdrawalRequestToChannelClosingTransactionsConnection.js";
import type WithdrawalRequestToChannelOpeningTransactionsConnection from "./WithdrawalRequestToChannelOpeningTransactionsConnection.js";
import { WithdrawalRequestToChannelOpeningTransactionsConnectionFromJson } from "./WithdrawalRequestToChannelOpeningTransactionsConnection.js";
import type WithdrawalRequestToWithdrawalsConnection from "./WithdrawalRequestToWithdrawalsConnection.js";
import { WithdrawalRequestToWithdrawalsConnectionFromJson } from "./WithdrawalRequestToWithdrawalsConnection.js";

/**
 * This object represents a request made for an L1 withdrawal from your Lightspark Node to any
 * Bitcoin wallet. You can retrieve this object to receive detailed information about any
 * withdrawal request made from your Lightspark account. *
 */
class WithdrawalRequest implements Entity {
  constructor(
    /**
     * The unique identifier of this entity across all Lightspark systems. Should be treated as an
     * opaque string.
     **/
    public readonly id: string,
    /** The date and time when the entity was first created. **/
    public readonly createdAt: string,
    /** The date and time when the entity was last updated. **/
    public readonly updatedAt: string,
    /**
     * The requested amount of money to be withdrawn. If the requested amount is -1, it means to
     * withdraw all.
     **/
    public readonly requestedAmount: CurrencyAmount,
    /**
     * The amount of money that should be withdrawn in this request.
     *
     * @deprecated Use `requested_amount` instead
     **/
    public readonly amount: CurrencyAmount,
    /** The bitcoin address where the funds should be sent. **/
    public readonly bitcoinAddress: string,
    /**
     * The strategy that should be used to withdraw the funds from the account.
     *
     * @deprecated It is always withdrawing from channels now.
     **/
    public readonly withdrawalMode: WithdrawalMode,
    /** The current status of this withdrawal request. **/
    public readonly status: WithdrawalRequestStatus,
    /** The initiator of the withdrawal. **/
    public readonly initiator: RequestInitiator,
    /** The typename of the object **/
    public readonly typename: string,
    /**
     * If the requested amount is `-1` (i.e. everything), this field may contain an estimate of the
     * amount for the withdrawal.
     **/
    public readonly estimatedAmount?: CurrencyAmount | undefined,
    /**
     * The actual amount that is withdrawn to the bitcoin address. It will be set once the request
     * is completed.
     **/
    public readonly amountWithdrawn?: CurrencyAmount | undefined,
    /**
     * The total fees the node paid for the withdrawal. It will be set once the request is
     * completed. *
     */
    public readonly totalFees?: CurrencyAmount | undefined,
    /** The time at which this request was completed. **/
    public readonly completedAt?: string | undefined,
    /**
     * The withdrawal transaction that has been generated by this request.
     *
     * @deprecated Use `withdrawals` instead.
     **/
    public readonly withdrawalId?: string | undefined,
    /** The idempotency key of the withdrawal request. **/
    public readonly idempotencyKey?: string | undefined,
  ) {
    autoBind(this);
  }

  public async getChannelClosingTransactions(
    client: LightsparkClient,
    first: number | undefined = undefined,
    after: string | undefined = undefined,
  ): Promise<WithdrawalRequestToChannelClosingTransactionsConnection> {
    return (await client.executeRawQuery({
      queryPayload: ` 
query FetchWithdrawalRequestToChannelClosingTransactionsConnection($entity_id: ID!, $first: Int, $after: String) {
    entity(id: $entity_id) {
        ... on WithdrawalRequest {
            channel_closing_transactions(, first: $first, after: $after) {
                __typename
                withdrawal_request_to_channel_closing_transactions_connection_count: count
                withdrawal_request_to_channel_closing_transactions_connection_page_info: page_info {
                    __typename
                    page_info_has_next_page: has_next_page
                    page_info_has_previous_page: has_previous_page
                    page_info_start_cursor: start_cursor
                    page_info_end_cursor: end_cursor
                }
                withdrawal_request_to_channel_closing_transactions_connection_entities: entities {
                    __typename
                    channel_closing_transaction_id: id
                    channel_closing_transaction_created_at: created_at
                    channel_closing_transaction_updated_at: updated_at
                    channel_closing_transaction_status: status
                    channel_closing_transaction_resolved_at: resolved_at
                    channel_closing_transaction_amount: amount {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    channel_closing_transaction_transaction_hash: transaction_hash
                    channel_closing_transaction_fees: fees {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    channel_closing_transaction_block_hash: block_hash
                    channel_closing_transaction_block_height: block_height
                    channel_closing_transaction_destination_addresses: destination_addresses
                    channel_closing_transaction_num_confirmations: num_confirmations
                    channel_closing_transaction_channel: channel {
                        id
                    }
                }
            }
        }
    }
}
`,
      variables: { entity_id: this.id, first: first, after: after },
      constructObject: (json) => {
        const connection = json["entity"]["channel_closing_transactions"];
        return WithdrawalRequestToChannelClosingTransactionsConnectionFromJson(
          connection,
        );
      },
    }))!;
  }

  public async getChannelOpeningTransactions(
    client: LightsparkClient,
    first: number | undefined = undefined,
    after: string | undefined = undefined,
  ): Promise<WithdrawalRequestToChannelOpeningTransactionsConnection> {
    return (await client.executeRawQuery({
      queryPayload: ` 
query FetchWithdrawalRequestToChannelOpeningTransactionsConnection($entity_id: ID!, $first: Int, $after: String) {
    entity(id: $entity_id) {
        ... on WithdrawalRequest {
            channel_opening_transactions(, first: $first, after: $after) {
                __typename
                withdrawal_request_to_channel_opening_transactions_connection_count: count
                withdrawal_request_to_channel_opening_transactions_connection_page_info: page_info {
                    __typename
                    page_info_has_next_page: has_next_page
                    page_info_has_previous_page: has_previous_page
                    page_info_start_cursor: start_cursor
                    page_info_end_cursor: end_cursor
                }
                withdrawal_request_to_channel_opening_transactions_connection_entities: entities {
                    __typename
                    channel_opening_transaction_id: id
                    channel_opening_transaction_created_at: created_at
                    channel_opening_transaction_updated_at: updated_at
                    channel_opening_transaction_status: status
                    channel_opening_transaction_resolved_at: resolved_at
                    channel_opening_transaction_amount: amount {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    channel_opening_transaction_transaction_hash: transaction_hash
                    channel_opening_transaction_fees: fees {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    channel_opening_transaction_block_hash: block_hash
                    channel_opening_transaction_block_height: block_height
                    channel_opening_transaction_destination_addresses: destination_addresses
                    channel_opening_transaction_num_confirmations: num_confirmations
                    channel_opening_transaction_channel: channel {
                        id
                    }
                }
            }
        }
    }
}
`,
      variables: { entity_id: this.id, first: first, after: after },
      constructObject: (json) => {
        const connection = json["entity"]["channel_opening_transactions"];
        return WithdrawalRequestToChannelOpeningTransactionsConnectionFromJson(
          connection,
        );
      },
    }))!;
  }

  public async getWithdrawals(
    client: LightsparkClient,
    first: number | undefined = undefined,
  ): Promise<WithdrawalRequestToWithdrawalsConnection> {
    return (await client.executeRawQuery({
      queryPayload: ` 
query FetchWithdrawalRequestToWithdrawalsConnection($entity_id: ID!, $first: Int) {
    entity(id: $entity_id) {
        ... on WithdrawalRequest {
            withdrawals(, first: $first) {
                __typename
                withdrawal_request_to_withdrawals_connection_count: count
                withdrawal_request_to_withdrawals_connection_entities: entities {
                    __typename
                    withdrawal_id: id
                    withdrawal_created_at: created_at
                    withdrawal_updated_at: updated_at
                    withdrawal_status: status
                    withdrawal_resolved_at: resolved_at
                    withdrawal_amount: amount {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    withdrawal_transaction_hash: transaction_hash
                    withdrawal_fees: fees {
                        __typename
                        currency_amount_original_value: original_value
                        currency_amount_original_unit: original_unit
                        currency_amount_preferred_currency_unit: preferred_currency_unit
                        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
                        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
                    }
                    withdrawal_block_hash: block_hash
                    withdrawal_block_height: block_height
                    withdrawal_destination_addresses: destination_addresses
                    withdrawal_num_confirmations: num_confirmations
                    withdrawal_origin: origin {
                        id
                    }
                }
            }
        }
    }
}
`,
      variables: { entity_id: this.id, first: first },
      constructObject: (json) => {
        const connection = json["entity"]["withdrawals"];
        return WithdrawalRequestToWithdrawalsConnectionFromJson(connection);
      },
    }))!;
  }

  static getWithdrawalRequestQuery(id: string): Query<WithdrawalRequest> {
    return {
      queryPayload: `
query GetWithdrawalRequest($id: ID!) {
    entity(id: $id) {
        ... on WithdrawalRequest {
            ...WithdrawalRequestFragment
        }
    }
}

${FRAGMENT}    
`,
      variables: { id },
      constructObject: (data: unknown) =>
        data && typeof data === "object" && "entity" in data
          ? WithdrawalRequestFromJson(data.entity)
          : null,
    };
  }

  public toJson() {
    return {
      __typename: "WithdrawalRequest",
      withdrawal_request_id: this.id,
      withdrawal_request_created_at: this.createdAt,
      withdrawal_request_updated_at: this.updatedAt,
      withdrawal_request_requested_amount: CurrencyAmountToJson(
        this.requestedAmount,
      ),
      withdrawal_request_amount: CurrencyAmountToJson(this.amount),
      withdrawal_request_estimated_amount: this.estimatedAmount
        ? CurrencyAmountToJson(this.estimatedAmount)
        : undefined,
      withdrawal_request_amount_withdrawn: this.amountWithdrawn
        ? CurrencyAmountToJson(this.amountWithdrawn)
        : undefined,
      withdrawal_request_total_fees: this.totalFees
        ? CurrencyAmountToJson(this.totalFees)
        : undefined,
      withdrawal_request_bitcoin_address: this.bitcoinAddress,
      withdrawal_request_withdrawal_mode: this.withdrawalMode,
      withdrawal_request_status: this.status,
      withdrawal_request_completed_at: this.completedAt,
      withdrawal_request_withdrawal: { id: this.withdrawalId } ?? undefined,
      withdrawal_request_idempotency_key: this.idempotencyKey,
      withdrawal_request_initiator: this.initiator,
    };
  }
}

export const WithdrawalRequestFromJson = (obj: any): WithdrawalRequest => {
  return new WithdrawalRequest(
    obj["withdrawal_request_id"],
    obj["withdrawal_request_created_at"],
    obj["withdrawal_request_updated_at"],
    CurrencyAmountFromJson(obj["withdrawal_request_requested_amount"]),
    CurrencyAmountFromJson(obj["withdrawal_request_amount"]),
    obj["withdrawal_request_bitcoin_address"],
    WithdrawalMode[obj["withdrawal_request_withdrawal_mode"]] ??
      WithdrawalMode.FUTURE_VALUE,
    WithdrawalRequestStatus[obj["withdrawal_request_status"]] ??
      WithdrawalRequestStatus.FUTURE_VALUE,
    RequestInitiator[obj["withdrawal_request_initiator"]] ??
      RequestInitiator.FUTURE_VALUE,
    "WithdrawalRequest",
    !!obj["withdrawal_request_estimated_amount"]
      ? CurrencyAmountFromJson(obj["withdrawal_request_estimated_amount"])
      : undefined,
    !!obj["withdrawal_request_amount_withdrawn"]
      ? CurrencyAmountFromJson(obj["withdrawal_request_amount_withdrawn"])
      : undefined,
    !!obj["withdrawal_request_total_fees"]
      ? CurrencyAmountFromJson(obj["withdrawal_request_total_fees"])
      : undefined,
    obj["withdrawal_request_completed_at"],
    obj["withdrawal_request_withdrawal"]?.id ?? undefined,
    obj["withdrawal_request_idempotency_key"],
  );
};

export const FRAGMENT = `
fragment WithdrawalRequestFragment on WithdrawalRequest {
    __typename
    withdrawal_request_id: id
    withdrawal_request_created_at: created_at
    withdrawal_request_updated_at: updated_at
    withdrawal_request_requested_amount: requested_amount {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    withdrawal_request_amount: amount {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    withdrawal_request_estimated_amount: estimated_amount {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    withdrawal_request_amount_withdrawn: amount_withdrawn {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    withdrawal_request_total_fees: total_fees {
        __typename
        currency_amount_original_value: original_value
        currency_amount_original_unit: original_unit
        currency_amount_preferred_currency_unit: preferred_currency_unit
        currency_amount_preferred_currency_value_rounded: preferred_currency_value_rounded
        currency_amount_preferred_currency_value_approx: preferred_currency_value_approx
    }
    withdrawal_request_bitcoin_address: bitcoin_address
    withdrawal_request_withdrawal_mode: withdrawal_mode
    withdrawal_request_status: status
    withdrawal_request_completed_at: completed_at
    withdrawal_request_withdrawal: withdrawal {
        id
    }
    withdrawal_request_idempotency_key: idempotency_key
    withdrawal_request_initiator: initiator
}`;

export default WithdrawalRequest;
