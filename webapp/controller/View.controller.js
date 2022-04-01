sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("ipa.controller.View", {
            onInit: function () {

                // Set the initial form to be the display one
                this._formFragments = {};
			    this._showFormFragment("Display");
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
