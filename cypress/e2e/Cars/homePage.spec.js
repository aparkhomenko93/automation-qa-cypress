describe('Check Home Page', () => {

    it('Check header buttons', () => {
        cy.visit('/');
        cy.get("div.header_inner.d-flex").within(() => {
            cy.get('a[href="/"]').should('have.text', 'Home');
            cy.get('button[appscrollto="aboutSection"]').should('have.text', 'About');
            cy.get('button[appscrollto="contactsSection"]').should('have.text', 'Contacts');
            cy.get('button.header-link.-guest').should('have.text', 'Guest log in');
            cy.get('button.header_signin').should('have.text', 'Sign In');
        });
    })

    it('Check footer buttons and links', () => {
        cy.visit('/');
        cy.get("div.section.contacts").within(() => {
            cy.get('a[href="https://www.facebook.com/Hillel.IT.School"]');
            cy.get('a[href="https://t.me/ithillel_kyiv"]');
            cy.get('a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]');
            cy.get('a[href="https://www.instagram.com/hillel_itschool/"]');
            cy.get('a[href="https://www.linkedin.com/school/ithillel/"]');
            cy.get('a[href="https://ithillel.ua"]');
            cy.get('a[href="mailto:developer@ithillel.ua"]');
        });
    })
})