#!/bin/bash
set -e
mkdir -p src/assets/blog
cd /dev-server
COUNT=0
for f in /tmp/blogimg/out/*.png; do
  slug=$(basename "$f" .png)
  dest="src/assets/blog/${slug}.png"
  pointer="${dest}.asset.json"
  if [ -f "$pointer" ]; then continue; fi
  lovable-assets create --file "$f" --filename "${slug}.png" > "$pointer" 2>/tmp/blogimg/upload.err || { echo "FAIL $slug"; cat /tmp/blogimg/upload.err; rm -f "$pointer"; continue; }
  COUNT=$((COUNT+1))
done
echo "uploaded $COUNT"
ls src/assets/blog/*.asset.json | wc -l
