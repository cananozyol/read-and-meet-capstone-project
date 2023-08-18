export type Meeting = {
    id: string,
    title: string,
    date: string,
    location: string,
    book?: {
        id?: string;
        title?: string;
        author?: string;
    }
    userId: string;
}


export type MeetingWithoutId = {
    title: string,
    date: string,
    location: string,
    book?: {
        id?: string;
        title?: string;
        author?: string;
    }
}
