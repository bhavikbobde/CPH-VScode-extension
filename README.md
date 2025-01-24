# Competitive Programing Helper README

The CPH LeetCode Extension for Visual Studio Code enhances the process of solving LeetCode problems by allowing you to automatically retrieve test cases directly from problem URLs in multiple languages, such as Python and C++. This extension makes it easier to store, test, and compare outputs with your solution.

## Features

Features

1. Problem URL Fetching
Retrieve test cases from a LeetCode problem URL.
Parse problem descriptions to extract both input and expected output test cases.
Support for problems containing multiple test cases.
Save test cases in a structured format for local testing.

2. Test Case Storage
Test cases are stored in a format compatible with the Competitive Programming Helper (CPH) extension.
Input files are saved as input_1.txt, input_2.txt, and so on.
Corresponding output files are named output_1.txt, output_2.txt, etc.

3. Code Execution
Write code in your language of choice.
Run your code against the retrieved test cases.
Compare actual outputs with expected results for each test case.

4. Multi-Language Support
Currently supports popular programming languages, including Python and C++.

## Commands

Fetch Test Cases (cphlc.fetchTestCases)
Prompts the user for a LeetCode problem URL.
Automatically fetches and saves test cases locally for testing.

Run Test Cases (cphlc.runTestCases)
Compiles and runs your code against the stored test cases.
Displays the results for each test case, including whether the output matches the expected result.
 
## Usage

 1.	Open your coding workspace in Visual Studio Code.
 2.	Use the Fetch Test Cases command to retrieve and store test cases from a LeetCode problem URL.
 3.	Write your solution in the editor, ensuring your code uses standard input and output. For data structures like arrays, input format will begin with the size of the array followed by the array elements (applicable for higher-dimensional arrays as well).
 4.	Use the Run Test Cases command to run your code against the stored test cases and view the results.

## Installation

 1.	Clone this repository.
 2.	Open the cloned repository in VS Code.
 3.	Run npm install to install the necessary dependencies.
 4.	Press F5 to launch the extension in a new VS Code window for testing.

## Dependencies

Puppeteer for web scraping.
Child Process for executing commands.
Node.js File System for file handling.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
