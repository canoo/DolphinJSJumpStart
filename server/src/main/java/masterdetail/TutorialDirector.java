package masterdetail;

import org.opendolphin.core.server.action.DolphinServerAction;
import org.opendolphin.core.server.comm.ActionRegistry;

public class TutorialDirector extends DolphinServerAction {

    private ILogService logService;

    public TutorialDirector(ILogService logService) {
        this.logService = logService;
    }

    public TutorialDirector() {
        this(new LogServiceImpl());
    }

    public void registerIn(ActionRegistry registry) {
        // register all your actions here.
        getServerDolphin().register(new TutorialAction(logService));
    }

}
