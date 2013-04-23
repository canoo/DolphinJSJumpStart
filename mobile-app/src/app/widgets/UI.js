define([
    '_',

    'widgets/Button',
    'widgets/ButtonBar',
    'widgets/LayoutContainer',
    'widgets/List',
    'widgets/ListItem',
    'widgets/MsgBox',
    'widgets/Overlay',
    'widgets/ScrollContainer',
    'widgets/SearchBox',
    'widgets/TabBar',
    'widgets/TabButton'

], function (_, Button, ButtonBar, LayoutContainer, List, ListItem, MsgBox, Overlay, ScrollContainer, SearchBox, TabBar, TabButton) {

    var UI = {};

    UI.Button = Button;
    UI.ButtonBar = ButtonBar;
    UI.LayoutContainer = LayoutContainer;
    UI.List = List;
    UI.ListItem = ListItem;
    UI.MsgBox = MsgBox;
    UI.OverLay = Overlay;
    UI.ScrollContainer = ScrollContainer;
    UI.SearchBox = SearchBox;
    UI.TabBar = TabBar;
    UI.TabButton = TabButton;

    return UI;
});
