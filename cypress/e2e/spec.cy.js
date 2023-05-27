describe('template spec', () => {
  it('passes', () => {
    // cy.visit('http://localhost:3001');
    cy.visit('https://todo-lhz126tu7-rekameszaros.vercel.app');
    // checking input - title

    // ***targeting by html element
    // cy.get('input').should('be.visible');
    // cy.get('input').type('some random text');

    //***Targeting by ClassName
    // cy.get('.css-1f1trk8').should('be.visible');
    // cy.get('.css-1f1trk8').type('some random text');

    addToDo('Before Login Title', 'Short description', 'completed');
    //''After login', 'longer description of task', 'completed''

    //Login Start
    //***Old version */
    // cy.get('button').contains('Login').click();
    // cy.get('input[placeholder="Email"]').type('abc@mail.com'); // Target the email input field and type a value
    // cy.get('input[placeholder="Password"]').type('27031998');
    // cy.get('footer button:contains("Login")').click();
    //***New Version */
    const userRegistered = true;
    //Create
    if (userRegistered === false) {
      let randomNumber = Math.floor(Math.random() * 900) + 100;
      cy.get('[data-testId="test-create-account"]').click();
      cy.get('[data-testId="test-input-email"]').type(
        `abc${randomNumber}@mail.com`
      ); // Target the email input field and type a value
      cy.get('[data-testId="test-password"]').type('abc123');
      cy.get('[data-testId="modal-create-user-button"]').click();
      //TODO - handle situation when the user with number already exists()
    }

    //Login
    if (userRegistered === true) {
      cy.get('[data-testId="test-normal-login"]').click();
      cy.get('[data-testId="test-input-email"]').type(
        `abc@mail.com`
      ); // Target the email input field and type a value
      cy.get('[data-testId="test-password"]').type('abc123');
      cy.get('[data-testId="modal-login-button"]').click();
    }
    //Login Ends

    cy.get('button').contains('Add').click();
    cy.get('[data-testId="testToggle"]').first().should('exist').click();

    //cy.get('[data-testId="testToggle"]') -> return array of toggles... it can be 0, 1, 2 ... n
    //.first() picks the first one
    //.should('exist') check if it exists (it should because we added it few lines above)
    //.click() -> click on the toggle element

    addToDo('After', 'longer description of task', 'pending');
    cy.get('button').contains('Add').click();
    cy.get('[data-testId="testToggle"]').first().should('exist').click();

    cy.wait(3000);
    cy.get('[data-testId="test-delete-task"]').first().should('exist').click();

    cy.wait(5000);
    cy.get('a').contains('Logout').click();
  });

  //Function - it is not invoked
  function addToDo(title, description, selectValue) {
    //*** targeting by custom data-[attribute]
    cy.get('[data-testId="test-input"]').clear();
    cy.get('[data-testId="test-input"]').should('be.visible');
    // // I put here wait because there are some re-render of components that causes that the title is cleared
    cy.wait(1000); // 1000 milliseconds -> 1 second
    cy.get('[data-testId="test-input"]').type(title);

    // checking text area - description
    cy.get('[data-testId="test-textArea"]').clear();
    cy.get('[data-testId="test-textArea"]').should('be.visible');
    cy.get('[data-testId="test-textArea"]').type(description);

    // Checking select
    cy.get('[data-testId="test-select"]').should('be.visible');
    const expectedValues = ['pending', 'completed']; // Expected values in the select

    cy.get('[data-testId="test-select"]').then((select) => {
      // select is equal to the targeted element( .get) -> cy.get('[data-testId="test-select"]')
      const selectValues = Array.from(select[0].options).map(
        // you need to use select[0] because cypress use jQuery under the hood and it always returns jQuery object which are Array like
        (option) => {
          // Then you get the options of the select and you iterate over them (map)
          //and return the values into selectValues
          return option.value;
        }
      );
      expect(selectValues).to.deep.equal(expectedValues); // Compare if the selectValues match the expectedValues -> if they are equal
    });

    // Select the option
    cy.get('[data-testId="test-select"]').select(selectValue);
    // Verify the selected value
    cy.get('[data-testId="test-select"]').should('have.value', selectValue);

    return;
  }
});