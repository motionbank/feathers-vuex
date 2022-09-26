import { ServiceState } from '..';
export default function makeServiceGetters(): {
    list(state: any): any;
    find: (state: any) => (params: any) => {
        total: number;
        limit: any;
        skip: any;
        data: any[];
    };
    count: (state: any, getters: any) => (params: any) => any;
    get: ({ keyedById, tempsById, idField, tempIdField }: {
        keyedById: any;
        tempsById: any;
        idField: any;
        tempIdField: any;
    }) => (id: any, params?: {}) => any;
    getCopyById: (state: any) => (id: any) => any;
    isCreatePendingById: ({ isIdCreatePending }: ServiceState<import("./types").Model>) => (id: string | number) => boolean;
    isUpdatePendingById: ({ isIdUpdatePending }: ServiceState<import("./types").Model>) => (id: string | number) => boolean;
    isPatchPendingById: ({ isIdPatchPending }: ServiceState<import("./types").Model>) => (id: string | number) => boolean;
    isRemovePendingById: ({ isIdRemovePending }: ServiceState<import("./types").Model>) => (id: string | number) => boolean;
    isSavePendingById: (state: ServiceState<import("./types").Model>, getters: any) => (id: string | number) => any;
    isPendingById: (state: ServiceState<import("./types").Model>, getters: any) => (id: string | number) => any;
};
export declare type GetterName = keyof ReturnType<typeof makeServiceGetters>;
