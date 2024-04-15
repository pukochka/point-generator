import {
  Degrees,
  floatToByteArray,
  gaussianRandom,
  getRandomArbitrary,
  intToByteArray,
  isInt,
} from 'src/lib/helpers';
import { meta, MetaNames, RLS } from 'src/lib/meta';
import { Group, MathUtils } from 'three';
import { useGeneratorStore } from 'stores/generatorStore';

export const misleadingGroup = new Group();

export class Signal {
  offset = 0;
  location = 0;
  frequency = 0;
  turn = 1;
  lon = 0;
  lat = 0;

  point = { lat: 0, lon: 0 };
  rls = {
    label: 'AN/SPN-46',
    range: [3590, 3700],
    impulse: 1,
  };

  array = new Uint8Array(128);

  constructor(
    rls: RLS,
    point: Degrees,
    location: number,
    frequency: number,
    turn: number
  ) {
    const generator = useGeneratorStore();

    this.rls = rls;
    this.turn = turn;
    this.point = point;
    this.location = location;
    this.frequency = frequency;

    for (const values of Object.entries(meta)) {
      let value = 0;
      const name = <MetaNames>values[0];
      const { bytes }: MetaProps = values[1];

      if (name in this) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value = this[name]();
      }

      const byteArray = isInt(Number(value))
        ? intToByteArray(value, bytes)
        : floatToByteArray(value, bytes);

      this.array.set(byteArray, this.offset);

      this.offset += bytes;
    }

    generator.addFalsePoint(
      MathUtils.radToDeg(this.lat),
      MathUtils.radToDeg(this.lon)
    );
  }

  changingLocation(value: number) {
    return MathUtils.degToRad(gaussianRandom(value, this.location));
  }

  Latitude() {
    this.lat = this.changingLocation(this.point.lat);
    return this.lat;
  }

  Longitude() {
    this.lon = this.changingLocation(this.point.lon);
    return this.lon;
  }

  KodM() {
    return Math.floor(getRandomArbitrary(3, 14));
  }

  Num_Ss() {
    return this.turn;
  }

  Freq() {
    const [min, max] = this.rls.range;
    const value = getRandomArbitrary(min, max);

    return (
      Math.abs(Number(gaussianRandom(value, this.frequency).toFixed())) * 1000
    );
  }

  DateTm() {
    return Date.now() + this.turn * 1000 * 60 * 60 * 24;
  }

  RangePr() {
    return Math.floor(getRandomArbitrary(950, 1500));
  }

  Typ() {
    return Math.floor(getRandomArbitrary(1, 5));
  }

  Num_KA() {
    return 55;
  }

  Tau() {
    return this.rls.impulse;
  }
}
