/* Opening tree data.
   m   : one or more SAN moves (space separated) played from the parent position
   n   : opening name, eco: ECO code
   s   : [White wins, draws, Black wins] in percent, g: approximate games
         (approximate master-level OTB figures, rounded; transposed positions share one set)
   note: what the position is about, tx: transposition note, k: children */
const TREES = {
  english: {
    label: "English", first: "1.c4 e6",
    node: { m: "c4 e6", n: "English Opening: Agincourt Defence", eco: "A13", s: [36, 40, 24], g: 24000,
      note: "Black keeps every …d5 structure in reserve. White chooses between a Catalan fianchetto, a Queen's Gambit with d4, or a French-style centre with e4.",
      k: [
        { m: "Nf3", n: "Agincourt, Réti move order", s: [33, 45, 22], g: 9200,
          note: "The most popular reply. White delays d4 so Black cannot pin with …Bb4 straight away.",
          k: [
            { m: "d5", s: [33, 46, 21], g: 6800, k: [
              { m: "g3", n: "Agincourt, Catalan setup", s: [33, 47, 20], g: 3400, k: [
                { m: "Nf6 Bg2", s: [33, 47, 20], g: 2900,
                  note: "A Catalan without d4. White keeps the option of b3, d4 or a pure Réti.",
                  k: [
                    { m: "Be7 O-O O-O", n: "Closed Agincourt", s: [31, 52, 17], g: 1100,
                      note: "Solid and drawish. With d4 next it becomes a Closed Catalan (E06).",
                      tx: "Becomes a Closed Catalan (E06) after d4." },
                    { m: "dxc4", n: "Open Agincourt", s: [36, 40, 24], g: 900,
                      note: "Black grabs c4. White regains it with Qa4+ or by castling and hitting c4 with Qa4 or Na3. Clinging to the pawn with …b5 is risky.",
                      k: [
                        { m: "O-O", s: [37, 38, 25], g: 400, trap: "catalan-b5" },
                        { m: "Qa4+ Nbd7 Qxc4", s: [34, 44, 22], g: 300,
                          note: "Simple and safe. White gets the pawn back at once." }
                      ] },
                    { m: "c5", s: [34, 42, 24], g: 500, note: "Black takes space; play resembles a Tarrasch with colours reversed." }
                  ] }
              ] },
              { m: "d4", n: "Queen's Gambit Declined (transposed)", eco: "D30", s: [36, 44, 20], g: 41000,
                tx: "Same position as 1.d4 d5 2.c4 e6 3.Nf3.",
                k: [
                  { m: "Nf6 Nc3", n: "QGD, Three Knights", eco: "D37", s: null,
                    tx: "Same position as 2.Nc3 d5 3.d4 Nf6 4.Nf3." }
                ] },
              { m: "b3", n: "Réti, Nimzo-Larsen setup", s: [34, 42, 24], g: 900,
                note: "White fianchettoes on the long dark diagonal and avoids theory." }
            ] },
            { m: "Nf6", s: [34, 43, 23], g: 2000,
              note: "Flexible. After d4 Black can choose a Queen's Indian (…b6) or a Bogo-Indian (…Bb4+).",
              k: [
                { m: "Nc3", s: null, tx: "Same position as 2.Nc3 Nf6 3.Nf3." },
                { m: "g3 d5 Bg2", s: null, tx: "Same position as 2.Nf3 d5 3.g3 Nf6 4.Bg2." }
              ] },
            { m: "b6", n: "Agincourt, Queen's Indian setup", s: [33, 42, 25], g: 600 }
          ] },
        { m: "Nc3", n: "Agincourt, Nc3 line", s: [36, 38, 26], g: 7800,
          note: "Prepares e4 (the Mikenas–Carls) and keeps d4 in reserve for a Queen's Gambit.",
          k: [
            { m: "d5", s: [36, 41, 23], g: 4100, k: [
              { m: "d4", n: "Queen's Gambit Declined (transposed)", eco: "D31", s: [37, 42, 21], g: 70000,
                tx: "Same position as 1.d4 d5 2.c4 e6 3.Nc3.",
                k: [
                  { m: "Nf6", n: "QGD, main line", eco: "D35", s: [37, 44, 19], g: 45000,
                    tx: "Same position as 1.d4 d5 2.c4 e6 3.Nc3 Nf6.",
                    k: [
                      { m: "Bg5", n: "QGD, 4.Bg5", s: [37, 45, 18], g: 18000, k: [
                        { m: "Be7 e3 O-O Nf3", n: "QGD, Orthodox Defence", eco: "D55", s: [35, 49, 16], g: 5500,
                          note: "The classical main line. Black plans …h6, …b6 (Tartakower) or …Ne4 (Lasker)." },
                        { m: "Nbd7", n: "QGD, Elephant Trap line", eco: "D51", s: [37, 43, 20], g: 4000,
                          note: "Looks like it drops d5 to cxd5 exd5 Nxd5. It does not.",
                          trap: "elephant",
                          k: [
                            { m: "e3 c6 Nf3 Qa5", n: "QGD, Cambridge Springs Defence", eco: "D52", s: [33, 42, 25], g: 900,
                              note: "The queen pins c3 and eyes g5. Black hopes for …Ne4 and …dxc4.",
                              trap: "cambridge" }
                          ] }
                      ] },
                      { m: "cxd5 exd5 Bg5", n: "QGD, Exchange Variation", eco: "D35", s: [40, 44, 16], g: 5000,
                        note: "The Carlsbad structure. White's classic plan is the minority attack with b4–b5.",
                        tx: "Same position as 2.Nc3 d5 3.cxd5 exd5 4.d4 Nf6 5.Bg5." },
                      { m: "Nf3", n: "QGD, Three Knights", eco: "D37", s: [35, 46, 19], g: 12000,
                        note: "Black picks a system: …Be7, …Bb4 (Ragozin), …dxc4 (Vienna) or …c6 (Semi-Slav).",
                        k: [
                          { m: "Bb4", n: "Ragozin Defence", eco: "D38", s: [36, 42, 22], g: 2500 },
                          { m: "c6", n: "Semi-Slav", eco: "D43", s: [36, 40, 24], g: 4500 },
                          { m: "dxc4", n: "Vienna-style capture", eco: "D37", s: [36, 38, 26], g: 900 }
                        ] }
                    ] },
                  { m: "Be7", n: "QGD, Alatortsev Variation", eco: "D31", s: [37, 45, 18], g: 9000,
                    note: "Avoids the Bg5 pin. Often met by cxd5 exd5 Bf4." },
                  { m: "c5", n: "Tarrasch Defence", eco: "D32", s: [40, 36, 24], g: 7000,
                    note: "Black accepts an isolated d-pawn for free piece play.",
                    k: [
                      { m: "cxd5 exd5 Nf3 Nc6 g3", n: "Tarrasch, Rubinstein System", eco: "D34", s: [39, 39, 22], g: 3500,
                        note: "The fianchetto bishop presses on d5. Main-line theory for over a century." },
                      { m: "cxd5 cxd4", n: "Schara–Hennig Gambit", eco: "D32", s: [45, 25, 30], g: 500,
                        note: "A pawn for rapid development. Main line: 5.Qa4+ Bd7 6.Qxd4 exd5 7.Qxd5 Nc6." }
                    ] }
                ] },
              { m: "cxd5 exd5 d4", n: "QGD, Exchange (transposed)", eco: "D31", s: [39, 43, 18], g: 9000,
                tx: "Same position as 1.d4 d5 2.c4 e6 3.cxd5 exd5 4.Nc3.",
                k: [
                  { m: "Nf6 Bg5", s: null, tx: "Same position as 3.d4 Nf6 4.cxd5 exd5 5.Bg5." }
                ] }
            ] },
            { m: "Nf6", s: [36, 38, 26], g: 2200, k: [
              { m: "e4", n: "Mikenas–Carls Variation", eco: "A18", s: [39, 30, 31], g: 1300,
                note: "White's most ambitious try. Black chooses between …d5 and the Sicilian-style …c5.",
                k: [
                  { m: "d5 e5 d4 exf6 dxc3 bxc3 Qxf6", n: "Mikenas–Carls main line", eco: "A18", s: [40, 32, 28], g: 350,
                    note: "Material is level. Black has the better structure, White the bishop pair and the centre after d4." },
                  { m: "c5 e5 Ng8", n: "Mikenas–Carls, Sicilian Variation", eco: "A18", s: [42, 26, 32], g: 300,
                    note: "Sharp. 5.Nf3 Nc6 6.d4 cxd4 7.Nxd4 Nxe5 8.Ndb5 is the critical test." }
                ] },
              { m: "d4", n: "Indian Game (transposed)", eco: "E20", s: [38, 40, 22], g: 90000,
                tx: "Same position as 1.d4 Nf6 2.c4 e6 3.Nc3.",
                k: [
                  { m: "Bb4", n: "Nimzo-Indian Defence", eco: "E20", s: [36, 42, 22], g: 60000,
                    tx: "Transposes to the Nimzo-Indian." },
                  { m: "d5", s: null, tx: "Same position as 2…d5 3.d4 Nf6 (QGD main line)." }
                ] },
              { m: "Nf3", s: [33, 44, 23], g: 600, note: "Quiet. Black can play …d5, …Bb4 or …b6." }
            ] },
            { m: "Bb4", n: "Agincourt, Kmoch Variation", eco: "A13", s: [35, 36, 29], g: 700,
              note: "A Nimzo-style pin before White has committed to d4. White usually answers Qc2, Qb3 or g3." }
          ] },
        { m: "d4", n: "Horwitz Defence (transposed)", eco: "A40", s: [37, 38, 25], g: 52000,
          tx: "Same position as 1.d4 e6 2.c4.",
          note: "Now Black can head for a Dutch, an English Defence or a Queen's Gambit.",
          k: [
            { m: "Nf6 Nc3", s: null, tx: "Same position as 2.Nc3 Nf6 3.d4 (Indian Game)." },
            { m: "d5 Nc3", s: null, tx: "Same position as 2.Nc3 d5 3.d4 (QGD)." },
            { m: "Bb4+ Bd2", n: "Keres Defence", eco: "A40", s: [35, 41, 24], g: 2200,
              note: "Black follows up with …Qe7 or trades with …Bxd2+." },
            { m: "f5", n: "Dutch Defence", eco: "A84", s: [41, 30, 29], g: 3000,
              note: "Stonewall or Leningrad structures. White usually fianchettoes with g3." },
            { m: "b6", n: "English Defence", eco: "A40", s: [43, 27, 30], g: 2500,
              note: "Black attacks e4 from b7 and invites White to build a big centre.",
              k: [
                { m: "e4 Bb7", s: [44, 26, 30], g: 1300, k: [
                  { m: "Bd3 f5", n: "English Defence, Bd3 f5", s: [45, 23, 32], g: 250,
                    note: "Sharp. Black must not grab on g2 after 5.exf5.",
                    trap: "english-def" },
                  { m: "Nc3 Bb4", s: [43, 27, 30], g: 500, note: "Black pressures e4 twice." }
                ] }
              ] }
          ] },
        { m: "g3", n: "Agincourt, fianchetto first", s: [34, 43, 23], g: 3200,
          note: "Usually transposes to the Catalan setup of 2.Nf3.",
          k: [
            { m: "d5 Bg2 Nf6 Nf3", s: null, tx: "Same position as 2.Nf3 d5 3.g3 Nf6 4.Bg2." }
          ] },
        { m: "e4", n: "Franco-English", eco: "A13", s: [38, 30, 32], g: 1400,
          tx: "Same position as 1.e4 e6 2.c4 (French, Steiner Variation).",
          note: "Crosses over into French territory.",
          k: [
            { m: "d5", s: [38, 30, 32], g: 1100, k: [
              { m: "e5", n: "Franco-English, advance", s: [39, 29, 32], g: 400,
                tx: "Same position as 1.e4 e6 2.c4 d5 3.e5." },
              { m: "cxd5 exd5 exd5", n: "Franco-English, exchange", s: [36, 35, 29], g: 450,
                tx: "Same position as 1.e4 e6 2.c4 d5 3.exd5 exd5 4.cxd5." }
            ] },
            { m: "c5", s: [37, 32, 31], g: 200, tx: "A Sicilian: same position as 1.e4 c5 2.c4 e6." }
          ] }
      ] }
  },

  french: {
    label: "French", first: "1.e4 e6",
    node: { m: "e4 e6", n: "French Defence", eco: "C00", s: [37, 34, 29], g: 190000,
      note: "Black prepares …d5 and accepts a cramped light-squared bishop in exchange for a rock-solid centre and counterplay with …c5.",
      k: [
        { m: "d4 d5", n: "French Defence, main line", eco: "C00", s: [37, 35, 28], g: 148000,
          note: "White must decide what to do about the attack on e4.",
          k: [
            { m: "Nc3", n: "Paulsen Variation", eco: "C10", s: [38, 34, 28], g: 68000,
              note: "Defends e4 with a piece and keeps the tension.",
              k: [
                { m: "Bb4", n: "Winawer Variation", eco: "C15", s: [39, 31, 30], g: 27000,
                  note: "Black pins c3 and is ready to give the bishop to double White's pawns.",
                  k: [
                    { m: "e5 c5 a3", n: "Winawer, Advance", eco: "C16", s: [40, 29, 31], g: 15000, k: [
                      { m: "Bxc3+ bxc3 Ne7", n: "Winawer main line", eco: "C18", s: [40, 28, 32], g: 9000,
                        note: "White has the bishop pair and a dark-square grip. Black has the better structure.",
                        k: [
                          { m: "Qg4", n: "Winawer, 7.Qg4", eco: "C18", s: [41, 25, 34], g: 4000,
                            note: "The sharpest try. Black must give up g7 or castle into the attack.",
                            k: [
                              { m: "Qc7 Qxg7 Rg8 Qxh7 cxd4", n: "Poisoned Pawn Variation", eco: "C18", s: [41, 22, 37], g: 1000,
                                note: "Both sides are playing for a win. 10.Ne2 is the main move; recapturing on d4 loses at once.",
                                trap: "poisoned" },
                              { m: "O-O", s: [40, 29, 31], g: 900, note: "Black keeps g7 and lets White build an attack on the kingside." },
                              { m: "Kf8", s: [39, 29, 32], g: 600, note: "Keeps g7 at the cost of castling rights." }
                            ] },
                          { m: "Nf3", n: "Winawer, positional line", eco: "C19", s: [38, 33, 29], g: 3500,
                            note: "White develops and keeps the long-term trumps." },
                          { m: "h4", eco: "C19", s: [42, 27, 31], g: 1000, note: "Gains space and plans h5–h6 to loosen Black's kingside." }
                        ] },
                      { m: "Ba5", n: "Winawer, Armenian Variation", eco: "C17", s: [40, 27, 33], g: 2500,
                        note: "Black keeps the bishop. Main line: 6.b4 cxb4 7.Qg4." }
                    ] },
                    { m: "exd5 exd5", n: "Winawer, Exchange", eco: "C15", s: [30, 52, 18], g: 2000, note: "Symmetrical and drawish." },
                    { m: "a3", n: "Winawer, Kondratiyev", eco: "C15", s: [36, 32, 32], g: 1200 }
                  ] },
                { m: "Nf6", n: "Classical Variation", eco: "C11", s: [38, 35, 27], g: 25000,
                  note: "Black counter-attacks e4 with a piece.",
                  k: [
                    { m: "e5 Nfd7 f4 c5 Nf3 Nc6 Be3", n: "Classical, Steinitz Variation", eco: "C11", s: [39, 30, 31], g: 5000,
                      note: "White's big centre against Black's pressure on d4. Long castling for White is common." },
                    { m: "Bg5", s: [38, 36, 26], g: 12000, k: [
                      { m: "Be7 e5 Nfd7 Bxe7 Qxe7 f4", n: "Classical main line", eco: "C14", s: [39, 38, 23], g: 2500 },
                      { m: "Be7 e5 Nfd7 h4", n: "Alekhine–Chatard Attack", eco: "C13", s: [44, 26, 30], g: 1000,
                        note: "A pawn sacrifice. 6…Bxg5 7.hxg5 Qxg5 8.Nh3 opens the h-file." },
                      { m: "Bb4 e5 h6 Bd2 Bxc3 bxc3 Ne4 Qg4", n: "McCutcheon Variation", eco: "C12", s: [42, 26, 32], g: 900,
                        note: "White hits g7. Black's only good answer is 8…g6.",
                        trap: "mccutcheon" },
                      { m: "dxe4 Nxe4", n: "Burn Variation", eco: "C11", s: [37, 39, 24], g: 3500,
                        note: "Black releases the tension and plays for …Be7 or …Nbd7 with a solid position." }
                    ] }
                  ] },
                { m: "dxe4 Nxe4", n: "Rubinstein Variation", eco: "C10", s: [39, 38, 23], g: 12000,
                  tx: "Same position as 3.Nd2 dxe4 4.Nxe4.",
                  note: "Black gives up the centre for quick, safe development.",
                  k: [
                    { m: "Nd7 Nf3 Ngf6 Nxf6+ Nxf6", n: "Rubinstein main line", eco: "C10", s: [38, 41, 21], g: 4500 },
                    { m: "Bd7", n: "Fort Knox Variation", eco: "C10", s: [39, 38, 23], g: 2500,
                      note: "…Bc6 next trades off Black's problem bishop." }
                  ] }
              ] },
            { m: "Nd2", n: "Tarrasch Variation", eco: "C03", s: [37, 39, 24], g: 40000,
              note: "Avoids the Winawer pin and keeps c3 free for a pawn.",
              k: [
                { m: "Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2", n: "Tarrasch, Closed main line", eco: "C06", s: [39, 35, 26], g: 4000,
                  note: "White's knight goes to e2 to support d4. Black hits back with …cxd4 and …f6." },
                { m: "c5", n: "Tarrasch, Open Variation", eco: "C07", s: [36, 40, 24], g: 14000, k: [
                  { m: "exd5 Qxd5", eco: "C07", s: [36, 42, 22], g: 6000, note: "Black's queen is active but can be chased with Ngf3, Bc4 and Nb3." },
                  { m: "exd5 exd5", eco: "C08", s: [36, 42, 22], g: 5000, note: "Black accepts an isolated d-pawn." }
                ] },
                { m: "Be7", n: "Tarrasch, Morozevich Variation", eco: "C03", s: [36, 41, 23], g: 4000 },
                { m: "Nc6", n: "Tarrasch, Guimard Variation", eco: "C04", s: [40, 33, 27], g: 1500 },
                { m: "dxe4 Nxe4", s: null, tx: "Same position as 3.Nc3 dxe4 4.Nxe4 (Rubinstein)." }
              ] },
            { m: "e5", n: "Advance Variation", eco: "C02", s: [35, 34, 31], g: 25000,
              note: "White grabs space and locks the centre. Black attacks the d4 base with …c5, …Nc6 and …Qb6.",
              k: [
                { m: "c5 c3 Nc6 Nf3", s: [35, 35, 30], g: 15000, k: [
                  { m: "Qb6", eco: "C02", s: [35, 34, 31], g: 10000, k: [
                    { m: "a3", n: "Advance, Euwe Variation", eco: "C02", s: [37, 35, 28], g: 5000,
                      note: "Prepares b4. Black often answers 6…c4 or 6…Nh6." },
                    { m: "Bd3 cxd4 cxd4", n: "Advance, Milner-Barry Gambit", eco: "C02", s: [32, 28, 40], g: 1500,
                      note: "White offers d4 for development. 7…Bd7 is correct; 7…Nxd4? walks into a queen trap.",
                      trap: "milner-barry" },
                    { m: "Be2", eco: "C02", s: [35, 35, 30], g: 3000 }
                  ] },
                  { m: "Bd7", n: "Advance, Euwe Defence", eco: "C02", s: [34, 37, 29], g: 4000 }
                ] },
                { m: "c5 Qg4", n: "Advance, Nimzowitsch Gambit", eco: "C02", s: [30, 26, 44], g: 300,
                  note: "An old idea that gives up d4. Black does well by striking back with …f5.",
                  trap: "advance-qg4" },
                { m: "c5 Nf3", eco: "C02", s: [33, 33, 34], g: 2500, note: "Gives up d4 for development." }
              ] },
            { m: "exd5 exd5", n: "Exchange Variation", eco: "C01", s: [30, 51, 19], g: 14000,
              note: "Symmetrical and often drawish. White's ambitious try is c4.",
              k: [
                { m: "c4", n: "Exchange, Monte Carlo", eco: "C01", s: [36, 34, 30], g: 2500, note: "Leads to isolated-pawn positions." },
                { m: "Nf3", eco: "C01", s: [29, 54, 17], g: 4500 },
                { m: "Bd3", eco: "C01", s: [29, 54, 17], g: 4000 }
              ] }
          ] },
        { m: "d3", n: "King's Indian Attack", eco: "C00", s: [37, 33, 30], g: 14000,
          note: "White sets up a reversed King's Indian and attacks on the kingside after e5.",
          k: [
            { m: "d5 Nd2 Nf6 Ngf3 c5 g3 Nc6 Bg2 Be7 O-O O-O Re1", n: "King's Indian Attack, main setup", eco: "C00", s: [38, 32, 30], g: 1500,
              note: "White plays e5, Nf1, h4 and attacks. Black races on the queenside with …b5–b4." }
          ] },
        { m: "Nf3 d5", s: [37, 32, 31], g: 6000, k: [
          { m: "Nc3", n: "French, Two Knights", eco: "C00", s: [38, 30, 32], g: 1500,
            tx: "Same position as 2.Nc3 d5 3.Nf3." },
          { m: "e5 c5 b4", n: "French, Wing Gambit", eco: "C00", s: [36, 26, 38], g: 300 }
        ] },
        { m: "Nc3 d5", s: [36, 31, 33], g: 3000, k: [
          { m: "Nf3", s: null, tx: "Same position as 2.Nf3 d5 3.Nc3 (Two Knights)." },
          { m: "d4", s: null, tx: "Same position as 2.d4 d5 3.Nc3 (Paulsen)." }
        ] },
        { m: "Qe2", n: "Chigorin Variation", eco: "C00", s: [37, 30, 33], g: 3000,
          note: "Discourages …d5 for the moment because exd5 would open the e-file." },
        { m: "c4", n: "Steiner Variation", eco: "C00", s: null,
          tx: "Same position as 1.c4 e6 2.e4 (Franco-English).",
          k: [
            { m: "d5", s: null, k: [
              { m: "e5", s: null, tx: "Same position as 1.c4 e6 2.e4 d5 3.e5." },
              { m: "exd5 exd5 cxd5", s: null, tx: "Same position as 1.c4 e6 2.e4 d5 3.cxd5 exd5 4.exd5." }
            ] }
          ] }
      ] }
  }
};

/* Traps. side = who sets (and profits from) the trap. line = full game from move 1.
   bad = ply index (1-based) of the losing move, key = ply index of the punishing move.
   evals are Stockfish 16 scores (pawns, White's view) checked at depth 16–20. */
const TRAPS = [
  { id: "milner-barry", mark: "??", tree: "french", side: "w", title: "Milner-Barry queen trap",
    opening: "French, Advance (Milner-Barry Gambit)",
    line: "e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 Bd3 cxd4 cxd4 Nxd4 Nxd4 Qxd4 Bb5+", bad: 16, key: 17,
    evals: [["7.cxd4", 0.0], ["7…Nxd4?", 2.9], ["8…Qxd4??", 6.7]],
    idea: "Black grabs d4 twice. 9.Bb5+ uncovers the d1 queen on the d-file and Black's queen on d4 is lost.",
    avoid: "7…Bd7 keeps the balance; the gambit is only worth a pawn if Black is greedy." },
  { id: "mccutcheon", mark: "?", tree: "french", side: "w", title: "McCutcheon: don't castle",
    opening: "French, Classical (McCutcheon)",
    line: "e4 e6 d4 d5 Nc3 Nf6 Bg5 Bb4 e5 h6 Bd2 Bxc3 bxc3 Ne4 Qg4 O-O Bxh6 g6 Bxf8 Qxf8", bad: 16, key: 17,
    evals: [["8.Qg4", 0.5], ["8…O-O?", 4.8], ["10…Qxf8", 3.8]],
    idea: "Castling walks into Bxh6. Mate on g7 is threatened, so Black must block with …g6 and the rook on f8 falls.",
    avoid: "8…g6 is the main line; 8…Kf8 is also played." },
  { id: "catalan-b5", mark: "?", tree: "english", side: "w", title: "Catalan long-diagonal trap",
    opening: "English, Agincourt (Open Catalan setup)",
    line: "c4 e6 Nf3 d5 g3 Nf6 Bg2 dxc4 O-O b5 a4 c6 axb5 cxb5 Ne5 Nd5 d3 Nd7 dxc4", bad: 12, key: 15,
    evals: [["5…b5", 0.8], ["6…c6?", 1.8], ["10.dxc4", 2.7]],
    idea: "Black defends c4 with …b5 and …c6. After axb5 cxb5, Ne5 lines up the g2 bishop on the a8 rook and the d5 knight is pinned. White regains c4 and keeps a winning initiative.",
    avoid: "6…b4 keeps the pawn chain intact; simpler still is 5…a6 or 5…Be7 without trying to keep c4." },
  { id: "english-def", mark: "?", tree: "english", side: "w", title: "English Defence: poisoned g2",
    opening: "English Defence (via 2.d4 b6)",
    line: "c4 e6 d4 b6 e4 Bb7 Bd3 f5 exf5 Bxg2 Qh5+ g6 fxg6 Bg7 gxh7+ Kf8 Bg5", bad: 10, key: 11,
    evals: [["5.exf5", 1.1], ["5…Bxg2?", 2.0], ["9.Bg5", 2.2]],
    idea: "Taking the g2 pawn opens h5 for the queen. The pawn on h7 and the pin on g8 give White a lasting attack.",
    avoid: "5…exf5 is the safer recapture." },
  { id: "elephant", mark: "??", tree: "english", side: "b", title: "Elephant Trap",
    opening: "QGD via 1.c4 e6 2.Nc3 d5 3.d4",
    line: "c4 e6 Nc3 d5 d4 Nf6 Bg5 Nbd7 cxd5 exd5 Nxd5 Nxd5 Bxd8 Bb4+ Qd2 Bxd2+ Kxd2 Kxd8", bad: 11, key: 12,
    evals: [["5…exd5", 0.4], ["6.Nxd5??", -3.5], ["9…Kxd8", -3.4]],
    idea: "The d5 pawn looks pinned to the queen. It isn't: …Nxd5 gives up the queen, then …Bb4+ wins White's queen back and Black is a piece up.",
    avoid: "6.e3 or 6.Nf3 keeps an edge for White." },
  { id: "cambridge", mark: "??", tree: "english", side: "b", title: "Cambridge Springs double attack",
    opening: "QGD via the English",
    line: "c4 e6 Nc3 d5 d4 Nf6 Bg5 Nbd7 e3 c6 Nf3 Qa5 Bd3 Ne4 Qc2 Nxg5 Nxg5 dxc4", bad: 15, key: 18,
    evals: [["7…Ne4", 0.1], ["8.Qc2??", -3.5], ["9…dxc4", -4.4]],
    idea: "After …Nxg5 Nxg5 dxc4, the queen on a5 hits the knight on g5 along the fifth rank while the pawn hits d3. White loses a piece.",
    avoid: "8.Bxe4 dxe4 is level; 7.Nd2 is the main line." },
  { id: "poisoned", mark: "??", tree: "french", side: "b", title: "Poisoned Pawn: the c3 check",
    opening: "French, Winawer Poisoned Pawn",
    line: "e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 Qc7 Qxg7 Rg8 Qxh7 cxd4 cxd4 Qc3+ Kd1 Qxd4+ Qd3 Qxa1", bad: 19, key: 20,
    evals: [["9…cxd4", 0.7], ["10.cxd4??", -3.7], ["12…Qxa1", -4.1]],
    idea: "Recapturing with the c-pawn opens c3. …Qc3+ forks the king and the a1 rook.",
    avoid: "10.Ne2 is the main line; 10.Kd1 is the alternative." },
  { id: "advance-qg4", mark: "?", tree: "french", side: "b", title: "Nimzowitsch Gambit: …f5 bait",
    opening: "French, Advance (4.Qg4)",
    line: "e4 e6 d4 d5 e5 c5 Qg4 cxd4 Nf3 Nc6 Bd3 f5 exf6 Nxf6", bad: 13, key: 14,
    evals: [["6…f5", 0.2], ["7.exf6?", -1.8], ["7…Nxf6", -1.9]],
    idea: "Taking en passant gives up e5, Black's knight lands on f6 with tempo and the centre is Black's.",
    avoid: "7.Qg3 keeps e5 and the balance." }
];
