export async function uploadKycDocs(files = {}, onProgress = () => {}, options = {}) {
  const getSignedUrlEndpoint = options.getSignedUrlEndpoint || 'http://localhost:8080/api/agents/upload-kyc-docs';
  const authToken = options.authToken || null; // if your GET requires auth

  if (!files || typeof files !== 'object') {
    throw new Error('files object required: { pan, aadhaar, selfie }');
  }

  const res = await fetch(getSignedUrlEndpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Failed to get signed URLs: ${res.status} ${res.statusText} ${txt}`);
  }

  const body = await res.json();
  const generatedUserId = body.generatedUserId;
  const signedUrls = body.signedUrls || {};

  const keys = ['pan', 'aadhaar', 'selfie'];
  const uploadResults = {};

  function uploadWithProgress(url, file, key) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve({ skipped: true });
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      if (file.type) {
        try {
          xhr.setRequestHeader('Content-Type', file.type);
        } catch (e) {
          // ignore; some environments may block setting content-type for signed URLs
        }
      }

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          try { onProgress(key, percent); } catch (e) { /* swallow */ }
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // success
          onProgress(key, 100);
          resolve({ ok: true, status: xhr.status, response: xhr.responseText });
        } else {
          reject(new Error(`Upload failed for ${key}: ${xhr.status} ${xhr.statusText} ${xhr.responseText}`));
        }
      };

      xhr.onerror = () => reject(new Error(`Network error while uploading ${key}`));
      xhr.onabort = () => reject(new Error(`Upload aborted for ${key}`));

      xhr.send(file);
    });
  }

  await Promise.all(keys.map(async (key) => {
    const file = files[key];
    const signed = signedUrls[key];
    if (!signed || !signed.uploadUrl) {
      uploadResults[key] = { skipped: true, reason: 'no_signed_url' };
      return;
    }
    try {
      await uploadWithProgress(signed.uploadUrl, file, key);
      uploadResults[key] = {
        ok: true,
        objectName: signed.objectName,
        fileExt: signed.fileExt,
      };
    } catch (err) {
      uploadResults[key] = { ok: false, error: err.message || String(err) };
    }
  }));

  return { generatedUserId, uploads: uploadResults };
}
