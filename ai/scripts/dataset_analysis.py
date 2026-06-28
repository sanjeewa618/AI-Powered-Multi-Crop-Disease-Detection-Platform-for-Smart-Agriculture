import os

# Dataset path
DATASET_PATH = "../dataset/PlantVillage"

# Get all class folders
classes = [
    folder for folder in os.listdir(DATASET_PATH)
    if os.path.isdir(os.path.join(DATASET_PATH, folder))
]

print("=" * 50)
print("PlantVillage Dataset Analysis")
print("=" * 50)

print(f"\nTotal Classes : {len(classes)}\n")

total_images = 0

for cls in sorted(classes):
    class_path = os.path.join(DATASET_PATH, cls)

    images = [
        img for img in os.listdir(class_path)
        if img.lower().endswith((".png", ".jpg", ".jpeg"))
    ]

    count = len(images)
    total_images += count

    print(f"{cls:<40} {count}")

print("\n" + "=" * 50)
print(f"Total Images : {total_images}")
print("=" * 50)
