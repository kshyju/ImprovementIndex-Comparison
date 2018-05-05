# minjs
This is an effort to find out a threshold value, which can be used to determine whether a file has minified content or not.

We will generate an improvement index value for the file content and if the improvement index is greater than the threshold we identified from the below results, the file might be unminified.

Improvement index is generated by by comparing the number of tokens(*from the abstract syntax tree generated from the code in the file*) with the total content length of a file.

    const tokenRatio = tokenLength / contentLength;
    const improvementIndex = Math.round((1 - tokenRatio) * 100);

I ran this test with a couple of popular libaries. Both unminified and minified versions. Here are the results.

**75** seems like a good threshold based on this numbers. Files with an improvement index value greater than 75 can be safely assumed as unminified file.

![alt text](/statics/improvement-index-table.png "Tabular data")

![alt text](/statics/improvement-index-chart.png "Tabular data")