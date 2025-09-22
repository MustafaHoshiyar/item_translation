import frappe
from googletrans import Translator

@frappe.whitelist()
def translate_item_name(item_name):
    """
    Translate the given item_name into Arabic using Google Translate
    """
    if not item_name:
        return ""
    
    translator = Translator()
    try:
        translation = translator.translate(item_name, dest='ar')
        return translation.text
    except Exception as e:
        frappe.log_error(f"Translation failed for '{item_name}': {str(e)}", "Translate Item Name")
        return item_name  # fallback to original if translation fails 