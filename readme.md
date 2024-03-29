# Authentication using express

This project represents the authentication flow using typescript with node js. I have used express framework of node js. For database I have used the mongoose framework of the mongodb. I have also used the prettier, linter and husky.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MananPKansara/express-ts-authentication
   ```

2. Navigate to the project directory:

   ```bash
   cd express-ts-authentication
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the MongoDB connection:
   - Make sure you have MongoDB installed and running locally or provide a remote MongoDB connection URI.
   - Update the MongoDB connection details in the `.env` file.

5. Start the server:

   ```bash
   npm start
   ```

6. The project is now running locally on `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `POST /auth/register`: Register/Sign Up.
- `POST /auth/login`: Login/Sign In.
- `GET /auth/forgotPassword/:email`: Send forgot password link to email.
- `POST /auth/forgotPassword/:token`: Change password.
- `GET /user`: List of all users.
- `GET /user/:userId`: User information from the id.

## Contributing

Contributions to this project are welcome! If you find any bugs, have suggestions for improvements, or would like to add new features, please submit an issue or open a pull request.

## Contact

For any questions or inquiries, please reach out to project maintainer Manan Kansara
- GitHub: [Manan Kansara](https://github.com/MananPKansara)
