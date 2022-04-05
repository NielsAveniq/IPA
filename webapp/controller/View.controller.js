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
                this.getView().byId("SimpleFormDisplayPerson354").bindElement("/Accounts('713')")
			    this.getView().byId("SimpleFormDisplayAddress354").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                this.getView().byId("inputPhone").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("inputMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
            },


//////////////////////////////////////////////////////////////////////Mail
            handleEditMailPress : function () {
                this.toggleButtonsMail(true);
                this.toggleFieldsMail(true);
            },

            handleSaveMailPress : function () {
                var that = this;
                
                var oNewMail = {};
                oNewMail = {
                    Email: that.getView().byId("inputMail").getValue()

                };

                that.getView().getModel().update("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')", oNewMail, {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                        alert("error");
                    }
                });

                that.toggleButtonsMail(false);
                that.toggleFieldsMail(false);
            },

            toggleButtonsMail : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("editMail").setVisible(!bEdit);
                oView.byId("editPhone").setVisible(!bEdit);
                oView.byId("editAddress").setVisible(!bEdit);
                oView.byId("saveMail").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
            },

            toggleFieldsMail : function (bEdit){
                var oView = this.getView();
                oView.byId("inputMail").setEditable(bEdit);
                oView.byId("inputStdCommunication").setEditable(bEdit);
            },

//////////////////////////////////////////////////////////////////////Phone
            handleEditPhonePress : function () {
                this.toggleButtonsPhone(true);
                this.toggleFieldsPhone(true);
            },

            handleSavePhonePress : function () {
                var that = this;
                
                var oNewPhone = {};
                oNewPhone = {
                    PhoneNo: that.getView().byId("inputPhone").getValue()
                };
                
                that.getView().getModel().update("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')", oNewPhone, {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                        alert("error");
                    }
                });

                that.toggleButtonsPhone(false);
                that.toggleFieldsPhone(false);
            },

            toggleButtonsPhone : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("editMail").setVisible(!bEdit);
                oView.byId("editPhone").setVisible(!bEdit);
                oView.byId("editAddress").setVisible(!bEdit);
                oView.byId("savePhone").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
            },

            toggleFieldsPhone : function (bEdit){
                var oView = this.getView();
                oView.byId("inputPhone").setEditable(bEdit);
                oView.byId("inputStdCommunication").setEditable(bEdit);
            },

//////////////////////////////////////////////////////////////////////Address
            handleEditAddressPress : function () {
                this.toggleButtonsAddress(true);
                this.toggleFieldsAddress(true);
            },

            handleSaveAddressPress : function () {
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

                that.toggleButtonsAddress(false);
                that.toggleFieldsAddress(false);
            },

            handleCancelPress : function () {
                var that = this;
                MessageBox.warning("Ihre Änderungen gehen verloren wollen Sie trotzdem weiterfahren?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if(sAction == "OK"){
                            that.toggleButtons(false);
                            that.toggleFields(false);
                        }else{
                        }
                    }
                });
            },

            toggleButtonsAddress : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("editMail").setVisible(!bEdit);
                oView.byId("editPhone").setVisible(!bEdit);
                oView.byId("editAddress").setVisible(!bEdit);
                oView.byId("saveAddress").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
            },

            toggleFieldsAddress : function (bEdit){
                var oView = this.getView();
                oView.byId("inputCity").setEditable(bEdit);
                oView.byId("inputPostalcode").setEditable(bEdit);
                oView.byId("inputStreet").setEditable(bEdit);
                oView.byId("inputNr").setEditable(bEdit);
                oView.byId("inputRegion").setEditable(bEdit);
                oView.byId("inputLang").setEditable(bEdit);
            },

//////////////////////////////////////////////////////////////////////Toggle Buttons and Fields
            toggleButtons : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("editMail").setVisible(!bEdit);
                oView.byId("editPhone").setVisible(!bEdit);
                oView.byId("editAddress").setVisible(!bEdit);
                oView.byId("saveMail").setVisible(bEdit);
                oView.byId("savePhone").setVisible(bEdit);
                oView.byId("saveAddress").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
            },

            toggleFields : function (bEdit){
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
            },

///////////////////////////////////////////////////////////////////////////////////////////Vaildate Inputs
            validateMail : function() {
                var email = this.getView().byId("inputMail").getValue();
                var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!mailregex.test(email)) {
                    alert(email + " is not a valid email address");
                    this.getView().byId("inputMail").setValueState(sap.ui.core.ValueState.Error);
                }
            },

            validatePhone : function(){
                var phoneno = this.getView().byId("inputPhone").getValue();
                var phonenoregex = /^\d{10}$/;
                if(!phonenoregex.test(phoneno)){
                    alert(phoneno + " is not a valid phonenumber");
                    this.getView().byId("inputPhone").setValueState(sap.ui.core.ValueState.Error);
                }
            },

            /*validatePostalcode : function(){
                var postalcode = this.getView().byId("inputPostalcode").getValue();
                var postalcoderegex = /^\d{4}$/;
                if(!postalcoderegex.test(postalcode)){
                    alert(postalcode + " is not a valid postalcode");
                    this.getView().byId("inputPostalcode").setValueState(sap.ui.core.ValueState.Error);
                }
            }*/
        });
    });