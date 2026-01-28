export interface DocConfig {
    property: string,
    description: string,
    type?: string,
    options?: Option[]
}

interface Option {
    option: string,
    description?: string,
}