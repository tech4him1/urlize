// @flow
import url from 'url';
/* Aims to be identical to Hugo's urlize helper */

export function urlize(string: string) {
  const sanitized = makePathSanitized(string);
  const parsedURL = url.parse(sanitized);

  return url.format(parsedURL);
}

function makePathSanitized(string) {
  return makePath(string.toLowerCase());
}

function makePath(string) {
  return unicodeSanitize(string).trim().replace(/[\s]/g, '-').replace(/-+/g, '-');
}

function unicodeSanitize(string) {
  let target = [];
  const runes = string.split('');
  for (let i=0; i < string.length; i++) {
    const r = runes[i];
    if (r == '%' && i+2 < string.length && string.substr(i+1, 2).match(/^[0-9a-f]+$/)) {
      target = target.concat([r, runes[i+1], runes[i+2]]);
    } else if (r.match(/[\w .\/\\_#\+-]/u)) {
      target.push(r);
    }
  }
  return target.join('');
}
