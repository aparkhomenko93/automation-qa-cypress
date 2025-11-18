import { faker } from '@faker-js/faker';

describe("Add Expense to Car via API", () => {
    before(() => {
        //Test user
        const password = "Qwerty123" + faker.number.int({min: 1, max: 1000});
        const userData = {
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        }

        //Signup via API
        cy.api({
            method: 'POST',
            url: '/api/auth/signup',
            body: userData,
        }).its("status").should('equal',201);

        //Sign In via API
        cy.api({
            method: 'POST',
            url: '/api/auth/signin',
            body: {
                "email": userData.email,
                "password": userData.password,
                "remember": false
            },
        })
    })

    it("Create car and add expense via API", () => {
        //Get car brands
        cy.api({
            method: 'GET',
            url: '/api/cars/brands',
        })
            .its("body.data").as("carBrands");

        //Get car models
        cy.api({
            method: 'GET',
            url: '/api/cars/models',
        })
            .its("body.data").as("carModels");

        cy.get("@carBrands").then((carBrands) => {
            const brand = carBrands[1];

            cy.get("@carModels").then((models) => {
                const model = models.find(m => m.carBrandId === brand.id);

                const carRequestBody = {
                    carBrandId: brand.id,
                    carModelId: model.id,
                    mileage: faker.number.int({min: 1, max: 500000}),
                }

                cy.api({
                    method: 'POST',
                    url: '/api/cars',
                    body: carRequestBody,
                }).then((carResponse) => {
                    //check create car response
                    expect(carResponse.status).to.eq(201);
                    expect(carResponse.body.data.carBrandId).to.eq(carRequestBody.carBrandId);
                    expect(carResponse.body.data.carModelId).to.eq(carRequestBody.carModelId);
                    expect(carResponse.body.data.mileage).to.eq(carRequestBody.mileage);

                    //Save car id
                    const carId = carResponse.body.data.id;

                    //Expense body
                    const expenseRequestBody = {
                        "carId": carId,
                        "liters": faker.number.int({min: 1, max: 60}),
                        "mileage": carRequestBody.mileage + 1,
                        "reportedAt": new Date().toISOString(),
                        "totalCost": faker.number.int({min: 1, max: 1000})
                    }

                    //Request to add expense
                    cy.api({
                        method: 'POST',
                        url: '/api/expenses',
                        body: expenseRequestBody
                    }).then((response) => {

                        //Check add expense response
                        expect(response.status).to.eq(200);
                        expect(response.body.data.carId).to.eq(carId);
                        expect(response.body.data.liters).to.eq(expenseRequestBody.liters);
                        expect(response.body.data.reportedAt).to.eq(expenseRequestBody.reportedAt);
                        expect(response.body.data.totalCost).to.eq(expenseRequestBody.totalCost);
                    })
                });
            });
        });
    });
});