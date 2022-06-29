import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, set, child, push, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { firebaseConfig } from './firebase.js';

const app= initializeApp(firebaseConfig);

geraPrimeiroGrafico();
geraSegundoGrafico();
geraTerceiroGrafico();
geraQuartoGrafico();

function GenerosMaisRecomendados(acao, investigacao, policial, romance, terror) {
    this.acao = acao;
    this.investigacao = investigacao;
    this.policial = policial;
    this.romance = romance;
    this.terror = terror;
}

function LivrosMaisVendidos(donQuixote, umContoDeDuasCidades, oSenhorDosAneis, oPequenoPrincipe, harryPotter, oHobbit) {
    this.donQuixote = donQuixote;
    this.umContoDeDuasCidades = umContoDeDuasCidades;
    this.oSenhorDosAneis = oSenhorDosAneis;
    this.oPequenoPrincipe = oPequenoPrincipe;
    this.harryPotter = harryPotter;
    this.oHobbit = oHobbit;
}

function EscritoresComMaisVendas(itamarVieiraJunior, napoleonHill, georgeOrwell, halElrod, colleenHoover){
    this.itamarVieiraJunior = itamarVieiraJunior;
    this.napoleonHill = napoleonHill;
    this.georgeOrwell = georgeOrwell;
    this.halElrod = halElrod;
    this.colleenHoover = colleenHoover;
}

function LivrosMaisLidosPorQuadrimestre(oHomemMaisRicoDaBabilonia, todasAsSuasImperfeicoes, oEnigmaDoQuarto622){
    this.oHomemMaisRicoDaBabilonia = oHomemMaisRicoDaBabilonia;
    this.todasAsSuasImperfeicoes = todasAsSuasImperfeicoes;
    this.oEnigmaDoQuarto622 = oEnigmaDoQuarto622;
}

/*-------- funções -----------*/

function geraPrimeiroGrafico(){

    const grafico = new GenerosMaisRecomendados();

    const db = getDatabase();
    const starCountRef = ref(db, 'GenerosMaisRecomendados');
    onValue(starCountRef, (snapshot) => {

        grafico.acao = snapshot.val().acao;
        grafico.investigacao = snapshot.val().investigacao;
        grafico.policial = snapshot.val().policial;
        grafico.romance = snapshot.val().romance;
        grafico.terror = snapshot.val().terror;

        carregaGenerosMaisRecomendados(grafico);
        carregaGenerosMaisRecomendadosTabela(grafico);

    });
}

function geraSegundoGrafico(){

    const grafico = new LivrosMaisVendidos();

    const db = getDatabase();
    const starCountRef = ref(db, 'LivrosMaisVendidos');
    onValue(starCountRef, (snapshot) => {

        grafico.donQuixote = snapshot.val().donQuixote;
        grafico.harryPotter = snapshot.val().harryPotter;
        grafico.oHobbit = snapshot.val().oHobbit;
        grafico.oPequenoPrincipe = snapshot.val().oPequenoPrincipe;
        grafico.oSenhorDosAneis = snapshot.val().oSenhorDosAneis;
        grafico.umContoDeDuasCidades = snapshot.val().umContoDeDuasCidades;

        carregaLivrosMaisVendidos(grafico);
        carregaLivrosMaisVendidosTabela(grafico);

    });
}

function geraTerceiroGrafico(){

    const grafico = new EscritoresComMaisVendas();

    const db = getDatabase();
    const starCountRef = ref(db, 'EscritoresComMaisVendas');
    onValue(starCountRef, (snapshot) => {

        grafico.colleenHoover = snapshot.val().colleenHoover;
        grafico.georgeOrwell = snapshot.val().georgeOrwell;
        grafico.halElrod = snapshot.val().halElrod;
        grafico.itamarVieiraJunior = snapshot.val().itamarVieiraJunior;
        grafico.napoleonHill = snapshot.val().napoleonHill;

        carregaEscritoresComMaisVendas(grafico);
        carregaEscritoresComMaisVendasTabela(grafico);

    });
}

function geraQuartoGrafico(){

    const grafico = new LivrosMaisLidosPorQuadrimestre();

    const db = getDatabase();
    const starCountRef = ref(db, 'LivrosMaisLidosPorQuadrimestre');
    onValue(starCountRef, (snapshot) => {

        grafico.todasAsSuasImperfeicoes = snapshot.val().todasAsSuasImperfeicoes;
        grafico.oEnigmaDoQuarto622 = snapshot.val().oEnigmaDoQuarto622;
        grafico.oHomemMaisRicoDaBabilonia = snapshot.val().oHomemMaisRicoDaBabilonia;

        carregaLivrosMaisLidosPorQuadrimestre(grafico);
        carregaLivrosMaisLidosPorQuadrimestreTabela(grafico);

    });
}

function carregaGenerosMaisRecomendados(grafico){

    /*GRAPH 1*/

    Highcharts.chart('container', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Gêneros mais recomendadas'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['ação', grafico.acao],
                ['terror', grafico.terror],
                ['romance', grafico.romance],
                ['policial', grafico.policial],
                ['investigação', grafico.investigacao]
            ]
        }]
    });
}


function carregaGenerosMaisRecomendadosTabela(grafico){

    /*GRAPH 2*/

    // Create the chart
    Highcharts.chart('container2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gêneros mais recomendadas'
        },
        subtitle: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: [
                    {
                        name: "ação",
                        y: grafico.acao,
                        drilldown: "ação"
                    },
                    {
                        name: "terror",
                        y: grafico.terror,
                        drilldown: "terror"
                    },
                    {
                        name: "romance",
                        y: grafico.romance,
                        drilldown: "romance"
                    },
                    {
                        name: "policial",
                        y: grafico.policial,
                        drilldown: "policial"
                    },
                    {
                        name: "investigação",
                        y: grafico.investigacao,
                        drilldown: "investigação"
                    }
                ]
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: [
                {
                    name: "Chrome",
                    id: "Chrome",
                    data: [
                        [
                            "v65.0",
                            0.1
                        ],
                        [
                            "v64.0",
                            1.3
                        ],
                        [
                            "v63.0",
                            53.02
                        ],
                        [
                            "v62.0",
                            1.4
                        ],
                        [
                            "v61.0",
                            0.88
                        ],
                        [
                            "v60.0",
                            0.56
                        ],
                        [
                            "v59.0",
                            0.45
                        ],
                        [
                            "v58.0",
                            0.49
                        ],
                        [
                            "v57.0",
                            0.32
                        ],
                        [
                            "v56.0",
                            0.29
                        ],
                        [
                            "v55.0",
                            0.79
                        ],
                        [
                            "v54.0",
                            0.18
                        ],
                        [
                            "v51.0",
                            0.13
                        ],
                        [
                            "v49.0",
                            2.16
                        ],
                        [
                            "v48.0",
                            0.13
                        ],
                        [
                            "v47.0",
                            0.11
                        ],
                        [
                            "v43.0",
                            0.17
                        ],
                        [
                            "v29.0",
                            0.26
                        ]
                    ]
                },
                {
                    name: "Firefox",
                    id: "Firefox",
                    data: [
                        [
                            "v58.0",
                            1.02
                        ],
                        [
                            "v57.0",
                            7.36
                        ],
                        [
                            "v56.0",
                            0.35
                        ],
                        [
                            "v55.0",
                            0.11
                        ],
                        [
                            "v54.0",
                            0.1
                        ],
                        [
                            "v52.0",
                            0.95
                        ],
                        [
                            "v51.0",
                            0.15
                        ],
                        [
                            "v50.0",
                            0.1
                        ],
                        [
                            "v48.0",
                            0.31
                        ],
                        [
                            "v47.0",
                            0.12
                        ]
                    ]
                },
                {
                    name: "Internet Explorer",
                    id: "Internet Explorer",
                    data: [
                        [
                            "v11.0",
                            6.2
                        ],
                        [
                            "v10.0",
                            0.29
                        ],
                        [
                            "v9.0",
                            0.27
                        ],
                        [
                            "v8.0",
                            0.47
                        ]
                    ]
                },
                {
                    name: "Safari",
                    id: "Safari",
                    data: [
                        [
                            "v11.0",
                            3.39
                        ],
                        [
                            "v10.1",
                            0.96
                        ],
                        [
                            "v10.0",
                            0.36
                        ],
                        [
                            "v9.1",
                            0.54
                        ],
                        [
                            "v9.0",
                            0.13
                        ],
                        [
                            "v5.1",
                            0.2
                        ]
                    ]
                },
                {
                    name: "Edge",
                    id: "Edge",
                    data: [
                        [
                            "v16",
                            2.6
                        ],
                        [
                            "v15",
                            0.92
                        ],
                        [
                            "v14",
                            0.4
                        ],
                        [
                            "v13",
                            0.1
                        ]
                    ]
                },
                {
                    name: "Opera",
                    id: "Opera",
                    data: [
                        [
                            "v50.0",
                            0.96
                        ],
                        [
                            "v49.0",
                            0.82
                        ],
                        [
                            "v12.1",
                            0.14
                        ]
                    ]
                }
            ]
        }
    });

}


function carregaLivrosMaisVendidos(grafico){

    /*GRAPH 3*/


    const chart = Highcharts.chart('container3', {
        title: {
            text: 'Livros mais vendidos(Milhões)'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Don Quixote', 'Um Conto de Duas Cidades', 'O Senhor dos Anéis', 'O Pequeno Príncipe', 'Harry Potter e a Pedra Filosofal', 'O Hobbit', 'O Hobbit']
        },
        series: [{
            type: 'column',
            colorByPoint: true,
            data: [grafico.donQuixote, grafico.umContoDeDuasCidades, grafico.oSenhorDosAneis, grafico.oPequenoPrincipe, grafico.harryPotter, grafico.oHobbit, grafico.oHobbit],
            showInLegend: false
        }]
    });

}

function carregaLivrosMaisVendidosTabela(grafico){

    /*GRAPH 4*/


    Highcharts.chart('container4', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Livros mais vendidos(Milhões)'
        },
        subtitle: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: [
                    {
                        name: "Don Quixote",
                        y: grafico.donQuixote,
                        drilldown: "Don Quixote"
                    },
                    {
                        name: "Um Conto de Duas Cidades",
                        y: grafico.umContoDeDuasCidades,
                        drilldown: "Um Conto de Duas Cidades"
                    },
                    {
                        name: "O Senhor dos Anéis",
                        y: grafico.oSenhorDosAneis,
                        drilldown: "O Senhor dos Anéis"
                    },
                    {
                        name: "O Pequeno Príncipe",
                        y: grafico.oPequenoPrincipe,
                        drilldown: "O Pequeno Príncipe"
                    },
                    {
                        name: "Harry Potter e a Pedra Filosofal",
                        y: grafico.harryPotter,
                        drilldown: "Harry Potter e a Pedra Filosofal"
                    },
                    {
                        name: "O Hobbit",
                        y: grafico.oHobbit,
                        drilldown: "O Hobbit"
                    },
                    {
                        name: "O Hobbit",
                        y: grafico.oHobbit,
                        drilldown: "O Hobbit"
                    }
                ]
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: [
                {
                    name: "Chrome",
                    id: "Chrome",
                    data: [
                        [
                            "v65.0",
                            0.1
                        ],
                        [
                            "v64.0",
                            1.3
                        ],
                        [
                            "v63.0",
                            53.02
                        ],
                        [
                            "v62.0",
                            1.4
                        ],
                        [
                            "v61.0",
                            0.88
                        ],
                        [
                            "v60.0",
                            0.56
                        ],
                        [
                            "v59.0",
                            0.45
                        ],
                        [
                            "v58.0",
                            0.49
                        ],
                        [
                            "v57.0",
                            0.32
                        ],
                        [
                            "v56.0",
                            0.29
                        ],
                        [
                            "v55.0",
                            0.79
                        ],
                        [
                            "v54.0",
                            0.18
                        ],
                        [
                            "v51.0",
                            0.13
                        ],
                        [
                            "v49.0",
                            2.16
                        ],
                        [
                            "v48.0",
                            0.13
                        ],
                        [
                            "v47.0",
                            0.11
                        ],
                        [
                            "v43.0",
                            0.17
                        ],
                        [
                            "v29.0",
                            0.26
                        ]
                    ]
                },
                {
                    name: "Firefox",
                    id: "Firefox",
                    data: [
                        [
                            "v58.0",
                            1.02
                        ],
                        [
                            "v57.0",
                            7.36
                        ],
                        [
                            "v56.0",
                            0.35
                        ],
                        [
                            "v55.0",
                            0.11
                        ],
                        [
                            "v54.0",
                            0.1
                        ],
                        [
                            "v52.0",
                            0.95
                        ],
                        [
                            "v51.0",
                            0.15
                        ],
                        [
                            "v50.0",
                            0.1
                        ],
                        [
                            "v48.0",
                            0.31
                        ],
                        [
                            "v47.0",
                            0.12
                        ]
                    ]
                },
                {
                    name: "Internet Explorer",
                    id: "Internet Explorer",
                    data: [
                        [
                            "v11.0",
                            6.2
                        ],
                        [
                            "v10.0",
                            0.29
                        ],
                        [
                            "v9.0",
                            0.27
                        ],
                        [
                            "v8.0",
                            0.47
                        ]
                    ]
                },
                {
                    name: "Safari",
                    id: "Safari",
                    data: [
                        [
                            "v11.0",
                            3.39
                        ],
                        [
                            "v10.1",
                            0.96
                        ],
                        [
                            "v10.0",
                            0.36
                        ],
                        [
                            "v9.1",
                            0.54
                        ],
                        [
                            "v9.0",
                            0.13
                        ],
                        [
                            "v5.1",
                            0.2
                        ]
                    ]
                },
                {
                    name: "Edge",
                    id: "Edge",
                    data: [
                        [
                            "v16",
                            2.6
                        ],
                        [
                            "v15",
                            0.92
                        ],
                        [
                            "v14",
                            0.4
                        ],
                        [
                            "v13",
                            0.1
                        ]
                    ]
                },
                {
                    name: "Opera",
                    id: "Opera",
                    data: [
                        [
                            "v50.0",
                            0.96
                        ],
                        [
                            "v49.0",
                            0.82
                        ],
                        [
                            "v12.1",
                            0.14
                        ]
                    ]
                }
            ]
        }
    });

}


function carregaEscritoresComMaisVendas(grafico){

    /*GRAPH 5*/


    Highcharts.chart('container5', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Escritores com mais vendas'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio']
        },
        yAxis: {
            title: {
                text: 'unidades por mês'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Itamar Vieira Junior',
            data: [30,50,80,20,50]
        }, {
            name: 'Napoleon Hill',
            data: [60,45,80,15,35]
        }, {
            name: 'George Orwell',
            data: [45,50,12,80,75]
        }, {
            name: 'Hal Elrod',
            data: [45,12,74,63,25]
        }, {
            name: 'Colleen Hoover',
            data: [14,15,48,90,35]
        },]
    });
}


function carregaEscritoresComMaisVendasTabela(grafico){

    /*GRAPH 6*/ 


    Highcharts.chart('container6', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Escritores com mais vendas'
        },
        subtitle: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: [
                    {
                        name: "Itamar Vieira Junior",
                        y: grafico.itamarVieiraJunior,
                        drilldown: "Itamar Vieira Junior"
                    },
                    {
                        name: "Napoleon Hill",
                        y: grafico.napoleonHill,
                        drilldown: "Napoleon Hill"
                    },
                    {
                        name: "George Orwell",
                        y: grafico.georgeOrwell,
                        drilldown: "George Orwell"
                    },
                    {
                        name: "Hal Elrod",
                        y: grafico.halElrod,
                        drilldown: "Hal Elrod"
                    },
                    {
                        name: "Colleen Hoover",
                        y: grafico.colleenHoover,
                        drilldown: "Colleen Hoover"
                    }
                ]
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: [
                {
                    name: "Chrome",
                    id: "Chrome",
                    data: [
                        [
                            "v65.0",
                            0.1
                        ],
                        [
                            "v64.0",
                            1.3
                        ],
                        [
                            "v63.0",
                            53.02
                        ],
                        [
                            "v62.0",
                            1.4
                        ],
                        [
                            "v61.0",
                            0.88
                        ],
                        [
                            "v60.0",
                            0.56
                        ],
                        [
                            "v59.0",
                            0.45
                        ],
                        [
                            "v58.0",
                            0.49
                        ],
                        [
                            "v57.0",
                            0.32
                        ],
                        [
                            "v56.0",
                            0.29
                        ],
                        [
                            "v55.0",
                            0.79
                        ],
                        [
                            "v54.0",
                            0.18
                        ],
                        [
                            "v51.0",
                            0.13
                        ],
                        [
                            "v49.0",
                            2.16
                        ],
                        [
                            "v48.0",
                            0.13
                        ],
                        [
                            "v47.0",
                            0.11
                        ],
                        [
                            "v43.0",
                            0.17
                        ],
                        [
                            "v29.0",
                            0.26
                        ]
                    ]
                },
                {
                    name: "Firefox",
                    id: "Firefox",
                    data: [
                        [
                            "v58.0",
                            1.02
                        ],
                        [
                            "v57.0",
                            7.36
                        ],
                        [
                            "v56.0",
                            0.35
                        ],
                        [
                            "v55.0",
                            0.11
                        ],
                        [
                            "v54.0",
                            0.1
                        ],
                        [
                            "v52.0",
                            0.95
                        ],
                        [
                            "v51.0",
                            0.15
                        ],
                        [
                            "v50.0",
                            0.1
                        ],
                        [
                            "v48.0",
                            0.31
                        ],
                        [
                            "v47.0",
                            0.12
                        ]
                    ]
                },
                {
                    name: "Internet Explorer",
                    id: "Internet Explorer",
                    data: [
                        [
                            "v11.0",
                            6.2
                        ],
                        [
                            "v10.0",
                            0.29
                        ],
                        [
                            "v9.0",
                            0.27
                        ],
                        [
                            "v8.0",
                            0.47
                        ]
                    ]
                },
                {
                    name: "Safari",
                    id: "Safari",
                    data: [
                        [
                            "v11.0",
                            3.39
                        ],
                        [
                            "v10.1",
                            0.96
                        ],
                        [
                            "v10.0",
                            0.36
                        ],
                        [
                            "v9.1",
                            0.54
                        ],
                        [
                            "v9.0",
                            0.13
                        ],
                        [
                            "v5.1",
                            0.2
                        ]
                    ]
                },
                {
                    name: "Edge",
                    id: "Edge",
                    data: [
                        [
                            "v16",
                            2.6
                        ],
                        [
                            "v15",
                            0.92
                        ],
                        [
                            "v14",
                            0.4
                        ],
                        [
                            "v13",
                            0.1
                        ]
                    ]
                },
                {
                    name: "Opera",
                    id: "Opera",
                    data: [
                        [
                            "v50.0",
                            0.96
                        ],
                        [
                            "v49.0",
                            0.82
                        ],
                        [
                            "v12.1",
                            0.14
                        ]
                    ]
                }
            ]
        }
    });
}


function carregaLivrosMaisLidosPorQuadrimestre(grafico){

    /*GRAPH 7*/


    Highcharts.chart('container7', {
        title: {
            text: 'Livros mais lidos por quadrimestre'
        },
        xAxis: {
            categories: ['1º Quadrimestre', '2º Quadrimestre', '3º Quadrimestre']
        },
        labels: {
            items: [{
                html: '',
                style: {
                    left: '50px',
                    top: '18px',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: 'O homem mais rico da Babilônia',
            data: [16, 12, 12]
        }, {
            type: 'column',
            name: 'Todas as suas imperfeições',
            data: [25,14,17]
        }, {
            type: 'column',
            name: 'O enigma do quarto 622',
            data: [25, 33,15]
        }]
    });
}

function carregaLivrosMaisLidosPorQuadrimestreTabela(grafico){

    /*GRAPH 8*/


    Highcharts.chart('container8', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Livros mais lidos por quadrimestre'
        },
        subtitle: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Leituras por mês'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: [
                    {
                        name: "O homem mais rico da Babilônia",
                        y: grafico.oHomemMaisRicoDaBabilonia,
                        drilldown: "O homem mais rico da Babilônia"
                    },
                    {
                        name: "Todas as suas imperfeições",
                        y: grafico.todasAsSuasImperfeicoes,
                        drilldown: "Todas as suas imperfeições"
                    },
                    {
                        name: "O enigma do quarto 622",
                        y: grafico.oEnigmaDoQuarto622,
                        drilldown: "O enigma do quarto 622"
                    }
                ]
            }
        ],
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },
            series: [
                {
                    name: "Chrome",
                    id: "Chrome",
                    data: [
                        [
                            "v65.0",
                            0.1
                        ],
                        [
                            "v64.0",
                            1.3
                        ],
                        [
                            "v63.0",
                            53.02
                        ],
                        [
                            "v62.0",
                            1.4
                        ],
                        [
                            "v61.0",
                            0.88
                        ],
                        [
                            "v60.0",
                            0.56
                        ],
                        [
                            "v59.0",
                            0.45
                        ],
                        [
                            "v58.0",
                            0.49
                        ],
                        [
                            "v57.0",
                            0.32
                        ],
                        [
                            "v56.0",
                            0.29
                        ],
                        [
                            "v55.0",
                            0.79
                        ],
                        [
                            "v54.0",
                            0.18
                        ],
                        [
                            "v51.0",
                            0.13
                        ],
                        [
                            "v49.0",
                            2.16
                        ],
                        [
                            "v48.0",
                            0.13
                        ],
                        [
                            "v47.0",
                            0.11
                        ],
                        [
                            "v43.0",
                            0.17
                        ],
                        [
                            "v29.0",
                            0.26
                        ]
                    ]
                },
                {
                    name: "Firefox",
                    id: "Firefox",
                    data: [
                        [
                            "v58.0",
                            1.02
                        ],
                        [
                            "v57.0",
                            7.36
                        ],
                        [
                            "v56.0",
                            0.35
                        ],
                        [
                            "v55.0",
                            0.11
                        ],
                        [
                            "v54.0",
                            0.1
                        ],
                        [
                            "v52.0",
                            0.95
                        ],
                        [
                            "v51.0",
                            0.15
                        ],
                        [
                            "v50.0",
                            0.1
                        ],
                        [
                            "v48.0",
                            0.31
                        ],
                        [
                            "v47.0",
                            0.12
                        ]
                    ]
                },
                {
                    name: "Internet Explorer",
                    id: "Internet Explorer",
                    data: [
                        [
                            "v11.0",
                            6.2
                        ],
                        [
                            "v10.0",
                            0.29
                        ],
                        [
                            "v9.0",
                            0.27
                        ],
                        [
                            "v8.0",
                            0.47
                        ]
                    ]
                },
                {
                    name: "Safari",
                    id: "Safari",
                    data: [
                        [
                            "v11.0",
                            3.39
                        ],
                        [
                            "v10.1",
                            0.96
                        ],
                        [
                            "v10.0",
                            0.36
                        ],
                        [
                            "v9.1",
                            0.54
                        ],
                        [
                            "v9.0",
                            0.13
                        ],
                        [
                            "v5.1",
                            0.2
                        ]
                    ]
                },
                {
                    name: "Edge",
                    id: "Edge",
                    data: [
                        [
                            "v16",
                            2.6
                        ],
                        [
                            "v15",
                            0.92
                        ],
                        [
                            "v14",
                            0.4
                        ],
                        [
                            "v13",
                            0.1
                        ]
                    ]
                },
                {
                    name: "Opera",
                    id: "Opera",
                    data: [
                        [
                            "v50.0",
                            0.96
                        ],
                        [
                            "v49.0",
                            0.82
                        ],
                        [
                            "v12.1",
                            0.14
                        ]
                    ]
                }
            ]
        }
    });
}





/*CARD FLIP*/


/*botao*/

var card = document.querySelector(".card");
var botao = document.querySelector(".botao");
var playing = false;

botao.addEventListener('click',function() {

  if(playing)
    return;
  
  playing = true;
  anime({
    targets: card,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
       playing = false;
    }
  });
});


/*botao 2*/

var card2 = document.querySelector(".card2");
var botao2 = document.querySelector(".botao2");
var playing2 = false;

botao2.addEventListener('click',function() {
  if(playing2)
    return;
  
  playing2 = true;
  anime({
    targets: card2,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
       playing2 = false;
    }
  });
});


/*botao 3*/

var card3 = document.querySelector(".card3");
var botao3 = document.querySelector(".botao3");
var playing3 = false;

botao3.addEventListener('click',function() {
  if(playing3)
    return;
  
    playing3 = true;
  anime({
    targets: card3,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
        playing3 = false;
    }
  });
});




/*botao 4*/



var card4 = document.querySelector(".card4");
var botao4 = document.querySelector(".botao4");
var playing4 = false;

botao4.addEventListener('click',function() {
  if(playing4)
    return;
  
    playing4 = true;
  anime({
    targets: card4,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anim){
        playing4 = false;
    }
  });
});



