import {type GeneratorItem, s} from "sixpack-sdk/item";

// Define the input schema
const inputSchema = {
    language: s.string().describe("Language of the invoice").required(),
    amountToBill: s.number().describe("Amount on the invoice").optional(),
    extendedTerm: s.boolean().describe("Should term be extended").optional(),
    vatId: s.string().optional(),
};

type InvoiceRequest = s.infer<typeof inputSchema>;

// Define the output schema
const outputSchema = {
    invoiceId: s.string(),
    language: s.string(),
    amount: s.number(),
    vatId: s.string(),
    terms: s.string(),
};

export type InvoiceOutput = s.infer<typeof outputSchema>;

// Define the generate function
function generate(input: InvoiceRequest): s.infer<typeof outputSchema> {
    const randomId = String(Date.now() % 1000);
    const vatId = input.vatId ?? "N/A";
    const terms = input.extendedTerm ? "Extended Terms" : "Standard Terms";
    return {
        invoiceId: randomId,
        language: input.language,
        amount: input.amountToBill ?? 0,
        vatId: vatId,
        terms: terms,
    };
}

// Define the generator item
export const invoiceGenerator: GeneratorItem = {
    generate,
    metadata: {
        name: "Invoice",
        inputSchema,
        outputSchema,
        reportIssueEmail: "developer@sixpack.dev",
    },
};
