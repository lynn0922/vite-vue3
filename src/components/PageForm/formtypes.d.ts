export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

export interface Basic<T extends any> {
    [index: string]: T
}
