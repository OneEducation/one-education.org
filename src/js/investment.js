(function(){

  var investment = {
    data: [{
      name: 'Budget Android',
      data: [
        {value: 0},
        {meta: 'Device, protection, keyboard & 3rd party support.', value: 260},
        {meta: 'Pays for breakage and 3rd party support.', value: 320},
        {meta: 'Replacement device and keyboard.', value: 550},
        {meta: 'Pays for breakage and 3rd party support.', value: 610},
        {meta: 'New device, protection, keyboard & 3rd party support.', value: 870}]
    }, {
      name: 'Infinity',
      data: [
        {value: 0},
        {meta: 'Device & storage rack.', value: 269},
        {meta: 'Budget for breakage.', value: 309},
        {meta: 'Pays for upgrade of 1 or 2 modules.', value: 389},
        {meta: 'Budget for breakage.', value: 429},
        {meta: 'Module refresh.', value: 509}]
    }, {
      name: 'iPad',
      data: [
        {value: 0},
        {meta: 'Device, protection, keyboard, 3rd party support & Apple Care.', value: 450},
        {meta: 'Apple Care & 3rd party support.', value: 643},
        {meta: 'Pays for breakage and 3rd party support.', value: 746},
        {meta: 'Apple Care & 3rd party support.', value: 850},
        {meta: 'New device, protection, keyboard & 3rd party support.', value: 1389}]
      }
    ],
    labels: ['', '2016', '2017', '2018', '2019', '2020'],
    settings: {
      height: $(window).width() > 480 ? '500px' : '300px',
      stretch: true,
      lineSmooth: false,
      axisX: {
        showGrid: false
      },
      axisY: {
        showGrid: true,
        low: 0,
        offset: 60,
        type: Chartist.FixedScaleAxis,
        ticks: [0, 200, 400, 600, 800, 1000, 1200, 1400],
        labelInterpolationFnc: function(value) {
          return '$' + value;
        }
      }
    },
    createChart: function() {
      // Render chart
      var chart = new Chartist.Line('.ct-chart', {
        labels: investment.labels,
        series: investment.data,
      }, investment.settings);

      // Modify chart once it's created
      chart.on('created', function() {
        $('line.ct-point').each(function() {
          if($(this).attr('ct:value') === false)  {
            $(this).css('display', 'none');
          } else {
            $(this).attr('class', 'ct-point ct-donut');
            var $clone = $(this).clone().appendTo($(this).parent());
            $clone.attr('class', 'ct-point ct-dot');
            $clone.attr('ct:dot', 'true');
          }
        });

        function getDot(value) {
          var $dot;
          $('.ct-dot').each(function() {
            if($(this).attr('ct:value') == value) {
              $dot = $(this);
            }
          });
          return $dot;
        }

        function getDonut(value) {
          var $donut;
          $('.ct-donut').each(function() {
            if($(this).attr('ct:value') == value) {
              $donut = $(this);
            }
          });
          return $donut;
        }

        // @everythingElse - If true returns non-matching cols
        function getCol(value, everythingElse) {
          var $donuts = [];
          var $target = getDonut(value);
          $('.ct-donut').each(function() {
            if($(this).attr('x1') == $target.attr('x1') && !everythingElse) {
              $donuts[$donuts.length] = $(this);
            } else if($(this).attr('x1') != $target.attr('x1') && everythingElse) {
              $donuts[$donuts.length] = $(this);
            }
          });
          return $donuts;
        }

        function showCircle(value, visible) {
          $dot = getDot(value);
          $donut = getDonut(value);
          if(!visible) {
              $donut.stop().animate({'stroke-width': '25px'}, 'fast');
              $dot.stop().animate({'stroke-width': '10px'}, 'fast', function() {
                $donut.removeAttr('toggled');
              });
          } else {
              $donut.stop().animate({'stroke-width': '45px'}, 'fast');
              $dot.stop().animate({'stroke-width': '20px'}, 'fast');
              $donut.attr('toggled', true);
          }
        }

        function showCol(value, visible) {
          var cols = getCol(value, false);
          for (var circle in cols) {
            var $donut = cols[circle];
            value = $donut.attr('ct:value');
            showCircle(value, visible);
          }
        }

        function giveFocus(value) {
          target = getCol(value, false);
          others = getCol(value, true);
          for (var targetCircle in target) {
            var $targetDonut = target[targetCircle];
            var targetValue = $targetDonut.attr('ct:value');
            showCircle(targetValue, true);
          }
          for (var otherCircle in others) {
            var $otherDonut = others[otherCircle];
            var otherValue = $otherDonut.attr('ct:value');
            showCircle(otherValue, false);
          }
        }

        // Create a tooltip for each data group.
        function createToolTips(amount) {
          $('.chartist-tooltip, .chartist-tooltip-content').remove();
          for(var i = 0; i < amount; i ++) {
            var className = 'chartist-tooltip chartist-tooltip-' + i;
            var $toolTip = $chart
              .append('<div class="'+ className + '"></div>')
              .find('.chartist-tooltip-' + i).hide();
            $toolTips[i] = $toolTip;
          }
          $toolTipContent = $chart
            .append('<div class="chartist-tooltip-content"></div>')
            .find('.chartist-tooltip-content').hide();
        }

        function orderMeta(metaContent) {
          metaContent.sort(function(a, b) {
            return $(a).attr('price') - $(b).attr('price');
          });
          return metaContent.reverse();
        }

        function positionMeta($toolTipContent) {
          if($toolTipContent.height() > 320) {
            var $toolTipMeta = $toolTipContent.find('.tooltip-meta');
            var i = 0;
            $toolTipMeta.each(function() {
              var top = $(this).attr('posY');

              $(this).css({
                'top': top - (i === 1 ? 35 : i === 2 ? -5 : 15) + 'px',
                'left': '10px',
                'position': 'absolute'
              });
              i ++;
            });
          }
        }

        function showToolTips(col, visible) {
          $toolTipContent.html('');
          var metaContent = [];
          for(var i in $toolTips) {
            var content = col[i].attr('ct:meta');
            var price = col[i].attr('ct:value');
            var posX = Math.round(col[i].attr('x1'));
            var posY = Math.round(col[i].attr('y1'));
            var $toolTip = $toolTips[i];
            // Adjust min-height to cover all points.
            $toolTipContent.css({
              'min-height': getToolTipHeight(col) + 80 + 'px'
            });
            $('.pricing-' + i + ' h4').html('$' + price);
            // Add price to meta text html so we can sort it later.
            var metaClass = ' class="tooltip-meta tooltip-meta-' + i + '"';
            var metaAttr = ' price="' + price + '"';
            var metaPosX = ' posX="' + posX + '"';
            var metaPosY = ' posY="' + posY + '"';
            var metaHtml = '<div' + metaClass + metaAttr + metaPosX + metaPosY + '>' + content + '</div>';
            metaContent[i] = metaHtml;
            $toolTip.show();
          }
          metaContent = orderMeta(metaContent);
          //metaContent = positionMeta(metaContent);
          $toolTipContent.append(metaContent);
          $toolTipContent.show();
          positionMeta($toolTipContent);
          console.log(metaContent);
        }

        function positionToolTips($cols) {
          for(var i in $cols) {
            var $toolTip = $toolTips[i];
            var left = Math.round($cols[i].attr('x1') - (16 + $toolTip.width()));
            var top = Math.round($cols[i].attr('y1') - ($toolTip.height() / 2));
            $toolTip.css({
              left: left,
              top: top
            });
            $toolTipContent.css({
              left: left - ($toolTipContent.width() + 3),
              top: top - 45
            });
          }
        }

        // Return the min and max values of each plot.
        function getToolTipHeight($cols) {
          var yValues = [];
          for(var i in $cols) {
            var $col = $cols[i];
            yValues[i] = $col.attr('y1');
          }
          return Math.max.apply(Math, yValues) - Math.min.apply(Math, yValues);
        }

        if($(window).width() > 480) {
          // Configure tooltips
          var $toolTips = [];
          var $toolTipContent = null;
          var $chart = $('.ct-chart');
          createToolTips(investment.data.length);

          // Display the last col on intialization
          var infinityData = investment.data[0].data;
          var initalValue = infinityData[infinityData.length - 1].value;
          var $cols = getCol(initalValue, false);
          showCol(initalValue, true);
          positionToolTips($cols);
          showToolTips($cols, true);

          // Focus on mouseover or click
          $('.ct-donut').on('mouseover touchstart click', function(event) {
            var value = $(this).attr('ct:value');
            giveFocus(value);

            // Display Tooltip
            var $cols = getCol(value, false);
            positionToolTips($cols);
            showToolTips($cols, true);
          });
        }
      });
    },

  };

  investment.createChart();

}());
