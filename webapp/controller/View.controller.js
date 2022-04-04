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
            onInit: function () {
                //Bind Data to View
			    this.getView().bindElement("/AccountAddresses(AccountID='713',AddressID='26505')");
                //this.getView().byId("nameText").bindElement("/Accounts('713')");
                
                // Set the initial form to be the display one
                this._formFragments = {};
			    this._showFormFragment("Display");
            },

            handleEditPress : function () {
                this._toggleButtonsAndView(true);
            },

            handleCancelPress : function () {
                var that = this;
                MessageBox.warning("Ihre Änderungen gehen verloren wollen Sie trotzdem weiterfahren?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if(sAction == "OK"){
                            that._toggleButtonsAndView(false);
                        }else{
                        }
                    }
                });
            },

            handleSavePress : function () {
                var that = this;
                var oEntry = {};
                oEntry.AddressInfo = {
                    City: that.getView().byId("inputCity").getValue(), 
                    PostalCode: that.getView().byId("inputPostalcode").getValue(), 
                    Street: that.getView().byId("inputStreet").getValue(), 
                    HouseNo: that.getView().byId("inputNr").getValue(), 
                    CountryID: that.getView().byId("inputCountryID").getValue(), 
                    Region: that.getView().byId("inputRegion").getSelectedKey(),
                    TimeZone: that.getView().byId("inputTimezone").getValue(), 
                    LanguageID: that.getView().byId("inputLang").getSelectedKey()
                };
                
                that.getView().getModel().update("/AccountAddresses(AccountID='713',AddressID='26505')", oEntry, {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                     alert("error");
                    }
                   });

                that._toggleButtonsAndView(false);
            },

            _toggleButtonsAndView : function (bEdit) {
                var oView = this.getView();
    
                // Show the appropriate action buttons
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);
    
                // Set the right form type
                this._showFormFragment(bEdit ? "Change" : "Display");
            },
            
            _getFormFragment: function (sFragmentName) {
                var pFormFragment = this._formFragments[sFragmentName],
                    oView = this.getView();
    
                if (!pFormFragment) {
                    pFormFragment = Fragment.load({
                        id: oView.getId(),
                        name: "ipa.view." + sFragmentName
                    });
                    this._formFragments[sFragmentName] = pFormFragment;
                }
    
                return pFormFragment;
            },

            _showFormFragment : function (sFragmentName) {
                var oPage = this.byId("page");
    
                oPage.removeAllContent();
                this._getFormFragment(sFragmentName).then(function(oVBox){
                    oPage.insertContent(oVBox);
                });
            }
        });
    });
