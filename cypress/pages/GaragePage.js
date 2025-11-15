class GaragePage {
    //Elements
    addCarButton() {
        return cy.get('div.panel-page button.btn.btn-primary');
    }

    brandSelect() {
        return cy.get('#addCarBrand');
    }

    modelSelect() {
        return cy.get('#addCarModel');
    }

    mileageInput() {
        return cy.get('#addCarMileage');
    }

    submitCar() {
        return cy.get('app-add-car-modal .btn.btn-primary');
    }

    //Actions
    addCar(car) {
        this.addCarButton().click();
        this.brandSelect().select(car.brand);
        this.modelSelect().select(car.model);
        this.mileageInput().type(car.mileage);
        this.submitCar().click();

        cy.get('ul.car-list li').contains(car.brand + " " + car.model).should('exist');
    }

    checkCarCreated(car){
        cy.get('ul.car-list li').contains(car.brand + " " + car.model).should('exist');
        cy.get('input.update-mileage-form_input').should('have.value', car.mileage);
    }
}

export const garagePage = new GaragePage();