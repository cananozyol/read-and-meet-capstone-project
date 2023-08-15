package de.neuefische.readandmeet.backend.model;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class OpenLibrarySearchResponseTest {

    @Test
    void testGetDocs() {

        //Given
        List<BookCoverDoc> expectedDocs = new ArrayList<>();
        BookCoverDoc doc1 = new BookCoverDoc();
        doc1.setCoverId(1);
        expectedDocs.add(doc1);
        BookCoverDoc doc2 = new BookCoverDoc();
        doc2.setCoverId(2);
        expectedDocs.add(doc2);

        OpenLibrarySearchResponse response = new OpenLibrarySearchResponse();
        response.setDocs(expectedDocs);

        //When
        List<BookCoverDoc> actualDocs = response.getDocs();

        //Then
        assertEquals(expectedDocs, actualDocs);
    }
}
