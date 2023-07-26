export type Meeting = {
    id: string,
    title: string,
    date: string,
    location: string,
}

export type MeetingWithoutId = {
    title: string,
    date: string,
    location: string,
}
