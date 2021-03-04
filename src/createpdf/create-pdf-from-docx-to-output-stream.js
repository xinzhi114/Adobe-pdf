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

const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk'),
    fs = require('fs');

/**
 * This sample illustrates how to create a PDF file from a DOCX file, and then write the result to an output stream.
 * <p>
 * Refer to README.md for instructions on how to run the samples.
 */


/**
 * Prepares a writeStream over a predetermined result file.
 */
const prepareWriteStream = () => {
    // create output directory if it doesn't exists.
    if (!fs.existsSync('output')) {
        console.log('Creating output directory');
        fs.mkdirSync('output');
    }

    return fs.createWriteStream('output/createPDFAsStream.pdf');
};

try {
    // Initial setup, create credentials instance.
    const credentials =  PDFToolsSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("pdftools-api-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
        createPdfOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = PDFToolsSdk.FileRef.createFromLocalFile('resources/createPDFInput.docx');
    createPdfOperation.setInput(input);

    const writeStream = prepareWriteStream();
    // Define a callback function that executes once the stream write is finished
    writeStream.on('finish', () => console.log('Stream Write Finished'));

    // Execute the operation and Write the result to stream.
    createPdfOperation.execute(executionContext)
        .then(result => result.writeToStream(writeStream))
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
