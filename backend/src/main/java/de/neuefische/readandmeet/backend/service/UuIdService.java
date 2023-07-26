package de.neuefische.readandmeet.backend.service;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@NoArgsConstructor
@Service

public class UuIdService {


    public String getRandomId(){
        return UUID.randomUUID().toString();
    }
}
