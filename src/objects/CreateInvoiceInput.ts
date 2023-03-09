// Copyright ©, 2022, Lightspark Group, Inc. - All Rights Reserved

import InvoiceType from "./InvoiceType.js";
import CurrencyAmountInput from "./CurrencyAmountInput.js";
import { CurrencyAmountInputFromJson } from "./CurrencyAmountInput.js";

type CreateInvoiceInput = {
  nodeId: string;

  amount: CurrencyAmountInput;

  memo?: string;

  invoiceType?: InvoiceType;
};

export const CreateInvoiceInputFromJson = (obj: any): CreateInvoiceInput => {
  return {
    nodeId: obj["create_invoice_input_node_id"],
    amount: CurrencyAmountInputFromJson(obj["create_invoice_input_amount"]),
    memo: obj["create_invoice_input_memo"],
    invoiceType: InvoiceType[obj["create_invoice_input_invoice_type"]] ?? null,
  } as CreateInvoiceInput;
};

export default CreateInvoiceInput;
