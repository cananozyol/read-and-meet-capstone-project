package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.Genre;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.Status;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import de.neuefische.readandmeet.backend.security.MongoUser;
import de.neuefische.readandmeet.backend.security.MongoUserRepository;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class MeetingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MeetingRepo meetingRepo;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private MongoUserRepository userRepository;

    @Test
    @DirtiesContext
    void expectMeetingList_whenGETMeetingList() throws Exception {
        //GIVEN
        Meeting meeting = new Meeting("123", "Silent Bonds Book Club", null, "online", new Book("b004", "Silver Silence", "Nalini Singh", Genre.FANTASY, Status.NOT_READ, 0));
        meetingRepo.insert(meeting);

        String expected = """
                    [
                        {
                            "id": "123",
                            "title": "Silent Bonds Book Club",
                            "date": null,
                            "location": "online",
                            "book": {
                                "id": "b004",
                                "title": "Silver Silence",
                                "author": "Nalini Singh",
                                "genre": "FANTASY",
                                "status": "NOT_READ",
                                "rating": 0
                            }
                        }
                    ]
                    """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings"))

                //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "booklover", password = "booklover123")
    void expectUpdatedMeetingList_whenPOSTNewMeeting() throws Exception {
        // GIVEN
        MongoUser user = new MongoUser("123", "booklover", "booklover123");
        userRepository.save(user);
        String meetingWithoutId = """
                                {
                                    "id": "456",
                                    "title": "The Hogwarts Bookworms",
                                    "date": "2023-08-08",
                                    "location": "Hogwarts",
                                    "book": {
                                        "id": "b005",
                                        "title": "Harry Potter and the Sorcerer's Stone",
                                        "author": "J.K. Rowling",
                                        "genre": "FANTASY",
                                        "status": "NOT_READ",
                                        "rating": 0
                                    }
                                }
                                """;


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/meetings").content(meetingWithoutId).contentType(MediaType.APPLICATION_JSON).with(csrf()))

        //THEN
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("The Hogwarts Bookworms"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].date").value("2023-08-08"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("Hogwarts"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].book.id").isNotEmpty())
                .andExpect(status().isCreated());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectMeeting_whenGETById() throws Exception {
        //GIVEN
        List<Meeting> meetings = new ArrayList<>();
        meetings.add(new Meeting("123", "Silent Bonds Book Club", null, "online", new Book("b004", "Silver Silence", "Nalini Singh", Genre.FANTASY, Status.NOT_READ, 0)));
        meetingRepo.insert(meetings);
        String id = meetingService.list().get(0).getId();

        String expected =   """
                            {
                              "id": "123",
                              "title": "Silent Bonds Book Club",
                              "date": null,
                              "location": "online",
                              "book": {
                                "id": "b004",
                                "title": "Silver Silence",
                                "author": "Nalini Singh",
                                "genre": "FANTASY",
                                "status": "NOT_READ",
                                "rating": 0
                              }
                            }
                            """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings/" + id).with(csrf()))

        //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "booklover", password = "booklover123")
    void expectEmptyList_whenDELETEMeetingById () throws Exception {
        //GIVEN
        MongoUser user = new MongoUser("123", "booklover", "booklover123");
        userRepository.save(user);

        List<Meeting> meetings = new ArrayList<>();
        meetings.add(new Meeting("123", "Silent Bonds Book Club", null, "online", new Book("b004", "Silver Silence", "Nalini Singh", Genre.FANTASY, Status.NOT_READ, 0)));
        meetingRepo.insert(meetings);
        String id = meetingService.list().get(0).getId();

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/meetings/" + id).with(csrf()))

        //THEN
                .andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "booklover", password = "booklover123")
    void expectUpdatedMeeting_whenPUTById() throws Exception {
        //GIVEN
        MongoUser user = new MongoUser("123", "booklover", "booklover123");
        userRepository.save(user);

        List<Meeting> meetings = new ArrayList<>();
        meetings.add(new Meeting("13", "Hogwarts Book Club", null, "Hogwarts", new Book("b001", "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", Genre.FANTASY, Status.NOT_READ, 0)));
        meetingRepo.insert(meetings);
        String id = meetingService.list().get(0).getId();


        String updatedMeeting = """
                        {
                            "title": "Hogwarts Bookworms",
                            "date": "2023-09-09",
                            "location": "Room of Requirement",
                            "book": {
                                "id": "b001",
                                "title": "Harry Potter and the Sorcerer's Stone",
                                "author": "J.K. Rowling",
                                "genre": "FANTASY",
                                "status": "NOT_READ",
                                "rating": 0
                            }
                        }
                    """;


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/meetings/" + id)
                        .content(updatedMeeting).contentType(MediaType.APPLICATION_JSON).with(csrf()))

                //THEN
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(updatedMeeting));

        // VERIFY DATABASE
        Meeting updatedMeetingInDatabase = meetingRepo.findById(id).orElse(null);
        assertNotNull(updatedMeetingInDatabase);
        assertEquals("Hogwarts Bookworms", updatedMeetingInDatabase.getTitle());
        assertEquals(LocalDate.parse("2023-09-09"), updatedMeetingInDatabase.getDate());
        assertEquals("Room of Requirement", updatedMeetingInDatabase.getLocation());
        assertEquals("b001", updatedMeetingInDatabase.getBook().getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectNotFoundStatus_whenGetMeetingByIdWithNonexistentId() throws Exception {
        //GIVEN
        String nonExistentId = "non_existent_id";

        //WHEN & THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/meetings/" + nonExistentId))
                .andExpect(status().isNotFound());
    }
}
