import glob

def fix(f):
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()

    # We map the exact mojibake chunks safely to the correct emojis based on what visual errors we saw.
    fixes = {
        'â˜½': '🌙',
        'â™ˆ Aries': '♈ Aries',
        'â™‰ Taurus': '♉ Taurus',
        'â™Š Gemini': '♊ Gemini',
        'â™‹ Cancer': '♋ Cancer',
        'â™Œ Leo': '♌ Leo',
        'â™  Virgo': '♍ Virgo',
        'â™Ž Libra': '♎ Libra',
        'â™  Scorpio': '♏ Scorpio',
        'â™  Sagittarius': '♐ Sagittarius',
        'â™‘ Capricorn': '♑ Capricorn',
        'â™’ Aquarius': '♒ Aquarius',
        'â™“ Pisces': '♓ Pisces',
        'ðŸ§˜': '🧘',
        'ðŸŽ¯': '🎯',
        'ðŸŒ ': '🌍',
        'ðŸ”’': '🔒',
        'âš¡': '⚡',
        'â­ ': '⭐',
        'â€”': '—',
        '45â€“60': '45–60',
        '24â€“48': '24–48',
        'ðŸ“§': '📧',
        'ðŸ’¬': '💬',
        'Â©': '©'
    }

    for k, v in fixes.items():
        text = text.replace(k, v)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(text)
    print("Fixed", f)

if __name__ == '__main__':
    for HTML in glob.glob('*.html'):
        fix(HTML)
