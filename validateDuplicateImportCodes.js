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


webform.validators.ei78 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;

    // Call the separate function for 44-0030 validation
    const importValidationError = validateDuplicateImportCodes(values);

    // Add error to webform.errors if validation fails
    if (importValidationError) {
        webform.errors.push(importValidationError);
    }

    // Other validations here...
};
