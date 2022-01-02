export default function CopyData(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy;
}