export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type PickArrayLike<Obj extends Record<string, unknown>, Selection extends keyof Obj> = {
	[Key in keyof Obj]: Key extends Selection ? Obj[Key][] : Obj[Key] | undefined;
};
