package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.OpenLibrarySearchResponse;
import de.neuefische.readandmeet.backend.model.SearchDoc;
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

    public List<String> fetchAndGenerateCoverUrls(String title, String author) {
        List<Integer> coverIds = fetchCoverIds(title, author);
        return generateCoverUrls(coverIds);
    }

    public List<Integer> fetchCoverIds(String title, String author) {
        ResponseEntity<OpenLibrarySearchResponse> responseEntity = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search.json")
                        .queryParam("q", title + " " + author)
                        .build())
                .retrieve()
                .toEntity(OpenLibrarySearchResponse.class)
                .block();

        List<Integer> coverIds = new ArrayList<>();
        OpenLibrarySearchResponse searchResponse = Objects.requireNonNull(responseEntity).getBody();

        if (searchResponse != null) {
            List<SearchDoc> docs = searchResponse.getDocs();
            for (SearchDoc doc : docs) {
                if (doc.getCoverId() != null) {
                    coverIds.add(doc.getCoverId());
                }
            }
        }

        return coverIds;
    }


    public List<String> generateCoverUrls(List<Integer> coverIds) {
        List<String> coverUrls = new ArrayList<>();

        for (Integer coverId : coverIds) {
            String coverUrl = String.format("https://covers.openlibrary.org/b/id/%d-M.jpg", coverId);
            coverUrls.add(coverUrl);
        }

        return coverUrls;
    }

}
