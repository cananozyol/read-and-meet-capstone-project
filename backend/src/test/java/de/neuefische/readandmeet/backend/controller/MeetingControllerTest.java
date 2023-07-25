package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
class MeetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MeetingRepo meetingRepo;


    @Test
    @DirtiesContext
    void expectMeetingList_whenGETMeetingList() throws Exception {
        //GIVEN
        Meeting meeting = new Meeting("123", "Resonance Surge", null, "online");
        meetingRepo.insert(meeting);

        String expected = """
                [
                    {
                        "id": "123",
                        "title": "Resonance Surge",
                        "date": null,
                        "location": "online"
                    }
                ]
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings"))

                //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }
}