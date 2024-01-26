export interface Event {
    id: string;
    title?: string;
    start: Date | string;
    end?: Date | string;
    fullDay?: boolean;
    member?: string;
    company?: string;
}

export interface Appointment {
    appointmentId?: string;
    memberId: number;
    companyId: number;
    startDate: string;
    endDate: string;
}
export interface Member {
    memberId: string;
    name: string;
    lastName: string;
}

export interface Client {
    companyId: string;
    companyName: string;
}

export interface DataContextType {
    events: Appointment[];
    members: Member[];
    clients: Client[];
    transformedEvents: Event[];
}
