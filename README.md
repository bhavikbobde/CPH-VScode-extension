# CPH-LeetCode-Extension

The **CPH LeetCode Extension** is a Visual Studio Code plugin that simplifies the process of solving LeetCode problems. It helps you directly fetch test cases from problem pages, run your solutions locally, and supports multiple programming languages like Python and C++.  

## Key Features  

### 1. **Retrieve Test Cases from LeetCode**  
- Input a LeetCode problem URL to pull test cases effortlessly.  
- Automatically extract the problem's input and expected outputs from its description.  
- Supports problems with multiple test cases.  
- Organizes test cases locally for easy testing.  

### 2. **Organized Test Case Storage**  
- Saves test cases in a structured, consistent format for local use.  
- Input files are named as `input_1.txt`, `input_2.txt`, etc.  
- Corresponding outputs are stored as `output_1.txt`, `output_2.txt`, etc.  

### 3. **Run and Test Your Code**  
- Write your solution in the language of your choice.  
- Run your solution against the stored test cases.  
- Compares the program output with the expected output to identify discrepancies.  

### 4. **Supports Multiple Languages**  
- Works seamlessly with popular programming languages such as **Python** and **C++**.  

---

## Getting Started  

### Commands  

1. **Fetch Test Cases (`cph.fetchTestCases`)**  
   - Enter the URL of a LeetCode problem to retrieve and save test cases locally.  

2. **Run Test Cases (`cph.runTestCases`)**  
   - Execute your solution and test it against the stored inputs and outputs.  

---

### How to Use  

1. Open your project workspace in Visual Studio Code.  
2. Run the **Fetch Test Cases** command and provide the URL of a LeetCode problem.  
3. Write your solution in the code editor. Ensure your program handles inputs using standard input/output. For data structures like arrays, the input format includes the size of the array followed by its elements. This pattern applies to multi-dimensional and jagged arrays as well.  
4. Use the **Run Test Cases** command to test your program.  

---

## Installation  

1. Clone this repository to your local machine.  
2. Open the folder in Visual Studio Code.  
3. Run `npm install` in the terminal to install required dependencies.  
4. Press **F5** to launch the extension in a new VS Code window for testing.  

---

## Dependencies  

- **Puppeteer**: Used for web scraping to fetch problem details and test cases.  
- **Child Process**: Executes code directly from the terminal.  
- **Node.js File System**: Manages file creation and storage for test cases.  

---

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
