pipeline {
    agent any

    triggers {
        githubPush() 
    }

    environment {
        DOCKER_IMAGE = "decommoir-backend:latest"
        CONTAINER_NAME = "decommoir-backend"
        BACKEND_DIR = "backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    credentialsId: 'github-token', 
                    url: 'https://github.com/patuyyy/decommoir.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d --name $CONTAINER_NAME -p 3000:3000 $DOCKER_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo "Success! Backend deployed."
        }
        failure {
            echo "Failed to deploy backend."
        }
    }
}
