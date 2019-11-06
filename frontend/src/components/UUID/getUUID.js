export default function getUUID() { // UUID v4 generator in JavaScript (RFC4122 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16;
    const v = ((c === 'x') ? r : (((r % 3) * 17) % 8));
    return v.toString(16);
  });
}
