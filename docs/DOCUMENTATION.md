# 📘 Spotlite App Documentation

## 1. Introduction

Spotlite is a platform built for artists, content creators and influencers to show who they are, share their social presence and interests, showcase their talents, connect with others, and engage through posts, events, likes, comments, and more.

### Key Features

- Create/Edit profile containing bio, social links, interests, Q&As
- Create and view posts with media
- Create and browse events with media
- Browse events by followers, following, nearby events, upcoming events, events based on interest
- Like, comment on posts
- Add interests on events
- Follow/unfollow users
- Search the users, posts, events on the platform
- Get notifications for likes, comments, follows.
- JWT-based authentication

### Tech Stack

- **Frontend-mobile app**:&#x20;
  1. React Native using Expo
  2. Routing: Expo Router
  3. State management: Redux Toolkit
  4. Styling: NativeWind
  5. React Hook Form
- **Backend**:&#x20;
  1. Django ORM
  2. Django REST Framework for APIs
  3. Database: PostgreSQL
  4. Authentication: Django Rest Framework Simple JWT
- **Frontend- web version** (For DisplayProfile page, FAQs, T&Cs etc):&#x20;
  1. NextJS
  2. Routing: App Router&#x20;
  3. &#x20;Styling: Tailwind

---

## 2. Project Structure

### Frontend

```
Spotlite/
├──app/
|  ├── (app)/        # Main app screens (home, profile, events, create etc.)
|  ├── (auth)/       # Authentication (signup, login)
├── components/      # Reusable components (buttons, modals, Post/event list and excerpts etc.)
├── contexts/        # Toasts
├── slices/          # Redux slices like authSlice, postsSlice, eventsSlice etc.
├── utililities/     # Utility functions
├── store/           # Store provider
├── api.js/          # Interceptor with baseURL and instance


```

### Backend

```
backend/
├── appusers/          # Django app with Userprofile model and logic
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
├── backend/           # Default app containing settings, main urls etc.
├── connections/       # userconnection model and logic
├── events/            # Events and related models and logic
├── media/             # Uploaded media files
├── notifications/     # Notifications and related models and logic
├── posts/             # Posts and related models and logic
├── search_service/    # Custom Search model and logic
```

---

## 3. Setup Instructions

### Prerequisites

- Node.js & npm
- Expo CLI
- Python 3.10+
- PostgreSQL

### Backend Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install django
django-admin startproject backend
cd backend
python manage.py runserver
python manage.py startapp appusers
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
pip install -r requirements.txt
(django-cors-headers           4.4.0
 djangorestframework           3.15.2
 djangorestframework-simplejwt 5.3.1
 pillow                        11.0.0
 pip                           23.2.1
 psycopg2                      2.9.9
 python-dotenv                 1.1.0)
Configure database in settings.py
Configure jwt in settings.py
```

### Frontend Setup

```bash
npx create-expo-app@latest
Name: Spotlite
cd Spotlite
npx expo install expo-dev-client
npx expo start
npm install -g eas-cli
Additional dependencies can be found in `package.json`

Configure nativewind

Login or Signup for expo account (go to expo.dev)
eas login (Enter username and password)
eas init (Type yes and press Enter)
eas build:configure (Select all)
eas build --platform android --profile development
(Enter app ID and Enter Y for android keystore)
(After the build is finished, install the app on phone using the link provided in expo.dev)
npx expo start -c

Setup and configure expo push token for notifications (Check expo docs)
```

## Development Commands

**For mobile app:**

cd Spotlite
npx expo start -c

**For web version using next.js:**

cd spotlite-web
npm run dev

**For backend:**

venv\Scripts\activate
cd backend
python manage.py runserver

### Environment Variables

🔐 Frontend (Spotlite/.env)

- \# Used by Axios for API requests.

  EXPO_PUBLIC_API_BASE_URL=[http://192.168.1.34:8000](http://192.168.1.34:8000)

🛠 Backend (backend/.env or set in settings.py)

- \# General

  DEBUG=True

  SECRET_KEY='django-insecure-\_6\@cs_5jh9zj+5^mfiuj&6=(v#l0yqhv1ub4e6tmd+ujdmow9a'

- \# Allowed Hosts

  ALLOWED_HOSTS=localhost,127.0.0.1,192.168.1.33,192.168.1.35,192.168.1.36,192.168.1.34,192.168.1.37

- \# Database

  DB_NAME='spotlite'

  DB_USER='postgres'

  DB_PASSWORD='1234'

  DB_HOST='localhost'

  DB_PORT='5432'

- \# CORS

  CORS_ALLOWED_ORIGINS=http\://localhost:5173,[http://127.0.0.1:5173,http://localhost:19000,http://127.0.0.1:19000,http://192.168.1.33:8081,http://192.168.1.33:8000,http://192.168.1.35:8081,http://192.168.1.35:8000,http://10.0.2.2:8081,http://192.168.1.34:3000,http://192.168.1.35:3000,http://192.168.1.33:3000](http://127.0.0.1:5173,http://localhost:19000,http://127.0.0.1:19000,http://192.168.1.33:8081,http://192.168.1.33:8000,http://192.168.1.35:8081,http://192.168.1.35:8000,http://10.0.2.2:8081,http://192.168.1.34:3000,http://192.168.1.35:3000,http://192.168.1.33:3000)

- \# Site URL (optional, useful for emails or frontend redirects)

  SITE_URL=http\://localhost:8000

---

## 4. Authentication

### Flow

- Signup → Login → JWT Token → SecureStore
- Token used in headers for API requests

### Public vs Protected Routes

- `(auth)` → public (login, signup, welcome)
- `(app)` → private (home, events, search, notifications, profile, create, menu etc.)

---

## 5. API Endpoints

### Base URL

```
http://<your-backend-domain>/api/
```

### Common Endpoints

- `/auth/login/`
- `/auth/signup/`
- `/posts/`
- `/events/`
- `/users/<id>/`
- `/follow/`

(Sample requests & responses will be added here)

---

## 6. State Management (Redux)

- `authSlice`: handles register, login/logout and logged-in user state

- userProfileSlice: fetch/add/edit profile

- postsSlice: fetch/add/delete posts, like, comment

- eventsSlice: fetch/add/delete events, interests

- userConnectionsSlice: fetch/add followers, following

- searchSlice: handles searching of users, posts, events

- notificationsSlice: handles notifications for likes, comments, follows

- Uses `createEntityAdapter` for normalized state

7. 🚀 Core Features

1) 🧑‍🎤 User Profiles

Users can personalize and manage their presence:

**Features:**

- Create/Edit profile with:
  - Profile picture, Bio, Social links, Social stats, Interests, Q&As
- View others’ public profiles

**Frontend:**

- Screens: (app)/tabs/userprofile, (app)/(complete-profile), (app)/(edit-profile), (app)/display-profile
- Components:&#x20;
  - components/UserProfile
  - components/OthersProfile
- Slice: slices/userProfileSlice.js,&#x20;

**Backend:**

- App: appusers/
- Files: models.py, serializers.py, views.py, urls.py

2. &#x20;User Connections

Users can follow/unfollow other users on the platform:

**Features:**

- Follow/Unfollow users
- View own and others' followers/following lists

**Frontend:**

- Screens: (app)/(user-connections), (app)/(others-connections)
- Components: components/NameProfilePic.jsx
- Slice: slices/userConnectionsSlice.js

**Backend:**

- App: connections/
- Files: models.py, serializers.py, views.py, urls.py

3. 🖼️ Posts

Users can share content and engage with others.

**Features:**

- Create/delete posts (text, image, video, audio)
- View other user's posts
- Like/Unlike posts
- Comment system&#x20;

**Frontend:**

- Screens: (app)/tabs/home, (app)/(create)/create-post, (app)/(display-posts), (app)/post

- Components:&#x20;

  - components/Posts
  - components/Buttons/PostButtons
  - components/Buttons/UserPostButtons.jsx
  - components/Modals/LikesModal
  - components/Modals/CommentsModal

- Slice: slices/postsSlice.js

**Backend:**

- App: posts/
- Files: models.py, serializers.py, views.py, urls.py

4. &#x20;📅 Events

Users can create, add interests/comment on events.

**Features:**

- Create/delete event (title, description, location, date, time, link, media, domain)
- Browse/filter events by: location, date (upcoming), interest, followers, followees.
- Express interest
- Comment on events

**Frontend:**

- Screens: Screens: (app)/tabs/events, (app)/(create)/create-event, (app)/(display-events), (app)/event, (app)/display-event, (app)/display-user-event
- Components:&#x20;
  - components/Events
  - &#x20;components/Modals/InterestedModal
- Slice: slices/eventsSlice.js

**Backend:**

- App: events/
- Files: models.py, serializers.py, views.py, urls.py

5. &#x20;🔍 Search

Quickly find people, posts, or events.

**Features:**

- Search input for: display names, posts, events, interests

**Frontend:**

- Screens: (app)/(tabs)search
- Components:&#x20;
  - components/Search
- Slice: slices/searchSlice.js

**Backend:**

- App: search_service/
- Files: views.py, serializers.py, urls.py

6. &#x20;🔔 Notifications

Keep users engaged with updates.

**Features:**

- Like, comment, follow, event interest, event comment triggers a notification
- Push notifications via Expo (if enabled)

**Frontend:**

- Screens: (app)/(tabs)/notifications
- Components:
  - components/Notifications
- Slice: slices/notificationsSlice.js

**Backend:**

- App: notifications/
- Files: models.py, views.py, serializers.py, urls.py

7. &#x20;🔐 Authentication

Secure entry and route access.

**Features:**

- JWT token-based auth
- Store token with Expo SecureStore
- Public vs private route protection

**Frontend:**

- Screens: (auth)/signup, (auth)/login
- Utils: api.js, store.js, handleLogout.js
- Slice: slices/authSlice.js

**Backend:**

- Authentication: djangorestframework-simplejwt
- Config: settings.py, urls.py
- App: appusers/
- Files:  serializers.py, views.py, urls.py

8. Push Notifications

Useful for re-engagement.

**Features:**

- Expo push token registration
- Push triggered on new likes, comments, follows, event interest or event comment

**Frontend:**

- Util: NotificationListeners.jsx, registerForPushNotifications.js (custom Expo push registration)
- Setup: Follow Expo's Notifications Guide

(To be continued with sections on Sample API Request/Response, API endpoints, Navigation section, table of contents, Reusable Components, Deployment, Testing, Contributing Guidelines etc.)
