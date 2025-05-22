
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MatchStatus: {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus]


export const MatchType: {
  RANDOM: 'RANDOM',
  FRIEND: 'FRIEND'
};

export type MatchType = (typeof MatchType)[keyof typeof MatchType]


export const MatchResult: {
  PLAYER_ONE_WIN: 'PLAYER_ONE_WIN',
  PLAYER_TWO_WIN: 'PLAYER_TWO_WIN',
  DRAW: 'DRAW'
};

export type MatchResult = (typeof MatchResult)[keyof typeof MatchResult]

}

export type MatchStatus = $Enums.MatchStatus

export const MatchStatus: typeof $Enums.MatchStatus

export type MatchType = $Enums.MatchType

export const MatchType: typeof $Enums.MatchType

export type MatchResult = $Enums.MatchResult

export const MatchResult: typeof $Enums.MatchResult

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Players
 * const players = await prisma.player.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Players
   * const players = await prisma.player.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Player: 'Player',
    Team: 'Team',
    Match: 'Match'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "player" | "team" | "match"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    player?: PlayerOmit
    team?: TeamOmit
    match?: MatchOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    teams: number
    matchesAsPlayerOne: number
    matchesAsPlayerTwo: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teams?: boolean | PlayerCountOutputTypeCountTeamsArgs
    matchesAsPlayerOne?: boolean | PlayerCountOutputTypeCountMatchesAsPlayerOneArgs
    matchesAsPlayerTwo?: boolean | PlayerCountOutputTypeCountMatchesAsPlayerTwoArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountMatchesAsPlayerOneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountMatchesAsPlayerTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    matchesAsTeamOne: number
    matchesAsTeamTwo: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchesAsTeamOne?: boolean | TeamCountOutputTypeCountMatchesAsTeamOneArgs
    matchesAsTeamTwo?: boolean | TeamCountOutputTypeCountMatchesAsTeamTwoArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMatchesAsTeamOneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMatchesAsTeamTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    wins: number | null
    losses: number | null
  }

  export type PlayerSumAggregateOutputType = {
    wins: number | null
    losses: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    address: string | null
    wins: number | null
    losses: number | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    address: string | null
    wins: number | null
    losses: number | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    address: number
    wins: number
    losses: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    wins?: true
    losses?: true
  }

  export type PlayerSumAggregateInputType = {
    wins?: true
    losses?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    address?: true
    wins?: true
    losses?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    address?: true
    wins?: true
    losses?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    address?: true
    wins?: true
    losses?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    address: string
    wins: number
    losses: number
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    wins?: boolean
    losses?: boolean
    teams?: boolean | Player$teamsArgs<ExtArgs>
    matchesAsPlayerOne?: boolean | Player$matchesAsPlayerOneArgs<ExtArgs>
    matchesAsPlayerTwo?: boolean | Player$matchesAsPlayerTwoArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    wins?: boolean
    losses?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    wins?: boolean
    losses?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    address?: boolean
    wins?: boolean
    losses?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "wins" | "losses", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teams?: boolean | Player$teamsArgs<ExtArgs>
    matchesAsPlayerOne?: boolean | Player$matchesAsPlayerOneArgs<ExtArgs>
    matchesAsPlayerTwo?: boolean | Player$matchesAsPlayerTwoArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      teams: Prisma.$TeamPayload<ExtArgs>[]
      matchesAsPlayerOne: Prisma.$MatchPayload<ExtArgs>[]
      matchesAsPlayerTwo: Prisma.$MatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      address: string
      wins: number
      losses: number
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teams<T extends Player$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Player$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsPlayerOne<T extends Player$matchesAsPlayerOneArgs<ExtArgs> = {}>(args?: Subset<T, Player$matchesAsPlayerOneArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsPlayerTwo<T extends Player$matchesAsPlayerTwoArgs<ExtArgs> = {}>(args?: Subset<T, Player$matchesAsPlayerTwoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly address: FieldRef<"Player", 'String'>
    readonly wins: FieldRef<"Player", 'Int'>
    readonly losses: FieldRef<"Player", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.teams
   */
  export type Player$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Player.matchesAsPlayerOne
   */
  export type Player$matchesAsPlayerOneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Player.matchesAsPlayerTwo
   */
  export type Player$matchesAsPlayerTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    name: string | null
    playerId: string | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    name: string | null
    playerId: string | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    name: number
    tokens: number
    playerId: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    name?: true
    playerId?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    name?: true
    playerId?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    name?: true
    tokens?: true
    playerId?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    name: string
    tokens: string[]
    playerId: string
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tokens?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    matchesAsTeamOne?: boolean | Team$matchesAsTeamOneArgs<ExtArgs>
    matchesAsTeamTwo?: boolean | Team$matchesAsTeamTwoArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tokens?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tokens?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    name?: boolean
    tokens?: boolean
    playerId?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tokens" | "playerId", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
    matchesAsTeamOne?: boolean | Team$matchesAsTeamOneArgs<ExtArgs>
    matchesAsTeamTwo?: boolean | Team$matchesAsTeamTwoArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
      matchesAsTeamOne: Prisma.$MatchPayload<ExtArgs>[]
      matchesAsTeamTwo: Prisma.$MatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tokens: string[]
      playerId: string
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    matchesAsTeamOne<T extends Team$matchesAsTeamOneArgs<ExtArgs> = {}>(args?: Subset<T, Team$matchesAsTeamOneArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsTeamTwo<T extends Team$matchesAsTeamTwoArgs<ExtArgs> = {}>(args?: Subset<T, Team$matchesAsTeamTwoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly tokens: FieldRef<"Team", 'String[]'>
    readonly playerId: FieldRef<"Team", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.matchesAsTeamOne
   */
  export type Team$matchesAsTeamOneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Team.matchesAsTeamTwo
   */
  export type Team$matchesAsTeamTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    teamOneScore: number | null
    teamTwoScore: number | null
    teamOneGain: number | null
    teamTwoGain: number | null
    winnerShare: number | null
    loserShare: number | null
    duration: number | null
    price: number | null
  }

  export type MatchSumAggregateOutputType = {
    teamOneScore: number | null
    teamTwoScore: number | null
    teamOneGain: number | null
    teamTwoGain: number | null
    winnerShare: number | null
    loserShare: number | null
    duration: number | null
    price: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: string | null
    status: $Enums.MatchStatus | null
    type: $Enums.MatchType | null
    createdAt: Date | null
    updatedAt: Date | null
    playerOneId: string | null
    playerTwoId: string | null
    teamOneId: string | null
    teamTwoId: string | null
    teamOneScore: number | null
    teamTwoScore: number | null
    teamOneGain: number | null
    teamTwoGain: number | null
    winnerShare: number | null
    loserShare: number | null
    winnerId: string | null
    result: $Enums.MatchResult | null
    duration: number | null
    price: number | null
    vaultId: string | null
    startTime: Date | null
    endTime: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: string | null
    status: $Enums.MatchStatus | null
    type: $Enums.MatchType | null
    createdAt: Date | null
    updatedAt: Date | null
    playerOneId: string | null
    playerTwoId: string | null
    teamOneId: string | null
    teamTwoId: string | null
    teamOneScore: number | null
    teamTwoScore: number | null
    teamOneGain: number | null
    teamTwoGain: number | null
    winnerShare: number | null
    loserShare: number | null
    winnerId: string | null
    result: $Enums.MatchResult | null
    duration: number | null
    price: number | null
    vaultId: string | null
    startTime: Date | null
    endTime: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    status: number
    type: number
    createdAt: number
    updatedAt: number
    playerOneId: number
    playerTwoId: number
    teamOneId: number
    teamTwoId: number
    teamOneScore: number
    teamTwoScore: number
    teamOneGain: number
    teamTwoGain: number
    winnerShare: number
    loserShare: number
    winnerId: number
    result: number
    duration: number
    price: number
    vaultId: number
    startTime: number
    endTime: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    teamOneScore?: true
    teamTwoScore?: true
    teamOneGain?: true
    teamTwoGain?: true
    winnerShare?: true
    loserShare?: true
    duration?: true
    price?: true
  }

  export type MatchSumAggregateInputType = {
    teamOneScore?: true
    teamTwoScore?: true
    teamOneGain?: true
    teamTwoGain?: true
    winnerShare?: true
    loserShare?: true
    duration?: true
    price?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    playerOneId?: true
    playerTwoId?: true
    teamOneId?: true
    teamTwoId?: true
    teamOneScore?: true
    teamTwoScore?: true
    teamOneGain?: true
    teamTwoGain?: true
    winnerShare?: true
    loserShare?: true
    winnerId?: true
    result?: true
    duration?: true
    price?: true
    vaultId?: true
    startTime?: true
    endTime?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    playerOneId?: true
    playerTwoId?: true
    teamOneId?: true
    teamTwoId?: true
    teamOneScore?: true
    teamTwoScore?: true
    teamOneGain?: true
    teamTwoGain?: true
    winnerShare?: true
    loserShare?: true
    winnerId?: true
    result?: true
    duration?: true
    price?: true
    vaultId?: true
    startTime?: true
    endTime?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    playerOneId?: true
    playerTwoId?: true
    teamOneId?: true
    teamTwoId?: true
    teamOneScore?: true
    teamTwoScore?: true
    teamOneGain?: true
    teamTwoGain?: true
    winnerShare?: true
    loserShare?: true
    winnerId?: true
    result?: true
    duration?: true
    price?: true
    vaultId?: true
    startTime?: true
    endTime?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: string
    status: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt: Date
    updatedAt: Date
    playerOneId: string
    playerTwoId: string | null
    teamOneId: string
    teamTwoId: string | null
    teamOneScore: number | null
    teamTwoScore: number | null
    teamOneGain: number | null
    teamTwoGain: number | null
    winnerShare: number | null
    loserShare: number | null
    winnerId: string | null
    result: $Enums.MatchResult | null
    duration: number
    price: number
    vaultId: string | null
    startTime: Date | null
    endTime: Date | null
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playerOneId?: boolean
    playerTwoId?: boolean
    teamOneId?: boolean
    teamTwoId?: boolean
    teamOneScore?: boolean
    teamTwoScore?: boolean
    teamOneGain?: boolean
    teamTwoGain?: boolean
    winnerShare?: boolean
    loserShare?: boolean
    winnerId?: boolean
    result?: boolean
    duration?: boolean
    price?: boolean
    vaultId?: boolean
    startTime?: boolean
    endTime?: boolean
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playerOneId?: boolean
    playerTwoId?: boolean
    teamOneId?: boolean
    teamTwoId?: boolean
    teamOneScore?: boolean
    teamTwoScore?: boolean
    teamOneGain?: boolean
    teamTwoGain?: boolean
    winnerShare?: boolean
    loserShare?: boolean
    winnerId?: boolean
    result?: boolean
    duration?: boolean
    price?: boolean
    vaultId?: boolean
    startTime?: boolean
    endTime?: boolean
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playerOneId?: boolean
    playerTwoId?: boolean
    teamOneId?: boolean
    teamTwoId?: boolean
    teamOneScore?: boolean
    teamTwoScore?: boolean
    teamOneGain?: boolean
    teamTwoGain?: boolean
    winnerShare?: boolean
    loserShare?: boolean
    winnerId?: boolean
    result?: boolean
    duration?: boolean
    price?: boolean
    vaultId?: boolean
    startTime?: boolean
    endTime?: boolean
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playerOneId?: boolean
    playerTwoId?: boolean
    teamOneId?: boolean
    teamTwoId?: boolean
    teamOneScore?: boolean
    teamTwoScore?: boolean
    teamOneGain?: boolean
    teamTwoGain?: boolean
    winnerShare?: boolean
    loserShare?: boolean
    winnerId?: boolean
    result?: boolean
    duration?: boolean
    price?: boolean
    vaultId?: boolean
    startTime?: boolean
    endTime?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "type" | "createdAt" | "updatedAt" | "playerOneId" | "playerTwoId" | "teamOneId" | "teamTwoId" | "teamOneScore" | "teamTwoScore" | "teamOneGain" | "teamTwoGain" | "winnerShare" | "loserShare" | "winnerId" | "result" | "duration" | "price" | "vaultId" | "startTime" | "endTime", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playerOne?: boolean | PlayerDefaultArgs<ExtArgs>
    playerTwo?: boolean | Match$playerTwoArgs<ExtArgs>
    teamOne?: boolean | TeamDefaultArgs<ExtArgs>
    teamTwo?: boolean | Match$teamTwoArgs<ExtArgs>
  }

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      playerOne: Prisma.$PlayerPayload<ExtArgs>
      playerTwo: Prisma.$PlayerPayload<ExtArgs> | null
      teamOne: Prisma.$TeamPayload<ExtArgs>
      teamTwo: Prisma.$TeamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.MatchStatus
      type: $Enums.MatchType
      createdAt: Date
      updatedAt: Date
      playerOneId: string
      playerTwoId: string | null
      teamOneId: string
      teamTwoId: string | null
      teamOneScore: number | null
      teamTwoScore: number | null
      teamOneGain: number | null
      teamTwoGain: number | null
      winnerShare: number | null
      loserShare: number | null
      winnerId: string | null
      result: $Enums.MatchResult | null
      duration: number
      price: number
      vaultId: string | null
      startTime: Date | null
      endTime: Date | null
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playerOne<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    playerTwo<T extends Match$playerTwoArgs<ExtArgs> = {}>(args?: Subset<T, Match$playerTwoArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teamOne<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teamTwo<T extends Match$teamTwoArgs<ExtArgs> = {}>(args?: Subset<T, Match$teamTwoArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'String'>
    readonly status: FieldRef<"Match", 'MatchStatus'>
    readonly type: FieldRef<"Match", 'MatchType'>
    readonly createdAt: FieldRef<"Match", 'DateTime'>
    readonly updatedAt: FieldRef<"Match", 'DateTime'>
    readonly playerOneId: FieldRef<"Match", 'String'>
    readonly playerTwoId: FieldRef<"Match", 'String'>
    readonly teamOneId: FieldRef<"Match", 'String'>
    readonly teamTwoId: FieldRef<"Match", 'String'>
    readonly teamOneScore: FieldRef<"Match", 'Float'>
    readonly teamTwoScore: FieldRef<"Match", 'Float'>
    readonly teamOneGain: FieldRef<"Match", 'Float'>
    readonly teamTwoGain: FieldRef<"Match", 'Float'>
    readonly winnerShare: FieldRef<"Match", 'Float'>
    readonly loserShare: FieldRef<"Match", 'Float'>
    readonly winnerId: FieldRef<"Match", 'String'>
    readonly result: FieldRef<"Match", 'MatchResult'>
    readonly duration: FieldRef<"Match", 'Int'>
    readonly price: FieldRef<"Match", 'Int'>
    readonly vaultId: FieldRef<"Match", 'String'>
    readonly startTime: FieldRef<"Match", 'DateTime'>
    readonly endTime: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.playerTwo
   */
  export type Match$playerTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
  }

  /**
   * Match.teamTwo
   */
  export type Match$teamTwoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    address: 'address',
    wins: 'wins',
    losses: 'losses'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tokens: 'tokens',
    playerId: 'playerId'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    status: 'status',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    playerOneId: 'playerOneId',
    playerTwoId: 'playerTwoId',
    teamOneId: 'teamOneId',
    teamTwoId: 'teamTwoId',
    teamOneScore: 'teamOneScore',
    teamTwoScore: 'teamTwoScore',
    teamOneGain: 'teamOneGain',
    teamTwoGain: 'teamTwoGain',
    winnerShare: 'winnerShare',
    loserShare: 'loserShare',
    winnerId: 'winnerId',
    result: 'result',
    duration: 'duration',
    price: 'price',
    vaultId: 'vaultId',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'MatchStatus'
   */
  export type EnumMatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchStatus'>
    


  /**
   * Reference to a field of type 'MatchStatus[]'
   */
  export type ListEnumMatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchStatus[]'>
    


  /**
   * Reference to a field of type 'MatchType'
   */
  export type EnumMatchTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchType'>
    


  /**
   * Reference to a field of type 'MatchType[]'
   */
  export type ListEnumMatchTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'MatchResult'
   */
  export type EnumMatchResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchResult'>
    


  /**
   * Reference to a field of type 'MatchResult[]'
   */
  export type ListEnumMatchResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MatchResult[]'>
    
  /**
   * Deep Input Types
   */


  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    address?: StringFilter<"Player"> | string
    wins?: IntFilter<"Player"> | number
    losses?: IntFilter<"Player"> | number
    teams?: TeamListRelationFilter
    matchesAsPlayerOne?: MatchListRelationFilter
    matchesAsPlayerTwo?: MatchListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    teams?: TeamOrderByRelationAggregateInput
    matchesAsPlayerOne?: MatchOrderByRelationAggregateInput
    matchesAsPlayerTwo?: MatchOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    address?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    wins?: IntFilter<"Player"> | number
    losses?: IntFilter<"Player"> | number
    teams?: TeamListRelationFilter
    matchesAsPlayerOne?: MatchListRelationFilter
    matchesAsPlayerTwo?: MatchListRelationFilter
  }, "id" | "address">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    address?: StringWithAggregatesFilter<"Player"> | string
    wins?: IntWithAggregatesFilter<"Player"> | number
    losses?: IntWithAggregatesFilter<"Player"> | number
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    tokens?: StringNullableListFilter<"Team">
    playerId?: StringFilter<"Team"> | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    matchesAsTeamOne?: MatchListRelationFilter
    matchesAsTeamTwo?: MatchListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tokens?: SortOrder
    playerId?: SortOrder
    player?: PlayerOrderByWithRelationInput
    matchesAsTeamOne?: MatchOrderByRelationAggregateInput
    matchesAsTeamTwo?: MatchOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    tokens?: StringNullableListFilter<"Team">
    playerId?: StringFilter<"Team"> | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    matchesAsTeamOne?: MatchListRelationFilter
    matchesAsTeamTwo?: MatchListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tokens?: SortOrder
    playerId?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    tokens?: StringNullableListFilter<"Team">
    playerId?: StringWithAggregatesFilter<"Team"> | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: StringFilter<"Match"> | string
    status?: EnumMatchStatusFilter<"Match"> | $Enums.MatchStatus
    type?: EnumMatchTypeFilter<"Match"> | $Enums.MatchType
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    playerOneId?: StringFilter<"Match"> | string
    playerTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneId?: StringFilter<"Match"> | string
    teamTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneScore?: FloatNullableFilter<"Match"> | number | null
    teamTwoScore?: FloatNullableFilter<"Match"> | number | null
    teamOneGain?: FloatNullableFilter<"Match"> | number | null
    teamTwoGain?: FloatNullableFilter<"Match"> | number | null
    winnerShare?: FloatNullableFilter<"Match"> | number | null
    loserShare?: FloatNullableFilter<"Match"> | number | null
    winnerId?: StringNullableFilter<"Match"> | string | null
    result?: EnumMatchResultNullableFilter<"Match"> | $Enums.MatchResult | null
    duration?: IntFilter<"Match"> | number
    price?: IntFilter<"Match"> | number
    vaultId?: StringNullableFilter<"Match"> | string | null
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    playerOne?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    playerTwo?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    teamOne?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    teamTwo?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playerOneId?: SortOrder
    playerTwoId?: SortOrderInput | SortOrder
    teamOneId?: SortOrder
    teamTwoId?: SortOrderInput | SortOrder
    teamOneScore?: SortOrderInput | SortOrder
    teamTwoScore?: SortOrderInput | SortOrder
    teamOneGain?: SortOrderInput | SortOrder
    teamTwoGain?: SortOrderInput | SortOrder
    winnerShare?: SortOrderInput | SortOrder
    loserShare?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    duration?: SortOrder
    price?: SortOrder
    vaultId?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    playerOne?: PlayerOrderByWithRelationInput
    playerTwo?: PlayerOrderByWithRelationInput
    teamOne?: TeamOrderByWithRelationInput
    teamTwo?: TeamOrderByWithRelationInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    status?: EnumMatchStatusFilter<"Match"> | $Enums.MatchStatus
    type?: EnumMatchTypeFilter<"Match"> | $Enums.MatchType
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    playerOneId?: StringFilter<"Match"> | string
    playerTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneId?: StringFilter<"Match"> | string
    teamTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneScore?: FloatNullableFilter<"Match"> | number | null
    teamTwoScore?: FloatNullableFilter<"Match"> | number | null
    teamOneGain?: FloatNullableFilter<"Match"> | number | null
    teamTwoGain?: FloatNullableFilter<"Match"> | number | null
    winnerShare?: FloatNullableFilter<"Match"> | number | null
    loserShare?: FloatNullableFilter<"Match"> | number | null
    winnerId?: StringNullableFilter<"Match"> | string | null
    result?: EnumMatchResultNullableFilter<"Match"> | $Enums.MatchResult | null
    duration?: IntFilter<"Match"> | number
    price?: IntFilter<"Match"> | number
    vaultId?: StringNullableFilter<"Match"> | string | null
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    playerOne?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    playerTwo?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    teamOne?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    teamTwo?: XOR<TeamNullableScalarRelationFilter, TeamWhereInput> | null
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playerOneId?: SortOrder
    playerTwoId?: SortOrderInput | SortOrder
    teamOneId?: SortOrder
    teamTwoId?: SortOrderInput | SortOrder
    teamOneScore?: SortOrderInput | SortOrder
    teamTwoScore?: SortOrderInput | SortOrder
    teamOneGain?: SortOrderInput | SortOrder
    teamTwoGain?: SortOrderInput | SortOrder
    winnerShare?: SortOrderInput | SortOrder
    loserShare?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    result?: SortOrderInput | SortOrder
    duration?: SortOrder
    price?: SortOrder
    vaultId?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Match"> | string
    status?: EnumMatchStatusWithAggregatesFilter<"Match"> | $Enums.MatchStatus
    type?: EnumMatchTypeWithAggregatesFilter<"Match"> | $Enums.MatchType
    createdAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    playerOneId?: StringWithAggregatesFilter<"Match"> | string
    playerTwoId?: StringNullableWithAggregatesFilter<"Match"> | string | null
    teamOneId?: StringWithAggregatesFilter<"Match"> | string
    teamTwoId?: StringNullableWithAggregatesFilter<"Match"> | string | null
    teamOneScore?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    teamTwoScore?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    teamOneGain?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    teamTwoGain?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    winnerShare?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    loserShare?: FloatNullableWithAggregatesFilter<"Match"> | number | null
    winnerId?: StringNullableWithAggregatesFilter<"Match"> | string | null
    result?: EnumMatchResultNullableWithAggregatesFilter<"Match"> | $Enums.MatchResult | null
    duration?: IntWithAggregatesFilter<"Match"> | number
    price?: IntWithAggregatesFilter<"Match"> | number
    vaultId?: StringNullableWithAggregatesFilter<"Match"> | string | null
    startTime?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
  }

  export type PlayerCreateInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamCreateNestedManyWithoutPlayerInput
    matchesAsPlayerOne?: MatchCreateNestedManyWithoutPlayerOneInput
    matchesAsPlayerTwo?: MatchCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamUncheckedCreateNestedManyWithoutPlayerInput
    matchesAsPlayerOne?: MatchUncheckedCreateNestedManyWithoutPlayerOneInput
    matchesAsPlayerTwo?: MatchUncheckedCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerOne?: MatchUpdateManyWithoutPlayerOneNestedInput
    matchesAsPlayerTwo?: MatchUpdateManyWithoutPlayerTwoNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUncheckedUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerOne?: MatchUncheckedUpdateManyWithoutPlayerOneNestedInput
    matchesAsPlayerTwo?: MatchUncheckedUpdateManyWithoutPlayerTwoNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
  }

  export type TeamCreateInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    player: PlayerCreateNestedOneWithoutTeamsInput
    matchesAsTeamOne?: MatchCreateNestedManyWithoutTeamOneInput
    matchesAsTeamTwo?: MatchCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    playerId: string
    matchesAsTeamOne?: MatchUncheckedCreateNestedManyWithoutTeamOneInput
    matchesAsTeamTwo?: MatchUncheckedCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    player?: PlayerUpdateOneRequiredWithoutTeamsNestedInput
    matchesAsTeamOne?: MatchUpdateManyWithoutTeamOneNestedInput
    matchesAsTeamTwo?: MatchUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    playerId?: StringFieldUpdateOperationsInput | string
    matchesAsTeamOne?: MatchUncheckedUpdateManyWithoutTeamOneNestedInput
    matchesAsTeamTwo?: MatchUncheckedUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    playerId: string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    playerId?: StringFieldUpdateOperationsInput | string
  }

  export type MatchCreateInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    playerOne: PlayerCreateNestedOneWithoutMatchesAsPlayerOneInput
    playerTwo?: PlayerCreateNestedOneWithoutMatchesAsPlayerTwoInput
    teamOne: TeamCreateNestedOneWithoutMatchesAsTeamOneInput
    teamTwo?: TeamCreateNestedOneWithoutMatchesAsTeamTwoInput
  }

  export type MatchUncheckedCreateInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerOne?: PlayerUpdateOneRequiredWithoutMatchesAsPlayerOneNestedInput
    playerTwo?: PlayerUpdateOneWithoutMatchesAsPlayerTwoNestedInput
    teamOne?: TeamUpdateOneRequiredWithoutMatchesAsTeamOneNestedInput
    teamTwo?: TeamUpdateOneWithoutMatchesAsTeamTwoNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchCreateManyInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type MatchListRelationFilter = {
    every?: MatchWhereInput
    some?: MatchWhereInput
    none?: MatchWhereInput
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tokens?: SortOrder
    playerId?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    playerId?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    playerId?: SortOrder
  }

  export type EnumMatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusFilter<$PrismaModel> | $Enums.MatchStatus
  }

  export type EnumMatchTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchType | EnumMatchTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchTypeFilter<$PrismaModel> | $Enums.MatchType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumMatchResultNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchResult | EnumMatchResultFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchResultNullableFilter<$PrismaModel> | $Enums.MatchResult | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PlayerNullableScalarRelationFilter = {
    is?: PlayerWhereInput | null
    isNot?: PlayerWhereInput | null
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamNullableScalarRelationFilter = {
    is?: TeamWhereInput | null
    isNot?: TeamWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playerOneId?: SortOrder
    playerTwoId?: SortOrder
    teamOneId?: SortOrder
    teamTwoId?: SortOrder
    teamOneScore?: SortOrder
    teamTwoScore?: SortOrder
    teamOneGain?: SortOrder
    teamTwoGain?: SortOrder
    winnerShare?: SortOrder
    loserShare?: SortOrder
    winnerId?: SortOrder
    result?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    vaultId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    teamOneScore?: SortOrder
    teamTwoScore?: SortOrder
    teamOneGain?: SortOrder
    teamTwoGain?: SortOrder
    winnerShare?: SortOrder
    loserShare?: SortOrder
    duration?: SortOrder
    price?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playerOneId?: SortOrder
    playerTwoId?: SortOrder
    teamOneId?: SortOrder
    teamTwoId?: SortOrder
    teamOneScore?: SortOrder
    teamTwoScore?: SortOrder
    teamOneGain?: SortOrder
    teamTwoGain?: SortOrder
    winnerShare?: SortOrder
    loserShare?: SortOrder
    winnerId?: SortOrder
    result?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    vaultId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playerOneId?: SortOrder
    playerTwoId?: SortOrder
    teamOneId?: SortOrder
    teamTwoId?: SortOrder
    teamOneScore?: SortOrder
    teamTwoScore?: SortOrder
    teamOneGain?: SortOrder
    teamTwoGain?: SortOrder
    winnerShare?: SortOrder
    loserShare?: SortOrder
    winnerId?: SortOrder
    result?: SortOrder
    duration?: SortOrder
    price?: SortOrder
    vaultId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    teamOneScore?: SortOrder
    teamTwoScore?: SortOrder
    teamOneGain?: SortOrder
    teamTwoGain?: SortOrder
    winnerShare?: SortOrder
    loserShare?: SortOrder
    duration?: SortOrder
    price?: SortOrder
  }

  export type EnumMatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.MatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchStatusFilter<$PrismaModel>
    _max?: NestedEnumMatchStatusFilter<$PrismaModel>
  }

  export type EnumMatchTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchType | EnumMatchTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchTypeWithAggregatesFilter<$PrismaModel> | $Enums.MatchType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchTypeFilter<$PrismaModel>
    _max?: NestedEnumMatchTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumMatchResultNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchResult | EnumMatchResultFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchResultNullableWithAggregatesFilter<$PrismaModel> | $Enums.MatchResult | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMatchResultNullableFilter<$PrismaModel>
    _max?: NestedEnumMatchResultNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TeamCreateNestedManyWithoutPlayerInput = {
    create?: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput> | TeamCreateWithoutPlayerInput[] | TeamUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutPlayerInput | TeamCreateOrConnectWithoutPlayerInput[]
    createMany?: TeamCreateManyPlayerInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutPlayerOneInput = {
    create?: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput> | MatchCreateWithoutPlayerOneInput[] | MatchUncheckedCreateWithoutPlayerOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerOneInput | MatchCreateOrConnectWithoutPlayerOneInput[]
    createMany?: MatchCreateManyPlayerOneInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutPlayerTwoInput = {
    create?: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput> | MatchCreateWithoutPlayerTwoInput[] | MatchUncheckedCreateWithoutPlayerTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerTwoInput | MatchCreateOrConnectWithoutPlayerTwoInput[]
    createMany?: MatchCreateManyPlayerTwoInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput> | TeamCreateWithoutPlayerInput[] | TeamUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutPlayerInput | TeamCreateOrConnectWithoutPlayerInput[]
    createMany?: TeamCreateManyPlayerInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutPlayerOneInput = {
    create?: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput> | MatchCreateWithoutPlayerOneInput[] | MatchUncheckedCreateWithoutPlayerOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerOneInput | MatchCreateOrConnectWithoutPlayerOneInput[]
    createMany?: MatchCreateManyPlayerOneInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutPlayerTwoInput = {
    create?: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput> | MatchCreateWithoutPlayerTwoInput[] | MatchUncheckedCreateWithoutPlayerTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerTwoInput | MatchCreateOrConnectWithoutPlayerTwoInput[]
    createMany?: MatchCreateManyPlayerTwoInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeamUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput> | TeamCreateWithoutPlayerInput[] | TeamUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutPlayerInput | TeamCreateOrConnectWithoutPlayerInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutPlayerInput | TeamUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: TeamCreateManyPlayerInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutPlayerInput | TeamUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutPlayerInput | TeamUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutPlayerOneNestedInput = {
    create?: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput> | MatchCreateWithoutPlayerOneInput[] | MatchUncheckedCreateWithoutPlayerOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerOneInput | MatchCreateOrConnectWithoutPlayerOneInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayerOneInput | MatchUpsertWithWhereUniqueWithoutPlayerOneInput[]
    createMany?: MatchCreateManyPlayerOneInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayerOneInput | MatchUpdateWithWhereUniqueWithoutPlayerOneInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayerOneInput | MatchUpdateManyWithWhereWithoutPlayerOneInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutPlayerTwoNestedInput = {
    create?: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput> | MatchCreateWithoutPlayerTwoInput[] | MatchUncheckedCreateWithoutPlayerTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerTwoInput | MatchCreateOrConnectWithoutPlayerTwoInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayerTwoInput | MatchUpsertWithWhereUniqueWithoutPlayerTwoInput[]
    createMany?: MatchCreateManyPlayerTwoInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayerTwoInput | MatchUpdateWithWhereUniqueWithoutPlayerTwoInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayerTwoInput | MatchUpdateManyWithWhereWithoutPlayerTwoInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput> | TeamCreateWithoutPlayerInput[] | TeamUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutPlayerInput | TeamCreateOrConnectWithoutPlayerInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutPlayerInput | TeamUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: TeamCreateManyPlayerInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutPlayerInput | TeamUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutPlayerInput | TeamUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutPlayerOneNestedInput = {
    create?: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput> | MatchCreateWithoutPlayerOneInput[] | MatchUncheckedCreateWithoutPlayerOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerOneInput | MatchCreateOrConnectWithoutPlayerOneInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayerOneInput | MatchUpsertWithWhereUniqueWithoutPlayerOneInput[]
    createMany?: MatchCreateManyPlayerOneInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayerOneInput | MatchUpdateWithWhereUniqueWithoutPlayerOneInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayerOneInput | MatchUpdateManyWithWhereWithoutPlayerOneInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutPlayerTwoNestedInput = {
    create?: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput> | MatchCreateWithoutPlayerTwoInput[] | MatchUncheckedCreateWithoutPlayerTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutPlayerTwoInput | MatchCreateOrConnectWithoutPlayerTwoInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutPlayerTwoInput | MatchUpsertWithWhereUniqueWithoutPlayerTwoInput[]
    createMany?: MatchCreateManyPlayerTwoInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutPlayerTwoInput | MatchUpdateWithWhereUniqueWithoutPlayerTwoInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutPlayerTwoInput | MatchUpdateManyWithWhereWithoutPlayerTwoInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TeamCreatetokensInput = {
    set: string[]
  }

  export type PlayerCreateNestedOneWithoutTeamsInput = {
    create?: XOR<PlayerCreateWithoutTeamsInput, PlayerUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamsInput
    connect?: PlayerWhereUniqueInput
  }

  export type MatchCreateNestedManyWithoutTeamOneInput = {
    create?: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput> | MatchCreateWithoutTeamOneInput[] | MatchUncheckedCreateWithoutTeamOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamOneInput | MatchCreateOrConnectWithoutTeamOneInput[]
    createMany?: MatchCreateManyTeamOneInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutTeamTwoInput = {
    create?: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput> | MatchCreateWithoutTeamTwoInput[] | MatchUncheckedCreateWithoutTeamTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamTwoInput | MatchCreateOrConnectWithoutTeamTwoInput[]
    createMany?: MatchCreateManyTeamTwoInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutTeamOneInput = {
    create?: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput> | MatchCreateWithoutTeamOneInput[] | MatchUncheckedCreateWithoutTeamOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamOneInput | MatchCreateOrConnectWithoutTeamOneInput[]
    createMany?: MatchCreateManyTeamOneInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutTeamTwoInput = {
    create?: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput> | MatchCreateWithoutTeamTwoInput[] | MatchUncheckedCreateWithoutTeamTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamTwoInput | MatchCreateOrConnectWithoutTeamTwoInput[]
    createMany?: MatchCreateManyTeamTwoInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TeamUpdatetokensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PlayerUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<PlayerCreateWithoutTeamsInput, PlayerUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutTeamsInput
    upsert?: PlayerUpsertWithoutTeamsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutTeamsInput, PlayerUpdateWithoutTeamsInput>, PlayerUncheckedUpdateWithoutTeamsInput>
  }

  export type MatchUpdateManyWithoutTeamOneNestedInput = {
    create?: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput> | MatchCreateWithoutTeamOneInput[] | MatchUncheckedCreateWithoutTeamOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamOneInput | MatchCreateOrConnectWithoutTeamOneInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeamOneInput | MatchUpsertWithWhereUniqueWithoutTeamOneInput[]
    createMany?: MatchCreateManyTeamOneInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeamOneInput | MatchUpdateWithWhereUniqueWithoutTeamOneInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeamOneInput | MatchUpdateManyWithWhereWithoutTeamOneInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutTeamTwoNestedInput = {
    create?: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput> | MatchCreateWithoutTeamTwoInput[] | MatchUncheckedCreateWithoutTeamTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamTwoInput | MatchCreateOrConnectWithoutTeamTwoInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeamTwoInput | MatchUpsertWithWhereUniqueWithoutTeamTwoInput[]
    createMany?: MatchCreateManyTeamTwoInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeamTwoInput | MatchUpdateWithWhereUniqueWithoutTeamTwoInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeamTwoInput | MatchUpdateManyWithWhereWithoutTeamTwoInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutTeamOneNestedInput = {
    create?: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput> | MatchCreateWithoutTeamOneInput[] | MatchUncheckedCreateWithoutTeamOneInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamOneInput | MatchCreateOrConnectWithoutTeamOneInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeamOneInput | MatchUpsertWithWhereUniqueWithoutTeamOneInput[]
    createMany?: MatchCreateManyTeamOneInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeamOneInput | MatchUpdateWithWhereUniqueWithoutTeamOneInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeamOneInput | MatchUpdateManyWithWhereWithoutTeamOneInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutTeamTwoNestedInput = {
    create?: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput> | MatchCreateWithoutTeamTwoInput[] | MatchUncheckedCreateWithoutTeamTwoInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeamTwoInput | MatchCreateOrConnectWithoutTeamTwoInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeamTwoInput | MatchUpsertWithWhereUniqueWithoutTeamTwoInput[]
    createMany?: MatchCreateManyTeamTwoInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeamTwoInput | MatchUpdateWithWhereUniqueWithoutTeamTwoInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeamTwoInput | MatchUpdateManyWithWhereWithoutTeamTwoInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type PlayerCreateNestedOneWithoutMatchesAsPlayerOneInput = {
    create?: XOR<PlayerCreateWithoutMatchesAsPlayerOneInput, PlayerUncheckedCreateWithoutMatchesAsPlayerOneInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesAsPlayerOneInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutMatchesAsPlayerTwoInput = {
    create?: XOR<PlayerCreateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedCreateWithoutMatchesAsPlayerTwoInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesAsPlayerTwoInput
    connect?: PlayerWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutMatchesAsTeamOneInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeamOneInput, TeamUncheckedCreateWithoutMatchesAsTeamOneInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeamOneInput
    connect?: TeamWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutMatchesAsTeamTwoInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeamTwoInput, TeamUncheckedCreateWithoutMatchesAsTeamTwoInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeamTwoInput
    connect?: TeamWhereUniqueInput
  }

  export type EnumMatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.MatchStatus
  }

  export type EnumMatchTypeFieldUpdateOperationsInput = {
    set?: $Enums.MatchType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumMatchResultFieldUpdateOperationsInput = {
    set?: $Enums.MatchResult | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PlayerUpdateOneRequiredWithoutMatchesAsPlayerOneNestedInput = {
    create?: XOR<PlayerCreateWithoutMatchesAsPlayerOneInput, PlayerUncheckedCreateWithoutMatchesAsPlayerOneInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesAsPlayerOneInput
    upsert?: PlayerUpsertWithoutMatchesAsPlayerOneInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutMatchesAsPlayerOneInput, PlayerUpdateWithoutMatchesAsPlayerOneInput>, PlayerUncheckedUpdateWithoutMatchesAsPlayerOneInput>
  }

  export type PlayerUpdateOneWithoutMatchesAsPlayerTwoNestedInput = {
    create?: XOR<PlayerCreateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedCreateWithoutMatchesAsPlayerTwoInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesAsPlayerTwoInput
    upsert?: PlayerUpsertWithoutMatchesAsPlayerTwoInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutMatchesAsPlayerTwoInput, PlayerUpdateWithoutMatchesAsPlayerTwoInput>, PlayerUncheckedUpdateWithoutMatchesAsPlayerTwoInput>
  }

  export type TeamUpdateOneRequiredWithoutMatchesAsTeamOneNestedInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeamOneInput, TeamUncheckedCreateWithoutMatchesAsTeamOneInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeamOneInput
    upsert?: TeamUpsertWithoutMatchesAsTeamOneInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMatchesAsTeamOneInput, TeamUpdateWithoutMatchesAsTeamOneInput>, TeamUncheckedUpdateWithoutMatchesAsTeamOneInput>
  }

  export type TeamUpdateOneWithoutMatchesAsTeamTwoNestedInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeamTwoInput, TeamUncheckedCreateWithoutMatchesAsTeamTwoInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeamTwoInput
    upsert?: TeamUpsertWithoutMatchesAsTeamTwoInput
    disconnect?: TeamWhereInput | boolean
    delete?: TeamWhereInput | boolean
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMatchesAsTeamTwoInput, TeamUpdateWithoutMatchesAsTeamTwoInput>, TeamUncheckedUpdateWithoutMatchesAsTeamTwoInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumMatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusFilter<$PrismaModel> | $Enums.MatchStatus
  }

  export type NestedEnumMatchTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchType | EnumMatchTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchTypeFilter<$PrismaModel> | $Enums.MatchType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumMatchResultNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchResult | EnumMatchResultFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchResultNullableFilter<$PrismaModel> | $Enums.MatchResult | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchStatus | EnumMatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchStatus[] | ListEnumMatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.MatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchStatusFilter<$PrismaModel>
    _max?: NestedEnumMatchStatusFilter<$PrismaModel>
  }

  export type NestedEnumMatchTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchType | EnumMatchTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MatchType[] | ListEnumMatchTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMatchTypeWithAggregatesFilter<$PrismaModel> | $Enums.MatchType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMatchTypeFilter<$PrismaModel>
    _max?: NestedEnumMatchTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumMatchResultNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MatchResult | EnumMatchResultFieldRefInput<$PrismaModel> | null
    in?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MatchResult[] | ListEnumMatchResultFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMatchResultNullableWithAggregatesFilter<$PrismaModel> | $Enums.MatchResult | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMatchResultNullableFilter<$PrismaModel>
    _max?: NestedEnumMatchResultNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TeamCreateWithoutPlayerInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    matchesAsTeamOne?: MatchCreateNestedManyWithoutTeamOneInput
    matchesAsTeamTwo?: MatchCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamUncheckedCreateWithoutPlayerInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    matchesAsTeamOne?: MatchUncheckedCreateNestedManyWithoutTeamOneInput
    matchesAsTeamTwo?: MatchUncheckedCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamCreateOrConnectWithoutPlayerInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput>
  }

  export type TeamCreateManyPlayerInputEnvelope = {
    data: TeamCreateManyPlayerInput | TeamCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutPlayerOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    playerTwo?: PlayerCreateNestedOneWithoutMatchesAsPlayerTwoInput
    teamOne: TeamCreateNestedOneWithoutMatchesAsTeamOneInput
    teamTwo?: TeamCreateNestedOneWithoutMatchesAsTeamTwoInput
  }

  export type MatchUncheckedCreateWithoutPlayerOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerTwoId?: string | null
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateOrConnectWithoutPlayerOneInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput>
  }

  export type MatchCreateManyPlayerOneInputEnvelope = {
    data: MatchCreateManyPlayerOneInput | MatchCreateManyPlayerOneInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutPlayerTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    playerOne: PlayerCreateNestedOneWithoutMatchesAsPlayerOneInput
    teamOne: TeamCreateNestedOneWithoutMatchesAsTeamOneInput
    teamTwo?: TeamCreateNestedOneWithoutMatchesAsTeamTwoInput
  }

  export type MatchUncheckedCreateWithoutPlayerTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateOrConnectWithoutPlayerTwoInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput>
  }

  export type MatchCreateManyPlayerTwoInputEnvelope = {
    data: MatchCreateManyPlayerTwoInput | MatchCreateManyPlayerTwoInput[]
    skipDuplicates?: boolean
  }

  export type TeamUpsertWithWhereUniqueWithoutPlayerInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutPlayerInput, TeamUncheckedUpdateWithoutPlayerInput>
    create: XOR<TeamCreateWithoutPlayerInput, TeamUncheckedCreateWithoutPlayerInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutPlayerInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutPlayerInput, TeamUncheckedUpdateWithoutPlayerInput>
  }

  export type TeamUpdateManyWithWhereWithoutPlayerInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutPlayerInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    tokens?: StringNullableListFilter<"Team">
    playerId?: StringFilter<"Team"> | string
  }

  export type MatchUpsertWithWhereUniqueWithoutPlayerOneInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutPlayerOneInput, MatchUncheckedUpdateWithoutPlayerOneInput>
    create: XOR<MatchCreateWithoutPlayerOneInput, MatchUncheckedCreateWithoutPlayerOneInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutPlayerOneInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutPlayerOneInput, MatchUncheckedUpdateWithoutPlayerOneInput>
  }

  export type MatchUpdateManyWithWhereWithoutPlayerOneInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutPlayerOneInput>
  }

  export type MatchScalarWhereInput = {
    AND?: MatchScalarWhereInput | MatchScalarWhereInput[]
    OR?: MatchScalarWhereInput[]
    NOT?: MatchScalarWhereInput | MatchScalarWhereInput[]
    id?: StringFilter<"Match"> | string
    status?: EnumMatchStatusFilter<"Match"> | $Enums.MatchStatus
    type?: EnumMatchTypeFilter<"Match"> | $Enums.MatchType
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    playerOneId?: StringFilter<"Match"> | string
    playerTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneId?: StringFilter<"Match"> | string
    teamTwoId?: StringNullableFilter<"Match"> | string | null
    teamOneScore?: FloatNullableFilter<"Match"> | number | null
    teamTwoScore?: FloatNullableFilter<"Match"> | number | null
    teamOneGain?: FloatNullableFilter<"Match"> | number | null
    teamTwoGain?: FloatNullableFilter<"Match"> | number | null
    winnerShare?: FloatNullableFilter<"Match"> | number | null
    loserShare?: FloatNullableFilter<"Match"> | number | null
    winnerId?: StringNullableFilter<"Match"> | string | null
    result?: EnumMatchResultNullableFilter<"Match"> | $Enums.MatchResult | null
    duration?: IntFilter<"Match"> | number
    price?: IntFilter<"Match"> | number
    vaultId?: StringNullableFilter<"Match"> | string | null
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
  }

  export type MatchUpsertWithWhereUniqueWithoutPlayerTwoInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutPlayerTwoInput, MatchUncheckedUpdateWithoutPlayerTwoInput>
    create: XOR<MatchCreateWithoutPlayerTwoInput, MatchUncheckedCreateWithoutPlayerTwoInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutPlayerTwoInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutPlayerTwoInput, MatchUncheckedUpdateWithoutPlayerTwoInput>
  }

  export type MatchUpdateManyWithWhereWithoutPlayerTwoInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutPlayerTwoInput>
  }

  export type PlayerCreateWithoutTeamsInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    matchesAsPlayerOne?: MatchCreateNestedManyWithoutPlayerOneInput
    matchesAsPlayerTwo?: MatchCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerUncheckedCreateWithoutTeamsInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    matchesAsPlayerOne?: MatchUncheckedCreateNestedManyWithoutPlayerOneInput
    matchesAsPlayerTwo?: MatchUncheckedCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerCreateOrConnectWithoutTeamsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutTeamsInput, PlayerUncheckedCreateWithoutTeamsInput>
  }

  export type MatchCreateWithoutTeamOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    playerOne: PlayerCreateNestedOneWithoutMatchesAsPlayerOneInput
    playerTwo?: PlayerCreateNestedOneWithoutMatchesAsPlayerTwoInput
    teamTwo?: TeamCreateNestedOneWithoutMatchesAsTeamTwoInput
  }

  export type MatchUncheckedCreateWithoutTeamOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateOrConnectWithoutTeamOneInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput>
  }

  export type MatchCreateManyTeamOneInputEnvelope = {
    data: MatchCreateManyTeamOneInput | MatchCreateManyTeamOneInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutTeamTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
    playerOne: PlayerCreateNestedOneWithoutMatchesAsPlayerOneInput
    playerTwo?: PlayerCreateNestedOneWithoutMatchesAsPlayerTwoInput
    teamOne: TeamCreateNestedOneWithoutMatchesAsTeamOneInput
  }

  export type MatchUncheckedCreateWithoutTeamTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamOneId: string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateOrConnectWithoutTeamTwoInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput>
  }

  export type MatchCreateManyTeamTwoInputEnvelope = {
    data: MatchCreateManyTeamTwoInput | MatchCreateManyTeamTwoInput[]
    skipDuplicates?: boolean
  }

  export type PlayerUpsertWithoutTeamsInput = {
    update: XOR<PlayerUpdateWithoutTeamsInput, PlayerUncheckedUpdateWithoutTeamsInput>
    create: XOR<PlayerCreateWithoutTeamsInput, PlayerUncheckedCreateWithoutTeamsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutTeamsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutTeamsInput, PlayerUncheckedUpdateWithoutTeamsInput>
  }

  export type PlayerUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    matchesAsPlayerOne?: MatchUpdateManyWithoutPlayerOneNestedInput
    matchesAsPlayerTwo?: MatchUpdateManyWithoutPlayerTwoNestedInput
  }

  export type PlayerUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    matchesAsPlayerOne?: MatchUncheckedUpdateManyWithoutPlayerOneNestedInput
    matchesAsPlayerTwo?: MatchUncheckedUpdateManyWithoutPlayerTwoNestedInput
  }

  export type MatchUpsertWithWhereUniqueWithoutTeamOneInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutTeamOneInput, MatchUncheckedUpdateWithoutTeamOneInput>
    create: XOR<MatchCreateWithoutTeamOneInput, MatchUncheckedCreateWithoutTeamOneInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutTeamOneInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutTeamOneInput, MatchUncheckedUpdateWithoutTeamOneInput>
  }

  export type MatchUpdateManyWithWhereWithoutTeamOneInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutTeamOneInput>
  }

  export type MatchUpsertWithWhereUniqueWithoutTeamTwoInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutTeamTwoInput, MatchUncheckedUpdateWithoutTeamTwoInput>
    create: XOR<MatchCreateWithoutTeamTwoInput, MatchUncheckedCreateWithoutTeamTwoInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutTeamTwoInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutTeamTwoInput, MatchUncheckedUpdateWithoutTeamTwoInput>
  }

  export type MatchUpdateManyWithWhereWithoutTeamTwoInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutTeamTwoInput>
  }

  export type PlayerCreateWithoutMatchesAsPlayerOneInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamCreateNestedManyWithoutPlayerInput
    matchesAsPlayerTwo?: MatchCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerUncheckedCreateWithoutMatchesAsPlayerOneInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamUncheckedCreateNestedManyWithoutPlayerInput
    matchesAsPlayerTwo?: MatchUncheckedCreateNestedManyWithoutPlayerTwoInput
  }

  export type PlayerCreateOrConnectWithoutMatchesAsPlayerOneInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutMatchesAsPlayerOneInput, PlayerUncheckedCreateWithoutMatchesAsPlayerOneInput>
  }

  export type PlayerCreateWithoutMatchesAsPlayerTwoInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamCreateNestedManyWithoutPlayerInput
    matchesAsPlayerOne?: MatchCreateNestedManyWithoutPlayerOneInput
  }

  export type PlayerUncheckedCreateWithoutMatchesAsPlayerTwoInput = {
    id?: string
    address: string
    wins?: number
    losses?: number
    teams?: TeamUncheckedCreateNestedManyWithoutPlayerInput
    matchesAsPlayerOne?: MatchUncheckedCreateNestedManyWithoutPlayerOneInput
  }

  export type PlayerCreateOrConnectWithoutMatchesAsPlayerTwoInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedCreateWithoutMatchesAsPlayerTwoInput>
  }

  export type TeamCreateWithoutMatchesAsTeamOneInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    player: PlayerCreateNestedOneWithoutTeamsInput
    matchesAsTeamTwo?: MatchCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamUncheckedCreateWithoutMatchesAsTeamOneInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    playerId: string
    matchesAsTeamTwo?: MatchUncheckedCreateNestedManyWithoutTeamTwoInput
  }

  export type TeamCreateOrConnectWithoutMatchesAsTeamOneInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMatchesAsTeamOneInput, TeamUncheckedCreateWithoutMatchesAsTeamOneInput>
  }

  export type TeamCreateWithoutMatchesAsTeamTwoInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    player: PlayerCreateNestedOneWithoutTeamsInput
    matchesAsTeamOne?: MatchCreateNestedManyWithoutTeamOneInput
  }

  export type TeamUncheckedCreateWithoutMatchesAsTeamTwoInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
    playerId: string
    matchesAsTeamOne?: MatchUncheckedCreateNestedManyWithoutTeamOneInput
  }

  export type TeamCreateOrConnectWithoutMatchesAsTeamTwoInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMatchesAsTeamTwoInput, TeamUncheckedCreateWithoutMatchesAsTeamTwoInput>
  }

  export type PlayerUpsertWithoutMatchesAsPlayerOneInput = {
    update: XOR<PlayerUpdateWithoutMatchesAsPlayerOneInput, PlayerUncheckedUpdateWithoutMatchesAsPlayerOneInput>
    create: XOR<PlayerCreateWithoutMatchesAsPlayerOneInput, PlayerUncheckedCreateWithoutMatchesAsPlayerOneInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutMatchesAsPlayerOneInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutMatchesAsPlayerOneInput, PlayerUncheckedUpdateWithoutMatchesAsPlayerOneInput>
  }

  export type PlayerUpdateWithoutMatchesAsPlayerOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerTwo?: MatchUpdateManyWithoutPlayerTwoNestedInput
  }

  export type PlayerUncheckedUpdateWithoutMatchesAsPlayerOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUncheckedUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerTwo?: MatchUncheckedUpdateManyWithoutPlayerTwoNestedInput
  }

  export type PlayerUpsertWithoutMatchesAsPlayerTwoInput = {
    update: XOR<PlayerUpdateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedUpdateWithoutMatchesAsPlayerTwoInput>
    create: XOR<PlayerCreateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedCreateWithoutMatchesAsPlayerTwoInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutMatchesAsPlayerTwoInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutMatchesAsPlayerTwoInput, PlayerUncheckedUpdateWithoutMatchesAsPlayerTwoInput>
  }

  export type PlayerUpdateWithoutMatchesAsPlayerTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerOne?: MatchUpdateManyWithoutPlayerOneNestedInput
  }

  export type PlayerUncheckedUpdateWithoutMatchesAsPlayerTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    teams?: TeamUncheckedUpdateManyWithoutPlayerNestedInput
    matchesAsPlayerOne?: MatchUncheckedUpdateManyWithoutPlayerOneNestedInput
  }

  export type TeamUpsertWithoutMatchesAsTeamOneInput = {
    update: XOR<TeamUpdateWithoutMatchesAsTeamOneInput, TeamUncheckedUpdateWithoutMatchesAsTeamOneInput>
    create: XOR<TeamCreateWithoutMatchesAsTeamOneInput, TeamUncheckedCreateWithoutMatchesAsTeamOneInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMatchesAsTeamOneInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMatchesAsTeamOneInput, TeamUncheckedUpdateWithoutMatchesAsTeamOneInput>
  }

  export type TeamUpdateWithoutMatchesAsTeamOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    player?: PlayerUpdateOneRequiredWithoutTeamsNestedInput
    matchesAsTeamTwo?: MatchUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamUncheckedUpdateWithoutMatchesAsTeamOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    playerId?: StringFieldUpdateOperationsInput | string
    matchesAsTeamTwo?: MatchUncheckedUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamUpsertWithoutMatchesAsTeamTwoInput = {
    update: XOR<TeamUpdateWithoutMatchesAsTeamTwoInput, TeamUncheckedUpdateWithoutMatchesAsTeamTwoInput>
    create: XOR<TeamCreateWithoutMatchesAsTeamTwoInput, TeamUncheckedCreateWithoutMatchesAsTeamTwoInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMatchesAsTeamTwoInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMatchesAsTeamTwoInput, TeamUncheckedUpdateWithoutMatchesAsTeamTwoInput>
  }

  export type TeamUpdateWithoutMatchesAsTeamTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    player?: PlayerUpdateOneRequiredWithoutTeamsNestedInput
    matchesAsTeamOne?: MatchUpdateManyWithoutTeamOneNestedInput
  }

  export type TeamUncheckedUpdateWithoutMatchesAsTeamTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    playerId?: StringFieldUpdateOperationsInput | string
    matchesAsTeamOne?: MatchUncheckedUpdateManyWithoutTeamOneNestedInput
  }

  export type TeamCreateManyPlayerInput = {
    id?: string
    name: string
    tokens?: TeamCreatetokensInput | string[]
  }

  export type MatchCreateManyPlayerOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerTwoId?: string | null
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateManyPlayerTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    teamOneId: string
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type TeamUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    matchesAsTeamOne?: MatchUpdateManyWithoutTeamOneNestedInput
    matchesAsTeamTwo?: MatchUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
    matchesAsTeamOne?: MatchUncheckedUpdateManyWithoutTeamOneNestedInput
    matchesAsTeamTwo?: MatchUncheckedUpdateManyWithoutTeamTwoNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tokens?: TeamUpdatetokensInput | string[]
  }

  export type MatchUpdateWithoutPlayerOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerTwo?: PlayerUpdateOneWithoutMatchesAsPlayerTwoNestedInput
    teamOne?: TeamUpdateOneRequiredWithoutMatchesAsTeamOneNestedInput
    teamTwo?: TeamUpdateOneWithoutMatchesAsTeamTwoNestedInput
  }

  export type MatchUncheckedUpdateWithoutPlayerOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUncheckedUpdateManyWithoutPlayerOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUpdateWithoutPlayerTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerOne?: PlayerUpdateOneRequiredWithoutMatchesAsPlayerOneNestedInput
    teamOne?: TeamUpdateOneRequiredWithoutMatchesAsTeamOneNestedInput
    teamTwo?: TeamUpdateOneWithoutMatchesAsTeamTwoNestedInput
  }

  export type MatchUncheckedUpdateWithoutPlayerTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUncheckedUpdateManyWithoutPlayerTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchCreateManyTeamOneInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamTwoId?: string | null
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchCreateManyTeamTwoInput = {
    id?: string
    status?: $Enums.MatchStatus
    type: $Enums.MatchType
    createdAt?: Date | string
    updatedAt?: Date | string
    playerOneId: string
    playerTwoId?: string | null
    teamOneId: string
    teamOneScore?: number | null
    teamTwoScore?: number | null
    teamOneGain?: number | null
    teamTwoGain?: number | null
    winnerShare?: number | null
    loserShare?: number | null
    winnerId?: string | null
    result?: $Enums.MatchResult | null
    duration?: number
    price?: number
    vaultId?: string | null
    startTime?: Date | string | null
    endTime?: Date | string | null
  }

  export type MatchUpdateWithoutTeamOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerOne?: PlayerUpdateOneRequiredWithoutMatchesAsPlayerOneNestedInput
    playerTwo?: PlayerUpdateOneWithoutMatchesAsPlayerTwoNestedInput
    teamTwo?: TeamUpdateOneWithoutMatchesAsTeamTwoNestedInput
  }

  export type MatchUncheckedUpdateWithoutTeamOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUncheckedUpdateManyWithoutTeamOneInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUpdateWithoutTeamTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    playerOne?: PlayerUpdateOneRequiredWithoutMatchesAsPlayerOneNestedInput
    playerTwo?: PlayerUpdateOneWithoutMatchesAsPlayerTwoNestedInput
    teamOne?: TeamUpdateOneRequiredWithoutMatchesAsTeamOneNestedInput
  }

  export type MatchUncheckedUpdateWithoutTeamTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MatchUncheckedUpdateManyWithoutTeamTwoInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumMatchStatusFieldUpdateOperationsInput | $Enums.MatchStatus
    type?: EnumMatchTypeFieldUpdateOperationsInput | $Enums.MatchType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerOneId?: StringFieldUpdateOperationsInput | string
    playerTwoId?: NullableStringFieldUpdateOperationsInput | string | null
    teamOneId?: StringFieldUpdateOperationsInput | string
    teamOneScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoScore?: NullableFloatFieldUpdateOperationsInput | number | null
    teamOneGain?: NullableFloatFieldUpdateOperationsInput | number | null
    teamTwoGain?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerShare?: NullableFloatFieldUpdateOperationsInput | number | null
    loserShare?: NullableFloatFieldUpdateOperationsInput | number | null
    winnerId?: NullableStringFieldUpdateOperationsInput | string | null
    result?: NullableEnumMatchResultFieldUpdateOperationsInput | $Enums.MatchResult | null
    duration?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    vaultId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}