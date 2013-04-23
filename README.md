#Dolphin.js JumpStart#

This project provides a step-by-step introduction to use OpenDolphin on the web (http://open-dolphin.org)
- with plain Java (you can use any JVM language, particularly Groovy)
- with a simple Servlet (you can use any other Java Server technology as well: Grails, JEE6/7, Vert.x, etc.)

A thorough description of all the steps in the jumpstart is in the OpenDolphin user guide:
http://open-dolphin.org/download/guide/guide/howto.html

##Quick Setup##

Prerequisite: Java 7 or above.

##Running the samples##

    ./gradlew :server-app:jettyRun

In order to view the Dolphin.JS samples you have to open at least two separate browsers of your choice. e.g. Chrome and Firefox.
It is required that one browser acts as a editor. Use one of the browsers to go to the following URL:

    http://localhost:8080/dolphinServer/editor/

The other browser can act as a viewer of the data. Use the other browser and go to the following URL:

    http://localhost:8080/dolphinServer/reader/

Now you can use the editor application to add and edit some weather records. When you do this watch the reader application in the other browser for any changes.

##Running the mobile sample##

You can use your smart phone to view the mobile client application. To do so it is important that all browsers are connected with exactly the same host with the Dolphin server. Figure out the IP address of your Dolphin server and use it in the URL to start the editor and reader applications in your desktop browsers:

    http://[dolphin-server-ip]:8080/dolphinServer/editor/

    http://[dolphin-server-ip]:8080/dolphinServer/reader/

Now take your smart phone and navigate to the following URL:

    http://[dolphin-server-ip]:8080/dolphinServer/mobile/

Add and edit some of the weather records and watch the reader clients.

##More Info##

This has only been a first glance into the way that OpenDolphin operates.

Many more features are available and you may want to check out the
user guide (http://open-dolphin.org/download/guide/index.html), the
other demos sources (http://github.com/canoo/open-dolphin/tree/master/subprojects/demo-javafx), or
the video demos (http://www.youtube.com/user/dierkkoenig).
