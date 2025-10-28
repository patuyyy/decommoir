pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_NAME = "decommoir-backend"
        CONTAINER_NAME = "decommoir_backend"
        EXPRESS_ENV = credentials('decommoir_backend_env')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/patuyyy/decommoir.git'
            }
        }

        stage('Create .env') {
            steps {
                dir('backend') {
                    sh 'echo "$EXPRESS_ENV" > .env'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
                    docker stop $CONTAINER_NAME
                    docker rm $CONTAINER_NAME
                fi
                docker run -d --name $CONTAINER_NAME --env-file backend/.env -p 3000:3000 $IMAGE_NAME
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
