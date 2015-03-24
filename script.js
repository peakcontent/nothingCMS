/*global document, window, alert, ActiveXObject*/
(function () {
    "use strict";

    function loadContent() {
        // add the content of the target in the ToC to the content iframe;
        // pending - add error handing and handling of different content types...;

        var contentIFrame = document.getElementById("content");

        // resize content window to default;
        contentIFrame.height = '300px';

        contentIFrame.src = this.dataValue;
    } // end loadContent;


    function parse(tocTxt) {
        // parse toc file, place in array;
        // get array...;
        var arr = [],
            i,
            toc_ul = document.getElementById("toc_ul"),
            new_li,
            padding;
        arr = tocTxt.split(/\n/);                          // split lines;
        arr.splice(0, 1);									// delete header row;
        for (i = 0; i < arr.length; i = i + 1) {
            arr[i] = arr[i].split(',');						// split items;
        }

        // delete empty lines...
        for (i = arr.length - 1; i >= 0; i = i - 1) {
            if (arr[i].length < 4) {arr.splice(i, 1); }
        }

        // sort it...
        arr.sort(function (a, b) {
            return a[0] - b[0];
        });


        // place it in table of contents...
        for (i = 0; i < arr.length; i = i + 1) {
            // create list item;
            new_li = document.createElement("li");
            // add link;
            new_li.dataValue = arr[i][3];

            // add text;
            new_li.innerHTML = arr[i][1] + "&ensp;" + arr[i][2];
            padding = ((arr[i][1].split(".").length - 1) * 5) + 'px'; // padding based on number of points in index;
            new_li.style.paddingLeft = padding;

            // add onclick;
            new_li.onclick = loadContent;
            toc_ul.appendChild(new_li);
        }

        // show first item in menu by calling its onClick event;

        toc_ul.getElementsByTagName("li")[0].onclick();
    }

    function readFile() {
        //  uses AJAX for load the table of contents text file 'toc.txt' that is stored
        //  in the same location as the index.html file;
        //	from: https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
        var httpRequest;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    parse(httpRequest.responseText);
                } else {
                    alert('There was a problem with the request.');
                }
            }
        }; // end anonymous function for onreadystatechange...
        httpRequest.open('GET', "toc.txt");
        httpRequest.send();

    } // end function readFile()

    window.onload = function () {

        // add height adjustment event on content iframe change;
        var contentIFrame = document.getElementById("content");
        contentIFrame.onload = function () {
            var contentIFrameDoc = contentIFrame.contentDocument || contentIFrame.contentWindow.document; // http://stackoverflow.com/questions/5002334...
            contentIFrame.height = (contentIFrameDoc.body.offsetHeight + 50) + 'px';
        };

        readFile();

    };

}());
