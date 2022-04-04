sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
	"sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, MessageBox) {
        "use strict";

        return Controller.extend("ipa.controller.View", {
            onInit: function () {},

            onAfterRendering : function (){
                //Databinding to the View
                this.getView().byId("SimpleFormDisplayPerson354Neu").bindElement("/Accounts('713')")
			    this.getView().byId("SimpleFormDisplayAddress354Neu").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                this.getView().byId("inputPhone").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("inputMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
            },

            handleEditPress : function () {
                this._toggleButtonsAndView(true);
                this._toggleFields(true);
            },

            handleCancelPress : function () {
                var that = this;
                MessageBox.warning("Ihre Änderungen gehen verloren wollen Sie trotzdem weiterfahren?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if(sAction == "OK"){
                            that._toggleButtonsAndView(false);
                            that._toggleFields(false);
                        }else{
                        }
                    }
                });
            },

            handleSavePress : function () {
                var that = this;

                var oEntryAddress = {};
                oEntryAddress.AddressInfo = {
                    City: that.getView().byId("inputCity").getValue(), 
                    PostalCode: that.getView().byId("inputPostalcode").getValue(), 
                    Street: that.getView().byId("inputStreet").getValue(), 
                    HouseNo: that.getView().byId("inputNr").getValue(), 
                    CountryID: that.getView().byId("inputCountryID").getValue(), 
                    Region: that.getView().byId("inputRegion").getSelectedKey(),
                    TimeZone: that.getView().byId("inputTimezone").getValue(), 
                    LanguageID: that.getView().byId("inputLang").getSelectedKey()
                };
                
                that.getView().getModel().update("/AccountAddresses(AccountID='713',AddressID='26505')", oEntryAddress, {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                     alert("error");
                    }
                   });

                that._toggleButtonsAndView(false);
                that._toggleFields(false);
            },

            _toggleButtonsAndView : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
            },

            _toggleFields : function (bEdit){
                var oView = this.getView();
                oView.byId("inputMail").setEditable(bEdit);
                oView.byId("inputPhone").setEditable(bEdit);
                oView.byId("inputStdCommunication").setEditable(bEdit);
                oView.byId("inputCity").setEditable(bEdit);
                oView.byId("inputPostalcode").setEditable(bEdit);
                oView.byId("inputStreet").setEditable(bEdit);
                oView.byId("inputNr").setEditable(bEdit);
                oView.byId("inputRegion").setEditable(bEdit);
                oView.byId("inputLang").setEditable(bEdit);
            }
        });
    });
