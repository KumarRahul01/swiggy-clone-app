# Swiggy Clone - Online Food Ordering App

## Overview

The **Swiggy Clone** is a full-featured online food ordering app designed to provide users with a seamless food ordering experience. Similar to other online food ordering platforms, this app allows users to browse through a wide selection of restaurants, view available food items, search and update their location, add items to a cart, and place orders with ease. The app is powered by the Swiggy API, ensuring real-time updates on restaurant data, menus, and offers.

## Features

- **Real-time Data Fetching**: The app fetches live restaurant data, including menu items, prices, and offers, directly from the Swiggy API.
- **Location-based Search**: Users can search for food items based on their location and can change their delivery location as needed.
- **Restaurant and Menu Browsing**: Browse through a variety of restaurants and their available menu items, complete with descriptions, images, and prices.
- **Add to Cart**: Users can select multiple food items from different restaurants and add them to their cart.
- **Order Placement**: Once items are added to the cart, users can easily place an order for delivery to their current or chosen location.
- **User-friendly UI**: Intuitive, responsive design to ensure a smooth user experience on both desktop and mobile devices.
- **Cart Management**: Modify items in the cart before placing an order.
- **Location-based Recommendations**: Personalized food recommendations based on the user’s location.
- **Promotions and Discounts**: Display ongoing restaurant deals, discounts, and promotional offers (if fetched from the API).

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **API**: Swiggy API for real-time data fetching
- **Authentication**: Firebase.
<!-- - **Payment Gateway**: Placeholder for integration with popular payment services (PhonePe, Paytm, etc.) -->
- **State Management**: React Hooks (useState, useEffect), Context API, Redux Toolkit
- **Routing**: React Router Dom for seamless navigation between pages


### Steps to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/swiggy-clone.git

2. Navigate to the project directory:
   ```bash
   cd swiggy-clone

3. Install dependencies::
   ```bash
   npm install

4. Start the development server::
   ```bash
   npm run dev

## API Integration

To fetch real-time restaurant data, the app uses the Swiggy API. Ensure that you have the required API keys and access configured.

## Customization

To customize the app (e.g: UI, additional features):

- Modify components in the /src/components directory.
- Tailwind CSS classes can be adjusted for styling.
