Link to live https://e-comm-pm9f.onrender.com
If you want to run this project on local-host, just install packages and change .env values to yours.
---
.env values for backend: 
MONGODB_URI = 
PORT = 
JWT_SECRET = 
NODE_ENV = 'development' (initially "development", change to "production" if you want to deploy it on live)
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_SECRET_KEY = 
STRIPE_SECRET_KEY = 
FRONT_URL = 'http://localhost:5173' (initially 'http://localhost:5173', change it on front address where you deployed you site)
----
.env values for front:
VITE_BACKEND_URL = "http://localhost:5000" (same thing as in FRONT_URL, but here you should add you back url)
VITE_STRIPE_PUBLIC_KEY = 
-------------------------
RU

Ссылка на сайт https://e-comm-pm9f.onrender.com
Если вы хотите запустить данный проект на local-host, вам нужно установить пакеты для работы и создать .env файл и внести туда значения 
---
.env значения для backend: 
MONGODB_URI = 
PORT = 
JWT_SECRET = 
NODE_ENV = 'development' (изначальное значение "development", поменяйте на "production" если вы хотите развернуть сайт на хостинге)
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_SECRET_KEY = 
STRIPE_SECRET_KEY = 
FRONT_URL = 'http://localhost:5173' (изначальное значение 'http://localhost:5173', поменяйте его на ссылку для фронт части, там где вы захостили сайт)
----
.env значения для frontend:
VITE_BACKEND_URL = "http://localhost:5000" (тоже самое, что и с FRONT_URL, но тут добавляйте ссылку на бэк)
VITE_STRIPE_PUBLIC_KEY = 
