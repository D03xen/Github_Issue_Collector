# Github_Issue_Collector

This is a Web Scraper application made with Node and Express JS along with the following dependencies and APIs:

• Axios (promise based http client)

• Cheerio( for web scraping )

• fs(for file write stream creation)

• pdfkit(to dump the issue links gathered into respective pdfs)

Objective: The application goes through the Topics page on Github and collects the URL of all the issues of the top 10 repositories related to the each of the 3
topics appearing during the request sent by the program and dumps the collected URLs in labelled pdfs within folders.
