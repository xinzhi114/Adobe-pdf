/*
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');

/**
 * This sample illustrates how to provide in-memory auth credentials for performing an operation. This enables the
 * clients to fetch the credentials from a secret server during runtime, instead of storing them in a file.
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */


try {
    /*
    Initial setup, create credentials instance.
    Replace the values of CLIENT_ID, CLIENT_SECRET, ORGANIZATION_ID and ACCOUNT_ID with their corresponding values
    present in the pdftools-api-credentials.json file and PRIVATE_KEY_FILE_CONTENTS with contents of private.key file
    within the zip file which must have been downloaded at the end of Getting the Credentials workflow.
    */
    const credentials = PDFToolsSdk.Credentials.serviceAccountCredentialsBuilder()
        .withClientId("CLIENT_ID")
        .withClientSecret("CLIENT_SECRET")
        .withPrivateKey("PRIVATE_KEY_FILE_CONTENTS")
        .withOrganizationId("ORGANIZATION_ID")
        .withAccountId("ACCOUNT_ID")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        createPdfOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
    createPdfOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    createPdfOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/createPDFFromDOCXInMemAuthCredOutput.pdf'))
        .catch(err => {
            if(err instanceof PDFToolsSdk.Error.ServiceApiError
                || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
