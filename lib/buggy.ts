// Deliberately buggy functions — each throws a different error class.
// Called from the demo UI buttons.

export function triggerTypeError(): never {
  // @ts-expect-error demo error
  const x = null;
  x.property; // TypeError: Cannot read properties of null
}

export function triggerReferenceError(): never {
  // @ts-expect-error demo error
  // eslint-disable-next-line no-undef
  nonExistentVariable; // ReferenceError
}

export function triggerRangeError(): never {
  const arr = new Array(-1); // RangeError: Invalid array length
}

export function triggerPromiseRejection(): Promise<never> {
  return Promise.reject(new Error("Async operation timed out after 30s"));
}
