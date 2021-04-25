import { App } from "vue";

declare global {
    interface Window {
        // Global vue app instance
        __APP__: App<Element>
    }

    declare type Nullable<T> = T | null;
    declare type Recordable<T = any> = Record<string, T>;
}
