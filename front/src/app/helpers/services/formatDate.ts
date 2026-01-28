export const isDateRange = (value: any) => {
    return (
        Array.isArray(value) &&
        value.length === 2 &&
        value[0] instanceof Date &&
        value[1] instanceof Date
    );
};