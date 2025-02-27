export declare type PendingServiceMethodName = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
export declare type PendingIdServiceMethodName = Exclude<PendingServiceMethodName, 'find' | 'get'>;
export default function makeServiceMutations(): {
    mergeInstance: (state: any, item: any) => void;
    merge: (state: any, { dest, source }: {
        dest: any;
        source: any;
    }) => void;
    addItem(state: any, item: any): void;
    addItems: (state: any, items: any) => void;
    updateItem(state: any, item: any): void;
    updateItems(state: any, items: any): void;
    updateTemp(state: any, { id, tempId }: {
        id: any;
        tempId: any;
    }): void;
    removeItem(state: any, item: any): void;
    removeTemps(state: any, tempIds: any): void;
    removeItems(state: any, items: any): void;
    clearAll(state: any): void;
    createCopy(state: any, id: any): void;
    resetCopy(state: any, id: any): void;
    commitCopy(state: any, id: any): void;
    clearCopy(state: any, id: any): void;
    /**
     * Stores pagination data on state.pagination based on the query identifier
     * (qid) The qid must be manually assigned to `params.qid`
     */
    updatePaginationForQuery(state: any, { qid, response, query }: {
        qid: any;
        response: any;
        query?: {};
    }): void;
    setPending(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
    unsetPending(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
    setIdPending(state: any, payload: {
        method: "update" | "create" | "patch" | "remove";
        id: string | number | (string | number)[];
    }): void;
    unsetIdPending(state: any, payload: {
        method: "update" | "create" | "patch" | "remove";
        id: string | number | (string | number)[];
    }): void;
    setError(state: any, payload: {
        method: "update" | "find" | "get" | "create" | "patch" | "remove";
        error: Error;
    }): void;
    clearError(state: any, method: "update" | "find" | "get" | "create" | "patch" | "remove"): void;
};
