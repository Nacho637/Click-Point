import { sprite, type Sprite } from "@/game/pixel/palette";

// ── Spieler: Meerschweinchen in vier Richtungen, je 2 Laufphasen ─────────────
// "left" wird beim Zeichnen aus "right" gespiegelt.

const heroDown0 = sprite(`
......kk......
...kkk..kkk...
...kpk..kpk...
..kffffffffk..
.kffffffffffk.
.kfEEffffEEfk.
.kfEEffffEEfk.
.kffffPPffffk.
.kffffffffffk.
..kffffffffk..
..kfFFFFFFfk..
..kfFFFFFFfk..
..kffffffffk..
...kcc..cck...
`);

const heroDown1 = sprite(`
......kk......
...kkk..kkk...
...kpk..kpk...
..kffffffffk..
.kffffffffffk.
.kfEEffffEEfk.
.kfEEffffEEfk.
.kffffPPffffk.
.kffffffffffk.
..kffffffffk..
..kfFFFFFFfk..
..kfFFFFFFfk..
..kffffffffk..
..cck....kcc..
`);

const heroUp0 = sprite(`
......kk......
...kkk..kkk...
...kfk..kfk...
..kffffffffk..
.kffffffffffk.
.kffFFFFFFffk.
.kfFFFFFFFFfk.
.kfFFccccFFfk.
.kffFFFFFFffk.
..kffffffffk..
..kffffffffk..
..kffffffffk..
..kffffffffk..
...kcc..cck...
`);

const heroUp1 = sprite(`
......kk......
...kkk..kkk...
...kfk..kfk...
..kffffffffk..
.kffffffffffk.
.kffFFFFFFffk.
.kfFFFFFFFFfk.
.kfFFccccFFfk.
.kffFFFFFFffk.
..kffffffffk..
..kffffffffk..
..kffffffffk..
..kffffffffk..
..cck....kcc..
`);

const heroSide0 = sprite(`
..............
.........kk...
........kppk..
.....kkffffk..
...kffffffffk.
..kffffffffEk.
.kffFFFFfffPk.
.kfFFFFFfffk..
.kfFFFFffffk..
..kffffffffk..
..kffffffffk..
...kk.kk.kk...
...c..c..c....
..............
`);

const heroSide1 = sprite(`
..............
.........kk...
........kppk..
.....kkffffk..
...kffffffffk.
..kffffffffEk.
.kffFFFFfffPk.
.kfFFFFFfffk..
.kfFFFFffffk..
..kffffffffk..
..kffffffffk..
..kk.kk.kk....
.c..c..c......
..............
`);

export type Facing = "down" | "up" | "left" | "right";

export const HERO_FRAMES: Record<Facing, [Sprite, Sprite]> = {
  down: [heroDown0, heroDown1],
  up: [heroUp0, heroUp1],
  right: [heroSide0, heroSide1],
  left: [heroSide0, heroSide1], // gespiegelt gezeichnet
};

// ── Umgebung / Requisiten ────────────────────────────────────────────────────

export const SPR = {
  tree: sprite(`
......ttttt.......
....ttTtttTtt.....
...tTtttttttTt....
..ttttttttttttt...
..tTtttttttttTt...
.tttttttttttttTt..
.tTttttttttttttt..
.ttttttttttttttt..
.tTttttttttttTtt..
..tttttttttttTt...
..ttTttttttttt....
...tttTtttttt.....
....tttttttt......
......uUuu........
......uUUu........
......uUUu........
.....uuUUuu.......
`),

  bush: sprite(`
....ttttt.....
..ttTttttTt...
.ttttttttttt..
.tTtttttttTt..
.ttttrttttttt.
.tTttttttttTt..
..ttTttttttt..
...tttttttt...
`),

  flowers: sprite(`
.r..y..v.
rrr yyy vv
.r..y..v.
.G..G..G.
GGGGGGGGG
`),

  // Gartentor – geschlossen (Holzlatten) / offen
  gateClosed: sprite(`
mm..mm..mm..mm
mwmmwmmwmmwmmw
mwmmwmmwmmwmmw
mmmmmmmmmmmmmm
mwmmwmmwmmwmmw
mwmmwmmwmmwmmw
mmmmmmmmmmmmmm
mwmmwmmwmmwmmw
mwmmwmmwmmwmmw
mm..mm..mm..mm
`),

  gateOpen: sprite(`
mm..........mm
mwm........mwm
mwm........mwm
mmm........mmm
mwm........mwm
mwm........mwm
mmm........mmm
mwm........mwm
mwm........mwm
mm..........mm
`),

  // Zaun-/Hecken-Segment für die Weltgrenze
  hedge: sprite(`
tTtttTtttTt
ttttttttttt
tTtttTtttTt
GtttGtttGtt
`),

  shed: sprite(`
..RRRRRRRRRRRR..
.RRRRRRRRRRRRRR.
RRRRRRRRRRRRRRRR
mmmmmmmmmmmmmmmm
mwwmwwmwwmwwmwwm
mwwmwwmwwmwwmwwm
mwwmwwmKKmwwmwwm
mwwmwwmKKmwwmwwm
mwwmwwmKKmwwmwwm
mmmmmmmKKmmmmmmm
`),

  sign: sprite(`
.wwwwww.
wwwwwwww
wKKKKKKw
wKwwwwKw
wwwwwwww
...mm...
...mm...
...mm...
`),

  flowerpot: sprite(`
..tTtt..
.tttttt.
ttGttGtt
.wwwwww.
..wwww..
.wwwwww.
.wwwwww.
..wwww..
`),

  // ── Garten-NPCs ────────────────────────────────
  hedgehog: sprite(`
..KKKKKK....
.KcKcKcKc...
KcKcKcKcKc..
KcKcKcKcKccF
.KcKcKcKcFFF
..KKKKKcFEPF
.....cFFFFF.
`),

  sparrow: sprite(`
...kkk....
..kFFFk...
.kFFFFFk..
kFFEFFFky.
kFFFFFFk..
.kFcccFk..
..kFFk....
...uu.....
...uu.....
`),

  frog: sprite(`
.tt....tt.
tEEt..tEEt
.tttttttt.
ttgtttgttt
tgttttttgt
.tgggggggt.
..t....t..
`),

  snail: sprite(`
.........cc.
....mmmm..cc
..mmwwwwm.c.
.mwwmwwmwm..
.mwwwmwwwm..
FFmwwwwwmF..
FFFmmmmmFFEF
.FFF....FFF.
`),

  gnome: sprite(`
....rr....
...rrrr...
..rrrrrr..
.rrrrrrrr.
....ff....
...fEEf...
...fPPf...
..iiiiii..
.iiiiiiii.
..iiiiii..
...c..c...
`),

  mouse: sprite(`
.ss....ss.
sSSs..sSSs
.ssssssss.
ssEssssEss
ssssPPssss
.ssssssss.
..s....s..
....cccc..
`),

  bee: sprite(`
..LL..LL..
.LLLLLLLL.
..yKyKyy..
.yKyKyKyK.
.yKyKyKyK.
..yKyKyy..
...KKKK...
`),

  worm: sprite(`
....ppp...
..ppPppp..
.pPpEpPpp.
pPpppppPpp
.pppppppp.
..pppppp..
`),

  squirrel: sprite(`
.......QQ...
......QqqQ..
...qqqqqqQ..
..qqEqqqqq..
..qqqPqqq...
..qqqqqqq...
.qqLLLLqq...
qQ.qqqq.Qq..
qQqqqqqqqQ..
.QQ....QQ...
`),

  blackbird: sprite(`
...KKKK...
..KKKKKK..
.KKKKKKKK.
.KKoKKKKy.
.KKKKKKK..
.KKKKKKKK.
..KKKKKK..
...qq.qq..
`),

  // ── Hof-NPCs / Objekte ─────────────────────────
  fox: sprite(`
.Q......Q.
QqQ....QqQ
.qqqqqqqq.
.qEqqqqEq.
.qqqqqqqq.
LqqqqqqqL.
LLqqqqqqLL
.qqqqqqqq.
Qq.qqqq.qQ
qQ......Qq
`),

  doghouse: sprite(`
....RRRRRR....
...RRRRRRRR...
..RRRRRRRRRR..
.mmmmmmmmmmmm.
.mmmKKKKKKmmm.
.mmKKKKKKKKmm.
.mmKKKKKKKKmm.
.mmKKKKKKKKmm.
.mmmmmmmmmmmm.
`),

  car: sprite(`
....iiiiiiiii.....
..iiLLLLLLLLLLii..
.iLLLLLLLLLLLLLLi.
riiiiiiiiiiiiiiir.
riiiiiiiiiiiiiiir.
rriiiiiiiiiiiirrr.
.KK..........KK...
.KsK........KsK...
.KK..........KK...
`),

  bin: sprite(`
.SSSSSSSS.
SzzzzzzzzS
.ssssssss.
.sSsSsSss.
.ssssssss.
.sSsSsSss.
.ssssssss.
.sSsSsSss.
.zzzzzzzz.
`),

  doormat: sprite(`
mmmmmmmmmmmm
mDDDDDDDDDDm
mDeDeDeDeDDm
mDDDDDDDDDDm
mmmmmmmmmmmm
`),

  hole: sprite(`
.KKKKKKKK.
KKKKKKKKKK
KKKKKKKKKK
KKKKKKKKKK
.KKKKKKKK.
`),

  houseWall: sprite(`
RRRRRRRRRRRRRRRR
RwRwRwRwRwRwRwRR
RRRRRRRRRRRRRRRR
RwRwRwRwRwRwRwRR
RRRRRRRRRRRRRRRR
RwRwRwRwRwRwRwRR
RRRRRRRRRRRRRRRR
`),

  door: sprite(`
mmmmmmmm
mwwwwwwm
mwwwwwwm
mwwyywwm
mwwyywwm
mwwwwwwm
mwwwwwwm
mmmmmmmm
`),

  stairs: sprite(`
............mm
.........mmmww
......mmmwwwww
...mmmwwwwwwww
mmmwwwwwwwwwww
mwwwwwwwwwwwww
`),

  pond: sprite(`
..sBBBBBBBs...
.sBbbbbbbbBs..
sBbbbLbbbbbBs.
sBbbbbbbtgbBs.
sBbbbbbbtggBs.
.sBbbbbbbbBs..
..sBBBBBBBs...
`),

  birdbath: sprite(`
.sBBBBs.
sBbbbbBs
.ssssss.
...ss...
...ss...
..ssss..
`),

  bench: sprite(`
wwwwwwwwww
wwwwwwwwww
..........
mw......wm
mw......wm
mw......wm
`),

  compost: sprite(`
.eeeeeeee.
eeGeeGeeee
eGeeeeGeee
eeeeGeeeee
eeeeeeeeee
`),

  wateringCan: sprite(`
...sSSSs..
..sSSSSSs.
.sSSSSSSs.
sSSSSSSSSs
.sSSSSSSs.
.ssssssss.
`),

  wheelbarrow: sprite(`
.zzzzzzzz..
zSSSSSSSSz.
zSSSSSSSSz.
.zzzzzzzz..
...KK......
..KKKK.....
...KK......
`),

  // ── Item-Aufsammler (klein) ────────────────────
  key: sprite(`
.yy...
yYYy..
yYYy..
.yy...
.yy...
.yyy..
.yyy..
`),

  crumbs: sprite(`
..d..d..
.dd.d.d.
d.d..dd.
.dd.d...
`),

  stone: sprite(`
.ssss.
sSssSs
sssSss
.ssss.
`),

  leaf: sprite(`
...jj.
..jjjj
.jjjjj
jjjjj.
.mj...
.m....
`),

  cap: sprite(`
.iiii.
iIiiIi
iiiiii
.iIIi.
`),

  crowbar: sprite(`
....SS
...SS.
..SS..
.SS...
SS....
SS....
`),

  tinCan: sprite(`
.ssss.
sLLLLs
sLLLLs
sLLLLs
.ssss.
`),

  oilCan: sprite(`
.ssss.
szzzzs
szzzzs
szzzzs
.ssss.
`),

  rustyKey: sprite(`
.cc...
cWWc..
cWWc..
.cc...
.cc...
.ccc..
`),

  shovel: sprite(`
..m...
..m...
..m...
.sss..
.sss..
.sss..
`),

  magnet: sprite(`
.rrrr.
rr..rr
rr..rr
r....r
s....s
`),

  note: sprite(`
LLLLLL
LKKKKL
LKLLKL
LKKKKL
LLLLLL
`),

  string: sprite(`
d.....
.d.d..
..d.d.
.d.d..
d.....
`),

  biscuit: sprite(`
.wwww.
wKwwKw
wwwwww
wKwwKw
.wwww.
`),

  // ── Flache Bodenmarken ─────────────────────────
  digspot: sprite(`
..eeee..
.eDeeDe.
eDeeeeDe
.eeDeee.
..eeee..
`),

  puddle: sprite(`
..zzzz....
.zKKKKzz..
zKKKKKKKz.
.zKKKKzz..
..zzz.....
`),

  brick: sprite(`
.RRRRRR.
RQRRQRRR
RRRRRRRR
RQRRQRRR
.RRRRRR.
`),

  vegbed: sprite(`
eeeeeeeeee
etGtetGtee
eeeeeeeeee
etGtetGtee
eeeeeeeeee
`),
} satisfies Record<string, Sprite>;

export type SpriteKey = keyof typeof SPR;
