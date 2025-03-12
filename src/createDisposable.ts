type SyncDisposeFn = () => void;
type AsyncDisposeFn = () => Promise<void>;
type ErrorHandler = (error: unknown) => void;
type DisposableFn = SyncDisposeFn | AsyncDisposeFn;

/**
 * Wraps a synchronous dispose function with error handling logic.
 * @param fn - Synchronous dispose function to execute
 * @param onError - Error handler callback for caught exceptions
 * @returns A wrapped synchronous dispose function that safely handles errors
 */
const syncError =
    (fn: SyncDisposeFn, onError: ErrorHandler): SyncDisposeFn =>
    () => {
        try {
            fn();
        } catch (error) {
            onError(error);
        }
    };

/**
 * Wraps an asynchronous dispose function with error handling logic.
 * @param fn - Asynchronous dispose function to execute
 * @param onError - Error handler callback for caught exceptions
 * @returns A wrapped asynchronous dispose function that safely handles errors
 */
const asyncError =
    (fn: AsyncDisposeFn, onError: ErrorHandler): AsyncDisposeFn =>
    async () => {
        try {
            await fn();
        } catch (error) {
            onError(error);
        }
    };
/**
 * Creates a disposable error handler that wraps synchronous or asynchronous dispose functions
 *
 * Generates a higher-order function that safely wraps disposal operations with error handling.
 * The returned function will execute the original dispose function and catch any errors,
 * forwarding them to the provided error handler callback.
 *
 * @param isAsync - Flag indicating whether to handle asynchronous disposal functions
 * @returns A factory function that takes:
 *          - fn: The disposal function to wrap (sync or async)
 *          - onError: Error handler callback for caught exceptions
 *          Returns a wrapped disposal function with integrated error handling
 */
const createErrorHandler = (isAsync: boolean) => (fn: DisposableFn, onError: ErrorHandler) =>
    isAsync ? asyncError(fn as AsyncDisposeFn, onError) : syncError(fn, onError);

/**
 * Creates a disposal function with integrated error handling
 *
 * @remarks
 * Automatically handles both synchronous and asynchronous disposal functions by detecting
 * their type. Wraps the original function in error handling logic.
 *
 * @param fn - The disposal function to be wrapped (sync or async)
 * @param onError - Error handler callback for caught exceptions (default: console.error)
 *
 * @returns A wrapped disposal function that:
 *          - Preserves original function type (sync/async)
 *          - Executes the original function in try/catch block
 *          - Delegates errors to provided handler
 *          - Returns the same value type as original function
 */
const withErrorHandling = <T extends DisposableFn>(fn: T, onError: ErrorHandler = console.error): DisposableFn =>
    createErrorHandler(isAsyncDisposeFn(fn))(fn, onError);

/**
 * Wraps a synchronous disposal function with error handling capabilities
 *
 * @param fn - Synchronous disposal function to be wrapped. Must be a zero-argument function
 * @param onError - Error handler callback for caught exceptions (default: console.error)
 *
 * @returns A wrapped synchronous disposal function that:
 *          - Preserves original function type
 *          - Executes in try/catch block
 *          - Delegates errors to provided handler
 *          - Maintains synchronous execution context
 */
const withSyncErrorHandling = <T extends SyncDisposeFn>(fn: T, onError: ErrorHandler = console.error): SyncDisposeFn =>
    withErrorHandling(fn, onError);

/**
 * Wraps an asynchronous disposal function with error handling capabilities
 *
 * @template T - Extends AsyncDisposeFn to enforce asynchronous disposal function signature
 * @param fn - Asynchronous disposal function to be wrapped
 * @param onError - Error handler callback for caught exceptions (default: console.error)
 *
 * @returns A wrapped asynchronous disposal function that:
 *          - Preserves original async function type
 *          - Executes in async try/catch block
 *          - Delegates errors to provided handler
 *          - Maintains asynchronous execution context
 *          - Returns the same Promise-based interface as original function
 */
const withAsyncErrorHandling = <T extends AsyncDisposeFn>(fn: T, onError: ErrorHandler = console.error): T =>
    withErrorHandling(fn, onError) as T;

/**
 * Type guard that verifies if a value is a valid synchronous dispose function
 *
 * @param fn - Unknown value to be type-checked
 * @returns Boolean predicate asserting whether the input is a {@link SyncDisposeFn}.
 *          Returns true when:
 *          - Value is a function type
 *          - Function has zero parameters (verified via fn.length)
 *          - Function is not async (implicit from SyncDisposeFn typing)
 */
const isDisposeFn = (fn: unknown): fn is SyncDisposeFn => typeof fn === "function" && fn.length === 0;

/**
 * Type guard that verifies if a value is a valid asynchronous dispose function
 *
 * @param fn - Unknown value to be type-checked
 * @returns Boolean predicate asserting whether the input is an {@link AsyncDisposeFn}.
 *          Returns true when:
 *          - Value is a function type
 *          - Function's constructor name indicates async nature (via constructor.name check)
 */
const isAsyncDisposeFn = (fn: unknown): fn is AsyncDisposeFn =>
    typeof fn === "function" && Object.prototype.toString.call(fn) === "[object AsyncFunction]";

/**
 * Creates a disposal state manager with encapsulated disposal status
 *
 * @returns A read-only object containing:
 *          - isDisposed: Zero-argument function that returns current disposal status
 *          - markDisposed: Zero-argument function that updates disposal status to true
 *          The state is maintained in a closure to prevent external modification
 *          Return type is frozen with 'as const' to ensure type-safe immutability
 */
const createDisposeState = () => {
    let isDisposed = false;
    return {
        /** Checks if disposal has been completed */
        isDisposed: () => isDisposed,

        /** Marks the resource as disposed and prevents duplicate disposal */
        markDisposed: () => {
            isDisposed = true;
        },
    } as const;
};

/**
 * Validates resource disposal state to prevent duplicate disposal attempts
 *
 * @param state - Object containing disposal state management methods:
 *                - `isDisposed`: Zero-argument function returning boolean disposal status
 *                - `markDisposed`: Zero-argument function to update disposal flag
 * @throws {Error} When resource has already been disposed (state.isDisposed() returns true)
 */
const checkDisposeState = (state: { readonly isDisposed: () => boolean; readonly markDisposed: () => void }) => {
    if (state.isDisposed()) throw new Error("Resource already disposed.");
};

/**
 * Wraps async disposal with state management
 * @param state - Disposal state tracker
 * @param fn - Async disposal function
 * @returns Async function that:
 *          - Verifies state validity
 *          - Executes disposal
 *          - Updates disposal state
 */
const asyncDispose =
    (state: { readonly isDisposed: () => boolean; readonly markDisposed: () => void }, fn: AsyncDisposeFn) =>
    async () => {
        checkDisposeState(state);
        await fn();
        state.markDisposed();
    };

/**
 * Sync disposer executor with state validation and update.
 * @param state - Disposal state tracker
 * @param fn - Sync dispose function to execute
 * @returns Sync disposer function that:
 *          - Validates state pre-execution
 *          - Executes dispose function
 *          - Updates state post-execution
 */
const syncDispose =
    (state: { readonly isDisposed: () => boolean; readonly markDisposed: () => void }, fn: SyncDisposeFn) => () => {
        checkDisposeState(state);
        fn();
        state.markDisposed();
    };

/**
 * Creates a guarded executor for disposal operations that ensures proper state management
 *
 * @param state - Dispose state container providing:
 *                - State validation checks
 *                - Disposed status tracking
 *                - State mutation methods
 *
 * @returns An executor object with:
 *          - `sync`: Wraps synchronous dispose functions with state validation and update
 *          - `async`: Wraps asynchronous dispose functions with state validation and update
 *
 * @remarks
 * The returned executor methods will:
 * 1. Validate current dispose state before execution
 * 2. Execute the provided dispose function
 * 3. Update state after successful execution
 * 4. Prevent execution if already disposed
 *
 * @throws If called when already disposed (via state validation checks)
 */
const createGuardedExecutor = (state: ReturnType<typeof createDisposeState>) => ({
    sync: (fn: SyncDisposeFn) => syncDispose(state, fn),
    async: (fn: AsyncDisposeFn) => asyncDispose(state, fn),
});

/**
 * Composes a disposable object that integrates both synchronous and asynchronous
 * disposal patterns with safety guarantees:
 * - Ensures single-time disposal
 * - Adds error handling layers
 * - Supports standard ES Disposable/AsyncDisposable patterns via Symbols
 *
 * @param sync - Synchronous disposal function to execute
 * @param async - Asynchronous disposal function to execute
 * @returns A frozen disposable object containing:
 *          - `dispose`: Synchronous disposal method with error handling
 *          - `asyncDispose`: Asynchronous disposal method with error handling
 *          - `[Symbol.dispose]`: ES-standard synchronous disposal symbol
 *          - `[Symbol.asyncDispose]`: ES-standard asynchronous disposal symbol
 *
 * @remarks
 * The implementation ensures:
 * 1. State validation before execution
 * 2. Error boundary protection
 * 3. Atomic state updates after execution
 * 4. Immutable return object to prevent modification
 */
const composeDisposable = (
    sync: SyncDisposeFn,
    async: AsyncDisposeFn,
): Readonly<{
    [Symbol.dispose]: SyncDisposeFn;
    [Symbol.asyncDispose]: AsyncDisposeFn;
    dispose: SyncDisposeFn;
    asyncDispose: AsyncDisposeFn;
}> => {
    const state = createDisposeState();
    const executor = createGuardedExecutor(state);
    const guardedSync = executor.sync(sync);
    const guardedAsync = executor.async(async);

    return Object.freeze({
        dispose: withSyncErrorHandling(guardedSync),
        asyncDispose: withAsyncErrorHandling(guardedAsync),
        [Symbol.dispose]: withSyncErrorHandling(guardedSync),
        [Symbol.asyncDispose]: withAsyncErrorHandling(guardedAsync),
    });
};

/**
 * Creates a disposable object that combines synchronous and asynchronous cleanup logic.
 *
 * @template T - An object type that may contain optional `dispose` (synchronous) and
 *               `asyncDispose` (asynchronous) cleanup methods.
 * @param {T} [options] - Optional configuration object containing cleanup methods:
 *  - `dispose`: Sync function called for synchronous cleanup (e.g., removing event listeners)
 *  - `asyncDispose`: Async function called for asynchronous cleanup (e.g., closing network connections)
 * @returns A composite disposable object that handles both sync/async cleanup.
 */
export const createDisposable = <
    const T extends {
        dispose?: SyncDisposeFn;
        asyncDispose?: AsyncDisposeFn;
    },
>(
    options?: T,
) => {
    const validDispose = isDisposeFn(options?.dispose) ? options.dispose : () => {};

    const validAsyncDispose = isAsyncDisposeFn(options?.asyncDispose) ? options.asyncDispose : async () => {};

    return composeDisposable(validDispose, validAsyncDispose);
};

/**
 * Combines multiple disposable objects into a single composite disposable.
 *
 * @description
 * Creates a composite disposable that handles disposal in reverse registration order.
 * The synchronous `dispose` method will execute all disposables' sync disposal immediately,
 * while the async disposal requires explicit `await` or use with `await using` syntax.
 *
 * @param disposables - Variadic list of disposable objects. Each must implement both
 *                      `[Symbol.dispose]()` and `[Symbol.asyncDispose]()` methods.
 *
 * @returns A composed disposable object containing both sync and async disposal methods.
 *
 * @throws {TypeError} If any disposable doesn't implement required disposal methods.
 */
export const combineDisposables = (...disposables: ReturnType<typeof createDisposable>[]) => {
    const reverseDisposables = [...disposables].reverse();

    const dispose: SyncDisposeFn = () => {
        reverseDisposables.map((d) => d[Symbol.dispose]());
    };

    const asyncDispose: AsyncDisposeFn = async () => {
        for await (const d of reverseDisposables) {
            await d[Symbol.asyncDispose]();
        }
    };

    return composeDisposable(dispose, asyncDispose);
};
