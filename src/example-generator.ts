import {type GeneratorItem, s } from 'sixpack-sdk/item'

// Define the input schema
const inputSchema = {
    language: s.string().describe('Language of the invoice').required(),
    amountToBill: s.number().describe('Amount on the invoice').optional(),
    extendedTerm: s.boolean().describe('Should term be extended').optional(),
    vatId: s.string().optional(),
}

type InvoiceRequest = s.infer<typeof inputSchema>

// Define the output schema
const outputSchema = {
    invoiceId: s.string(),
}

// Define the generate function
function generate(input: InvoiceRequest): s.infer<typeof outputSchema> {
    const randomId = String(Date.now() % 1000)
    return { invoiceId: randomId }
}

// Define the generator item
export const invoiceGenerator: GeneratorItem = {
    generate,
    metadata: {
        name: 'Invoice',
        inputSchema,
        outputSchema,
        reportIssueEmail: 'developer@sixpack.dev',
    },
}