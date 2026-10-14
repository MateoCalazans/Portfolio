# ContactForm

The Contact world's two columns: the list of channels on the left, the message form on the right.

## Contact list

- `<ul>` of `<a>` rows: flex `space-between`, wrap, `border-top: 1.5px solid currentColor` (last row also bottom), padding 18px 0.
- Left: the value in `contact-row` style (`maateodtc@gmail.com`). Right: the channel in `label` style plus an ↗ that nudges `translate(4px, -4px)` on hover.
- Order: E-mail, WhatsApp, LinkedIn, GitHub, Instagram. Then a Solid **Button** "Baixar CV ↓".

## Field

- `<label>` wrapping a mono `label` and the control, gap 8px.
- Input and textarea: `min-height: 54px`, padding 14px 16px, `border: 1.5px solid currentColor`, radius-field, transparent ground, Instrument Sans 16px in `world-ink`. Textarea 5 rows, vertical resize.
- Focus: 2px `currentColor` outline, offset 2px.
- Submit: Solid Button "Enviar mensagem".

## Rules

- The form needs a real endpoint (Formspree, a serverless function, Shopify's contact form). Until there is one, the email row is the primary channel.
- Show the email as text people can select and copy, not only as a mailto link.
