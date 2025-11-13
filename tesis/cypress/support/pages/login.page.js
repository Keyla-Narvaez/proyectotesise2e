class LoginPage{
    visit(){
        cy.visit('https://ibngjb-test.fa.ocs.oraclecloud.com')
    }

    fillUsername(username){
        cy.xpath(`//*[@id="userid"]`).type(username);
    }

    fillPassword(password){
        cy.xpath(`//*[@id="password"]`).type(password, {log:false});
    }

    submit(){
        cy.xpath(`//*[@id="btnActive"]`).click();
        cy.wait(1000)
    }

    goHome(){
        cy.get('#pt1\\:commandLink1').click();
    }  

    login(username, password){
    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
    this.goHome()
    
    }
}

module.exports = new LoginPage();
