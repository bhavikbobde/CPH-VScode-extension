import * as vscode from 'vscode';
import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import * as path from 'path';
import os from 'os';

const workspaceDir = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
const testcasesDir = path.join(workspaceDir, 'testcases');

async function fetchLeetCodeTestData(url: string) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'networkidle0',
        });

        const rawProblemData = await page.evaluate(() => {
            let elements = document.querySelectorAll('div.elfjS pre');
            if (elements.length === 0) {
                elements = document.querySelectorAll('div.example-block');
            }
            return Array.from(elements).map(el => el.textContent!.trim());
        });
        await browser.close();

        function formatArray(arr: Array<any>): string {
            let result = `${arr.length} `;
            for (const item of arr) {
                if (Array.isArray(item)) {
                    result += formatArray(item); 
                } else {
                    result += `${item} `;
                }
            }
        
            return result;
        }
        

        rawProblemData.forEach((data, index) => {
            let inputStr = '';
            let answerStr = '';
            let idx = 0;

            while (inputStr.length === 0) {
                while (idx < data.length && data[idx] !== '\n') {
                    inputStr += data[idx];
                    idx++;
                }
                idx++;  
            }

            while (answerStr.length === 0) {
                while (idx < data.length && data[idx] !== '\n') {
                    answerStr += data[idx];
                    idx++;
                }
                idx++;  
            }

            let formattedInput = '';

for (let i = 0; i < inputStr.length; i++) {
    if (inputStr[i] === '=') {
        i += 2;
        let variableString = '';

        while (i < inputStr.length && inputStr[i] !== ' ' && inputStr[i] !== '\n') {
            variableString += inputStr[i];
            i++;
        }
        if (variableString.endsWith(',')) {
            variableString = variableString.slice(0, -1);
        }

        const parsedVariable = JSON.parse(variableString);
        if (Array.isArray(parsedVariable)) {
            formattedInput += formatArray(parsedVariable);
        } else {
            formattedInput += `${parsedVariable} `;
        }

        formattedInput = formattedInput.trimEnd();
        formattedInput += '\n';
    }
}

            let formattedAnswer = '';
            const parsedAnswer = JSON.parse(answerStr.slice(8));

            if (Array.isArray(parsedAnswer)) {
                formattedAnswer += formatArray(parsedAnswer);
            } else {
                formattedAnswer += `${parsedAnswer} `;
            }

            formattedAnswer = formattedAnswer.trimEnd();
            formattedAnswer += os.platform() === 'win32' ? '\r\n' : '\n';

            fs.writeFileSync(`${testcasesDir}/input_${index + 1}.txt`, formattedInput);
            fs.writeFileSync(`${testcasesDir}/correct_${index + 1}.txt`, formattedAnswer);
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error while scraping LeetCode problem: ${error}`);
    }
}

async function showTestResults() {
    const resultsMap = new Map<number, boolean>();
    fs.readdirSync(testcasesDir).forEach((file) => {
        if (file.startsWith('correct_') && file.endsWith('.txt')) {
            const answerFilePath = path.join(testcasesDir, file);
            const testCaseNumber = parseInt(file.split('_')[1].split('.')[0]);
            const outputFilePath = path.join(testcasesDir, `output_${testCaseNumber}.txt`);

            const answerData = fs.readFileSync(answerFilePath, 'utf-8');
            const outputData = fs.readFileSync(outputFilePath, 'utf-8');

            resultsMap.set(testCaseNumber, answerData === outputData);
        }
    });

    for (const [testCase, isSuccess] of resultsMap.entries()) {
        const message = isSuccess
            ? `Test case ${testCase} passed.`
            : `Test case ${testCase} failed.`;

        isSuccess
            ? await vscode.window.showInformationMessage(message, 'OK')
            : await vscode.window.showErrorMessage(message, 'OK');
    }

    await vscode.window.showInformationMessage('Test cases executed successfully.');
}

export function activate(context: vscode.ExtensionContext) {
    const fetchTestCasesCommand = vscode.commands.registerCommand('cphlc.fetchTestCases', async () => {
        const url = await vscode.window.showInputBox({
            prompt: 'Enter the LeetCode problem URL',
        });

        if (url) {
            vscode.window.showInformationMessage('Fetching test cases....');
           
            if (fs.existsSync(testcasesDir)) {
                fs.rmSync(testcasesDir, { recursive: true, force: true });
            }
            fs.mkdirSync(testcasesDir, { recursive: true });

            await fetchLeetCodeTestData(url);
            vscode.window.showInformationMessage('Test cases fetched successfully.');
        } else {
            vscode.window.showErrorMessage('No URL provided.');
        }
    });

    const runTestCasesCommand = vscode.commands.registerCommand('cphlc.runTestCases', async () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const filePath = document.uri.fsPath;
            const fileNameWithoutExt = path.join(path.parse(filePath).dir, path.parse(filePath).name);
            const fileLanguage = document.languageId;

            if (fileLanguage === 'cpp') {
                await executeCppTestCases(filePath, fileNameWithoutExt);
            } else if (fileLanguage === 'python') {
                await executePythonTestCases(filePath);
            } else {
                vscode.window.showWarningMessage(`Support for "${fileLanguage}" files is not available.`);
            }
        } else {
            vscode.window.showWarningMessage('No file is currently open in the editor.');
        }
    });

    context.subscriptions.push(fetchTestCasesCommand, runTestCasesCommand);
}

async function executeCppTestCases(filePath: string, fileNameWithoutExt: string) {
    vscode.window.showInformationMessage('Running C++ test cases...');
    const compileCommand = `g++ -std=c++17 "${filePath}" -o "${fileNameWithoutExt}"`;
    execSync(compileCommand);

    fs.readdirSync(testcasesDir).forEach((file) => {
        if (file.startsWith('input_') && file.endsWith('.txt')) {
            const inputFilePath = path.join(testcasesDir, file);
            const testCaseNumber = parseInt(file.split('_')[1].split('.')[0]);
            const outputFilePath = path.join(testcasesDir, `output_${testCaseNumber}.txt`);
            const runCommand = `"${fileNameWithoutExt}" < "${inputFilePath}" > "${outputFilePath}"`;
            execSync(runCommand);
        }
    });

    await showTestResults();

    const fileExtension = os.platform() === 'win32' ? '.exe' : os.platform() === 'darwin' ? '' : '.out';
    const delCommand = os.platform() === 'win32'
        ? `del "${fileNameWithoutExt}${fileExtension}"`
        : `rm "${fileNameWithoutExt}${fileExtension}"`;

    execSync(delCommand);
}

async function executePythonTestCases(filePath: string) {
    vscode.window.showInformationMessage('Running Python test cases...');
    
    fs.readdirSync(testcasesDir).forEach((file) => {
        if (file.startsWith('input_') && file.endsWith('.txt')) {
            const inputFilePath = path.join(testcasesDir, file);
            const testCaseNumber = parseInt(file.split('_')[1].split('.')[0]);
            const outputFilePath = path.join(testcasesDir, `output_${testCaseNumber}.txt`);
            const runCommand = `python "${filePath}" < "${inputFilePath}" > "${outputFilePath}"`;
            execSync(runCommand);
        }
    });

    await showTestResults();
}
