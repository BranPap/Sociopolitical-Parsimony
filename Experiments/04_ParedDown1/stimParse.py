import pandas as pd
import json

# === CONFIG ===
input_csv = "stimuli.csv"
output_js = "stimuliUnprocessed.js"

# === LOAD CSV ===
df = pd.read_csv(input_csv)

# === BUILD NESTED DICT ===
stimuli = {}

for _, row in df.iterrows():
    topic = row['topic']
    wing = row['wing']
    valence = row['valence']
    text = row['text']

    # Create topic dict if not exists
    if topic not in stimuli:
        stimuli[topic] = {}

    key = f"{wing}_{valence}"
    if key not in stimuli[topic]:
        stimuli[topic][key] = []

    stimuli[topic][key].append(text)

# === CONVERT TO JS VARIABLE ===
# Use json.dumps with ensure_ascii=False for readability
js_object = json.dumps(stimuli, indent=2, ensure_ascii=False)

js_output = f"var stimuliUnprocessed = {js_object};\n"

# === WRITE OUTPUT FILE ===
with open(output_js, "w", encoding="utf-8") as f:
    f.write(js_output)

print(f"✅ Wrote {output_js} with {len(df)} stimuli entries.")
