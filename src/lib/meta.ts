export const gaussProps = ['Latitude', 'Longitude'];
export interface RLS {
  label: string;
  range: [number, number];
}

export const rlsList: Array<RLS> = [
  {
    label: 'AN/SPS-48E',
    range: [2900, 3100],
  },
  {
    label: 'AN/SPS-49(V)5',
    range: [880, 910],
  },
  {
    label: 'AN/SPN-46',
    range: [3590, 3700],
  },
  {
    label: 'AN/SPN-43C',
    range: [33000, 33400],
  },
  {
    label: 'AN/SPN-41',
    range: [15400, 15700],
  },
  {
    label: 'AN/SPQ-9B',
    range: [8500, 9600],
  },
  {
    label: 'AN/SPY-1A',
    range: [3100, 3900],
  },
  {
    label: 'AN/SPS-55',
    range: [9050, 10000],
  },
  {
    label: 'AN/SPG-62',
    range: [8500, 9600],
  },
  {
    label: 'AN/SPQ-9A',
    range: [8500, 9600],
  },
  {
    label: 'AN/SPY-1D',
    range: [3100, 3900],
  },
  {
    label: 'AN/SPS-49',
    range: [850, 950],
  },
  {
    label: 'AN/SPS-67',
    range: [5380, 5580],
  },
  {
    label: 'AN/SPS-64',
    range: [3025, 3075],
  },
];

export interface MetaProp {
  description: string;
  bytes: number;
  value: number;
}

export type MetaNames = keyof typeof meta;

export const meta = {
  Num_KA: {
    description: 'Номер KA',
    bytes: 2,
    value: 55,
  },
  Num_BC: {
    description: 'Номер витка съема(номер суточного витка)',
    bytes: 2,
    value: 0,
  },
  Num_Ss: {
    description: 'Номер съема (сеанса)',
    bytes: 2,
    value: 0,
  },
  Num_ON: {
    description: 'Номер оперативного направления',
    bytes: 2,
    value: 0,
  },
  Typ: {
    description: 'Тип информации (море, контроль, авиа)',
    bytes: 2,
    value: 0,
  },
  TypeForm: {
    description: 'Тип формуляра (стандартный, поимпульсный, групповой)',
    bytes: 2,
    value: 0,
  },
  FlagFunk: {
    description:
      'Флаг выполнения функции обработки (после однократного уточнения координат вторичное не допускается)',
    bytes: 2,
    value: 0,
  },
  fSelect: {
    description: 'Флаг выбора сигнала',
    bytes: 2,
    value: 0,
  },
  Latitude: {
    description: 'Широта в радианах',
    bytes: 4,
    value: 0,
  },
  Longitude: {
    description: 'Долгота в радианах',
    bytes: 4,
    value: 0,
  },
  Freq: {
    description: 'Несущая частота кГц',
    bytes: 4,
    value: 75,
  },
  Tau: {
    description: 'Длительность импульса 0,1 мкСек',
    bytes: 4,
    value: 0,
  },
  DateTm: {
    description: 'Дата и время сигнала',
    bytes: 8,
    value: 0,
  },
  KodModul: {
    description: 'Код модуляции(не раб)',
    bytes: 2,
    value: 0,
  },
  T: {
    description: 'Периоды следования импульсов в 5 мкс',
    bytes: 10,
    value: 0,
  },
  dT: {
    description: 'Достоверность периодов по 2 бита на 5 периодов',
    bytes: 2,
    value: 0,
  },
  KodTypRLS: {
    description: 'Код типа РЛС',
    bytes: 2,
    value: 0,
  },
  Sigm: {
    description: 'Количество отметок в формуляре сигнала',
    bytes: 2,
    value: 0,
  },
  KodM: {
    description: 'Код мощности',
    bytes: 2,
    value: 0,
  },
  RangePr: {
    description: 'Дальность приема, км',
    bytes: 2,
    value: 0,
  },
  Num_D: {
    description: 'Номер поддиапозона',
    bytes: 2,
    value: 0,
  },
  Dev1: {
    description: 'Девиация частоты1 кГц',
    bytes: 2,
    value: 0,
  },
  Dev2: {
    description: 'Девиация частоты2 кГц',
    bytes: 2,
    value: 0,
  },
  NumJF: {
    description: 'Количество скачков фаз (не раб)',
    bytes: 2,
    value: 0,
  },
  ValJF: {
    description: 'Величина скачков фаз (не раб)',
    bytes: 2,
    value: 0,
  },
  Sx: {
    description: 'Элементы корреляционной матрицы',
    bytes: 4,
    value: 0,
  },
  Sy: {
    description: 'Элементы корреляционной матрицы',
    bytes: 4,
    value: 0,
  },
  Km: {
    description: 'Элементы корреляционной матрицы',
    bytes: 4,
    value: 0,
  },
  Bka: {
    description: 'Широта ПТ в радианах',
    bytes: 4,
    value: 0,
  },
  Lka: {
    description: 'Долгота ПТ в радианах',
    bytes: 4,
    value: 0,
  },
  Hka: {
    description: 'Высота KA в км',
    bytes: 4,
    value: 0,
  },
  Mu: {
    description: 'Угол по азимуту на KA в секундах',
    bytes: 4,
    value: 0,
  },
  Q: {
    description: 'Угол места на KA в секундах',
    bytes: 4,
    value: 0,
  },
  Num_Kl: {
    description: 'Номер кластера',
    bytes: 2,
    value: 0,
  },
  Pot_Rls: {
    description: 'Потенциал расчитанный функцией DLL в Дб',
    bytes: 2,
    value: 0,
  },
  Nob: {
    description: 'Номер объекта, с которым отождествился сигнал',
    bytes: 2,
    value: 0,
  },
  Nrtc: {
    description: 'Номер РТС на объекте, с которым отождествился',
    bytes: 2,
    value: 0,
  },
  Nprtc: {
    description: 'Номер режима работы РТС на объекте',
    bytes: 2,
    value: 0,
  },
  Nreg: {
    description: 'Номер географического района (ввел Голофаст)',
    bytes: 2,
    value: 0,
  },
  ROob: {
    description: 'Расcтояние от объекта до измеренных координат, км',
    bytes: 4,
    value: 0,
  },
  Res: {
    description: 'Для кода КА (в задаче отождествления)',
    bytes: 1,
    value: 0,
  },
  VisUSP: {
    description: 'Флаг показа подспутниковой точки (только для Глобуса)',
    bytes: 1,
    value: 0,
  },
  Reserv1: {
    description: 'Дополнение до 128 байт (array[1..6]of Byte)',
    bytes: 6,
    value: 0,
  },
};
