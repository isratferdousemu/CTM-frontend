import Fingerprint2 from 'fingerprintjs2';

export async function getFingerprint() {
  return new Promise((resolve) => {
      Fingerprint2.get({}, (components) => {
        console.log(components)
      const fingerprint = Fingerprint2.x64hash128(components.map((component) => component.value).join(''), 31);
      resolve(fingerprint);
    });
  });
}