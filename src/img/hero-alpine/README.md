# Alpine hero layers

The supplied photo is preserved as `source.png` (2070 × 1380, 3:2).
The built-in image generation editor produced three matching 1536 × 1024 plates:

- `sky.png`: opaque sky, with the terrain removed and hidden sky reconstructed.
- `mountains.png`: mountain mass with transparent sky.
- `foreground.png`: nearby rock and grass ridge with transparent upper area.

These are AI-assisted extractions and reconstructions, not pixel-exact masks of the source. Keep their shared framing and object position aligned. Header renders the existing SVG brewery logo between the mountain and foreground plates. All three images use the same cover sizing and overscan; ScrollTrigger moves their wrappers at different speeds. Reduced-motion preferences disable parallax.

## Edit prompts

### Sky
Use case: precise-object-edit / background-extraction. Edit target: attached user's mountain photograph. Deliver ONE aligned parallax BACKGROUND SKY PLATE. Preserve original 3:2 canvas, exact sky colors, cloud placement, natural photographic texture and warm vintage grading. Remove ALL mountains, rocks, vegetation and terrain, replacing them with a seamless plausible continuation of the existing blue sky and cream clouds all the way to the bottom of the canvas. Keep original upper sky unchanged. This is a filled opaque clean sky plate that will sit behind transparent mountain cutouts; no mountains should remain. Do not change framing, no text, no logos, no invented objects.

### Mountains
Use case: background-extraction. Edit target is the user's photograph of jagged alpine limestone peaks. Deliver ONE transparent PNG MOUNTAIN PLATE for parallax. Preserve exact 3:2 canvas and mountain placement, shape, scale, rock texture and muted warm photographic grading. Remove ONLY all sky and clouds above and around the mountain skyline, replacing them with genuine transparent alpha. Retain the entire mountain mass and all lower rocks and grassy terrain down to the bottom edge exactly where they are. Highest peak stays at x31%, y27%; never recenter, zoom, rescale or invent a different mountain. Clean precise rock skyline edges with no sky halos. All space above skyline must be transparent, not a black or white background. No text, logo or new objects.

### Foreground
Use case: background-extraction. Edit target: user's original alpine photograph. Extract only the nearest FOREGROUND rock and grass ridge into a genuinely transparent PNG. Keep exactly the same 3:2 canvas, framing, scale, and original position. The foreground includes the dark grassy slope entering the left edge at y62%, the rounded central rocky outcrop rising at x48% y53%, the nearer rugged right-hand cliff rising at x72% y59%, and all connected lower rock and grass terrain to the full bottom edge. Remove all sky AND the tall jagged distant mountain peaks behind this foreground, making everything above the nearest ridge outline fully transparent alpha. Trace the actual irregular rock silhouette accurately; do not add glow, clouds, haze, shadow outside edge, feathered sky, background colors or outline. Preserve muted warm gray limestone and olive green grass from original image, photographic texture, no new landscape. Keep low foreground at original location, never enlarge or recenter. One single foreground plate, no text or logos.
