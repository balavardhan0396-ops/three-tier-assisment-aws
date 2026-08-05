pipeline {

    agent any

    environment {
        FRONTEND_IMAGE = "employee-frontend:v1"
        BACKEND_IMAGE  = "employee-backend:v1"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                bat 'docker compose down'
            }
        }

        stage('Deploy Application') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker ps'
            }
        }

    }

    post {

        always {
            echo 'Pipeline Finished'
        }

        success {
            echo 'Application Deployed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}
