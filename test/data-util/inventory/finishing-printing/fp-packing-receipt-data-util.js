'use strict'
var helper = require("../../../helper");
var PackingReceiptManager = require("../../../../src/managers/inventory/finishing-printing/fp-packing-receipt-manager");
var PackingDataUtil = require('../../production/finishing-printing/packing-data-util');
var StorageDataUtil = require('../../master/storage-data-util');
var codeGenerator = require('../../../../src/utils/code-generator');

var Models = require("dl-models");
var Map = Models.map;
var PackingReceiptModel = Models.inventory.finishingPrinting.PackingReceipt;


class PackingReceiptDataUtil {
    getNewData() {
        return Promise.all([PackingDataUtil.getNewTestData(), StorageDataUtil.getPackingTestData()])
            .then(result => {
                var packing = result[0];

                var packingItems = packing.items.map((packingItem) => {
                    return {
                        product: `${packing.salesContractNo}/${packing.colorName}/${packing.construction}/${packingItem.lot}/${packingItem.grade}`,
                        quantity: packingItem.quantity,
                        remark: packingItem.remark,
                        notes: "TEST"
                    }
                })

                var data = {
                    code: codeGenerator(),
                    packingId: packing._id,
                    packingCode: packing.code,
                    date: new Date(),
                    accepted: true,
                    remark: "UT packing receipt",
                    items: packingItems
                };

                return data;
            })
    }

    getNewTestData() {
        return helper
            .getManager(PackingReceiptManager)
            .then((manager) => {
                return this.getNewData().then((data) => {
                    return manager.create(data)
                        .then((id) => {
                            return manager.getSingleById(id)
                        });
                });
            });
    }
}
module.exports = new PackingReceiptDataUtil();
