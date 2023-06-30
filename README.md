# Foodie

Welcome to Foodie! This is a web application built with .NET for the backend, using Postgres database for data storage. It allows users to create meal plans by adding available products, track their daily calorie intake, and monitor the proportions of macronutrients. The application is dockerized using Docker Compose for easy deployment and setup.

## Features

- **Product Search:** Users can search for available products using a search bar and add them to their meal plans. The application retrieves relevant product information from the database and displays it to the user.

- **Customize Meal Plan:** Users can input the amount of each product they consume, allowing for personalized meal planning and tracking of nutritional information. The application calculates the total calorie intake and displays it to the user.

- **Calorie Limit Tracking:** Users can set their daily calorie limit and track their progress towards the goal. The application provides a progress bar indicating the percentage of calories consumed compared to the set limit.

- **Macronutrient Proportions:** Foodie also tracks the proportions of macronutrients (carbohydrates, proteins, and fats) in the user's meal plan. A separate progress bar displays the percentage of each macronutrient in the overall meal plan.

## Installation

To run the Foodie web application locally on your machine, follow these steps:

1. Clone this repository to your local machine using the following command:

   ```
   git clone https://github.com/kris007iron/Foodie.git
   ```

2. Navigate to the project directory:

   ```
   cd Foodie
   ```

3. Run the Docker Compose command to build and start the application:

   ```
   docker-compose up --build
   ```

4. Open your web browser and visit `http://localhost:5000` to access the Foodie application.

## Usage

1. On the Foodie homepage, you will see a search bar where you can search for available products. Enter the product name and click the "Search" button.

2. The application will display a list of matching products. Click on a product to view its details and add it to your meal plan.

3. In the meal plan section, you can input the amount of each product you consume. The application will calculate the total calorie intake and display it in the progress bar.

4. To set your daily calorie limit, enter the desired value in the "Calorie Limit" input field. The progress bar will update accordingly to track your progress.

5. The macronutrient proportions are automatically calculated based on the products in your meal plan. The progress bar for each macronutrient will show the percentage of that nutrient in your overall meal plan.

Note: The current version of Foodie does not include authentication or session saving, so all data will be reset when you refresh the site. The products, however, are stored in the Postgres database and will persist across sessions.

## Contributing

We welcome contributions to the Foodie project! If you encounter any issues or have suggestions for improvements, please submit an issue or create a pull request on the [GitHub repository](https://github.com/kris007iron/Foodie).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
