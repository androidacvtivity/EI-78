(function ($) {
    Drupal.behaviors.ei78 = {
        attach: function (context, settings) {
            jQuery('table').on('keypress', 'input.float, input.numeric', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
        }
    }

    webform.validators.ei78 = function (v, allowOverpass) {
        var values = Drupal.settings.mywebform.values;
        var getMonth = parseInt(jQuery('#TRIM').val());


            // Call the separate function for 44-0030 validation
    const importValidationError = validateDuplicateImportCodes(values);

    // Add error to webform.errors if validation fails
    if (importValidationError) {
        webform.errors.push(importValidationError);
    }

        var servicii = 0;
        var tari = 0;
        var matchFoundExport = false;
        var matchFoundImport = false;
        var serviciiListCountryExport = [];
        var serviciiListCountryImport = [];
        for (var i = 0; i < values.CAP1_R_CI.length; i++) {
            serviciiListCountryExport[i] = values.CAP1_R_C31[i] + '_' + values.CAP1_R_C33[i]; //values.CAP1_R_C31[i].concat(values.CAP1_R_C3[i]);
        }
        for (var i = 0; i < values.CAP2_R_CI.length; i++) {
            serviciiListCountryImport[i] = values.CAP2_R_C31[i] + '_' + values.CAP2_R_C33[i]; //values.CAP1_R_C31[i].concat(values.CAP1_R_C3[i]);
        }

        serviciiListCountryExport.sort();
        for (var i = 0; i < serviciiListCountryExport.length; i++) {
            //for (var j = 0; j < values.CAP1_R_C33.length; j++) {
            if (serviciiListCountryExport[i + 1] == serviciiListCountryExport[i]) {
                matchFoundExport = true;
            }
        }

        serviciiListCountryImport.sort();
        for (var i = 0; i < serviciiListCountryImport.length; i++) {
            //for (var j = 0; j < values.CAP1_R_C33.length; j++) {
            if (serviciiListCountryImport[i + 1] == serviciiListCountryImport[i]) {
                matchFoundImport = true;
            }
        }

        if (matchFoundExport == true) {
            webform.errors.push({
                'fieldName': 'CAP1_R_CA',
                'msg': Drupal.t('Cod eroare: 44-0023, Cap. Export. Codul CSPM Rev.2  si codul  CITLT se repeta.')
            });
        }

        // if (matchFoundImport == true) {
            
        //     webform.errors.push({
        //         'fieldName': 'CAP2_R_CA',
        //         'msg': Drupal.t('Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2  si codul  CITLT se repeta.')
        //     });
        // }

        // if (matchFoundImport == true) {
        //     // Find the duplicate items in serviciiListCountryImport
        //     let duplicateImports = serviciiListCountryImport.filter((item, index, array) =>
        //         array.indexOf(item) !== index && array.lastIndexOf(item) === index
        //     );

        //     webform.errors.push({
        //         'fieldName': 'CAP2_R_CA',
        //         'msg': Drupal.t(
        //             'Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ' + duplicateImports.join(', ')
        //         )
        //     });
        // }


        var cspmExportArr = ['49.39.11', '49.39.12', '49.39.13', '49.31.2', '49.39.32', '49.39.33', '49.39.34', '49.39.39', '49.32.11', '79'],
            cspmImportArr = ['49.39.11', '49.39.12', '49.39.13', '49.31.2', '49.39.32', '49.39.33', '49.39.34', '49.39.39', '49.32.11', '79'];

        for (var i = 0; i < values.CAP1_R_C31.length; i++) {
            var findServiciu = false;
            if (jQuery.inArray(values.CAP1_R_C31[i], cspmExportArr) != -1) {
                for (var j = 0; j < values.CAP2_R_C31.length; j++) {
                    if ((values.CAP1_R_C31[i] == values.CAP2_R_C31[j]) && (values.CAP1_R_C33[i] == values.CAP2_R_C33[j])) {
                        findServiciu = true;
                    }
                }
                if (findServiciu == false) {
                    webform.warnings.push({
                        'fieldName': 'CAP1_R_C31',
                        'msg': Drupal.t('Cod eroare: 44-0031, Daca există CSPM Rev.2 (' + values.CAP1_R_C31[i] + ') in Export  atunci există CS AEE (' + values.CAP1_R_C31[i] + ') Import.')
                    });
                }
            }
        }

        for (var i = 0; i < values.CAP2_R_C31.length; i++) {
            var findServiciu = false;
            if (jQuery.inArray(values.CAP2_R_C31[i], cspmImportArr) != -1) {
                for (var j = 0; j < values.CAP1_R_C31.length; j++) {
                    if ((values.CAP2_R_C31[i] == values.CAP1_R_C31[j]) && (values.CAP2_R_C33[i] == values.CAP1_R_C33[j])) {
                        findServiciu = true;
                    }
                }
                if (findServiciu == false) {
                    webform.warnings.push({
                        'fieldName': 'CAP2_R_C31',
                        'msg': Drupal.t('Cod eroare: 44-0031, Daca există CSPM Rev.2 (' + values.CAP2_R_C31[i] + ') in Import  atunci există CSPM Rev.2 (' + values.CAP2_R_C31[i] + ') Export.')
                    });
                }
            }
        }


        var cspmExportArr033 = ['49.41.1', '49.42.1'],
            cspmImportArr033 = ['55.1', '55.2', '55.3', '55.9', '52.21.24', '52.21.21', '52.21.22', '52.21.23', '52.21.24', '52.21.25', '52.21.29', '52.21.29', '52.29.2', '56.1', '56.2', '56.29.19', '61.20.11', '74.90.11'];
        for (var i = 0; i < values.CAP1_R_C31.length; i++) {
            var findServiciu033 = false;
            if (jQuery.inArray(values.CAP1_R_C31[i], cspmExportArr033) != -1) {
                for (var j = 0; j < values.CAP2_R_C31.length; j++) {
                    if (jQuery.inArray(values.CAP2_R_C31[j], cspmImportArr033) != -1) {
                        findServiciu033 = true;
                    }
                }
                if (findServiciu033 == false) {
                    webform.warnings.push({
                        'fieldName': 'CAP1_R_C31',
                        'msg': Drupal.t('Cod eroare: 44-0033, Daca există CSPM Rev.2 (' + values.CAP1_R_C31[i] + ') in Export  atunci există unul din codurile CSPM Rev.2 (' + cspmImportArr033 + ') Import.')
                    });
                }
            }
        }

        var cspmExportArr034 = ['79'],
            cspmImportArr034 = ['79'];
        for (var i = 0; i < values.CAP1_R_C31.length; i++) {
            var findServiciu034 = false;
            if (jQuery.inArray(values.CAP1_R_C31[i], cspmExportArr034) != -1) {
                for (var j = 0; j < values.CAP2_R_C31.length; j++) {
                    if (jQuery.inArray(values.CAP2_R_C31[j], cspmImportArr034) != -1) {
                        findServiciu034 = true;
                    }
                }
                if (findServiciu034 == false) {
                    webform.warnings.push({
                        'fieldName': 'CAP1_R_C31',
                        'msg': Drupal.t('Cod eroare: 44-0034, Daca există CSPM Rev.2 (' + values.CAP1_R_C31[i] + ') in Export  atunci există unul din codurile CSPM Rev.2 (' + cspmImportArr034 + ') Import.')
                    });
                }
            }
        }

        var cspmExportArr035 = ['56.30.10', '52.21.30', '49.50.12'];
        var cspmImportArr035 = ['56.30.10', '52.21.30', '49.50.12'];
        for (var i = 0; i < values.CAP1_R_C31.length; i++) {
            if (jQuery.inArray(values.CAP1_R_C31[i], cspmExportArr035) != -1) {
                webform.warnings.push({
                    'fieldName': 'CAP1_R_C31',
                    'msg': Drupal.t('Cod eroare: 44-0035, Sunteti siguri ca există CSPM Rev.2 (' + values.CAP1_R_C31[i] + ') la Export ')
                });
            }
        }
        for (var i = 0; i < values.CAP2_R_C31.length; i++) {
            if (jQuery.inArray(values.CAP2_R_C31[i], cspmImportArr035) != -1) {
                webform.warnings.push({
                    'fieldName': 'CAP1_R_C31',
                    'msg': Drupal.t('Cod eroare: 44-0035, Sunteti siguri ca există CSPM Rev.2 (' + values.CAP2_R_C31[i] + ') la Import ')
                });
            }
        }

        var cspmExportArr036 = ['52.21.21', '52.21.22', '52.21.23', '52.21.24', '52.21.25', '50.10.1', '50.20.1', '50.21.2', '50.20.21', '50.20.22', '50.30.11', '50.30.13', '50.30.19',
            '50.40.1', '50.30.20', '50.40.2', '51.10.11', '51.10.12', '51.10.13', '51.10.14', '51.10.15', '51.10.2', '51.21.1', '74.90.11'];
        for (var i = 0; i < values.CAP1_R_C31.length; i++) {
            if (jQuery.inArray(values.CAP1_R_C31[i], cspmExportArr036) != -1) {
                webform.warnings.push({
                    'fieldName': 'CAP1_R_C31',
                    'msg': Drupal.t('Cod eroare: 44-0036, Sunteti siguri ca există CSPM Rev.2 (' + values.CAP1_R_C31[i] + ') la Export ')
                });
            }
        }


        for (i = 0; i < values.CAP1_R_CI.length; i++) {
            if (values.CAP1_R_C4[i] == 0 && values.CAP1_R_C31[i] != 0 && values.CAP1_R_C33[i] != 0) {
                webform.errors.push({
                    'fieldName': 'CAP1_R_C4',
                    'msg': Drupal.t('Cod eroare: 44-0022, Sunteti siguri Rind.' + values.CAP1_R_CI[i] + ' = 0')
                });
            }
        }

        for (i = 0; i < values.CAP2_R_CI.length; i++) {
            if (values.CAP2_R_C4[i] == 0 && values.CAP2_R_C31[i] != 0 && values.CAP2_R_C33[i] != 0) {
                webform.errors.push({
                    'fieldName': 'CAP2_R_C4',
                    'msg': Drupal.t('Cod eroare: 44-0022, Sunteti siguri Rind.' + values.CAP2_R_CI[i] + ' = 0')
                });
            }
        }
        webform.validatorsStatus['ei78'] = 1;
        validateWebform();
    }

})(jQuery)

21,
86

function validateDuplicateImportCodes(values) {
    // Initialize variables
    let serviciiListCountryImport = [];

    // Construct the list with validation for missing data
    for (let i = 0; i < values.CAP2_R_CI.length; i++) {
        let cspmCode = values.CAP2_R_C31[i] || "Unknown CSPM";
        let citltCode = values.CAP2_R_C33[i] || "Unknown CITLT";
        serviciiListCountryImport[i] = cspmCode + '_' + citltCode;
    }

    // Sort and identify duplicates
    serviciiListCountryImport.sort();
    let duplicateImports = serviciiListCountryImport.filter((item, index, array) =>
        array.indexOf(item) !== index && array.lastIndexOf(item) === index
    );

    // Remove invalid duplicates (e.g., "Unknown CSPM_Unknown CITLT")
    duplicateImports = duplicateImports.filter(item => item && item !== "Unknown CSPM_Unknown CITLT");

    // Return validation error if duplicates are found
    if (duplicateImports.length > 0) {
        return {
            'fieldName': 'CAP2_R_CA',
            'msg': Drupal.t(
                `Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ${duplicateImports.join(', ')}`
            )
        };
    }

    // Return null if no duplicates are found
    return null;
}


webform.afterLoad.ei78 = function () {
    if (!Drupal.settings.mywebform.preview) {

        var arrayCSPM2 = ['CAP1_R_CG', 'CAP1_R_CA', 'CAP2_R_CG', 'CAP2_R_CA'];

        jQuery.each(arrayCSPM2, function (key, value) {
            set_cspm2_to_select(value, null, null);
            set_options_html(value);
        });
    }
};

function set_options_html(selector) {
    var cspm2Values = Drupal.settings.mywebform.values[selector];
    if (!jQuery.isEmptyObject(cspm2Values)) {
        jQuery.each(cspm2Values, function (key, value) {
            set_cspm2_to_select(selector, value, key + 1);
        });
    }
}
function set_cspm2_to_select(selector, valueCSPM2, keyCSPM2) {
    var obj = (keyCSPM2 !== null ? jQuery('#' + selector + '-' + keyCSPM2) : jQuery('#' + selector));
    obj.empty();
    obj.append(jQuery("<option></option>").attr("value", '').text(''));

    jQuery.each(cspm2, function (key, value) {
        if (selector == 'CAP1_R_CA' || selector == 'CAP2_R_CA') {
            if (value.parent_code == jQuery('#CAP1_R_CG-' + keyCSPM2).val() ||
                value.parent_code == jQuery('#CAP2_R_CG-' + keyCSPM2).val()) {
                if (value.code == valueCSPM2)
                    obj.append(
                        jQuery("<option></option>").attr("value", value.code).attr("selected", "selected").text(value.code + ' - ' + value.name));
                else
                    obj.append(
                        jQuery("<option></option>").attr("value", value.code).text(value.code + ' - ' + value.name));
            }
        }
        else if (value.parent_code == '0' && value.code != '0') {
            if (value.code == valueCSPM2) {
                obj.append(
                    jQuery("<option></option>").attr("value", value.code).attr("selected", "selected").text(value.code + ' - ' + value.name));
            }
            else
                obj.append(
                    jQuery("<option></option>").attr("value", value.code).text(value.code + ' - ' + value.name));
        }
    });
    var selected = obj.val();
    var opts_list = obj.find('option');
    opts_list.sort(function (a, b) { //return parseFloat(jQuery(a).val()) > parseFloat(jQuery(b).val()) ? 1 : -1;
        return versionCompare(jQuery(a).val(), jQuery(b).val());
    });
    obj.html('').append(opts_list);
    obj.val(selected);
    /*jQuery('#' + selector + '-' + keyCSPM2).append(jQuery('option').remove().sort(function (a, b) {
      var at = jQuery(a).val(), bt = jQuery(b).val();
      return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
    }));*/
    //obj.change();
}

function changeSelectGroupServicii(elem) {
    var selector = elem.id;

    var obj = jQuery('#' + selector.replace('G', 'A'));
    obj.empty();
    obj.append(jQuery("<option></option>").attr("value", '').text(''));
    jQuery.each(cspm2, function (key, value) {
        if (value.parent_code == elem.value) {
            /*if (value.code == elem.code)
              obj.append(
                jQuery("<option></option>").attr("value", value.code).attr("selected", "selected").text(value.code + ' - ' + value.name));
            else*/
            obj.append(
                jQuery("<option></option>").attr("value", value.code).text(value.code + ' - ' + value.name));
        }
    });
    var selected = obj.val();
    var opts_list = obj.find('option');
    opts_list.sort(function (a, b) { //return parseFloat(jQuery(a).val()) > parseFloat(jQuery(b).val()) ? 1 : -1; 
        return versionCompare(jQuery(a).val(), jQuery(b).val());
    });
    obj.html('').append(opts_list);
    obj.val(selected);
    obj.change();
}


function get_trimestrial() {
    var date = new Date();
    return Math.ceil((date.getMonth() + 1) / 3);
}

function get_current_year() {
    var date = new Date();
    return date.getFullYear();
}

function changeIdCountry(elem) {
    var elemnt = jQuery(elem).closest('tr').find('input.input-country');
    if (jQuery(elem).val() == elemnt.val())
        return;

    elemnt.val(jQuery(elem).val()).change();
}

function changeIdServicii(elem) {
    var elemnt = jQuery(elem).closest('tr').find('input.input-servicii');
    var a = elem.id;
    var b = elemnt.id;
    if (jQuery(elem).val() == elemnt.val())
        return;

    elemnt.val(jQuery(elem).val()).change();
}

function changeSelectCountry(elem) {
    var getValue = jQuery(elem).val();

    if (jQuery(elem).closest('tr').find('select.select-country option[value=' + getValue + ']').length > 0) {
        jQuery(elem).closest('tr').find('select.select-country').val(getValue).change();
        return true;
    }
    alert('Nu exista tara cu acest cod');
    return false;
}

function changeSelectServicii(elem) {
    var getValue = jQuery(elem).val();

    if (jQuery(elem).closest('tr').find('select.select-servicii option[value=' + getValue + ']').length > 0) {
        jQuery(elem).closest('tr').find('select.select-servicii').val(getValue).change();
        return true;
    }
    alert('Nu exista serviciu cu acest cod');
    return false;
}

//function to do the correct sort.
function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}