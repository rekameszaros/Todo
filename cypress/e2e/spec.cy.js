describe('template spec', () => {
  it('passes', () => {
    // cy.visit('http://localhost:3001');
    cy.visit('https://todo-git-main-rekameszaros.vercel.app/');
     
    cy.get('button').contains('Add').should('be.disabled');
    

    //Login/Create
    const isUserRegistered = true;
    //Create
    if (!isUserRegistered) {
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
    if (isUserRegistered) {
      cy.get('[data-testId="test-normal-login"]').click();
      cy.get('[data-testId="test-input-email"]').type(
        `abc@mail.com`
      ); // Target the email input field and type a value
      cy.get('[data-testId="test-password"]').type('abc123');
      cy.get('[data-testId="modal-login-button"]').click();
    }

    cy.wait(3000);
    //Login Ends

    //cy.get('[data-testId="testToggle"]') -> return array of toggles... it can be 0, 1, 2 ... n
    //.first() picks the first one
    //.should('exist') check if it exists (it should because we added it few lines above)
    //.click() -> click on the toggle element

    addToDo('First Task', 'Short description', 'completed');
    addToDo('Second Task', 'Longer description of task', 'pending');

    //Delete task
    cy.get('[data-testId="test-delete-task"]').first().should('exist').click();
    //Log user out
    cy.wait(3000);
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
    cy.wait(3000);
    cy.get('button').contains('Add').click();
    cy.wait(3000);  
    cy.get('[data-testId="testToggle"]').first().should('exist').click();
    cy.wait(3000);
    return;
  }
});