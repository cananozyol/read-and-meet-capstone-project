export type Meeting = {
    id: string,
    title: string,
    date: string,
    location: string,
    book?: {
        title?: string,
        author?: string
    }
}

export type MeetingWithoutId = {
    title: string,
    date: string,
    location: string,
    book?: {
        title?: string,
        author?: string
    }
}
