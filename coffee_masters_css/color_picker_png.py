from pathlib import Path
from PIL import Image
import numpy as np


home_dir = Path(__file__).parent.resolve()
cm_logo_file = home_dir / "img/coffee_masters_logo.png"

if not cm_logo_file.is_file():
    raise FileNotFoundError()

# Open and convert to RGB
im = Image.open(cm_logo_file).convert("RGB")

# Convert image data to a numpy array
pixels_arr = np.array(im)


# Reshape the array to be 2D
pixels_arr = pixels_arr.reshape(-1, pixels_arr.shape[-1])


# Find unique rows, i.e., unique RGB values
unique_colors = np.unique(pixels_arr, axis=0)

# Print unique RGB values
darkest_color = unique_colors[0]
palest_color = unique_colors[-1]

print(f"{darkest_color=}")
print(f"{palest_color=}")
