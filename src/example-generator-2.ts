import {type GeneratorItem, s } from 'sixpack-sdk/item'

// Define the input schema
const inputSchema = {
    name: s.string().describe('Name of the person').optional(),
    surname: s.string().describe('Surname of the person').optional(),
    gender: s.select('MALE', 'FEMALE', 'NON_BINARY')
}

type PersonRequest = s.infer<typeof inputSchema>

// Define the output schema
const outputSchema = {
    name: s.string(),
    surname: s.string(),
    gender: s.string(),
    id: s.string()
}

// Define the generate function
function generate(input: PersonRequest): s.infer<typeof outputSchema> {
    const randomId = String(Date.now() % 1000)
    const name = input.name ?? 'Jeremy'
    const surname= input.surname ?? 'Clarkson'
    return { id: randomId, name: name, surname: surname, gender: input.gender}
}

// Define the generator item
export const userGenerator: GeneratorItem = {
    generate,
    metadata: {
        name: 'User',
        inputSchema,
        outputSchema,
        reportIssueEmail: 'developer@sixpack.dev',
    },
}