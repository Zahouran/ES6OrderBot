const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    TYPE:   Symbol("type"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class SandwichOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sType = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "sandwich";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.TYPE;
                aReturn.push("Welcome to Pierre's Sandwichery.");
                aReturn.push("What type of bread would you like?");
                aReturn.push("Bagel, Baguette, Multigrain, Croissant");
                break;
            case OrderState.TYPE:
                this.stateCur = OrderState.TOPPINGS
                this.sType = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}