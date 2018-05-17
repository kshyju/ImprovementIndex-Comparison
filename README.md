## Identifying a js file is minified or not

This is an effort to find out a threshold value, which can be used to determine whether a file has minified content or not. This logic is being used in the [sonarwhal minified-js rule](https://sonarwhal.com/docs/user-guide/rules/rule-minified-js/)

We will generate an improvement index value for the file content and if the improvement index is greater than the threshold we identified from the below results, the file might be unminified.

Improvement index is generated by by comparing the number of tokens(*from the abstract syntax tree generated from the code in the file*) with the total content length of a file.

    const tokenRatio = tokenLength / contentLength;
    const improvementIndex = Math.round((1 - tokenRatio) * 100);

I ran this test with a couple of popular libaries. Both unminified and minified versions. Here are the results.

**75** seems like a good threshold based on this numbers. Files with an improvement index value greater than 75 can be safely assumed as unminified file.

![alt text](/statics/improvement-index-table.png "Tabular data")

![alt text](/statics/improvement-index-chart.png "Chart data")

##5 Identifying a js file is minified or not

While 75 seems like a reasonable value to be used as the threshold, you might want to tweak it for your environment. If you want to find the ideal number for your scripts, you may run the tests with your script by following the steps

1. Clone/copy this repository.
2. Add the uniminified version of your script to the `testfiles` directory.
3. Add the minified version of your script to the `testfiles` directory with the sufficx `-min.js`
4. Add the uniminified file name to the `files` in `min.js`
5. Start the server by running `node server.js` command on the root of the repository. This will start the webserver at port 3000.
6. Access `http://localhost:3000/` in a browser. You will be able to see the generated results for all the test files including yours
