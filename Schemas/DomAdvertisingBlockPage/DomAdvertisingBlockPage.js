define("DomAdvertisingBlockPage", ["ProcessModuleUtilities"], function (ProcessModuleUtilities) {
	return {
		entitySchemaName: "DomAdvertisingBlock",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "DomAdvertisingBlockFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "DomAdvertisingBlock"
				}
			},
			"DomSessionDetail": {
				"schemaName": "DomSessionDetail",
				"entitySchemaName": "DomSession",
				"filter": {
					"detailColumn": "DomAdvertisingBlock",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			/*
			  Бизнес-правило для фильтрации поля Ответственный 
			  для отображения только Контактов с типом "Сотрудник".
			*/
			"DomResponsible": {
				"c7b72954-d6bb-498f-8527-80cded420f9f": {
					"uId": "c7b72954-d6bb-498f-8527-80cded420f9f",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "60733efc-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			/*
				Функция, инициализирующая страницу
			*/
			init: function () {
				this.callParent(arguments);
				this.subscriptionFunction();
			},
			/*
				Функция для подписки на сообщения
			*/
			subscriptionFunction: function () {
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE,
					this.onProcessMessage, this);
			},

			/*
				Функция для отписки от сообщений
			*/
			onDestroy: function () {
				Terrasoft.ServerChannel.un(Terrasoft.EventName.ON_MESSAGE, this.onProcessMessage, this);
				this.callParent(arguments);
			},

			/*
				Функция обработки сообщений
			*/
			onProcessMessage: function (scope, message) {
				if (!message || message.Header.Sender !== "ReloadSessionDetail") {
					return;
				}
				else {
					this.reloadDomSessionDetail();
				}
			},

			/*
				Функция для обновления детали DomSessionDetail
			*/
			reloadDomSessionDetail: function () {
				this.updateDetail({ detail: "DomSessionDetail", reloadAll: true });
			},

			/*
				Функция, добавляющая действие DomAddSessionsByPeriod в действия страницы
			*/
			getActions: function () {
				let actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "onDomAddSessionsByPeriodClick",
					"Caption": { "bindTo": "Resources.Strings.DomAddSessionsByPeriodActionCaption" }
				}));

				return actionMenuItems;
			},

			/*
				Функция, реализующая действие DomAddSessionsByPeriod.
				По нажатию запускается процесс DomAddSessionsByPeriodProcess, 
				в который передается Id текущей записи.
			*/
			onDomAddSessionsByPeriodClick: function () {
				let currentRecordId = this.get("Id");
				let args = {
					sysProcessName: "DomAddSessionsByPeriodProcess",
                    parameters: {
						AdvertisingBlockId: currentRecordId
					}
				}

				ProcessModuleUtilities.executeProcess(args);
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "DomName",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "DomName"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DomCode",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "DomCode"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DomResponsible1cb094d5-b75d-4e8f-a946-1f34697eb8ba",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "DomResponsible"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "DomPeriodicity",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "DomPeriodicity",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "DomIsActive",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "DomIsActive"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DomCommentary",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "DomCommentary"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "DomSessionTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.DomSessionTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DomSessionDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "DomSessionTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "DomNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
