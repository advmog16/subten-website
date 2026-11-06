# Editing content · تعديل المحتوى

## 1. Change the contact email · تغيير الإيميل

`src/js/config.js` → `email`. It updates the “Start a project” button and the footer.

## 2. Add an image · إضافة صورة

Each photo needs two WebP files in `src/assets/img/`:

```
my-photo-760.webp    (760 px wide — phones, thumbnails)
my-photo-1600.webp   (1600 px wide — desktop, full screen)
```

Example with [cwebp](https://developers.google.com/speed/webp/docs/cwebp):

```bash
cwebp -q 68 -resize 1600 0 photo.jpg -o src/assets/img/my-photo-1600.webp
cwebp -q 64 -resize 760 0  photo.jpg -o src/assets/img/my-photo-760.webp
```

Refer to it everywhere by its base name: `"my-photo"`.

## 3. Add a project · إضافة مشروع

Add an object to `PROJECTS` in `src/js/data/projects.js`:

```js
{
  slug: "brand-campaign",          // used in the URL: /#work/brand-campaign
  type: "film",                    // "film" or "photo" — controls the filter buttons
  cover: "my-photo",               // card + case-study hero image
  alt: "my-photo-2",               // revealed when hovering the card
  gallery: ["shot-1", "shot-2"],   // horizontal gallery in the case study
  video: "vimeo:123456789",        // or "ig:https://www.instagram.com/p/…" or null
  en: {
    client: "Brand", cat: "Campaign film", title: "Project title",
    desc: "One or two sentences about the idea and the result.",
    tags: ["Tag one", "Tag two"],
    impact: [["Heading", "Result text"]]   // optional
  },
  ar: {
    client: "العلامة", cat: "فيلم حملة", title: "عنوان المشروع",
    desc: "وصف قصير للفكرة والنتيجة.",
    tags: ["وسم", "وسم"]
  }
}
```

Order in the array = order on the page. The grid alternates portrait / landscape cards automatically.

## 4. Hero slides, film strip, clients

Same file:

- `HERO` — `{ img, en, ar }` per slide (caption shown bottom-centre).
- `STRIP` — list of image names for the 16mm section.
- `CLIENTS` — two arrays (one per marquee row) of file names in `src/assets/clients/` without `.png`.
  Logos should be black on transparent, ~96 px tall.

## 5. Text & translations · النصوص

`src/js/data/strings.js` holds every UI string in `en` and `ar`.
In `index.html`, an element with `data-i18n="contact.t1"` shows `STRINGS[lang]["contact.t1"]`.

Special syntax in the `manifesto` and `band` strings:

- `*words*` → accent serif (red italic in English, bold in Arabic)
- `[img:name]` → small rounded image inline with the text (manifesto only)
