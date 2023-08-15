package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.BookCoverInfo;
import de.neuefische.readandmeet.backend.service.BookCoverService;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;


@SpringBootTest
@AutoConfigureMockMvc
class BookCoverControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookCoverService bookCoverService;

    private static MockWebServer mockWebServer;


    @BeforeAll
    static void beforeAll() throws Exception {
        mockWebServer = new MockWebServer();
        mockWebServer.start();
    }

    @DynamicPropertySource
    static void backendProperties(DynamicPropertyRegistry registry) {
        registry.add("bookcover-api.url", () -> mockWebServer.url("/").toString());
    }

    @AfterAll
    static void afterAll() throws IOException {
        mockWebServer.shutdown();
    }

    @Test
    void expectCoverInfo_whenFetchFirstCoverInfo() throws Exception {

        when(bookCoverService.fetchFirstCoverInfo(anyString(), anyString()))
                .thenReturn(new BookCoverInfo(1234567, "https://covers.openlibrary.org/b/id/1234567-M.jpg"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookcover")
                        .param("title", "Test Title")
                        .param("author", "Test Author"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.coverId").value(1234567))
                .andExpect(MockMvcResultMatchers.jsonPath("$.coverUrl").value("https://covers.openlibrary.org/b/id/1234567-M.jpg"));


        String response = """
                        {
                              "coverId": 1234567,
                              "coverUrl": "https://covers.openlibrary.org/b/id/1234567-M.jpg"
                          }
                """;


        mockWebServer.enqueue(new MockResponse()
                .setHeader("Content-Type", "application/json")
                .setBody(response));

    }
}