import {Meeting, MeetingWithoutId} from "../models/meeting.ts";
import {create} from "zustand";
import axios from "axios";


type State = {
    meetings: Meeting[];
    fetchMeetings: () => void,
    postMeeting: (requestBody: MeetingWithoutId) => void;
};

export const useFetch = create<State>((set, get) => ({

    meetings: [],

    fetchMeetings: () => {
        axios
            .get("api/meetings")
            .then((response) => response.data)
            .then((data) => {
                set({meetings: data})
            })
    },

    postMeeting: (requestBody: MeetingWithoutId) => {
        const { fetchMeetings } = get();
        axios
            .post("/api/meetings", requestBody)
            .then(fetchMeetings)
            .catch(console.error);
    },

}));