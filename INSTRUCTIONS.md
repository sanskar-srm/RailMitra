# Running Your Railमित्र Project in VS Code

Follow these steps to get your Next.js application running on your local machine using Visual Studio Code.

## Prerequisites

1.  **Visual Studio Code**: Make sure you have VS Code installed. You can download it from the [official website](https://code.visualstudio.com/).
2.  **Node.js**: This project requires Node.js. Installing Node.js will also install `npm` (Node Package Manager), which is used to manage the project's dependencies. You can download it from the [official Node.js website](https://nodejs.org/).

## Step-by-Step Instructions

### 1. Open the Project in VS Code

-   Open Visual Studio Code.
-   Go to `File > Open Folder...` and select the root directory where you saved your project files.

### 2. Install Dependencies

-   Open the integrated terminal in VS Code by going to `Terminal > New Terminal` (or by pressing `` ` `` followed by `Ctrl+Shift`).
-   In the terminal, run the following command to install all the required packages listed in `package.json`:

    ```bash
    npm install
    ```

### 3. Set Up Environment Variables

The application requires API credentials to fetch live train data. You'll need to get these from a service like [RapidAPI's Indian Railway API](https://rapidapi.com/booking-com-public/api/indian-railways-irctc).

-   In the root directory of your project, create a new file named `.env`.
-   Add the following lines to your `.env` file, replacing the placeholder values with your actual API key and host:

    ```env
    RAPIDAPI_KEY=your_rapidapi_key_here
    RAPIDAPI_HOST=your_rapidapi_host_here
    ```

    -   `your_rapidapi_key_here`: Your personal API key from RapidAPI.
    -   `your_rapidapi_host_here`: The host URL for the API (e.g., `indian-railways-irctc.p.rapidapi.com`).

### 4. Run the Development Server

-   Once the dependencies are installed and your `.env` file is set up, you can start the local development server.
-   Run the following command in the terminal:

    ```bash
    npm run dev
    ```

-   This will start the application. You can now view it in your web browser by navigating to the URL provided in the terminal, which is typically `http://localhost:9002`.

That's it! Your Railमित्र application should now be running locally. Any changes you make to the code will automatically reload in the browser.