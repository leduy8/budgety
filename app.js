//BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //Object to store all inc, exp items, all total inc, exp.
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      totalExpenses: 0,
      totalIncomes: 0
    }
  };

  return {
    addItem: function (type, des, val) {
      var newItem, id;

      //Create new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      //Create new item based on type
      if (type === "exp") {
        newItem = new Expense(id, des, val);
      } else if (type === "inc") {
        newItem = new Income(id, des, val);
      }

      //Push to data
      data.allItems[type].push(newItem);

      //Return the new element
      return newItem;
    },

    testing: function () {
      console.log(data);
    }
  }

})();

//UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getinput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will either be income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    var input, newItem;

    //1. Get the filed input data
    input = UICtrl.getinput();

    //2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //3. Add the item to the UI

    //4. Display the budget on the UI
  };

  return {
    init: function () {
      console.log("Application has started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
