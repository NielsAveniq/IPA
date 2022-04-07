sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("ipa.controller.View", {
            onInit: function () {},

            onAfterRendering: function () {
                //Databinding to the view by getting the ID from the fields where the entitysets are needed
                this.getView().byId("SimpleFormDisplayPerson354").bindElement("/Accounts('713')")
                this.getView().byId("SimpleFormDisplayAddress354").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                this.getView().byId("inputPhone").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("inputMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
            },

            /*
            //Buttons Cancel, Save and Edit
            */

            //Cancel Button opens a MessageBox and asks user wether or not they want to exit the editing.
            handleCancelPress: function () {
                var that = this;
                MessageBox.warning(this.getView().getModel("i18n").getResourceBundle().getText("CancelWarning"), {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == "OK") {
                            that._toggleButtons(false);
                            that._toggleFields(false);
                        } else {
                        }
                    }
                });
            },

            //Edit Button calls methods toggleFields and toggleButtons with the parameter true
            handleEditPress: function () {
                this._toggleFields(true);
                this._toggleButtons(true);
            },

            //Save Button calls the three methods to save the data and then the two toggle methods with the parameter false
            handleSavePress: async function (oEvent) {
                await this._saveMail();
                await this._savePhone();
                await this._saveAddress();
            },

            /*
            //Save Mail, Phone and Address
            */

            _saveMail: function () {
                return new Promise(function (resolve) {
                    var that = this;

                    var oNewMail = {};
                    oNewMail = {
                        Email: that.getView().byId("inputMail").getValue()
                    };

                    that.getView().getModel().update("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')", oNewMail, {
                        success: function (data) {
                            that._saveSuccess("SaveSuccessMail");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            that._saveError(oError);
                            resolve(false);
                        }.bind(this)
                    });
                }.bind(this));
            },

            _savePhone: function () {
                return new Promise(function (resolve) {
                    var that = this;

                    var oNewPhone = {};
                    oNewPhone = {
                        PhoneNo: that.getView().byId("inputPhone").getValue()
                    };

                    that.getView().getModel().update("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')", oNewPhone, {
                        success: function (data) {
                            that._saveSuccess("SaveSuccessPhone");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            that._saveError(oError);
                            resolve(false);
                        }.bind(this)

                    });
                }.bind(this));
            },

            _saveAddress: function () {
                return new Promise(function (resolve) {
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
                        success: function (data) {
                            that._saveSuccess("SaveSuccessAddress");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            that._saveError(oError);
                            resolve(false);
                        }.bind(this)

                    });
                }.bind(this));
            },

            /*
            //Toggle Buttons and Fields
            */

            //Depending on bEdit the buttons are enabled or disabled
            _toggleButtons: function (bEdit) {
                var oView = this.getView();
                oView.byId("edit").setEnabled(!bEdit);
                oView.byId("save").setEnabled(bEdit);
                oView.byId("cancel").setEnabled(bEdit);
            },

            //Depending on bEdit the fields are editable or not
            _toggleFields: function (bEdit) {
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

            /*
            //Error and success when saving
            */

            _saveError: function(oError){
                var message;
                message = JSON.parse(oError.responseText).error.message.value;
                MessageBox.error(message);
                this._toggleButtons(true);
                this._toggleFields(true);
            },

            _saveSuccess: function(textShown){
                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText(textShown));
                this._toggleButtons(false);
                this._toggleFields(false);
            },

            /*
            //Validate the Inputs in the Fields Mail and Phone
            */

            //Vaildate the Input from the Mail Source:https://answers.sap.com/questions/11914737/email-validation-of-a-simple-form.html
            validateMail: function () {
                var email = this.getView().byId("inputMail").getValue();
                var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!mailregex.test(email)) {
                    MessageBox.error(email + " " +this.getView().getModel("i18n").getResourceBundle().getText("ErrorMail"));
                    this.getView().byId("inputMail").setValueState(sap.ui.core.ValueState.Error);
                }
            },

            //Validate the Input from the Phonenumber Sorurce:https://www.w3resource.com/javascript/form/phone-no-validation.php
            validatePhone: function () {
                var phoneno = this.getView().byId("inputPhone").getValue();
                var phonenoregex = /^\d{10}$/;
                if (!phonenoregex.test(phoneno)) {
                    MessageBox.error(phoneno + " " + this.getView().getModel("i18n").getResourceBundle().getText("ErrorPhone"));
                    this.getView().byId("inputPhone").setValueState(sap.ui.core.ValueState.Error);
                }
            }
        });
    });