import { $define, $max } from './native.js';

/**
 * Creates a new function with bound leading arguments.
 * - new function preserves `name` and `length` properties of the original function.
 * - full type hints are provided.
 *
 * ```ts
 * function oldFn(a: number, b: string, c: boolean): void {}
 * const newFn = bindParams(oldFn, 42, 'hello'); // newFn: (c: boolean) => void
 * ```
 *
 * @param fn the function to bind arguments to
 * @param bound first N arguments to bind
 * @returns a new function with bound leading arguments
 *
 * __PKG_INFO__
 */
export function bindParams<
  T extends (...args: any[]) => any,
  Bound extends Params<T> = [],
  Remainder extends any[] = Chop<Parameters<T>, Bound['length']>,
>(fn: T, ...bound: Bound & Partial<Parameters<T>>): (...args: Remainder) => ReturnType<T> {
  const newFn = function (...args: any[]) {
    return fn(...bound, ...args);
  };

  $define(newFn, 'name', { value: fn.name, configurable: true });
  $define(newFn, 'length', {
    value: $max(0, fn.length - bound.length),
    configurable: true,
  });

  return newFn;
}
