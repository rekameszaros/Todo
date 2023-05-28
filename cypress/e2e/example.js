// import React from 'react';
// import { mount } from 'cypress-react-unit-test';
// import Footer from '../components/Footer';


// Unit/component testing



// describe('Footer Component', () => {
//   it('displays the correct footer text', () => {
//     mount(<Footer />);
//     cy.contains('© 2023 Your Company. All rights reserved.').should('be.visible');
//   });

//   it('contains a link to the privacy policy', () => {
//     mount(<Footer />);
//     cy.contains('Privacy Policy').should('have.attr', 'href', '/privacy-policy');
//   });
// });

// Most basic Cypress commands and methods:

// cy.visit(url): Loads a webpage at the specified URL.
// cy.get(selector): Finds and returns DOM elements that match the given CSS selector.
// cy.contains(text): Finds and returns DOM elements that contain the specified text.
// cy.click(): Triggers a click event on the selected DOM element.
// cy.type(text): Simulates typing text into the currently focused input field.
// cy.should('be.visible'): Asserts that the selected element is visible.
// cy.should('have.text', text): Asserts that the selected element has the specified text content.
// cy.should('have.attr', attribute, value): Asserts that the selected element has the specified attribute with the given value.
// cy.wait(milliseconds): Pauses the test execution for the specified number of milliseconds.
// cy.contains(text).click(): Finds an element containing the specified text and triggers a click event on it.
// cy.get(selector).type(text): Finds an input field using the selector and simulates typing the specified text into it.


// E2E Original code

// describe('template spec', () => {
//     it('passes', () => {
//       cy.visit('http://localhost:3000');
//       // checking input - title
  
//       // ***targeting by html element
//       // cy.get('input').should('be.visible');
//       // cy.get('input').type('some random text');
  
//       //***Targeting by ClassName
//       // cy.get('.css-1f1trk8').should('be.visible');
//       // cy.get('.css-1f1trk8').type('some random text');
  
//       //*** targeting by custom data-[attribute]
//       cy.get('[data-testId="test-input"]').clear();
//       cy.get('[data-testId="test-input"]').should('be.visible');
//       cy.get('[data-testId="test-input"]').type('Some random Title');
  
//       // checking text area - description
//       cy.get('[data-testId="test-textArea"]').clear();
//       cy.get('[data-testId="test-textArea"]').should('be.visible');
//       cy.get('[data-testId="test-textArea"]').type(
//         'Some longer description of task'
//       );
  
//       // Checking select
//       cy.get('[data-testId="test-select"]').should('be.visible');
//       const expectedValues = ['pending', 'completed']; // Expected values in the select
  
//       cy.get('[data-testId="test-select"]').then((select) => {
//         // select is equal to the targeted element( .get) -> cy.get('[data-testId="test-select"]')
//         const selectValues = Array.from(select[0].options).map(
//           // you need to use select[0] because cypress use jQuery under the hood and it always returns jQuery object which are Array like
//           (option) => {
//             // Then you get the options of the select and you iterate over them (map)
//             //and return the values into selectValues
//             return option.value;
//           }
//         );
//         expect(selectValues).to.deep.equal(expectedValues); // Compare if the selectValues match the expectedValues -> if they are equal
//       });
  
//       // Select the option
//       cy.get('[data-testId="test-select"]').select('pending');
//       // Verify the selected value
//       cy.get('[data-testId="test-select"]').should('have.value', 'pending');
  
//       //Login Start
//       //***Old version */
//       // cy.get('button').contains('Login').click();
//       // cy.get('input[placeholder="Email"]').type('dh.david.hejda@mail.com'); // Target the email input field and type a value
//       // cy.get('input[placeholder="Password"]').type('27031998');
//       // cy.get('footer button:contains("Login")').click();
//       //***New Version */
//       const userRegistered = true;
//       //Create
//       if (userRegistered === false) {
//         let randomNumber = Math.floor(Math.random() * 900) + 100;
//         cy.get('[data-testId="test-create-account"]').click();
//         cy.get('[data-testId="test-input-email"]').type(
//           `dh.david.hejda${randomNumber}@mail.com`
//         ); // Target the email input field and type a value
//         cy.get('[data-testId="test-password"]').type('27031998');
//         cy.get('[data-testId="modal-create-user-button"]').click();
//         //TODO - handle situation when the user with number already exists()
//       }
  
//       //Login
//       if (userRegistered === true) {
//         cy.get('[data-testId="test-normal-login"]').click();
//         cy.get('[data-testId="test-input-email"]').type(
//           `dh.david.hejda@mail.com`
//         ); // Target the email input field and type a value
//         cy.get('[data-testId="test-password"]').type('27031998');
//         cy.get('[data-testId="modal-login-button"]').click();
//       }
//       //Login Ends
//       cy.get('button').contains('Add').click();
//       cy.get('[data-testId="testToggle"]').first().should('exist').click();
//       //   cy.get('[data-testId="testToggle"]') //-> return array of toggles... it can be 0, 1, 2 ... n
//       //   .first() //picks the first one
//       //   .should('exist') // check if it exists (it should because we added it few lines above)
//       //   .click()// -> click on the toggle element
  
//       // cy.get('a').contains('Logout').click();
//     });

//   });