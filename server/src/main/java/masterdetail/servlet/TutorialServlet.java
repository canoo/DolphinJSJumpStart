package masterdetail.servlet;

import org.opendolphin.core.server.ServerDolphin;
import org.opendolphin.server.adapter.DolphinServlet;
import masterdetail.TutorialDirector;

public class TutorialServlet extends DolphinServlet{

    @Override
    protected void registerApplicationActions(ServerDolphin serverDolphin) {
        serverDolphin.register(new TutorialDirector());
    }

}
