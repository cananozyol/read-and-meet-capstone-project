package de.neuefische.readandmeet.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.readandmeet.backend.model.BookCoverDoc;
import de.neuefische.readandmeet.backend.model.OpenLibrarySearchResponse;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
@AutoConfigureMockMvc
class BookCoverControllerTest {

    @Autowired
    private MockMvc mockMvc;

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

    @Test
    void expectCoverInfo_whenFetchFirstCoverInfo() throws Exception {
        List<BookCoverDoc> bookCoverDocs = new ArrayList<>();
        BookCoverDoc coverDoc = new BookCoverDoc();
        coverDoc.setCoverId(1234567);
        bookCoverDocs.add(coverDoc);

        OpenLibrarySearchResponse searchResponse = new OpenLibrarySearchResponse();
        searchResponse.setDocs(bookCoverDocs);

        ObjectMapper objectMapper = new ObjectMapper();
        String responseJson = objectMapper.writeValueAsString(searchResponse);

        mockWebServer.enqueue(new MockResponse()
                .setHeader("Content-Type", "application/json")
                .setBody(responseJson));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/bookcover")
                        .param("title", "Test Title")
                        .param("author", "Test Author"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.coverId").value(1234567))
                .andExpect(MockMvcResultMatchers.jsonPath("$.coverUrl").value("https://covers.openlibrary.org/b/id/1234567-M.jpg"));
    }

    @AfterAll
    static void afterAll() throws IOException {
        mockWebServer.shutdown();
    }
}