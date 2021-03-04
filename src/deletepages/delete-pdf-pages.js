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
 * This sample illustrates how to delete pages in a PDF file.
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */

const getPageRangesForDeletion = () => {
    // Specify pages for deletion.
    const pageRangesForDeletion = new PDFToolsSdk.PageRanges();
    // Add page 1.
    pageRangesForDeletion.addSinglePage(1);

    // Add pages 3 to 4.
    pageRangesForDeletion.addPageRange(3, 4);
    return pageRangesForDeletion;
};

try {
    // Initial setup, create credentials instance.
    const credentials = PDFToolsSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdftools-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        deletePagesOperation = PDFToolsSdk.DeletePages.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/deletePagesInput.pdf');
    deletePagesOperation.setInput(input);

    // Delete pages of the document (as specified by PageRanges).
    const pageRangesForDeletion = getPageRangesForDeletion();
    deletePagesOperation.setPageRanges(pageRangesForDeletion);

    // Execute the operation and Save the result to the specified location.
    deletePagesOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/deletePagesOutput.pdf'))
        .catch(err => {
            if (err instanceof PDFToolsSdk.Error.ServiceApiError
                || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
