# nothingCMS

A very simple CMS type thingy...

## How it works:

The index.html file uses iFrames to load local content.

Specifically, a comma-delimited table of contents file (toc.txt) that must be stored in the same location as the index.html file and the content files themselves (html files, for example).

The toc.file should have a header row and four columns, like so:

Order, Index, Title, Link  
1, 1, About, ./content/about/about.html  
2, 1.1, User Guide, ./content/guide/guide.html

Each row represents a document that will be added to the table of contents. The order that the documents appear in the table of contents is controlled by the variable in the first column ("Order") - the documents do not have to be listed in the same order that they will appear.

The table of contents will display and index for the entry (1, 1.1, 1.1.1) as entered in column 2 ("Index"). The title that is shown is read from column 3 ("Title") and the link, relative to the index.html file, is extracted from the fourth column.

In this case (based on the sample toc.txt file) the table of contents will feature two entries.

The JS code (script.js) builds this table of contents and shows the selected content (when the user clicks on an entry in the toc) in the iFrame.
