export type ErrorFactory = (error: any) => string;

export const FORM_ERROR_FACTORIES = new Map<string, ErrorFactory>([
  ['required', () => 'This field is required'],
  ['minlength', e => `Minimum ${e.requiredLength} characters`],
  ['maxlength', e => `Maximum ${e.requiredLength} characters`],
  ['min', e => `Minimum value is ${e.min}`],
  ['max', e => `Maximum value is ${e.max}`],
  ['pattern', () => 'Invalid format']
]);