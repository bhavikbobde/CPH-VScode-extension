# CPH-LeetCode-Extension

The **CPH LeetCode Extension** is a VS Code extension designed to enhance your competitive programming experience on LeetCode. It allows you to fetch and store test cases directly from LeetCode problem URLs, run tests locally, and supports popular programming languages like Python and C++.

## Features

### 1. **Fetch Test Cases from LeetCode**
- Retrieve test cases directly from LeetCode problem URLs.
- Automatically parse the problem descriptions to extract input and expected output test cases.
- Handle problems with multiple test cases seamlessly.
- Store the fetched test cases in an organized format for local testing.

### 2. **Test Case Storage**
- Test cases are saved in a format compatible with the **Competitive Programming Helper (CPH)** extension.
- Input files are saved as `input_1.txt`, `input_2.txt`, etc.
- Output files are saved as `output_1.txt`, `output_2.txt`, etc.

### 3. **Execute Code**
- Write your code in your preferred programming language (e.g., Python, C++).
- Run your code against the fetched test cases.
- The extension compares the actual outputs with the expected outputs for each test case.

### 4. **Multi-Language Support**
- Supports multiple programming languages, including **Python** and **C++**.

## Usage

### Available Commands

- **Fetch Test Cases (`cph.fetchTestCases`)**
  - Prompts you to enter a LeetCode problem URL.
  - Fetches and stores the test cases locally in the extension.

- **Run Test Cases (`cph.runTestCases`)**
  - Compiles and executes the code against the stored test cases.
  - Displays the results for each test case.

### How to Use

1. Open your coding workspace in VS Code.
2. Use the **Fetch Test Cases** command to retrieve the test cases from a LeetCode problem URL.
3. Write your solution in the editor, following the standard input and output format. For container structures (e.g., arrays), the input will include the size of the array followed by its elements (this applies to multi-dimensional or jagged arrays as well).
4. Use the **Run Test Cases** command to execute your solution and check the results.

## Installation

1. Clone this repository.
2. Open the cloned repository in VS Code.
3. Run `npm install` to install the required dependencies.
4. Press **F5** to launch the extension in a new VS Code window for testing.

## Dependencies

- **Puppeteer**: For web scraping LeetCode pages.
- **Child Process**: For executing code commands.
- **Node.js File System**: For handling file operations.

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
