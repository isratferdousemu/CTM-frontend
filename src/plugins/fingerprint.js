import Fingerprint2 from 'fingerprintjs2';

export async function getFingerprint() {
  return new Promise((resolve) => {
      Fingerprint2.get({}, (components) => {
          const excludedKeys = ['language', 'screenResolution', 'availableScreenResolution', 'timezone', 'timezoneOffset', 'sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase', 'cpuClass', 'platform', 'doNotTrack', 'plugins', 'webgl', 'fonts', 'audio'];
          const fingerprint = Fingerprint2.x64hash128(components
              .filter(component => !excludedKeys.includes(component.key))
              .map(component => component.value)
              .join(''), 31);
          resolve(fingerprint);
      });

      // Fingerprint2.get({}, (components) => {
      //   console.log(components)
      // const fingerprint = Fingerprint2.x64hash128(components.map((component) => component.value).join(''), 31);
      // resolve(fingerprint);

    });
  // });
}