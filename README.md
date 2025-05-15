# Bynry Services Backend Developer Intern Case Study

## Project Overview
![image](https://github.com/user-attachments/assets/280eb5a9-1d00-4fed-b652-805097f310a8)
![image](https://github.com/user-attachments/assets/3147baa5-95d8-49d7-bce4-9fca664cea76)
![image](https://github.com/user-attachments/assets/4efb7925-443b-4768-9b7d-d6b97a8203a5)
![image](https://github.com/user-attachments/assets/8fe804ed-9ae5-4044-a3aa-ee9eaa0a19cb)
![image](https://github.com/user-attachments/assets/a03688ea-7492-43b0-bf8b-e5290e94863f)


This project is a Django-based web application developed to address a real-world problem faced by a gas utility company. The company was struggling with a high volume of customer service requests, leading to long wait times and poor customer experience.

The application allows customers to:

- Submit service requests online (including selecting request types, providing details, and attaching files)  
- Track the status of their requests, including submission and resolution timestamps  
- View their account information  

Customer support representatives can also manage and respond to these requests efficiently through the system.

---

## Task Description

The gas utility company needed a system that could handle a large number of service requests smoothly and provide transparent request tracking for customers. This Django app was developed to meet those needs, with key features such as:

- **Service Requests:** Customers can create detailed service requests with file attachments.  
- **Request Tracking:** Customers can view the status and timelines of their requests.  
- **User Management:** Account info and role-based access (customers and support staff).  
- **Admin Tools:** Support representatives have tools to manage and respond to requests.  

---

## My Approach and Learning

I come from a background with experience in **Spring Boot** for backend development. Since this project required Django (which was new for me), I used AI tools like **ChatGPT** and **Bolt** to learn Django concepts and complete the task effectively.

This project helped me:

- Understand the Django REST Framework and how it compares to Spring Boot (e.g., models vs entities, serializers vs DTOs)  
- Build REST APIs with class-based views and routing  
- Manage authentication and permissions in Django  
- Integrate a React frontend (with TypeScript) to consume these APIs, managing global state and routing  
- Structure a maintainable Django codebase following best practices  

---

## Project Structure

### Backend (Django):

- Models represent database entities  
- ViewSets handle API endpoints  
- Serializers handle data validation and transformation  
- URL routing is done via Django's router system  
- Session-based authentication  

### Frontend (React):

- Components for UI, forms, and request display  
- Context API for authentication state management  
- API layer to communicate with backend  
- Role-based access control for customers and admins  

---

## How to Run Locally

1. Clone the repo  
2. Backend setup:

   ```bash
   pip install -r requirements.txt
   cd backend
   python manage.py migrate
   python manage.py runserver
    ```

3. Frontend setup:

   ```bash
   cd frontend
   bun install or npm install
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to access the app

---

## Tools & Technologies Used

* Django & Django REST Framework
* React with TypeScript
* Axios for REST API calls
* ChatGPT and Bolt for learning and development assistance
* Git and GitHub for version control

---

## Final Thoughts

While I started this project with more experience in Spring Boot, I embraced the challenge of learning Django and delivering a fully functional backend with a React frontend. This project reflects my dedication to learning and adapting to new technologies, as well as my problem-solving approach for real-world applications.

I welcome any feedback or suggestions!

---

*Thank you for visiting my project!*

```

