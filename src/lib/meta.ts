export const gaussProps = ['Latitude', 'Longitude'];
export interface RLS {
  label: string;
  impulse: number;
  range: [number, number];
}

export const rlsList: Array<RLS> = [
  {
    label: 'AN/TSC- 187',
    range: [7900, 8400],
    impulse: 0.6,
  },
  {
    label: 'AN/TTC- 59',
    range: [10000, 10020],
    impulse: 0.8,
  },
  {
    label: 'AN/TPQ-37',
    range: [3100, 3400],
    impulse: 0.4,
  },
  {
    label: 'AN/TSC- 156',
    range: [4000, 8000],
    impulse: 0.8,
  },
  {
    label: 'AN/TPQ-31',
    range: [4000, 6000],
    impulse: 1,
  },
  {
    label: 'AN/TSC- 156',
    range: [1250, 1350],
    impulse: 1.1,
  },
];

export const firstDayPositions = [
  [-2.270459424032604, -2.015867316269221],
  [-2.561391594378088, -2.1449968431458886],
  [-2.770449162592245, -2.1284289991527863],
  [-2.461438988447012, -2.241868732832746],
  [-2.6353490933989394, -2.133555975944508],
  [-2.4176516061712094, -1.7060893876991547],
  [-2.634873862128373, -1.868525352004475],
  [-2.54543463385898, -2.1835124810859012],
  [-2.486627756338475, -2.0913200288351432],
  [-2.517826259061891, -1.7021628450134023],
  [-2.564292522843079, -1.9484008066601124],
  [-2.4993857959265595, -2.242659858853914],
  [-2.2851658577707186, -1.9151924708609815],
  [-2.659718010013617, -2.2838246994482674],
  [-2.434179215984769, -1.8351805004529342],
  [-2.615065796457877, -2.000942286584574],
  [-2.562756184717245, -2.0814470830817116],
  [-2.3300143131666644, -1.8588724062694864],
  [-2.367739164431431, -1.8213327637074164],
  [-2.482180453276642, -1.964031364738393],
  [-2.5816760688063045, -1.735013421937219],
  [-2.4808704862075044, -2.2331109424170816],
  [-3.0137786567500373, -1.940635973164566],
  [-2.3058535990972713, -1.8526492600981226],
  [-2.500805624022599, -1.9897278687457982],
  [-2.2280554985809427, -2.2022792354709195],
  [-2.0691997967523332, -1.9875718533298201],
  [-2.4055703686145633, -1.7204970421912478],
  [-2.3488180002207875, -1.9086226109775037],
  [-2.6998813323056448, -2.1897678186218865],
];

export const secondDayPositions = [
  [3.7215916748158153, -2.9140756211138306],
  [4.168724012016299, -2.814032655539316],
  [4.103951763029349, -3.2167911567004337],
  [3.9501362697330835, -3.3100730709412667],
  [4.241066187413372, -3.2393436397192623],
  [3.743072041269726, -3.0098534059515574],
  [4.284021724582106, -3.1132779050827724],
  [3.989080260608435, -2.8172436710894475],
  [3.930307815054839, -2.628178704783901],
  [3.887793591578551, -3.004023611082743],
  [3.6748630938212283, -3.2052428106607254],
  [4.157597469948134, -2.518272287260175],
  [4.3785963818263465, -2.740725379360329],
  [3.9416108634086964, -3.1528456630205897],
  [4.131433796909686, -3.099040400135843],
  [3.7915151826248628, -3.165768344587997],
  [3.8182792858156596, -2.8469940585012328],
  [3.667640107528595, -3.192179513069182],
  [3.477518439734659, -2.808686492422266],
  [4.088569224007567, -3.01398582335106],
  [4.336560942369948, -2.7396319009968644],
  [4.224960992747272, -3.3742846617689968],
  [3.7537040344298083, -2.9579557612010046],
  [4.052538823098377, -3.1847486723302225],
  [4.136084626274205, -3.11311121809873],
  [4.190475192252037, -2.8164771474529307],
  [3.8326943492028853, -2.9516355239867997],
  [4.0054780206632685, -2.6252129039005476],
  [3.8661521454225194, -3.041279730971876],
  [4.016570519106367, -2.749877158395068],
];

export const efs1 = [
  {
    lat: 34.44278315821726,
    lon: 19.05046288696089,
    freq: 33125.790673120886,

    date: '16-5-2024 21:58:15',
  },
  {
    lat: 34.619343477627844,
    lon: 18.993325009177607,
    freq: 8887.131228758984,

    date: '16-5-2024 21:56:22',
  },
  {
    lat: 34.402283550730516,
    lon: 18.805435937301045,
    freq: 9029.380234943683,

    date: '16-5-2024 21:9:54',
  },
  {
    lat: 34.317312719666305,
    lon: 18.935005619226892,
    freq: 3898.5205831159765,

    date: '16-5-2024 20:44:31',
  },
  {
    lat: 34.55593128538338,
    lon: 18.833850337593017,
    freq: 9169.002100536914,

    date: '16-5-2024 19:28:43',
  },
  {
    lat: 34.2968893219466,
    lon: 18.928954725291355,
    freq: 9409.790525072684,

    date: '16-5-2024 21:39:2',
  },
  {
    lat: 34.49539799666647,
    lon: 19.126213860380158,
    freq: 871.6585349062068,

    date: '16-5-2024 11:35:36',
  },
  {
    lat: 34.42023811380032,
    lon: 18.933309900206424,
    freq: 8742.715809598085,

    date: '16-5-2024 16:9:35',
  },
  {
    lat: 34.50933416258654,
    lon: 18.9101528000652,
    freq: 33220.13883550534,

    date: '16-5-2024 4:8:23',
  },
  {
    lat: 34.4270219613015,
    lon: 18.988952578110492,
    freq: 15629.343212330192,

    date: '16-5-2024 23:39:40',
  },
  {
    lat: 34.40028616275258,
    lon: 19.107017317824994,
    freq: 908.8450180207226,

    date: '16-5-2024 11:53:9',
  },
  {
    lat: 34.1421996590016,
    lon: 19.005774571843336,
    freq: 15424.339644815987,

    date: '16-5-2024 17:6:8',
  },
  {
    lat: 34.49327783151214,
    lon: 18.895104059934436,
    freq: 5455.572553161997,

    date: '16-5-2024 17:57:59',
  },
  {
    lat: 34.3836248100764,
    lon: 19.125729679641807,
    freq: 3036.7000022211187,

    date: '16-5-2024 17:59:55',
  },
  {
    lat: 34.53122381806636,
    lon: 18.95834045324749,
    freq: 8569.170664685329,

    date: '16-5-2024 17:28:55',
  },
  {
    lat: 34.42567615968641,
    lon: 18.993799340453894,
    freq: 3490.289770428777,

    date: '16-5-2024 1:46:15',
  },
  {
    lat: 34.52387921460831,
    lon: 19.001770334700876,
    freq: 9279.089866234375,

    date: '16-5-2024 17:45:51',
  },
  {
    lat: 34.48842122535271,
    lon: 18.948305160794632,
    freq: 2900.1627500936725,

    date: '16-5-2024 14:39:17',
  },
  {
    lat: 34.560474895915476,
    lon: 18.716847634659587,
    freq: 33060.10933420695,

    date: '16-5-2024 3:54:53',
  },
  {
    lat: 34.50726888167839,
    lon: 19.127915502521393,
    freq: 937.9017767533314,

    date: '16-5-2024 9:41:5',
  },
  {
    lat: 34.29870866900911,
    lon: 18.83896020291427,
    freq: 5449.441350488587,

    date: '16-5-2024 20:3:55',
  },
  {
    lat: 34.335802707712226,
    lon: 19.002725754699114,
    freq: 33338.662183215434,

    date: '16-5-2024 14:17:15',
  },
  {
    lat: 34.4731680601827,
    lon: 18.81896880551858,
    freq: 896.4412100957381,

    date: '16-5-2024 15:47:29',
  },
  {
    lat: 34.3782698313161,
    lon: 18.856242842975693,
    freq: 3042.8030600082893,

    date: '16-5-2024 13:14:6',
  },
  {
    lat: 34.582915162030176,
    lon: 18.801863671800945,
    freq: 886.2628548909705,

    date: '16-5-2024 2:8:8',
  },
  {
    lat: 34.34192086873053,
    lon: 18.940854472081575,
    freq: 8644.491334192822,

    date: '16-5-2024 13:14:49',
  },
  {
    lat: 34.3088480441135,
    lon: 18.913124759808422,
    freq: 8530.393560058077,

    date: '16-5-2024 14:3:35',
  },
  {
    lat: 34.42629266592623,
    lon: 18.954451097054278,
    freq: 890.5488696234585,

    date: '16-5-2024 10:22:5',
  },
  {
    lat: 34.33987655804455,
    lon: 19.092321254472576,
    freq: 9068.79764910493,

    date: '16-5-2024 7:50:51',
  },
  {
    lat: 34.50859621229259,
    lon: 18.994941632716987,
    freq: 8581.05788564424,

    date: '16-5-2024 14:25:22',
  },
];

export const efs2 = [
  {
    lat: 33.33286900342581,
    lon: 26.031206058262732,
    freq: 15614.50963099414,

    date: '17-5-2024 1:7:20',
  },
  {
    lat: 33.22670151824207,
    lon: 25.819170837292027,
    freq: 3656.3769903004336,

    date: '17-5-2024 11:37:46',
  },
  {
    lat: 33.34309191361123,
    lon: 25.819863733869354,
    freq: 2942.303506676065,

    date: '17-5-2024 22:7:5',
  },
  {
    lat: 33.30902410205698,
    lon: 25.95729725584912,
    freq: 15573.134189413426,

    date: '17-5-2024 20:56:26',
  },
  {
    lat: 33.27642827640855,
    lon: 26.058929033414532,
    freq: 3627.276780015644,

    date: '17-5-2024 19:53:9',
  },
  {
    lat: 33.312427205547166,
    lon: 25.698362681921957,
    freq: 15566.732439722846,

    date: '17-5-2024 5:19:16',
  },
  {
    lat: 33.20106572848967,
    lon: 25.77080549588381,
    freq: 3018.773581821569,

    date: '17-5-2024 5:19:45',
  },
  {
    lat: 33.37053924212642,
    lon: 25.865111384834798,
    freq: 3645.219003382319,

    date: '17-5-2024 2:49:43',
  },
  {
    lat: 33.249032392742976,
    lon: 25.840887160427783,
    freq: 2906.9096936174296,

    date: '17-5-2024 19:33:14',
  },
  {
    lat: 33.533646527341006,
    lon: 25.978919285780304,
    freq: 9976.377580178805,

    date: '17-5-2024 12:40:30',
  },
  {
    lat: 33.44782189508493,
    lon: 26.02227400361891,
    freq: 3644.292116161945,

    date: '17-5-2024 13:2:24',
  },
  {
    lat: 33.34579945049097,
    lon: 25.888028724774642,
    freq: 9903.683023768808,

    date: '17-5-2024 6:3:18',
  },
  {
    lat: 33.52999282846858,
    lon: 26.014089909044703,
    freq: 9194.3431397425,

    date: '17-5-2024 11:11:10',
  },
  {
    lat: 33.520039136849654,
    lon: 25.994078190442465,
    freq: 2973.218236641215,

    date: '17-5-2024 5:41:32',
  },
  {
    lat: 33.32589164759275,
    lon: 25.86141773099638,
    freq: 3595.361710499012,

    date: '17-5-2024 3:20:9',
  },
  {
    lat: 33.41903255843936,
    lon: 25.948621056294936,
    freq: 15688.638719249013,

    date: '17-5-2024 2:59:27',
  },
  {
    lat: 33.2443779791112,
    lon: 25.91894288357664,
    freq: 3682.5724139034182,

    date: '17-5-2024 11:28:8',
  },
  {
    lat: 33.20999619883909,
    lon: 25.94944334986919,
    freq: 3060.22491800683,

    date: '17-5-2024 19:57:43',
  },
  {
    lat: 33.32043334169497,
    lon: 25.938050493101763,
    freq: 9971.95935369531,

    date: '17-5-2024 20:22:46',
  },
  {
    lat: 33.37053626865871,
    lon: 25.859209391949737,
    freq: 3664.6956077812715,

    date: '17-5-2024 2:3:29',
  },
  {
    lat: 33.38395714720662,
    lon: 25.910342188428775,
    freq: 9472.713953921337,

    date: '17-5-2024 10:13:48',
  },
  {
    lat: 33.34832517111437,
    lon: 25.844285391676287,
    freq: 3034.822030381535,

    date: '17-5-2024 11:26:55',
  },
  {
    lat: 33.37747437788434,
    lon: 25.83077349876763,
    freq: 5462.499600491266,

    date: '17-5-2024 21:56:40',
  },
  {
    lat: 33.26908860568269,
    lon: 25.97704042961282,
    freq: 15523.448329240231,

    date: '17-5-2024 10:28:31',
  },
  {
    lat: 33.24045745315349,
    lon: 25.860625329525835,
    freq: 15442.28463695273,

    date: '17-5-2024 2:27:56',
  },
  {
    lat: 33.30954420298376,
    lon: 25.784230442167313,
    freq: 15686.526321723932,

    date: '17-5-2024 6:30:47',
  },
  {
    lat: 33.46538497233291,
    lon: 25.85888156201929,
    freq: 15597.946136967888,

    date: '17-5-2024 14:47:55',
  },
  {
    lat: 33.16701126112523,
    lon: 25.759528657060677,
    freq: 9309.506333293994,

    date: '17-5-2024 6:9:32',
  },
  {
    lat: 33.44357190782136,
    lon: 25.88408579854736,
    freq: 5501.656371011778,

    date: '17-5-2024 6:26:58',
  },
  {
    lat: 33.25841327918377,
    lon: 25.829963490244413,
    freq: 3610.0390134276204,
    date: '17-5-2024 1:28:7',
  },
];

export const observations = [
  {
    label: 'Авианосец «НИМИЦ»',
    list: [
      {
        label: 'AN/SPS-48E',
        range: [2900, 3100],
        desc: 'ОВЦ',
        civilian: true,
      },
      {
        label: 'AN/SPS-49(V)5',
        range: [880, 910],
        desc: 'ОВЦ. Определение азимута и дальности до целей. Выдача ЦУ на ЗРК',
        civilian: false,
      },
      {
        label: 'AN/SPQ-9B',
        range: [8500, 9600],
        desc: 'Управление огнем ЗА, ОНЦ, ОНВЦ',
        civilian: false,
      },
      {
        label: 'AN/SPN-46',
        range: [3590, 3700],
        desc: 'РЛС УВД. Посадочная',
        civilian: true,
      },
      {
        label: 'AN/SPN-43C',
        range: [33000, 33400],
        desc: 'Диспетчерская',
        civilian: true,
      },
      {
        label: 'AN/SPN-41',
        range: [15400, 15700],
        desc: 'Посадочная',
        civilian: true,
      },
    ],
  },

  {
    label: 'Крейсер УРО типа «Тикондерога»',
    list: [
      {
        label: 'AN/SPY-1A',
        range: [3100, 3900],
        desc: 'Многофункциональная. Поиск, обнаружение и наведение ракет по нескольким ВЦ',
        civilian: false,
      },
      {
        label: 'AN/SPS-49',
        range: [850, 910],
        desc: 'ОВЦ. Выдача ЦУ на ЗРК. Определение азимута и дальности до целей',
        civilian: false,
      },
      {
        label: 'AN/SPS-55',
        range: [9050, 10000],
        desc: 'ОНЦ',
        civilian: true,
      },
      {
        label: 'AN/SPG-62',
        range: [8500, 9600],
        desc: 'УО ЗА',
        civilian: false,
      },
      {
        label: 'AN/SPQ-9A',
        range: [8500, 9600],
        desc: 'УО ЗА, ОНЦ, ОНВЦ',
        civilian: false,
      },
    ],
  },
  {
    label: 'Эскадренный миноносец типа «АрлиБерк»',
    list: [
      {
        label: 'AN/SPY-1D',
        range: [3100, 3900],
        desc: 'Многофункциональная. Поиск, обнаружение и наведение ракет по нескольким ВЦ',
        civilian: false,
      },
      {
        label: 'AN/SPS-49',
        range: [850, 950],
        desc: 'ОВЦ. Выдача ЦУ на ЗРК. Определение азимута и дальности до целей.',
        civilian: false,
      },
      {
        label: 'AN/SPS-55',
        range: [9050, 10000],
        desc: 'ОНЦ',
        civilian: true,
      },
      {
        label: 'AN/SPG-62',
        range: [8500, 9600],
        desc: 'УО ЗА',
        civilian: false,
      },
      {
        label: 'AN/SPG-67',
        range: [5380, 5580],
        desc: 'ОНЦ',
        civilian: true,
      },
      {
        label: 'AN/SPG-64',
        range: [3025, 3075],
        desc: 'Навигационное обеспечение',
        civilian: true,
      },
    ],
  },
];

export const optic1 = [
  {
    label: '16-05-2024 10:24',
    link: './first1.jpg',
  },
  {
    label: '16-05-2024 9:41',
    link: './first2.jpg',
  },
  {
    label: '16-05-2024 8:05',
    link: './first3.jpg',
  },
];

export const optic2 = [
  {
    label: '17-05-2024 15:31',
    link: './second1.jpg',
  },
];
