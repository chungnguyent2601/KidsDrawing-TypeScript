export interface IArtAge {
    id: number;
    name: string;
    description: string;
}

export enum ArtAgeModificationStatus {
    None = 0,
    Create = 1,
    Edit = 2,
    Remove = 3,
    ClosePopup = 4
}