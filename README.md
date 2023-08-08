# GAS - Mobile Frontend: Running the Project

Welcome to the **GAS - Mobile Frontend** project repository! This README will guide you through the process of setting up and running the existing React Native Expo project on your local machine.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your development machine:

- Node.js (recommended version)
- npm or Yarn

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/GAS-Mobile/front.git
   ```

2. Navigate to the project directory:

   ```bash
   cd front
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

## Running the App

To start the development server and run the app, you can use the available scripts defined in the `package.json` file. Open a terminal and navigate to the project directory.

- To start the development server and open the Expo DevTools:

   ```bash
   npm start
   ```

- To run the app on an Android emulator or device:

   ```bash
   npm run android
   ```

- To run the app on the iOS simulator:

   ```bash
   npm run ios
   ```

- To run the app in a web browser:

   ```bash
   npm run web
   ```

Scan the QR code with the Expo Go app on your mobile device to view the app when running on Android or iOS.

## Configuration

If the project uses environment variables, create a `.env` file in the root directory and provide the necessary values. Check the project documentation or configuration files for additional setup steps.

## Contributing

If you're interested in contributing to the project, follow the guidelines provided in the project's documentation. This might include steps for submitting pull requests, reporting issues, and adhering to coding standards.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

