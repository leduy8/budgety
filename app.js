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
      inc: [],
    },
    totals: {
      totalExpenses: 0,
      totalIncomes: 0,
    },
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
    },
  };
})();

//UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will either be income or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;

      //Create HTML strings with placeholder text

      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html =
          '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }

      //Replace the placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearField: function () {
      var fields, fieldsArr;

      //CSS Selector all of tags have class as mention, into a NodeList with 2 elements.
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      //Convert NodeList into array using slice method form array prototype
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((element) => {
        element.value = "";
      });

      //Focus back to input description field
      fieldsArr[0].focus();
    },
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

  var updateBudget = function () {
    //1. Calculate the budget
    //2. Return the budget
    //3. Display the budget on the UI
  };

  var ctrlAddItem = function () {
    var input, newItem;

    //1. Get the filed input data
    input = UICtrl.getInput();

    if (input.description !== "" && isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4. Clear input fields
      UICtrl.clearField();

      //5. Update and display on the UI
      updateBudget();
    }
  };

  return {
    init: function () {
      console.log("Application has started");
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.init();
