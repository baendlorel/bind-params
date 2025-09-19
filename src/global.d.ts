type Chop<T extends any[], N extends number, Acc extends any[] = []> = Acc['length'] extends N
  ? T
  : T extends [infer Head, ...infer Rest]
    ? Chop<Rest, N, [...Acc, Head]>
    : [];

type NParams<
  Fn extends (...args: any[]) => any,
  N extends number,
  Acc extends any[] = [],
> = Acc['length'] extends N
  ? Acc
  : Parameters<Fn> extends readonly [infer First, ...infer Rest]
    ? Rest extends any[]
      ? NParams<(...args: Rest) => any, N, [...Acc, First]>
      : Acc
    : Acc;

type Params<Fn extends (...args: any[]) => any> =
  | []
  | NParams<Fn, 1>
  | NParams<Fn, 2>
  | NParams<Fn, 3>
  | NParams<Fn, 4>
  | NParams<Fn, 5>
  | NParams<Fn, 6>
  | NParams<Fn, 7>
  | NParams<Fn, 8>
  | NParams<Fn, 9>
  | NParams<Fn, 10>
  | NParams<Fn, 11>
  | NParams<Fn, 12>
  | NParams<Fn, 13>
  | NParams<Fn, 14>
  | NParams<Fn, 15>
  | NParams<Fn, 16>
  | Parameters<Fn>;
