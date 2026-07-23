import os, json, base64, time, sys, re, requests, pathlib

posts = json.load(open('/tmp/blogimg/posts.json'))
OUT = pathlib.Path('/tmp/blogimg/out'); OUT.mkdir(parents=True, exist_ok=True)
KEY = os.environ['LOVABLE_API_KEY']
URL = 'https://ai.gateway.lovable.dev/v1/images/generations'
MODEL = 'google/gemini-2.5-flash-image'  # Nano Banana - fast

# category -> visual subject
CAT_SUBJECTS = {
  'Cost': 'a roofing estimator with clipboard reviewing an architectural shingle roof on a mountain home, close-up hands with measuring tools',
  'Materials': 'a close-up detail of premium architectural asphalt shingles and standing-seam metal roofing panels side by side on a steep mountain roof',
  'Storm': 'dramatic dark storm clouds gathering over a mountain home rooftop surrounded by tall pine trees, moody atmosphere after severe weather',
  'Storm Damage': 'close-up of storm-damaged shingles and fallen tree limbs on a mountain home roof, overcast Blue Ridge sky',
  'Insurance': 'a homeowner reviewing insurance paperwork at a wooden porch table with a Blue Ridge Mountain vista behind them, warm afternoon light',
  'Maintenance': 'a professional roofer carefully inspecting shingles on a steep mountain roof, autumn foliage and Blue Ridge Mountains in background',
  'Replacement': 'a skilled crew installing a new architectural shingle roof on a large mountain home, safety harnesses, golden hour light',
  'Inspections': 'a roofer with a clipboard and drone controller inspecting a mountain home roof, morning mist over the Blue Ridge',
  'Tips': 'a beautifully maintained mountain home exterior with a fresh roof and manicured landscape, warm morning light',
  'Financing': 'the warm inviting exterior of a Blue Ridge mountain home at dusk with lights on inside, autumn colors',
  'Commercial': 'a modern commercial building with a standing-seam metal roof in a small Western North Carolina mountain downtown, blue sky',
  'Construction': 'a custom mountain home under construction with exposed timber framing and roof trusses, Blue Ridge Mountains in background',
  'Replacement Construction': 'a custom mountain home under construction with exposed timber framing and roof trusses, Blue Ridge Mountains in background',
}

DEFAULT_SUBJECT = 'a premium Blue Ridge mountain home with a beautifully installed roof, cinematic light'

def subject_for(post):
  cat = post.get('category') or ''
  for k,v in CAT_SUBJECTS.items():
    if k.lower() in cat.lower():
      return v
  return DEFAULT_SUBJECT

def prompt_for(post):
  town = post.get('town') or 'Western North Carolina'
  subj = subject_for(post)
  title = post.get('title','')
  return (
    f"Editorial magazine-quality photograph for a premium Western North Carolina roofing and construction brand. "
    f"Subject: {subj}. Location context: {town}, in the Blue Ridge Mountains of Western North Carolina. "
    f"Scene should evoke the article topic: '{title}'. "
    f"Style: cinematic natural light, rich deep forest green and warm amber gold tones, moody yet inviting, "
    f"professional, photorealistic, shot on a full-frame camera with shallow depth of field. "
    f"Absolutely no text, no logos, no signage, no watermarks, no writing of any kind. "
    f"Composition: 3:2 horizontal, hero image quality."
  )

def gen(post, retries=3):
  slug = post['slug']
  outp = OUT / f'{slug}.png'
  if outp.exists() and outp.stat().st_size > 5000:
    return 'skip'
  body = {
    'model': MODEL,
    'messages': [{ 'role':'user', 'content': prompt_for(post) }],
    'modalities': ['image','text'],
  }
  for attempt in range(retries):
    try:
      r = requests.post(URL, headers={'Authorization': f'Bearer {KEY}', 'Content-Type':'application/json'},
                        json=body, timeout=120)
      if r.status_code == 429:
        time.sleep(8 * (attempt+1)); continue
      if r.status_code >= 400:
        print(f'  ! HTTP {r.status_code}: {r.text[:200]}', flush=True)
        time.sleep(3); continue
      data = r.json()
      b64 = data.get('data',[{}])[0].get('b64_json')
      if not b64:
        print(f'  ! no image in response: {str(data)[:200]}', flush=True)
        time.sleep(3); continue
      outp.write_bytes(base64.b64decode(b64))
      return 'ok'
    except Exception as e:
      print(f'  ! {e}', flush=True); time.sleep(5)
  return 'fail'

start = time.time()
results = {'ok':0,'skip':0,'fail':0}
for i,post in enumerate(posts):
  t=time.time()
  status = gen(post)
  results[status]+=1
  dur=time.time()-t
  print(f'[{i+1}/{len(posts)}] {status} {post["slug"]} ({dur:.1f}s)', flush=True)
  time.sleep(0.4)
print('DONE', results, f'elapsed={time.time()-start:.0f}s', flush=True)
