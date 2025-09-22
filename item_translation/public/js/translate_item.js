
frappe.ui.form.on('Item', {
    refresh: function(frm) {
        if (!frm.translate_button_added) {
            frm.translate_button_added = true;

            const wrapper = $(frm.fields_dict['item_name'].wrapper);

            // Wrap input in input-group if not already
            if (!wrapper.find('.input-group').length) {
                wrapper.find('input').wrap('<div class="input-group"></div>');
            }

            // Add the button
            const btnHtml = `
                <div class="input-group-append">
                    <button class="btn btn-primary btn-xs" type="button" id="translate-btn" disabled>
                        <i class="fa fa-language"></i> Translate
                    </button>
                </div>
            `;
            wrapper.find('.input-group').append(btnHtml);

            const $btn = $('#translate-btn');

            // Function to toggle button based on field value
            const toggleButton = () => {
                if (frm.doc.item_name && frm.doc.item_name.trim() !== "") {
                    $btn.prop('disabled', false);
                } else {
                    $btn.prop('disabled', true);
                }
            };

            // Watch for user input
            frm.fields_dict.item_name.$input.on('input', toggleButton);

            // Watch for changes set programmatically
            frm.fields_dict.item_name.df.onchange = toggleButton;

            // Initial check
            toggleButton();

            // Button click handler with loader
            $btn.click(function() {
                const item_name = frm.doc.item_name;
                if (!item_name) return;

                $btn.prop('disabled', true);
                $btn.html('<i class="fa fa-spinner fa-spin"></i> Translating...');

                frappe.call({
                    method: "item_translation.api.translator.translate_item_name",
                    args: { item_name: item_name },
                    callback: function(r) {
                        $btn.html('<i class="fa fa-language"></i> Translate');
                        toggleButton();

                        if (r.message) {
                            frm.set_value('item_name_arabic', r.message);
                            frappe.msgprint(__('Translation saved!'));
                        } else {
                            frappe.msgprint(__('Translation failed'));
                        }
                    },
                    error: function() {
                        $btn.html('<i class="fa fa-language"></i> Translate');
                        toggleButton();
                        frappe.msgprint(__('Translation failed'));
                    }
                });
            });
        }
    },

    // Also check when item_name is set programmatically
    item_name: function(frm) {
        const $btn = $('#translate-btn');
        if ($btn.length) {
            if (frm.doc.item_name && frm.doc.item_name.trim() !== "") {
                $btn.prop('disabled', false);
            } else {
                $btn.prop('disabled', true);
            }
        }
    }
});
