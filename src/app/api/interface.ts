export interface controlError {
    ok: boolean;
    message: string;
    document?: boolean;
}

export interface ResTmp {
    customerId?: number;
    customerDocument?: string;
    customerFirstname?: string;
    customerLastname?: string;
    customerPhone?: string;
    customerState?: boolean;
    roleId?: number;
    surveyId?: number;
    access?: Access;
}

export interface Access {
    accessEmail?: string;
}
