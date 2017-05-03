// Exact iteral type is not working
// Workaround is to use a helper type
// https://github.com/facebook/flow/issues/2405

declare type Exact<T> = T & $Shape<T>
