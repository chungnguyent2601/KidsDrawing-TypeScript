import { IProduct, ProductModificationStatus } from "./product.interface";
import { INotification } from "./notification.interface";
import { IUser, UserModificationStatus } from "./user.interface";
import { IOrder } from "./order.interface";
import { IAccount } from "./account.interface";
import { ISemester, SemesterModificationStatus } from "./semester.interface";
import { ILesson, LessonModificationStatus } from "./lesson.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    products: IProductState;
    notifications: INotificationState;
    users: IUserState;
    orders: IOrdersState;
    account: IAccount;
    semesters: ISemesterState;
    lessons: ILessonState;
}

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    modificationState: ProductModificationStatus;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}

export interface IOrdersState {
    orders: IOrder[];
}

export interface INotificationState {
    notifications: INotification[];
}

export interface IUserState {
    selectedUser: IUser | null;
    modificationState: UserModificationStatus;
    admins: IUser[];
    teachers: IUser[];
    students: IUser[];
    parents: IUser[];
}

export interface ISemesterState {
    selectedSemester: ISemester | null;
    modificationState: SemesterModificationStatus;
    semesters: ISemester[];
}

export interface ILessonState {
    selectedLesson: ILesson | null;
    modificationState: LessonModificationStatus;
    lessons: ILesson[];
}