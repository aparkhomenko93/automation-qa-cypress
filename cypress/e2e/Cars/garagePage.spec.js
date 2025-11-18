import { garagePage } from "../../pages/GaragePage";
import { faker } from '@faker-js/faker';


describe.only("Check adding car to garage", () => {
    //Test user
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "Qwerty123" + faker.number.int({min: 1, max: 1000})
    }

    //Test car
    const car = {
        brand: "Porsche",
        model: "911",
        mileage: faker.number.int({min: 1000, max: 200000})
    }

    before(() => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        //New user registration
        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            //Fill other fields with correct data
            cy.get("#signupName").type(user.firstName);
            cy.get("#signupLastName").type(user.lastName);
            cy.get("#signupEmail").type(user.email);
            cy.get("#signupPassword").type(user.password, {sensitive: true});
            cy.get("#signupRepeatPassword").type(user.password, {sensitive: true});
            cy.get("button.btn-primary").click();
        })

        //Check user logged in
        cy.get("div.panel-page_cars p").should("have.text", "You don’t have any cars in your garage")
    })


    it("Add new car", () => {
        garagePage.addCar(car);
        garagePage.checkCarCreated(car);
    })
})

