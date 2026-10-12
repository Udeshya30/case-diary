import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";

function getExtension(name, mimeType) {
  const fromName = name?.split(".").pop();
  if (fromName && fromName !== name) return fromName.toLowerCase();
  if (mimeType?.includes("png")) return "png";
  if (mimeType?.includes("webp")) return "webp";
  return "jpg";
}

export async function pickProfileImage() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "image/*",
    copyToCacheDirectory: true,
    multiple: false
  });

  if (result.canceled) return null;

  const asset = result.assets?.[0];
  if (!asset?.uri) return null;

  const extension = getExtension(asset.name, asset.mimeType);
  const destination = `${FileSystem.documentDirectory}caseflow-profile-image.${extension}`;

  await FileSystem.copyAsync({
    from: asset.uri,
    to: destination
  });

  return destination;
}
