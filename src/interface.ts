export interface iController {
    emit(action: string, params?: any): void
    link(action: string, handler: Function): void
}

export interface iItem {
    [id: string]: {
        check: boolean,
        title: string
    }
}

export interface iHandler{
    
}
