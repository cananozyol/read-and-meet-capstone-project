package de.neuefische.readandmeet.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAnonymousUser_whenGetUserName() throws Exception {

        String expected = """
                {
                "id":"unknown",
                "username":"anonymousUser"
                }
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getUserObject_whenGetUserName() throws Exception {

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("username").value("anonymousUser"))
                .andExpect(MockMvcResultMatchers.jsonPath("id").value("unknown"));
    }

    @Test
    @WithMockUser(username = "booklover", password = "booklover123")
    void getUsername_whenLoggedInGetUserName() throws Exception {

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(csrf()))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("booklover"));
    }

    @Test
    @WithMockUser(username = "booklover", password = "booklover123")
    void expectStatusOk_whenLogoutUser() throws Exception {
        //GIVEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                .with(csrf()));

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout")
                        .with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void expectRegistration_whenRegisterUser() throws Exception {
        //GIVEN
        String testUserWithoutId = """
                    {
                        "username": "booklover",
                        "password": "Booklover123"
                    }
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(testUserWithoutId)
                        .with(csrf()))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("registered"));
    }



}
