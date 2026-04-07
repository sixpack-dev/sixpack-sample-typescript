import {
    defineOrchestratorItem,
    type OrchestratorContext,
    s,
    urlToPath,
} from "sixpack-sdk/item";
import {InvoiceOutput} from "./example-generator.js";
import {PersonOutput} from "./example-generator-2.js";

// Define the input schema
const inputSchema = {
    language: s.string().required(),
    amountToBill: s.number().optional(),
    name: s.string().optional(),
    surname: s.string().optional(),
    gender: s.select("MALE", "FEMALE", "NON_BINARY"),
};

type PersonWithInvoiceRequest = s.infer<typeof inputSchema>;

// Define the output schema
const outputSchema = {
    userId: s.string(),
    amount: s.number(),
    invoiceId: s.string(),
};

// Define the generate function
export async function generate(
    input: PersonWithInvoiceRequest,
    context: OrchestratorContext,
): Promise<s.infer<typeof outputSchema>> {
    // Obtain user from another example-generator-2
    const user = await context.request<PersonOutput>("BillingSupplier", "User", {
        name: input.name,
        surname: input.surname,
        gender: input.gender,
    });

    const invoice = await context.request<InvoiceOutput>("BillingSupplier", "Invoice", {
        language: input.language,
        amountToBill: input.amountToBill,
    });

    return {
        userId: user.id,
        invoiceId: invoice.invoiceId,
        amount: invoice.amount,
    };
}

export const invoiceOrchestrator = defineOrchestratorItem({
    generatePath: urlToPath(import.meta.url), // Path to this file
    metadata: {
        name: "User with Invoice",
        inputSchema,
        outputSchema,
        reportIssueEmail: "dev@sixpack.dev",
        description: "Orchestrates invoice generation with user data",
    },
    templates: [{input: {language: "English", gender: "FEMALE"}, minimum: 5}],
});
