import {Meeting, MeetingWithoutId} from "../models/meeting.ts";
import {create} from "zustand";
import axios from "axios";

type State = {
    meetings: Meeting[];
    fetchMeetings: () => void;
    postMeeting: (requestBody: MeetingWithoutId) => void;
    getMeetingById: (id: string | undefined) => Meeting | undefined;
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
        axios
            .get(`/api/meetings/${id}`)
            .then((response) => response.data)
            .then((data) => {
                set({ meetings: data });
            })
            .catch(console.error);
        const { meetings } = get();
        const meeting = meetings.find((meeting) => meeting.id === id);
        return meeting;

    },
}));
