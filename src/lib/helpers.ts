import { MathUtils, Vector2, Vector3 } from 'three';
import { EARTH_RADIUS, HALF_HEIGHT, HALF_WIDTH } from 'src/lib/constants';

/**
 * https://stackoverflow.com/questions/8482309/converting-javascript-integer-to-byte-array-and-back
 * */
export function intToByteArray(num: number, bytes: number) {
  const byteArray = <Array<number>>Array.from({ length: bytes }).fill(0);

  for (let index = 0; index < byteArray.length; index++) {
    const byte = num & 0xff;
    byteArray[index] = byte;
    num = (num - byte) / 256;
  }

  return byteArray;
}

/**
 * https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
 * */

export function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  return z * stdev + mean;
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * https://stackoverflow.com/questions/15935365/convert-float-to-bytes-in-javascript-without-float32array
 * */

export function toFloat32(value: number) {
  let bytes = 0;
  switch (value) {
    case Number.POSITIVE_INFINITY:
      bytes = 0x7f800000;
      break;
    case Number.NEGATIVE_INFINITY:
      bytes = 0xff800000;
      break;
    case +0.0:
      bytes = 0x40000000;
      break;
    case -0.0:
      bytes = 0xc0000000;
      break;
    default:
      if (Number.isNaN(value)) {
        bytes = 0x7fc00000;
        break;
      }
      if (value <= -0.0) {
        bytes = 0x80000000;
        value = -value;
      }
      let exponent = Math.floor(Math.log(value) / Math.log(2));
      let significand = ((value / Math.pow(2, exponent)) * 0x00800000) | 0;
      exponent += 127;
      if (exponent >= 0xff) {
        exponent = 0xff;
        significand = 0;
      } else if (exponent < 0) exponent = 0;
      bytes = bytes | (exponent << 23);
      bytes = bytes | (significand & ~(-1 << 23));
      break;
  }
  return bytes;
}

export function floatToByteArray(value: number, bytes: number) {
  return intToByteArray(toFloat32(value), bytes);
}

export function isInt(n: number) {
  return n % 1 === 0;
}

export function degreesToCartesian(lat: number, lon: number) {
  const normalizedLatitude = 2 * ((lat + 90) / 180 - 0.5);
  const normalizedLongitude = 2 * ((lon + 180) / 360 - 0.5);

  const x = normalizedLatitude * HALF_HEIGHT;
  const y = normalizedLongitude * HALF_WIDTH;

  return new Vector3(x, y, 0);
}

export function cartesianToDegrees(x: number, y: number) {
  const x_pos = x / HALF_HEIGHT;
  const y_pos = y / HALF_WIDTH;

  const lon = (x_pos / 2.0 + 0.5) * 180.0 - 90.0;
  const lat = (y_pos / 2.0 + 0.5) * 360.0 - 180.0;

  return { lat, lon };
}

export function distanceBetweenDegrees(start: Degrees, end: Degrees) {
  const dLat = MathUtils.degToRad(end.lat - start.lat);
  const dLon = MathUtils.degToRad(end.lon - start.lon);

  start.lat = MathUtils.degToRad(start.lat);
  end.lat = MathUtils.degToRad(end.lat);

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(start.lat) * Math.cos(end.lat);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
}

export function distanceBetweenCartesian(start: Vector2, end: Vector2) {
  return distanceBetweenDegrees(
    cartesianToDegrees(start.x, start.y),
    cartesianToDegrees(end.x, end.y)
  );
}

export interface Degrees {
  lat: number;
  lon: number;
}
