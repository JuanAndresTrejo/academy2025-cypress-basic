import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import {loginPage} from '@pages/LoginPage-Example'

Given("A web browser is at the saucelabs login page", () => {
    cy.visit("/");
});

When("A user enters the username {string}, the password {string}, and clicks on the login button", (username,password) => {
    loginPage.submitLogin(username,password)
});

When("A user provides incorrect credentials, and clicks on the login button", (table) => {
    table.hashes().forEach((row) => {
        cy.log(row.username);
        cy.log(row.password);
        loginPage.submitLogin(row.username, row.password)
    });
});

Then("the url will contains the inventorAnd subdirectory", () => {
    cy.url().should("contains", "/inventory.html");
});

Then("The error message {string} is displayed", (errorMessage) => {
    loginPage.elements.errorMessage().should("have.text", errorMessage);
});
