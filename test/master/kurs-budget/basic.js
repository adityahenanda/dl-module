var options = {
    manager: require("../../../src/managers/garment-purchasing/garment-currency-manager"),
    model: require("dl-models").master.KursBudget,
    util: require("../../data-util/master/kurs-budget-data-util"),
    validator: require("dl-models").validator.master.kursBudget,
    createDuplicate: true,
    keys: ["code"]
};

var basicTest = require("./test");
basicTest(options);