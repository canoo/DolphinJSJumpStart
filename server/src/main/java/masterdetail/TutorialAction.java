package masterdetail;

import org.opendolphin.core.comm.Command;
import org.opendolphin.core.comm.ValueChangedCommand;
import org.opendolphin.core.server.DTO;
import org.opendolphin.core.server.ServerAttribute;
import org.opendolphin.core.server.ServerPresentationModel;
import org.opendolphin.core.server.Slot;
import org.opendolphin.core.server.action.DolphinServerAction;
import org.opendolphin.core.server.comm.ActionRegistry;
import org.opendolphin.core.server.comm.CommandHandler;

import java.util.List;

public class TutorialAction extends DolphinServerAction {

    final ILogService service;

    public TutorialAction(ILogService service) {
        this.service = service;
    }

    private int count = 0;

    public void registerIn(ActionRegistry actionRegistry) {
        actionRegistry.register("echo", new CommandHandler<Command>() {
            public void handleCommand(Command command, List<Command> response) {

                System.err.println(getServerDolphin().getServerModelStore().listPresentationModelIds());

                final ServerPresentationModel presentationModel = getServerDolphin().getAt("modelId");
                System.err.println(presentationModel);
                final ServerAttribute attribute = presentationModel.getAt("attrId");
                System.err.println(attribute);
                service.log(attribute.getValue());

                changeValue(attribute, "Server: "+attribute.getValue());
            }
        });

        actionRegistry.register(ValueChangedCommand.class, new CommandHandler<Command>() {
            @Override
            public void handleCommand(Command command, List<Command> response) {
                System.err.println(command);
            }
        });

        actionRegistry.register("add", new CommandHandler<Command>() {
            public void handleCommand(Command command, List<Command> response) {
                count++;
                presentationModel("weather."+count, "weather", new DTO(
                        new Slot("temperature", String.valueOf((int) (Math.random() * 100)), "weather."+count+".temperature"),
                        new Slot("humidity", String.valueOf((int) (Math.random() * 100)), "weather."+count+".humidity")
                ));
            }
        });
    }

}
