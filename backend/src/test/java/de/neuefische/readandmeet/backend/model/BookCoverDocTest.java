package de.neuefische.readandmeet.backend.model;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BookCoverDocTest {

    @Test
    void testGetCoverId() {

        // Given
        BookCoverDoc bookCoverDoc = new BookCoverDoc();
        Integer expectedCoverId = 42;
        ReflectionTestUtils.setField(bookCoverDoc, "coverId", expectedCoverId);

        //When
        Integer actualCoverId = bookCoverDoc.getCoverId();

        //Then
        assertEquals(expectedCoverId, actualCoverId);
    }
}
