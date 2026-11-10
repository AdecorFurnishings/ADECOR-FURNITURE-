import os
import shutil
from PIL import Image, ImageOps, ImageFilter
import numpy as np

# Destination dirs
base_dir = "public/images"
os.makedirs(f"{base_dir}/logo", exist_ok=True)
os.makedirs(f"{base_dir}/blinds", exist_ok=True)
os.makedirs(f"{base_dir}/curtains", exist_ok=True)
os.makedirs(f"{base_dir}/clients", exist_ok=True)
os.makedirs(f"{base_dir}/gallery", exist_ok=True)
os.makedirs(f"{base_dir}/services", exist_ok=True)
os.makedirs(f"{base_dir}/sofa", exist_ok=True)
os.makedirs(f"{base_dir}/hero", exist_ok=True)
os.makedirs(f"{base_dir}/contact", exist_ok=True)

# Helper function to crop and save
def save_crop(img, box, path, quality=95):
    cropped = img.crop(box)
    cropped.save(path, quality=quality)
    print(f"Saved: {path} ({cropped.size[0]}x{cropped.size[1]})")

# Load extracted PDF pages
p1 = Image.open('extracted_pdf_pages/page_1.jpg')
p2 = Image.open('extracted_pdf_pages/page_2.jpg')
p3 = Image.open('extracted_pdf_pages/page_3.jpg')
p4 = Image.open('extracted_pdf_pages/page_4.jpg')
p5 = Image.open('extracted_pdf_pages/page_5.jpg')
p6 = Image.open('extracted_pdf_pages/page_6.jpg')

# 1. Logo
save_crop(p1, (1800, 80, 2460, 315), f"{base_dir}/logo/logo.png")

# 2. QR Code
save_crop(p1, (2130, 3160, 2435, 3465), f"{base_dir}/contact/qr_code.png")

# 3. Hero Images
save_crop(p1, (1280, 380, 2550, 1495), f"{base_dir}/hero/hero_sofa_vortex.jpg")
save_crop(p5, (1180, 440, 2550, 1540), f"{base_dir}/hero/bedroom_chandelier.jpg")
save_crop(p2, (1230, 410, 2550, 1530), f"{base_dir}/hero/tufted_wall_sofa.jpg")

# 4. Services
save_crop(p1, (1740, 1650, 2480, 2220), f"{base_dir}/services/blinds.jpg")
save_crop(p2, (1740, 2340, 2480, 2920), f"{base_dir}/services/wall_panel.jpg")
save_crop(p1, (900, 1650, 1650, 2220), f"{base_dir}/services/designer_headboards.jpg")
save_crop(p2, (70, 1650, 860, 2870), f"{base_dir}/services/curtains.jpg")
save_crop(p1, (70, 1650, 820, 2220), f"{base_dir}/services/wallpaper.jpg")
save_crop(p2, (900, 2340, 1650, 2920), f"{base_dir}/services/flooring.jpg")

# 5. Gallery
save_crop(p2, (1230, 410, 2550, 1530), f"{base_dir}/gallery/gallery_hero_tufted.jpg")
save_crop(p2, (70, 1650, 860, 2870), f"{base_dir}/gallery/furnishing_curtain_blue.jpg")
save_crop(p2, (900, 1650, 1650, 2240), f"{base_dir}/gallery/wallpaper_3d_sphere.jpg")
save_crop(p2, (1740, 1650, 2480, 2240), f"{base_dir}/gallery/blinds_fan_fold.jpg")
save_crop(p2, (900, 2340, 1650, 2920), f"{base_dir}/gallery/flooring_hardwood.jpg")
save_crop(p2, (1740, 2340, 2480, 2920), f"{base_dir}/gallery/wallpanel_grey_horizontal.jpg")

# 6. Blinds (12 styles) - tight crops of blind fabric
blind_grid = [
    [("hobbled", (135, 810, 630, 1285)),
     ("back_slat", (715, 810, 1210, 1285)),
     ("waterfall", (1305, 810, 1800, 1285)),
     ("front_slat", (1890, 810, 2380, 1285))],
    [("relaxed", (135, 1595, 630, 2065)),
     ("motorized", (715, 1595, 1210, 2065)),
     ("flat", (1305, 1595, 1800, 2065)),
     ("slouched", (1890, 1595, 2380, 2065))],
    [("butterfly", (135, 2375, 630, 2855)),
     ("box_pleat_balloon", (715, 2375, 1210, 2855)),
     ("austrian", (1305, 2375, 1800, 2855)),
     ("shirred_balloon", (1890, 2375, 2380, 2855))]
]

for row in blind_grid:
    for name, box in row:
        save_crop(p3, box, f"{base_dir}/blinds/{name}.jpg")

# 7. Curtain pleats (13 styles)
curtain_items = [
    # Row 0
    ("double_pinch_pleat", (730, 810, 1275, 1270)),
    ("triple_pinch_pleat", (1320, 810, 1870, 1270)),
    ("ripple_fold", (1950, 810, 2435, 1270)),
    # Row 1
    ("fan_fold_pleat", (135, 1395, 690, 1855)),
    ("goblet_pleat", (730, 1395, 1275, 1855)),
    ("inverted_box_pleat", (1320, 1395, 1870, 1855)),
    ("tailored_pleat", (1950, 1395, 2435, 1855)),
    # Row 2
    ("pinch_pleat", (135, 1975, 690, 2435)),
    ("inverted_pleat", (730, 1975, 1275, 2435)),
    ("grommet", (1320, 1975, 1870, 2435)),
    ("goblet", (1950, 1975, 2435, 2435)),
    # Row 3
    ("cubicle", (135, 2555, 690, 3015)),
    ("rod_pocket", (730, 2555, 1275, 3015)),
]

for name, box in curtain_items:
    save_crop(p4, box, f"{base_dir}/curtains/{name}.jpg")

# 8. Clients (9 logos)
client_items = [
    ("hilton", (110, 1600, 720, 2090)),
    ("apollo_hospitals", (880, 1570, 1500, 2090)),
    ("tvs", (1650, 1640, 2420, 2090)),
    ("dlf", (110, 2120, 720, 2560)),
    ("nippo", (880, 2120, 1500, 2560)),
    ("vels_university", (1580, 2120, 2440, 2560)),
    ("radisson", (110, 2600, 720, 3040)),
    ("ramada", (880, 2600, 1500, 3040)),
    ("ideal", (1650, 2600, 2420, 3040)),
]

# Function to remove solid greige background and make transparent
def make_transparent_logo(crop_img, bg_color=(211, 208, 201), tolerance=28):
    img = crop_img.convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    # mask of background
    diff = np.sqrt((r.astype(float) - bg_color[0])**2 + 
                   (g.astype(float) - bg_color[1])**2 + 
                   (b.astype(float) - bg_color[2])**2)
    mask = diff < tolerance
    data[:,:,3] = np.where(mask, 0, 255)
    return Image.fromarray(data)

for name, box in client_items:
    cropped = p5.crop(box)
    cropped.save(f"{base_dir}/clients/{name}.png")
    try:
        trans = make_transparent_logo(cropped)
        trans.save(f"{base_dir}/clients/{name}_transparent.png")
    except Exception as e:
        print(f"Transparency failed for {name}: {e}")

# 9. Contact Map
save_crop(p6, (1100, 410, 2550, 1530), f"{base_dir}/contact/map_nandanam.jpg")

print("All client brochure assets processed successfully into public/images!")
