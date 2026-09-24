# How to edit the Boxers vom Norden website

You do not need to write code. Everything you can change is a plain text file in
`beta-src/src/content/`, and photos go in the `img` folder. You can do all of it in
your web browser on github.com.

After you save (commit) a change, the site rebuilds itself. Give it 2 to 3 minutes,
then refresh the website.

## Changing words on a page

1. On GitHub, open the folder `beta-src` > `src` > `content`.
2. Click the file you want (see the list below), then click the pencil icon (Edit).
3. Change the text **between the quote marks**. Leave the quote marks, commas and
   brackets alone.
4. Click **Commit changes** (green button), then **Commit changes** again.

| To change...                       | Edit this file             |
| ---------------------------------- | -------------------------- |
| Name, email, location, Facebook link | `site.json`        |
| Home page story and highlight boxes | `home.json`               |
| A dog (bio, health, photos, videos) | `dogs/<dog name>.json`    |
| A litter                           | `litters/<litter>.json`    |
| Forever in Memory intro            | `memory.json`              |
| Raw Feeding page                   | `raw-feeding.json`         |
| Gallery intro text                 | `gallery.json`             |
| Contact page text                  | `contact.json`             |

Tips for text:

- Make words bold with two stars on each side: `**bold**`.
- Make a link like this: `[click here](https://example.com)`.
- Each paragraph is its own line in quotes, followed by a comma (except the last one).
- If the site stops updating after an edit, you probably deleted a quote mark or comma.
  Look for the red **Actions** tab on GitHub: it will show an error, and you can
  undo your change from the file's **History**.

## Adding photos

1. Open the `img` folder (in the top level of the repository).
2. Click **Add file > Upload files** and drop your photos in.
3. Save the photos at a sensible size before uploading: about **2000 pixels wide**,
   under **1 MB**. Very large photos make the site slow, especially on phones.
4. Optional but nice: also upload a small version named with `-sm` before the
   extension, about **500 pixels wide** (for `mia.jpg`, the small one is `mia-sm.jpg`).
   If there is no `-sm` file, the site just uses the full photo.
5. Add the photo to a dog or litter file, in its `"photos"` list:

```json
{ "file": "mia.jpg", "caption": "Mia at 8 weeks old" }
```

Put a comma between photos. Only the file name goes in `"file"`, not a folder.

Clicking any photo on the site opens it full screen. The left and right arrow
keys (or the on-screen arrows, or a swipe on a phone) move between photos, and
Esc closes it. The Gallery page collects every photo automatically.

## Adding a new dog

1. Open `beta-src/src/content/dogs`.
2. Open an existing dog (for example `aurora.json`), copy everything, then click
   **Add file > Create new file** and name it after the new dog, like
   `bellatrix.json`.
3. Paste, then change the details. Important fields:
   - `"sex"` is `"male"` or `"female"`. This decides which menu the dog appears in.
   - `"order"` is the position in the list (1 is first).
   - `"memorial"`: `true` shows the dog on the Forever in Memory page too.
     Add `"passed": "April 2025"` to show when.
4. The dog appears in the menu automatically.

To remove a dog from the site, delete their file.

## Adding a new litter

Same idea: copy a file in `litters`, rename it, and edit. `"order"` sets the tab order.

## YouTube videos

In a dog file, `"youtube"` is the part of the video address after `v=`.
For `https://www.youtube.com/watch?v=093uZL1xN2w` it is `093uZL1xN2w`.

---

## For the developer

- Source is in `beta-src/`. Run `npm install` then `npm run dev` to work locally
  (photos load from the live site, see `.env.development`).
- `npm run build` writes the site to `beta/`. The GitHub Action in
  `.github/workflows/build-beta.yml` does this automatically on push and commits
  the result, which triggers the host's copy step. You can also build locally and push `beta/`.
- The site uses addresses like `/#/dogs/indy` (hash routing) so it works on any
  host and on refresh without server settings.

### Going live (replacing the old site)

1. Open the beta at `/beta/` and check every page on desktop and phone.
2. Change the `build` script in `beta-src/package.json` to `vite build --mode live`
   (or run `npm run build:live` yourself). This writes to the repo root and never
   deletes anything.
3. Delete the old files from the root: all `*.html` except the new `index.html`,
   `css/`, `js/`, and the stray images at the top level. **Keep `img/`.**
4. Old links such as `/indy.html` will stop working. Optionally add an `.htaccess`
   with redirects (untested example, verify on the host):

   ```
   RewriteEngine On
   RewriteRule ^indy\.html$ /#/dogs/indy [R=301,L,NE]
   RewriteRule ^arcas\.html$ /#/dogs/arcas [R=301,L,NE]
   RewriteRule ^jibaya\.html$ /#/dogs/jibaya [R=301,L,NE]
   RewriteRule ^aurora\.html$ /#/dogs/aurora [R=301,L,NE]
   RewriteRule ^litters\.html$ /#/litters [R=301,L,NE]
   RewriteRule ^gallery\.html$ /#/gallery [R=301,L,NE]
   RewriteRule ^contact\.html$ /#/contact [R=301,L,NE]
   ```
5. Point the workflow at the root too: change `npm run build` to `npm run build:live` and `git add -A beta` to `git add -A .` (excluding `beta-src`, which is source, not site).
