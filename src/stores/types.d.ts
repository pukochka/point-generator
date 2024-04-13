declare interface MetaProps {
  description: string;
  bytes: number;
  value: number;
  list?: Array<Record<string, number>>;
}

declare interface GenuineSignal {
  label: number;
  modification: Record<ModificationNames, ModificationProps>;
  meta: any;
}

declare type ModificationNames = 'freq' | 'coordinates';

declare interface ModificationProps {
  label: string;
  value: number;
}
