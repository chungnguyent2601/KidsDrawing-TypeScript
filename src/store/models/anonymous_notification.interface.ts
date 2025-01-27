export interface IAnonymousNotification {
    id: any,
    name: string, 
    description: string,
    time: string
}

export enum AnonymousNotificationModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
} 