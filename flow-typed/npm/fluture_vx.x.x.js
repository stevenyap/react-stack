/* eslint-disable no-undef, no-unused-vars, no-console */
// flow-typed signature: 8180f7f91b4f897c792171cfc27702a8
// flow-typed version: <<STUB>>/fluture_v^5.0.0/flow_v0.35.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'fluture'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 *
 * Limitations:
 * ************
 * We also can't model left-right branches yet
 *
 * Usage:
 * ******
 * This file export a type FutureType<R>
 * where R is the type of the resolved Future.
 * For example, the typing:
 * const a = (): FutureType<string> => { // do something }
 * a() will return a Future that resolves to a string
 * The type of rejected is not track to reduce verbose-ness
 */

declare type FutureType<R> = {
  of: <T>(a: T) => FutureType<T>,
  fromPromise: <T>(fn: (any) => Promise<T>) => any => FutureType<T>,
  map: <T>(fn: (a: any) => T) => FutureType<T>,
  mapRej: <T>(fn: (a: any) => T) => FutureType<T>,
  chain: <T>(fn: (a: any) => FutureType<T>) => FutureType<T>,
  chainRej: <T>(fn: (a: any) => FutureType<T>) => FutureType<T>,
  reject: (a: string | Error) => FutureType<*>,
  fork: (rej: (a: any) => void, res: (b: R) => void) => () => void,
  promise: () => Promise<R>
}

declare module fluture {
  // TODO: Fix Future((rej, res) => {}) type
  declare type FutureFn<T> = (
    (rej: Function, res: (a: any) => T) => Function
  ) => FutureType<T>
  declare module.exports: FutureType<any> | FutureFn<any>
}