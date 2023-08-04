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

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


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
        Meeting meeting = new Meeting("123", "Resonance Surge", null, "online", "b001");
        meetingRepo.insert(meeting);

        String expected = """
                [
                    {
                        "id": "123",
                        "title": "Resonance Surge",
                        "date": null,
                        "location": "online",
                        "bookId": "b001"
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
                   "location": "online",
                   "bookId": "b001"
                   }
                                """;


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON))

        //THEN
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("book"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].date").value("2023-08-08"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("online"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].bookId").value("b001"))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DirtiesContext
    void expectMeeting_whenGETById() throws Exception {
        //GIVEN
        String meetingWithoutId = """
                   {
                   "title": "book",
                   "date": "2023-08-08",
                   "location": "online",
                   "bookId": "b001"
                   }
                                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON));

        String id = meetingService.list().get(0).getId();

        String expected = """
                        {
                            "id": "%s",
                            "title": "book",
                            "date": "2023-08-08",
                            "location": "online",
                            "bookId": "b001"
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
                   "location": "online",
                   "bookId": "b001"
                   }
                                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON));

        String id = meetingService.list().get(0).getId();

        String expected = "[]";

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/meetings/" + id))

        //THEN
                .andExpect(MockMvcResultMatchers.status().isNoContent());


        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings"))
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    void expectUpdatedMeeting_whenPUTById() throws Exception {
        //GIVEN
        String initialMeetingWithoutId = """
                   {
                   "title": "book",
                   "date": "2023-08-08",
                   "location": "online",
                   "bookId": "b001"
                   }
                                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(initialMeetingWithoutId).contentType(MediaType.APPLICATION_JSON));

        String meetingWithoutIdToPUT = """
                   {
                   "title": "book",
                   "date": "2023-09-09",
                   "location": "home",
                   "bookId": "b002"
                   }
                                """;

        String id = meetingService.list().get(0).getId();
        String updatedMeeting = """
                        {
                            "id": "%s",
                            "title": "book",
                            "date": "2023-09-09",
                            "location": "home",
                            "bookId": "b002"
                         }
                """.formatted(id);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/meetings/" + id).content(meetingWithoutIdToPUT).contentType(MediaType.APPLICATION_JSON))

                //THEN
                .andExpect(MockMvcResultMatchers.content().json(updatedMeeting)).andExpect(MockMvcResultMatchers.status().isOk());

        // VERIFY DATABASE
        Meeting updatedMeetingInDatabase = meetingRepo.findById(id).orElse(null);
        assertNotNull(updatedMeetingInDatabase);
        assertEquals("book", updatedMeetingInDatabase.getTitle());
        assertEquals(LocalDate.parse("2023-09-09"), updatedMeetingInDatabase.getDate());
        assertEquals("home", updatedMeetingInDatabase.getLocation());
        assertEquals("b002", updatedMeetingInDatabase.getBookId());
    }

    @Test
    void expectNotFoundStatus_whenGetMeetingByIdWithNonexistentId() throws Exception {
        //GIVEN
        String nonExistentId = "non_existent_id";

        //WHEN & THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings/" + nonExistentId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
