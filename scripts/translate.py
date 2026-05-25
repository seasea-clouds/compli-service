#!/usr/bin/env python3
"""Translate compli-service message files from English to 47 languages."""

import json
import os
import sys
import time
from deep_translator import GoogleTranslator

MSG_DIR = "/root/projects/trade/compli-service/messages"

# Map locale codes to Google Translate language codes
LOCALE_TO_GT = {
    "af": "af", "ar": "ar", "az": "az", "be": "be", "bg": "bg", "bn": "bn",
    "ca": "ca", "cs": "cs", "da": "da", "de": "de", "el": "el", "es": "es",
    "fa": "fa", "fi": "fi", "fr": "fr", "he": "he", "hi": "hi", "hr": "hr",
    "hu": "hu", "hy": "hy", "id": "id", "it": "it", "ja": "ja", "ka": "ka",
    "ko": "ko", "ms": "ms", "ne": "ne", "nl": "nl", "no": "no", "pl": "pl",
    "pt": "pt", "ro": "ro", "ru": "ru", "si": "si", "sk": "sk", "sl": "sl",
    "sq": "sq", "sr": "sr", "sv": "sv", "sw": "sw", "ta": "ta", "th": "th",
    "tr": "tr", "uk": "uk", "ur": "ur", "vi": "vi", "zh": "zh-CN",
}

def translate_text(text, target_lang):
    """Translate a single text string."""
    if not text or not isinstance(text, str) or len(text.strip()) == 0:
        return text
    # Don't translate brand names or URLs
    if text.startswith("http") or text == "SinoTrade Compliance":
        return text
    # Don't translate variables like {name} or placeholders
    if text.startswith("{") and text.endswith("}"):
        return text
    try:
        result = GoogleTranslator(source="en", target=target_lang).translate(text[:500])
        time.sleep(0.3)  # Rate limit
        return result or text
    except Exception as e:
        print(f"  ⚠️  Translation failed: {e}")
        return text

def translate_obj(obj, target_lang, path=""):
    """Recursively translate all string values in a JSON object."""
    if isinstance(obj, dict):
        return {k: translate_obj(v, target_lang, f"{path}.{k}") for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_obj(item, target_lang, f"{path}[{i}]") for i, item in enumerate(obj)]
    elif isinstance(obj, str):
        # Skip known non-translatable values
        skip_patterns = [
            "SinoTrade Compliance", "http", "Jing'an District",
            "© ", "david@", "Disclaimer:", "We are an independent",
        ]
        if any(obj.startswith(p) for p in skip_patterns):
            return obj
        translated = translate_text(obj, target_lang)
        if translated != obj:
            print(f"  ✓ {path}")
        return translated
    else:
        return obj

def main():
    # Load English source
    en_path = os.path.join(MSG_DIR, "en.json")
    with open(en_path) as f:
        en_data = json.load(f)

    for locale, gt_lang in sorted(LOCALE_TO_GT.items()):
        filepath = os.path.join(MSG_DIR, f"{locale}.json")
        
        # Skip English
        if locale == "en":
            continue
        
        print(f"\n--- {locale} ({gt_lang}) ---")
        
        # Translate
        translated = translate_obj(en_data, gt_lang)
        
        # Write
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(translated, f, ensure_ascii=False, indent=2)
        
        print(f"  → Saved {locale}.json")

if __name__ == "__main__":
    main()
