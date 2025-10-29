pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_BASE_NAME = "patuyyy/decommoir-backend" 
        CONTAINER_NAME = "decommoir_backend"
        EXPRESS_ENV = credentials('decommoir_backend_env')
        IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        
        ENV_FILE_PATH = "${WORKSPACE}/backend/.env"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/patuyyy/decommoir.git'
            }
        }

        stage('Create .env (on Host)') {
            steps {
                dir('backend') 
                    writeFile file: '.env', text: "$EXPRESS_ENV"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${IMAGE_BASE_NAME}:${IMAGE_TAG} .'
                    sh 'docker tag ${IMAGE_BASE_NAME}:${IMAGE_TAG} ${IMAGE_BASE_NAME}:latest'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                # Hapus kontainer lama (jika ada)
                docker rm -f $CONTAINER_NAME || true
                
                # Jalankan kontainer baru, merujuk ke path ABSOLUT dari .env di host
                docker run -d --name $CONTAINER_NAME --env-file ${ENV_FILE_PATH} -p 3000:3000 ${IMAGE_BASE_NAME}:${IMAGE_TAG}
                """
            }
        }
    }
    post {
        success {
            echo "Success! Deployed ${IMAGE_BASE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "Failed to deploy backend."
        }
        always {
            echo "Cleaning up .env file..."
            sh 'rm -f ${ENV_FILE_PATH}'
            
            sh 'docker image prune -f'
        }
    }
}