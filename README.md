# Eventozor - Online Event Management Platform

## Contents
- [Description](#description)
- [Features](#features)
- [User Flow](#user-flow)
- [Tech Stack](#tech-stack)
- [Admin Functionalities](#admin-functionalities)
- [User Functionalities](#user-functionalities)
- [Payment Integration](#payment-integration)
- [Frontend Details](#frontend-details)
- [Backend Details](#backend-details)
- [Deployed URL](#deployed-url)

## Description
Eventozor is an online event management platform that is developed for organizing and managing events. The platform features a dashboard for administrators to track event performance, ticket sales, and attendee registrations.

## Features
- User registration and login
- Event creation and management
- Ticket purchase system with different ticket types
- Payment gateway integration (Stripe)
- Event schedule and calendar view
- Admin panel for event approval, user management, and analytics

## User Flow

- **Admin Login**:  
  Admin credentials are predefined and mentioned in the code. There is no registration option for the Admin.  
  - **Email**: `admin@gmail.com`  
  - **Password**: `admin@123`

- **Event Management**:  
  The Admin can create events, manage event details, and set ticket types with pricing options. Admins also have the ability to edit event information whenever necessary and can view the Event Analytics.

- **User Registration & Login**:  
    - Users can sign up on Eventozor and log into their accounts. Once logged in, they can explore event cards, each offering "Register" and "View Details" options.
    - If users forget their password, a "Forgot Password" link is provided on the login screen. By clicking the link, users can initiate the password reset process, and a reset link will be sent to their email for password recovery.
    - If needed, User can edit the name and emeil in the Profile Section.

- **Event Browsing**:  
  Users can search or filter events and switch to a calendar view for a more organized display of upcoming events.

- **Event Registration**:  
  After registering for an event, users must wait for Admin approval. Once approved, the "View Details" button will become active.

- **Viewing Event Details**:  
  Clicking "View Details" shows all event information, including ticket types such as VIP and General Admission, with their respective prices.

- **Ticket Purchase**:  
  At the bottom of the event details page, a "Buy Tickets" button will be available. Clicking it takes users to the ticket selection page, where they can choose the ticket type and quantity.

- **Checkout & Payment**:  
  After selecting the tickets, users will proceed to the checkout page, followed by the payment gateway for finalizing the purchase.

- **Confirmation & Email Notification**:  
  Once the payment is successful, users will receive a confirmation email with ticket details.

- **Manage Registrations**:  
  Users can view their registered events, track purchased or canceled tickets, and cancel tickets if needed.

- **Contact Page**:  
  Users can send messages or queries regarding events via the contact page.

## Tech Stack
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe

## Admin Functionalities
- Create Events/Event Details, Tickets
- Access to Edit/Delete the events
- Approves the Registered Users in the Event Dashboard Section
- Manages the Ticket Dashboard where all the tickets will be available including the cancelled tickets
- Access to view the Event Analytics for each event like total tickets sold, total revenue, VIP/General Attendance Rate, Ticket Sales Breakdown

## User Functionalities
- Register for events and access detailed event information.
- Purchase event tickets.
- View the status of registered events, including Approved or Rejected events.
- View all tickets purchased by the logged-in user.
- Edit and update personal details such as name and email as needed.

## Payment Integration
- **Stripe**: Manages payments through credit/debit cards.
- Currently using test mode, so use the card number `4242 4242 4242 4242` for testing purposes. The expiry date and CVV can be any valid values of your choice.

## Frontend Details
The frontend is built using React, with TailwindCSS for styling. Key features include:

- **Admin**:
    - **Home Page**: Displays all events, along with event analytics and a calendar view.
    - **Create Event**: Allows admins to create events with basic information.
    - **Create Event Details**: Enables admins to add detailed descriptions for events.
    - **Create Ticket**: Admins can create tickets for each event, specifying different ticket types.
    - **Event Dashboard**: Manages registered users, including the ability to approve or reject registrations.
    - **Ticket Dashboard**: View and manage all tickets purchased by users.

- **User**:
    - **Home Page**: Displays all events, with options to view event details and a calendar view for upcoming events.
    - **My Events**: Shows details of registered events, including their approval or rejection status by the admin.
    - **My Tickets**: Displays all purchased or canceled tickets for the logged-in user.
    - **Profile**: Allows users to edit and update personal information, such as name and email.
    - **Contact**: Provides details about Eventozor and allows users to send messages or inquiries about events.


## Backend Details
The backend is powered by Node.js and Express, with routes to manage user authentication, events, ticket purchases, and payments.

## Deployed URL
- FrontEnd: `https://event-management7.netlify.app`
- BackEnd - `https://online-event-management-platform.onrender.com`
