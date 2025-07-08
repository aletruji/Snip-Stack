# Snippet-Full

You can access the app at:
https://snippet-app.com

Test account:
Email: test@mail.com
Password: test123

Project Description
Snippet App is a web application for managing and organizing code snippets. Users can register, log in, and create, edit, or delete their personal snippets.

Hosting and Architecture
The application is fully hosted on AWS:

Frontend: React app hosted on S3 and delivered via CloudFront with HTTPS

Backend: Java Spring Boot API running on an EC2 instance

Domain: Managed via Route 53

TLS Certificate: Provided by AWS Certificate Manager and integrated with CloudFront

The entire infrastructure is managed using Terraform.


![Screenshot 2025-07-08 203240](https://github.com/user-attachments/assets/15d6fcec-b350-4d75-b062-9021aff60974)


Features
Add a new snippet by clicking on a language and then on "Add Snippet"

Edit a snippet by double-clicking the snippet field or clicking the edit icon

Copy snippet content by clicking the copy icon

Resize a snippet card by double-clicking its border

Switch between light and dark mode using the toggle in the header


![Screenshot 2025-07-08 203910](https://github.com/user-attachments/assets/28759fdc-56ef-4e8f-9ea3-92c3486f20f9)


**Snippet-Full** is a full-stack application built with **React** (frontend) and **Spring Boot
** (backend).  
It serves as a personal **code snippet repository**, allowing users to register, log in, and manage their own collection of code snippets in a private library.

##  Tech Stack

- **Frontend**: React (located in `/snippet-app`)
- **Backend**: Spring Boot (located in `/sn`)
- **Database**: MySQL with Hibernate (JPA)

##  Features

- User registration and login
- Personalized snippet library
- Code snippet creation, editing, and search
- Clean and minimal UI
- Persistent data storage via Hibernate + MySQL



