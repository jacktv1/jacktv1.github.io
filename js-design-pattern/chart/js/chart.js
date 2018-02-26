var Chart = (function() {

    /**
    * This below function draw line from a point to a point
    * @param {context2D} context
    * @param {int} startX
    * @param {int} startY
    * @param {int} toX
    * @param {int} toY
    * @param {string} color
    */

    var _drawLine = function(context, startX, startY, toX, toY, color) {
        context.beginPath();
        context.moveTo(startX,startY);
        context.lineTo(toX,toY);
        context.strokeStyle = color;
        context.closePath();
        context.stroke();
    };

    /**
    * This below function draw text
    * @param {context2D} context
    * @param {string} text
    * @param {int} posX
    * @param {int} posY
    * @param {string} font
    * @param {string} color
    */

    var _drawText = function(context, text, posX, posY, font, color) {
        context.font = font;
        context.fillStyle = color;
        context.fillText(text,posX,posY);
    };

    /**
    * This below function draw bar of barChart
    * @param {context2D} context
    * @param {int} startX
    * @param {int} startY
    * @param {int} width
    * @param {int} height
    * @param {string} color
    */

    var _drawBar = function(context, startX, startY, width, height, color) {
        context.fillStyle = color;
        context.fillRect(startX,startY,width,height);
    };

    /**
    * This below function draw slice of doughnutChart
    * @param {context2D} context
    * @param {int} centerX
    * @param {int} centerY
    * @param {int} radius
    * @param {int} startAngle
    * @param {int} endAngle
    * @param {string} color
    */

    var _drawSlice = function(context,centerX, centerY, radius, startAngle, endAngle, color ){

        context.fillStyle = color;

        context.beginPath();
        context.moveTo(centerX,centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();

        context.fill();

    };

    /**
    * This below function draw curve of lineChart
    * @param {context2D} context
    * @param {int} startX
    * @param {int} startY
    * @param {int} controlX
    * @param {int} controlY
    * @param {int} endX
    * @param {int} endY
    * @param {int} lineWidth
    * @param {string} color
    */

    var _drawCurve = function(context, startX, startY, controlX, controlY, endX, endY, lineWidth, color) {
        context.beginPath();
        context.moveTo(startX,startY);
        context.quadraticCurveTo(controlX,controlY,endX,endY);
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    };

    /**
    * This below function Slice 3D of pieChart
    * @param {context2D} context
    * @param {int} space
    * @param {string} color
    * @param {int} height
    * @param {Array object} config
    */

    var _drawPieChartSlice = function(context, space, colors, height, config) {

        var slice;
        var lastEnd = 0;
        var total = 0;
        for (var i in config) {
            total += config[i].value;
        }
        for (var i in config) {

            slice = Math.PI * 2 * (config[i].value / total);

            if (i != 0) {

                context.fillStyle = colors[i];

                if (height >= 100 - 1) {
                    context.fillStyle = colors[colors.length - 1 - i];
                }

                context.beginPath();
                context.moveTo(350 + space, 400 - height - space);
                context.arc(350 + space, 400 - height - space, 185, lastEnd, lastEnd + slice);
                context.lineTo(350, 400 - height - space);

                context.fill();
                lastEnd += Math.PI * 2 * (config[i].value / total);
            }

            if (i == 0) {

                context.fillStyle = colors[i];
                if (height >= 100 - 1) {
                    context.fillStyle = colors[colors.length - 1 - i];
                }
                context.beginPath();
                context.moveTo(350 , 400 - height);
                context.arc(350, 400 - height, 200, lastEnd, lastEnd + (Math.PI * 2 * (config[i].value / total)));
                context.lineTo(350, 400 - height);
                context.fill();
                lastEnd += Math.PI * 2 * (config[i].value / total);
            }
        }
        return lastEnd;
    };


    /**
    * This below function draw description of pieChart
    * @param {context2D} context
    * @param {int} space
    * @param {int} lastEnd
    * @param {int} total
    * @param {int} value
    * @param {string} colors
    * @param {Array object} config
    */

    var _drawPieChartComment = function(context, space, lastEnd, total, value, colors, config) {

        lastPoint = lastEnd;
        var heightLine = 150;
        var widthLine = 50;
        for (var i in config) {
            var slice = 3 * Math.PI * (config[i].value / total);

            var pX = 350 + 200 / 1.3 * Math.cos(lastPoint + slice / 2);
            var pY = 400 - 100 + 200 / 1.4 * Math.sin(lastPoint + slice / 2);

            context.font = "28px arial";
            context.fillStyle = "black";
            var info = Math.round(config[i].value * 100 / total);

            // Draw line description
            context.beginPath();
            context.lineWidth = 4;
            heightLine = heightLine + info * 1.2;
            // If slice >= 50%
            if (info >= 50) {
                context.strokeStyle = colors[i];
                context.moveTo(pX - widthLine * 2 , pY - heightLine + 70 + config[i].value);
                context.lineTo(pX - widthLine * 4, pY - heightLine + 70 + config[i].value);
                context.moveTo(pX, pY);
                context.lineTo(pX - widthLine * 2, pY - heightLine + 70 + config[i].value);
                context.stroke();
                context.font = "20px Arial";
                context.fillText(info + "%" + " " + config[i].name, pX - widthLine * 4, pY - heightLine + 60 + config[i].value);
            }
            // If slice < 50%
            if (info < 50) {

                context.strokeStyle = colors[i];
                context.moveTo(pX + widthLine * 2, pY - heightLine + 30 + config[i].value);
                context.lineTo(pX + widthLine * 4, pY - heightLine + 30 + config[i].value);
                context.moveTo(pX, pY);
                context.lineTo(pX + widthLine * 2, pY - heightLine + 30 + config[i].value);
                context.stroke();
                context.font = "20px Arial";
                context.fillText(info + "%" + " " + config[i].name, pX + widthLine * 2, pY - heightLine + 25 + config[i].value);
            }
            lastPoint += (config[i].value / total) * Math.PI * 2;
        }

    };

    /**
    * This below function draw barChart
    * @param {context2D} context
    * @param {Array object} project
    */

    var barChart = function(context,project) {
        _drawText(context,"BIỂU ĐỒ LỊCH SỬ LEVEL OF POSITION",130,30,"25px Arial","#333");

        context.save();
        context.translate(0,310);
        context.rotate(Math.PI * 1.5);

        _drawText(context,"LEVEL OF POSITION",0,50,"italic 20px Arial","#9D9D9D");

        context.restore();

        var numberOfProject = project.length;

        for (var i = 0; i < 5; i++) {
            _drawText(context,(4 - i),100,(i + 1) * 50 + 56,"14px Arial","#000");
            _drawLine(context,140,(i + 1) * 50 + 50,numberOfProject * 100 + 70,(i + 1) * 50 + 50,"#E6E6E6");
        }

        for (var i = 0; i < numberOfProject; i++) {
            let barX = (80 * i) + 140;
            let barY = (300 - project[i].level * 50);
            let barWidth = 50;
            let barHeight = project[i].level * 50;
            let barColor = project[i].color;
            let projectName = project[i].name;
            _drawBar(context,barX,barY,barWidth,barHeight,barColor);
            _drawText(context,projectName,barX + 20,320,"bold 14px Arial","#000");
        }

        _drawLine(context,140,300,numberOfProject * 100 + 70,300,"#f5f5f5");
        _drawBar(context,numberOfProject * 100 + 100,100,50,50 * 0.4,project[0].color);
        _drawText(context,"LEVEL",numberOfProject * 100 + 100,140,"16px Arial","#000");
        _drawText(context,"OF",numberOfProject * 100 + 100,170,"16px Arial","#000");
        _drawText(context,"POSITION",numberOfProject * 100 + 100,200,"16px Arial","#000");

        _drawText(context,"TÊN DỰ ÁN",300,350,"italic 20px Arial","#9D9D9D");
    };

    /**
    * This below function draw doughnutChart
    * @param {context2D} context
    * @param {Array object} doughnut
    */

    var doughnutChart = function(context, doughnut) {

        var startAngle = -Math.PI / 2;
        numberOfType = doughnut.length;

        for (var i = 0; i <  numberOfType; i++) {
            var doughValue = doughnut[i].value;
            var sliceAngle = Math.PI * 2 * (doughValue / 100);


            _drawSlice(context,150,150,150,startAngle,startAngle + sliceAngle,doughnut[i].color);



            startAngle += sliceAngle;
        }


        _drawSlice(context,150,150,0.5 * 150,-Math.PI / 2,Math.PI * 2,"#fff");


        startAngle = -Math.PI / 2;
        for (var i = 0; i <  numberOfType; i++) {
            var doughValue = doughnut[i].value;
            var offset = (150 * 0.5 ) / 2;
            var sliceAngle = Math.PI * 2 * (doughValue / 100);
            var labelX = 150 + (75 + offset) * Math.cos(startAngle + sliceAngle / 2);
            var labelY = 150 + (60 + offset) * Math.sin(startAngle + sliceAngle / 2);
            var labelText = Math.round(100 * doughValue / 100) + "%";

            _drawText(context,labelText,labelX,labelY, "bold 14px Arial", "#000");
            startAngle += sliceAngle;

            context.fillStyle = doughnut[i].color;
            context.fillRect(400,100 + (i * 30),15,15);
            _drawText(context,doughnut[i].name,430,100 + (i * 30) + 13,"14px Arial","#000");
        }
    };

    /**
    * This below function draw lineChart
    * @param {context2D} context
    * @param {Array object} config
    */

    var lineChart = function(context,config) {
        _drawText(context,"RANK SCORE RANK",130,30,"bold 25px Arial","#333");
        _drawText(context,"QUY LAM VIEC",180,350,"25px Arial","#333");

        context.save();
        context.translate(0,250);
        context.rotate(Math.PI * 1.5);

        _drawText(context,"HISTORY",0,50,"25px Arial","#333");

        context.restore();

        var numberOfRank = config.rank.length;
        var bottomY = numberOfRank * 50 + 56;
        var leftX = 110;
        for (var i = 0; i < numberOfRank; i++) {
            _drawText(context,(numberOfRank - config.rank[i] - 1),95,(i + 1) * 50 + 60,"14px Arial","#000");

        }
        _drawLine(context,leftX,70,110,numberOfRank * 50 + 56,"#333");
        _drawLine(context,leftX,bottomY,110 * 4,bottomY,"#333");


        var numberOfPoint = config.data.length;

        for (var i = 0; i < numberOfPoint; i += 1) {

            var startX = config.data[i][0];
            var startY = config.data[i][1];

            var controlX = config.data[i][2];
            var controlY = config.data[i][3];

            var endX = config.data[i][4];
            var endY = config.data[i][5];

            _drawCurve(context,startX,startY,controlX,controlY,endX,endY,4,"#249DE9");
        }
    };

    /**
    * This below function draw pieChart
    * @param {context2D} context
    * @param {Array object} config
    * @param {String} colors
    */

    var pieChart = function(context,config, colors) {

        var numberOfType = config.length;
        var total = 0;
        var val = 0;
        var checkValues = true;
        var lastEnd = 0;

        context.save();
        context.scale(1, 0.5);

        for (var item of config) {
            total += item.value;
        }

        for (var i = 0 ; i < numberOfType; i++)
        {

            if (config[i].value < 0 || config[i].value > 100) {
                checkValues = false;

            }

            if (checkValues) {
                for(var height = 0; height < 100; height++) {
                    lastEnd = _drawPieChartSlice(context,18,colors,height,config);
                }
                _drawPieChartComment(context,18,lastEnd,total,config[1].value,colors, config);
            } else {
                console.log("Invalid Input Limit");
            }

        }
        context.restore();
        context.font = "bold 25px Arial";
        context.fillStyle = "#64D6E5";
        context.fillText("BIỂU ĐỒ TỔNG QUAN KHUNG NĂNG LỰC",100,400);

    };

    return {
        barChart: barChart,
        doughnutChart: doughnutChart,
        lineChart: lineChart,
        pieChart: pieChart,

    };
})();
