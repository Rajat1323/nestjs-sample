/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GenericItem {
    [key: string]: any;
    children?: GenericItem[];
}