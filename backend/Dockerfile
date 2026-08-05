version: "3.9"

services:

  mysql:
    image: mysql:8.0
    container_name: employee-mysql

    restart: always

    environment:
      MYSQL_ROOT_PASSWORD: ShashikalA@1994
      MYSQL_DATABASE: employee_db

    ports:
      - "3306:3306"

    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql

    networks:
      - employee-network


  backend:
    build:
      context: ./backend

    container_name: employee-backend

    restart: always

    depends_on:
      - mysql

    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: ShashikalA@1994
      DB_NAME: employee_db
      PORT: 5000

    ports:
      - "5000:5000"

    networks:
      - employee-network


  frontend:
    build:
      context: ./frontend

    container_name: employee-frontend

    restart: always

    depends_on:
      - backend

    ports:
      - "3000:80"

    networks:
      - employee-network


volumes:
  mysql_data:


networks:
  employee-network:
    driver: bridge
