import {Meeting, MeetingWithoutId} from "../models/meeting.ts";
import {create} from "zustand";
import axios from "axios";

type State = {
    meetings: Meeting[];
    fetchMeetings: () => void;
    postMeeting: (requestBody: MeetingWithoutId) => void;
    getMeetingById: (id: string | undefined) => Meeting | undefined;
    deleteMeeting: (id: string | undefined) => void;
    putMeeting: (requestBody: Meeting) => void;
};

export const useFetch = create<State>((set, get) => ({
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
        axios
            .post("/api/meetings", requestBody)
            .then((response) => response.data)
            .then((newMeeting) => {
                set((state) => ({ meetings: [...state.meetings, newMeeting] }));
            })
            .catch(console.error);
    },

    getMeetingById: (id: string | undefined) => {
        if (!id) {
            throw new Error("No id provided");
        }

        const { meetings } = get();
        const meeting = meetings.find((meeting) => meeting.id === id);
        return meeting;
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
        const { id, ...meetingWithoutId } = requestBody; // Destructure the requestBody to get the id and the rest of the properties
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
}));
