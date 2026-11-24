// Shared with the editable-source contract. Each expression matches whole normalized paths.
const anyDepth = String.raw`(?:[^/]*/)*`;
const vcsOrEnv = String.raw`(?:\.git|\.env[^/]*)(?:/.*)?`;
const credentialNames = [
  ".npmrc",
  ".yarnrc",
  ".yarnrc.yml",
  ".pypirc",
  "pip.conf",
  "pip.ini",
  ".netrc",
  "_netrc",
  ".git-credentials",
  ".gitconfig",
  ".mcp.json",
  "credentials.json",
  "serviceaccountkey.json",
  "service-account.json",
  "service_account.json",
];
const toolFolders = [
  ".ssh",
  ".aws",
  ".gnupg",
  ".docker",
  ".kube",
  ".azure",
  ".claude",
  ".codex",
  ".cursor",
  ".agents",
  ".gemini",
  ".vscode",
  ".idea",
];
const alternatives = (names: string[]) =>
  names.map((name) => name.replaceAll(".", "\\.")).join("|");
const keyOrStore = String.raw`id_(?:rsa|dsa|ecdsa|ed25519)[^/]*|[^/]*\.(?:pem|key|p12|pfx|p8|ppk|jks|keystore|kdbx|tfstate(?:\.backup)?|tfvars(?:\.json)?)`;
const folders = String.raw`(?:${alternatives(toolFolders)}|\.config/(?:gcloud|gh))(?:/.*)?`;
const credentials = [alternatives(credentialNames), keyOrStore, folders].join("|");

export const portablePrivatePattern = `${anyDepth}(?:${vcsOrEnv}|${credentials})`;
export const vcsOrSecret = new RegExp(`^${anyDepth}(?:${vcsOrEnv})$`, "su");
export const credentialOrToolState = new RegExp(`^${anyDepth}(?:${credentials})$`, "su");
