# Utiliser une image Python officielle, version allégée
FROM python:3.10-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier des dépendances
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le reste du code source du backend
COPY . .

# Exposer le port sur lequel FastAPI va tourner
EXPOSE 8000

# Commande par défaut pour démarrer le serveur FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]