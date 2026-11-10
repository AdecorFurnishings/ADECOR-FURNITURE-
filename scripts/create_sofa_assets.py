import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

# Create high-resolution before and after sofa images (1200x800)
width, height = 1200, 800

def create_base_scene(is_after=False):
    # Background interior room
    img = Image.new("RGB", (width, height), (235, 232, 227) if not is_after else (242, 240, 237))
    draw = ImageDraw.Draw(img)
    
    # Wall and floor
    floor_y = 580
    wall_color = (215, 212, 206) if not is_after else (228, 225, 220)
    floor_color = (140, 110, 85) if not is_after else (160, 130, 100) # wood floor
    
    draw.rectangle([0, 0, width, floor_y], fill=wall_color)
    draw.rectangle([0, floor_y, width, height], fill=floor_color)
    
    # Floor boards
    for y in range(floor_y, height, 40):
        draw.line([0, y, width, y], fill=(120, 90, 70) if not is_after else (140, 110, 85), width=2)
    for x in range(0, width, 160):
        draw.line([x, floor_y, x - 80, height], fill=(120, 90, 70) if not is_after else (140, 110, 85), width=1)
        
    # Wall mouldings / panel lines
    draw.line([0, floor_y - 20, width, floor_y - 20], fill=(200, 197, 190), width=4)
    draw.line([0, floor_y, width, floor_y], fill=(180, 175, 168), width=3)
    
    # Window light gradient / ambient glow
    # Sofa shadow on floor
    shadow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.ellipse([180, 560, 1020, 680], fill=(40, 30, 20, 110 if not is_after else 80))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(25))
    img.paste(shadow_img, (0, 0), shadow_img)
    
    # Sofa body coordinates
    # Backrest:
    # Seat cushions:
    # Armrests:
    # Wooden legs:
    leg_color = (40, 25, 15)
    legs = [
        [240, 560, 265, 630],
        [400, 560, 420, 620],
        [780, 560, 800, 620],
        [935, 560, 960, 630]
    ]
    for lx1, ly1, lx2, ly2 in legs:
        draw.polygon([(lx1, ly1), (lx2, ly1), (lx2 - 8, ly2), (lx1 + 8, ly2)], fill=leg_color)
        
    sofa_surface = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    sofa_draw = ImageDraw.Draw(sofa_surface)
    
    if not is_after:
        # BEFORE: Worn, faded, stained camel/brown fabric with sagging and patches
        base_cushion = (165, 138, 110)
        shadow_cushion = (120, 95, 75)
        highlight_cushion = (185, 160, 130)
    else:
        # AFTER: Masterpiece luxury emerald / deep petrol or royal taupe velvet
        base_cushion = (60, 75, 78) # Rich designer slate petrol velvet
        shadow_cushion = (35, 48, 52)
        highlight_cushion = (95, 118, 122)
        
    # Sofa backrest curved shape
    sofa_draw.rounded_rectangle([220, 240, 980, 460], radius=40, fill=base_cushion)
    
    # Tufting / vertical channel stitches
    for cx in range(290, 940, 80):
        sofa_draw.line([cx, 260, cx, 440], fill=shadow_cushion, width=4)
        sofa_draw.line([cx + 2, 260, cx + 2, 440], fill=highlight_cushion, width=2)
        
    # Armrests (plump and rounded)
    # Left arm:
    sofa_draw.rounded_rectangle([190, 320, 280, 520], radius=35, fill=base_cushion)
    sofa_draw.rounded_rectangle([195, 325, 275, 515], radius=30, fill=highlight_cushion)
    sofa_draw.rounded_rectangle([205, 335, 270, 510], radius=25, fill=base_cushion)
    
    # Right arm:
    sofa_draw.rounded_rectangle([920, 320, 1010, 520], radius=35, fill=base_cushion)
    sofa_draw.rounded_rectangle([925, 325, 1005, 515], radius=30, fill=highlight_cushion)
    sofa_draw.rounded_rectangle([930, 335, 995, 510], radius=25, fill=base_cushion)
    
    # Base apron frame:
    sofa_draw.rounded_rectangle([230, 480, 970, 570], radius=20, fill=shadow_cushion)
    
    # 3 Plump seat cushions:
    c_widths = [(265, 490), (490, 710), (710, 935)]
    for i, (cx1, cx2) in enumerate(c_widths):
        # Cushion body
        sofa_draw.rounded_rectangle([cx1, 410, cx2, 530], radius=25, fill=base_cushion)
        # Highlight top
        sofa_draw.rounded_rectangle([cx1 + 5, 415, cx2 - 5, 470], radius=20, fill=highlight_cushion)
        sofa_draw.rounded_rectangle([cx1 + 10, 430, cx2 - 10, 520], radius=18, fill=base_cushion)
        # Piping border
        sofa_draw.rounded_rectangle([cx1, 410, cx2, 530], radius=25, outline=shadow_cushion, width=3)
        
    # Add distressed marks or luxury sheen
    if not is_after:
        # Scratches, worn fabric fading, sagging seams
        for _ in range(35):
            sx = np.random.randint(280, 920)
            sy = np.random.randint(350, 520)
            sofa_draw.line([sx, sy, sx + np.random.randint(-25, 25), sy + np.random.randint(-15, 15)], 
                          fill=(130, 105, 85, 180), width=np.random.randint(1, 3))
        # Sagging stain / fade center
        fade = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        f_draw = ImageDraw.Draw(fade)
        f_draw.ellipse([340, 430, 460, 500], fill=(130, 105, 80, 80))
        f_draw.ellipse([540, 420, 680, 510], fill=(120, 95, 75, 90))
        fade = fade.filter(ImageFilter.GaussianBlur(15))
        sofa_surface.paste(fade, (0, 0), fade)
    else:
        # Luxury sheen and crisp tailored piping
        sheen = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        s_draw = ImageDraw.Draw(sheen)
        s_draw.ellipse([300, 270, 900, 360], fill=(140, 170, 175, 40))
        for cx1, cx2 in c_widths:
            s_draw.ellipse([cx1 + 20, 420, cx2 - 20, 470], fill=(150, 180, 185, 55))
        sheen = sheen.filter(ImageFilter.GaussianBlur(12))
        sofa_surface.paste(sheen, (0, 0), sheen)
        
        # Add accent designer cushions (gold & ivory)
        # Left cushion
        sofa_draw.polygon([(260, 380), (350, 340), (370, 440), (280, 480)], fill=(185, 155, 95))
        sofa_draw.polygon([(270, 390), (340, 355), (355, 435), (285, 470)], fill=(210, 180, 115))
        # Right cushion
        sofa_draw.polygon([(830, 340), (920, 380), (900, 480), (810, 440)], fill=(225, 220, 210))
        sofa_draw.polygon([(840, 355), (910, 390), (895, 470), (825, 435)], fill=(245, 242, 235))
        
    img.paste(sofa_surface, (0, 0), sofa_surface)
    
    # Overlay watermark / label badge
    badge_draw = ImageDraw.Draw(img)
    badge_text = "ORIGINAL CONDITION (BEFORE)" if not is_after else "A-DECOR BESPOKE REFURBISHED (AFTER)"
    badge_bg = (50, 45, 40, 200) if not is_after else (25, 40, 35, 220)
    badge_draw.rectangle([40, 40, 420 if not is_after else 480, 80], fill=badge_bg[:3])
    badge_draw.text((55, 52), badge_text, fill=(255, 255, 255))
    
    return img

img_before = create_base_scene(is_after=False)
img_before.save("public/images/sofa/sofa_before.jpg", quality=95)
print("Saved sofa_before.jpg")

img_after = create_base_scene(is_after=True)
img_after.save("public/images/sofa/sofa_after.jpg", quality=95)
print("Saved sofa_after.jpg")
