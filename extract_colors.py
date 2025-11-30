import sys
from collections import Counter
from PIL import Image

def get_dominant_colors(image_path, num_colors=5):
    try:
        image = Image.open(image_path)
        image = image.resize((100, 100))  # Resize for faster processing
        pixels = list(image.getdata())
        # Filter out transparent pixels if any
        pixels = [p[:3] for p in pixels if len(p) == 3 or p[3] > 0]
        counts = Counter(pixels)
        dominant = counts.most_common(num_colors)
        return [f"#{r:02x}{g:02x}{b:02x}" for (r, g, b), count in dominant]
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_colors.py <image_path>")
        sys.exit(1)
    
    colors = get_dominant_colors(sys.argv[1])
    print("DOMINANT_COLORS_START")
    for c in colors:
        print(c)
    print("DOMINANT_COLORS_END")
