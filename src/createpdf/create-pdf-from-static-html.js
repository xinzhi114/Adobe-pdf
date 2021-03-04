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
 * This sample illustrates how to convert an HTML file to PDF. The HTML file and its associated dependencies must be
 * in a single ZIP file.
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */

/**
 * Sets any custom options for the operation.
 *
 * @param htmlToPDFOperation operation instance for which the options are provided.
 */
const setCustomOptions = (htmlToPDFOperation) => {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
    const pageLayout = new PDFToolsSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(8, 11.5);

    // Set the desired HTML-to-PDF conversion options.
    const htmlToPdfOptions = new PDFToolsSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};


try {
    // Initial setup, create credentials instance.
    const credentials =  PDFToolsSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdftools-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/createPDFFromStaticHtmlInput.zip');
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/createPdfFromStaticHtmlOutput.pdf'))
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
