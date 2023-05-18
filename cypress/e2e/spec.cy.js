describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://todo-jet-seven.vercel.app/')
    cy.get('input').should('be.visible');
  })
  // it('Does not do much!', () => {
  //   expect(true).to.equal(true)
  // })
  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
})
