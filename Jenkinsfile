pipeline {
    agent any

    // 🔧 Configuración para entorno macOS (Homebrew + Docker Desktop)
    environment {
        PATH = "/opt/homebrew/bin:${env.PATH}"                          // Añade binarios de Homebrew
        DOCKER_HOST = "unix:///Users/alberto/.docker/run/docker.sock"   // Ruta al socket de Docker Desktop
        COMPOSE_PROJECT_NAME = "adj-demo"                               // Nombre del proyecto Docker Compose
    }

    stages {
        stage('Parando los servicios') {
            steps {
                script {
                    echo "🛑 Deteniendo servicios anteriores..."
                    sh '''
                        set +e
                        docker compose -p $COMPOSE_PROJECT_NAME down || true
                        set -e
                    '''
                }
            }
        }

        stage('Eliminando imágenes anteriores') {
            steps {
                script {
                    echo "🧹 Eliminando imágenes antiguas..."
                    sh '''
                        set +e
                        IMAGES=$(docker images --filter "label=com.docker.compose.project=$COMPOSE_PROJECT_NAME" -q)
                        if [ -n "$IMAGES" ]; then
                            echo "Eliminando imágenes del proyecto $COMPOSE_PROJECT_NAME..."
                            docker rmi -f $IMAGES || true
                        else
                            echo "No hay imágenes para eliminar."
                        fi
                        set -e
                    '''
                }
            }
        }

        stage('Clonando el repositorio') {
            steps {
                echo "📥 Descargando el código fuente desde SCM..."
                checkout scm
            }
        }

        stage('Construyendo y levantando los servicios') {
            steps {
                script {
                    echo "🚀 Construyendo y levantando contenedores..."
                    sh '''
                        docker compose -p $COMPOSE_PROJECT_NAME up --build -d
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ El pipeline se ejecutó correctamente.'
        }
        failure {
            echo '❌ El pipeline falló.'
        }
        always {
            echo '🔄 El pipeline ha finalizado.'
        }
    }
}
