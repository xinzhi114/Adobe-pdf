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
 * This sample illustrates how to export a PDF file to JPEG.
 * <p>
 * Note that exporting a PDF file to an image format results in a ZIP archive containing one image per page.
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFToolsSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdftools-api-credentials.json")
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        exportPDF = PDFToolsSdk.ExportPDF,
        exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.JPEG);

    // Set operation input from a source file
    const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/exportPDFToImageInput.pdf');
    exportPdfOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPdfOperation.execute(executionContext)
        .then(result => result.saveAsFile('output/exportPDFToJPEG.zip'))
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
