

var barChartCanvas = document.getElementById('barChartCanvas');
var doughnutChartCanvas = document.getElementById('doughnutChartCanvas');
var lineChartCanvas = document.getElementById('lineChartCanvas');
var pieChartCanvas = document.getElementById('pieChartCanvas');

// Draw barChart
Chart.barChart(barChartCanvas.getContext('2d'),
    [
        {
            name: "A",
            level: 2,
            color: "#4E41CD",
        },
        {
            name: "B",
            level: 0.1,
            color: "#4E41CD",
        },
        {
            name: "C",
            level: 3,
            color: "#4E41CD",
        },
        {
            name: "E",
            level: 4,
            color: "#4E41CD",
        },
        {
            name: "F",
            level: 4,
            color: "#4E41CD",
        },
    ]
);

// Draw dougnnutChart
Chart.doughnutChart(doughnutChartCanvas.getContext('2d'),
    [
        {
            name: "Xuất sắc",
            value: 10,
            color: "#5052B2"
        },
        {
            name: "Tốt",
            value: 20,
            color: "#E81717"
        },
        {
            name: "Trung bình",
            value: 10,
            color: "#FF9B00"
        },
        {
            name: "Kém",
            value: 60,
            color: "#00A448"
        }
    ],
);

// Draw lineChart
Chart.lineChart(lineChartCanvas.getContext('2d'),
    {
        rank: [0,1,2,3,4],
        color: "#00A2F1",
        data: [
            [130,230,150,230,155,180],
            [155,180,160,130,180,130],
            [178,130,190,130,200,180],
            [200,180,210,230,220,230],
            [220,230,240,230,240,180],
            [240,180,245,130,265,130],
            [260,130,280,130,280,165],
            [280,165,280,180,290,180],
            [290,180,315,180,340,160],
            [340,160,360,140,380,140],
        ]
    }
);

// Draw pieChart
Chart.pieChart(pieChartCanvas.getContext('2d'),
    [
        {
            name: "Đã đạt",
            value: 80,
            color: "#5052B2"
        },
        {
            name: "Chưa đạt",
            value: 20,
            color: "#E81717"
        },
    ],
    ["#456AA4", "#F25556", "#F23213", "#009ED5"]
);
