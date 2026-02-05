You’re already most of the way there. The key changes are:

1. **Let Dropzone accept all file types**
2. **Detect the file’s MIME type**
3. **Render different previews depending on the type**
4. **Gracefully fall back when preview isn’t possible**

Below is a clean, scalable way to do this in **Next.js + TypeScript**.

---

## 1️⃣ Accept all file types

Update your `Dropzone` props:

```tsx
<Dropzone
  src={files}
  onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
  maxSize={20 * 1024 * 1024} // e.g. 20MB
  className="w-full max-w-md"
>
```

Remove `accept` entirely if you want *everything*.

---

## 2️⃣ Track file type once

Add a derived value:

```ts
const file = files?.[0];
const fileType = file?.type;
```

Common MIME types you’ll see:

* Images → `image/png`, `image/jpeg`
* PDF → `application/pdf`
* PPT → `application/vnd.ms-powerpoint`
* PPTX → `application/vnd.openxmlformats-officedocument.presentationml.presentation`

---

## 3️⃣ Local preview logic (before upload)

Replace your preview section with a **type-aware preview renderer**.

```tsx
const renderPreview = () => {
  if (!file || !previewUrl) return null;

  // Images
  if (fileType?.startsWith("image/")) {
    return (
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full max-w-md rounded-lg"
      />
    );
  }

  // PDF
  if (fileType === "application/pdf") {
    return (
      <iframe
        src={previewUrl}
        className="w-full max-w-md h-125 rounded-lg border"
      />
    );
  }

  // PPT / PPTX (no native browser preview)
  if (
    fileType?.includes("presentation") ||
    fileType?.includes("powerpoint")
  ) {
    return (
      <div className="w-full max-w-md p-4 border rounded-lg text-center">
        <p className="font-medium">{file.name}</p>
        <p className="text-sm text-muted-foreground">
          PowerPoint preview not available
        </p>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full max-w-md p-4 border rounded-lg text-center">
      <p className="font-medium">{file.name}</p>
      <p className="text-sm text-muted-foreground">
        No preview available for this file type
      </p>
    </div>
  );
};
```

Then render it:

```tsx
<div className="flex gap-2 flex-wrap">
  {renderPreview()}
</div>
```

---

## 4️⃣ IPFS preview (after upload)

Once uploaded, use the **same logic**, but swap `previewUrl` with `previewUrlIPFS`.

Example for PDF from IPFS:

```tsx
{previewUrlIPFS && fileType === "application/pdf" && (
  <iframe
    src={previewUrlIPFS}
    className="w-full max-w-md h-125 rounded-lg border"
  />
)}
```

⚠️ **Important:**
PowerPoint files **cannot be previewed natively in browsers**, even from IPFS.

Your options:

* Show filename + download button ✅
* Convert PPT → PDF on upload (server-side) ✅
* Use Google Docs Viewer (requires public HTTP URL, not ideal for IPFS)

---

## 5️⃣ Best UX pattern (recommended)

| File type | Preview                    |
| --------- | -------------------------- |
| Image     | `<img>`                    |
| PDF       | `<iframe>`                 |
| Video     | `<video controls>`         |
| Audio     | `<audio controls>`         |
| PPT / DOC | Icon + filename + download |
| Unknown   | Filename only              |

Add a download button:

```tsx
<a
  href={previewUrlIPFS}
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm underline"
>
  Download file
</a>
```

---

## 6️⃣ Small improvements you should consider

* Limit to **1 file** if your UI assumes it
* Show MIME type + size
* Reset state after successful upload
* Use `URL.revokeObjectURL` (you already did 👍)

---

### TL;DR

* Remove `accept`
* Branch preview by `file.type`
* PDFs → iframe
* PPT → no native preview → fallback UI
* Reuse same logic for IPFS URLs

If you want, I can refactor this into a **reusable `<FilePreview />` component** next.
