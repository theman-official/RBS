pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash
        var fillDiv = document.createElement("div");
        fillDiv.style.position = "fixed";
        fillDiv.style.width = "100%";
        fillDiv.style.height = "100%";
        fillDiv.style.backgroundColor = "#000000";
        fillDiv.id = "fillDiv";
        document.body.appendChild(fillDiv);
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        document.body.appendChild(splash);
        var logo = document.createElement('img');
        // replace with your logo
        logo.src = 'https://forum-files-playcanvas-com.s3.dualstack.eu-west-1.amazonaws.com/original/2X/c/c94ba49b1b84da0972ecd423461228841c1baf70.png';
        splash.appendChild(logo);

        // progress bar
        var container = document.createElement('div');
        container.id = 'progress-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash');
        splash.parentElement.removeChild(splash);
        fill = document.getElementById('fillDiv');
        fill.parentElement.removeChild(fill);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            '#application-splash {',
            '    position: fixed;',
            '    top: 50%;',
            '    width: 23%;',
            '    left: 50%;',
            '   transform: translate(-50%, -50%);',
            '   -webkit-transform: translate(-50%, -50%);',
            '   -moz-transform: translate(-50%, -50%);',
            '   -o-transform: translate(-50%, -50%);',
            '   -ms-transform: translate(-50%, -50%);',
            '   z-index = 10;',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '   border-radius:10%;',
            '}',

            '#progress-container {',
            '    width: 100%;',
            '    height: 10px;',
            '    position: absolute;',
            '    background-color: #444;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #00ff00;',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();

    app.on("preload:end", function () {
        app.off("preload:progress");
    });
    app.on("preload:progress", setProgress);
    app.on("start", hideSplash);
});