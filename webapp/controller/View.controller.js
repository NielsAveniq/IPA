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
            onInit: function () { },

            onAfterRendering: function () {
                //Databinding to the view by getting the ID from the fields where the entitysets are needed
                this.getView().byId("SimpleFormDisplayPerson354").bindElement("/Accounts('713')")
                this.getView().byId("SimpleFormDisplayAddress354").bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                this.getView().byId("inputPhone").bindElement("/AccountAddressDependentPhones(AccountID='713',AddressID='26505',SequenceNo='001')");
                this.getView().byId("inputMail").bindElement("/AccountAddressDependentEmails(AccountID='713',AddressID='26505',SequenceNo='001')");
            },

            /*
            //
            //Buttons Cancel, Save and Edit
            //
            */

            //Cancel Button
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

            //Save Button
            handleSavePress: async function (oEvent) {
                await this._saveMail();
                await this._savePhone();
                await this._saveAddress();
                this._toggleButtons(false);
                this._toggleFields(false);
            },

            //Edit Button
            handleEditPress: function () {
                this._toggleFields(true);
                this._toggleButtons(true);
            },

            /*
            //
            //Save Mail, Phone and Address
            //
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
                            alert("success");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            //handled by ErrorHandler.js
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
                            alert("success");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            //handled by ErrorHandler.js
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
                            alert("success");
                            resolve(true);
                        }.bind(this),
                        error: function (oError) {
                            //handled by ErrorHandler.js
                            resolve(false);
                        }.bind(this)

                    });
                }.bind(this));
            },

            /*
            //
            //Toggle Buttons and Fields
            //
            */

            _toggleButtons: function (bEdit) {
                var oView = this.getView();
                oView.byId("edit").setEnabled(!bEdit);
                oView.byId("save").setEnabled(bEdit);
                oView.byId("cancel").setEnabled(bEdit);
            },

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
            //
            //Validate the Inputs in the Fields Mail and Phone
            //
            */

            //Vaildate the Input from the Mail Source:https://answers.sap.com/questions/11914737/email-validation-of-a-simple-form.html
            validateMail: function () {
                var email = this.getView().byId("inputMail").getValue();
                var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
                if (!mailregex.test(email)) {
                    alert(email + " is not a valid email address");
                    this.getView().byId("inputMail").setValueState(sap.ui.core.ValueState.Error);
                }
            },

            //Validate the Input from the Phonenumber Sorurce:https://www.w3resource.com/javascript/form/phone-no-validation.php
            validatePhone: function () {
                var phoneno = this.getView().byId("inputPhone").getValue();
                var phonenoregex = /^\d{10}$/;
                if (!phonenoregex.test(phoneno)) {
                    alert(phoneno + " is not a valid phonenumber");
                    this.getView().byId("inputPhone").setValueState(sap.ui.core.ValueState.Error);
                }
            }
        });
    });