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
                //Databinding to the View by getting the ID from the Fields where the Entitysets are needed
                this.getView().byId("SimpleFormDisplayPerson354").bindElement("/Accounts('713')")
			    this.getView().byId("SimpleFormDisplayAddress354").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                this.getView().byId("inputPhone").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("inputMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
            },


//Edit and Save button for the Mail. And toggle of Mail Buttons and Fields
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
                        that.toggleButtonsMail(false);
                        that.toggleFieldsMail(false);
                    }
                });
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

//Edit and Save button for the Phonenumber. And toggle of Phonenumber Buttons and Fields
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
                        that.toggleButtonsPhone(false);
                        that.toggleFieldsPhone(false);
                    }
                });
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

//Edit and Save button for the Address. And toggle of Address Buttons and Fields
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
                        that.toggleButtonsAddress(false);
                        that.toggleFieldsAddress(false);
                    },
                    error: function(e) {
                        alert("error");
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

//Cancel button and toggle of buttons and fields when using the cancel button
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


//Vaildate the Input from the Mail Source:https://answers.sap.com/questions/11914737/email-validation-of-a-simple-form.html
            validateMail : function() {
                var email = this.getView().byId("inputMail").getValue();
                var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!mailregex.test(email)) {
                    alert(email + " is not a valid email address");
                    this.getView().byId("inputMail").setValueState(sap.ui.core.ValueState.Error);
                }
            },

//Validate the Input from the Phonenumber Sorurce:https://www.w3resource.com/javascript/form/phone-no-validation.php
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