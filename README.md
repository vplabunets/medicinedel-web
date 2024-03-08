# Medicine Delivery App

Welcome to the Medicine Delivery App! This web application, developed using Create React App, provides users with a
convenient platform to browse and purchase medicines from various drug stores, manage their shopping cart, view order
history, apply coupons for discounts, and select their delivery address using Google Maps integration.

## Features

### Shop Page

The Shop page allows users to:

- Choose a drug store from a list.
- Browse medicines available at the selected store.
- Add medicines to their shopping cart.
- Sort medicines by price or date added.
- Mark medicines as favorites for easy access.

### Shopping Cart

The Shopping Cart page enables users to:

- View all added products.
- Remove items from the cart.
- Change the quantity of items.
- Provide their email, phone number, and delivery address.
- Save orders in the database upon submission.
- Utilize Redux Persist to save the cart in local storage for persistent state.

### Google Maps Integration

The app integrates Google Maps to facilitate address selection:

- Users can choose their delivery address using a pin on the map or by entering an address manually.
- The selected address is displayed on the map, along with the location of the drug store where the user ordered
  medicines from.

### History Page

The History page allows users to:

- Find their previous orders using their email, phone number, or order ID.
- View details of past orders, including items purchased and delivery information.

### Coupons Page

The Coupons page enables users to:

- View available coupons for discounts.
- Apply coupons on the shopping cart page to avail of offers.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Create a `.env` file based on the provided `.env.example` file and add necessary environment variables.
5. Run the development server using `npm start`.

## Packages Used

This project utilizes various packages for functionality and development:

- `@emotion/react`: CSS-in-JS library for styling components.
- `@mui`: Material-UI components library.
- `@react-google-maps/api`: Google Maps API wrapper for React.
- `@reduxjs/toolkit`, `react-redux`: Redux for state management.
  RTK Query for making medicineServiceAPI requests
- `axios`: HTTP client for making map requests.
- `dotenv`: Loads environment variables from a `.env` file.
- `formik`, `yup`: Form management and validation.
- `redux-persist`: Persists Redux state in local storage.
- `uuid`: Generates unique IDs.
- Other packages for testing and development purposes.

## Deployment

This app is deployed using Vercel.

## License

This project is licensed under the [MIT License](LICENSE).
