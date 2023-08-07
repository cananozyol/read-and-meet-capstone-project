import {Meeting, MeetingWithoutId} from "../models/meeting.ts";
import {create} from "zustand";
import axios from "axios";
import {Book} from "../models/books.ts";

type State = {
    meetings: Meeting[];
    fetchMeetings: () => void;
    postMeeting: (requestBody: MeetingWithoutId) => void;
    getMeetingById: (id: string | undefined) => Meeting | undefined;
    deleteMeeting: (id: string | undefined) => void;
    putMeeting: (requestBody: Meeting) => void;
    getBooksForMeeting: (meetingId: string) => Promise<Book[]>;
};

export const useMeetings = create<State>((set, get) => ({
    meetings: [],
    fetchMeetings: () => {
        axios
            .get("api/meetings")
            .then((response) => response.data)
            .then((data) => {
                set({ meetings: data });
            })
            .catch(console.error);
    },

    postMeeting: (requestBody: MeetingWithoutId) => {
        const { fetchMeetings } = get();
        axios
            .post("/api/meetings", requestBody)
            .then(fetchMeetings)
            .catch(console.error);
    },

    getMeetingById: (id: string | undefined) => {
        if (!id) {
            throw new Error("No id provided");
        }
        const { meetings } = get();
        return meetings.find((meeting) => meeting.id === id);
    },

    deleteMeeting: (id: string | undefined) => {
        if (!id) {
            throw new Error("No id provided");
        }

        axios
            .delete(`/api/meetings/${id}`)
            .then(() => {
                set((state) => ({ meetings: state.meetings.filter((meeting) => meeting.id !== id) }));
            })
            .catch(console.error);
    },

    putMeeting: (requestBody: Meeting) => {
        const { id, ...meetingWithoutId } = requestBody;
        axios
            .put(`/api/meetings/${id}`, meetingWithoutId)
            .then((response) => response.data)
            .then((updatedMeeting) => {
                set((state) => ({
                    meetings: state.meetings.map((meeting) =>
                        meeting.id === id ? { ...updatedMeeting, id } : meeting
                    ),
                }));
            })
            .catch(console.error);
    },

    getBooksForMeeting: (meetingId: string) => {
        return axios
            .get(`/api/meetings/${meetingId}/books`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching books for meeting:", error);
                return [];
            });
    },

}));
