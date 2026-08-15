import re

with open('src/App.tsx', 'r') as f:
    app_content = f.read()

# Extract paths from <Route path="..." ... />
routes = set(re.findall(r'path="([^"]+)"', app_content))
# Filter out patterns with params and LOVABLE internal routes
routes = {r for r in routes if ':' not in r and not r.startswith('/.')}
# Add root
routes.add('/')

with open('public/sitemap.xml', 'r') as f:
    sitemap_content = f.read()

# Extract locs from sitemap
locs = set(re.findall(r'<loc>https://highlandernc.com([^<]*)</loc>', sitemap_content))
# Normalize locs (remove trailing slashes)
locs = {l.rstrip('/') if l != '/' else l for l in locs}

missing_in_sitemap = routes - locs
extra_in_sitemap = locs - routes

print(f"Routes not in sitemap: {missing_in_sitemap}")
print(f"Sitemap entries not in App.tsx: {extra_in_sitemap}")
