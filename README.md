# Bamazon (node.js CLI app)
Bamazon is a node.js CLI app that mimics an online store. It reads and writes to a MySQL database to keep track of items in the store and quantities available. All the data and input is collected from the user via the inquirer NPM package. Depending on how th user answers the prompts, different functions/features are fired off and displayed on the screen. 

There are two main parts to Bamazon. The first one is the Customer view. This view only allows the items for sale to be dislpayed and purchased. It does not grant any kind of administrative functionality. That's where the Manager view comes in. The manager can view all items, view low inventory items (less than 5 in stock), add more inventory to replenish the store and finally add new items to be sold. All the changes are made live to a MySQL DB and are reflected in each view in real-time. 

**Instructions:**
To run Bamazon, you'll need to run the bamazonCustomer.js or bamazonManager.js file in node. Make sure to install all the dependencies first!

[Video of the initial Customer View in action](https://drive.google.com/file/d/1NIhFH9m4jqzVOa3jvpPiZHRhV09lTZAN/view?usp=sharing)

[Video of the manager view](https://drive.google.com/file/d/1fZBSdX-ZwnCV_pacH5bakEMzYvx76HQI/view?usp=sharing)

[Video of the updated Customer view](https://drive.google.com/file/d/1Hy7ZK5xf5tU0h-p3sDiW86_-Xmky3lGY/view?usp=sharing)

___
**Technologies Used:**
* node.js
* javaScript
* MySQL
* inquirer (NPM)
* cli-table (NPM)
___
This is a project for UNCC Full Stack Web Development Bootcamp. All code written by Jarkko Haarla.