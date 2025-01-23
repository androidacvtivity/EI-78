function validateDuplicateExportCodes(values) {
    // Initialize an array to store errors
    let errors = [];
    let serviciiListCountryExport = [];

    // Loop through each row in CAP2_R_CI
    for (let i = 0; i < values.CAP1_R_CI.length; i++) {
        // Safely extract CSPM and CITLT codes with fallback for missing data
        let cspmCode = values.CAP1_R_C31[i] || "Unknown CSPM";
        let citltCode = values.CAP1_R_C33[i] || "Unknown CITLT";
        let combinedCode = cspmCode + '_' + citltCode;

        // Check if the combined code already exists in the list
        if (serviciiListCountryExport.includes(combinedCode)) {
            // If it exists, add an error for this row
            errors.push({
                'fieldName': 'CAP1_R_C31',
                'index': i,
                'msg': Drupal.t(
                    `Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ${combinedCode}`
                )
            });

            errors.push({
                'fieldName': 'CAP1_R_C33',
                'index': i,
                'msg': Drupal.t(
                    `Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ${combinedCode}`
                )
            });

            errors.push({
                'fieldName': 'CAP1_R_CI',
                'index': i,
                'msg': Drupal.t(
                    `Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ${combinedCode}`
                )
            });

            errors.push({
                'fieldName': 'CAP2_1_CC',
                'index': i,
                'msg': Drupal.t(
                    `Cod eroare: 44-0030, Cap. Import. Codul CSPM Rev.2 și codul CITLT se repetă pentru: ${combinedCode}`
                )
            });



        }

        // Add the current combined code to the list for tracking
        serviciiListCountryExport.push(combinedCode);
    }

    // Return the array of errors or null if no duplicates found
    return errors.length > 0 ? errors : null;
}
