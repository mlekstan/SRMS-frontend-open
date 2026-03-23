# Sales and Rental Management System

## Description
Sales and Renatal Management System (SRMS) is a integrated system developed in order to boost performace of recreational equipment rental.

## Deployment model
System consists of four main components, which are respectively: 

1. **"Sales"** (pol. *"Sprzedaż"*) module which was implementaed as an apllication for browsers;
2. **"Rentals and Renturns"** (pol. *"Wpożyczenia i zwroty"*) module is working as an aplication for mobile devices; 
3. **Server application**;
4. **Relational database**.

![Deployment diagram](/diagrams/Model%20deployment_diagram.png)

## Activity flow

Main activity flow in the system is as follows: 

1. **Sales Service** (pol. *"Usługa sprzedaży"*): The process begins here. The main task is to link the customer's card number with a specific rental transaction, including the equipment category, quantity, and the duration declared by the customer.
2. **Rental Service** (pol. *"Usługa wypożyczenia"*): After the sale is registered by the Sales Department Employee (SDE), the customer presents their card to the Rental Department Employee (RDE). The RDE scans the card's barcode using the "Rentals and Returns" mobile app to retrieve the list of equipment to be issued. The RDE then scans the barcodes of the specific items and officially rents them to the client.
3. **Return Service** (pol. *"Usługa zwrotu"*): Once the rental period ends and the customer returns the equipment, the RDE scans the barcodes of the items to register the return and successfully ends the process.

![Main activity diagram](/diagrams/Model%20ad_main.png)

**Video that shows this simple workflow is accessible [here](https://drive.google.com/file/d/1A5oIIclz8NgXAFUd21odjODtOh-LXhya/view?usp=sharing).**

## Tech stack

All applications that SRMS consist of was written in TypeScript programming language. Below are listed technologies and standards that was used.

1. **"Sales"** module: 
    - React.js
    - TanStack Query
    - TanStack Form
    - TanStack Table
    - Material UI
    - CSS
    - Docker
2. **"Rentals and Returns"** module: 
    - React Native
    - Expo
    - TanStack Query
    - TanStack Form
    - React Native Paper
3. **Server application**: 
    - Node.js
    - NestJS
    - OAuth 2.0 in "Resource Owner Password Credentials Grant" version
    - Docker
4. **Relational database**: 
    - PostgreSQL
    - Docker

## Planned path of future development

1. Mobile application for customers
2. Module for displaying customers an informaton about equipment availability on TV
3. Integration with cash register
4. Software as a Service




