import re
def fix():
    with open('index.html', 'r', encoding='utf-8') as f:
        text = f.read()

    # Fix stars
    text = re.sub(r'<div class="testi-stars">.*?</div>', '<div class="testi-stars">⭐⭐⭐⭐⭐</div>', text)

    # Fix Zodiac signs that were missing or mangled
    zodiac_fixes = [
        (r'â™Œ Leo', '♌ Leo'),
        (r'â™\s*Virgo', '♍ Virgo'),
        (r'â™Ž Libra', '♎ Libra'),
        (r'â™\s*Scorpio', '♏ Scorpio'),
        (r'â™\s*Sagittarius', '♐ Sagittarius'),
    ]
    for p, r in zodiac_fixes:
        text = re.sub(p, r, text)

    # Fix the Globe 
    text = re.sub(r'<span class="why-icon">.*?</span>\s*<h4>Global Reach</h4>', '<span class="why-icon">🌍</span>\n        <h4>Global Reach</h4>', text, flags=re.DOTALL)
    text = re.sub(r'<span>.*?</span>\s*<h4>Available Worldwide</h4>', '<span>🌍</span>\n        <h4>Available Worldwide</h4>', text, flags=re.DOTALL)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Finished fixing remnants")

if __name__ == '__main__':
    fix()
