pipeline {
    agent { label 'docker' }

    environment {
        BACKEND_IMAGE   = "patuyyy/decommoir-backend"
        BACKEND_CONT    = "decommoir_backend"

        FRONTEND_IMAGE  = "patuyyy/decommoir-frontend"
        FRONTEND_CONT   = "decommoir_frontend"

        EXPRESS_ENV = credentials('decommoir_backend_env')
        IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        
        BACKEND_ENV_PATH = "${WORKSPACE}/backend/.env"
        FRONTEND_ENV_PATH = "${WORKSPACE}/frontend/.env"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/patuyyy/decommoir.git'
            }
        }

        stage('Create Backend .env') {
            steps {
                withCredentials([file(credentialsId: 'decommoir_backend_env', variable: 'BACKEND_SECRET_ENV')]) {
                    sh 'rm -f $BACKEND_ENV_PATH'
                    sh "cp $BACKEND_SECRET_ENV ${BACKEND_ENV_PATH}"
                }
            }
        }

        stage('Create Frontend .env') {
            steps {
                withCredentials([file(credentialsId: 'decommoir_frontend_env', variable: 'FRONTEND_SECRET_ENV')]) {
                    sh 'rm -f $FRONTEND_ENV_PATH'
                    sh "cp $FRONTEND_SECRET_ENV ${FRONTEND_ENV_PATH}"
                    sh 'cat $FRONTEND_ENV_PATH'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} .'
                    sh 'docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh """
                docker rm -f ${BACKEND_CONT} || true

                docker run -d \
                    --name ${BACKEND_CONT} \
                    --env-file ${BACKEND_ENV_PATH} \
                    -p 3000:3000 \
                    ${BACKEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} .'
                    sh 'docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh """
                docker rm -f ${FRONTEND_CONT} || true

                docker run -d \
                    --name ${FRONTEND_CONT} \
                    -p 5173:80 \
                    ${FRONTEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }
    }
    post {
        success {
            echo "Success! Deployed ${BACKEND_IMAGE}:${IMAGE_TAG} and ${FRONTEND_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "Failed to deploy."
        }
        always {           
            sh 'docker image prune -f'
        }
    }
}