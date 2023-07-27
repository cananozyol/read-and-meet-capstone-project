package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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

    @Autowired
    private MeetingService meetingService;

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

    @Test
    @DirtiesContext
    void expectUpdatedMeetingList_whenPOSTNewMeeting() throws Exception {
        // GIVEN
        String meetingWithoutId = """
                   {
                   "title": "book",
                   "date": "2023-08-08",
                   "location": "online"
                   }
                                """;


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON))

        //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("book"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].date").value("2023-08-08"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("online"));
    }

    @Test
    @DirtiesContext
    void expectMeeting_whenGETById() throws Exception {
        //GIVEN
        String meetingWithoutId = """
                   {
                   "title": "book",
                   "date": "2023-08-08",
                   "location": "online"
                   }
                                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON));

        String id = meetingService.list().get(0).getId();

        String expected = """
                        {
                            "id": "%s",
                            "title": "book",
                            "date": "2023-08-08",
                            "location": "online"
                         }
                """.formatted(id);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings/" + id))

        //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectEmptyList_whenDELETEMeetingById () throws Exception {
        //GIVEN
        String meetingWithoutId = """
                   {
                   "title": "book",
                   "date": "2023-08-08",
                   "location": "online"
                   }
                                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON));

        String id = meetingService.list().get(0).getId();

        String expected = "[]";

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/meetings/" + id))

        //THEN
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings"))
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

}
