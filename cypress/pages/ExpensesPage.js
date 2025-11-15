import { getToday } from '../support/helpers';

class ExpensesPage {
    addExpenseButton() {
        return cy.get('div.panel-page button.btn.btn-primary');
    }

    reportDateField() {
        return cy.get('#addExpenseDate');
    }

    mileageField() {
        return cy.get('#addExpenseMileage');
    }

    littersQtyField() {
        return cy.get('#addExpenseLiters');
    }

    costField() {
        return cy.get('#addExpenseTotalCost');
    }

    addButton() {
        return cy.get('div.modal-content button.btn.btn-primary');
    }

    addFuelExpense(car, expensesData) {
        this.addExpenseButton().click();
        cy.get('#addExpenseCar option:selected').should("have.text", car.brand + " " + car.model);
        this.reportDateField().should("have.value", getToday());
        this.mileageField()
            .clear()
            .type(car.mileage + 1);
        this.littersQtyField().type(expensesData.litersQty);
        this.costField().type(expensesData.cost);
        this.addButton().click();
    }

    checkExpensesCreated(car, expensesData) {
        cy.get('table.expenses_table tbody tr').last()
            .should('contain.text', getToday())
            .and('contain.text', (car.mileage + 1).toString())
            .and('contain.text', expensesData.litersQty.toString())
            .and('contain.text', expensesData.cost.toString());
    }
}

export const expensesPage = new ExpensesPage();
