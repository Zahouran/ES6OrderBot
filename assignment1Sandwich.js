const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHOICE:   Symbol("choice"),
    TYPE:   Symbol("type"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class SandwichOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sChoice = "";
        this.sType = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "sandwich";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CHOICE;
                aReturn.push("Welcome to Pierre's Sandwichery.");
                aReturn.push("Would you like a premade sandwich or custom?");
                aReturn.push("Enter premade or custom");
                break;
            case OrderState.CHOICE:
                this.stateCur = OrderState.TYPE
                if(sInput.toLowerCase() == "premade"){
                    this.sChoice = sInput;
                }
                if(sInput.toLowerCase() == "custom"){
                    this.sChoice = sInput;
                }
                aReturn.push("What type of bread would you like?");
                aReturn.push("Bagel, Baguette, Multigrain, Croissant");
                break;    
            case OrderState.TYPE:
                this.stateCur = OrderState.TOPPINGS
                this.sType = sInput;
                if(this.sChoice.toLowerCase() == "premade"){
                    aReturn.push("What sandwich would you like?");
                    aReturn.push("Scramble, BBQ, Teriyaki, Veggietable");
                }
                if(this.sChoice.toLowerCase() == "custom"){
                    aReturn.push("Pick up to 4 toppings:");
                    aReturn.push("Tomato, Spinach, Baked Tofu, Avocado, Pickled Onion, Roasted Garlic, Mushroom,");
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                aReturn.push("Orangina, SevenUp, DrPepper, water, none");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "none"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                if(this.sChoice.toLowerCase() == "premade"){
                    aReturn.push(`${this.sType} ${this.sToppings} ${this.sItem}`);
                }
                if(this.sChoice.toLowerCase() == "custom"){
                    aReturn.push(`${this.sType} ${this.sItem} with ${this.sToppings}`);
                }
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at our Restaurant on 50 William Street West Waterloo N1G 0E3 at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}