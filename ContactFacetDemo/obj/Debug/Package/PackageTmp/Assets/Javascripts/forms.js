// This is the main forms.js file. It contains the events and validation methods that are available on all forms.
(function ($, demo, undefined) {
    var forms = demo.forms || (demo.forms = {});
    var me = {}; // for private members
    //#region Form Response Handlers

    forms.PremiumContentSuccess = function (formId, content, status, xhr) {
        /// <summary>called by the OnSuccess handler of the Premium Content - Unlock Access ajax form.</summary>
        if (content != null && content.success) {
            location.reload();
        }
    };

    forms.RegisterSuccess = function (formId, content, status, xhr) {
        if (content != null && content.success) {
                    
            //location.reload();
            location.href = "/demo";
        }
    };
    //#endregion


})(window.jQuery, window.demo || (window.demo = {}));
