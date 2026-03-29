import glob

def master_fix(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # If the file doesn't have the typical mojibake characters, skip
    if 'â' not in text and 'ð' not in text:
        return

    # 1. Swap ALL known valid emojis that break the windows-1252 encoder
    temp_replacements = {}
    valid_emojis = ['🌙', '🌍', '🧘', '🎯', '🔒', '⚡', '⭐', '—', '📧', '💬', '©', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

    for i, emj in enumerate(valid_emojis):
        if emj in text:
            placeholder = f"__VALID_{i}__"
            temp_replacements[placeholder] = emj
            text = text.replace(emj, placeholder)
            
    try:
        raw_bytes = text.encode('windows-1252')
        fixed_text = raw_bytes.decode('utf-8')
    except Exception as e:
        print(f"Skipping {filepath} due to decoding error:", e)
        return

    # Restore the valid emojis
    for placeholder, emj in temp_replacements.items():
        fixed_text = fixed_text.replace(placeholder, emj)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_text)
    print("Fixed", filepath)

if __name__ == '__main__':
    for HTML in glob.glob('*.html'):
        master_fix(HTML)
