// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://todo-jet-seven.vercel.app/')
//     cy.get('input').should('be.visible');
//     cy.get('input').type('some text');
//   })
//   // it('Does not do much!', () => {
//   //   expect(true).to.equal(true)
//   // })
//   // it('Does not do much!', () => {
//   //   expect(true).to.equal(false)
//   // })
// })
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://todo-jet-seven.vercel.app/');
    // checking input
    cy.get('input').should('be.visible');
    cy.get('input').type('some random text');

    // checking text area
    cy.get('textarea').should('be.visible');
    cy.get('textarea').type(
      'Some random description, which is bit longer then title '
    );

    // Checking select
    cy.get('select').should('be.visible');
    const expectedValues = ['pending', 'completed']; // Expected values in the select

    cy.get('select').then((select) => {
      const selectValues = Array.from(select[0].options).map(
        (option) => option.value
      );
      expect(selectValues).to.deep.equal(expectedValues);
      //without deep -> if (selectValues === expectedValues) {}
    });

    // Select the option
    cy.get('select').select('completed');
    // Verify the selected value
    cy.get('select').should('have.value', 'completed');
    cy.get('button').contains('Login').click();
    // Target the email input field and type a value
    cy.get('input[placeholder="Email"]').type('dh.david.hejda@mail.com');
    cy.get('input[placeholder="Password"]').type('27031998');
    cy.get('footer button:contains("Login")').click();
    cy.get('button').contains('Add').click();

    // cy.get('a').contains('Logout').click();
  });

  // it('Does not do much!', () => {
  //   expect(true).to.equal(true)
  // })
  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
});
