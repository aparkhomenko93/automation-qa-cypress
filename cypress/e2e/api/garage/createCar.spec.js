import { faker } from '@faker-js/faker';


describe("Check response after adding a car", () => {
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


    it("Add new car and check response", () => {
        //Intercept create car request
        cy.intercept("POST", "/api/cars").as("createCarReq");

        //Get car brands
        cy.request("GET", "/api/cars/brands").then((brandsResponse) => {
            const brands = brandsResponse.body.data;

            //Get car models
            cy.request("GET", "/api/cars/models").then((modelsResponse) => {
                const models = modelsResponse.body.data;

                //Create new car
                cy.get("div.panel-page button.btn.btn-primary").click();
                cy.get("div.modal-content").within(() => {
                    cy.get("#addCarBrand").select(car.brand);
                    cy.get("#addCarModel").select(car.model);
                    cy.get("#addCarMileage").type(car.mileage.toString());
                    cy.get("button.btn-primary").click();
                });

                //Check that in response we have correct car data
                cy.wait("@createCarReq").then((interception) => {
                    const response = interception.response.body;

                    //Check brand of created car
                    const createdCarBrand = brands.find(b => b.title === car.brand);
                    expect(response.data.carBrandId).to.eq(createdCarBrand.id);

                    //Check model of created car
                    const createdCarModel = models.find(m => m.title === car.model && m.carBrandId === createdCarBrand.id);
                    expect(response.data.carModelId).to.eq(createdCarModel.id);

                    //Check mileage
                    expect(response.data.mileage).to.eq(car.mileage);
                });
            });
        });
    });
});

