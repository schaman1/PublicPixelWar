import cv2
import os

# === CONFIGURATION ===
chemin_images = "C:\\Users\\timotheenobilet\\Downloads\\node-v18.20.3-win-x64\\node-v18.20.3-win-x64\\images"
nom_sortie = "video_rapide.mp4"
fps = 10  # 0.1 seconde par image = 10 FPS

# === RÉCUPÉRATION DES IMAGES DANS L'ORDRE ===
images = [f for f in sorted(os.listdir(chemin_images)) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

# Vérifie qu'on a bien des images
if not images:
    raise ValueError("Aucune image trouvée dans le dossier spécifié.")

# Lis la première image pour obtenir les dimensions
img0 = cv2.imread(os.path.join(chemin_images, images[0]))
hauteur, largeur, _ = img0.shape

# Initialise la vidéo
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
video = cv2.VideoWriter(nom_sortie, fourcc, fps, (largeur, hauteur))

# Ajoute les images une par une
for nom in images:
    chemin = os.path.join(chemin_images, nom)
    img = cv2.imread(chemin)
    if img is None:
        print(f"Image non lisible : {nom}")
        continue
    img = cv2.resize(img, (largeur, hauteur))  # Sécurité si certaines tailles diffèrent
    video.write(img)

# Termine l'écriture
video.release()
print("✅ Vidéo créée ici :", os.path.abspath("video_rapide.mp4"))
