define("DomSessionDetail", ["ConfigurationGrid", 
    "ConfigurationGridGenerator", "ConfigurationGridUtilities"],
    function (ConfigurationGrid) {
        return {
            entitySchemaName: "DomSession",
            attributes: {
                "IsEditable": {
                    dataValueType: Terrasoft.DataValueType.BOOLEAN,
                    type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                    value: true
                }
            },
            diff: /**SCHEMA_DIFF*/[{
                "operation": "merge",
                "name": "DataGrid",
                "values": {
                    "className": "Terrasoft.ConfigurationGrid",
                    "generator": "ConfigurationGridGenerator.generatePartial",
                    "generateControlsConfig": {
                        "bindTo": "generateActiveRowControlsConfig"
                    },
                    "changeRow": {
                        "bindTo": "changeRow"
                    },
                    "unSelectRow": {
                        "bindTo": "unSelectRow"
                    },
                    "onGridClick": {
                        "bindTo": "onGridClick"
                    },
                    "activeRowActions": [
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "card",
                            "markerValue": "card",
                            "imageConfig": {
                                "bindTo": "Resources.Images.CardIcon"
                            }
                        },
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "save",
                            "markerValue": "save",
                            "imageConfig": {
                                "bindTo": "Resources.Images.SaveIcon"
                            }
                        },
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "cancel",
                            "markerValue": "cancel",
                            "imageConfig": {
                                "bindTo": "Resources.Images.CancelIcon"
                            }
                        },
                        {
                            "className": "Terrasoft.Button",
                            "style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
                            "tag": "remove",
                            "markerValue": "remove",
                            "imageConfig": {
                                "bindTo": "Resources.Images.RemoveIcon"
                            }
                        }
                    ],
                    "initActiveRowKeyMap": {
                        "bindTo": "initActiveRowKeyMap"
                    },
                    "activeRowAction": {
                        "bindTo": "onActiveRowAction"
                    },
                    "multiSelect": {
                        "bindTo": "MultiSelect"
                    }
                }
            }],
            /**SCHEMA_DIFF*/
            mixins: {
                ConfigurationGridUtilities: "Terrasoft.ConfigurationGridUtilities"
            },
            methods: {
                /*
                    Функция, отвечающая за действия кнопок на записи детали
                */
                onActiveRowAction: function (buttonTag, primaryColumnValue) {
                    this.set("LastActiveRow", primaryColumnValue);
                    switch (buttonTag) {
                        case "card":
                            this.editCurrentRecord();
                            break;
                        case "remove":
                            this.deleteRecords();
                            break;
                        case "cancel":
                            this.discardChanges(primaryColumnValue);
                            break;
                        case "save":
                            this.onActiveRowSave(primaryColumnValue);
                            break;
                        default:
                            break;
                    }
                }
            }
        };
    });