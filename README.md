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

### Configuration

If the project uses environment variables, create a `.env` file in the root directory and provide the necessary values based on the provided `.env.example` file.

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

## Contributing
We welcome contributions to the project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add your changes"`.
4. Push to your forked repository: `git push origin feature/your-feature-name`.
5. Create a pull request to the main repository.

## Troubleshooting

If you encounter any issues or have questions, please open an issue on the GitHub repository. We'll be happy to assist you.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

