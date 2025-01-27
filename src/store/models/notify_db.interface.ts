export interface INotifyDb {
    id: any;
    name: string;
    description: string;
    time: string;
}

export enum NotifyDbModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}