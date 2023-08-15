package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.BookCoverDoc;
import de.neuefische.readandmeet.backend.model.BookCoverInfo;
import de.neuefische.readandmeet.backend.model.OpenLibrarySearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BookCoverService {

    private final WebClient webClient;

    public BookCoverService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://openlibrary.org").build();
    }

    public BookCoverInfo fetchFirstCoverInfo(String title, String author) {
        List<BookCoverInfo> coverInfos = fetchCoverInfos(title, author);
        if (!coverInfos.isEmpty()) {
            return coverInfos.get(0);
        }
        return null;
    }

    public List<BookCoverInfo> fetchCoverInfos(String title, String author) {
        ResponseEntity<OpenLibrarySearchResponse> responseEntity = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search.json")
                        .queryParam("q", title + " " + author)
                        .build())
                .retrieve()
                .toEntity(OpenLibrarySearchResponse.class)
                .block();

        List<BookCoverInfo> coverInfos = new ArrayList<>();
        OpenLibrarySearchResponse searchResponse = Objects.requireNonNull(responseEntity).getBody();

        if (searchResponse != null) {
            List<BookCoverDoc> docs = searchResponse.getDocs();
            for (BookCoverDoc doc : docs) {
                if (doc.getCoverId() != null) {
                    Integer coverId = doc.getCoverId();
                    String coverUrl = String.format("https://covers.openlibrary.org/b/id/%d-M.jpg", coverId);
                    coverInfos.add(new BookCoverInfo(coverId, coverUrl));
                }
            }
        }

        return coverInfos;
    }
}
