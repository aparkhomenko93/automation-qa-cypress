import invalidFirstNames from '../../fixtures/homePageRegistration/nameFieldNegative.json'
import invalidLastNames from '../../fixtures/homePageRegistration/lastNameFieldNegative.json'
import invalidEmails from '../../fixtures/homePageRegistration/emailFieldNegative.json'
import invalidPasswords from '../../fixtures/homePageRegistration/passwordFieldNegative.json'
import { faker } from '@faker-js/faker';

describe("Check Registration Form Validation", () => {

    //Check negative First Name cases
    for (const {input, expected, title} of invalidFirstNames) {
        it(title, () => {
            cy.visit("/");

            //Open Sign Up modal
            cy.get("div.hero-descriptor button.btn-primary").click();

            cy.get("app-signup-modal").within(() => {
                //Check Registration title
                cy.get("h4.modal-title").should("have.text", "Registration");

                cy.get("#signupName").type(input.firstName);
                cy.get("#signupName").blur();

                //Fill other fields with correct data
                cy.get("#signupLastName").type("White");
                cy.get("#signupEmail").type(faker.internet.email());
                cy.get("#signupPassword").type("Qwerty123");
                cy.get("#signupRepeatPassword").type("Qwerty123");

                //Check field validation
                cy.get("div.invalid-feedback p").should("have.text", expected.message);
                cy.get("#signupLastName").should("have.css", "border-color", "rgb(206, 212, 218)");
                cy.get("button.btn-primary").should("be.disabled");
            })
        });
    }

    it("Invalid First Name - empty field", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            cy.get("#signupName").focus();
            cy.get("#signupName").blur();

            //Fill other fields with correct data
            cy.get("#signupLastName").type("White");
            cy.get("#signupEmail").type(faker.internet.email());
            cy.get("#signupPassword").type("Qwerty123");
            cy.get("#signupRepeatPassword").type("Qwerty123");

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Name required");
            cy.get("#signupName").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    })

    //Check negative Last Name negative cases
    for (const {input, expected, title} of invalidLastNames) {
        it(title, () => {
            cy.visit("/");

            //Open Sign Up modal
            cy.get("div.hero-descriptor button.btn-primary").click();

            cy.get("app-signup-modal").within(() => {
                //Check Registration title
                cy.get("h4.modal-title").should("have.text", "Registration");

                cy.get("#signupLastName").type(input.lastName);
                cy.get("#signupLastName").blur();

                //Fill other fields with correct data
                cy.get("#signupName").type("Walter");
                cy.get("#signupEmail").type(faker.internet.email());
                cy.get("#signupPassword").type("Qwerty123");
                cy.get("#signupRepeatPassword").type("Qwerty123");

                //Check field validation
                cy.get("div.invalid-feedback p").should("have.text", expected.message);
                cy.get("#signupLastName").should("have.css", "border-color", "rgb(220, 53, 69)");
                cy.get("button.btn-primary").should("be.disabled");
            })
        })
    }

    it("Invalid Last Name - empty field", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            cy.get("#signupLastName").focus();
            cy.get("#signupLastName").blur();

            //Fill other fields with correct data
            cy.get("#signupName").type("Walter");
            cy.get("#signupEmail").type(faker.internet.email());
            cy.get("#signupPassword").type("Qwerty123");
            cy.get("#signupRepeatPassword").type("Qwerty123");

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Last name required");
            cy.get("#signupLastName").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    });


    //Check negative Email cases
    for (const {input, expected, title} of invalidEmails) {
        it(title, () => {
            cy.visit("/");

            //Open Sign Up modal
            cy.get("div.hero-descriptor button.btn-primary").click();

            cy.get("app-signup-modal").within(() => {
                //Check Registration title
                cy.get("h4.modal-title").should("have.text", "Registration");

                cy.get("#signupEmail").type(input.email);
                cy.get("#signupEmail").blur();

                //Fill other fields with correct data
                cy.get("#signupName").type("Walter");
                cy.get("#signupLastName").type("White");
                cy.get("#signupPassword").type("Qwerty123");
                cy.get("#signupRepeatPassword").type("Qwerty123");

                //Check field validation
                cy.get("div.invalid-feedback p").should("have.text", expected.message);
                cy.get("#signupEmail").should("have.css", "border-color", "rgb(220, 53, 69)");
                cy.get("button.btn-primary").should("be.disabled");
            })
        });
    }

    it("Invalid Email - empty field", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            cy.get("#signupEmail").focus();
            cy.get("#signupEmail").blur();

            //Fill other fields with correct data
            cy.get("#signupName").type("Walter");
            cy.get("#signupLastName").type("White");
            cy.get("#signupPassword").type("Qwerty123");
            cy.get("#signupRepeatPassword").type("Qwerty123");

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Email required");
            cy.get("#signupEmail").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    })

    //Check negative Email cases
    for (const {input, expected, title} of invalidPasswords) {
        it(title, () => {
            cy.visit("/");

            //Open Sign Up modal
            cy.get("div.hero-descriptor button.btn-primary").click();

            cy.get("app-signup-modal").within(() => {
                //Check Registration title
                cy.get("h4.modal-title").should("have.text", "Registration");

                cy.get("#signupPassword").type(input.password);
                cy.get("#signupPassword").blur();

                //Fill other fields with correct data
                cy.get("#signupName").type("Walter");
                cy.get("#signupLastName").type("White");
                cy.get("#signupEmail").type(faker.internet.email());
                cy.get("#signupRepeatPassword").type("Qwerty123");

                //Check field validation
                cy.get("div.invalid-feedback p").should("have.text", expected.message);
                cy.get("#signupPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
                cy.get("button.btn-primary").should("be.disabled");
            })
        });
    }


    it("Invalid Password - empty field", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            cy.get("#signupPassword").focus();
            cy.get("#signupPassword").blur();

            //Fill other fields with correct data
            cy.get("#signupName").type("Walter");
            cy.get("#signupLastName").type("White");
            cy.get("#signupEmail").type(faker.internet.email());
            cy.get("#signupRepeatPassword").type("Qwerty123");

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Password required");
            cy.get("#signupPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    })

    it("Invalid Re-Password - empty field", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            //Fill other fields with correct data
            cy.get("#signupName").type("Walter");
            cy.get("#signupLastName").type("White");
            cy.get("#signupEmail").type(faker.internet.email());
            cy.get("#signupPassword").type("Qwerty123");
            cy.get("#signupRepeatPassword").focus();
            cy.get("#signupRepeatPassword").blur();

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Re-enter password required");
            cy.get("#signupRepeatPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    })

    it("Invalid Password - incorrect repeated password", () => {
        cy.visit("/");

        //Open Sign Up modal
        cy.get("div.hero-descriptor button.btn-primary").click();

        cy.get("app-signup-modal").within(() => {
            //Check Registration title
            cy.get("h4.modal-title").should("have.text", "Registration");

            cy.get("#signupPassword").type("Qwerty123");
            cy.get("#signupRepeatPassword").type("Qwerty1234");
            cy.get("#signupRepeatPassword").blur();

            //Fill other fields with correct data
            cy.get("#signupName").type("Walter");
            cy.get("#signupLastName").type("White");
            cy.get("#signupEmail").type(faker.internet.email());

            //Check field validation
            cy.get("div.invalid-feedback p").should("have.text", "Passwords do not match");
            cy.get("#signupRepeatPassword").should("have.css", "border-color", "rgb(220, 53, 69)");
            cy.get("button.btn-primary").should("be.disabled");
        })
    })
})

describe("Check registration", () => {
    //Creation of test user
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: "Qwerty123" + faker.number.int({min: 1, max: 1000})
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
        cy.get("span.icon-logout").click();
    })


    it("Check user login", () => {
        cy.Login(user);
    })
})