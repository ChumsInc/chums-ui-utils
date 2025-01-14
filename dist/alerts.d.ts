export interface BasicAlert {
    title?: string;
    message?: string;
    context?: string;
    canDismiss?: boolean;
}
export interface ErrorAlert {
    id: number;
    context: string;
    message: string;
    count: number;
}
