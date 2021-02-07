const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHOICE:   Symbol("choice"),
    TYPE:   Symbol("type"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    SIDES:  Symbol("side")
});

module.exports = class SandwichOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sChoice = "";
        this.sType = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sSides = "";
        this.sItem = "sandwich";
        this.sTotal = 0;
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
                if(sInput.toLowerCase() != "custom" || sInput.toLowerCase() != "premade"){
                    this.isDone(true);
                    aReturn.push("There was an error in your order, please try again.");
                }
                if(sInput.toLowerCase() == "premade"){
                    this.sChoice = sInput;
                    aReturn.push("What type of bread would you like?");
                    aReturn.push("Bagel, Baguette, Multigrain, Croissant");
                }
                if(sInput.toLowerCase() == "custom"){
                    this.sChoice = sInput;
                    aReturn.push("What type of bread would you like?");
                    aReturn.push("Bagel, Baguette, Multigrain, Croissant");
                }
                break;    
            case OrderState.TYPE:
                this.stateCur = OrderState.TOPPINGS
                this.sType = sInput;
                if(this.sChoice.toLowerCase() == "premade"){
                    aReturn.push("What sandwich would you like?");
                    aReturn.push("Scramble, BBQ, Teriyaki, Veggietable");
                    this.sTotal += 4;
                }
                if(this.sChoice.toLowerCase() == "custom"){
                    aReturn.push("Pick up to 4 toppings:");
                    aReturn.push("Tomato, Spinach, Baked Tofu, Avocado, Pickled Onion, Roasted Garlic, Mushroom,");
                    this.sTotal += 5;
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SIDES
                this.sToppings = sInput;
                aReturn.push("Whould you like a side with that? The soup of the day is Cauliflower Curry");
                aReturn.push("Fries, Onion Rings, Ceasar Salad, Soup of the Day, none");
                break;
            case OrderState.SIDES:  
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase() != "none"){
                    this.sSides = sInput;
                    this.sTotal += 3;
                }
                aReturn.push("What drink would you like with that?");
                aReturn.push("Orangina, SevenUp, DrPepper, water, none");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "none"){
                    this.sDrinks = sInput;
                    this.sTotal += 2;
                }
                aReturn.push("Thank-you for your order of");
                if(this.sChoice.toLowerCase() == "premade"){
                    aReturn.push(`The ${this.sToppings} ${this.sItem} in ${this.sType}`);
                }
                if(this.sChoice.toLowerCase() == "custom"){
                    aReturn.push(`${this.sType} ${this.sItem} with ${this.sToppings}`);
                }
                aReturn.push(`with ${this.sSides}`);
                if(this.sDrinks){
                    aReturn.push(`and with ${this.sDrinks}`);
                }
                aReturn.push(`This will cost $${this.sTotal}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at our Restaurant on 50 William Street West Waterloo N1G 0E3 at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}